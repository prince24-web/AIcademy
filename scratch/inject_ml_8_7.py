with open('scratch/ml_8_7_snippet.js', 'r', encoding='utf-8') as f:
    snippet = f.read()

target_file = 'app/learn/machine-learning/mlLessonsData.js'
with open(target_file, 'r', encoding='utf-8') as f:
    data = f.read()

target_closing = '  }\n};'
idx = data.rfind(target_closing)
if idx != -1:
    new_data = data[:idx] + '  },\n\n' + snippet + '\n'
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(new_data)
    print("Successfully injected ml-8-7 into mlLessonsData.js!")
else:
    print("Could not find closing target!")
