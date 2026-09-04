with open('app/learn/machine-learning/mlLessonsData.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find("'ml-8-6':")
lines = text[start:].splitlines()
for idx, l in enumerate(lines):
    trimmed = l.strip()
    if trimmed.startswith("'") and (trimmed.endswith("',") or trimmed.endswith("'")):
        inner = trimmed[1:-2] if trimmed.endswith("',") else trimmed[1:-1]
        for i, ch in enumerate(inner):
            if ch == "'" and (i == 0 or inner[i-1] != "\\"):
                print(f"Line {idx+1}: {trimmed}")
                break
