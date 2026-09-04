from playwright.sync_api import sync_playwright
import time
import os

def capture():
    artifacts_dir = r"C:\Users\hp\.gemini\antigravity-ide\brain\803b12a5-9b1c-42d6-b99b-8a00b8e98a48"
    
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={'width': 1360, 'height': 900})
        page = context.new_page()
        
        url = 'http://localhost:3000/learn/machine-learning/ml-8-7'
        print(f"Navigating to {url}...")
        page.goto(url, wait_until='networkidle')
        time.sleep(2)
        
        # 1. Hero & Learning Objectives
        hero_path = os.path.join(artifacts_dir, 'ml_8_7_hero_objectives.png')
        page.screenshot(path=hero_path)
        print(f"Saved {hero_path}")
        
        # 2. Studio Tabs
        studio = page.locator('text=Production Serving, FastAPI & ROI Audit Studio').locator('xpath=ancestor::div[contains(@style, "border")][last()]')
        if studio.count() > 0:
            studio.first.scroll_into_view_if_needed()
            time.sleep(1)
            
            # Tab 1: REST Console (Send request first)
            btn_exec = page.locator('button:has-text("EXECUTE HTTP REQUEST")')
            if btn_exec.count() > 0:
                btn_exec.first.click()
                time.sleep(1)
            s1_path = os.path.join(artifacts_dir, 'ml_8_7_studio_rest_console.png')
            studio.first.screenshot(path=s1_path)
            print(f"Saved {s1_path}")
            
            # Tab 2: Data Drift & PSI Radar
            btn_drift = page.locator('button:has-text("Data Drift & PSI Radar")')
            if btn_drift.count() > 0:
                btn_drift.first.click()
                time.sleep(1)
                s2_path = os.path.join(artifacts_dir, 'ml_8_7_studio_drift_radar.png')
                studio.first.screenshot(path=s2_path)
                print(f"Saved {s2_path}")
                
            # Tab 3: Production Telemetry
            btn_telem = page.locator('button:has-text("Production Telemetry")')
            if btn_telem.count() > 0:
                btn_telem.first.click()
                time.sleep(1)
                s3_path = os.path.join(artifacts_dir, 'ml_8_7_studio_telemetry.png')
                studio.first.screenshot(path=s3_path)
                print(f"Saved {s3_path}")
                
            # Tab 4: Executive ROI Balance Sheet
            btn_roi = page.locator('button:has-text("Executive ROI Balance Sheet")')
            if btn_roi.count() > 0:
                btn_roi.first.click()
                time.sleep(1)
                s4_path = os.path.join(artifacts_dir, 'ml_8_7_studio_roi_ledger.png')
                studio.first.screenshot(path=s4_path)
                print(f"Saved {s4_path}")
                
        # 3. Takeaways & Quiz
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        quiz_path = os.path.join(artifacts_dir, 'ml_8_7_takeaways_quiz.png')
        page.screenshot(path=quiz_path)
        print(f"Saved {quiz_path}")
        
        browser.close()

if __name__ == '__main__':
    capture()
