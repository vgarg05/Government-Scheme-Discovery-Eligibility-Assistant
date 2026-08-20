import re
from typing import Dict, Any, List
from playwright.sync_api import sync_playwright

class PlaywrightMySchemeScraper:
    """
    Playwright DOM Scraper for myScheme.gov.in.
    Launches headless Chromium to render Next.js SPA pages and extracts exact inner text
    from #benefits, #eligibility, #documents-required, and #application-process DOM elements with 100% fidelity.
    """

    def scrape_scheme_details(self, portal_url: str) -> Dict[str, Any]:
        """
        Navigates to a myScheme portal URL and extracts exact DOM sections.
        """
        if not portal_url or "myscheme.gov.in" not in portal_url:
            return {}

        clean_url = portal_url.strip().rstrip(";").rstrip(".").rstrip(",")
        print(f"[PLAYWRIGHT SCRAPER] Launching Chromium to scrape all tabs from: {clean_url}")

        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                page = browser.new_page()
                page.goto(clean_url, wait_until="domcontentloaded", timeout=15000)

                # Wait up to 2.5 seconds for dynamic React elements to render
                page.wait_for_timeout(2500)

                # 1. Extract exact Benefits DOM text
                benefits_el = (
                    page.query_selector("#benefits") or 
                    page.query_selector("[id*='benefit']")
                )
                raw_benefits = benefits_el.inner_text() if benefits_el else ""

                # 2. Extract exact Eligibility DOM text
                eligibility_el = (
                    page.query_selector("#eligibility") or 
                    page.query_selector("[id*='eligib']")
                )
                raw_eligibility = eligibility_el.inner_text() if eligibility_el else ""

                # 3. Extract exact Documents Required DOM text
                docs_el = (
                    page.query_selector("#documents-required") or 
                    page.query_selector("#documents") or 
                    page.query_selector("[id*='docu']")
                )
                raw_docs = docs_el.inner_text() if docs_el else ""

                # 4. Extract exact Application Process DOM text
                process_el = (
                    page.query_selector("#application-process") or 
                    page.query_selector("#process") or 
                    page.query_selector("[id*='process']")
                )
                raw_process = process_el.inner_text() if process_el else ""

                browser.close()

                # Process benefits lines
                benefit_lines = []
                if raw_benefits:
                    for line in raw_benefits.split("\n"):
                        cleaned = line.strip().rstrip('.').rstrip(';').strip()
                        if cleaned and cleaned.lower() not in ["benefits", "scheme benefits"] and len(cleaned) > 10:
                            benefit_lines.append(cleaned)

                # Process eligibility lines
                eligibility_lines = []
                if raw_eligibility:
                    for line in raw_eligibility.split("\n"):
                        cleaned = line.strip().rstrip('.').rstrip(';').strip()
                        if cleaned and cleaned.lower() not in ["eligibility", "scheme eligibility"] and len(cleaned) > 8:
                            eligibility_lines.append(cleaned)

                # Process documents lines
                doc_lines = []
                if raw_docs:
                    for line in raw_docs.split("\n"):
                        cleaned = line.strip().rstrip('.').rstrip(';').strip()
                        if cleaned and cleaned.lower() not in ["documents required", "documents", "scheme documents"] and len(cleaned) > 5:
                            doc_lines.append(cleaned)

                # Process application process lines
                process_lines = []
                if raw_process:
                    for line in raw_process.split("\n"):
                        cleaned = line.strip().rstrip('.').rstrip(';').strip()
                        if cleaned and cleaned.lower() not in ["application process", "process", "how to apply"] and len(cleaned) > 5:
                            process_lines.append(cleaned)

                print(f"[PLAYWRIGHT SCRAPER] Successfully extracted DOM text for Benefits ({len(benefit_lines)}), Eligibility, Documents ({len(doc_lines)}), & Process ({len(process_lines)})!")

                return {
                    "benefits": benefit_lines[:12],
                    "eligibility_text": "\n".join(eligibility_lines) if eligibility_lines else raw_eligibility,
                    "docs": doc_lines[:10],
                    "process_steps": process_lines[:12],
                    "raw_benefits": raw_benefits,
                    "raw_eligibility": raw_eligibility,
                    "raw_docs": raw_docs,
                    "raw_process": raw_process
                }
        except Exception as e:
            print(f"[PLAYWRIGHT SCRAPER] Scrape exception: {e}")
            return {}

playwright_scraper = PlaywrightMySchemeScraper()
