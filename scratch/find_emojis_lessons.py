with open('app/learn/machine-learning/mlLessonsData.js', 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        for ch in line:
            code = ord(ch)
            if (0x1F300 <= code <= 0x1F9FF) or (0x2600 <= code <= 0x27BF) or (0x1F600 <= code <= 0x1F64F) or (0x1F680 <= code <= 0x1F6FF):
                safe_line = line.strip().encode('ascii', 'backslashreplace').decode('ascii')
                print(f"Line {line_num}: U+{code:04X} -> {safe_line[:80]}")
