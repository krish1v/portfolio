import json
import os
import uuid
from typing import Any, Dict, List, Tuple, Optional

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
        cleaned.append(
            {
                "id": str(entry["id"]),
                "type": str(entry["type"]),
                "content": str(entry["content"]).strip(),
            }
        )
    return cleaned


def initialize_chroma(knowledge_path: str = _KNOWLEDGE_PATH_DEFAULT) -> Tuple[None, int]:
    # Kept name for compatibility with imports; initializes Qdrant
    client = _client_instance()
    # If collection already exists, skip heavy re-embedding on cold start
    if _collection_exists():
        return None, 0

    entries = load_knowledge(knowledge_path)
    if not entries:
        _ensure_collection(dim=768)
        return None, 0

    documents = [e["content"] for e in entries]
    vectors = embed_texts(documents)
    dim = len(vectors[0]) if vectors else 768
    _ensure_collection(dim=dim)

    points = []
    for idx, e in enumerate(entries):
        # Qdrant IDs must be unsigned int or UUID - derive a stable UUID from entry id
        pid = uuid.uuid5(uuid.NAMESPACE_URL, e["id"]).hex
        points.append(
            qm.PointStruct(
                id=pid,
                vector=vectors[idx],
                payload={"type": e["type"], "content": e["content"], "orig_id": e["id"]},
            )
        )
    client.upsert(collection_name=_QDRANT_COLLECTION, points=points)
    return None, len(entries)


def query_top_k(query_text: str, k: int = 3) -> List[Dict[str, Any]]:
    client = _client_instance()
    qvec = embed_texts([query_text])[0]
    results = client.search(
        collection_name=_QDRANT_COLLECTION,
        query_vector=qvec,
        limit=k,
        with_payload=True,
    )
    items: List[Dict[str, Any]] = []
    for r in results:
        payload = r.payload or {}
        items.append(
            {
                "id": r.id,
                "type": payload.get("type"),
                "content": payload.get("content"),
                "distance": 1 - float(r.score or 0.0),
            }
        )
    return items


