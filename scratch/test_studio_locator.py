from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    page = b.new_page()
    page.on('pageerror', lambda err: print(f"PAGE ERROR STACK:\n{err.stack if hasattr(err, 'stack') else err}"))
    
    page.goto('http://localhost:3000/learn/machine-learning/ml-8-7', wait_until='networkidle')
    page.wait_for_timeout(2000)
    
    b.close()
