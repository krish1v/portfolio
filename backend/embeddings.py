import os
from typing import List

from dotenv import load_dotenv

try:
    import google.generativeai as genai
except ImportError as exc:
    raise ImportError(
        "google-generativeai is required. Install dependencies from backend/requirements.txt"
    ) from exc


load_dotenv()


def _configure_client() -> None:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not set. Export it or add it to a .env file."
        )
    genai.configure(api_key=api_key)


def embed_texts(texts: List[str]) -> List[List[float]]:
    """Return embeddings for a list of texts using Gemini Embeddings API.

    Uses model gemini-embedding-001 by default (GA); configurable via GEMINI_EMBED_MODEL.
    Output dimension 768 by default for compatibility with common vector DB setups (GEMINI_EMBED_DIM).
    """
    _configure_client()
    model_name = os.getenv("GEMINI_EMBED_MODEL", "gemini-embedding-001")
    output_dim = int(os.getenv("GEMINI_EMBED_DIM", "768"))
    vectors: List[List[float]] = []
    for text in texts:
        resp = genai.embed_content(
            model=model_name,
            content=text,
            output_dimensionality=output_dim,
        )
        vectors.append(resp["embedding"])
    return vectors


