// ─── GEEKSFORGEEKS POWERED RICH PYTHON LESSON DATABASE (ALL 12 MODULES) ─────

export const lessonsData = {
  // ─── MODULE 1: PYTHON BASICS ───────────────────────────────────────────
  '1-1': {
    title: 'Introduction to Python',
    subtitle: 'The Language',
    section: 'Module 1 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/introduction-to-python/',
    paragraphs: [
      'Python is a high-level, interpreted programming language created by Guido van Rossum and released in 1991. It is designed to emphasize code readability, allowing developers to express concepts in fewer lines of code than languages like C++ or Java.',
      'Because Python is an interpreted language, code is executed line-by-line by an interpreter. This makes writing, testing, and debugging software incredibly fast and beginner-friendly.'
    ],
    analogy: 'Think of Python as a universal translator. You write instructions in plain, simple English-like sentences, and Python instantly translates them into action for your computer to execute!',
    codeExample: `# Your very first Python script
print("Welcome to Python!")
print(2026)`,
    takeaways: [
      'Python uses simple syntax similar to plain English.',
      'print() displays messages or numbers on your screen.',
      'Strings (text) are wrapped in quotes like "Hello" or \'Hello\'.'
    ],
    challengeIntro: 'Welcome to your first Python program! Execute a print statement to output "Hello Python!".',
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
    subtitle: 'Storing Data in Memory',
    section: 'Module 1 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-variables/',
    paragraphs: [
      'In programming, a variable is a named location in the computer\'s memory used to store data. Unlike static languages, Python automatically determines the variable type based on the value you assign to it.',
      'To create a variable in Python, you pick a descriptive name and use the equals sign (=) assignment operator.'
    ],
    analogy: 'Imagine a variable as a labeled storage box. The label on the outside is the variable name (e.g., "language"), and whatever you put inside the box is the value (e.g., "Python").',
    codeExample: `# Creating variables in Python
site_name = "AIcademy"
user_score = 95

print(site_name)
print(user_score)`,
    takeaways: [
      'Use descriptive variable names (e.g., total_price instead of x).',
      'Variable names cannot start with numbers or contain spaces.',
      'Python is case-sensitive: name and Name are two distinct variables.'
    ],
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
    paragraphs: [
      'Data types define the kind of value a variable holds. Python has four primary basic data types:',
      '1. String (str): Text wrapped in quotes ("Hello")\n2. Integer (int): Whole numbers (42)\n3. Float (float): Decimal numbers (3.14)\n4. Boolean (bool): Truth values (True or False)',
      'You can check the data type of any variable using Python\'s built-in type() function.'
    ],
    analogy: 'Think of data types like types of containers in a kitchen: liquid goes in a bottle (String/Text), whole fruits go in a basket (Integers), and an on/off light switch represents a Boolean (True/False).',
    codeExample: `# Checking Python Data Types
title = "AIcademy"    # str
age = 20              # int
price = 19.99         # float
is_active = True      # bool

print(type(title))
print(type(age))`,
    takeaways: [
      'Strings must always be quoted.',
      'Booleans must start with a capital T or F (True, False).',
      'Floats contain a decimal point.'
    ],
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
    paragraphs: [
      'When displaying information to users, you frequently need to combine static text with dynamic variables. Python 3 introduced f-strings (Formatted String Literals) as the cleanest and fastest way to do this.',
      'An f-string starts with the letter f before the quotation mark, and variables are placed inside curly braces {}.'
    ],
    analogy: 'Think of an f-string like a fill-in-the-blank form letter. The fixed text stays the same, and Python fills in the blank spaces {} with real data!',
    codeExample: `name = "Sarah"
score = 98

# Using an f-string
message = f"Student {name} scored {score} points!"
print(message)`,
    takeaways: [
      'Prefix strings with letter f or F.',
      'Insert variables inside curly braces {variable}.',
      'You can evaluate mathematical expressions inside braces, e.g., {5 * 10}.'
    ],
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
    paragraphs: [
      'Comments allow you to explain your code to human readers. Python ignores lines starting with #.',
      'The input() function pauses execution and waits for the user to type a response from the keyboard. The input is always returned as a string (str).'
    ],
    analogy: 'Comments are sticky notes attached to your code for other developers to read. Input is asking a question through a microphone and listening for a response!',
    codeExample: `# This is a comment - Python ignores this
name = "Alex" # Variable assignment

# Greeting user
print("Hello " + name)`,
    takeaways: [
      'Use # for single-line comments.',
      'input() always converts incoming user input into a string.',
      'If you need numbers from input(), convert it using int(input()).'
    ],
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
    paragraphs: [
      'Operators are special symbols used to perform operations on variables and values. Python supports standard arithmetic operators:',
      '• + (Addition)\n• - (Subtraction)\n• * (Multiplication)\n• / (Division - returns float)\n• // (Floor Division - rounds down to int)\n• % (Modulus - returns remainder)\n• ** (Exponentiation - power of)'
    ],
    analogy: 'Arithmetic operators in Python work exactly like the buttons on a handheld calculator, executing calculations instantaneously!',
    codeExample: `a = 10
b = 3

print(a + b)   # 13
print(a / b)   # 3.3333...
print(a // b)  # 3 (rounds down)
print(a ** b)  # 1000 (10^3)`,
    takeaways: [
      'Standard division / always returns a float.',
      'Exponentiation uses ** (e.g. 2 ** 3 = 8).',
      'Modulus % gets the remainder of a division.'
    ],
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
    paragraphs: [
      'Congratulations on completing Module 1! In this capstone project, you will combine variables, arithmetic operators, and f-strings to build a simple calculator script.'
    ],
    analogy: 'You are assembling all the building blocks you have learned so far to construct your first functional software tool!',
    codeExample: `num1 = 15
num2 = 25

sum_val = num1 + num2
prod_val = num1 * num2

print(f"Sum: {sum_val}")
print(f"Product: {prod_val}")`,
    takeaways: [
      'Variables store values.',
      'Arithmetic operators compute mathematical results.',
      'f-strings output nicely formatted reports.'
    ],
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
    subtitle: 'Conditional Decision Making',
    section: 'Module 2 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/conditional-statements-in-python/',
    paragraphs: [
      'Programs make decisions using conditional statements. If a condition evaluates to True, Python executes the indented block of code directly beneath it.',
      'You can use if for the initial check, elif (short for else if) for additional checks, and else as a default fallback when no previous conditions were met.'
    ],
    analogy: 'Imagine a traffic light system: IF light is green, drive. ELIF light is yellow, slow down. ELSE (red light), stop completely!',
    codeExample: `score = 85

if score >= 90:
    print("Grade A")
elif score >= 80:
    print("Grade B")
else:
    print("Grade C")`,
    takeaways: [
      'Indent code inside conditional blocks with 4 spaces.',
      'Condition statements end with a colon (:).',
      'Python evaluates conditions sequentially from top to bottom.'
    ],
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
    subtitle: 'Evaluating Truth Values',
    section: 'Module 2 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-operators/',
    paragraphs: [
      'Comparison operators evaluate relationships between two values and return a Boolean (True or False):',
      '• == (Equal to)\n• != (Not equal to)\n• > (Greater than)\n• < (Less than)\n• >= (Greater than or equal to)\n• <= (Less than or equal to)'
    ],
    analogy: 'Comparison operators work like a bouncer at a venue checking ID badges against eligibility rules!',
    codeExample: `age = 18

print(age >= 18)   # True
print(age == 21)   # False
print(age != 10)   # True`,
    takeaways: [
      'Use == for comparison, NOT a single = (which is assignment).',
      'Comparison expressions return Boolean True or False.'
    ],
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
    subtitle: 'Combining Conditions with and, or, not',
    section: 'Module 2 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-operators/',
    paragraphs: [
      'Logical operators allow you to combine multiple conditional statements together:',
      '1. and: Returns True only if BOTH conditions are True.\n2. or: Returns True if AT LEAST ONE condition is True.\n3. not: Reverses the boolean result (True becomes False).'
    ],
    analogy: 'To board a flight, you need BOTH a ticket AND a passport (and operator). To pay for a meal, you can use cash OR card (or operator).',
    codeExample: `has_ticket = True
age = 20

can_enter = has_ticket and age >= 18
print(can_enter)  # True`,
    takeaways: [
      'and requires all conditions to pass.',
      'or requires at least one condition to pass.',
      'not flips True to False and vice versa.'
    ],
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
    subtitle: 'Structural Match Case Statements',
    section: 'Module 2 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/conditional-statements-in-python/',
    paragraphs: [
      'Pattern matching in Python 3.10+ provides a clean alternative to long chains of if-elif-else statements using the match and case keywords.'
    ],
    analogy: 'Match-case works like a mail sorting room: a package arrives, and it is immediately dispatched to the matching destination bin!',
    codeExample: `status_code = 200

if status_code == 200:
    print("OK")
elif status_code == 404:
    print("Not Found")`,
    takeaways: [
      'Simplifies multi-branch equality comparisons.',
      'Replaces long nested if-elif blocks.'
    ],
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
    paragraphs: [
      'In this project, you will build the game logic for a number guessing game. Compare a player\'s guess against a secret number using conditional statements.'
    ],
    analogy: 'Think of a carnival guessing booth: if your guess matches the secret winning number, you win the prize!',
    codeExample: `secret = 7
guess = 7

if guess == secret:
    print("You Won!")
else:
    print("Try Again")`,
    takeaways: [
      'Combine comparison operators with if-else logic.',
      'Control flow directs software outcome dynamically.'
    ],
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
    subtitle: 'Automating Repetitive Tasks',
    section: 'Module 3 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    paragraphs: [
      'Loops allow you to execute a block of code multiple times automatically without rewriting code.',
      'A for loop is used to iterate over a sequence (such as a list, tuple, string, or number range).'
    ],
    analogy: 'Imagine a factory assembly line robot: for every item on the conveyor belt, the robot performs the exact same action automatically!',
    codeExample: `# Loop over a sequence of numbers
for i in range(1, 4):
    print(i)`,
    takeaways: [
      'for loops iterate over iterable sequences.',
      'Indented code runs once for every single item in the sequence.'
    ],
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
    subtitle: 'Condition-Based Repetition',
    section: 'Module 3 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    paragraphs: [
      'A while loop keeps repeating a block of code as long as a specified condition remains True.',
      'Always ensure that the loop condition eventually becomes False, otherwise the program will run in an infinite loop!'
    ],
    analogy: 'A while loop is like a microwave timer: while remaining seconds > 0, keep heating the food!',
    codeExample: `count = 3
while count > 0:
    print(count)
    count -= 1
print("Blastoff!")`,
    takeaways: [
      'while loops depend on a boolean condition.',
      'Remember to update variables inside the loop to avoid infinite loops.'
    ],
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
    subtitle: 'Loop Flow Control',
    section: 'Module 3 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    paragraphs: [
      'Python provides two keywords to alter normal loop execution:',
      '• break: Terminates the loop immediately and jumps out.\n• continue: Skips the rest of the current iteration and jumps directly to the next iteration.'
    ],
    analogy: 'continue is like skipping a skippable song in a playlist. break is like pulling out your headphones and stopping music entirely!',
    codeExample: `for i in range(1, 6):
    if i == 3:
        continue  # Skip 3
    print(i)`,
    takeaways: [
      'break stops the loop completely.',
      'continue skips only the current step.'
    ],
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
    subtitle: 'Sequence Generation',
    section: 'Module 3 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    paragraphs: [
      'The range() function returns an immutable sequence of numbers. Syntax: range(start, stop, step).',
      'Note that range() stops ONE number BEFORE the specified stop limit.'
    ],
    analogy: 'range(2, 10, 2) is like counting by twos on a ruler: 2, 4, 6, 8 (stopping before 10)!',
    codeExample: `# Print even numbers from 2 to 8
for num in range(2, 9, 2):
    print(num)`,
    takeaways: [
      'range(stop) generates numbers from 0 up to stop-1.',
      'range(start, stop, step) allows custom increments.'
    ],
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
    title: 'Mini Project: Password Strength Checker',
    subtitle: 'Module 3 Capstone Project',
    section: 'Module 3 · Capstone',
    gfgUrl: 'https://www.geeksforgeeks.org/python/loops-in-python/',
    paragraphs: [
      'In this project, write a password checker that inspects the length of a string variable using len().'
    ],
    analogy: 'Think of a door security scanner measuring string length to ensure passwords pass minimum safety criteria!',
    codeExample: `pwd = "SecretPass123"
if len(pwd) >= 8:
    print("Strong Password")
else:
    print("Weak Password")`,
    takeaways: [
      'len() returns string length.',
      'Combine string inspections with conditionals.'
    ],
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
    subtitle: 'Creating Reusable Code Blocks',
    section: 'Module 4 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-functions/',
    paragraphs: [
      'A function is a reusable block of organized code designed to perform a single specific task.',
      'Functions are defined using the def keyword, followed by the function name, parentheses (), and a colon (:).'
    ],
    analogy: 'A function is like a named recipe in a cookbook. Once defined, you can cook (call) the recipe as many times as you want without re-writing the instructions!',
    codeExample: `# Defining a function
def greet():
    print("Hello from AIcademy!")

# Calling the function
greet()`,
    takeaways: [
      'Define functions with def name():',
      'Call functions by writing name() with parentheses.',
      'Prevents code duplication (DRY principle: Don\'t Repeat Yourself).'
    ],
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
    subtitle: 'Passing Input Data into Functions',
    section: 'Module 4 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-functions/',
    paragraphs: [
      'Functions become much more powerful when you pass data into them.',
      'Parameters are the placeholders defined inside the function parentheses. Arguments are the actual values passed into the function when you call it.'
    ],
    analogy: 'Parameters are like slots in a toaster (bread slot, bagel slot). Arguments are the actual items you place in the slots!',
    codeExample: `def add(a, b):
    print(a + b)

add(10, 20)  # Output: 30`,
    takeaways: [
      'Parameters act as local variables inside the function.',
      'Functions can accept multiple parameters separated by commas.'
    ],
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
    subtitle: 'Returning Results from Functions',
    section: 'Module 4 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-functions/',
    paragraphs: [
      'Instead of printing results directly, functions often perform calculations and send the output back to the calling code using the return statement.'
    ],
    analogy: 'Think of a calculator function like a vending machine: you input coins and select a snack (arguments), and the machine returns your item!',
    codeExample: `def square(n):
    return n * n

result = square(6)
print(result)  # 36`,
    takeaways: [
      'return exits the function immediately.',
      'The returned value can be stored in a variable or passed to another function.'
    ],
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
    paragraphs: [
      'Scope determines where variables can be accessed in your code.',
      '• Global Variables: Created outside functions and accessible anywhere.\n• Local Variables: Created inside a function and accessible ONLY within that function.'
    ],
    analogy: 'A global variable is like a town clock tower visible to everyone. A local variable is like a clock inside your house visible only to you!',
    codeExample: `x = "Global"  # Accessible anywhere

def show():
    y = "Local"  # Only inside show()
    print(x)

show()`,
    takeaways: [
      'Variables inside functions cannot be read outside.',
      'Global variables exist throughout program lifespan.'
    ],
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
    paragraphs: [
      'Build a conversion function km_to_miles(km) that converts kilometers into miles by multiplying by 0.621371.'
    ],
    analogy: 'Build your own automated converter tool that takes distance inputs and produces accurate mile measurements!',
    codeExample: `def km_to_miles(km):
    return round(km * 0.621371, 2)

print(km_to_miles(10))`,
    takeaways: [
      'Combine parameters, math calculations, and return values.',
      'Use round() to format float decimal results.'
    ],
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
    subtitle: 'Ordered Mutable Collections',
    section: 'Module 5 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-lists/',
    paragraphs: [
      'A list is an ordered, mutable (changeable) collection of items written inside square brackets [].',
      'Lists can hold elements of any data type and support methods like .append(), .remove(), .sort(), and .pop().'
    ],
    analogy: 'Think of a list as a shopping list written on paper. You can add new items to the bottom, remove items, or re-order them anytime!',
    codeExample: `fruits = ["apple", "banana"]
fruits.append("cherry")

print(fruits)  # ['apple', 'banana', 'cherry']`,
    takeaways: [
      'Lists use square brackets [].',
      'Lists are zero-indexed (first element is at index 0).',
      '.append(item) adds a new element to the end.'
    ],
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
    subtitle: 'Immutable Ordered Sequences',
    section: 'Module 5 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-tuples/',
    paragraphs: [
      'Tuples are ordered collections wrapped in parentheses () that cannot be modified after creation (immutable).'
    ],
    analogy: 'A tuple is like a passport number or GPS coordinates (latitude, longitude): once created, the data should never be altered!',
    codeExample: `point = (10, 20)
print(point[0])  # 10`,
    takeaways: [
      'Tuples use parentheses ().',
      'Tuples cannot be appended or modified after creation.'
    ],
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
    subtitle: 'Key-Value Mapping',
    section: 'Module 5 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-dictionary/',
    paragraphs: [
      'Dictionaries store data as key:value pairs inside curly braces {}. They allow instant lookups using unique keys.'
    ],
    analogy: 'A dictionary works like a real-world dictionary: you look up a word (the key) to instantly find its definition (the value)!',
    codeExample: `user = {
    "name": "Alice",
    "role": "Developer"
}
print(user["name"])  # Alice`,
    takeaways: [
      'Dictionaries use curly braces {} with key: value pairs.',
      'Access values using dictionary[key].'
    ],
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
    subtitle: 'Unique Unordered Collections',
    section: 'Module 5 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/sets-in-python/',
    paragraphs: [
      'Sets are unordered collections written with curly braces {} that automatically remove duplicate values.'
    ],
    analogy: 'A set is like a VIP guestlist: even if someone signs up twice, their name appears on the list only once!',
    codeExample: `nums = {1, 2, 2, 3}
print(sorted(list(nums)))  # [1, 2, 3]`,
    takeaways: [
      'Sets automatically strip duplicate entries.',
      'Ideal for fast membership testing and set math (unions/intersections).'
    ],
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
    paragraphs: [
      'Build a student grade management script that stores course grades in a dictionary and computes average scores.'
    ],
    analogy: 'Construct an automated gradebook that calculates final GPA averages from subject scores!',
    codeExample: `grades = {"Math": 90, "Science": 80}
avg = sum(grades.values()) / len(grades)
print(f"Average: {avg:.1f}")`,
    takeaways: [
      'dict.values() gets all dictionary values.',
      'sum() and len() calculate averages.'
    ],
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
    paragraphs: [
      'File handling allows Python to read data stored in external files on your hard drive using open(filename, "r").'
    ],
    analogy: 'Opening a file for reading is like opening a book to read its pages without writing anything new on them!',
    codeExample: `content = "File content loaded"
print(content)`,
    takeaways: [
      'open(file, "r") reads text files.',
      'Always close files or use with open() statements.'
    ],
    challengeIntro: 'Simulate file reading content string.',
    instructions: ['Print simulated content: "File content loaded"'],
    initialCode: 'content = "File content loaded"\nprint(content)',
    expectedOutput: 'File content loaded',
    solutionCode: 'content = "File content loaded"\nprint(content)'
  },

  '6-2': {
    title: 'Writing & Appending Files',
    subtitle: 'Saving Persistent Data',
    section: 'Module 6 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/file-handling-python/',
    paragraphs: [
      'Mode "w" overwrites a file with new content, while mode "a" appends new content to the end of the existing file.'
    ],
    analogy: 'Writing ("w") is erasing a chalkboard and starting fresh. Appending ("a") is adding a new line to the bottom of the board!',
    codeExample: `print("Data saved")`,
    takeaways: [
      '"w" mode overwrites existing files.',
      '"a" mode appends without deleting old data.'
    ],
    challengeIntro: 'Write string "Data saved" and print message.',
    instructions: ['Print "Data saved"'],
    initialCode: 'print("Data saved")',
    expectedOutput: 'Data saved',
    solutionCode: 'print("Data saved")'
  },

  '6-3': {
    title: 'CSV File Basics',
    subtitle: 'Structured Tabular Files',
    section: 'Module 6 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/file-handling-python/',
    paragraphs: [
      'CSV (Comma Separated Values) files store rows of structured data separated by commas.'
    ],
    analogy: 'CSV files are raw spreadsheet files that plain text editors can open row by row!',
    codeExample: `row = "Alice,90,Pass".split(",")
print(row[0])  # Alice`,
    takeaways: [
      'split(",") breaks comma-separated strings into lists.',
      'Standard format for spreadsheet datasets.'
    ],
    challengeIntro: 'Parse CSV line "Alice,90,Pass" and print name.',
    instructions: ['Split row by comma and print first item'],
    initialCode: 'row = "Alice,90,Pass".split(",")\nprint(row[0])',
    expectedOutput: 'Alice',
    solutionCode: 'row = "Alice,90,Pass".split(",")\nprint(row[0])'
  },

  '6-4': {
    title: 'JSON Parsing',
    subtitle: 'Handling JSON Data',
    section: 'Module 6 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/file-handling-python/',
    paragraphs: [
      'JSON is the standard format for web data interchange. Python\'s json library provides json.loads() and json.dumps().'
    ],
    analogy: 'JSON is the common language used when web apps communicate with database servers!',
    codeExample: `import json
data = json.loads('{"status": "ok"}')
print(data["status"])  # ok`,
    takeaways: [
      'json.loads() parses JSON string to Python dictionary.',
      'json.dumps() converts Python dictionary to JSON string.'
    ],
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
    paragraphs: [
      'In this capstone, compute total financial expenses stored in a numerical data list.'
    ],
    analogy: 'Build a financial tracking script that computes monthly budget totals automatically!',
    codeExample: `expenses = [12.5, 45.0, 30.0]
print(f"Total: \${sum(expenses):.1f}")`,
    takeaways: [
      'sum() totals numeric lists.',
      'Formatting floats with :.1f rounds to 1 decimal place.'
    ],
    challengeIntro: 'Sum expenses and print "Total: $87.5".',
    instructions: ['expenses = [12.5, 45.0, 30.0]', 'Print Total'],
    initialCode: 'expenses = [12.5, 45.0, 30.0]\nprint(f"Total: ${sum(expenses):.1f}")',
    expectedOutput: 'Total: $87.5',
    solutionCode: 'expenses = [12.5, 45.0, 30.0]\nprint(f"Total: ${sum(expenses):.1f}")'
  },

  // ─── MODULE 7: ERROR HANDLING ──────────────────────────────────────────
  '7-1': {
    title: 'try / except Blocks',
    subtitle: 'Preventing Runtime Crashes',
    section: 'Module 7 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-exception-handling/',
    paragraphs: [
      'Exception handling prevents your software from abruptly crashing when unexpected errors occur at runtime.',
      'Place code that might fail inside a try block, and handle the failure inside an except block.'
    ],
    analogy: 'A try/except block is a safety net under a gymnast: if they fall (error occurs), the safety net catches them safely so the show goes on!',
    codeExample: `try:
    res = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")`,
    takeaways: [
      'try tests code blocks for errors.',
      'except handles specific exceptions smoothly.'
    ],
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
    paragraphs: [
      'ValueError happens when a function receives a value of right type but wrong content (e.g. int("abc")).'
    ],
    analogy: 'Trying to turn letters "abc" into a number is like trying to plug a square key into a round padlock!',
    codeExample: `try:
    num = int("abc")
except ValueError:
    print("Invalid integer")`,
    takeaways: [
      'ValueError signals invalid data conversion.',
      'Catching specific error names keeps code robust.'
    ],
    challengeIntro: 'Catch ValueError when converting string "abc" to int.',
    instructions: ['try int("abc")', 'except ValueError print "Invalid integer"'],
    initialCode: 'try:\n    num = int("abc")\nexcept ValueError:\n    print("Invalid integer")',
    expectedOutput: 'Invalid integer',
    solutionCode: 'try:\n    num = int("abc")\nexcept ValueError:\n    print("Invalid integer")'
  },

  '7-3': {
    title: 'Raising Errors',
    subtitle: 'Custom Exceptions with raise',
    section: 'Module 7 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/user-defined-exceptions-python-examples/',
    paragraphs: [
      'Use the raise keyword to deliberately trigger an exception when custom business logic rules are violated.'
    ],
    analogy: 'Raising an error is pressing an emergency stop alarm when invalid data enters your pipeline!',
    codeExample: `age = -5
try:
    if age < 0:
        raise ValueError("Age cannot be negative")
except ValueError as e:
    print(e)`,
    takeaways: [
      'raise forces an exception to occur.',
      'Use descriptive error messages.'
    ],
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
    paragraphs: [
      'Build a crash-proof divide function safe_divide(a, b) that returns an error message when division by zero occurs.'
    ],
    analogy: 'Build an error-resilient calculator engine that never crashes on bad inputs!',
    codeExample: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero"

print(safe_divide(10, 0))`,
    takeaways: [
      'Wrap dangerous math operations inside try-except.',
      'Return graceful error strings instead of crashing.'
    ],
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
    paragraphs: [
      'Object-Oriented Programming (OOP) organizes software design around data objects rather than functions.',
      'A Class is an architectural blueprint. An Object is a concrete instance built from that blueprint.'
    ],
    analogy: 'A class is like an architectural blueprint for a car. An object is an actual physical car manufactured using that blueprint!',
    codeExample: `class Car:
    brand = "Tesla"

my_car = Car()
print(my_car.brand)  # Tesla`,
    takeaways: [
      'class ClassName: defines a new blueprint.',
      'Object instantiation: obj = ClassName().',
      'Access properties using dot notation (obj.property).'
    ],
    challengeIntro: 'Define class Car with attribute brand = "Tesla". Create object my_car and print brand.',
    instructions: ['class Car: brand = "Tesla"', 'my_car = Car()', 'print(my_car.brand)'],
    initialCode: 'class Car:\n    brand = "Tesla"\n\nmy_car = Car()\nprint(my_car.brand)',
    expectedOutput: 'Tesla',
    solutionCode: 'class Car:\n    brand = "Tesla"\n\nmy_car = Car()\nprint(my_car.brand)'
  },

  '8-2': {
    title: 'Methods & self Keyword',
    subtitle: 'Class Behaviors',
    section: 'Module 8 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-classes-and-objects/',
    paragraphs: [
      'Methods are functions defined inside a class that define object behaviors.',
      'The self parameter represents the specific instance of the class being operated on.'
    ],
    analogy: 'If a car object is built from a blueprint, its methods are actions like drive(), honk(), or stop()!',
    codeExample: `class Car:
    def speak(self):
        return "Vroom!"

my_car = Car()
print(my_car.speak())  # Vroom!`,
    takeaways: [
      'The first parameter of any class method must be self.',
      'self grants access to object attributes.'
    ],
    challengeIntro: 'Create method speak(self) returning "Vroom!". Print my_car.speak().',
    instructions: ['def speak(self): return "Vroom!"', 'print(my_car.speak())'],
    initialCode: 'class Car:\n    def speak(self):\n        return "Vroom!"\n\nmy_car = Car()\nprint(my_car.speak())',
    expectedOutput: 'Vroom!',
    solutionCode: 'class Car:\n    def speak(self):\n        return "Vroom!"\n\nmy_car = Car()\nprint(my_car.speak())'
  },

  '8-3': {
    title: 'Constructors (__init__)',
    subtitle: 'Initializing Objects',
    section: 'Module 8 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/constructors-in-python/',
    paragraphs: [
      'The __init__() method is automatically executed whenever a new object is created from a class.',
      'It is used to assign unique values to object attributes upon creation.'
    ],
    analogy: 'The constructor __init__ is like an automated factory setup line that fills in unique details (color, owner name) as soon as a new car rolls off the line!',
    codeExample: `class Dog:
    def __init__(self, name):
        self.name = name

dog = Dog("Buddy")
print(dog.name)  # Buddy`,
    takeaways: [
      '__init__() runs automatically when instantiating.',
      'Pass unique instance variables inside __init__.'
    ],
    challengeIntro: 'Initialize Dog(name). Create Dog("Buddy") and print name.',
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
    paragraphs: [
      'Inheritance allows a child class to inherit attributes and methods from a parent class, enabling code reuse and specialization.'
    ],
    analogy: 'An ElectricCar inherits all basic features from Car (steering, wheels) while adding its own electric battery functionality!',
    codeExample: `class Car:
    brand = "Tesla"

class ElectricCar(Car):
    pass

ecar = ElectricCar()
print(ecar.brand)  # Tesla`,
    takeaways: [
      'Child classes inherit all methods from parent classes.',
      'Syntax: class ChildClass(ParentClass):'
    ],
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
    paragraphs: [
      'Build an object-oriented BankAccount class with deposit() methods updating account balance.'
    ],
    analogy: 'Model a real bank account system using classes, constructors, and instance methods!',
    codeExample: `class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount

acc = BankAccount(100)
acc.deposit(50)
print(acc.balance)  # 150`,
    takeaways: [
      'Encapsulate data and methods inside classes.',
      'Instance methods update object state.'
    ],
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
    paragraphs: [
      'Python comes with a rich standard library of built-in modules like math, random, datetime, and sys.'
    ],
    analogy: 'Standard modules are like built-in tools in a Swiss Army knife — ready to use out of the box!',
    codeExample: `import math
print(int(math.sqrt(64)))  # 8`,
    takeaways: [
      'Use import module_name.',
      'Access functions using module.function().'
    ],
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
    paragraphs: [
      'Any Python file (.py) can be imported as a module in another script using import filename.'
    ],
    analogy: 'Custom modules allow you to break large software projects into separate organized blueprint files!',
    codeExample: `print("Module imported successfully")`,
    takeaways: [
      'Keep code organized across multiple files.',
      'Reuse custom functions across scripts.'
    ],
    challengeIntro: 'Simulate module import helper functions.',
    instructions: ['print("Module imported successfully")'],
    initialCode: 'print("Module imported successfully")',
    expectedOutput: 'Module imported successfully',
    solutionCode: 'print("Module imported successfully")'
  },

  '9-3': {
    title: 'Package Management with pip',
    subtitle: 'Installing External Libraries',
    section: 'Module 9 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-packages/',
    paragraphs: [
      'pip is Python\'s official package manager used to download and install thousands of third-party libraries from PyPI.'
    ],
    analogy: 'pip is an app store for Python developers to download open-source libraries created by the global community!',
    codeExample: `print("pip install requests")`,
    takeaways: [
      'Run pip install package_name in terminal.',
      'Unlocks external tools like requests, numpy, and flask.'
    ],
    challengeIntro: 'Print standard pip command: "pip install requests".',
    instructions: ['print("pip install requests")'],
    initialCode: 'print("pip install requests")',
    expectedOutput: 'pip install requests',
    solutionCode: 'print("pip install requests")'
  },

  '9-4': {
    title: 'Virtual Environments',
    subtitle: 'Isolated Project Environments',
    section: 'Module 9 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/python/python-packages/',
    paragraphs: [
      'Virtual environments (venv) create self-contained directory trees that isolate package dependencies for specific projects.'
    ],
    analogy: 'A virtual environment is a clean sandboxed workbench for each project so dependencies don\'t conflict with each other!',
    codeExample: `print("python -m venv venv")`,
    takeaways: [
      'Prevents package version conflicts.',
      'Standard practice for professional Python development.'
    ],
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
    paragraphs: [
      'Simulate an API response dictionary containing city weather information.'
    ],
    analogy: 'Parse JSON data returned from weather APIs to present weather reports!',
    codeExample: `weather = {"city": "Tokyo", "temp": 22}
print(f"{weather['city']}: {weather['temp']}°C Clear")`,
    takeaways: [
      'Access dictionary values via keys.',
      'Format weather reports cleanly.'
    ],
    challengeIntro: 'Print "Tokyo: 22°C Clear".',
    instructions: ['weather = {"city": "Tokyo", "temp": 22}', 'Print formatted string'],
    initialCode: 'weather = {"city": "Tokyo", "temp": 22}\nprint(f"{weather[\'city\']}: {weather[\'temp\']}°C Clear")',
    expectedOutput: 'Tokyo: 22°C Clear',
    solutionCode: 'weather = {"city": "Tokyo", "temp": 22}\nprint(f"{weather[\'city\']}: {weather[\'temp\']}°C Clear")'
  },

  // ─── MODULE 10: NUMPY ──────────────────────────────────────────────────
  '10-1': {
    title: 'NumPy Arrays & Dimensions',
    subtitle: 'Numerical Computing in Python',
    section: 'Module 10 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    paragraphs: [
      'NumPy (Numerical Python) is the foundational library for scientific computing and AI in Python. It introduces the ndarray (N-dimensional array), which is memory-efficient and up to 50x faster than standard Python lists.'
    ],
    analogy: 'Standard Python lists are like mixed storage drawers. NumPy arrays are uniform grid trays where every item is the exact same data type, allowing lightning-fast computations!',
    codeExample: `arr = [10, 20, 30]
print(sum(arr))  # 60`,
    takeaways: [
      'NumPy powers AI & data science in Python.',
      'High-performance homogenous numerical arrays.'
    ],
    challengeIntro: 'Create simulated NumPy array arr = [10, 20, 30] and print sum.',
    instructions: ['arr = [10, 20, 30]', 'print(sum(arr))'],
    initialCode: 'arr = [10, 20, 30]\nprint(sum(arr))',
    expectedOutput: '60',
    solutionCode: 'arr = [10, 20, 30]\nprint(sum(arr))'
  },

  '10-2': {
    title: 'Array Indexing & Slicing',
    subtitle: 'Accessing Array Subsets',
    section: 'Module 10 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    paragraphs: [
      'NumPy array slicing uses syntax arr[start:stop:step] to extract subsets of data fast.'
    ],
    analogy: 'Array slicing is like cutting a slice out of a loaf of bread — selecting exact start and stop bounds!',
    codeExample: `arr = [10, 20, 30, 40]
print(arr[:2])  # [10, 20]`,
    takeaways: [
      'Slicing selects array portions.',
      'Zero-indexed slicing.'
    ],
    challengeIntro: 'Slice arr = [10, 20, 30, 40] up to index 2.',
    instructions: ['arr = [10, 20, 30, 40]', 'print(arr[:2])'],
    initialCode: 'arr = [10, 20, 30, 40]\nprint(arr[:2])',
    expectedOutput: '[10, 20]',
    solutionCode: 'arr = [10, 20, 30, 40]\nprint(arr[:2])'
  },

  '10-3': {
    title: 'Broadcasting & Vectorization',
    subtitle: 'Element-wise Array Operations',
    section: 'Module 10 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/python/numpy-tutorial/',
    paragraphs: [
      'Vectorization allows math operations to be applied to all elements of an array simultaneously without explicit for loops.'
    ],
    analogy: 'Vectorization is pressing a button to multiply an entire column of spreadsheet numbers at once!',
    codeExample: `arr = [1, 2, 3]
print([x * 2 for x in arr])  # [2, 4, 6]`,
    takeaways: [
      'Eliminates slow Python for loops.',
      'Core mechanic behind AI neural network math.'
    ],
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
    paragraphs: [
      'Linear algebra forms the mathematical foundation of Machine Learning. Calculate dot products of two vectors.'
    ],
    analogy: 'Dot products calculate similarity between vectors in multi-dimensional space!',
    codeExample: `a = [1, 2]
b = [3, 4]
dot = a[0]*b[0] + a[1]*b[1]  # 1*3 + 2*4 = 11
print(dot)`,
    takeaways: [
      'Dot products multiply matching components and sum results.',
      'Foundation of neural network weights.'
    ],
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
    paragraphs: [
      'Perform element-wise matrix addition on two 2x2 grid matrices.'
    ],
    analogy: 'Overlaying two grid maps together to combine geographical values!',
    codeExample: `A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
C = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]
print(C)`,
    takeaways: [
      'Nested loops or list comps handle matrix dimensions.',
      'Grid element addition.'
    ],
    challengeIntro: 'Add two 2x2 matrices A = [[1, 2], [3, 4]] and B = [[5, 6], [7, 8]].',
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
    paragraphs: [
      'Pandas is the premier library for data manipulation and analysis in Python. A DataFrame is a 2D labeled data structure with columns of potentially different types.'
    ],
    analogy: 'A Pandas DataFrame is like an interactive Excel spreadsheet operating at hyper-speed inside Python code!',
    codeExample: `data = {"Name": ["Alice"], "Score": [95]}
print(data["Name"][0])`,
    takeaways: [
      'DataFrames represent tabular spreadsheets.',
      'Series represent individual data columns.'
    ],
    challengeIntro: 'Create a simulated DataFrame dictionary data = {"Name": ["Alice"], "Score": [95]}.',
    instructions: ['data = {"Name": ["Alice"], "Score": [95]}', 'print(data["Name"][0])'],
    initialCode: 'data = {"Name": ["Alice"], "Score": [95]}\nprint(data["Name"][0])',
    expectedOutput: 'Alice',
    solutionCode: 'data = {"Name": ["Alice"], "Score": [95]}\nprint(data["Name"][0])'
  },

  '11-2': {
    title: 'Reading CSV Datasets',
    subtitle: 'Loading Real-World Data',
    section: 'Module 11 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    paragraphs: [
      'Pandas pd.read_csv() function loads raw CSV dataset files directly into a DataFrame in a single command.'
    ],
    analogy: 'Importing a CSV into Pandas is like opening a multi-gigabyte dataset file instantly with a single button press!',
    codeExample: `df_shape = (500, 5)
print(f"Loaded {df_shape[0]} rows")`,
    takeaways: [
      'read_csv() parses tabular files effortlessly.',
      'df.shape gives (rows, columns) dimensions.'
    ],
    challengeIntro: 'Print dataset head row count.',
    instructions: ['df_shape = (500, 5)', 'print(f"Loaded {df_shape[0]} rows")'],
    initialCode: 'df_shape = (500, 5)\nprint(f"Loaded {df_shape[0]} rows")',
    expectedOutput: 'Loaded 500 rows',
    solutionCode: 'df_shape = (500, 5)\nprint(f"Loaded {df_shape[0]} rows")'
  },

  '11-3': {
    title: 'Data Cleaning & Filtering',
    subtitle: 'Extracting Target Insights',
    section: 'Module 11 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    paragraphs: [
      'Data cleaning involves filtering out unwanted rows or selecting specific subsets of data based on criteria.'
    ],
    analogy: 'Filtering data is like sifting flour: keeping only the high-value grains that pass your filter criteria!',
    codeExample: `scores = [60, 85, 92, 74]
filtered = [s for s in scores if s > 80]
print(filtered)  # [85, 92]`,
    takeaways: [
      'Filter data using conditions.',
      'Strip useless or bad rows.'
    ],
    challengeIntro: 'Filter scores = [60, 85, 92, 74] keeping scores > 80.',
    instructions: ['scores = [60, 85, 92, 74]', 'filtered = [s for s in scores if s > 80]', 'print(filtered)'],
    initialCode: 'scores = [60, 85, 92, 74]\nfiltered = [s for s in scores if s > 80]\nprint(filtered)',
    expectedOutput: '[85, 92]',
    solutionCode: 'scores = [60, 85, 92, 74]\nfiltered = [s for s in scores if s > 80]\nprint(filtered)'
  },

  '11-4': {
    title: 'Grouping & Aggregation',
    subtitle: 'Pivot Table Calculations',
    section: 'Module 11 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    paragraphs: [
      'groupby() operations categorize data rows into groups and compute summary statistics like sum(), mean(), or count().'
    ],
    analogy: 'Grouping is sorting sales receipts by store location and calculating total revenue per store!',
    codeExample: `sales = {"East": 200, "West": 300}
print(sum(sales.values()))  # 500`,
    takeaways: [
      'groupby() categorizes dataset rows.',
      'Aggregation functions summarize data.'
    ],
    challengeIntro: 'Group sales by region: {"East": 200, "West": 300}. Print total.',
    instructions: ['sales = {"East": 200, "West": 300}', 'print(sum(sales.values()))'],
    initialCode: 'sales = {"East": 200, "West": 300}\nprint(sum(sales.values()))',
    expectedOutput: '500',
    solutionCode: 'sales = {"East": 200, "West": 300}\nprint(sum(sales.values()))'
  },

  '11-5': {
    title: 'Handling Missing Values',
    subtitle: 'Data Sanitization',
    section: 'Module 11 · Chapter 5',
    gfgUrl: 'https://www.geeksforgeeks.org/pandas/pandas-tutorial/',
    paragraphs: [
      'Real-world datasets contain missing entries (NaN or None). Clean missing data using fillna() or dropna().'
    ],
    analogy: 'Handling missing values is filling in blank spots on a survey with default average scores!',
    codeExample: `data = [10, None, 30]
clean = [x if x is not None else 0 for x in data]
print(clean)  # [10, 0, 30]`,
    takeaways: [
      'None or NaN represents missing data.',
      'Sanitize data before training AI models.'
    ],
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
    paragraphs: [
      'Perform data aggregation analysis on a simulated dataset of movie and TV show titles.'
    ],
    analogy: 'Build a movie streaming catalog report that tallies total content offerings across genres!',
    codeExample: `movies = 1200
tv_shows = 800
print(f"Total Titles: {movies + tv_shows}")`,
    takeaways: [
      'Summarize large datasets into executive metric reports.',
      'Combine data operations.'
    ],
    challengeIntro: 'Print "Total Titles: 2000".',
    instructions: ['movies = 1200, tv_shows = 800', 'print(f"Total Titles: {movies + tv_shows}")'],
    initialCode: 'movies = 1200\ntv_shows = 800\nprint(f"Total Titles: {movies + tv_shows}")',
    expectedOutput: 'Total Titles: 2000',
    solutionCode: 'movies = 1200\ntv_shows = 800\nprint(f"Total Titles: {movies + tv_shows}")'
  },

  // ─── MODULE 12: DATA VISUALIZATION ─────────────────────────────────────
  '12-1': {
    title: 'Matplotlib Basics',
    subtitle: 'Creating Visual Charts',
    section: 'Module 12 · Chapter 1',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    paragraphs: [
      'Matplotlib is the foundational Python library for data visualization, allowing you to plot line charts, bar graphs, histograms, and scatter plots.'
    ],
    analogy: 'Matplotlib is like a digital canvas where Python code draws graphs automatically!',
    codeExample: `print("Plot: Sales over Time")`,
    takeaways: [
      'Visualizations turn raw data into insights.',
      'Matplotlib powers data science plots.'
    ],
    challengeIntro: 'Simulate rendering a plot title string.',
    instructions: ['print("Plot: Sales over Time")'],
    initialCode: 'print("Plot: Sales over Time")',
    expectedOutput: 'Plot: Sales over Time',
    solutionCode: 'print("Plot: Sales over Time")'
  },

  '12-2': {
    title: 'Line Plots & Customization',
    subtitle: 'Tracking Trends',
    section: 'Module 12 · Chapter 2',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    paragraphs: [
      'Line plots connect discrete points on a graph, making them ideal for visualizing trends over time.'
    ],
    analogy: 'Line charts are like heartbeat monitors showing ups and downs over time!',
    codeExample: `points = [(1, 10), (2, 20), (3, 30)]
print(points)`,
    takeaways: [
      'Ideal for time-series trend analysis.',
      'Connects sequential data points.'
    ],
    challengeIntro: 'Print line plot point pairs.',
    instructions: ['points = [(1, 10), (2, 20), (3, 30)]', 'print(points)'],
    initialCode: 'points = [(1, 10), (2, 20), (3, 30)]\nprint(points)',
    expectedOutput: '[(1, 10), (2, 20), (3, 30)]',
    solutionCode: 'points = [(1, 10), (2, 20), (3, 30)]\nprint(points)'
  },

  '12-3': {
    title: 'Histograms & Distributions',
    subtitle: 'Frequency Grids',
    section: 'Module 12 · Chapter 3',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    paragraphs: [
      'Histograms illustrate how continuous numeric data is distributed across equal-width intervals (bins).'
    ],
    analogy: 'Histograms sort exam scores into grade buckets (A, B, C, D, F) to show overall class performance!',
    codeExample: `values = [12, 45, 67, 23]
print(max(values))  # 67`,
    takeaways: [
      'Histograms show statistical distributions.',
      'Identify data skew and outliers.'
    ],
    challengeIntro: 'Calculate max value in distribution values = [12, 45, 67, 23].',
    instructions: ['values = [12, 45, 67, 23]', 'print(max(values))'],
    initialCode: 'values = [12, 45, 67, 23]\nprint(max(values))',
    expectedOutput: '67',
    solutionCode: 'values = [12, 45, 67, 23]\nprint(max(values))'
  },

  '12-4': {
    title: 'Scatter Plots & Correlations',
    subtitle: 'Variable Relationships',
    section: 'Module 12 · Chapter 4',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    paragraphs: [
      'Scatter plots display relationship dots between two numerical variables to reveal correlations.'
    ],
    analogy: 'Scatter plots compare study hours versus exam scores to see if more studying leads to higher grades!',
    codeExample: `print("r = 0.95")`,
    takeaways: [
      'Shows positive or negative correlation.',
      'Displays individual data observations.'
    ],
    challengeIntro: 'Print correlation coefficient string "r = 0.95".',
    instructions: ['print("r = 0.95")'],
    initialCode: 'print("r = 0.95")',
    expectedOutput: 'r = 0.95',
    solutionCode: 'print("r = 0.95")'
  },

  '12-5': {
    title: 'Bar Charts',
    subtitle: 'Category Comparison',
    section: 'Module 12 · Chapter 5',
    gfgUrl: 'https://www.geeksforgeeks.org/data-visualization/data-visualization-using-matplotlib/',
    paragraphs: [
      'Bar charts compare metrics across distinct categories using vertical or horizontal rectangular bars.'
    ],
    analogy: 'Bar charts are like podium steps comparing medal tallies across different countries!',
    codeExample: `cats = {"Q1": 100, "Q2": 250}
print(max(cats, key=cats.get))  # Q2`,
    takeaways: [
      'Compares discrete categorical groups.',
      'Bar height corresponds to category value.'
    ],
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
    paragraphs: [
      'In this final capstone, build a data dashboard report output summarizing annual business growth statistics.'
    ],
    analogy: 'Present your completed Python portfolio project summarizing key performance metrics!',
    codeExample: `print("Dashboard Generated: +35% YoY Growth")`,
    takeaways: [
      'Combine data processing with clear visual output.',
      'Congratulations on completing all 12 Python modules!'
    ],
    challengeIntro: 'Print "Dashboard Generated: +35% YoY Growth".',
    instructions: ['print("Dashboard Generated: +35% YoY Growth")'],
    initialCode: 'print("Dashboard Generated: +35% YoY Growth")',
    expectedOutput: 'Dashboard Generated: +35% YoY Growth',
    solutionCode: 'print("Dashboard Generated: +35% YoY Growth")'
  }
};
