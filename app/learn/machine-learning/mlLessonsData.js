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
    badgeColor: '#475569',
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
  }
};
