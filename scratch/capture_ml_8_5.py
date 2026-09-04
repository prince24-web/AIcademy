from playwright.sync_api import sync_playwright
import time
import os

def capture():
    artifacts_dir = r"C:\Users\hp\.gemini\antigravity-ide\brain\803b12a5-9b1c-42d6-b99b-8a00b8e98a48"
    
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={'width': 1360, 'height': 900})
        page = context.new_page()
        
        url = 'http://localhost:3000/learn/machine-learning/ml-8-5'
        print(f"Navigating to {url}...")
        page.goto(url, wait_until='networkidle')
        time.sleep(2)
        
        # 1. Hero & Objectives
        hero_path = os.path.join(artifacts_dir, 'ml_8_5_hero_objectives.png')
        page.screenshot(path=hero_path)
        print(f"Saved {hero_path}")
        
        # 2. Scroll to Interactive Studio
        studio = page.locator('text=Hyperparameter Optimization (Optuna Tuning) Studio').locator('xpath=ancestor::div[contains(@style, "linear-gradient")]')
        if studio.count() > 0:
            studio.first.scroll_into_view_if_needed()
            time.sleep(1)
            
            # Tab 1: Strategies
            s1_path = os.path.join(artifacts_dir, 'ml_8_5_studio_strategies.png')
            studio.first.screenshot(path=s1_path)
            print(f"Saved {s1_path}")
            
            # Tab 2: Optuna Convergence
            btn_conv = page.locator('button:has-text("Optuna Convergence")')
            if btn_conv.count() > 0:
                btn_conv.first.click()
                time.sleep(1)
                s2_path = os.path.join(artifacts_dir, 'ml_8_5_studio_convergence.png')
                studio.first.screenshot(path=s2_path)
                print(f"Saved {s2_path}")
                
            # Tab 3: Parameter Importance
            btn_imp = page.locator('button:has-text("Parameter Importance")')
            if btn_imp.count() > 0:
                btn_imp.first.click()
                time.sleep(1)
                s3_path = os.path.join(artifacts_dir, 'ml_8_5_studio_importance.png')
                studio.first.screenshot(path=s3_path)
                print(f"Saved {s3_path}")
                
            # Tab 4: Parameter Sandbox
            btn_sand = page.locator('button:has-text("Parameter Sandbox")')
            if btn_sand.count() > 0:
                btn_sand.first.click()
                time.sleep(1)
                s4_path = os.path.join(artifacts_dir, 'ml_8_5_studio_sandbox.png')
                studio.first.screenshot(path=s4_path)
                print(f"Saved {s4_path}")
        
        # 3. Takeaways & Quiz
        quiz_sec = page.locator('text=Key Takeaways').locator('xpath=ancestor::div[contains(@style, "margin")]')
        if quiz_sec.count() > 0:
            quiz_sec.first.scroll_into_view_if_needed()
            time.sleep(1)
            quiz_path = os.path.join(artifacts_dir, 'ml_8_5_takeaways_quiz.png')
            page.screenshot(path=quiz_path)
            print(f"Saved {quiz_path}")
            
        browser.close()

if __name__ == '__main__':
    capture()
