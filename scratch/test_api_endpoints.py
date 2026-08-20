import requests

endpoints = [
    "https://www.myscheme.gov.in/api/v1/schemes/kdky",
    "https://api.myscheme.gov.in/schemes/kdky",
    "https://cdn.myscheme.in/json/schemes/kdky.json",
    "https://www.myscheme.gov.in/_next/data/n9VxjzmsRgQd72KDpJgDo/en/schemes/kdky.json",
    "https://www.myscheme.gov.in/_next/data/n9VxjzmsRgQd72KDpJgDo/schemes/kdky.json"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

for ep in endpoints:
    try:
        r = requests.get(ep, headers=headers, timeout=5)
        print(f"[{r.status_code}] {ep}")
        if r.status_code == 200:
            print("Response preview:", r.text[:200])
    except Exception as e:
        print(f"[ERR] {ep}: {e}")
