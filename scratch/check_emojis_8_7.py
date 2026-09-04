import re

def check_emojis(filename, start_query=None):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if start_query:
        pos = content.find(start_query)
        if pos != -1:
            content = content[pos:]
            
    # Emoji regex pattern
    emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]', flags=re.UNICODE)
    emojis = emoji_pattern.findall(content)
    print(f"{filename}: Found {len(emojis)} emojis")
    if emojis:
        print(f"Emojis found: {set(emojis)}")

print("Scanning for emojis in Chapter 8.7 code...")
check_emojis('app/learn/machine-learning/mlLessonsData.js', "'ml-8-7':")
check_emojis('app/learn/machine-learning/[lessonId]/WorkflowVisualComponents.js', "ProductionServingStudio")
