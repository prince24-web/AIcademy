path = 'app/learn/machine-learning/mlLessonsData.js'
with open(path, 'r', encoding='utf-8') as f:
    s = f.read()

bad_line = "'        print(f\"  Disparate Impact Ratio: {di_ratio:.3f} (80% Rule Compliance: {'PASS' if di_ratio >= 0.80 else 'FLAG'})\")',"
good_line = "'        status_str = \"PASS\" if di_ratio >= 0.80 else \"FLAG\"',\n          '        print(f\"  Disparate Impact Ratio: {di_ratio:.3f} (80% Rule Compliance: {status_str})\")',"

if bad_line in s:
    s = s.replace(bad_line, good_line)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)
    print("Replaced successfully!")
else:
    print("bad_line not found, checking...")
    for line in s.splitlines():
        if "Disparate Impact Ratio: {di_ratio:.3f}" in line:
            print("Found line:", repr(line))
            s = s.replace(line, good_line)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(s)
            print("Replaced via fallback search!")
            break
