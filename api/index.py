import json
import os
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI(title="Portfolio Chat API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str
    stream: bool = False

# Load knowledge from the JSON file
def load_knowledge() -> List[Dict[str, Any]]:
    try:
        # Try multiple possible paths for the knowledge file
        possible_paths = [
            "knowledge.json",
            "../knowledge.json",
            "../../knowledge.json",
            "./knowledge.json"
        ]
        
        for path in possible_paths:
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except FileNotFoundError:
                continue
        
        print("Could not find knowledge.json in any expected location")
        return []
    except Exception as e:
        print(f"Error loading knowledge: {e}")
        return []

# Simple keyword-based response system
def generate_response(query: str, knowledge: List[Dict[str, Any]]) -> str:
    query_lower = query.lower()
    
    # Extract relevant knowledge based on query
    relevant_items = []
    
    if any(word in query_lower for word in ["skill", "skills", "tech", "stack", "technical"]):
        relevant_items = [item for item in knowledge if item.get("type") == "skill"]
        if relevant_items:
            skills = [item["content"] for item in relevant_items]
            return "Skills: " + ", ".join(skills)
    
    elif any(word in query_lower for word in ["project", "projects", "build", "create"]):
        relevant_items = [item for item in knowledge if item.get("type") == "project"]
        if relevant_items:
            projects = [item["content"] for item in relevant_items[:3]]  # Limit to 3
            return "Projects: " + ". ".join(projects)
    
    elif any(word in query_lower for word in ["experience", "work", "job", "intern"]):
        relevant_items = [item for item in knowledge if item.get("type") == "experience"]
        if relevant_items:
            experiences = [item["content"] for item in relevant_items[:3]]  # Limit to 3
            return "Experience: " + ". ".join(experiences)
    
    elif any(word in query_lower for word in ["language", "languages", "mandarin", "english"]):
        relevant_items = [item for item in knowledge if item.get("type") == "language"]
        if relevant_items:
            languages = [item["content"] for item in relevant_items]
            return "Languages: " + ", ".join(languages)
    
    elif any(word in query_lower for word in ["hello", "hi", "hey"]):
        return "Hello! I'm Krishiv's AI assistant. I can help you learn more about my background, skills, projects, and experience. What would you like to know?"
    
    # Default response with some general info
    intro_items = [item for item in knowledge if item.get("type") == "motivation"][:2]
    if intro_items:
        intro = intro_items[0]["content"]
        return f"{intro} Feel free to ask me about my skills, projects, or experience!"
    
    return "I'm Krishiv's AI assistant. I can tell you about my skills, projects, and experience. Feel free to ask me anything about my background!"

@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok", "message": "Portfolio Chat API is running"}

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        knowledge = load_knowledge()
        answer = generate_response(req.query, knowledge)
        
        return JSONResponse({
            "answer": answer,
            "context": [],
            "model": "simple-keyword",
        })
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return JSONResponse({
            "answer": "I'm having trouble responding right now. Please try again.",
            "context": []
        }, status_code=200)

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



