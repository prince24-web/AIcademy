from playwright.sync_api import sync_playwright
import time

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={'width': 1360, 'height': 1000})
        page = context.new_page()
        page.goto('http://localhost:3000/learn/machine-learning/ml-8-3', wait_until='networkidle')
        time.sleep(2)
        
        # Scroll to see output and pro tip of section 1
        page.evaluate("window.scrollBy(0, 1400)")
        time.sleep(1)
        page.screenshot(path='ml_8_3_output_and_protip.png')
        print("Saved ml_8_3_output_and_protip.png")
        browser.close()

if __name__ == '__main__':
    capture()
