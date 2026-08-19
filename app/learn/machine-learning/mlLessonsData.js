// ─── MACHINE LEARNING CURRICULUM LESSONS DATA ──────────────────────────────
export const mlLessonsData = {
  'ml-1-1': {
    id: 'ml-1-1',
    title: 'What is Machine Learning?',
    subtitle: 'Understanding the fundamental shift from rule-based programming to data-driven learning systems.',
    duration: '15 min read',
    level: 'Beginner',
    module: 'Module 1: ML Fundamentals',
    badgeText: 'CORE CONCEPT',
    badgeColor: '#001f54',
    videoUrl: null,
    gfgUrl: null,

    learningObjectives: [
      'Define Machine Learning using Arthur Samuel and Tom Mitchell formal frameworks.',
      'Contrast Traditional Programming (Rules + Data = Answers) with Machine Learning (Data + Answers = Rules).',
      'Understand the three components of Mitchell definition: Experience (E), Task (T), and Performance Measure (P).',
      'Identify when Machine Learning is necessary versus when standard deterministic algorithms suffice.',
      'Trace the fundamental learning cycle: Data → Hypothesis → Error Calculation → Optimization.'
    ],

    sections: [
      {
        heading: 'The Core Definition of Machine Learning',
        paragraphs: [
          'Machine Learning (ML) is a branch of computer science and artificial intelligence focused on building applications that learn from data and improve their accuracy over time without being explicitly programmed.',
          'In 1959, pioneer Arthur Samuel defined machine learning as: "The field of study that gives computers the ability to learn without being explicitly programmed." Instead of writing thousands of hardcoded if-else statements for every conceivable edge case, we provide algorithms with historical examples, allowing the machine to discover statistical regularities on its own.',
          'In 1997, computer scientist Tom Mitchell provided the formal engineering definition: "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."'
        ]
      },
      {
        heading: 'The Paradigm Shift: Traditional Code vs Machine Learning',
        paragraphs: [
          'To appreciate the power of Machine Learning, we must contrast it with classic software engineering:',
          'Traditional Programming: A human software engineer writes explicit deterministic logic (Rules) and inputs Data into the computer. The computer executes those exact instructions and outputs Answers.',
          'Machine Learning: We provide the computer with historical Data and corresponding Answers (outcomes). The ML algorithm analyzes the relationship between the inputs and outputs, automatically synthesizing the statistical function or model (Rules).',
          'Once the model has extracted these rules, we can feed it brand new, unseen data, and it will accurately predict the answers.'
        ]
      },
      {
        heading: 'Why Do We Need Machine Learning?',
        paragraphs: [
          'Traditional software works brilliantly for well-defined problems like calculating payroll taxes, sorting databases, or validating email formatting. These tasks follow strict, predictable mathematical logic.',
          'However, traditional programming completely breaks down when dealing with complex, ambiguous perceptual tasks:',
          '1. Recognizing objects in images: A dog can appear in millions of angles, lighting conditions, breeds, and postures. Writing hardcoded rules for every pixel combination is impossible.',
          '2. Natural Language Processing: Human speech is filled with sarcasm, slang, typos, and evolving idioms that cannot be captured by rigid dictionary rules.',
          '3. Fraud detection & dynamic environments: Financial scammers constantly adapt their strategies. Static if-else rules quickly become obsolete, whereas ML models continuously adapt as new transaction patterns emerge.'
        ]
      },
      {
        heading: 'The Fundamental Learning Cycle',
        paragraphs: [
          'Regardless of whether a model is simple linear regression or a massive deep neural network, all machine learning systems follow the same core iterative cycle:',
          '1. Input Data: The model ingests training examples (past observations).',
          '2. Prediction / Hypothesis: The model applies its current internal parameters to make an initial guess.',
          '3. Loss Evaluation: The model measures the error between its prediction and the true historical answer using an objective mathematical function.',
          '4. Parameter Update: An optimization algorithm slightly adjusts the model internal weights to reduce the error on future iterations.',
          'This cycle repeats millions of times until the error reaches an acceptable minimum.'
        ],
        codeBlock: [
          '# Traditional Programming vs Machine Learning in Python',
          '# ─────────────────────────────────────────────────────────────',
          '',
          '# 1. TRADITIONAL PROGRAMMING: Human writes explicit rules',
          'def predict_salary_traditional(years_experience):',
          '    # Hardcoded rule: Base 30,000 + 10,000 per year of experience',
          '    return 30000 + (years_experience * 10000)',
          '',
          'print(f"Traditional Rule Output (5 years): ${predict_salary_traditional(5):,}")',
          '',
          '',
          '# 2. MACHINE LEARNING: Algorithm discovers the rule from data',
          'import numpy as np',
          'from sklearn.linear_model import LinearRegression',
          '',
          '# We only supply raw data (Experience) and answers (Observed Salaries)',
          'X_train = np.array([[1], [2], [3], [4], [6], [8]]) # Years of Experience',
          'y_train = np.array([40000, 50000, 60000, 70000, 90000, 110000]) # Salaries',
          '',
          '# The model learns the underlying relationship automatically',
          'model = LinearRegression()',
          'model.fit(X_train, y_train)',
          '',
          '# Model deduces: Salary = (Weight * Experience) + Bias',
          'learned_slope = model.coef_[0]',
          'learned_intercept = model.intercept_',
          'prediction_5_years = model.predict([[5]])[0]',
          '',
          'print(f"\\n[ML Learned Rule]: Salary = ({learned_slope:.0f} * Exp) + {learned_intercept:.0f}")',
          'print(f"ML Model Prediction (5 years): ${prediction_5_years:,.2f}")'
        ].join('\n'),
        codeBlockTitle: 'traditional_vs_ml.py'
      },
      {
        heading: 'Tom Mitchell E, T, P Framework in Practice',
        paragraphs: [
          'To formulate any machine learning problem correctly, engineers map it to Mitchell three variables:',
          'Example 1: Email Spam Filter',
          '• Task (T): Classify incoming emails as spam or not spam.',
          '• Experience (E): A dataset of 100,000 past emails previously marked as spam or inbox by users.',
          '• Performance Measure (P): Accuracy percentage or fraction of correctly classified emails.',
          'Example 2: Autonomous Vehicle Navigation',
          '• Task (T): Steer and brake a vehicle safely along a road.',
          '• Experience (E): Millions of miles of driving sensor data (cameras, lidar, human steering inputs).',
          '• Performance Measure (P): Average miles driven before requiring human driver intervention.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Rigid Recipe vs The Seasoned Chef',
      text: 'Traditional programming is like a beginner following a rigid 10-step baking recipe: "Add 200g flour, bake at 180°C for 25 minutes." If the kitchen humidity changes or the oven runs slightly hotter, the cake burns because the recipe cannot adapt. Machine Learning is like an expert chef who has tasted thousands of dishes (Experience). They observe the texture, adjust the seasoning dynamically (Optimization), and produce a perfect dish in any kitchen without needing a step-by-step printed manual!'
    },

    diagram: {
      type: 'what_is_ml',
      title: 'Interactive Paradigm Explorer: Traditional Programming vs Machine Learning'
    },

    takeaways: [
      'Machine Learning systems learn statistical patterns from data rather than relying on explicit human-coded rules.',
      'Traditional programming takes Rules + Data to compute Answers; Machine Learning takes Data + Answers to synthesize Rules.',
      'Tom Mitchell framework defines ML through Task (T), Experience (E), and Performance Measure (P).',
      'ML is indispensable for perception tasks (vision, language, anomaly detection) where deterministic rules are impossible to handcraft.',
      'The generic ML cycle involves: Ingesting Data → Making Predictions → Measuring Error → Updating Parameters.'
    ],

    quiz: {
      question: 'According to Tom Mitchell definition, which of the following represents the Experience (E) for a credit card fraud detection ML model?',
      options: [
        'The classification accuracy percentage on next month transactions',
        'A historical database of 500,000 past credit card transactions labeled as legitimate or fraudulent',
        'The Python code executing the machine learning model in production',
        'The server CPU utilization while processing payments'
      ],
      correctIndex: 1,
      explanation: 'Correct! Experience (E) refers to the past data and historical observations the model learns from. In this case, 500,000 labeled past transactions serve as the training experience.'
    }
  },

  'ml-1-2': {
    id: 'ml-1-2',
    title: 'AI vs ML vs Deep Learning',
    subtitle: 'Demystifying the nested hierarchy of artificial intelligence, statistical machine learning, and deep neural networks.',
    duration: '18 min read',
    level: 'Beginner',
    module: 'Module 1: ML Fundamentals',
    badgeText: 'HIERARCHY & DOMAINS',
    badgeColor: '#001f54',
    videoUrl: null,
    gfgUrl: null,

    learningObjectives: [
      'Understand the concentric nested hierarchy: AI contains ML, which contains Deep Learning.',
      'Define Artificial Intelligence as the broad quest to simulate human cognitive capabilities.',
      'Differentiate Classical/Symbolic AI from Statistical Machine Learning algorithms.',
      'Explain what makes Deep Learning distinct (multi-layer neural networks and representation learning).',
      'Compare Feature Engineering vs Automated Feature Extraction across structured and unstructured data.',
      'Evaluate trade-offs between Traditional ML and Deep Learning regarding data volume, compute requirements, and interpretability.'
    ],

    sections: [
      {
        heading: 'The Nested Hierarchy (The Russian Doll Architecture)',
        paragraphs: [
          'In popular media, the terms "Artificial Intelligence", "Machine Learning", and "Deep Learning" are often used interchangeably as buzzwords. However, in engineering and computer science, they represent a precise concentric hierarchy of nested subsets.',
          '1. Artificial Intelligence (AI): The broadest encompassing umbrella discipline encompassing any technique that enables computers to mimic human intelligence, reasoning, or behavior.',
          '2. Machine Learning (ML): A specialized subset of AI focused on algorithms that learn statistical patterns from data without being explicitly programmed with rigid rules.',
          '3. Deep Learning (DL): A specialized subset of Machine Learning powered by deep artificial neural networks with multiple hidden layers, capable of learning hierarchical feature representations directly from raw unstructured data.'
        ]
      },
      {
        heading: 'Tier 1: Artificial Intelligence (The Broad Frontier)',
        paragraphs: [
          'Coined at the Dartmouth Conference in 1956 by John McCarthy, Artificial Intelligence covers any system capable of performing tasks normally requiring human intelligence: visual perception, speech recognition, decision-making, and language translation.',
          'Crucially, not all AI is Machine Learning. Early AI (often called Symbolic AI or Classical AI) relied on hand-crafted rules, formal logic, and knowledge graphs:',
          '• Rule-Based Expert Systems: Medical diagnosis systems from the 1980s (e.g., MYCIN) containing 5,000 hardcoded IF-THEN medical rules.',
          '• Game-Tree Search: IBM Deep Blue defeating Garry Kasparov in chess (1997) using brute-force minimax search with alpha-beta pruning rather than neural networks.',
          '• Deterministic Navigation: Pathfinding algorithms like Dijkstra and A* calculating the shortest path on a map.'
        ]
      },
      {
        heading: 'Tier 2: Machine Learning (The Statistical Data Engine)',
        paragraphs: [
          'Machine Learning emerged as the dominant paradigm when engineers realized that hardcoding rules for messy real-world problems was unsustainable.',
          'In Traditional Machine Learning, algorithms ingest structured tabular datasets (rows and columns) and optimize mathematical parameters to map features to labels.',
          'Key algorithms in Traditional ML include Linear/Logistic Regression, Support Vector Machines (SVM), Decision Trees, Random Forests, K-Means Clustering, and Gradient Boosting (XGBoost/LightGBM).',
          'The defining characteristic of Traditional ML is Manual Feature Engineering: human data scientists must manually extract relevant indicators (e.g., computing word frequency counts, edge detection gradients, or financial ratios) before passing them to the learning algorithm.'
        ]
      },
      {
        heading: 'Tier 3: Deep Learning (Multi-Layer Representation Learning)',
        paragraphs: [
          'Deep Learning revolutionized artificial intelligence starting in 2012 by eliminating the need for manual feature engineering on complex perceptual tasks.',
          'Inspired by biological brain architectures, Deep Learning uses artificial neural networks with dozens, hundreds, or thousands of stacked hidden layers ("Deep" refers to the layer depth).',
          'Representation Learning: Each layer in a deep network extracts increasingly abstract representations. In computer vision, early layers detect raw edges and color gradients, middle layers combine edges into shapes (noses, eyes, tires), and final layers recognize complete semantic concepts (faces, cars, animals).',
          'Deep Learning excels at unstructured data (images, audio waveforms, video, free-form text), powering technologies like ChatGPT, Whisper speech recognition, Midjourney, and Tesla Full Self-Driving.'
        ],
        codeBlock: [
          '# Comparing Classical AI vs Traditional ML vs Deep Learning in Python',
          '# ─────────────────────────────────────────────────────────────────────',
          '',
          '# 1. CLASSICAL SYMBOLIC AI: Handcrafted deterministic if-else rules',
          'def classify_sentiment_classical(text):',
          '    positive_words = {"superb", "brilliant", "great", "excellent", "love"}',
          '    negative_words = {"terrible", "awful", "horrible", "worst", "hate"}',
          '    ',
          '    words = set(text.lower().split())',
          '    pos_count = len(words.intersection(positive_words))',
          '    neg_count = len(words.intersection(negative_words))',
          '    ',
          '    if pos_count > neg_count:',
          '        return "Positive"',
          '    elif neg_count > pos_count:',
          '        return "Negative"',
          '    return "Neutral"',
          '',
          'print(f"Classical AI Output: {classify_sentiment_classical(\'The movie was brilliant and superb!\')}")',
          '',
          '',
          '# 2. TRADITIONAL MACHINE LEARNING: Hand-extracted features + Logistic Regression',
          'from sklearn.feature_extraction.text import CountVectorizer',
          'from sklearn.linear_model import LogisticRegression',
          '',
          'train_texts = ["Great film love it", "Terrible waste of time", "Excellent acting", "Worst movie ever"]',
          'train_labels = [1, 0, 1, 0] # 1 = Positive, 0 = Negative',
          '',
          '# Step A: Human manual feature engineering (Bag of Words)',
          'vectorizer = CountVectorizer()',
          'X_features = vectorizer.fit_transform(train_texts)',
          '',
          '# Step B: Statistical Classifier',
          'ml_model = LogisticRegression()',
          'ml_model.fit(X_features, train_labels)',
          '',
          'test_sample = vectorizer.transform(["I love this masterpiece"])',
          'ml_pred = ml_model.predict(test_sample)[0]',
          'print(f"Traditional ML Prediction: {\'Positive\' if ml_pred == 1 else \'Negative\'}")',
          '',
          '',
          '# 3. DEEP LEARNING: End-to-End Neural Representation (PyTorch / Keras conceptual)',
          '# The network takes raw token embeddings and learns hierarchical attention weights',
          '# Model: Embedding Layer (128d) -> 4x Transformer Blocks -> Dense Classification Head',
          'print(f"Deep Learning Pipeline: [Raw Text] -> [Token Embeddings] -> [Self-Attention Layers] -> [Sentiment Score: 0.985]")'
        ].join('\n'),
        codeBlockTitle: 'ai_vs_ml_vs_dl_comparison.py'
      },
      {
        heading: 'When to Use Traditional ML vs Deep Learning',
        paragraphs: [
          'A common misconception is that Deep Learning is always superior to Traditional ML. In industry, choosing the right tool depends on your data type, compute budget, and explainability requirements:',
          '1. Data Scale: Traditional ML peaks in accuracy with moderate datasets (thousands of samples). Deep Learning requires massive datasets (hundreds of thousands or millions) to avoid severe overfitting.',
          '2. Data Modality: For structured tabular databases (Excel spreadsheets, customer CRM records, financial logs), Gradient Boosting (XGBoost/LightGBM) consistently outperforms Deep Learning in speed and accuracy. For unstructured media (images, audio, text), Deep Learning dominates.',
          '3. Compute & Latency: Traditional ML trains in seconds on a standard CPU. Deep Learning models require specialized GPU/TPU clusters and massive energy budgets.',
          '4. Interpretability: Traditional ML models provide clear feature importance coefficients and decision paths. Deep Learning models function as complex mathematical black boxes with billions of parameters.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Evolution of Transportation',
      text: 'Think of the hierarchy like Transportation: Artificial Intelligence is the entire category of "Vehicles" (bicycles, steam trains, horse carriages, rockets). Machine Learning is "Motorized Automobiles" (cars with combustion engines powered by fuel/data). Deep Learning is "Autonomous Electric Vehicles" (high-tech Tesla/Waymo cars equipped with multi-sensor computer vision and neural processors). Every autonomous car is an automobile, and every automobile is a vehicle, but a horse carriage is still a vehicle without being a motorcar!'
    },

    diagram: {
      type: 'ai_ml_dl_hierarchy',
      title: 'Interactive Concentric Hierarchy: Artificial Intelligence vs Machine Learning vs Deep Learning'
    },

    takeaways: [
      'Artificial Intelligence is the broad umbrella discipline; Machine Learning is the data-driven subset; Deep Learning is the multi-layer neural network subset.',
      'Classical AI uses hardcoded deterministic rules and search algorithms without learning from data.',
      'Traditional Machine Learning relies on manual human feature engineering on structured tabular data.',
      'Deep Learning performs end-to-end representation learning directly on raw unstructured data (images, audio, text).',
      'Traditional ML remains the gold standard for tabular business data, while Deep Learning powers modern perception and generative AI.'
    ],

    quiz: {
      question: 'Which of the following problems is best suited for Traditional Machine Learning (e.g. XGBoost or Random Forest) rather than a Deep Neural Network?',
      options: [
        'Recognizing handwritten digits and street signs from high-resolution dashcam videos',
        'Predicting loan default probability on a bank database containing 50,000 customer tabular credit records',
        'Real-time voice-to-text transcription across multilingual conversational audio',
        'Generating photorealistic landscape illustrations from natural language prompts'
      ],
      correctIndex: 1,
      explanation: 'Correct! Tabular datasets with structured rows and columns (credit scores, income, loan amounts) are best solved with Traditional ML algorithms like XGBoost, which train faster, require less compute, and offer superior interpretability on tabular data.'
    }
  }
};

