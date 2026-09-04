from playwright.sync_api import sync_playwright
import time
import os

def capture():
    artifacts_dir = r"C:\Users\hp\.gemini\antigravity-ide\brain\803b12a5-9b1c-42d6-b99b-8a00b8e98a48"
    
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={'width': 1360, 'height': 900})
        page = context.new_page()
        
        url = 'http://localhost:3000/learn/machine-learning/ml-8-6'
        print(f"Navigating to {url}...")
        page.goto(url, wait_until='networkidle')
        time.sleep(2)
        
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        quiz_path = os.path.join(artifacts_dir, 'ml_8_6_takeaways_quiz.png')
        page.screenshot(path=quiz_path)
        print(f"Saved {quiz_path}")
            
        browser.close()

if __name__ == '__main__':
    capture()
