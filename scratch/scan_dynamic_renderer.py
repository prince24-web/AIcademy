import re

with open(r"app/learn/machine-learning/[lessonId]/page.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

emoji_pattern = re.compile(
    "["
    "\U0001F600-\U0001F64F"
    "\U0001F300-\U0001F5FF"
    "\U0001F680-\U0001F6FF"
    "\U0001F1E0-\U0001F1FF"
    "\U00002702-\U000027B0"
    "\U000024C2-\U0001F251"
    "\U0001F900-\U0001F9FF"
    "\U0001FA70-\U0001FAFF"
    "]+", flags=re.UNICODE
)

for idx in range(37850, len(lines)):
    line = lines[idx]
    matches = emoji_pattern.findall(line)
    if matches:
        print(f"Line {idx+1}: {len(matches)} emojis found")
