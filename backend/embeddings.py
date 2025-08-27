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

    Uses model text-embedding-004 by default, configurable via GEMINI_EMBED_MODEL.
    """
    _configure_client()
    model_name = os.getenv("GEMINI_EMBED_MODEL", "text-embedding-004")
    vectors: List[List[float]] = []
    for text in texts:
        # genai.embed_content returns {'embedding': [...]} structure
        resp = genai.embed_content(model=model_name, content=text)
        vectors.append(resp["embedding"])
    return vectors


