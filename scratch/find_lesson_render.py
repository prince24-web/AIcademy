with open(r"app/learn/machine-learning/[lessonId]/page.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "lesson." in line and not line.strip().startswith("//"):
        print(f"Line {i+1}: {line.strip()[:100]}")
