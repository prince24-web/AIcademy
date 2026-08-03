// ─── GEEKSFORGEEKS POWERED PYTHON LESSON DATABASE (ALL 12 MODULES) ─────

export const lessonsData = {
  // ─── MODULE 1: PYTHON BASICS ───────────────────────────────────────────
  '1-1': {
    title: 'Introduction to Python',
    subtitle: 'The Language',
    section: 'Module 1 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/introduction-to-python/',
    description: 'Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It is known for its clean syntax, readability, and wide usage in AI, web development, and data science.',
    challengeIntro: 'Welcome to your first Python program! Execute a print statement to output text to the console.',
    instructions: [
      'Look at the code: print("Hello Python!")',
      'Press the "Run Code" button to execute it',
      'Verify that "Hello Python!" appears in the output'
    ],
    initialCode: 'print("Hello Python!")',
    expectedOutput: 'Hello Python!',
    solutionCode: 'print("Hello Python!")'
  },
  '1-2': {
    title: 'Variables & Assignments',
    subtitle: 'Storing Data',
    section: 'Module 1 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-variables/',
    description: 'Variables in Python act as containers for storing data values. In Python, you do not need to declare variable types explicitly — assignment is done using the = operator.',
    challengeIntro: 'Create a variable named language and store the value "Python", then print it.',
    instructions: [
      'Define a variable: language = "Python"',
      'Print the variable: print(language)',
      'Run the code to verify your variable output'
    ],
    initialCode: '# Define your variable below\nlanguage = "Python"\nprint(language)',
    expectedOutput: 'Python',
    solutionCode: 'language = "Python"\nprint(language)'
  },
  '1-3': {
    title: 'Data Types',
    subtitle: 'Strings, Numbers & Booleans',
    section: 'Module 1 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-data-types/',
    description: 'Python has built-in data types: str (text), int (whole numbers), float (decimals), and bool (True/False). You can check a variable type using type().',
    challengeIntro: 'Print three different data types: a string, an integer, and a boolean value.',
    instructions: [
      'Print text: print("AIcademy")',
      'Print a number: print(100)',
      'Print a boolean: print(True)'
    ],
    initialCode: 'print("AIcademy")\nprint(100)\nprint(True)',
    expectedOutput: 'AIcademy\n100\nTrue',
    solutionCode: 'print("AIcademy")\nprint(100)\nprint(True)'
  },
  '1-4': {
    title: 'Printing Output & Formatting',
    subtitle: 'f-Strings in Python',
    section: 'Module 1 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/input-and-output-in-python/',
    description: 'Formatted string literals (f-strings) let you embed expressions inside string literals using curly braces {}.',
    challengeIntro: 'Use an f-string to output: "I am learning Python with 100% focus!".',
    instructions: [
      'Set score = 100',
      'Print: print(f"I am learning Python with {score}% focus!")',
      'Run code to verify formatted string'
    ],
    initialCode: 'score = 100\nprint(f"I am learning Python with {score}% focus!")',
    expectedOutput: 'I am learning Python with 100% focus!',
    solutionCode: 'score = 100\nprint(f"I am learning Python with {score}% focus!")'
  },
  '1-5': {
    title: 'User Input & Comments',
    subtitle: 'Interactivity & Code Docs',
    section: 'Module 1 · Chapter 5',
    gfgUrl: 'https://www.geeksforgeeks.org/python/input-and-output-in-python/',
    description: 'Comments start with # and are ignored by Python. The input() function reads a string input from the user.',
    challengeIntro: 'Create a program that greets the user by printing a welcome message.',
    instructions: [
      'Write a comment describing your code',
      'Set name = "Alex"',
      'Print: print("Hello " + name)'
    ],
    initialCode: '# Greeting script\nname = "Alex"\nprint("Hello " + name)',
    expectedOutput: 'Hello Alex',
    solutionCode: '# Greeting script\nname = "Alex"\nprint("Hello " + name)'
  },
  '1-6': {
    title: 'Basic Operators',
    subtitle: 'Arithmetic in Python',
    section: 'Module 1 · Chapter 6',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-operators/',
    description: 'Python supports arithmetic operators: + (addition), - (subtraction), * (multiplication), / (division), // (floor division), and ** (exponentiation).',
    challengeIntro: 'Calculate 5 to the power of 3 and print the result.',
    instructions: [
      'Calculate 5 ** 3',
      'Print result: print(5 ** 3)',
      'Expected output: 125'
    ],
    initialCode: 'result = 5 ** 3\nprint(result)',
    expectedOutput: '125',
    solutionCode: 'result = 5 ** 3\nprint(result)'
  },
  '1-7': {
    title: 'Mini Project: Simple Calculator',
    subtitle: 'Module 1 Capstone Project',
    section: 'Module 1 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-operators/',
    description: 'Build a simple calculator program that adds two numbers and displays the calculated sum and product.',
    challengeIntro: 'Calculate num1 = 15 and num2 = 25, then print their sum and product.',
    instructions: [
      'num1 = 15, num2 = 25',
      'print(f"Sum: {num1 + num2}")',
      'print(f"Product: {num1 * num2}")'
    ],
    initialCode: 'num1 = 15\nnum2 = 25\nprint(f"Sum: {num1 + num2}")\nprint(f"Product: {num1 * num2}")',
    expectedOutput: 'Sum: 40\nProduct: 375',
    solutionCode: 'num1 = 15\nnum2 = 25\nprint(f"Sum: {num1 + num2}")\nprint(f"Product: {num1 * num2}")'
  },

  // ─── MODULE 2: CONTROL FLOW ────────────────────────────────────────────
  '2-1': {
    title: 'if / elif / else Statements',
    subtitle: 'Conditional Branching',
    section: 'Module 2 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/conditional-statements-in-python/',
    description: 'Conditional statements allow your program to execute different code blocks based on conditions (True or False).',
    challengeIntro: 'Write an if-else check for a number x = 15. If x > 10, print "Greater", otherwise print "Smaller".',
    instructions: [
      'Set x = 15',
      'Write if x > 10: print("Greater")',
      'Write else: print("Smaller")'
    ],
    initialCode: 'x = 15\nif x > 10:\n    print("Greater")\nelse:\n    print("Smaller")',
    expectedOutput: 'Greater',
    solutionCode: 'x = 15\nif x > 10:\n    print("Greater")\nelse:\n    print("Smaller")'
  },
  '2-2': {
    title: 'Comparison Operators',
    subtitle: 'Evaluating Values',
    section: 'Module 2 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-operators/',
    description: 'Comparison operators include == (equal), != (not equal), > (greater than), < (less than), >=, and <=.',
    challengeIntro: 'Compare age = 18 with 21 using age >= 18 and print the boolean result.',
    instructions: [
      'Set age = 18',
      'Print result of age >= 18'
    ],
    initialCode: 'age = 18\nprint(age >= 18)',
    expectedOutput: 'True',
    solutionCode: 'age = 18\nprint(age >= 18)'
  },
  '2-3': {
    title: 'Logical Operators',
    subtitle: 'and, or, not',
    section: 'Module 2 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-operators/',
    description: 'Logical operators combine conditional statements: and returns True if both are True, or returns True if at least one is True.',
    challengeIntro: 'Check if has_ticket = True and age = 20 are both valid.',
    instructions: [
      'has_ticket = True, age = 20',
      'Print: print(has_ticket and age >= 18)'
    ],
    initialCode: 'has_ticket = True\nage = 20\nprint(has_ticket and age >= 18)',
    expectedOutput: 'True',
    solutionCode: 'has_ticket = True\nage = 20\nprint(has_ticket and age >= 18)'
  },
  '2-4': {
    title: 'Pattern Matching',
    subtitle: 'match case in Python 3.10+',
    section: 'Module 2 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/conditional-statements-in-python/',
    description: 'Pattern matching uses match and case statements to match a value against several structural patterns.',
    challengeIntro: 'Create a match case for status_code = 200 that prints "OK".',
    instructions: [
      'Set status_code = 200',
      'Match status_code and print "OK" for 200'
    ],
    initialCode: 'status_code = 200\nif status_code == 200:\n    print("OK")',
    expectedOutput: 'OK',
    solutionCode: 'status_code = 200\nif status_code == 200:\n    print("OK")'
  },
  '2-5': {
    title: 'Mini Project: Guess the Number Game',
    subtitle: 'Module 2 Capstone Project',
    section: 'Module 2 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/conditional-statements-in-python/',
    description: 'Build a game logic that checks a player guess against a target secret number.',
    challengeIntro: 'Set secret = 7 and guess = 7. If guess == secret print "You Won!", else print "Try Again".',
    instructions: [
      'secret = 7, guess = 7',
      'If guess == secret: print("You Won!")'
    ],
    initialCode: 'secret = 7\nguess = 7\nif guess == secret:\n    print("You Won!")\nelse:\n    print("Try Again")',
    expectedOutput: 'You Won!',
    solutionCode: 'secret = 7\nguess = 7\nif guess == secret:\n    print("You Won!")\nelse:\n    print("Try Again")'
  },

  // ─── MODULE 3: LOOPS ───────────────────────────────────────────────────
  '3-1': {
    title: 'for Loops & Iteration',
    subtitle: 'Iterating Sequences',
    section: 'Module 3 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    description: 'A for loop is used for iterating over a sequence (such as a list, tuple, dictionary, set, or string).',
    challengeIntro: 'Use a for loop to print numbers 1 to 3.',
    instructions: [
      'Loop over range(1, 4)',
      'Print each number'
    ],
    initialCode: 'for i in range(1, 4):\n    print(i)',
    expectedOutput: '1\n2\n3',
    solutionCode: 'for i in range(1, 4):\n    print(i)'
  },
  '3-2': {
    title: 'while Loops',
    subtitle: 'Condition-Based Loops',
    section: 'Module 3 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    description: 'A while loop executes a set of statements as long as its condition remains True.',
    challengeIntro: 'Use a while loop to print count from 3 down to 1, then print "Blastoff!".',
    instructions: [
      'count = 3',
      'While count > 0 print count and decrement',
      'Print "Blastoff!"'
    ],
    initialCode: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Blastoff!")',
    expectedOutput: '3\n2\n1\nBlastoff!',
    solutionCode: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Blastoff!")'
  },
  '3-3': {
    title: 'break & continue Statements',
    subtitle: 'Loop Control Flow',
    section: 'Module 3 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    description: 'break stops the loop immediately. continue skips the current iteration and moves to the next.',
    challengeIntro: 'Loop through range(1, 6). If i == 3, use continue. Print all other numbers.',
    instructions: [
      'Loop range(1, 6)',
      'If i == 3 continue',
      'Print i'
    ],
    initialCode: 'for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)',
    expectedOutput: '1\n2\n4\n5',
    solutionCode: 'for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)'
  },
  '3-4': {
    title: 'The range() Function',
    subtitle: 'Generating Number Sequences',
    section: 'Module 3 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    description: 'range(start, stop, step) returns a sequence of numbers starting from start up to stop (exclusive).',
    challengeIntro: 'Generate even numbers from 2 to 8 using range(2, 9, 2).',
    instructions: [
      'Loop for num in range(2, 9, 2):',
      'Print num'
    ],
    initialCode: 'for num in range(2, 9, 2):\n    print(num)',
    expectedOutput: '2\n4\n6\n8',
    solutionCode: 'for num in range(2, 9, 2):\n    print(num)'
  },
  '3-5': {
    title: 'Mini Project: Password Checker',
    subtitle: 'Module 3 Capstone Project',
    section: 'Module 3 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    description: 'Check if password len(password) >= 8. If true, print "Strong Password", else "Weak Password".',
    challengeIntro: 'Test pwd = "SecretPass123" and print "Strong Password".',
    instructions: [
      'pwd = "SecretPass123"',
      'If len(pwd) >= 8 print "Strong Password"'
    ],
    initialCode: 'pwd = "SecretPass123"\nif len(pwd) >= 8:\n    print("Strong Password")\nelse:\n    print("Weak Password")',
    expectedOutput: 'Strong Password',
    solutionCode: 'pwd = "SecretPass123"\nif len(pwd) >= 8:\n    print("Strong Password")\nelse:\n    print("Weak Password")'
  },

  // ─── MODULE 4: FUNCTIONS ───────────────────────────────────────────────
  '4-1': {
    title: 'Defining Functions',
    subtitle: 'Creating Reusable Code',
    section: 'Module 4 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-functions/',
    description: 'Functions are blocks of code defined using def keyword that run when called.',
    challengeIntro: 'Define a function greet() that prints "Hello from AIcademy!" and call it.',
    instructions: [
      'def greet(): print("Hello from AIcademy!")',
      'Call greet()'
    ],
    initialCode: 'def greet():\n    print("Hello from AIcademy!")\n\ngreet()',
    expectedOutput: 'Hello from AIcademy!',
    solutionCode: 'def greet():\n    print("Hello from AIcademy!")\n\ngreet()'
  },
  '4-2': {
    title: 'Parameters & Arguments',
    subtitle: 'Passing Data to Functions',
    section: 'Module 4 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-functions/',
    description: 'Parameters allow functions to accept input values when called.',
    challengeIntro: 'Create function add(a, b) that prints a + b. Call add(10, 20).',
    instructions: [
      'def add(a, b): print(a + b)',
      'Call add(10, 20)'
    ],
    initialCode: 'def add(a, b):\n    print(a + b)\n\nadd(10, 20)',
    expectedOutput: '30',
    solutionCode: 'def add(a, b):\n    print(a + b)\n\nadd(10, 20)'
  },
  '4-3': {
    title: 'Return Values',
    subtitle: 'Getting Outputs from Functions',
    section: 'Module 4 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-functions/',
    description: 'Use the return keyword to send a function result back to the caller.',
    challengeIntro: 'Create square(n) returning n * n. Print square(6).',
    instructions: [
      'def square(n): return n * n',
      'Print square(6)'
    ],
    initialCode: 'def square(n):\n    return n * n\n\nprint(square(6))',
    expectedOutput: '36',
    solutionCode: 'def square(n):\n    return n * n\n\nprint(square(6))'
  },
  '4-4': {
    title: 'Variable Scope',
    subtitle: 'Local vs Global Scope',
    section: 'Module 4 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/global-local-variables-python/',
    description: 'Variables defined inside a function are local to that function. Variables defined outside are global.',
    challengeIntro: 'Define global x = "Global". Print x.',
    instructions: [
      'x = "Global"',
      'Print x'
    ],
    initialCode: 'x = "Global"\nprint(x)',
    expectedOutput: 'Global',
    solutionCode: 'x = "Global"\nprint(x)'
  },
  '4-5': {
    title: 'Mini Project: Unit Converter',
    subtitle: 'Module 4 Capstone Project',
    section: 'Module 4 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-functions/',
    description: 'Create a function km_to_miles(km) returning km * 0.621371.',
    challengeIntro: 'Call km_to_miles(10) and print rounded result.',
    instructions: [
      'def km_to_miles(km): return round(km * 0.621371, 2)',
      'Print km_to_miles(10)'
    ],
    initialCode: 'def km_to_miles(km):\n    return round(km * 0.621371, 2)\n\nprint(km_to_miles(10))',
    expectedOutput: '6.21',
    solutionCode: 'def km_to_miles(km):\n    return round(km * 0.621371, 2)\n\nprint(km_to_miles(10))'
  },

  // ─── MODULE 5: DATA STRUCTURES ─────────────────────────────────────────
  '5-1': {
    title: 'Lists & List Methods',
    subtitle: 'Ordered Mutable Sequences',
    section: 'Module 5 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-lists/',
    description: 'Lists store multiple items in a single variable. They are ordered and mutable.',
    challengeIntro: 'Create a list fruits = ["apple", "banana"], append "cherry", print fruits.',
    instructions: [
      'fruits = ["apple", "banana"]',
      'fruits.append("cherry")',
      'Print fruits'
    ],
    initialCode: 'fruits = ["apple", "banana"]\nfruits.append("cherry")\nprint(fruits)',
    expectedOutput: "['apple', 'banana', 'cherry']",
    solutionCode: 'fruits = ["apple", "banana"]\nfruits.append("cherry")\nprint(fruits)'
  },
  '5-2': {
    title: 'Tuples',
    subtitle: 'Immutable Sequences',
    section: 'Module 5 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-tuples/',
    description: 'Tuples are ordered, immutable collections written with round brackets ().',
    challengeIntro: 'Create a tuple point = (10, 20) and print point[0].',
    instructions: [
      'point = (10, 20)',
      'Print point[0]'
    ],
    initialCode: 'point = (10, 20)\nprint(point[0])',
    expectedOutput: '10',
    solutionCode: 'point = (10, 20)\nprint(point[0])'
  },
  '5-3': {
    title: 'Dictionaries',
    subtitle: 'Key-Value Pairs',
    section: 'Module 5 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-dictionary/',
    description: 'Dictionaries store data values in key:value pairs using curly braces {}.',
    challengeIntro: 'Create user = {"name": "Alice", "role": "Developer"}. Print user["name"].',
    instructions: [
      'user = {"name": "Alice", "role": "Developer"}',
      'Print user["name"]'
    ],
    initialCode: 'user = {"name": "Alice", "role": "Developer"}\nprint(user["name"])',
    expectedOutput: 'Alice',
    solutionCode: 'user = {"name": "Alice", "role": "Developer"}\nprint(user["name"])'
  },
  '5-4': {
    title: 'Sets',
    subtitle: 'Unique Collections',
    section: 'Module 5 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/sets-in-python/',
    description: 'Sets store unique, unordered elements using curly braces {}. Duplicate elements are removed.',
    challengeIntro: 'Create nums = {1, 2, 2, 3}. Print sorted list of unique nums.',
    instructions: [
      'nums = set([1, 2, 2, 3])',
      'Print sorted(list(nums))'
    ],
    initialCode: 'nums = {1, 2, 2, 3}\nprint(sorted(list(nums)))',
    expectedOutput: '[1, 2, 3]',
    solutionCode: 'nums = {1, 2, 2, 3}\nprint(sorted(list(nums)))'
  },
  '5-5': {
    title: 'Mini Project: Student Grade Manager',
    subtitle: 'Module 5 Capstone Project',
    section: 'Module 5 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-dictionary/',
    description: 'Store student grades in a dictionary and calculate average grade.',
    challengeIntro: 'grades = {"Math": 90, "Science": 80}. Print average.',
    instructions: [
      'grades = {"Math": 90, "Science": 80}',
      'Print sum(grades.values()) / len(grades)'
    ],
    initialCode: 'grades = {"Math": 90, "Science": 80}\navg = sum(grades.values()) / len(grades)\nprint(f"Average: {avg:.1f}")',
    expectedOutput: 'Average: 85.0',
    solutionCode: 'grades = {"Math": 90, "Science": 80}\navg = sum(grades.values()) / len(grades)\nprint(f"Average: {avg:.1f}")'
  },

  // ─── MODULE 6: WORKING WITH FILES ──────────────────────────────────────
  '6-1': {
    title: 'Reading Files',
    subtitle: 'File I/O Basics',
    section: 'Module 6 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/how-to-read-from-a-file-in-python/',
    description: 'Python open(filename, "r") opens a file for reading text data.',
    challengeIntro: 'Simulate file reading content string.',
    instructions: ['Print simulated content: "File content loaded"'],
    initialCode: 'content = "File content loaded"\nprint(content)',
    expectedOutput: 'File content loaded',
    solutionCode: 'content = "File content loaded"\nprint(content)'
  },
  '6-2': {
    title: 'Writing & Appending Files',
    subtitle: 'Saving Data to Files',
    section: 'Module 6 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/file-handling-python/',
    description: 'open(filename, "w") opens a file for writing, while "a" appends data.',
    challengeIntro: 'Write string "Data saved" and print message.',
    instructions: ['Print "Data saved"'],
    initialCode: 'print("Data saved")',
    expectedOutput: 'Data saved',
    solutionCode: 'print("Data saved")'
  },
  '6-3': {
    title: 'CSV File Basics',
    subtitle: 'Comma Separated Values',
    section: 'Module 6 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/file-handling-python/',
    description: 'CSV files store tabular data separated by commas.',
    challengeIntro: 'Parse CSV line "Alice,90,Pass" and print name.',
    instructions: ['Split row by comma and print first item'],
    initialCode: 'row = "Alice,90,Pass".split(",")\nprint(row[0])',
    expectedOutput: 'Alice',
    solutionCode: 'row = "Alice,90,Pass".split(",")\nprint(row[0])'
  },
  '6-4': {
    title: 'JSON Parsing',
    subtitle: 'Structured Data',
    section: 'Module 6 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/file-handling-python/',
    description: 'The json module provides json.loads() and json.dumps() for JSON strings.',
    challengeIntro: 'Import json and parse \'{"status": "ok"}\'. Print status.',
    instructions: ['Import json', 'parse json and print data["status"]'],
    initialCode: 'import json\ndata = json.loads(\'{"status": "ok"}\')\nprint(data["status"])',
    expectedOutput: 'ok',
    solutionCode: 'import json\ndata = json.loads(\'{"status": "ok"}\')\nprint(data["status"])'
  },
  '6-5': {
    title: 'Mini Project: Expense Tracker',
    subtitle: 'Module 6 Capstone Project',
    section: 'Module 6 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/file-handling-python/',
    description: 'Calculate total expenses from list expenses = [12.5, 45.0, 30.0].',
    challengeIntro: 'Sum expenses and print "Total: $87.5".',
    instructions: ['expenses = [12.5, 45.0, 30.0]', 'Print Total'],
    initialCode: 'expenses = [12.5, 45.0, 30.0]\nprint(f"Total: ${sum(expenses):.1f}")',
    expectedOutput: 'Total: $87.5',
    solutionCode: 'expenses = [12.5, 45.0, 30.0]\nprint(f"Total: ${sum(expenses):.1f}")'
  },

  // ─── MODULE 7: ERROR HANDLING ──────────────────────────────────────────
  '7-1': {
    title: 'try / except Blocks',
    subtitle: 'Handling Exceptions',
    section: 'Module 7 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-exception-handling/',
    description: 'try blocks test code for errors, while except blocks handle the errors gracefully.',
    challengeIntro: 'Handle division by zero inside a try-except block.',
    instructions: [
      'try 10 / 0',
      'except ZeroDivisionError print "Cannot divide by zero"'
    ],
    initialCode: 'try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")',
    expectedOutput: 'Cannot divide by zero',
    solutionCode: 'try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")'
  },
  '7-2': {
    title: 'Handling Common Exceptions',
    subtitle: 'ValueError & TypeError',
    section: 'Module 7 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/built-exceptions-python/',
    description: 'Catch specific exception types such as ValueError, TypeError, and KeyError.',
    challengeIntro: 'Catch ValueError when converting string "abc" to int.',
    instructions: ['try int("abc")', 'except ValueError print "Invalid integer"'],
    initialCode: 'try:\n    num = int("abc")\nexcept ValueError:\n    print("Invalid integer")',
    expectedOutput: 'Invalid integer',
    solutionCode: 'try:\n    num = int("abc")\nexcept ValueError:\n    print("Invalid integer")'
  },
  '7-3': {
    title: 'Raising Errors',
    subtitle: 'The raise Keyword',
    section: 'Module 7 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/user-defined-exceptions-python-examples/',
    description: 'Use the raise keyword to trigger a custom exception when invalid conditions occur.',
    challengeIntro: 'If age < 0 raise ValueError("Age cannot be negative").',
    instructions: ['Catch raised ValueError and print error message'],
    initialCode: 'age = -5\ntry:\n    if age < 0:\n        raise ValueError("Age cannot be negative")\nexcept ValueError as e:\n    print(e)',
    expectedOutput: 'Age cannot be negative',
    solutionCode: 'age = -5\ntry:\n    if age < 0:\n        raise ValueError("Age cannot be negative")\nexcept ValueError as e:\n    print(e)'
  },
  '7-4': {
    title: 'Mini Project: Safe Calculator',
    subtitle: 'Module 7 Capstone Project',
    section: 'Module 7 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-exception-handling/',
    description: 'Build safe divide function safe_divide(a, b) handling division by zero.',
    challengeIntro: 'Call safe_divide(10, 0) and print "Error: Division by zero".',
    instructions: ['Define safe_divide(a, b)', 'Catch ZeroDivisionError'],
    initialCode: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Error: Division by zero"\n\nprint(safe_divide(10, 0))',
    expectedOutput: 'Error: Division by zero',
    solutionCode: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Error: Division by zero"\n\nprint(safe_divide(10, 0))'
  },

  // ─── MODULE 8: OBJECT-ORIENTED PROGRAMMING (OOP) ───────────────────────
  '8-1': {
    title: 'Classes & Objects',
    subtitle: 'OOP Blueprints',
    section: 'Module 8 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-classes-and-objects/',
    description: 'A Class is a user-defined blueprint for objects. An Object is an instance of a class.',
    challengeIntro: 'Define class Car with attribute brand = "Tesla". Create object my_car and print brand.',
    instructions: ['class Car: brand = "Tesla"', 'my_car = Car()', 'print(my_car.brand)'],
    initialCode: 'class Car:\n    brand = "Tesla"\n\nmy_car = Car()\nprint(my_car.brand)',
    expectedOutput: 'Tesla',
    solutionCode: 'class Car:\n    brand = "Tesla"\n\nmy_car = Car()\nprint(my_car.brand)'
  },
  '8-2': {
    title: 'Methods & self Keyword',
    subtitle: 'Class Functions',
    section: 'Module 8 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-classes-and-objects/',
    description: 'Methods are functions defined inside a class. self parameter refers to the current instance of the class.',
    challengeIntro: 'Create method speak(self) returning "Vroom!". Print my_car.speak().',
    instructions: ['def speak(self): return "Vroom!"', 'print(my_car.speak())'],
    initialCode: 'class Car:\n    def speak(self):\n        return "Vroom!"\n\nmy_car = Car()\nprint(my_car.speak())',
    expectedOutput: 'Vroom!',
    solutionCode: 'class Car:\n    def speak(self):\n        return "Vroom!"\n\nmy_car = Car()\nprint(my_car.speak())'
  },
  '8-3': {
    title: 'Constructors (__init__)',
    subtitle: 'Object Initialization',
    section: 'Module 8 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/constructors-in-python/',
    description: 'The __init__() method initializes object attributes when an object is instantiated.',
    challengeIntro: 'Initialize Dog(name, breed). Create Dog("Buddy", "Poodle") and print name.',
    instructions: ['def __init__(self, name): self.name = name', 'print(dog.name)'],
    initialCode: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\ndog = Dog("Buddy")\nprint(dog.name)',
    expectedOutput: 'Buddy',
    solutionCode: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\ndog = Dog("Buddy")\nprint(dog.name)'
  },
  '8-4': {
    title: 'Inheritance Basics',
    subtitle: 'Class Hierarchies',
    section: 'Module 8 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/inheritance-in-python/',
    description: 'Inheritance allows a child class to inherit attributes and methods from a parent class.',
    challengeIntro: 'Class ElectricCar inherits Car. Create ElectricCar and print brand.',
    instructions: ['class ElectricCar(Car): pass', 'print(ecar.brand)'],
    initialCode: 'class Car:\n    brand = "Tesla"\n\nclass ElectricCar(Car):\n    pass\n\necar = ElectricCar()\nprint(ecar.brand)',
    expectedOutput: 'Tesla',
    solutionCode: 'class Car:\n    brand = "Tesla"\n\nclass ElectricCar(Car):\n    pass\n\necar = ElectricCar()\nprint(ecar.brand)'
  },
  '8-5': {
    title: 'Mini Project: Bank Account System',
    subtitle: 'Module 8 Capstone Project',
    section: 'Module 8 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-oops-concepts/',
    description: 'Create BankAccount class with deposit(amount) method updating balance.',
    challengeIntro: 'Deposit 50 to initial 100 balance. Print balance.',
    instructions: ['acc = BankAccount(100)', 'acc.deposit(50)', 'print(acc.balance)'],
    initialCode: 'class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n\nacc = BankAccount(100)\nacc.deposit(50)\nprint(acc.balance)',
    expectedOutput: '150',
    solutionCode: 'class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n\nacc = BankAccount(100)\nacc.deposit(50)\nprint(acc.balance)'
  },

  // ─── MODULE 9: PYTHON MODULES ──────────────────────────────────────────
  '9-1': {
    title: 'Importing Standard Modules',
    subtitle: 'Built-in Libraries',
    section: 'Module 9 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-modules/',
    description: 'Import built-in Python modules such as math, random, datetime, and sys.',
    challengeIntro: 'Import math and print math.sqrt(64).',
    instructions: ['import math', 'print(math.sqrt(64))'],
    initialCode: 'import math\nprint(int(math.sqrt(64)))',
    expectedOutput: '8',
    solutionCode: 'import math\nprint(int(math.sqrt(64)))'
  },
  '9-2': {
    title: 'Creating Custom Modules',
    subtitle: 'Modular Architecture',
    section: 'Module 9 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/basics-of-python-modules/',
    description: 'A Python module is simply a file containing Python code ending in .py.',
    challengeIntro: 'Simulate module import helper functions.',
    instructions: ['print("Module imported successfully")'],
    initialCode: 'print("Module imported successfully")',
    expectedOutput: 'Module imported successfully',
    solutionCode: 'print("Module imported successfully")'
  },
  '9-3': {
    title: 'Package Management with pip',
    subtitle: 'Installing Libraries',
    section: 'Module 9 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-packages/',
    description: 'pip is the package installer for Python packages from PyPI (Python Package Index).',
    challengeIntro: 'Print standard pip command: "pip install requests".',
    instructions: ['print("pip install requests")'],
    initialCode: 'print("pip install requests")',
    expectedOutput: 'pip install requests',
    solutionCode: 'print("pip install requests")'
  },
  '9-4': {
    title: 'Virtual Environments',
    subtitle: 'Isolated Dependencies',
    section: 'Module 9 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-packages/',
    description: 'Virtual environments isolate project dependencies from global Python installations.',
    challengeIntro: 'Print venv creation command: "python -m venv venv".',
    instructions: ['print("python -m venv venv")'],
    initialCode: 'print("python -m venv venv")',
    expectedOutput: 'python -m venv venv',
    solutionCode: 'print("python -m venv venv")'
  },
  '9-5': {
    title: 'Mini Project: Weather App',
    subtitle: 'Module 9 Capstone Project',
    section: 'Module 9 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-modules/',
    description: 'Simulate fetching weather data dictionary for city = "Tokyo".',
    challengeIntro: 'Print "Tokyo: 22°C Clear".',
    instructions: ['weather = {"city": "Tokyo", "temp": 22}', 'Print formatted string'],
    initialCode: 'weather = {"city": "Tokyo", "temp": 22}\nprint(f"{weather[\'city\']}: {weather[\'temp\']}°C Clear")',
    expectedOutput: 'Tokyo: 22°C Clear',
    solutionCode: 'weather = {"city": "Tokyo", "temp": 22}\nprint(f"{weather[\'city\']}: {weather[\'temp\']}°C Clear")'
  },

  // ─── MODULE 10: NUMPY ──────────────────────────────────────────────────
  '10-1': {
    title: 'NumPy Arrays & Dimensions',
    subtitle: 'Numerical Computing',
    section: 'Module 10 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    description: 'NumPy provides high-performance multidimensional array objects (ndarray) and mathematical tools.',
    challengeIntro: 'Create simulated NumPy array arr = [10, 20, 30] and print sum.',
    instructions: ['arr = [10, 20, 30]', 'print(sum(arr))'],
    initialCode: 'arr = [10, 20, 30]\nprint(sum(arr))',
    expectedOutput: '60',
    solutionCode: 'arr = [10, 20, 30]\nprint(sum(arr))'
  },
  '10-2': {
    title: 'Array Indexing & Slicing',
    subtitle: 'Accessing Elements',
    section: 'Module 10 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    description: 'Slice arrays using syntax arr[start:stop:step] similar to Python lists.',
    challengeIntro: 'Slice arr = [10, 20, 30, 40] up to index 2.',
    instructions: ['arr = [10, 20, 30, 40]', 'print(arr[:2])'],
    initialCode: 'arr = [10, 20, 30, 40]\nprint(arr[:2])',
    expectedOutput: '[10, 20]',
    solutionCode: 'arr = [10, 20, 30, 40]\nprint(arr[:2])'
  },
  '10-3': {
    title: 'Broadcasting & Vectorization',
    subtitle: 'Element-wise Operations',
    section: 'Module 10 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    description: 'Vectorized operations perform computations across entire arrays without explicit for loops.',
    challengeIntro: 'Multiply each element in arr = [1, 2, 3] by 2 using list comp or vector.',
    instructions: ['arr = [1, 2, 3]', 'print([x * 2 for x in arr])'],
    initialCode: 'arr = [1, 2, 3]\nprint([x * 2 for x in arr])',
    expectedOutput: '[2, 4, 6]',
    solutionCode: 'arr = [1, 2, 3]\nprint([x * 2 for x in arr])'
  },
  '10-4': {
    title: 'Basic Linear Algebra',
    subtitle: 'Matrix Calculations',
    section: 'Module 10 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    description: 'NumPy contains linear algebra operations such as dot products, matrix multiplication, and determinants.',
    challengeIntro: 'Calculate dot product of a = [1, 2] and b = [3, 4] (1*3 + 2*4).',
    instructions: ['a = [1, 2], b = [3, 4]', 'dot = a[0]*b[0] + a[1]*b[1]', 'print(dot)'],
    initialCode: 'a = [1, 2]\nb = [3, 4]\ndot = a[0]*b[0] + a[1]*b[1]\nprint(dot)',
    expectedOutput: '11',
    solutionCode: 'a = [1, 2]\nb = [3, 4]\ndot = a[0]*b[0] + a[1]*b[1]\nprint(dot)'
  },
  '10-5': {
    title: 'Mini Project: Matrix Operations',
    subtitle: 'Module 10 Capstone Project',
    section: 'Module 10 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    description: 'Add two 2x2 matrices A = [[1, 2], [3, 4]] and B = [[5, 6], [7, 8]].',
    challengeIntro: 'Print resulting matrix sum.',
    instructions: ['Calculate row-by-row matrix addition'],
    initialCode: 'A = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\nC = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]\nprint(C)',
    expectedOutput: '[[6, 8], [10, 12]]',
    solutionCode: 'A = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\nC = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]\nprint(C)'
  },

  // ─── MODULE 11: PANDAS ─────────────────────────────────────────────────
  '11-1': {
    title: 'DataFrames & Series',
    subtitle: 'Tabular Data Analysis',
    section: 'Module 11 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    description: 'Pandas provides DataFrames (2D tabular structures with labeled axes) and Series (1D arrays).',
    challengeIntro: 'Create a simulated DataFrame dictionary data = {"Name": ["Alice"], "Score": [95]}.',
    instructions: ['data = {"Name": ["Alice"], "Score": [95]}', 'print(data["Name"][0])'],
    initialCode: 'data = {"Name": ["Alice"], "Score": [95]}\nprint(data["Name"][0])',
    expectedOutput: 'Alice',
    solutionCode: 'data = {"Name": ["Alice"], "Score": [95]}\nprint(data["Name"][0])'
  },
  '11-2': {
    title: 'Reading CSV Datasets',
    subtitle: 'Loading Data',
    section: 'Module 11 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    description: 'Use pd.read_csv("filename.csv") to read CSV files directly into a Pandas DataFrame.',
    challengeIntro: 'Print dataset head row count.',
    instructions: ['df_shape = (500, 5)', 'print(f"Loaded {df_shape[0]} rows")'],
    initialCode: 'df_shape = (500, 5)\nprint(f"Loaded {df_shape[0]} rows")',
    expectedOutput: 'Loaded 500 rows',
    solutionCode: 'df_shape = (500, 5)\nprint(f"Loaded {df_shape[0]} rows")'
  },
  '11-3': {
    title: 'Data Cleaning & Filtering',
    subtitle: 'Filtering Data',
    section: 'Module 11 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    description: 'Filter DataFrames using boolean indexing: df[df["score"] > 80].',
    challengeIntro: 'Filter scores = [60, 85, 92, 74] keeping scores > 80.',
    instructions: ['scores = [60, 85, 92, 74]', 'filtered = [s for s in scores if s > 80]', 'print(filtered)'],
    initialCode: 'scores = [60, 85, 92, 74]\nfiltered = [s for s in scores if s > 80]\nprint(filtered)',
    expectedOutput: '[85, 92]',
    solutionCode: 'scores = [60, 85, 92, 74]\nfiltered = [s for s in scores if s > 80]\nprint(filtered)'
  },
  '11-4': {
    title: 'Grouping & Aggregation',
    subtitle: 'groupby Operations',
    section: 'Module 11 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    description: 'groupby() splits data into groups, applies aggregation functions (mean, sum, count), and combines results.',
    challengeIntro: 'Group sales by region: {"East": 200, "West": 300}. Print total.',
    instructions: ['sales = {"East": 200, "West": 300}', 'print(sum(sales.values()))'],
    initialCode: 'sales = {"East": 200, "West": 300}\nprint(sum(sales.values()))',
    expectedOutput: '500',
    solutionCode: 'sales = {"East": 200, "West": 300}\nprint(sum(sales.values()))'
  },
  '11-5': {
    title: 'Handling Missing Values',
    subtitle: 'isnull & fillna',
    section: 'Module 11 · Chapter 5',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    description: 'Handle missing data using dropna() or fill missing values using fillna(value).',
    challengeIntro: 'Fill None in list [10, None, 30] with 0.',
    instructions: ['data = [10, None, 30]', 'clean = [x if x is not None else 0 for x in data]', 'print(clean)'],
    initialCode: 'data = [10, None, 30]\nclean = [x if x is not None else 0 for x in data]\nprint(clean)',
    expectedOutput: '[10, 0, 30]',
    solutionCode: 'data = [10, None, 30]\nclean = [x if x is not None else 0 for x in data]\nprint(clean)'
  },
  '11-6': {
    title: 'Mini Project: Netflix Analysis',
    subtitle: 'Module 11 Capstone Project',
    section: 'Module 11 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    description: 'Analyze dataset titles count: movies = 1200, tv_shows = 800.',
    challengeIntro: 'Print "Total Titles: 2000".',
    instructions: ['movies = 1200, tv_shows = 800', 'print(f"Total Titles: {movies + tv_shows}")'],
    initialCode: 'movies = 1200\ntv_shows = 800\nprint(f"Total Titles: {movies + tv_shows}")',
    expectedOutput: 'Total Titles: 2000',
    solutionCode: 'movies = 1200\ntv_shows = 800\nprint(f"Total Titles: {movies + tv_shows}")'
  },

  // ─── MODULE 12: DATA VISUALIZATION ─────────────────────────────────────
  '12-1': {
    title: 'Matplotlib Basics',
    subtitle: 'Plotting Graphics',
    section: 'Module 12 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    description: 'Matplotlib is Python\'s foundational plotting library for 2D graphics and charts.',
    challengeIntro: 'Simulate rendering a plot title string.',
    instructions: ['print("Plot: Sales over Time")'],
    initialCode: 'print("Plot: Sales over Time")',
    expectedOutput: 'Plot: Sales over Time',
    solutionCode: 'print("Plot: Sales over Time")'
  },
  '12-2': {
    title: 'Line Plots & Customization',
    subtitle: 'Trends Over Time',
    section: 'Module 12 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    description: 'Line plots connect discrete data points with straight lines, ideal for time series data.',
    challengeIntro: 'Print line plot point pairs.',
    instructions: ['points = [(1, 10), (2, 20), (3, 30)]', 'print(points)'],
    initialCode: 'points = [(1, 10), (2, 20), (3, 30)]\nprint(points)',
    expectedOutput: '[(1, 10), (2, 20), (3, 30)]',
    solutionCode: 'points = [(1, 10), (2, 20), (3, 30)]\nprint(points)'
  },
  '12-3': {
    title: 'Histograms & Distributions',
    subtitle: 'Frequency Distribution',
    section: 'Module 12 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    description: 'Histograms represent the distribution of numerical data by grouping data into bins.',
    challengeIntro: 'Calculate max value in distribution values = [12, 45, 67, 23].',
    instructions: ['values = [12, 45, 67, 23]', 'print(max(values))'],
    initialCode: 'values = [12, 45, 67, 23]\nprint(max(values))',
    expectedOutput: '67',
    solutionCode: 'values = [12, 45, 67, 23]\nprint(max(values))'
  },
  '12-4': {
    title: 'Scatter Plots & Correlations',
    subtitle: 'Bivariate Analysis',
    section: 'Module 12 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    description: 'Scatter plots use Cartesian coordinates to display values for two variables across a dataset.',
    challengeIntro: 'Print correlation coefficient string "r = 0.95".',
    instructions: ['print("r = 0.95")'],
    initialCode: 'print("r = 0.95")',
    expectedOutput: 'r = 0.95',
    solutionCode: 'print("r = 0.95")'
  },
  '12-5': {
    title: 'Bar Charts',
    subtitle: 'Categorical Comparisons',
    section: 'Module 12 · Chapter 5',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    description: 'Bar charts present categorical data with rectangular bars with heights proportional to the values.',
    challengeIntro: 'Print highest bar category from categories = {"Q1": 100, "Q2": 250}.',
    instructions: ['cats = {"Q1": 100, "Q2": 250}', 'print(max(cats, key=cats.get))'],
    initialCode: 'cats = {"Q1": 100, "Q2": 250}\nprint(max(cats, key=cats.get))',
    expectedOutput: 'Q2',
    solutionCode: 'cats = {"Q1": 100, "Q2": 250}\nprint(max(cats, key=cats.get))'
  },
  '12-6': {
    title: 'Mini Project: Sales Dashboard',
    subtitle: 'Module 12 Capstone Project',
    section: 'Module 12 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    description: 'Build final sales dashboard summary printing quarterly growth.',
    challengeIntro: 'Print "Dashboard Generated: +35% YoY Growth".',
    instructions: ['print("Dashboard Generated: +35% YoY Growth")'],
    initialCode: 'print("Dashboard Generated: +35% YoY Growth")',
    expectedOutput: 'Dashboard Generated: +35% YoY Growth',
    solutionCode: 'print("Dashboard Generated: +35% YoY Growth")'
  }
};
