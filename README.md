# Krishiv Khatri - Personal Portfolio & AI Chatbot

A modern, interactive portfolio website featuring an AI-powered chatbot that can answer questions about Krishiv's background, projects, and experience. Built with React, TypeScript, and a custom RAG (Retrieval-Augmented Generation) backend.

## 🚀 Live Demo

**Portfolio**: [krishivkhatri.com](https://krishivkhatri.com)  
**Chat with AI**: Try the interactive chatbot on the site!

## ✨ Key Features

### 🤖 **AI Chatbot Implementation**
- **Personal Knowledge Base**: Powered by a comprehensive knowledge base containing Krishiv's experience, projects, and background
- **RAG Architecture**: Uses ChromaDB + Gemini API for intelligent, context-aware responses
- **Real-time Streaming**: Supports both streaming and non-streaming responses
- **Semantic Search**: Advanced embedding-based retrieval for relevant answers
- **Custom Training**: Trained on personal data including projects, skills, and experiences

### 🎨 **Modern Portfolio Design**
- **Responsive Design**: Optimized for all devices with smooth animations
- **Dark/Light Theme**: Dynamic theme switching with system preference detection
- **Interactive Sections**: Hero, About, Projects, Experience, and Contact sections
- **Framer Motion**: Smooth animations and micro-interactions throughout
- **Professional UI**: Clean, modern design using shadcn/ui components

### 🔧 **Technical Stack**

**Frontend:**
- React 18 + TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui component library
- Framer Motion for animations
- React Router for navigation

**Backend:**
- FastAPI (Python) with async support
- ChromaDB for vector storage
- Google Gemini API for AI responses
- Sentence Transformers for embeddings
- Pydantic for data validation

**AI/ML:**
- RAG (Retrieval-Augmented Generation) pipeline
- MiniLM embeddings for semantic search
- Context-aware prompting
- Streaming response support

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Google Gemini API key

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd personal-portfolio
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Set up Python environment**
```bash
python -m venv .venv
# Windows
.\.venv\Scripts\Activate.ps1
# macOS/Linux
source .venv/bin/activate

pip install -r backend/requirements.txt
```

4. **Configure environment variables**
Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

5. **Start development servers**
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run server  # Backend only
npm run dev:mock  # Frontend with mock backend
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:8000`.

## 🤖 Chatbot Architecture

### Knowledge Base
The chatbot uses a structured knowledge base (`knowledge.json`) containing:
- **Experience**: Internships, projects, and leadership roles
- **Skills**: Technical skills, frameworks, and tools
- **Projects**: Detailed project descriptions and tech stacks
- **Background**: Education, interests, and personal information

### RAG Pipeline
1. **Indexing**: Knowledge base is chunked and embedded using MiniLM
2. **Retrieval**: User queries are embedded and matched against stored chunks
3. **Generation**: Top relevant chunks are sent to Gemini API with context
4. **Response**: AI generates personalized answers based on retrieved information

### API Endpoints
- `GET /health` - Health check
- `POST /chat` - Chat endpoint with streaming support
  - `stream=false`: Returns complete response
  - `stream=true`: Returns NDJSON stream

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── sections/        # Page sections (Hero, About, etc.)
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── styles/             # Global styles
├── backend/
│   ├── main.py             # FastAPI application
│   ├── embeddings.py       # Embedding utilities
│   ├── gemini_client.py    # Gemini API integration
│   ├── vector_store.py     # ChromaDB operations
│   └── requirements.txt    # Python dependencies
├── public/
│   ├── images/             # Static images
│   ├── favicon.ico         # Site favicon
│   ├── robots.txt          # SEO configuration
│   └── sitemap.xml         # Search engine sitemap
├── knowledge.json          # AI knowledge base
└── package.json            # Node.js dependencies
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Render)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 🔧 Customization

### Adding Content
1. **Update knowledge.json**: Add new entries with `id`, `type`, and `content`
2. **Restart backend**: The knowledge base is re-indexed on startup
3. **Test chatbot**: Ask questions about your new content

### Styling
- **Theme**: Modify `src/components/ThemeProvider.tsx`
- **Components**: Customize shadcn/ui components in `src/components/ui/`
- **Animations**: Adjust Framer Motion variants in section components

### SEO Optimization
- **Meta tags**: Update `index.html` for better search visibility
- **Sitemap**: Modify `public/sitemap.xml` for new pages
- **Robots**: Configure `public/robots.txt` for crawler access

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Fast Loading**: Optimized images, code splitting, and lazy loading
- **Mobile First**: Responsive design with touch-friendly interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the chatbot with new knowledge
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Krishiv Khatri**  
*Computer Science Student at Georgia Tech | AI & Software Engineer*
