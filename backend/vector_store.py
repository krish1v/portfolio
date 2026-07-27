import json
import os
import uuid
from typing import Any, Dict, List, Tuple, Optional

import json as _json
import httpx
from qdrant_client import QdrantClient
from qdrant_client.http import models as qm

from .embeddings import embed_texts


_QDRANT_URL = os.getenv("QDRANT_URL")
_QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
_QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "knowledge")
_KNOWLEDGE_PATH_DEFAULT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "knowledge.json")
)

_client: Optional[QdrantClient] = None


def _client_instance() -> QdrantClient:
    global _client
    if _client is None:
        if not _QDRANT_URL or not _QDRANT_API_KEY:
            raise RuntimeError("QDRANT_URL and QDRANT_API_KEY must be set for Qdrant")
        _client = QdrantClient(url=_QDRANT_URL, api_key=_QDRANT_API_KEY, timeout=30)
    return _client


def _ensure_collection(dim: int) -> None:
    client = _client_instance()
    # Create if missing; avoid recreate to prevent cold-start cost
    try:
        client.get_collection(collection_name=_QDRANT_COLLECTION)
        return
    except Exception:
        client.create_collection(
            collection_name=_QDRANT_COLLECTION,
            vectors_config=qm.VectorParams(size=dim, distance=qm.Distance.COSINE),
        )


def _collection_exists() -> bool:
    try:
        client = _client_instance()
        client.get_collection(collection_name=_QDRANT_COLLECTION)
        return True
    except Exception:
        return False


def _points_count() -> int:
    """
    Return number of points in the collection. If collection missing, returns 0.
    """
    try:
        client = _client_instance()
        res = client.count(collection_name=_QDRANT_COLLECTION, exact=True)
        # qdrant-client may return a dataclass or dict-like
        if hasattr(res, "count"):
            return int(getattr(res, "count"))
        if isinstance(res, dict) and "count" in res:
            return int(res["count"])
        return 0
    except Exception:
        return 0


def load_knowledge(knowledge_path: str = _KNOWLEDGE_PATH_DEFAULT) -> List[Dict[str, Any]]:
    if not os.path.exists(knowledge_path):
        raise FileNotFoundError(
            f"Knowledge file not found at {knowledge_path}. Create knowledge.json."
        )
    with open(knowledge_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if not isinstance(data, list):
        raise ValueError("knowledge.json must be a list of entries")
    cleaned: List[Dict[str, Any]] = []
    for entry in data:
        if not all(k in entry for k in ("id", "type", "content")):
            continue
        # Optional retrieval weight (default 1.0). Entries can carry a `weight`
        # to boost how prominently they surface in retrieval (see query_top_k).
        try:
            weight = float(entry.get("weight", 1.0))
        except (TypeError, ValueError):
            weight = 1.0
        cleaned.append(
            {
                "id": str(entry["id"]),
                "type": str(entry["type"]),
                "content": str(entry["content"]).strip(),
                "weight": weight,
            }
        )
    return cleaned


def _index_entries(entries: List[Dict[str, Any]], client: QdrantClient) -> int:
    """Embed entries and upsert into the collection. Caller must ensure collection exists with correct dim."""
    if not entries:
        return 0
    documents = [e["content"] for e in entries]
    vectors = embed_texts(documents)
    dim = len(vectors[0]) if vectors else 768
    _ensure_collection(dim=dim)
    points = []
    for idx, e in enumerate(entries):
        pid = uuid.uuid5(uuid.NAMESPACE_URL, e["id"]).hex
        points.append(
            qm.PointStruct(
                id=pid,
                vector=vectors[idx],
                payload={
                    "type": e["type"],
                    "content": e["content"],
                    "orig_id": e["id"],
                    "weight": float(e.get("weight", 1.0)),
                },
            )
        )
    client.upsert(collection_name=_QDRANT_COLLECTION, points=points)
    return len(entries)


def reindex(knowledge_path: str = _KNOWLEDGE_PATH_DEFAULT) -> int:
    """
    Clear the knowledge collection and re-embed all entries from knowledge.json.
    Use after changing knowledge.json or switching embedding models.
    Returns the number of entries indexed.
    """
    client = _client_instance()
    entries = load_knowledge(knowledge_path)
    if not entries:
        if _collection_exists():
            client.delete_collection(collection_name=_QDRANT_COLLECTION)
        _ensure_collection(dim=768)
        return 0
    if _collection_exists():
        client.delete_collection(collection_name=_QDRANT_COLLECTION)
    return _index_entries(entries, client)


def initialize_chroma(knowledge_path: str = _KNOWLEDGE_PATH_DEFAULT) -> Tuple[None, int]:
    # Kept name for compatibility with imports; initializes Qdrant
    client = _client_instance()
    exists = _collection_exists()

    entries = load_knowledge(knowledge_path)
    if not entries:
        if not exists:
            _ensure_collection(dim=768)
        return None, 0

    # If collection exists and already has vectors, skip heavy re-embedding
    if exists and _points_count() > 0:
        return None, 0

    # Create collection if missing, then (re)index all entries
    return None, _index_entries(entries, client)


def _rerank_top_k(raw: List[Dict[str, Any]], k: int) -> List[Dict[str, Any]]:
    """
    Re-rank raw candidates by a weighted score (cosine score * entry weight),
    then return the top-k in the public shape {id, type, content, distance}.

    Weighting lets certain entries (e.g. the most recent/most important role)
    surface more prominently than pure cosine similarity would allow.
    """
    for it in raw:
        score = float(it.get("score") or 0.0)
        try:
            weight = float(it.get("weight", 1.0) or 1.0)
        except (TypeError, ValueError):
            weight = 1.0
        it["_adjusted"] = score * weight
    raw.sort(key=lambda x: x["_adjusted"], reverse=True)
    out: List[Dict[str, Any]] = []
    for it in raw[:k]:
        out.append(
            {
                "id": it.get("id"),
                "type": it.get("type"),
                "content": it.get("content"),
                "distance": 1 - float(it.get("score") or 0.0),
            }
        )
    return out


def query_top_k(query_text: str, k: int = 3) -> List[Dict[str, Any]]:
    client = _client_instance()
    qvec = embed_texts([query_text])[0]
    # Fetch a wider candidate pool so weighting can re-rank meaningfully.
    fetch_k = max(k * 4, 20)
    try:
        # Preferred modern client method per Qdrant client README: query_points
        qres = client.query_points(
            collection_name=_QDRANT_COLLECTION,
            query=qvec,
            limit=fetch_k,
            with_payload=True,
        )
        # qres may have `.points` or be an iterable directly (older client variants)
        points = getattr(qres, "points", qres) or []
        raw: List[Dict[str, Any]] = []
        for r in points:
            # r can be model or dict-like
            rid = getattr(r, "id", None)
            rscore = getattr(r, "score", None)
            rpayload = getattr(r, "payload", None)
            if isinstance(r, dict):
                rid = r.get("id", rid)
                rscore = r.get("score", rscore)
                rpayload = r.get("payload", rpayload)
            payload = rpayload or {}
            raw.append(
                {
                    "id": rid,
                    "type": payload.get("type"),
                    "content": payload.get("content"),
                    "score": float(rscore or 0.0),
                    "weight": payload.get("weight", 1.0),
                }
            )
        return _rerank_top_k(raw, k)
    except AttributeError:
        # Fallback: Query API (v1.10+) via HTTP; if unavailable, fall back to legacy /points/search
        if not _QDRANT_URL:
            raise RuntimeError("QDRANT_URL is not set")
        headers = {"Content-Type": "application/json"}
        if _QDRANT_API_KEY:
            headers["api-key"] = _QDRANT_API_KEY

        def _parse_results(data: Dict[str, Any]) -> List[Dict[str, Any]]:
            res = (data or {}).get("result", []) or []
            raw: List[Dict[str, Any]] = []
            for r in res:
                payload = r.get("payload") or {}
                raw.append(
                    {
                        "id": r.get("id"),
                        "type": payload.get("type"),
                        "content": payload.get("content"),
                        "score": float(r.get("score") or 0.0),
                        "weight": payload.get("weight", 1.0),
                    }
                )
            return _rerank_top_k(raw, k)

        with httpx.Client(timeout=30) as http:
            # Try Query API first (recommended): /points/query with {"query": [..]}
            query_url = f"{_QDRANT_URL.rstrip('/')}/collections/{_QDRANT_COLLECTION}/points/query"
            query_payload = {"query": qvec, "limit": fetch_k, "with_payload": True}
            resp = http.post(query_url, headers=headers, content=_json.dumps(query_payload))
            if resp.status_code < 300:
                return _parse_results(resp.json())

            # Fallback to legacy Search API: /points/search with {"vector": [..]}
            search_url = f"{_QDRANT_URL.rstrip('/')}/collections/{_QDRANT_COLLECTION}/points/search"
            search_payload = {"vector": qvec, "limit": fetch_k, "with_payload": True}
            resp2 = http.post(search_url, headers=headers, content=_json.dumps(search_payload))
            resp2.raise_for_status()
            return _parse_results(resp2.json())


