import requests
import json
from src.utils.config import settings

class SerperSearchTool:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or settings.SERPER_API_KEY
        self.endpoint = "https://google.serper.dev/search"

    def search_government_portals(self, query: str, num_results: int = 5):
        """
        Executes a targeted Google Search via Serper API, constraining results to official .gov.in domains.
        """
        # Strictly restrict search exclusively to the official myscheme.gov.in portal
        domain_restricted_query = f"{query} site:myscheme.gov.in"

        if not self.api_key or self.api_key == "your_serper_api_key_here":
            print("[SERPER TOOL] Warning: No active SERPER_API_KEY configured. Returning fallback web results.")
            return self._fallback_response(query)

        headers = {
            "X-API-KEY": self.api_key,
            "Content-Type": "application/json"
        }

        payload = {
            "q": domain_restricted_query,
            "num": num_results,
            "gl": "in"  # Geo-location India
        }

        try:
            response = requests.post(self.endpoint, headers=headers, json=payload, timeout=10)
            if response.status_code == 200:
                data = response.json()
                organic_results = data.get("organic", [])

                formatted_results = []
                for item in organic_results:
                    formatted_results.append({
                        "title": item.get("title", ""),
                        "link": item.get("link", ""),
                        "snippet": item.get("snippet", ""),
                        "domain": "gov.in"
                    })

                return {
                    "success": True,
                    "query": query,
                    "domain_query": domain_restricted_query,
                    "total_results": len(formatted_results),
                    "results": formatted_results
                }
            else:
                return {
                    "success": False,
                    "error": f"Serper API HTTP Error {response.status_code}: {response.text}",
                    "results": []
                }

        except Exception as e:
            return {
                "success": False,
                "error": f"Serper API Request Failed: {str(e)}",
                "results": []
            }

    def _fallback_response(self, query: str):
        """Fallback response when Serper API Key is not yet set."""
        return {
            "success": True,
            "query": query,
            "domain_query": f"{query} (site:gov.in)",
            "is_fallback": True,
            "total_results": 2,
            "results": [
                {
                    "title": f"Official Portal Info - {query}",
                    "link": "https://www.myscheme.gov.in/",
                    "snippet": f"Official government welfare portal providing details and eligibility rules for {query}.",
                    "domain": "myscheme.gov.in"
                },
                {
                    "title": f"National Portal of India - Welfare Schemes",
                    "link": "https://www.india.gov.in/my-government/schemes",
                    "snippet": "Central portal for citizen services and official government scheme notifications.",
                    "domain": "india.gov.in"
                }
            ]
        }

# Instantiated helper instance
serper_tool = SerperSearchTool()
