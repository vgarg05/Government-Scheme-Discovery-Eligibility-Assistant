from playwright.sync_api import sync_playwright

def scrape_all_tabs(url):
    print(f"[PLAYWRIGHT TEST] Extracting ALL tabs from: {url}")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="domcontentloaded", timeout=20000)
        page.wait_for_timeout(2500)

        # Benefits
        benefits_el = page.query_selector("#benefits") or page.query_selector("[id*='benefit']")
        raw_benefits = benefits_el.inner_text() if benefits_el else ""

        # Eligibility
        eligibility_el = page.query_selector("#eligibility") or page.query_selector("[id*='eligib']")
        raw_eligibility = eligibility_el.inner_text() if eligibility_el else ""

        # Documents Required
        docs_el = page.query_selector("#documents-required") or page.query_selector("#documents") or page.query_selector("[id*='docu']")
        raw_docs = docs_el.inner_text() if docs_el else ""

        # Application Process
        process_el = page.query_selector("#application-process") or page.query_selector("#process") or page.query_selector("[id*='process']")
        raw_process = process_el.inner_text() if process_el else ""

        browser.close()

        return {
            "benefits": raw_benefits,
            "eligibility": raw_eligibility,
            "docs": raw_docs,
            "process": raw_process
        }

if __name__ == "__main__":
    res = scrape_all_tabs("https://www.myscheme.gov.in/schemes/kdky")
    print("\n--- DOCUMENTS REQUIRED ---")
    print(res["docs"][:400] if res["docs"] else "Docs tab not found")
    print("\n--- APPLICATION PROCESS ---")
    print(res["process"][:400] if res["process"] else "Process tab not found")
