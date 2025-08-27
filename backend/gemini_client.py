import os
from typing import Generator, Optional

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


def generate_answer(prompt: str, stream: bool = False, model_name: Optional[str] = None):
    """
    Call Google's Gemini API and return either full text or a streaming generator of deltas.

    When stream=True, returns a generator yielding text chunks (strings).
    Otherwise returns a full string response.
    """
    _configure_client()
    chosen_model = model_name or os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    generation_config = {
        "temperature": float(os.getenv("GEMINI_TEMPERATURE", "0.2")),
        "top_p": float(os.getenv("GEMINI_TOP_P", "0.9")),
        "top_k": int(os.getenv("GEMINI_TOP_K", "40")),
        "max_output_tokens": int(os.getenv("GEMINI_MAX_TOKENS", "512")),
    }
    model = genai.GenerativeModel(model_name=chosen_model, generation_config=generation_config)

    if stream:
        def _stream() -> Generator[str, None, None]:
            response = model.generate_content(prompt, stream=True)
            for chunk in response:
                if hasattr(chunk, "text") and chunk.text:
                    yield chunk.text
        return _stream()

    response = model.generate_content(prompt)
    return getattr(response, "text", "")


