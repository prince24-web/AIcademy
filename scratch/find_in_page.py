with open(r"app/learn/machine-learning/[lessonId]/page.js", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f, 1):
        if "ProblemFramingInteractiveStudio" in line or "DataIngestionEDAStudio" in line or "renderDiagram" in line:
            print(f"Line {idx}: {line.strip()[:100]}")
