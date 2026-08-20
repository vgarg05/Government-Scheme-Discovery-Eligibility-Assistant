import requests
import json
import os

# Read SERPER_API_KEY from .env
api_key = ""
if os.path.exists(".env"):
    with open(".env") as f:
        for line in f:
            if line.startswith("SERPER_API_KEY="):
                api_key = line.split("=", 1)[1].strip()

endpoint = "https://google.serper.dev/search"

def test_search(query):
    headers = {"X-API-KEY": api_key, "Content-Type": "application/json"}
    payload = {"q": query, "num": 3, "gl": "in"}
    r = requests.post(endpoint, headers=headers, json=payload, timeout=10)
    print(f"--- QUERY: {query} ---")
    if r.status_code == 200:
        data = r.json()
        for item in data.get("organic", []):
            print("Title:", item.get("title"))
            print("Snippet:", item.get("snippet"))
            print("Link:", item.get("link"))
            print("-")

test_search('"Mukhyamantri Krishak Durghatna Kalyan Yojana" Benefits site:myscheme.gov.in')
test_search('"Mukhyamantri Krishak Durghatna Kalyan Yojana" Eligibility site:myscheme.gov.in')
