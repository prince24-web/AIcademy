from playwright.sync_api import sync_playwright
import time

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={'width': 1360, 'height': 900})
        page = context.new_page()
        print("Navigating to http://localhost:3000/learn/machine-learning/ml-8-4...")
        page.goto('http://localhost:3000/learn/machine-learning/ml-8-4', wait_until='networkidle')
        time.sleep(2)
        
        # 1. Capture Hero & Objectives
        page.screenshot(path='ml_8_4_hero.png')
        print("Saved ml_8_4_hero.png")
        
        # 2. Scroll to and capture Interactive Studio - Tab 1 (Leaderboard)
        studio = page.locator('text=Model Training & Baseline Tournament Studio').locator('xpath=ancestor::div[contains(@style, "linear-gradient")]')
        if studio.count() > 0:
            studio.first.scroll_into_view_if_needed()
            time.sleep(1)
            studio.first.screenshot(path='ml_8_4_studio_leaderboard.png')
            print("Saved ml_8_4_studio_leaderboard.png")
            
            # Click 'Metric Trade-Off Lab'
            tab_tradeoff = page.locator('button:has-text("Metric Trade-Off Lab")')
            if tab_tradeoff.count() > 0:
                tab_tradeoff.first.click()
                time.sleep(1)
                studio.first.screenshot(path='ml_8_4_studio_tradeoff.png')
                print("Saved ml_8_4_studio_tradeoff.png")
                
            # Click 'Confusion Matrix & Cost Audit'
            tab_cost = page.locator('button:has-text("Confusion Matrix & Cost Audit")')
            if tab_cost.count() > 0:
                tab_cost.first.click()
                time.sleep(1)
                studio.first.screenshot(path='ml_8_4_studio_cost_audit.png')
                print("Saved ml_8_4_studio_cost_audit.png")
                
                # Test selecting Balanced Logistic Regression in Cost Audit
                btn_balanced = page.locator('button:has-text("Logistic Regression")').nth(1)
                if btn_balanced.count() > 0:
                    btn_balanced.click()
                    time.sleep(1)
                    studio.first.screenshot(path='ml_8_4_studio_cost_audit_balanced.png')
                    print("Saved ml_8_4_studio_cost_audit_balanced.png")
                    
            # Click 'Champion Selection'
            tab_champ = page.locator('button:has-text("Champion Selection")')
            if tab_champ.count() > 0:
                tab_champ.first.click()
                time.sleep(1)
                studio.first.screenshot(path='ml_8_4_studio_champion.png')
                print("Saved ml_8_4_studio_champion.png")
                
        # 3. Capture Code Block & Takeaways & Quiz
        takeaways = page.locator('text=Key Takeaways')
        if takeaways.count() > 0:
            takeaways.first.scroll_into_view_if_needed()
            time.sleep(1)
            page.screenshot(path='ml_8_4_takeaways_quiz.png')
            print("Saved ml_8_4_takeaways_quiz.png")
            
        browser.close()

if __name__ == '__main__':
    capture()
