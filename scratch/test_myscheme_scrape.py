import requests
from bs4 import BeautifulSoup
import json

url = "https://www.myscheme.gov.in/schemes/kdky"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

resp = requests.get(url, headers=headers, timeout=10)
soup = BeautifulSoup(resp.text, "html.parser")
next_data_tag = soup.find("script", id="__NEXT_DATA__")
if next_data_tag:
    data = json.loads(next_data_tag.string)
    print("Full NEXT DATA Keys:", data.keys())
    page_props = data.get("props", {}).get("pageProps", {})
    print("pageProps keys:", page_props.keys())
    # Save formatted JSON to file for inspection
    with open("scratch/next_data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("Saved next_data.json successfully")
