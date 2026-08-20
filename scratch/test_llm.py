import requests
import json
import os

api_key = ""
if os.path.exists(".env"):
    with open(".env") as f:
        for line in f:
            if line.startswith("GEMINI_API_KEY="):
                api_key = line.split("=", 1)[1].strip()

print("GEMINI_API_KEY found:", bool(api_key))

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
headers = {"Content-Type": "application/json"}
payload = {
    "contents": [{
        "parts": [{"text": "Say hello in JSON format: {\"greeting\": \"hello\"}"}]
    }]
}

r = requests.post(url, headers=headers, json=payload, timeout=10)
print("Status:", r.status_code)
if r.status_code == 200:
    print("Response:", r.json())
else:
    print("Error text:", r.text[:300])
