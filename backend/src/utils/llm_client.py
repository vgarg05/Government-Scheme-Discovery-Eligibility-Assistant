import requests
import json

from src.utils.config import settings

class LLMClient:
    """
    Client for calling Gemini 2.5 Flash API for dynamic LLM eligibility checking,
    disqualification adjudication, and benefit/document extraction.
    """
    def __init__(self, api_key: str = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model = "gemini-2.5-flash"
        self.endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"

    def generate_json(self, prompt: str) -> dict:
        """Call Gemini API and request clean JSON output."""
        if not self.api_key:
            return {}

        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": 0.1
            }
        }

        try:
            r = requests.post(self.endpoint, json=payload, timeout=12)
            if r.status_code == 200:
                res_data = r.json()
                text_out = res_data['candidates'][0]['content']['parts'][0]['text']
                return json.loads(text_out)
            else:
                print(f"[LLM CLIENT] Error {r.status_code}: {r.text[:200]}")
                return {}
        except Exception as e:
            print(f"[LLM CLIENT] Exception during call: {e}")
            return {}

llm_client = LLMClient()
