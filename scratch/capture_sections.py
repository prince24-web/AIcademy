from playwright.sync_api import sync_playwright
import time

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={'width': 1360, 'height': 1000})
        page = context.new_page()
        print("Navigating to http://localhost:3000/learn/machine-learning/ml-8-3...")
        page.goto('http://localhost:3000/learn/machine-learning/ml-8-3', wait_until='networkidle')
        time.sleep(2)
        
        # 1. Top of page: Title, Subtitle, Objectives
        page.screenshot(path='ml_8_3_top_objectives.png')
        print("Saved ml_8_3_top_objectives.png")
        
        # 2. Section 1 code block
        sec1_block = page.locator('text=1. Strict Partitioning & Leak-Proof Split Hygiene').locator('xpath=ancestor::div[contains(@class, "sectionCard") or contains(@class, "lessonSection")]')
        if sec1_block.count() > 0:
            sec1_block.first.scroll_into_view_if_needed()
            time.sleep(1)
            sec1_block.first.screenshot(path='ml_8_3_section_1_full.png')
            print("Saved ml_8_3_section_1_full.png")
        else:
            # Fallback scroll
            page.evaluate("window.scrollBy(0, 800)")
            time.sleep(1)
            page.screenshot(path='ml_8_3_section_1_full.png')
            print("Saved scrolled ml_8_3_section_1_full.png")
            
        # 3. Section 2 code block
        sec2 = page.locator('text=2. Domain Interaction Engineering')
        if sec2.count() > 0:
            sec2.first.scroll_into_view_if_needed()
            time.sleep(1)
            page.screenshot(path='ml_8_3_section_2.png')
            print("Saved ml_8_3_section_2.png")
            
        browser.close()

if __name__ == '__main__':
    capture()
