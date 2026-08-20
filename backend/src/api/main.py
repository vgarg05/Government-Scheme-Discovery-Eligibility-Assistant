import os
import json
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field

from src.utils.config import settings
from src.agents.orchestrator import orchestrator
from src.utils.translator import translator
from src.tools.audio_tool import audio_tool

# Initialize FastAPI App
app = FastAPI(
    title="Government Scheme Discovery & Eligibility Assistant API",
    description="Multi-Agent AI REST API for Citizen Empowerment (Local RAG + Serper API Web Search)",
    version="1.0.0"
)

# Enable CORS Middleware for React Frontend Requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Day 18: In-Memory Response Cache to avoid redundant LLM/Agent calls
response_cache: Dict[str, Dict[str, Any]] = {}

# Pydantic Request Models
class ChatRequest(BaseModel):
    query: str = Field(..., example="I am a 45 year old farmer from UP with income 80,000 per year")
    target_language: Optional[str] = Field("en", example="hi")
    conversation_history: Optional[List[Dict[str, Any]]] = Field(default_factory=list)

class TTSRequest(BaseModel):
    text: str = Field(..., example="Good news! You are eligible for PM Kisan Samman Nidhi.")
    language: Optional[str] = Field("en", example="hi")

# --- API Endpoints ---

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Government Scheme Discovery & Eligibility Assistant API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "chat": "/api/chat",
            "schemes": "/api/schemes",
            "tts": "/api/text-to-speech",
            "stt": "/api/audio-to-text"
        }
    }

@app.get("/api/health")
def health_check():
    pdf_count = len(os.listdir(settings.RAW_PDFS_DIR)) if os.path.exists(settings.RAW_PDFS_DIR) else 0
    return {
        "status": "healthy",
        "vector_db_path": settings.CHROMA_PERSIST_DIR,
        "raw_pdfs_count": pdf_count,
        "similarity_threshold": settings.COSINE_SIMILARITY_THRESHOLD,
        "cached_queries_count": len(response_cache)
    }

@app.post("/api/chat")
def process_chat_query(request: ChatRequest):
    """
    Day 16: Primary API Endpoint.
    Executes Multi-Agent pipeline (Profile -> RAG -> Router -> Serper Search -> Adjudicator -> Counselor).
    Now supports conversation history.
    """
    query = request.query.strip()
    target_lang = request.target_language or "en"
    history = request.conversation_history or []
    
    # Check cache only if there is no conversation history
    if not history:
        cache_key = f"{query.lower()}_{target_lang}"
        if cache_key in response_cache:
            print(f"[FASTAPI CACHE] Returning cached response for query: '{query}'")
            return response_cache[cache_key]

    if not query:
        raise HTTPException(status_code=400, detail="Query string cannot be empty.")

    try:
        # Run Multi-Agent Orchestrator Pipeline with conversation history
        agent_state = orchestrator.run(query, conversation_history=history)
        output = agent_state.final_output

        # Handle Clarification Prompt
        if output.get("clarification_needed"):
            response_payload = {
                "status": "clarification_required",
                "query": query,
                "clarification": {
                    "prompt": output.get("prompt"),
                    "missing_fields": output.get("missing_fields", [])
                },
                "user_profile": agent_state.user_profile.dict()
            }
            return response_payload

        # Multilingual Translation
        summary = output.get("summary", "")
        if target_lang != "en" and summary:
            print(f"[MAIN] Translating summary to '{target_lang}' (len={len(summary)})...")
            translated_summary = translator.translate_text(summary, target_lang=target_lang)
            if translated_summary and translated_summary != summary:
                print(f"[MAIN] Translation SUCCESS. Preview: {translated_summary[:100]}")
            else:
                print(f"[MAIN] Translation FAILED or returned same text. Falling back to English.")
                translated_summary = summary
            output["translated_summary"] = translated_summary
            output["language"] = target_lang
        else:
            # Always set translated_summary to summary for English so frontend has consistent field
            output["translated_summary"] = summary
            output["language"] = target_lang

        response_payload = {
            "status": "success",
            "query": query,
            "response": output,
            "user_profile": agent_state.user_profile.dict()
        }

        # Cache response only for single-turn queries
        if not history:
            cache_key = f"{query.lower()}_{target_lang}"
            response_cache[cache_key] = response_payload

        return response_payload

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent Pipeline Execution Error: {str(e)}")

@app.get("/api/text-to-speech")
def generate_text_to_speech_get(text: str, lang: Optional[str] = "en"):
    """
    Text-to-Speech GET Endpoint for HTML5 Audio playback.
    Auto-translates English text into the target language before generating audio,
    so the spoken voice matches the selected language.
    """
    # Translate text to target language before generating audio
    if lang and lang != "en":
        print(f"[TTS] Translating text to '{lang}' before audio generation...")
        text = translator.translate_text(text, target_lang=lang)

    file_path = audio_tool.text_to_speech_file(text, lang=lang)
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=500, detail="Failed to generate audio file.")

    return FileResponse(
        path=file_path,
        media_type="audio/mpeg",
        filename="speech_response.mp3"
    )

@app.post("/api/text-to-speech")
def generate_text_to_speech_post(request: TTSRequest):
    """
    Text-to-Speech POST Endpoint.
    """
    file_path = audio_tool.text_to_speech_file(request.text, lang=request.language)
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=500, detail="Failed to generate audio file.")

    return FileResponse(
        path=file_path,
        media_type="audio/mpeg",
        filename="speech_response.mp3"
    )

@app.post("/api/audio-to-text")
async def speech_to_text(file: UploadFile = File(...)):
    """
    Day 17: Speech-to-Text Endpoint.
    Transcribes uploaded user audio file to natural language text.
    """
    contents = await file.read()
    transcribed_text = audio_tool.speech_to_text(contents)
    return {
        "status": "success",
        "filename": file.filename,
        "transcribed_text": transcribed_text
    }

@app.get("/api/schemes")
def get_all_schemes():
    """
    Returns list of pre-indexed schemes from all_schemes.json master dataset.
    """
    json_path = os.path.join(settings.BASE_DIR, "data", "all_schemes.json")
    if not os.path.exists(json_path):
        raise HTTPException(status_code=44, detail="Master schemes dataset not found.")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    return {
        "total_schemes": len(data),
        "schemes": data
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
