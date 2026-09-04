from playwright.sync_api import sync_playwright
import time

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={'width': 1360, 'height': 900})
        page = context.new_page()
        print("Navigating to http://localhost:3000/learn/machine-learning/ml-8-3...")
        page.goto('http://localhost:3000/learn/machine-learning/ml-8-3', wait_until='networkidle')
        time.sleep(2)
        
        # Capture Hero & Colab Cells
        page.screenshot(path='fe_hero_and_colab.png')
        print("Saved fe_hero_and_colab.png")
        
        # Scroll to Interactive Studio
        studio = page.locator('text=Data Cleaning & Feature Engineering Pipeline Studio').locator('xpath=ancestor::div[contains(@style, "linear-gradient")]')
        if studio.count() > 0:
            studio.first.scroll_into_view_if_needed()
            time.sleep(1)
            studio.first.screenshot(path='fe_studio_pipeline_dag.png')
            print("Saved fe_studio_pipeline_dag.png")
            
            # Click 'Interaction Feature Lab'
            tab_interaction = page.locator('button:has-text("Interaction Feature Lab")')
            if tab_interaction.count() > 0:
                tab_interaction.first.click()
                time.sleep(1)
                studio.first.screenshot(path='fe_studio_charge_ratio.png')
                print("Saved fe_studio_charge_ratio.png")
                
                # Click 'Service Depth'
                btn_service = page.locator('button:has-text("Service Depth")')
                if btn_service.count() > 0:
                    btn_service.first.click()
                    time.sleep(1)
                    studio.first.screenshot(path='fe_studio_service_depth.png')
                    print("Saved fe_studio_service_depth.png")
                    
            # Click 'Multicollinearity & VIF'
            tab_vif = page.locator('button:has-text("Multicollinearity & VIF")')
            if tab_vif.count() > 0:
                tab_vif.first.click()
                time.sleep(1)
                studio.first.screenshot(path='fe_studio_vif.png')
                print("Saved fe_studio_vif.png")
                
            # Click 'Leakage Guardrails'
            tab_guard = page.locator('button:has-text("Leakage Guardrails")')
            if tab_guard.count() > 0:
                tab_guard.first.click()
                time.sleep(1)
                studio.first.screenshot(path='fe_studio_guardrails.png')
                print("Saved fe_studio_guardrails.png")
                
        browser.close()

if __name__ == '__main__':
    capture()
