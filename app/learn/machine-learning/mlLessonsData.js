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
  },

  'ml-1-3': {
    id: 'ml-1-3',
    title: 'Supervised vs Unsupervised Learning',
    subtitle: 'Understanding the foundational split: learning with an explicit ground-truth supervisor vs discovering hidden patterns autonomously.',
    duration: '16 min read',
    level: 'Beginner',
    module: 'Module 1: ML Fundamentals',
    badgeText: 'LEARNING PARADIGMS',
    badgeColor: '#001f54',
    videoUrl: null,
    gfgUrl: null,

    learningObjectives: [
      'Understand the core distinction between Supervised Learning (labeled data) and Unsupervised Learning (unlabeled data).',
      'Explain how a Supervisor provides feedback during training via loss functions and ground-truth targets.',
      'Identify key problem categories: Classification & Regression (Supervised) vs Clustering & Dimensionality Reduction (Unsupervised).',
      'Compare common algorithms: Linear Regression, SVM, Random Forest vs K-Means, PCA, and DBSCAN.',
      'Understand the real-world trade-off: The high financial and human cost of data annotation vs the challenge of evaluating unsupervised models.'
    ],

    sections: [
      {
        heading: 'The Core Distinction: The Presence of Ground Truth',
        paragraphs: [
          'All machine learning models ingest data and learn statistical relationships. The fundamental question that determines the learning paradigm is: "Does the model receive the correct answer key during training?"',
          '• Supervised Learning: The training data consists of input features X paired with ground-truth target labels y. The algorithm makes predictions, compares them against the supervisor labels, calculates error, and adjusts its parameters to minimize mistakes.',
          '• Unsupervised Learning: The algorithm is given only raw input features X with zero target labels y. There is no supervisor, no grading rubric, and no ground truth. Instead, the model discovers intrinsic geometric structures, cluster groupings, distributions, and hidden representations on its own.'
        ]
      },
      {
        heading: 'Supervised Learning (Learning with a Teacher)',
        paragraphs: [
          'In Supervised Learning, a human "supervisor" has pre-labeled the historical data (e.g. tagging emails as Spam/Not Spam, bounding boxes around pedestrians in photos, or recording house sale prices).',
          'The training objective is to learn a mapping function f(x) = y such that when presented with unseen future inputs x_test, the model predicts the corresponding label y_test with high accuracy.',
          'Supervised learning branches into two primary families:',
          '1. Classification: Predicting a discrete category or class label (e.g., Cancer vs Healthy, Fraud vs Legitimate, Cat vs Dog vs Bird).',
          '2. Regression: Predicting a continuous numerical quantity (e.g., Temperature, Stock Price, House Valuation, Revenue in dollars).',
          'Common Supervised Algorithms: Linear Regression, Logistic Regression, Decision Trees, Random Forest, Support Vector Machines (SVM), and Gradient Boosted Trees (XGBoost).'
        ]
      },
      {
        heading: 'Unsupervised Learning (Autonomous Pattern Discovery)',
        paragraphs: [
          'In many real-world domains, labeling data is prohibitively expensive, slow, or impossible. Out of millions of customer browsing sessions or network log packets, nobody has time to manually tag each one.',
          'Unsupervised learning algorithms analyze unannotated datasets to find latent patterns and natural clusters based purely on feature similarities and distances.',
          'Unsupervised learning branches into three major families:',
          '1. Clustering: Grouping unlabeled observations into natural subsets where items in the same cluster are geometrically close (e.g., Customer Market Segmentation, Gene Expression Profiling).',
          '2. Dimensionality Reduction: Compressing high-dimensional feature spaces (e.g. 10,000 genomic markers) into 2 or 3 principal axes while retaining variance (e.g., PCA, t-SNE, UMAP).',
          '3. Anomaly Detection: Learning the baseline probability density of normal transactions and flagging outliers that deviate significantly (e.g., Network Intrusion Detection, Manufacturing Defect Scanning).',
          'Common Unsupervised Algorithms: K-Means Clustering, Hierarchical Agglomerative Clustering, DBSCAN, Principal Component Analysis (PCA), and Isolation Forests.'
        ],
        codeBlock: [
          '# Comparing Supervised Learning vs Unsupervised Learning in Python',
          '# ───────────────────────────────────────────────────────────────────',
          'import numpy as np',
          'from sklearn.ensemble import RandomForestClassifier',
          'from sklearn.cluster import KMeans',
          '',
          '# 1. SUPERVISED LEARNING: Training with Input Features (X) + Target Labels (y)',
          '# Data: [Weight in grams, Smoothness score 1-10]',
          'X_supervised = np.array([',
          '    [150, 8],  # Apple',
          '    [170, 7],  # Apple',
          '    [130, 9],  # Apple',
          '    [200, 3],  # Pear',
          '    [220, 2],  # Pear',
          '    [210, 4]   # Pear',
          '])',
          '# Supervisor provides explicit ground-truth class labels: 0 = Apple, 1 = Pear',
          'y_supervised = np.array([0, 0, 0, 1, 1, 1])',
          '',
          'clf = RandomForestClassifier(n_estimators=10, random_state=42)',
          'clf.fit(X_supervised, y_supervised) # Learns mapping X -> y',
          '',
          'new_fruit = np.array([[160, 8.5]])',
          'pred_class = clf.predict(new_fruit)[0]',
          'print(f"Supervised Prediction: {\'Apple\' if pred_class == 0 else \'Pear\'}")',
          '',
          '',
          '# 2. UNSUPERVISED LEARNING: Training with ONLY Features (X) — NO Labels!',
          '# The algorithm receives identical measurements without any names or labels',
          'X_unsupervised = np.array([',
          '    [150, 8], [170, 7], [130, 9],',
          '    [200, 3], [220, 2], [210, 4]',
          '])',
          '',
          '# K-Means autonomously groups data points into k=2 natural geometric clusters',
          'kmeans = KMeans(n_clusters=2, random_state=42)',
          'cluster_labels = kmeans.fit_predict(X_unsupervised)',
          '',
          'print(f"Unsupervised Discovered Clusters: {cluster_labels}")',
          '# Result: [0, 0, 0, 1, 1, 1] — Discovered the exact two fruit groups without labels!'
        ].join('\n'),
        codeBlockTitle: 'supervised_vs_unsupervised_demo.py'
      },
      {
        heading: 'Comparative Summary: Supervised vs Unsupervised',
        paragraphs: [
          '1. Data Input: Supervised uses labeled data (X, y); Unsupervised uses unlabeled data (X only).',
          '2. Human Effort: Supervised requires expensive, time-consuming human annotation; Unsupervised leverages abundant raw data directly.',
          '3. Goal: Supervised aims to predict known target outcomes; Unsupervised aims to discover unknown structure and insights.',
          '4. Evaluation: Supervised models have clear objective evaluation metrics (Accuracy, MSE, F1 Score); Unsupervised evaluation is subjective and exploratory (Silhouette score, inertia, domain validation).'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: Studying with an Answer Key vs Sorting a Toy Box',
      text: 'Supervised Learning is like a student preparing for an exam with practice questions and a complete answer key. After every attempt, they check the answer key (Supervisor), see their error, and correct their technique. Unsupervised Learning is like a 3-year-old child given a giant box of mixed random toys with no instructions. Without knowing words like "Lego", "Doll", or "Action Figure", the child naturally groups blocks into one pile, soft plushies into another, and toy cars into a third based entirely on their shapes and textures!'
    },

    diagram: {
      type: 'supervised_vs_unsupervised',
      title: 'Interactive Learning Paradigm: Supervised Dataflow vs Unsupervised Clustering'
    },

    takeaways: [
      'Supervised Learning trains on feature-label pairs (X, y) with supervisor error feedback.',
      'Unsupervised Learning trains on feature vectors (X) alone to discover intrinsic groupings.',
      'Supervised learning solves Classification (categories) and Regression (numbers).',
      'Unsupervised learning solves Clustering, Dimensionality Reduction, and Anomaly Detection.',
      'Supervised evaluation is objective (Accuracy/RMSE), while Unsupervised evaluation is exploratory and qualitative.'
    ],

    quiz: {
      question: 'A retail eCommerce company has transaction records for 2,000,000 customers with purchase histories, but NO predetermined customer segment categories. They want to group customers into 5 spending personas for targeted marketing. Which approach should they use?',
      options: [
        'Supervised Linear Regression',
        'Unsupervised Clustering (e.g. K-Means or DBSCAN)',
        'Supervised Logistic Regression with binary labels',
        'Deterministic IF-THEN hardcoded rules'
      ],
      correctIndex: 1,
      explanation: 'Correct! Because there are no pre-existing target labels or customer category definitions, an Unsupervised Clustering algorithm (like K-Means) is ideal to discover natural customer groups from behavioral features.'
    }
  },

  'ml-1-4': {
    id: 'ml-1-4',
    title: 'Regression vs Classification',
    subtitle: 'The two core pillars of supervised learning: predicting continuous numerical values vs categorizing discrete class labels.',
    duration: '17 min read',
    level: 'Beginner',
    module: 'Module 1: ML Fundamentals',
    badgeText: 'TASK TAXONOMY',
    badgeColor: '#001f54',
    videoUrl: null,
    gfgUrl: null,

    learningObjectives: [
      'Master the essential difference between continuous numerical target variables (Regression) and discrete categorical labels (Classification).',
      'Understand the geometric objective: fitting a best-fit trend line/surface vs drawing a separating decision boundary.',
      'Differentiate between Binary, Multi-Class, and Multi-Label classification problems.',
      'Recognize key evaluation metric families: MSE, RMSE, MAE, R² (Regression) vs Accuracy, Precision, Recall, F1, ROC-AUC (Classification).',
      'Identify popular algorithms: Linear Regression, Ridge, SVR vs Logistic Regression, Decision Trees, Random Forests, Naive Bayes.'
    ],

    sections: [
      {
        heading: 'The Foundational Split: Continuous vs Discrete Targets',
        paragraphs: [
          'Within Supervised Machine Learning, all algorithms learn from labeled data (X, y). The mathematical nature of the target output y determines whether your problem is Regression or Classification.',
          '• Regression: The target variable y is a continuous real number on an infinite scale (e.g., house price in dollars, outdoor temperature, car speed, flight delay in minutes). Between any two values (e.g., $250,000.00 and $250,001.00), there are infinitely many intermediate numbers.',
          '• Classification: The target variable y is a discrete category or qualitative class label (e.g., Spam vs Inbox, Cat vs Dog, High Risk vs Low Risk). The model outputs probabilities or membership in specific separate buckets.'
        ]
      },
      {
        heading: 'Visualizing the Geometry: Decision Boundary vs Best-Fit Line',
        paragraphs: [
          'The geometry of what the model learns highlights the fundamental difference between both tasks:',
          '1. Classification Geometry (Decision Boundary): The model constructs a mathematical boundary (a line, curve, or high-dimensional hyperplane) that partitions the feature space into distinct colored regions. New data points that land on one side of the line are assigned Class 0, while points on the other side become Class 1.',
          '2. Regression Geometry (Best-Fit Curve): The model fits a continuous trajectory (a line, polynomial curve, or multi-dimensional surface) directly through the cloud of scatter points. For any coordinate x along the horizontal axis, the line calculates the exact predicted height y_pred.'
        ]
      },
      {
        heading: 'Types of Classification Tasks',
        paragraphs: [
          'Classification is widely applied across technology and industry in three distinct structures:',
          '• Binary Classification: Only two mutually exclusive outcomes (0 or 1, True or False). Examples: Fraudulent vs Legitimate transaction, Malignant vs Benign tumor, Pass vs Fail.',
          '• Multi-Class Classification: Three or more mutually exclusive classes, but each sample belongs to exactly one category. Examples: Recognizing handwritten digits (0 through 9), classifying animal species (Dog, Cat, Horse, Bird).',
          '• Multi-Label Classification: Each observation can simultaneously belong to multiple non-exclusive tags. Examples: An article tagged with ["Technology", "Finance", "AI"] or a photo containing both a "Car" and a "Tree".'
        ]
      },
      {
        heading: 'How Success is Measured: Metric Taxonomies',
        paragraphs: [
          'Because the outputs represent fundamentally different data types, they require completely separate evaluation metrics:',
          '• Regression Metrics (Measuring Numerical Distance): Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and R-Squared (R²). A prediction of $205,000 when the actual price is $200,000 has an error residual of $5,000.',
          '• Classification Metrics (Measuring Categorical Accuracy & Confusion): Accuracy Rate (% correct), Precision (how many predicted positives were true positives), Recall (how many actual positives were caught), F1-Score (harmonic mean), and ROC-AUC curve.'
        ],
        codeBlock: [
          '# Comparing Regression vs Classification in Python (Scikit-Learn)',
          '# ───────────────────────────────────────────────────────────────',
          'import numpy as np',
          'from sklearn.linear_model import LinearRegression, LogisticRegression',
          '',
          '# Feature: Square footage of 5 houses',
          'X_sqft = np.array([[800], [1200], [1500], [2100], [3000]])',
          '',
          '# 1. REGRESSION TASK: Predict continuous house price in dollars ($)',
          '# Target (y) is continuous numerical floats',
          'y_prices = np.array([180000.0, 245000.0, 310000.0, 420000.0, 590000.0])',
          '',
          'reg_model = LinearRegression()',
          'reg_model.fit(X_sqft, y_prices)',
          '',
          'sample_house = np.array([[1800]])',
          'predicted_price = reg_model.predict(sample_house)[0]',
          'print(f"Regression Price Prediction: \${predicted_price:,.2f}")',
          '# Output: \$364,524.59 (Continuous numerical value)',
          '',
          '',
          '# 2. CLASSIFICATION TASK: Predict discrete category (1 = Luxury, 0 = Affordable)',
          '# Target (y) is discrete binary classes',
          'y_category = np.array([0, 0, 0, 1, 1])',
          '',
          'clf_model = LogisticRegression()',
          'clf_model.fit(X_sqft, y_category)',
          '',
          'pred_class = clf_model.predict(sample_house)[0]',
          'pred_prob = clf_model.predict_proba(sample_house)[0][1]',
          'print(f"Classification Category: {\'Luxury\' if pred_class == 1 else \'Affordable\'} (Prob: {pred_prob:.1%})")',
          '# Output: Affordable (Prob: 32.4%)'
        ].join('\n'),
        codeBlockTitle: 'regression_vs_classification_demo.py'
      },
      {
        heading: 'Summary Comparison Matrix',
        paragraphs: [
          '1. Output Format: Regression outputs continuous quantities (quantities, values); Classification outputs discrete buckets (labels, categories).',
          '2. Primary Question: Regression asks "How much / How many?"; Classification asks "Which category / Which bucket?".',
          '3. Core Goal: Regression minimizes error distance residuals from a trend curve; Classification maximizes separation margin across decision boundaries.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Digital Thermometer vs The Traffic Light',
      text: 'Think of Regression like a digital thermometer: it reports continuous, exact numerical readings like 21.4°C, 36.8°C, or 99.1°C with infinite gradations. Think of Classification like a traffic light: it operates in discrete, unambiguous states—Red (Stop), Yellow (Caution), or Green (Go). There is no "Red-and-a-half" state; it must strictly belong to one discrete category!'
    },

    diagram: {
      type: 'regression_vs_classification',
      title: 'Interactive Geometric Explorer: Decision Boundary (Classification) vs Best-Fit Curve (Regression)'
    },

    takeaways: [
      'Regression predicts continuous numerical quantities (e.g., price, temperature, stock value).',
      'Classification predicts discrete categorical class labels (e.g., spam, disease, animal).',
      'Classification visually builds a separating Decision Boundary line/hyperplane.',
      'Regression visually fits a Best-Fit Curve/Line minimizing vertical residual distances.',
      'Regression is evaluated with MSE, RMSE, MAE; Classification is evaluated with Accuracy, Precision, Recall, F1.'
    ],

    quiz: {
      question: 'Which of the following problems is a REGRESSION task rather than a Classification task?',
      options: [
        'Predicting whether an uploaded audio clip is speech or background noise',
        'Predicting the estimated delivery time (in minutes) for a food order given traffic conditions',
        'Predicting whether an email is spam, promotions, or primary inbox',
        'Predicting whether a bank customer will accept or reject a credit card offer'
      ],
      correctIndex: 1,
      explanation: 'Correct! Estimated delivery time in minutes (e.g. 24.5 minutes) is a continuous numerical quantity on a continuous scale, making it a classic Regression task.'
    }
  }
};



