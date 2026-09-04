import re

with open('app/learn/machine-learning/mlLessonsData.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find("'ml-8-6':")
if start == -1:
    start = text.find('"ml-8-6":')

snippet = text[start:] if start != -1 else ""
emojis = re.findall(r'[\U00010000-\U0010ffff\u2600-\u27BF\u2300-\u23FF\u2B50]', snippet)
print("ml-8-6 curriculum emojis count:", len(emojis), set(emojis))

with open('app/learn/machine-learning/[lessonId]/WorkflowVisualComponents.js', 'r', encoding='utf-8') as f:
    text2 = f.read()

start2 = text2.find('ModelEvaluationPackagingStudio')
snippet2 = text2[start2:] if start2 != -1 else ""
emojis2 = re.findall(r'[\U00010000-\U0010ffff\u2600-\u27BF\u2300-\u23FF\u2B50]', snippet2)
print("ModelEvaluationPackagingStudio emojis count:", len(emojis2), set(emojis2))
