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
    estimatedTime: '6 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/types-of-artificial-intelligence/',
    videoUrl: 'https://www.youtube.com/embed/XFZ-rQ8eeR8',

    badgeText: 'CONCEPT LESSON',
    badgeColor: '#059669',

    sections: [
      {
        heading: 'Artificial Narrow Intelligence (ANI) — The AI of Today',
        paragraphs: [
          'Artificial Narrow Intelligence (ANI), often referred to as "Weak AI", is designed to master one single specific task or a narrow domain of expertise.',
          'Every AI tool operating in the world today—including Siri, Google Search, Tesla Autopilot, Midjourney, and Large Language Models like ChatGPT—is Narrow AI!',
          'Key Characteristics of Narrow AI:',
          '• Hyper-Specialized: It performs its single designated task (like playing chess or predicting the next word) faster and more accurately than any human.',
          '• Domain-Bound: If you ask AlphaGo (an AI that defeated world champions at the game of Go) to write a essay on history or diagnose a medical scan, it will completely fail because it lacks general reasoning outside its narrow code.'
        ]
      },
      {
        heading: 'Artificial General Intelligence (AGI) — The Future Milestone',
        paragraphs: [
          'Artificial General Intelligence (AGI), also called "Strong AI", refers to a hypothetical machine that possesses human-level cognitive intelligence across every intellectual domain.',
          'Unlike Narrow AI, an AGI would not need to be retrained for new tasks. It would demonstrate human flexibility:',
          '• Cross-Domain Reasoning: It could learn physics, compose music, negotiate business contracts, write software, and understand human emotion seamlessly.',
          '• Autonomous Problem-Solving: It can confront completely unseen problems, formulate novel scientific hypotheses, and adapt to changing environments without human intervention.',
          'Status: AGI remains a theoretical scientific milestone currently being actively researched by leading AI labs worldwide.'
        ]
      },
      {
        heading: 'Artificial Superintelligence (ASI) — Beyond Human Capabilities',
        paragraphs: [
          'Artificial Superintelligence (ASI) represents a theoretical future stage where AI surpasses human intelligence across all fields—including scientific creativity, general wisdom, and social skills.',
          'An ASI would possess processing speeds, memory capacity, and analytical capabilities millions of times greater than the combined cognitive power of all human brains.'
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
      'All current AI systems operating today (including Large Language Models like ChatGPT) are Artificial Narrow Intelligence (ANI).',
      'Narrow AI excels at specific tasks but cannot operate outside its trained domain.',
      'Artificial General Intelligence (AGI) is future theoretical AI capable of human-level adaptability across any domain.',
      'Artificial Superintelligence (ASI) represents a hypothetical stage surpassing human intelligence in every field.'
    ],

    quiz: {
      question: 'Why is ChatGPT classified as Narrow AI (ANI) rather than Artificial General Intelligence (AGI)?',
      options: [
        'Because ChatGPT is bad at spelling',
        'Because it is trained specifically on language processing and lacks true general human reasoning across arbitrary tasks',
        'Because it cannot connect to the internet',
        'Because it was built by a small team'
      ],
      correctIndex: 1,
      explanation: 'Correct! Even though ChatGPT is remarkably capable, it is still a specialized probabilistic language model (Narrow AI), not a general-reasoning entity (AGI).'
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
    videoUrl: 'https://www.youtube.com/embed/LPZh9BOjkQs',

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
  },

  'ai-2-2': {
    id: 'ai-2-2',
    title: 'Training vs. Inference: Teaching AI vs. Putting It to Work',
    subtitle: 'Understanding the Two Core Phases of the Machine Learning Lifecycle',
    section: 'Module 2 · Chapter 2',
    estimatedTime: '8 min read',
    gfgUrl: 'https://www.cloudflare.com/learning/ai/inference-vs-training/',
    videoUrl: 'https://www.youtube.com/embed/XtT5i0ZeHHE',

    badgeText: 'MODULE 2 • LLM LIFECYCLE',
    badgeColor: '#3b82f6',

    sections: [
      {
        heading: 'The Two Fundamental Phases of AI Development',
        paragraphs: [
          'Every artificial intelligence model operates in two completely distinct lifecycle phases: Training and Inference.',
          'To understand modern AI infrastructure, Cloudflare breaks this down simply: Training is "creating the capability" (learning from past data), while Inference is "delivering the capability" (applying learned knowledge to new, unseen user requests in real time).',
          'A model cannot answer a user query during inference until it has first completed thousands of hours of compute-heavy training!'
        ]
      },
      {
        heading: 'Phase 1: AI Training (Creating Capability)',
        paragraphs: [
          'Training is the initial development phase where a blank neural network is fed massive amounts of labeled data (such as millions of images of bicycles, people, and strawberries).',
          '1. Forward Pass: The model receives an image (e.g., a bicycle) and makes an initial random guess (e.g., "Strawberry").',
          '2. Error Evaluation (Loss Calculation): The system compares its guess against the ground truth label ("Bicycle") and calculates the mathematical error.',
          '3. Backward Pass (Backpropagation): The error signal is sent backwards through all layers of the neural network, adjusting billions of internal parameters (weights and biases) to reduce future mistakes.',
          'Characteristics: Training is extremely compute-intensive, requiring thousands of GPUs running continuously for weeks or months. However, it is an offline process that is latency-tolerant.'
        ]
      },
      {
        heading: 'Phase 2: AI Inference (Delivering Capability)',
        paragraphs: [
          'Inference occurs when the trained model is deployed to production for end users. The model weights are frozen—meaning the network no longer updates its parameters during this phase.',
          '1. Unseen Input: A user uploads a new, unseen image of a bicycle or types a ChatGPT prompt.',
          '2. Single Forward Pass: The neural network processes the input through its frozen weights in a single forward direction.',
          '3. Instant Prediction: The model outputs its prediction ("Bicycle") immediately without any backpropagation or weight modification.',
          'Characteristics: Inference is continuous, user-facing, and latency-critical. Users expect responses in under 100 milliseconds, requiring global edge networks (like Cloudflare Workers AI) to run models close to users.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: Medical School vs. An ER Doctor on Shift',
      text: 'AI Training is like attending 8 years of Medical School: you study thousands of medical textbooks (data), take practice exams, get graded on your mistakes (backpropagation), and adjust your knowledge. AI Inference is like being an ER Doctor on shift: a patient enters with symptoms (new input), and using your fixed, frozen medical knowledge, you immediately diagnose them (output) in seconds!'
    },

    diagram: {
      type: 'training_vs_inference',
      title: 'Interactive Pipeline: Training (Forward/Backward Loss Update) vs. Inference (Frozen Weight Forward Pass)'
    },

    takeaways: [
      'Training is the offline development phase that teaches a model using labeled data, forward passes, loss calculation, and backpropagation.',
      'Backpropagation updates internal model weights and biases during training to minimize prediction error.',
      'Inference is the real-time production phase where a model with frozen weights processes unseen user inputs in a single forward pass.',
      'Training prioritizes massive GPU compute throughput over weeks, while Inference prioritizes ultra-low latency (<100ms) for real-time applications.',
      'Over a model\'s lifecycle, 65% to 80% of total compute costs are spent on Inference because it runs continuously 24/7 for millions of end users.'
    ],

    quiz: {
      question: 'What happens to a Neural Network\'s weights during the AI Inference phase?',
      options: [
        'They are continuously recalculated using backpropagation after every user prompt',
        'They are completely deleted to save server memory',
        'They are frozen and remain fixed while processing new inputs in a single forward pass',
        'They double in size every time a user asks a question'
      ],
      correctIndex: 2,
      explanation: 'Correct! During inference, model weights are locked/frozen. The network evaluates new user inputs in a single fast forward pass without making parameter updates.'
    }
  }
};
