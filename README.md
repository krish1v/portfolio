# Krishiv Khatri - Personal Portfolio & AI Agent

A personal portfolio website with an AI agent that can answer questions about my background, projects, and experience. The agent uses a RAG (Retrieval-Augmented Generation) architecture with Qdrant vector database and Google Gemini API.

## Live Demo

**Portfolio**: [krishivkhatri.com](https://krishivkhatri.com)

## How the AI Agent Works

The chatbot is built as a personal knowledge assistant that can answer questions about my experience, projects, and background. Here's the technical implementation:

### Architecture Overview

**Frontend**: React/TypeScript application with a chat interface
**Backend**: FastAPI server hosted on Render
**Vector Database**: Qdrant cloud cluster for storing document embeddings
**LLM**: Google Gemini API for generating responses
**Embeddings**: Google Gemini embedding model for semantic search

### RAG Pipeline

1. **Knowledge Base**: Personal information is stored in `knowledge.json` with structured entries for projects, experience, skills, etc.

2. **Document Indexing**: On startup, the FastAPI server:
   - Loads the knowledge base
   - Generates embeddings using Google Gemini embedding API
   - Stores embeddings in a Qdrant cloud cluster

3. **Query Processing**: When a user asks a question:
   - The query is embedded using the same Gemini embedding model
   - Qdrant performs similarity search to find relevant knowledge entries
   - Top matching entries are retrieved as context

4. **Response Generation**: 
   - Retrieved context is combined with the user's question
   - Sent to Google Gemini API with a system prompt to act as my personal agent
   - Response is streamed back to the user

### Technical Stack

**Frontend**:
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS + shadcn/ui components
- Framer Motion for animations

**Backend**:
- FastAPI with Python 3.13
- Qdrant Python client for vector operations
- Google GenerativeAI SDK
- Hosted on Render with automatic deployments

**Infrastructure**:
- Qdrant Cloud cluster for vector storage
- Render for FastAPI hosting
- Vercel for frontend deployment

## Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Google Gemini API key
- Qdrant cloud cluster (or local Qdrant instance)

### Setup

1. **Clone and install dependencies**
```bash
git clone <your-repo-url>
cd personal-portfolio
npm install

# Set up Python environment
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\Activate.ps1 on Windows
pip install -r backend/requirements.txt
```

2. **Environment variables**
Create a `.env` file:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
QDRANT_URL=https://your-cluster.qdrant.io:6333
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION=knowledge
```

3. **Start development servers**
```bash
npm run dev  # Starts both frontend and backend
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:8000`

## API Endpoints

- `GET /health` - Health check
- `GET /warmup` - Warm up Qdrant and Gemini connections
- `POST /chat` - Chat with the AI agent
  - `stream=false`: Returns complete response
  - `stream=true`: Returns NDJSON stream for real-time responses

## Knowledge Base Structure

The `knowledge.json` file contains structured information:
```json
[
  {
    "id": "unique-id",
    "type": "experience|project|skill|background",
    "content": "Detailed information about the topic"
  }
]
```

The agent is trained to respond as if it's me, using this knowledge base to provide accurate information about my background and experience.

## Project Structure

```
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities
├── backend/               # FastAPI server
│   ├── main.py           # Main application
│   ├── embeddings.py     # Gemini embedding integration
│   ├── gemini_client.py  # Gemini API client
│   ├── vector_store.py   # Qdrant operations
│   └── requirements.txt  # Python dependencies
├── knowledge.json        # Personal knowledge base
└── package.json         # Frontend dependencies
```

## Deployment

### Frontend (Vercel)
The React app is deployed to Vercel with automatic deployments from the main branch.

### Backend (Render)
The FastAPI server is hosted on Render with the following configuration:
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**: Set `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`

### Vector Database (Qdrant Cloud)
Using a managed Qdrant cluster for vector storage with automatic backups and scaling.

## Updating the Knowledge Base

When you first deploy, the backend indexes `knowledge.json` into Qdrant. After that, it does **not** reindex on deploy (it skips if the collection already has points). So when you change `knowledge.json` or switch embedding models, you need to reindex manually.

**Option 1 – HTTP endpoint (e.g. from Render)**  
Set `REINDEX_SECRET` in your backend env. Then:

```bash
curl -X POST "https://your-backend.onrender.com/reindex" \
  -H "X-Reindex-Secret: your-secret"
```

**Option 2 – Local script**  
With `.env` in the project root (Qdrant + Gemini keys), from repo root:

```bash
PYTHONPATH=. python -c "from backend.vector_store import reindex; print(reindex())"
```

After a successful reindex, the agent uses the new knowledge and embedding model.

## License

MIT License - feel free to use this as a template for your own portfolio.
