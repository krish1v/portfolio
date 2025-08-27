import json
import logging
import os
from typing import Any, Dict, Generator, List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel

from .vector_store import initialize_chroma, query_top_k
from .gemini_client import generate_answer


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


class ChatRequest(BaseModel):
    query: str
    stream: Optional[bool] = False


def build_prompt(query: str, context_items: List[Dict[str, Any]]) -> str:
    instructions = (
        "You are Krishiv’s personal AI agent. Your role is to represent him and answer questions about his background, projects, skills, experiences, interests, motivations, and values. "
        "Always use the provided context to ground your answers, but you may rephrase and elaborate for clarity and completeness. Feel free to use the context to answer questions about might be relevant to Krishiv and only make inferences if the user asks about something not covered in the context."
        "If a user asks about something not covered in the context, do not just say 'I don’t know.' Instead, respond by explaining that you don’t have that information and suggest a more relevant question they could ask about Krishiv. "
        "Maintain a professional yet approachable tone, as if speaking on Krishiv’s behalf in a conversation with a recruiter or collaborator."
        "Never invent facts beyond the given context."
    )
    # Render context in a structured block to help grounding
    if context_items:
        context_lines = []
        for it in context_items:
            it_type = it.get('type', 'unknown')
            it_id = it.get('id', 'unknown')
            it_content = (it.get('content', '') or '').strip()
            context_lines.append(f"- id: {it_id} | type: {it_type} | content: {it_content}")
        context_block = "\n".join(context_lines)
    else:
        context_block = "(no relevant context found)"

    task = (
        "Task: Answer the user's question concisely based on the context. "
        "If the user asks about skills, focus on technical and programming skills unless they specifically ask about other types of skills."
        "If the user asks about experience, always start with the most recent experience."
    )

    prompt = (
        f"{instructions}\n\n"
        f"Context Items:\n{context_block}\n\n"
        f"{task}\n\n"
        f"User Question: {query}\n\n"
        f"Answer:"
    )
    return prompt


def build_fallback_answer(query: str, context_items: List[Dict[str, Any]]) -> str:
    """Synthesize a minimal answer if the model returns empty.

    - If the query mentions skills, compile 'skill' items.
    - Otherwise, return the first context item's content or a generic message.
    """
    q = (query or "").lower()
    return "I don't have enough information in the knowledge base to answer that yet."


app = FastAPI(title="Krishiv Personal AI Backend", version="0.1.0")

# Allow local dev origins; harden for production as needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_index():
    collection, count = initialize_chroma()
    logger.info("Chroma initialized with %d knowledge entries", count)


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/chat")
def chat(req: ChatRequest):
    try:
        try:
            # Increase retrieval count and add query enhancement for skills
            query = req.query
            if any(word in query.lower() for word in ["skill", "skills", "tech", "stack", "technical"]):
                # Enhance query to better match technical skills
                query = f"technical skills programming development {query}"
            elif any(word in query.lower() for word in ["language", "languages", "mandarin", "english"]):
                # Enhance query to better match language skills
                query = f"language communication {query}"
            retrieved = query_top_k(query, k=10)
        except Exception as e:
            logger.exception("retrieval_failed: %s", e)
            retrieved = []
        prompt = build_prompt(req.query, retrieved)

        if req.stream:
            def event_stream() -> Generator[bytes, None, None]:
                try:
                    for delta in generate_answer(prompt, stream=True):
                        payload = {"delta": delta}
                        yield (json.dumps(payload) + "\n").encode("utf-8")
                    yield json.dumps({"done": True}).encode("utf-8")
                except Exception as e:
                    err = {"error": str(e)}
                    yield (json.dumps(err) + "\n").encode("utf-8")
                    yield json.dumps({"done": True}).encode("utf-8")
            return StreamingResponse(event_stream(), media_type="application/x-ndjson")

        try:
            text = generate_answer(prompt, stream=False)
        except Exception as e:
            logger.exception("llm_failed: %s", e)
            text = ""
        if not isinstance(text, str) or not text.strip():
            text = build_fallback_answer(req.query, retrieved)
        return JSONResponse({
            "answer": text,
            "context": retrieved,
            "model": os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
        })
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("chat_unhandled_error: %s", e)
        # Return graceful fallback instead of 500 when possible
        text = build_fallback_answer(req.query, [])
        return JSONResponse({"answer": text, "context": []}, status_code=200)


# For local runs: `python -m uvicorn backend.main:app --reload`
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)


