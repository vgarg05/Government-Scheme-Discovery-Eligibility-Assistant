from playwright.sync_api import sync_playwright
import json

def scrape_myscheme(url):
    print(f"[PLAYWRIGHT] Navigating to: {url}")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="networkidle", timeout=20000)

        # Print page title
        print("Page Title:", page.title())

        # Check for benefits and eligibility divs / headings
        content = page.content()
        
        # Extract text from #benefits or elements containing 'Benefits'
        benefits_el = page.query_selector("#benefits") or page.query_selector("[id*='benefit']")
        benefits_text = benefits_el.inner_text() if benefits_el else "Not found via #benefits"

        # Extract text from #eligibility or elements containing 'Eligibility'
        eligibility_el = page.query_selector("#eligibility") or page.query_selector("[id*='eligib']")
        eligibility_text = eligibility_el.inner_text() if eligibility_el else "Not found via #eligibility"

        # Also search for tab buttons or sections
        all_headings = page.eval_on_selector_all("h1, h2, h3, h4, div", "elements => elements.map(e => e.innerText)")
        filtered_headings = [h for h in all_headings if any(k in h.lower() for k in ["benefit", "eligib", "compensation", "lakh", "5 lakh"])]

        browser.close()

        return {
            "benefits_text": benefits_text,
            "eligibility_text": eligibility_text,
            "filtered_headings_sample": filtered_headings[:5]
        }

if __name__ == "__main__":
    res = scrape_myscheme("https://www.myscheme.gov.in/schemes/kdky")
    print("\n--- RESULTS ---")
    print("Benefits Text:\n", res["benefits_text"][:500])
    print("\nEligibility Text:\n", res["eligibility_text"][:500])
