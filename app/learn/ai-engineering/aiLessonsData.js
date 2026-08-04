// Central Database for Applied AI Engineering Lessons (Modules 1 to 9)

export const aiLessonsData = {
  'ai-1-1': {
    id: 'ai-1-1',
    title: 'What is Artificial Intelligence?',
    subtitle: 'Demystifying AI for Beginners',
    section: 'Module 1 · Chapter 1',
    estimatedTime: '5 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/artificial-intelligence-an-introduction/',
    
    // Header Banner Concept
    badgeText: 'CONCEPT LESSON',
    badgeColor: '#7c3aed',

    // Main Article Content Sections
    sections: [
      {
        heading: 'What Actually is Artificial Intelligence?',
        paragraphs: [
          'Artificial Intelligence (AI) is the science of building smart machines capable of performing tasks that typically require human intelligence. This includes reasoning, learning from past experiences, recognizing patterns, solving complex problems, and understanding natural language.',
          'When most people hear "AI", they imagine sci-fi robots from movies. But in reality, AI is already inside your smartphone, your email inbox, your navigation app, and your favorite streaming services! It is simply software that can adapt and make decisions based on data.'
        ]
      },
      {
        heading: 'The Great Shift: Traditional Code vs. AI',
        paragraphs: [
          'To understand AI, we must look at how software used to be written. For decades, software development followed a rigid formula: human programmers wrote explicit step-by-step instructions (rules).',
          'If a situation happened that wasn\'t written in the code, the program broke! Artificial Intelligence completely flips this model upside down. Instead of feeding the computer fixed rules, we feed it massive amounts of data and examples, and the AI discovers the rules on its own.'
        ]
      }
    ],

    // ELI5 Real-World Analogy Card
    analogy: {
      title: 'Real-World Analogy: The Printed Recipe vs. The Expert Chef',
      text: 'Think of traditional software like a printed cookbook recipe: it follows exact steps line-by-line. If you are missing an ingredient, the recipe fails. AI is like a master chef: you show them whatever random ingredients are inside your fridge, and using their past experience, they adapt and invent a delicious new meal on the spot!'
    },

    // Interactive Animated Diagram Config
    diagram: {
      type: 'traditional_vs_ai',
      title: 'Visual Comparison: Traditional Code vs Artificial Intelligence',
      traditional: {
        label: 'TRADITIONAL SOFTWARE',
        input: 'Input Data + Hand-coded Rules',
        process: 'Fixed Conveyor Belt',
        output: 'Fixed Static Output'
      },
      ai: {
        label: 'ARTIFICIAL INTELLIGENCE',
        input: 'Input Data + Example Outcomes',
        process: 'Neural Network / ML Model',
        output: 'Learned Patterns & Smart Decisions'
      }
    },

    // Key Takeaways Checklist
    takeaways: [
      'Artificial Intelligence means enabling machines to simulate human reasoning and learning.',
      'Traditional software relies on hardcoded rules; AI learns patterns directly from data.',
      'AI isn\'t sci-fi magic—it\'s advanced mathematical pattern recognition operating on data.'
    ],

    // Interactive Knowledge Check Quiz
    quiz: {
      question: 'What is the primary difference between traditional software and AI software?',
      options: [
        'Traditional software runs faster than AI software',
        'Traditional software uses hardcoded rules, while AI learns patterns from data',
        'AI software can only run on quantum computers',
        'Traditional software requires an internet connection, AI does not'
      ],
      correctIndex: 1,
      explanation: 'Spot on! Traditional software relies on human programmers writing fixed step-by-step rules, whereas AI analyzes data to discover patterns and rules automatically.'
    }
  },

  'ai-1-2': {
    id: 'ai-1-2',
    title: 'AI vs Machine Learning vs Deep Learning',
    subtitle: 'Understanding the Russian Nesting Dolls of AI',
    section: 'Module 1 · Chapter 2',
    estimatedTime: '6 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/difference-between-artificial-intelligence-vs-machine-learning-vs-deep-learning/',

    badgeText: 'CORE FOUNDATION',
    badgeColor: '#2563eb',

    sections: [
      {
        heading: 'Why People Get Confused',
        paragraphs: [
          'Terms like "AI", "Machine Learning", and "Deep Learning" are often thrown around interchangeably in tech news. However, they are not the same thing!',
          'The easiest way to visualize their relationship is like Russian Matryoshka Nesting Dolls: Deep Learning sits inside Machine Learning, which sits inside the broader umbrella of Artificial Intelligence.'
        ]
      },
      {
        heading: 'Breaking Down the 3 Layers',
        paragraphs: [
          '1. Artificial Intelligence (Outer Doll): The overarching vision of creating machines that act intelligently. This includes everything from simple chess-playing algorithms to voice assistants.',
          '2. Machine Learning (Middle Doll): A specific method to achieve AI. Instead of writing code manually, we train an algorithm on data (e.g., thousands of spam vs. normal emails) so it learns how to make predictions on new emails automatically.',
          '3. Deep Learning (Inner Doll): A specialized, highly powerful technique within Machine Learning inspired by the human brain. It uses Artificial Neural Networks with many layers to process complex data like images, speech, and natural language (like ChatGPT or DALL-E).'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Vehicle Hierarchy',
      text: 'Think of AI as "Vehicles" (anything that moves people). Machine Learning is like "Motorized Vehicles" (cars, trucks, motorcycles). Deep Learning is like "High-Speed Electric Supercars" (Tesla Model S)—a specialized, high-tech sub-category of motorized vehicles designed for maximum speed and intelligence!'
    },

    diagram: {
      type: 'nesting_dolls',
      title: 'The AI Spectrum: Outer to Inner Layer',
      layers: [
        { name: 'Artificial Intelligence (AI)', desc: 'The broad concept of smart machines', color: '#7c3aed' },
        { name: 'Machine Learning (ML)', desc: 'Algorithms that learn from data without explicit coding', color: '#2563eb' },
        { name: 'Deep Learning (DL)', desc: 'Multi-layer neural networks (ChatGPT, Computer Vision)', color: '#059669' }
      ]
    },

    takeaways: [
      'Artificial Intelligence is the broad umbrella concept of intelligent machines.',
      'Machine Learning is a subset of AI that focuses on learning from data.',
      'Deep Learning is a specialized subset of ML using deep neural networks to process unstructured data.'
    ],

    quiz: {
      question: 'Which statement correctly describes the relationship between AI, Machine Learning (ML), and Deep Learning (DL)?',
      options: [
        'AI, ML, and DL are completely unrelated fields of technology',
        'DL is the largest category, containing ML and AI',
        'DL is a subset of ML, which is a subset of AI',
        'ML is an outdated version of Deep Learning'
      ],
      correctIndex: 2,
      explanation: 'Excellent! Deep Learning is a specialized branch inside Machine Learning, and Machine Learning is one approach inside the broader field of Artificial Intelligence.'
    }
  },

  'ai-1-3': {
    id: 'ai-1-3',
    title: 'Types of AI: Narrow AI vs AGI',
    subtitle: 'Where We Are Today vs Where Science is Heading',
    section: 'Module 1 · Chapter 3',
    estimatedTime: '5 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/types-of-artificial-intelligence/',

    badgeText: 'CONCEPT LESSON',
    badgeColor: '#059669',

    sections: [
      {
        heading: 'Narrow AI (ANI) — The AI of Today',
        paragraphs: [
          'Artificial Narrow Intelligence (ANI), also known as "Weak AI", refers to AI systems designed to perform one specific task with high proficiency.',
          'Every AI system in existence today—from Apple\'s Siri, Google Translate, and Tesla Autopilot to ChatGPT—is Narrow AI! While ChatGPT feels amazingly versatile, it is still a narrow language model designed specifically to predict text tokens.'
        ]
      },
      {
        heading: 'Artificial General Intelligence (AGI) — The Future Goal',
        paragraphs: [
          'Artificial General Intelligence (AGI), often called "Strong AI", refers to a hypothetical AI system that possesses human-level intellect across all domains.',
          'An AGI could learn physics, compose music, diagnose medical conditions, build software, and understand human emotion seamlessly, adapting to completely new tasks without needing to be retrained from scratch. AGI does not exist yet!'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Olympic Specialist vs. The Renaissance Polymath',
      text: 'Narrow AI is like an Olympic Gold Medalist in Archery: they are unmatched at hitting a target 70 meters away, but if you ask them to play grandmaster chess or perform heart surgery, they can\'t do it. AGI is like Leonardo da Vinci: someone who excels at art, engineering, science, anatomy, and philosophy all at once!'
    },

    diagram: {
      type: 'narrow_vs_agi',
      title: 'Narrow AI (Today) vs Artificial General Intelligence (Future)',
      narrow: {
        title: 'Narrow AI (ANI - Today)',
        items: ['Specialized in 1 Domain', 'AlphaGo (Plays Chess/Go)', 'Siri (Voice Commands)', 'ChatGPT (Text Generation)']
      },
      agi: {
        title: 'General AI (AGI - Future)',
        items: ['Human-Level Adaptability', 'Cross-Domain Reasoning', 'Self-Aware Learning', 'Solves Unseen Problems']
      }
    },

    takeaways: [
      'All current AI tools in existence (including ChatGPT, Gemini, and Midjourney) are Narrow AI (ANI).',
      'Narrow AI excels at specific tasks but cannot operate outside its trained domain.',
      'AGI (Artificial General Intelligence) represents future AI capable of human-level reasoning across all fields.'
    ],

    quiz: {
      question: 'Why is ChatGPT classified as Narrow AI (ANI) rather than Artificial General Intelligence (AGI)?',
      options: [
        'Because ChatGPT is bad at spelling',
        'Because it is trained specifically on language processing and lacks true general human reasoning',
        'Because it cannot connect to the internet',
        'Because it was built by a small team'
      ],
      correctIndex: 1,
      explanation: 'Correct! Even though ChatGPT is remarkably capable, it is still a specialized probabilistic language model (Narrow AI), not a conscious, general-reasoning entity (AGI).'
    }
  },

  'ai-1-4': {
    id: 'ai-1-4',
    title: 'Real-World AI Applications',
    subtitle: 'How AI Powers Healthcare, Finance, Media, and Logistics',
    section: 'Module 1 · Chapter 4',
    estimatedTime: '6 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/applications-of-artificial-intelligence/',

    badgeText: 'APPLICATIONS',
    badgeColor: '#d97706',

    sections: [
      {
        heading: 'AI in Action Across Industries',
        paragraphs: [
          'Artificial Intelligence is no longer confined to research labs. It has silently become the engine driving the modern global economy across virtually every sector.',
          'Understanding how AI is applied in the real world gives you the blueprint for building your own AI applications!'
        ]
      },
      {
        heading: '4 Key Industries Transformed by AI',
        paragraphs: [
          '1. Healthcare & Medicine: AI algorithms analyze X-rays and MRI scans to detect early cancer tumors faster than human eyes. AlphaFold by DeepMind solved a 50-year biological challenge by predicting 200 million protein structures!',
          '2. Finance & Banking: Credit card companies use AI models to evaluate millions of transactions every second, instantly flagging fraudulent charges before money is lost.',
          '3. Transportation & Autonomous Tech: Self-driving vehicles by Tesla and Waymo use computer vision neural networks to navigate city streets, detect pedestrians, and parse traffic lights in real time.',
          '4. Creative & Communication: Large Language Models (LLMs) draft emails, write code, translate languages, and generate photorealistic artwork from simple text prompts.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: Electricity in the 20th Century',
      text: 'Just like electricity transformed manufacturing, lighting, agriculture, and transportation in the early 1900s, Artificial Intelligence is acting as the new "digital electricity"—plugging into every modern tool to make it smarter and faster!'
    },

    diagram: {
      type: 'industry_grid',
      title: 'Real-World Impact of Artificial Intelligence',
      sectors: [
        { name: 'Healthcare', icon: 'stethoscope', desc: 'Early tumor detection & protein structure folding' },
        { name: 'Finance', icon: 'shield-check', desc: 'Real-time fraud prevention & algorithmic trading' },
        { name: 'Transportation', icon: 'car', desc: 'Autonomous driving & smart route navigation' },
        { name: 'Creative Tech', icon: 'sparkles', desc: 'LLM text generation & AI image synthesis' }
      ]
    },

    takeaways: [
      'AI is used in healthcare to analyze medical imaging and accelerate drug discovery.',
      'Financial institutions rely on AI for instant fraud detection and risk management.',
      'Generative AI models are revolutionizing software development and creative content creation.'
    ],

    quiz: {
      question: 'When a bank instantly blocks a suspicious credit card charge made in another country, what AI application is at work?',
      options: [
        'Autonomous Driving',
        'Real-Time Anomaly & Fraud Detection',
        'Generative Image Synthesis',
        'Protein Structure Folding'
      ],
      correctIndex: 1,
      explanation: 'Spot on! Financial institutions use machine learning anomaly detection models to compare purchase patterns against millions of normal vs fraudulent historical transactions.'
    }
  },

  'ai-1-5': {
    id: 'ai-1-5',
    title: 'Module 1 Knowledge Check & Classifier Quiz',
    subtitle: 'Test Your Knowledge & Earn Module 1 Mastery Badge',
    section: 'Module 1 · Chapter 5',
    estimatedTime: '4 min interactive',
    gfgUrl: 'https://www.geeksforgeeks.org/artificial-intelligence-an-introduction/',

    badgeText: 'KNOWLEDGE CHECK',
    badgeColor: '#f59e0b',
    isProject: true,

    sections: [
      {
        heading: 'Congratulations on Completing Module 1!',
        paragraphs: [
          'You have covered the core foundations of Artificial Intelligence, the relationship between AI, ML, and DL, the distinction between Narrow AI and AGI, and real-world industrial applications.',
          'Before moving on to Module 2: How Large Language Models Work, test your understanding with this interactive 4-question knowledge check!'
        ]
      }
    ],

    // Multi-question quiz challenge
    multiQuiz: [
      {
        id: 1,
        question: 'Q1: A weather app uses past satellite imagery and temperature data to predict if it will rain tomorrow. Which AI category best fits this system?',
        options: ['Traditional Hardcoded Code', 'Machine Learning (ML)', 'Artificial General Intelligence (AGI)', 'Robotics Hardware'],
        correctIndex: 1,
        explanation: 'Correct! Predicting rain based on historical weather patterns is a classic Machine Learning classification & regression problem.'
      },
      {
        id: 2,
        question: 'Q2: A multi-layered artificial neural network trained on millions of images to identify cat breeds is an example of what?',
        options: ['Deep Learning (DL)', 'AGI', 'Rule-based Expert System', 'Quantum Computing'],
        correctIndex: 0,
        explanation: 'Great job! Deep Learning uses multi-layer neural networks specifically suited for processing complex unstructured data like images.'
      },
      {
        id: 3,
        question: 'Q3: True or False: ChatGPT possesses self-aware human consciousness and is classified as AGI.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'Correct! False. ChatGPT is a sophisticated Large Language Model (Narrow AI / ANI) trained to predict text tokens, not a conscious AGI.'
      },
      {
        id: 4,
        question: 'Q4: How does AI software differ from traditional software?',
        options: [
          'AI uses hardcoded if/else rules written by hand',
          'AI discovers patterns automatically from input data and examples',
          'AI can only run inside microchips in smartphones',
          'Traditional software learns automatically from data'
        ],
        correctIndex: 1,
        explanation: 'Awesome! AI flips traditional software on its head by allowing algorithms to learn rules and patterns directly from data.'
      }
    ],

    takeaways: [
      'Module 1 Completed! You understand the foundations of AI, ML, and DL.',
      'Next Up: Module 2 — How Large Language Models (LLMs) Work (Tokens, Embeddings, Context Windows, and Temperature)!'
    ]
  },

  'ai-2-1': {
    id: 'ai-2-1',
    title: 'What is a Large Language Model (LLM)?',
    subtitle: 'Deconstructing the Architecture Behind ChatGPT & Generative AI',
    section: 'Module 2 · Chapter 1',
    estimatedTime: '7 min read',
    gfgUrl: 'https://www.ibm.com/think/topics/large-language-models',

    badgeText: 'MODULE 2 • LLM ARCHITECTURE',
    badgeColor: '#7c3aed',

    sections: [
      {
        heading: 'Deconstructing the Term: Large Language Model',
        paragraphs: [
          'A Large Language Model (LLM) is a specialized category of Deep Learning Artificial Intelligence foundation models trained on massive, internet-scale textual datasets.',
          'To understand how an LLM functions, we can break its technical name down into 3 core pillars:',
          '• Large: Refers to both the colossal training dataset size (trillions of words/tokens) and the neural network capacity, containing tens or hundreds of billions of adjustable parameters (weights).',
          '• Language: Unlike classical Machine Learning models that process tabular numbers in spreadsheets, LLMs process, understand, and generate natural human language—including English, Spanish, Python code, and mathematical proofs.',
          '• Model: Refers to the underlying Transformer Neural Network architecture designed to compute probabilistic relationships between words.'
        ]
      },
      {
        heading: 'How LLMs Process Text: From Words to Vectors',
        paragraphs: [
          'Computers do not natively understand English letters—they only compute numbers. When you feed a prompt into an LLM, your text undergoes a sophisticated multi-stage processing pipeline:',
          '1. Tokenization: Raw text is split into small numerical sub-word chunks called Tokens.',
          '2. Embedding Layer: Converts token numbers into dense, high-dimensional vector coordinates capturing semantic meaning.',
          '3. Transformer Blocks: The core computational engine. It routes vectors through Self-Attention Mechanisms (calculating contextual relationships between words) and Feed-Forward Networks.',
          '4. Output & Training Optimization: Converts hidden vectors back into probability distributions over next-word candidates, continuously adjusting weights via Loss Optimization during training.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The World\'s Most Experienced Autocomplete Engine',
      text: 'Think of an LLM like the autocomplete feature on your smartphone keyboard, but scaled up by a factor of 100 Billion! Your phone guesses the next word based on simple 2-word memory. An LLM has read nearly the entire public internet, allowing it to autocomplete complex essays, Python scripts, legal contracts, or poems—predicting one token at a time with uncanny accuracy!'
    },

    diagram: {
      type: 'llm_flowchart',
      title: 'LLM Technical Architecture Pipeline (Tokenization → Transformer → Optimization)'
    },

    takeaways: [
      'Large Language Models (LLMs) are deep neural networks trained on vast datasets to understand and generate human text.',
      'Tokenization converts raw text strings into numerical sub-word tokens.',
      'The Embedding Layer maps token numbers to high-dimensional semantic vector space coordinates.',
      'Transformer Blocks combine Self-Attention (word context weights) and Feed-Forward Networks (feature processing).',
      'Training uses Loss Optimization (Backpropagation) to continuously minimize next-token prediction errors.'
    ],

    quiz: {
      question: 'In an LLM architecture pipeline, what is the primary role of the Self-Attention Mechanism inside Transformer Blocks?',
      options: [
        'To erase past conversation history',
        'To calculate contextual relationships and relevance between words in a sequence',
        'To print the final text on the screen',
        'To convert text into audio'
      ],
      correctIndex: 1,
      explanation: 'Spot on! Self-attention allows the model to analyze every word in a sentence and calculate how strongly each word relates to other words in context (e.g. knowing "bank" refers to a river vs money).'
    }
  }
};
