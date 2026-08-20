from playwright.sync_api import sync_playwright

def inspect_process_tabs(url):
    print(f"[PLAYWRIGHT INSPECT] Opening: {url}")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="domcontentloaded", timeout=20000)
        page.wait_for_timeout(3000)

        # 1. Print all tab buttons inside application process section
        buttons = page.query_selector_all("#application-process button, #application-process [role='tab'], div:has-text('Application Process') button")
        print(f"Found {len(buttons)} buttons/tabs in process section:")
        for b in buttons:
            print(" - Button text:", b.inner_text().strip())

        # 2. Get text before clicking
        process_el = page.query_selector("#application-process") or page.query_selector("[id*='process']")
        online_text = process_el.inner_text() if process_el else ""
        print("\n--- ONLINE TAB TEXT ---")
        print(online_text[:300])

        # 3. Find and click 'Offline' button specifically
        offline_btn = page.query_selector("button:has-text('Offline')") or page.query_selector("span:has-text('Offline')") or page.query_selector("div:has-text('Offline')")
        if offline_btn:
            print("\n[CLICKING OFFLINE TAB...]")
            offline_btn.click(force=True)
            page.wait_for_timeout(1500)
            offline_text = process_el.inner_text() if process_el else ""
            print("\n--- OFFLINE TAB TEXT ---")
            print(offline_text[:300])
        else:
            print("\n[WARN] No Offline button found on page!")

        browser.close()

if __name__ == "__main__":
    inspect_process_tabs("https://www.myscheme.gov.in/schemes/kdky")
