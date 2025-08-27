# Krishiv Personal AI Backend

FastAPI backend that uses a light RAG setup with ChromaDB and Gemini. It indexes `knowledge.json` on startup and answers questions based on your personal knowledge base.

## Features

- FastAPI with `/health` and `/chat` endpoints
- ChromaDB persistent store + MiniLM embeddings
- Gemini API integration (full response or optional streaming as NDJSON)
- Startup indexing from `knowledge.json`

## Setup

1. Python 3.10+ recommended.
2. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
. .venv/bin/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
```

3. Configure environment variables:

Create a `.env` file (you can copy from `.env.example`) at the repo root or `backend/` and set:

```bash
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-1.5-flash  # optional
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2  # optional
```

4. Start the server:

```bash
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

## API

### GET /health

Returns `{ "status": "ok" }`.

### POST /chat

Request body:

```json
{ "query": "What are Krishiv's interests?", "stream": false }
```

Responses:

- Non-streaming (`stream=false`):

```json
{ "answer": "...", "context": [/* top-3 chunks */], "model": "gemini-1.5-flash" }
```

- Streaming (`stream=true`): `application/x-ndjson` where each line is JSON, e.g.:

```text
{"delta":"Hello"}
{"delta":" world"}
{"done":true}
```

## Knowledge Base

Edit `knowledge.json` in the repo root. Each entry must have `id`, `type`, and `content`.

Example:

```json
[
  { "id": "skill-1", "type": "skill", "content": "TypeScript, React, UI engineering." }
]
```


