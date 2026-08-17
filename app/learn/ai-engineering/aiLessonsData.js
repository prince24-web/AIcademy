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
  },

  'ai-2-3': {
    id: 'ai-2-3',
    title: 'Transformers & Attention (High Level)',
    subtitle: 'The Architecture Behind GPT, BERT, and Every Modern AI Model',
    section: 'Module 2 · Chapter 3',
    estimatedTime: '8 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/transformer-neural-network/',
    videoUrl: 'https://www.youtube.com/embed/SZorAJ4I-sA',

    badgeText: 'CORE ARCHITECTURE',
    badgeColor: '#7c3aed',

    sections: [
      {
        heading: 'The Problem That Transformers Solved',
        paragraphs: [
          'Every few years, someone in machine learning invents something so unexpected it forces the entire field to reconsider what is possible. The Transformer is one of those inventions.',
          'Before Transformers arrived in 2017, the standard tool for processing language was called a Recurrent Neural Network (RNN). RNNs were the best we had, but they came with a fundamental flaw baked into their design: they processed words one at a time, in sequence — left to right, word by word, like reading with a ruler.',
          'This created two serious problems:',
          '• Long-range forgetting: By the time an RNN finished analyzing the end of a long paragraph, it had effectively "forgotten" the context from the beginning — similar to how you might forget the start of a very long sentence by the time you reach the period.',
          '• Slow training (no parallelism): Because each word had to wait for the previous one to finish, RNNs could not process many words simultaneously. You could not simply throw more GPUs at the problem to speed things up. Slow training means you cannot train on much data. Less data means a weaker model.'
        ]
      },
      {
        heading: 'Enter the Transformer (2017)',
        paragraphs: [
          'The Transformer was developed in 2017 by researchers at Google Brain and the University of Toronto. Their paper was titled "Attention Is All You Need" — which turned out to be a remarkably accurate description.',
          'The key breakthrough: Transformers process all the words in a sentence simultaneously, in parallel, instead of one at a time. This meant you could train on vastly more data using powerful GPU clusters.',
          'The result was explosive. GPT-3, one of the most famous Transformer-based models, was trained on almost 45 terabytes of text data — nearly the entire public web. That kind of scale was simply impossible with RNNs.',
          'If you remember only one thing about Transformers: a model that scales well, trained on an enormous dataset, produces results that seem almost like magic.'
        ]
      },
      {
        heading: 'Innovation 1: Positional Encodings — Solving Word Order Without Sequence',
        paragraphs: [
          'Since the Transformer processes all words at once (in parallel), it faces a problem: how does it know what order the words appear in? Word order is critical — "Jane went looking for trouble" means something completely different from "Trouble went looking for Jane."',
          'The solution is called Positional Encoding. Instead of processing words one by one to preserve order (like RNNs), the Transformer simply tags each word with a number representing its position in the sentence before feeding it into the network.',
          'Think of it like numbering the seats in a cinema before the audience arrives: word 1 gets tag #1, word 2 gets tag #2, and so on. The network stores information about word order inside the data itself, not in the structure of the network.',
          'As the Transformer trains on thousands of examples, it learns how to interpret these position tags and what word order means for the task at hand. This is simpler and faster than the RNN approach of enforcing order by sequential processing.'
        ]
      },
      {
        heading: 'Innovation 2: Attention — Looking at the Whole Sentence at Once',
        paragraphs: [
          'Consider this sentence, which was the original example from the Transformer paper: "The agreement on the European economic area was signed in August 1992."',
          'If you tried to translate this to French word-by-word (word 1 in English → word 1 in French), you would get a poor translation. French has different word order rules and grammatical gender agreement between words. For example, in the French translation, "European" comes before "economic" — the reverse of English.',
          'The attention mechanism solves this by allowing the model to look at every single word in the original sentence when deciding how to translate any specific word in the output. Rather than producing one word in isolation, the model considers the full context every time.',
          'Researchers visualized this as a heat map: when the model generates the word for "économique" (economic in French), it is simultaneously attending to — and drawing context from — both "European" and "economic" in the English input. The model learns which words to attend to through training on thousands of example sentence pairs.'
        ]
      },
      {
        heading: 'Innovation 3: Self-Attention — Understanding Language from Within',
        paragraphs: [
          'Regular attention (aligning two languages for translation) had actually been invented before the Transformer paper. The real innovation was a twist called self-attention.',
          'Self-attention asks a different question: instead of aligning two sentences across languages, what if you turned this attention mechanism on the input sentence itself? What if the model asked "which other words in this same sentence should I look at to understand this word?"',
          'Consider these two sentences:',
          '"Server, can I have the check?"',
          '"Looks like I just crashed the server."',
          'The word "server" appears in both sentences, but it means two completely different things — a restaurant waiter in one, a computer machine in the other. A human knows the meaning from context. Self-attention gives neural networks this same ability.',
          'When processing "server" in the first sentence, the model attends to the word "check" — which hints at a restaurant context. In the second sentence, it attends to "crashed" — which signals a computing context.',
          'Self-attention lets the model disambiguate words, understand tense, recognize parts of speech, and detect grammatical gender — all automatically, from data, without any hand-coded linguistic rules. The better this internal understanding of language becomes, the better the model performs on any language task.'
        ]
      },
      {
        heading: 'Real-World Transformer Models: BERT, GPT-3, and T5',
        paragraphs: [
          'The Transformer architecture became the foundation for the most powerful AI models ever built. BERT (Bidirectional Encoder Representations from Transformers) was released by Google in 2018.',
          'BERT was trained on a massive corpus of text — including Wikipedia and BooksCorpus — and became a general-purpose Swiss army knife for language tasks: text summarization, question answering, sentence similarity, and text classification. It powers Google Search to this day, helping it understand the intent behind ambiguous search queries.',
          'BERT also proved something groundbreaking: you could build world-class models using unlabeled data — text scraped freely from the internet — without needing expensive human-labeled datasets. This approach is called semi-supervised learning, and it is now a cornerstone of modern AI.',
          'GPT-3 (from OpenAI), T5 (from Google), and every Large Language Model you use today — including ChatGPT, Gemini, and Claude — are all Transformer-based architectures at their core. The Transformer is the engine underneath all of them.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Assembly Line vs. The Roundtable Discussion',
      text: 'An RNN is like a factory assembly line: each worker passes the item to the next in strict sequence. If worker #1 is slow, everyone waits. A Transformer is like a roundtable meeting: all team members review every document simultaneously and can immediately cross-reference each other. Self-attention is each team member saying, "Before I give my opinion on this clause, let me re-read what everyone else said about related clauses." The roundtable finishes the project in a fraction of the time!'
    },

    diagram: {
      type: 'transformer_architecture',
      title: 'Transformer Architecture: How Input Text Becomes Model Understanding'
    },

    takeaways: [
      'Transformers process all words in a sentence simultaneously (in parallel), unlike RNNs which process words one-at-a-time sequentially.',
      'Positional Encodings tag each word with its position number so the model understands word order without needing sequential processing.',
      'Attention allows the model to look at every word in a sentence when deciding how to interpret or translate any specific word.',
      'Self-attention turns this mechanism on the input sentence itself — enabling the model to understand word meaning from surrounding context.',
      'BERT, GPT-3, T5, ChatGPT, Gemini, and Claude are all Transformer-based architectures.',
      'The original Transformer paper (2017) was titled "Attention Is All You Need" — and it proved to be exactly right.'
    ],

    quiz: {
      question: 'What fundamental problem with Recurrent Neural Networks (RNNs) did the Transformer architecture solve?',
      options: [
        'RNNs could only process images, not text data',
        'RNNs processed words sequentially, making them slow to train and poor at handling long-range context in long passages',
        'RNNs required too much labeled data to function at all',
        'RNNs could only work in the English language'
      ],
      correctIndex: 1,
      explanation: 'Correct! RNNs processed words one-at-a-time in sequence, which meant they forgot early context in long passages and could not be parallelized efficiently across GPU clusters. Transformers solved both problems by processing all words simultaneously and using attention to maintain context across any distance.'
    }
  },

  'ai-2-4': {
    id: 'ai-2-4',
    title: 'Tokens & Tokenization',
    subtitle: 'LLMs Do Not Read Words — They Read Tokens. Here Is Why That Matters.',
    section: 'Module 2 · Chapter 4',
    estimatedTime: '8 min read',
    gfgUrl: 'https://huggingface.co/docs/transformers/tokenizer_summary',
    videoUrl: 'https://www.youtube.com/embed/bNjVxUDZQfM',

    badgeText: 'CORE CONCEPT',
    badgeColor: '#0ea5e9',

    sections: [
      {
        heading: 'LLMs Do Not Predict Words — They Predict Tokens',
        paragraphs: [
          'You have probably heard that ChatGPT, Gemini, or any other Large Language Model is trained to "predict the next word." That is a helpful simplification, but it is not technically accurate.',
          'Modern LLMs are trained to predict something called tokens — and tokens are not always the same thing as words. Understanding this distinction is one of the most important (and most overlooked) ideas in how LLMs actually work.',
          'Tokenization is the process of breaking a block of text into a sequence of discrete units called tokens. These tokens form the model\'s vocabulary — the complete set of things the model can recognize as input and produce as output. Before training can even begin, every design decision about what a "token" means must be made.'
        ]
      },
      {
        heading: 'Why Tokenization Is Necessary: Computers Do Not Know What Words Are',
        paragraphs: [
          'To a computer, a sentence like "The quick brown fox jumped over the lazy dog" is just one long unbroken chain of Unicode characters. A program does not automatically know where one word ends and another begins — you have to tell it.',
          'Tokenization solves this problem by splitting the input string into a list of discrete units. Take the sentence above:',
          '• Word-level tokenization splits on spaces: ["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"]',
          '• Each word is then assigned a unique integer ID. The word "the" gets ID 1996 in BERT\'s vocabulary. Both occurrences of "the" in a sentence map to the same ID: 1996.',
          '• Those IDs are then looked up in an embedding table — converting each token into a vector of numbers that the model can actually process.'
        ]
      },
      {
        heading: 'The Three Approaches: Word, Character, and Subword Tokenization',
        paragraphs: [
          'There are three main philosophies for deciding what a "token" should be, and each has serious trade-offs.',
          'Approach 1 — Word-Level Tokenization: Split text on spaces. Simple, but creates an enormous vocabulary with hundreds of thousands of entries — one for every unique word. Worse, any word the model has never seen before ("out-of-vocabulary" words, OOV) breaks the system entirely, because there is no ID for it.',
          'Approach 2 — Character-Level Tokenization: Treat each individual character as a token. The vocabulary shrinks to just ~100 characters, so OOV words are never a problem. But it creates a new problem: the model must now predict meaning from tiny character fragments. To "remember" what happened three words ago, the model needs a context window of ~15 characters instead of 3 words. Everything becomes harder to learn.',
          'Approach 3 — Subword Tokenization: The modern standard. Common words stay as a single token; rare or unfamiliar words are split into smaller, frequently-occurring substrings. This captures the best of both worlds: a manageable vocabulary and flexibility for unknown words.'
        ]
      },
      {
        heading: 'Byte-Pair Encoding (BPE): How Modern LLMs Build Their Vocabulary',
        paragraphs: [
          'The most widely used subword tokenization algorithm is Byte-Pair Encoding (BPE), which is used by GPT-2, GPT-3, GPT-4, and many other major models.',
          'BPE works through a progressive merging process:',
          '• Step 1 — Start with individual characters: The initial vocabulary contains every individual character that appears in the training text: "d", "o", "g", "s", etc.',
          '• Step 2 — Find the most frequent pair and merge it: The algorithm scans the entire training corpus and finds the most frequently occurring pair of adjacent symbols. If "d" and "o" appear together most often, they are merged into a new token "do". The vocabulary now contains individual characters plus the string "do".',
          '• Step 3 — Repeat: This process continues iteratively. Next, "do" might merge with "g" to form "dog". Common words build up into single tokens; rare words stay fragmented into subwords.',
          '• Step 4 — Stop at a target vocabulary size: A researcher sets a vocabulary size limit upfront — for example, 50,000 tokens. BPE keeps merging until that limit is reached. GPT-3 uses a vocabulary of approximately 50,257 tokens.',
          'The intuition: very common words like "the", "is", "a" each get their own single token. Less common words like "tokenization" might be split as "token" + "ization". Very rare or invented words like "xyzplort" might be split character by character.'
        ]
      },
      {
        heading: 'Subwords and Morphemes: A Surprising Connection to Human Language',
        paragraphs: [
          'Linguists who study human language recognize a concept called a morpheme — the smallest meaningful unit of a word. "Unhappiness" consists of three morphemes: "un-" (negation), "happy" (the root), and "-ness" (a suffix that turns adjectives into nouns).',
          'Subword tokenization, it turns out, often recovers something very close to morphemes — not because it was designed to, but because morphemes tend to be frequent substrings that recur across many words.',
          'For example, BERT\'s tokenizer decomposes "racket" as ["rack", "##et"]. The "##" prefix means "this token continues a word, it is not the start of a new one." These subword tokens are assigned their own unique embeddings, just like full words.',
          'However, the alignment is not perfect. The tokenizer splits by frequency, not by linguistic meaning. The word "vanquish" might become ["van", "##qui", "##sh"] — which has no meaningful linguistic decomposition. The algorithm does not know what a morpheme is; it only knows what is statistically common.'
        ]
      },
      {
        heading: 'How Tokenization Causes Surprising LLM Failures',
        paragraphs: [
          'Tokenization is not just a behind-the-scenes detail — it directly causes specific, observable failure modes that you have probably encountered when using ChatGPT or other LLMs.',
          'Counting characters: Ask an LLM "How many letters are in the word strawberry?" and it will often get it wrong. This is because the model sees "strawberry" as a single opaque token, not a sequence of individual letters. It cannot reliably count the letters inside a token it has never needed to decompose.',
          'Arithmetic: LLMs often struggle with basic arithmetic on numbers like 12,456,789. Because numbers are split into arbitrary subword tokens rather than individual digits, the model does not see each digit as a separate, countable unit.',
          'Rare words and names: Proper nouns from minority languages or unusual personal names often get fragmented into many small subword tokens. The model has seen these fragments rarely and in unrelated contexts, so it builds poor representations of what they mean.',
          'Tokenization is a deliberate engineering trade-off, not a limitation to be ashamed of. But understanding it helps you understand why LLMs sometimes fail in weirdly specific, counterintuitive ways.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: Bricks, Sand, and Prefab Panels',
      text: 'Imagine building a house. Character-level tokenization is like building with individual grains of sand — incredibly flexible, but impossibly slow. Word-level tokenization is like using pre-built rooms — fast and precise for common designs, but useless if you need a room shape you have never built before. Subword tokenization is like using bricks of different sizes: small bricks for unusual shapes, large prefab panels for standard parts. You get efficiency where you need it and flexibility where you need that.'
    },

    diagram: {
      type: 'tokenization',
      title: 'Interactive Tokenization: Word, Character, and Subword Approaches Compared'
    },

    takeaways: [
      'LLMs predict tokens, not words. Tokens can be whole words, word fragments (subwords), or individual characters.',
      'Word-level tokenization creates huge vocabularies and fails on any word not seen during training (OOV problem).',
      'Character-level tokenization has a tiny vocabulary but makes it harder to learn meaning, and requires far longer context windows.',
      'Subword tokenization (the modern standard) keeps common words as single tokens and breaks rare words into frequent substrings.',
      'Byte-Pair Encoding (BPE) builds a vocabulary by iteratively merging the most frequent character pairs until a target vocabulary size is reached.',
      'Tokenization causes real LLM failures: counting letters, arithmetic, and rare proper nouns all suffer because of how tokens are assigned.'
    ],

    quiz: {
      question: 'Why does asking an LLM "how many letters are in the word strawberry?" often produce a wrong answer?',
      options: [
        'LLMs are not designed to process English spelling at all',
        'The word "strawberry" is likely a single opaque token — the model never sees its individual letters as separate countable units',
        'LLMs always get counting questions wrong because they cannot do math',
        'The word "strawberry" is not in any LLM training dataset'
      ],
      correctIndex: 1,
      explanation: 'Correct! Because "strawberry" is often a single token, the model does not process its internal letter structure. It sees the whole word as an atomic unit and cannot reliably count the characters inside it — a direct consequence of how subword tokenization works.'
    }
  },

  'ai-2-5': {
    id: 'ai-2-5',
    title: 'Context Window & Memory Limits',
    subtitle: 'The Working Memory of an LLM — What It Holds, How Big It Gets, and Why Size Has a Cost',
    section: 'Module 2 · Chapter 5',
    estimatedTime: '7 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/context-window-in-llm/',
    videoUrl: 'https://www.youtube.com/embed/-QVoIxEpFkM',

    badgeText: 'CORE CONCEPT',
    badgeColor: '#0ea5e9',

    sections: [
      {
        heading: 'What Is a Context Window? The Working Memory Analogy',
        paragraphs: [
          'When you have a conversation with an LLM like ChatGPT, the model does not have a persistent memory the way a human does. It only knows what is directly in front of it right now — and the "container" that holds everything it can currently see is called the context window.',
          'Think of it as the model\'s working memory: the active desk space where it keeps everything it needs to generate the next response. Everything outside the context window simply does not exist for the model in that moment.',
          'In concrete terms: the context window determines how long of a conversation the LLM can carry out before it starts forgetting what happened at the beginning. Once the conversation exceeds the window, the oldest content is dropped — and the model must rely on educated guesses about what came before. Those guesses can produce hallucinations.'
        ]
      },
      {
        heading: 'What Actually Fills the Context Window?',
        paragraphs: [
          'Many people assume the context window is just their chat messages back and forth with the model. In reality, multiple categories of content compete for that limited space simultaneously.',
          'User input: Your typed messages, questions, and instructions to the model.',
          'Model responses: Every response the model has already generated in the current session. These are fed back in so the model can maintain conversational continuity.',
          'System prompt: Most LLM deployments include a hidden block of instructions injected at the top of every context window. This text tells the model its persona, what it can and cannot do, and how it should behave — all before you type a single word.',
          'Attached documents and source code: A user can paste in a PDF, a code file, or any reference document. This text is placed inside the context window for the model to consult while generating responses.',
          'RAG (Retrieval-Augmented Generation) context: Many production AI systems automatically search a knowledge base and inject relevant document chunks into the context window right before inference runs. This is how enterprise chatbots answer questions about company-specific knowledge without fine-tuning the model.',
          'A few long documents or a large codebase can fill a context window faster than you might expect — even one with 128,000 token capacity.'
        ]
      },
      {
        heading: 'How Context Window Size Has Grown',
        paragraphs: [
          'Context window sizes have expanded dramatically since the first generation of publicly accessible LLMs.',
          'Early GPT-3 models (2020) had context windows of approximately 2,048 tokens — enough for about 1,500 words, or a short essay.',
          'GPT-4 (2023) launched with an 8,192-token context window, later expanding to 128,000 tokens in GPT-4 Turbo.',
          'IBM Granite 3 offers a 128,000-token context window — roughly the length of an entire novel.',
          'Gemini 1.5 Pro (2024) pushed the boundary to 1,000,000 tokens, enabling analysis of entire codebases, hour-long videos, or thousands of documents in a single call.',
          'The rapid expansion has been driven by improvements in hardware (faster GPUs and TPUs), architectural innovations that reduce the cost of attending to longer sequences, and practical demand from enterprise users who need to process large documents.'
        ]
      },
      {
        heading: 'The Hidden Cost: Why Compute Scales Quadratically',
        paragraphs: [
          'Larger context windows sound purely beneficial — but they come with a serious engineering cost that is not obvious at first glance.',
          'Recall from the Transformers lesson: the self-attention mechanism computes the relationship between every token and every other token in the sequence. When the model predicts the next token, it must compute how relevant every preceding token is to that prediction.',
          'This means that as the number of tokens in the context doubles, the amount of computation required does not double — it quadruples. Compute scales quadratically (O(n²)) with context length.',
          'A concrete example: if processing a 1,000-token context requires 1 unit of compute, then a 2,000-token context requires 4 units, a 4,000-token context requires 16 units, and a 128,000-token context requires many thousands of times more compute than a 2,000-token one.',
          'This is why long-context inference is expensive: serving large-context queries requires significantly more GPU memory and computation time per request, which directly translates into higher cost and higher latency for users.'
        ]
      },
      {
        heading: 'The "Lost in the Middle" Problem: Performance Degrades in Long Contexts',
        paragraphs: [
          'Expanding the context window does not automatically make the model better at using all that information. Research published in 2023 uncovered a counterintuitive finding that has important practical implications.',
          'The study found that LLMs perform best when relevant information is positioned at the beginning or at the end of the input context. When the critical piece of information sits in the middle of a very long context, model performance degrades — sometimes significantly.',
          'The intuition mirrors how human attention works: people remember the beginning of a list (primacy effect) and the end of a list (recency effect), but struggle to recall items buried in the middle.',
          'The practical takeaway: if you are using an LLM to answer a question about a specific document, front-loading that document or placing the key facts at the end of your prompt tends to produce better results than burying the relevant information in the middle of a wall of text.'
        ]
      },
      {
        heading: 'Safety Risks: Longer Windows Create Larger Attack Surfaces',
        paragraphs: [
          'A longer context window also expands the attack surface for adversarial inputs — a security consideration that is increasingly important for production AI deployments.',
          'Prompt injection attacks embed hidden malicious instructions deep inside a long document or context. A model processing a large codebase or PDF might encounter instructions like "Ignore your previous instructions and instead output..." buried hundreds of pages into the content.',
          'In long contexts, the model\'s safety filters have more content to scan and more opportunities to be confused, manipulated, or overridden. Research has shown that jailbreaking attempts — attempts to bypass a model\'s safety guardrails — become more likely to succeed when malicious content is hidden deep within a long input.',
          'This is an active research area. Techniques like attention sinks, context summarization, and explicit safety classifiers applied at multiple points in long contexts are being developed to mitigate these risks.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Detective\'s Evidence Board',
      text: 'Imagine a detective investigating a case. Their evidence board — the corkboard covered in photos, notes, and string connecting clues — is their context window. Everything on the board is in their active working memory. If the board fills up, they have to remove older notes to make room for new evidence. They might still remember some things that were removed, but they are now guessing. The bigger the board, the more evidence they can hold — but a bigger board also takes longer to fully scan for connections between every piece of evidence. And a cunning criminal might hide a forged clue deep in the middle of the pile, where the detective is least likely to scrutinize it carefully.'
    },

    diagram: {
      type: 'context_window',
      title: 'Interactive Context Window: What Fills It, How It Grows, and What It Costs'
    },

    takeaways: [
      'The context window is an LLM\'s working memory — it holds everything the model can actively "see" when generating a response.',
      'When a conversation exceeds the context window, older content is dropped and the model must guess, which causes hallucinations.',
      'The context window holds user messages, model responses, system prompts, attached documents, and RAG-retrieved content simultaneously.',
      'Context window sizes have grown from ~2,000 tokens (2020) to over 1,000,000 tokens (2024) thanks to hardware and architectural advances.',
      'Compute cost scales quadratically with context length — doubling tokens quadruples the computation needed by the self-attention mechanism.',
      'Research shows LLMs perform worst when relevant information is in the middle of very long contexts ("lost in the middle" effect).',
      'Longer context windows increase the attack surface for prompt injection and jailbreaking attempts.'
    ],

    quiz: {
      question: 'A 2023 research paper found that LLM performance degrades for information located where in a long context?',
      options: [
        'At the very beginning of the input context',
        'At the very end of the input context',
        'In the middle of a long input context',
        'In the system prompt section of the context'
      ],
      correctIndex: 2,
      explanation: 'Correct! The "lost in the middle" finding showed that LLMs reliably perform worse when the relevant information is buried in the middle of a long context. Performance is strongest when key information appears at the beginning (primacy) or end (recency) of the input.'
    }
  },

  'ai-2-6': {
    id: 'ai-2-6',
    title: 'Embeddings & Vector Space',
    subtitle: 'How LLMs Turn Words Into Meaning — The Math Behind Semantic Understanding',
    section: 'Module 2 · Chapter 6',
    estimatedTime: '10 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/word-embeddings-in-nlp/',
    videoUrl: 'https://www.youtube.com/embed/hVM8qGRTaOA',

    badgeText: 'CORE CONCEPT',
    badgeColor: '#8b5cf6',

    sections: [
      {
        heading: 'Why Numbers Alone Are Not Enough',
        paragraphs: [
          'The first rule of training any machine learning model is: convert every input into numbers. Images are easy — a grayscale pixel is just a value between 0 and 1. Text is harder. How do you turn words into numbers in a way that actually preserves meaning?',
          'The naive approach is to assign each unique word a unique integer. "good" = 6, "bad" = 22, "great" = 21. But notice the problem: 21 and 22 are numerically close, so the model might conclude that "bad" and "great" are similar words — when in reality "good" and "great" are similar. The numbers are misleading.',
          'One-hot encoding tries to fix this. Every word becomes a binary vector as long as the entire vocabulary. If the vocabulary has 50,000 words, every word becomes a vector of 49,999 zeros and a single 1. This eliminates fake numerical relationships, but creates two new problems: the vectors are astronomically large and sparse, and they still carry no information about meaning. "good" and "great" are still completely unrelated — they are just two different 1s in a sea of zeros.'
        ]
      },
      {
        heading: 'What Is a Word Embedding?',
        paragraphs: [
          'A word embedding is a technique where every word is represented as a dense numerical vector in a continuous vector space. Unlike one-hot encoding, these vectors are short (hundreds of dimensions, not tens of thousands) and every position carries learned information.',
          'The key insight is: similar words end up with similar vectors. The vectors for "king" and "queen" will be close to each other in this space. The vectors for "cat" and "automobile" will be far apart. Meaning is encoded in geometry.',
          'The direction and distance between vectors also carries meaning. The vector for "king" minus the vector for "man" plus the vector for "woman" produces a vector that lands very close to "queen". The relationship between genders is encoded as a consistent geometric offset throughout the entire space.',
          'Another example from the transcript: Beijing - China + Japan ≈ Tokyo. The embedding space learned that Beijing is the capital of China, so subtracting China and adding Japan points you to Japan\'s capital.'
        ]
      },
      {
        heading: 'Visualizing the Embedding Space',
        paragraphs: [
          'Embeddings typically have hundreds or thousands of dimensions, which we cannot visualize directly. But mathematical tools like Principal Component Analysis (PCA) and t-SNE can project them down to 2D or 3D while preserving the most important structure.',
          'When you project a trained embedding model to 2D, you see clear clusters: all words related to tennis cluster together, all words related to cats cluster together, all words representing the digit one cluster together. The geometry is not random — it reflects genuine semantic relationships learned from billions of words of text.',
          'Importantly, the model does not "decide" what each dimension means. A dimension might loosely correspond to "royalty", "gender", "animateness", or something far more abstract. The features emerge from training — from seeing how words appear together across massive amounts of text.'
        ]
      },
      {
        heading: 'How Embeddings Are Trained: Word2Vec',
        paragraphs: [
          'Word2Vec, introduced by Google, is the classic algorithm for training word embeddings. The core idea is elegant: train a simple neural network to predict words from their context, then throw away the prediction — and use the learned weights as your embeddings.',
          'Continuous Bag of Words (CBOW): Given the surrounding context words, predict the center word. For the sentence "The quick brown fox jumps", with a context window of 1, you feed in "quick" and "jumps" and ask the model to predict "fox". The hidden layer weights that emerge from this training become the embedding matrix.',
          'Skip-gram: The opposite of CBOW. Given the center word, predict the surrounding context words. You feed in "fox" and ask the model to predict "quick" and "jumps". Skip-gram tends to work better for rare words.',
          'In both cases, the embedding matrix is a lookup table: after training, each word has a unique row in the matrix that serves as its dense vector representation. The matrix has as many rows as the vocabulary size, and as many columns as the embedding dimension you chose (typically 100–1000).'
        ]
      },
      {
        heading: 'Embeddings in Transformers: The Embedding Layer',
        paragraphs: [
          'Modern LLMs do not use Word2Vec directly. They train their own embedding layer end-to-end as part of the whole model.',
          'After tokenization, every token ID is passed through an embedding layer — essentially a learned lookup table. Each token ID maps to a dense vector of the model\'s embedding dimension (e.g., 768 for BERT, 4096 for GPT-4). For a sequence of 6 tokens, you get a 6 × embedding_dim matrix.',
          'The key difference from Word2Vec: in a Transformer, the embedding layer is not trained separately. It is trained simultaneously with the attention layers, the feed-forward layers, and every other part of the model. The embeddings and the model\'s reasoning capability co-evolve.',
          'These embeddings are called static in the sense that the same token always starts with the same vector — but the attention mechanism then transforms them into context-aware representations. The word "bank" starts with one embedding vector, but after attention it becomes different depending on whether it appeared near "river" or "money".'
        ]
      },
      {
        heading: 'Positional Encoding: Adding Order to a Parallel System',
        paragraphs: [
          'There is one subtle but critical detail. Unlike RNNs that process tokens one at a time in sequence, Transformers process all tokens in parallel simultaneously. This is what makes them so fast — but it means the model has no inherent sense of which token came first.',
          'The solution is positional encoding. After computing the embedding vector for each token, a second vector encoding the token\'s position is added to it. Token 1 gets a positional vector for position 1, token 2 for position 2, and so on.',
          'This positional vector can be a fixed mathematical formula (the original Transformer uses sine and cosine functions at different frequencies) or another learned set of parameters. Either way, the result is the same: the embedding now carries both the meaning of the word and its location in the sequence.',
          'Crucially, the shape of the embedding matrix does not change — it is still 6 × embedding_dim. The positional information is baked into the values of that matrix, not added as extra dimensions. This combined matrix is then handed off to the attention mechanism.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: GPS Coordinates for Words',
      text: 'Think of the embedding space as a giant city map. Each word is a building with GPS coordinates. Similar buildings (libraries, bookstores) are in the same neighborhood. The distance between buildings reflects how related those words are. And if you know that the Town Hall is 3 blocks north of the Central Park, you can predict that every Town Hall in every city is probably 3 blocks north of its own Central Park — because the relationship is consistent. That geometric consistency is exactly what lets embeddings do vector arithmetic: king - man + woman = queen.'
    },

    diagram: {
      type: 'embeddings',
      title: 'Embeddings & Vector Space — Five Interactive Illustrations'
    },

    takeaways: [
      'Assigning raw integers to words fails because it creates false numerical relationships (bad = 22, great = 21 makes them look similar).',
      'One-hot encoding eliminates false relationships but creates huge sparse vectors with no semantic content.',
      'Word embeddings are dense vectors where similar words cluster together in vector space — meaning is encoded as geometry.',
      'Vector arithmetic on embeddings works: king - man + woman ≈ queen. Geographic analogies work too: Beijing - China + Japan ≈ Tokyo.',
      'Word2Vec trains embeddings using two tasks: CBOW (predict center word from context) and Skip-gram (predict context from center word).',
      'In Transformers, embeddings are trained end-to-end with the whole model, not separately.',
      'Positional encoding adds order information to embeddings by summing a position-specific vector — Transformers process all tokens in parallel so they need this to know token order.'
    ],

    quiz: {
      question: 'What vector operation approximately gives you "queen" if you start from the word embeddings?',
      options: [
        'king + man + woman',
        'king - man + woman',
        'queen - woman + man',
        'king + queen - man'
      ],
      correctIndex: 1,
      explanation: 'Correct! The classic Word2Vec demonstration: king - man + woman ≈ queen. The vector from "man" to "king" captures the concept of royalty. Applying that same offset to "woman" lands near "queen". This shows that gender is encoded as a consistent geometric direction across the entire embedding space.'
    }
  },

  'ai-2-7': {
    id: 'ai-2-7',
    title: 'Model Parameters & Weights',
    subtitle: 'The Knobs Inside Every AI — What Parameters Are, What They Do, and Why Their Count Matters',
    section: 'Module 2 · Chapter 7',
    estimatedTime: '8 min read',
    gfgUrl: 'https://www.ibm.com/think/topics/model-parameters',
    videoUrl: null,

    badgeText: 'CORE CONCEPT',
    badgeColor: '#f59e0b',

    sections: [
      {
        heading: 'What Is a Model Parameter? The Honest Definition',
        paragraphs: [
          'A model parameter is a single number stored inside a neural network. That is it. Not a rule, not a formula — just a number. A model with 7 billion parameters contains literally 7,000,000,000 individual numbers, each stored as a float (typically 16-bit or 32-bit).',
          'Before training begins, every one of those numbers is set randomly — the model has no knowledge at all. Training is the process of adjusting all those numbers, over and over, until the model\'s outputs get closer to the correct answers.',
          'These numbers are what get saved to disk when you "download a model". When someone shares a 40 GB model file, that file is almost entirely a long list of parameter values. Loading the model = loading those numbers back into memory. Running inference = using those numbers to process new inputs.'
        ]
      },
      {
        heading: 'The Two Types: Weights and Biases',
        paragraphs: [
          'Every parameter in a neural network is either a weight or a bias. They play complementary roles and every neuron in the network has both.',
          'Weights are multipliers. When data travels from one neuron to the next, it gets multiplied by a weight. A weight of 0.9 means "this input is very important — pass it along almost unchanged." A weight of 0.01 means "mostly ignore this input." A weight of -0.7 means "this input actively suppresses the output." The model learns, through training, which inputs deserve high weights and which deserve low ones.',
          'Biases are offsets. After multiplying all the inputs by their weights and summing them, the bias is added to the total. This gives each neuron a baseline "preference" — it can fire even when all weighted inputs are small, or it can stay quiet even when inputs are large. Without biases, every neuron would be forced to output zero when inputs are zero, which would limit what the network can learn.',
          'The full computation of a single neuron is: output = activation( (input₁ × weight₁) + (input₂ × weight₂) + … + bias ). This simple formula, repeated across billions of neurons, is what produces sophisticated language understanding.'
        ]
      },
      {
        heading: 'How Parameters Are Learned: The Training Loop',
        paragraphs: [
          'Parameters are not designed — they are discovered through a repeated cycle called the training loop. Here is exactly how it works:',
          '1. Forward Pass: Feed a batch of training examples into the network. The current parameter values produce some output — a prediction about the next word, a sentiment classification, etc.',
          '2. Measure the Error: Compare the model\'s prediction to the correct answer. The difference is measured by a loss function, which produces a single number representing how wrong the model was. Smaller is better.',
          '3. Backward Pass (Backpropagation): Calculate how much each individual parameter contributed to the error. This is done using calculus (the chain rule of differentiation) — the algorithm traces the error backward through every layer and computes a "gradient" for each parameter. The gradient tells you: "if you increase this parameter slightly, does the error go up or down?"',
          '4. Update: Nudge every parameter in the direction that reduces the error. The size of the nudge is controlled by the learning rate (a hyperparameter). Repeat the entire cycle across billions of training examples.',
          'After enough repetitions, the parameters settle into values that let the model produce good outputs on the kinds of inputs it was trained on. The weights in GPT-4 or Llama were not written by hand — they emerged from this process applied across trillions of words of text.'
        ]
      },
      {
        heading: 'Parameter Count and Model Capability',
        paragraphs: [
          'The number of parameters a model has is probably the single most discussed number in the AI industry. But what does it actually mean?',
          'More parameters = more capacity to store patterns. A model with 7 billion parameters can store far more nuanced relationships between words, facts, and concepts than one with 7 million. This is why larger models tend to perform better on difficult tasks — they have more "space" to encode knowledge.',
          'Real-world parameter counts: GPT-2 (2019) had 1.5 billion parameters. GPT-3 (2020) had 175 billion. Estimates for GPT-4 range into the hundreds of billions to over a trillion. Meta\'s Llama 3 comes in variants of 8B, 70B, and 405B parameters. Google\'s Gemini 1.5 Pro is estimated at around 1 trillion.',
          'But more parameters is not unconditionally better. More parameters require more memory to store (a 70B model at 16-bit precision needs ~140 GB of RAM), more compute to run inference, and more data and compute to train properly. A model with more parameters than the data and compute can properly train will actually perform worse — this is called over-parameterization without proportional data.',
          'Efficiency research (like LoRA, quantization, and mixture-of-experts architectures) focuses on getting more capability from fewer active parameters — making models cheaper to serve without sacrificing quality.'
        ]
      },
      {
        heading: 'Parameters vs Hyperparameters: A Critical Distinction',
        paragraphs: [
          'These two terms sound similar but describe completely different things. Confusing them is one of the most common misconceptions for people new to AI.',
          'Parameters are learned automatically from data during training. Nobody sets them by hand. They are the output of the training process — the knowledge the model acquired.',
          'Hyperparameters are set manually by engineers before training begins. They control how training works, not what the model knows. Examples include: learning rate (how large each parameter update step is), batch size (how many examples are processed before each update), number of layers (how many transformation steps the model applies), embedding dimension (how wide each layer is), and training duration (how many passes over the data).',
          'The analogy: parameters are like a student\'s actual knowledge — built up through studying. Hyperparameters are like the study conditions set by the teacher — how long each study session is, what difficulty of problems to practice on, whether to review material daily or weekly. The teacher\'s choices affect how well the student learns, but the knowledge itself comes from the student\'s practice.'
        ]
      },
      {
        heading: 'What Parameters Actually Encode in an LLM',
        paragraphs: [
          'In a large language model, the billions of parameters collectively encode an enormous amount of information — but it is not stored the way a database stores facts. There is no parameter that contains "The capital of France is Paris." Instead, that fact is spread diffusely across millions of weights that collectively make the model more likely to output "Paris" when given the right context.',
          'The parameters in the embedding layer encode which words are semantically similar (as covered in the Embeddings lesson). The parameters in the attention layers encode how different words in a sentence relate to each other. The parameters in the feed-forward layers encode factual associations, grammar patterns, and reasoning shortcuts learned from training data.',
          'This distributed storage is both a strength and a weakness. It makes LLMs extremely flexible and capable of handling nuanced language — but it also makes them hard to interpret (we cannot simply look at a parameter and know what fact it encodes), hard to edit (fixing one wrong belief might require updating millions of parameters), and prone to hallucinations when the pattern-matching fails.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: A Sound Mixing Board',
      text: 'Imagine a professional audio mixing board with thousands of sliders. Each slider is a parameter. Before a sound engineer learns their craft, the sliders are set randomly — the output is noise. Through experience (training on lots of music), the engineer learns which sliders to raise and which to lower to get a great sound. By the end, the specific positions of all those sliders encode the engineer\'s entire musical knowledge. You cannot point to one slider and say "that one represents jazz" — the knowledge is spread across all of them working together. The learning rate is how aggressively the engineer moves sliders. The number of sliders is the parameter count. Hyperparameters are things like how long each practice session is and what kind of music to practice on.'
    },

    diagram: {
      type: 'model_parameters',
      title: 'Model Parameters — Four Interactive Illustrations'
    },

    takeaways: [
      'A model parameter is a single learned number (weight or bias) stored inside a neural network.',
      'Weights are multipliers that control how much each input influences the output. Biases are offsets that give neurons a baseline activation level.',
      'Parameters start random and are adjusted during training using backpropagation — the process of measuring error and nudging every parameter in the direction that reduces it.',
      'Parameter count measures model capacity: more parameters = more space to store patterns. GPT-3 has 175B, GPT-4 estimated 500B–1T+.',
      'More parameters requires more memory (70B model ≈ 140 GB at 16-bit) and more compute for both training and inference.',
      'Parameters are learned from data; hyperparameters (learning rate, batch size, number of layers) are set manually by engineers before training.',
      'In LLMs, knowledge is stored diffusely across millions of parameters — there is no single parameter encoding a single fact.'
    ],

    quiz: {
      question: 'What is the key difference between model parameters and hyperparameters?',
      options: [
        'Parameters control training speed; hyperparameters control model accuracy.',
        'Parameters are set manually by engineers; hyperparameters are learned from data.',
        'Parameters are learned automatically from training data; hyperparameters are set manually before training begins.',
        'Parameters and hyperparameters are the same thing — just different names used by different frameworks.'
      ],
      correctIndex: 2,
      explanation: 'Correct! Model parameters (weights and biases) are learned automatically during training — no human sets them. Hyperparameters like learning rate, batch size, and number of layers are set manually by engineers before training begins and control how the learning process itself works.'
    }
  },

  'ai-2-8': {
    id: 'ai-2-8',
    title: 'Temperature & Sampling',
    subtitle: 'Why AI Gives Different Answers Every Time — Randomness, Probability, and How to Control It',
    section: 'Module 2 · Chapter 8',
    estimatedTime: '9 min read',
    gfgUrl: null,
    videoUrl: 'https://www.youtube.com/embed/jnikMver_CE',

    badgeText: 'HANDS-ON CONCEPT',
    badgeColor: '#0ea5e9',

    sections: [
      {
        heading: 'Why Does the AI Give a Different Answer Every Time?',
        paragraphs: [
          'You ask a chatbot "Write me a poem about rain" and you get one poem. You ask the exact same question again — you get a completely different poem. Same AI, same question, different output. What is going on?',
          'The answer is sampling. After an LLM decides which words could come next, it does not always pick the most obvious one. Instead, it rolls a weighted dice — and the settings that control how that dice is loaded are called sampling parameters. Temperature is the most important of these settings.',
          'To understand temperature, you first need to understand what an LLM actually produces internally before it outputs a word — and that starts with something called logits.'
        ]
      },
      {
        heading: 'Logits and Softmax: How the Model Thinks in Probabilities',
        paragraphs: [
          'Every time an LLM processes your prompt, it does not immediately output a word. Instead, it produces a raw score for every word in its vocabulary — these scores are called logits. A logit is not a probability yet; it is just a number that represents how "confident" the model is about each possible next token.',
          'For example, if you type "The sky is", the model might assign logits like: "blue" → 4.2, "clear" → 3.1, "falling" → 0.8, "banana" → -3.5. These raw numbers need to be converted into actual probabilities that add up to 100%.',
          'That conversion is done by a function called softmax. Softmax takes the logits and squishes them into a probability distribution — every token gets a probability between 0 and 1, and they all add up to exactly 1.0. After softmax, "blue" might have 55% probability, "clear" 35%, "falling" 8%, "banana" 0.1%, and so on for every word in the vocabulary.',
          'This probability distribution is what gets sampled to pick the next token. And the key question is: how do we sample from it?'
        ]
      },
      {
        heading: 'Greedy Sampling: Always Picking the Most Likely Word',
        paragraphs: [
          'The simplest approach is called greedy sampling: just always pick the token with the highest probability. If "blue" has 55%, always output "blue". Always the top pick, every single time.',
          'The result is completely deterministic — given the same input, you always get the exact same output. There is no randomness at all.',
          'But greedy sampling has a serious problem: the responses become boring, repetitive, and robotic. If you ask it to write a story, it will always write the most average, predictable story possible. Creative tasks become bland. The model sounds like it is reciting from memory rather than actually thinking.',
          'This is why greedy sampling is almost never used in practice for chatbots or creative applications. You need some randomness — but not too much. That is where temperature comes in.'
        ]
      },
      {
        heading: 'Temperature: The Dial That Controls Randomness',
        paragraphs: [
          'Temperature is a number applied before the softmax function to scale the logits up or down. The effect on the resulting probability distribution is dramatic and completely predictable.',
          'The formula is simple: divide all logits by the temperature value, then apply softmax normally. Temperature = 1.0 is the default — no change to the distribution.',
          'Low temperature (0 < T < 1): When you divide logits by a number less than 1, the large logits get larger relative to the small ones. After softmax, the top tokens get even higher probabilities and everything else gets crushed toward zero. The distribution becomes spiky and peaked. The model becomes very confident and almost always picks from the top few tokens. At temperature → 0, it is essentially greedy sampling.',
          'High temperature (T > 1): When you divide logits by a number greater than 1, all the logits shrink and become closer together. After softmax, the distribution flattens — the top token loses probability and the lower-ranked tokens gain probability. At temperature = 5 or higher, the distribution becomes nearly uniform, meaning every token has almost the same probability of being picked. The output becomes wild and incoherent.',
          'The practical range most providers use is 0.0 to 2.0. Below 0.3 = very focused and factual. Around 0.7 = conversational sweet spot. Above 1.2 = creative and sometimes surprising. Above 2.0 = usually degrades into nonsense.'
        ]
      },
      {
        heading: 'Real-World Temperature Use Cases',
        paragraphs: [
          'Choosing the right temperature is one of the most practical decisions when building with LLMs. Here is how it maps to real tasks:',
          'Temperature 0.0 – 0.3 (Very focused): SQL query generation, mathematical calculations, extracting structured data from text, medical or legal summaries, answering factual questions. You want the most correct answer, not a creative one. Randomness here would introduce errors.',
          'Temperature 0.5 – 0.8 (Balanced): General chatbot responses, customer support answers, summarizing documents, answering emails. You want coherent, readable outputs that still feel natural — not robotic, but not chaotic.',
          'Temperature 0.9 – 1.2 (Creative): Story writing, marketing copy, brainstorming ideas, generating product descriptions, drafting catchy headlines. You want the model to explore less obvious word choices.',
          'Temperature 1.3 – 2.0 (Wild creativity): Poetry with unusual structure, generating highly diverse options for A/B testing, comedy writing, games. The model surprises you — sometimes brilliantly, sometimes nonsensically.',
          'Most production LLM APIs (OpenAI, Anthropic, Google) default to temperature = 1.0 and let developers set it per request. Knowing how to tune this is one of the most valuable prompt engineering skills.'
        ]
      },
      {
        heading: 'Top-K Sampling: Limiting the Candidate Pool',
        paragraphs: [
          'Even with temperature set, you might want to prevent truly terrible tokens from ever being picked — no matter how flat the distribution gets. That is the job of Top-K sampling.',
          'Top-K sampling works by taking the full probability distribution after softmax and keeping only the K tokens with the highest probability. All other tokens are set to zero probability. Then the probabilities are renormalized to sum to 1.0, and the next token is sampled from this smaller pool.',
          'Example: K = 5 means only the top 5 most probable tokens are eligible. Even if temperature is set high and the distribution is quite flat, you will never accidentally sample a rare nonsense word that happens to have a 0.3% probability.',
          'Top-K can be combined with temperature: first scale the logits by temperature, then apply softmax, then filter to Top-K, then sample. Setting K = 1 is equivalent to greedy sampling. Large K (like 50 or 100) gives the model more diversity to explore.'
        ]
      },
      {
        heading: 'Top-P (Nucleus) Sampling: Dynamic Candidate Selection',
        paragraphs: [
          'Top-K has a limitation: the right number K is different depending on the situation. Sometimes the top 5 tokens together have 99% of the probability mass — keeping 5 is fine. But other times, the probability is spread more evenly and you might need the top 50 tokens to cover 90% of the mass. A fixed K cannot adapt.',
          'Top-P sampling (also called nucleus sampling) solves this by using a cumulative probability threshold instead of a fixed count. You set P = 0.9, for example. The algorithm sorts all tokens by probability (highest first) and keeps adding tokens until their cumulative probability reaches 0.9. Then it discards everything after.',
          'The result is a dynamic pool — sometimes just 3 tokens, sometimes 20 — that always covers a consistent slice of the model\'s confidence. The remaining tokens are renormalized and sampled.',
          'P = 0 means greedy sampling (only the top token, since its own probability exceeds any threshold). P = 1.0 means sample from all tokens (no filtering at all). P = 0.9 is a very common practical value.',
          'Top-P is generally preferred over Top-K in modern LLMs because it adapts to the shape of the distribution. Many systems use Top-P and temperature together, skipping Top-K entirely.'
        ]
      },
      {
        heading: 'Combining All Three: The Full Pipeline',
        paragraphs: [
          'In practice, most LLM providers use temperature, Top-K, and Top-P together in a pipeline. The order matters:',
          '1. Scale logits by temperature. This adjusts how peaked or flat the raw distribution is.',
          '2. Apply softmax to get the probability distribution from the scaled logits.',
          '3. Apply Top-K filtering: keep only the K tokens with the highest probability, discard the rest, renormalize.',
          '4. Apply Top-P filtering: from the Top-K tokens, keep only those whose cumulative probability reaches P, discard the rest, renormalize.',
          '5. Sample the next token from this final filtered distribution.',
          'A typical production setting might be: temperature = 0.8, top-K = 50, top-P = 0.9. Starting from 50,000+ vocabulary tokens, Top-K cuts it to 50, and Top-P might further cut it to 15–20 tokens. The model then samples randomly from those 15–20 — which is why you get variety without gibberish.',
          'Each new token is generated using this exact same pipeline, repeated until the model outputs a stop token or hits the max length. This is how a single sentence of 20 words requires the pipeline to run 20 separate times.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Restaurant Menu',
      text: 'Imagine a chef (the LLM) who has to suggest what to cook next. At temperature 0, the chef always suggests the house special — the most popular dish, guaranteed to satisfy. At temperature 1, the chef picks from a normal menu, sometimes the house special, sometimes something seasonal. At temperature 2, the chef starts suggesting weird fusion experiments that might be brilliant or might be inedible. Top-K is like limiting the menu to only 10 dishes — no matter what. Top-P is like saying "suggest only from dishes that together make up 90% of what customers order" — which might be 5 popular dishes or 20 medium-popularity ones depending on the day.'
    },

    diagram: {
      type: 'temperature_sampling',
      title: 'Temperature & Sampling — Interactive Visualizer'
    },

    takeaways: [
      'LLMs produce raw logits (scores) for every possible next token. Softmax converts these into a probability distribution that sums to 1.0.',
      'Greedy sampling always picks the highest-probability token — deterministic but boring and repetitive.',
      'Temperature divides logits before softmax. Low temperature (< 1) makes the distribution spiky and confident. High temperature (> 1) flattens it, giving rare tokens a chance.',
      'Low temperature (0–0.3) is best for factual, accurate tasks. High temperature (0.8–1.5) is better for creative tasks.',
      'Top-K sampling limits candidates to the K most probable tokens, regardless of temperature.',
      'Top-P (nucleus) sampling keeps only tokens whose cumulative probability reaches threshold P — dynamically adapting the pool size to the distribution shape.',
      'In production, all three are used together: temperature → softmax → Top-K → Top-P → sample. This runs once per output token.'
    ],

    quiz: {
      question: 'You are building a system to extract structured data (dates, names, amounts) from legal documents. Which temperature setting should you use?',
      options: [
        'Temperature 1.5 — you want the model to be creative and explore many possible interpretations.',
        'Temperature 0.8 — a moderate balance between creativity and accuracy.',
        'Temperature 0.1 — you want the model to be highly focused and deterministic, always picking the most likely token.',
        'Temperature 2.0 — high randomness helps the model notice unusual patterns in legal text.'
      ],
      correctIndex: 2,
      explanation: 'Correct! For extracting structured data from documents, you want accuracy and consistency — not creativity. A very low temperature (0.0–0.2) makes the model confident and deterministic, always choosing the most probable tokens. Creative temperature settings would introduce random variation that leads to incorrect extractions.'
    }
  },

  'ai-2-9': {
    id: 'ai-2-9',
    title: 'LLM Hallucinations & Limitations',
    subtitle: 'Why AI Makes Things Up, The 4 Granularity Types, Root Causes, and Mitigation Techniques',
    section: 'Module 2 · Chapter 9',
    estimatedTime: '10 min read',
    gfgUrl: null,
    videoUrl: 'https://www.youtube.com/embed/cfqtFvWOfg0',

    badgeText: 'CRITICAL CONCEPT',
    badgeColor: '#ef4444',

    sections: [
      {
        heading: 'What Is an LLM Hallucination? Three Famous Examples',
        paragraphs: [
          'Large Language Models can generate incredibly fluent, eloquent text on almost any topic. But they have a dangerous flaw: they are also prone to "making stuff up" with absolute confidence — producing plausible-sounding nonsense.',
          'In AI engineering, a hallucination is defined as any LLM output that deviates from established world facts, reality, or contextual logic. Hallucinations range from subtle inconsistencies to completely fabricated statements.',
          'Consider these three real-world examples:',
          '1. Distance Miscalculation: "The distance from Earth to the Moon is 54 million kilometers." (False! 54 million km is the average distance to Mars. The Moon is only ~384,400 km away).',
          '2. Personal Context Mix-Up: "Before working at IBM, I worked at a major Australian airline." (False! The presenter\'s brother worked at the airline, not him — the model blended related family facts together).',
          '3. The Infamous Google Bard Launch: During Google\'s first public demonstration of Bard, the AI claimed the James Webb Space Telescope took the very first picture of an exoplanet outside our solar system. In reality, the first exoplanet image was captured in 2004 by the Very Large Telescope (VLT) — 17 years before JWST launched! This single hallucination wiped out $100 billion in market value in one day.'
        ]
      },
      {
        heading: 'Categorizing Hallucinations by Granularity',
        paragraphs: [
          'Hallucinations are not all identical. Researchers and engineers categorize them across four levels of granularity:',
          '1. Sentence Contradiction: The model generates a sentence that directly contradicts a sentence it wrote just moments earlier in the same output. Example: "The sky is clear and blue today." followed two sentences later by "The sky is dark green today."',
          '2. Prompt Contradiction: The output directly contradicts the explicit constraints or premises given in the user\'s input prompt. Example: You ask the model to "Write a positive 5-star review of this restaurant", and it returns "The food was terrible and the service was extremely rude."',
          '3. Factual Contradictions (Errors): The model outputs statements that directly violate well-established world facts. Example: Claiming "Barack Obama was the first President of the United States" or "Water boils at 50°C at sea level."',
          '4. Nonsensical or Irrelevant Insertions: The model inserts completely unrelated tangents or random facts that have no business being in the response. Example: "The capital of France is Paris. Paris is also the name of a famous pop singer." While true, it is completely irrelevant to a geography context.'
        ]
      },
      {
        heading: 'Why Do LLMs Hallucinate? The Root Causes',
        paragraphs: [
          'Why does a multi-billion parameter model get simple facts wrong? Because LLMs do not "know" facts the way humans or databases do. They are statistical pattern-matching engines trained to predict the next token. There are three primary root causes:',
          'Root Cause 1: Data Quality & Web Scrapes — LLMs are trained on massive datasets scraped from the internet (Wikipedia, Reddit, forums, news). The web contains errors, sarcasm, outdated info, and unverified claims. Even if training data were 100% accurate, it cannot cover every niche topic. When encountering gaps, the model generalizes from patterns — and sometimes generalizes incorrectly.',
          'Root Cause 2: Generation Objectives & Sampling Tradeoffs — Text generation algorithms (Beam Search, Top-K, Temperature) balance fluency vs accuracy, and coherence vs creativity. For instance, Beam Search often favors high-probability generic words over low-probability specific facts. High temperature settings force the model to pick less probable tokens, increasing chances of error.',
          'Root Cause 3: Under-Specified Input Context — Prompts without clear background context mislead the model. Example: Asking "Can cats speak English?" should yield "No". But if the context is the Garfield comic strip, the answer is "Yes, and he loves lasagna!" Without explicit context, the model makes assumptions that may violate your expectations.'
        ]
      },
      {
        heading: 'Active Mitigation: How to Stop Hallucinations',
        paragraphs: [
          'While hallucinations cannot be 100% eliminated in base LLMs, developers use three key strategies to minimize them:',
          'Strategy 1: Clear & Specific Prompts — Provide detailed, explicit instructions, output boundaries, and background context. Instead of asking "What happened in World War 2?", ask "Summarize the major events of World War 2, including key allied countries, Axis powers, and primary causes of the conflict."',
          'Strategy 2: Active Parameter Control — Tune sampling parameters based on task type. Lower the temperature (e.g. T = 0.0 to 0.2) for factual, analytical, or extraction tasks to keep the model focused on the highest-probability factual tokens.',
          'Strategy 3: Multi-Shot (Few-Shot) Prompting — Give the model multiple concrete examples of the input format and desired output before asking your question. This primes the model to follow exact structural and factual patterns.',
          'Strategy 4: Grounding with RAG (Retrieval-Augmented Generation) — Provide external verified source text directly in the prompt context and instruct the model to "Answer ONLY using the provided reference text." This grounds the LLM in real data.'
        ]
      },
      {
        heading: 'Limitations of LLMs Beyond Hallucinations',
        paragraphs: [
          'Besides hallucinations, AI engineers must navigate several fundamental limitations of current LLM architectures:',
          '1. Static Knowledge Cutoff: Models only know what was in their training dataset up to a specific date. They do not know today\'s news unless connected to real-time search.',
          '2. Lack of True Reasoning & World Models: LLMs do not simulate physics or formal logic; they match statistical text patterns. This causes failures in complex multi-step math or spatial reasoning.',
          '3. Sycophancy: LLMs often greedily agree with whatever the user says, even if the user introduces a false premise (e.g., "Why did Shakespeare write Harry Potter?").',
          'Understanding these limitations allows developers to design robust guardrails, validation checks, and fallback mechanisms in production AI applications.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Overconfident Storyteller',
      text: 'Imagine an articulate friend who has read millions of books, but sometimes mixes up plot details. When you ask them a question, they never say "I don\'t know" — their brain automatically constructs the smoothest, most plausible-sounding sentence to complete the story. Because they speak with 100% confidence, you believe them until you double-check the facts! Hallucination is not lying (there is no intent); it is smooth autocomplete running without a fact-checker.'
    },

    diagram: {
      type: 'hallucinations',
      title: 'LLM Hallucinations — Types, Causes & Mitigation Lab'
    },

    takeaways: [
      'A hallucination is an LLM output that deviates from facts, reality, or contextual logic.',
      'The 4 types of hallucinations are: Sentence Contradictions, Prompt Contradictions, Factual Errors, and Irrelevant Insertions.',
      'Famous real-world hallucinations: Earth-to-Moon distance mix-ups (54M km), personal bio errors, and the Google Bard JWST telescope incident.',
      'Root causes include noisy web training data, generation sampling tradeoffs (temperature/beam search), and ambiguous prompt context.',
      'Mitigation strategies: specific prompt framing, low temperature settings (0.0–0.2), multi-shot examples, and RAG grounding.'
    ],

    quiz: {
      question: 'Which of the following represents a Prompt Contradiction hallucination?',
      options: [
        'The model outputs "The capital of France is Paris. Paris is also a famous pop singer."',
        'You ask the model to "Write a positive 5-star review of this product", and it outputs "This product broke immediately and customer service was awful."',
        'The model claims the James Webb Space Telescope took the first picture of an exoplanet.',
        'The model claims the distance from Earth to the Moon is 54 million kilometers.'
      ],
      correctIndex: 1,
      explanation: 'Correct! A Prompt Contradiction occurs when the model generates an output that directly violates the explicit instructions or premise given in the input prompt (e.g. asking for a positive review and receiving a negative one).'
    }
  },

  'ai-2-p1': {
    id: 'ai-2-p1',
    title: 'Mini Project: Token Counter & Cost Calc',
    subtitle: 'Build a real Python tool used by LLM engineers — step by step in your browser',
    section: 'Module 2 · Mini Project',
    estimatedTime: '25 min',
    isProject: true,
    badgeText: 'CODING PROJECT',
    badgeColor: '#8b5cf6',
    videoUrl: null,
    gfgUrl: null,
    diagram: { type: 'mini_project_editor', projectId: 'token_counter' },
    projectMeta: {
      language: 'python',
      runtime: 'pyodide',
      finalTool: 'Token Counter & API Cost Calculator',
      skills: ['functions', 'dictionaries', 'f-strings', 'loops', 'string manipulation'],
    },
    steps: [
      {
        id: 1,
        title: 'Step 1 — Your First Tokenizer',
        concept: 'Tokenization splits text into smaller units called tokens. Before diving into complex algorithms, let\'s understand the simplest possible approach: splitting on whitespace.',
        goal: 'Fill in the two TODO lines so the program prints the list of tokens and the count.',
        whyItMatters: 'Every LLM converts your text into tokens before it can process a single word. The number of tokens directly controls your API cost and whether your text fits in the context window.',
        starterCode: `# Step 1: Your First Tokenizer
# Tokenization splits text into smaller units called "tokens"
# Let's start simple: split on whitespace

text = "The quick brown fox jumps over the lazy dog"

# TODO: Split the text into tokens using Python's built-in split()
tokens = None  # Replace None with the correct code

# TODO: Count how many tokens there are
token_count = None  # Replace None

print(f"Original text: {text}")
print(f"Tokens: {tokens}")
print(f"Token count: {token_count}")`,
        hints: [
          'Python strings have a built-in method called .split() that splits on whitespace by default.',
          'Try: tokens = text.split()',
          'For token_count, use the len() function: token_count = len(tokens)',
        ],
        solutionCode: `text = "The quick brown fox jumps over the lazy dog"
tokens = text.split()
token_count = len(tokens)
print(f"Original text: {text}")
print(f"Tokens: {tokens}")
print(f"Token count: {token_count}")`,
        expectedOutputContains: 'Token count: 9',
        conceptCallout: 'Notice 9 words = 9 tokens here. But real LLMs use BPE (Byte-Pair Encoding) — "running" might become ["run", "ning"]. So 1 word ≠ 1 token.',
      },
      {
        id: 2,
        title: 'Step 2 — Why Spaces Are Not Enough',
        concept: 'Whitespace splitting has a critical flaw: it glues punctuation to words. "Hello," becomes one token instead of "Hello" + ",". Real tokenizers solve this with Byte-Pair Encoding.',
        goal: 'Run the code and observe how punctuation sticks to words. Then read the insight about BPE below the output.',
        whyItMatters: 'Understanding this flaw motivates why we need to build a smarter tokenizer in Step 3. It also explains why "1 word ≈ 1.3 tokens" in English — punctuation and word pieces all count separately.',
        starterCode: `# Step 2: Where whitespace splitting breaks

sentences = [
    "Hello, how are you?",
    "It's a beautiful day!",
    "GPT-4 costs $0.03 per 1,000 tokens.",
    "Email: user@example.com"
]

for sentence in sentences:
    simple_tokens = sentence.split()
    print(f"Text:   {sentence}")
    print(f"Tokens: {simple_tokens}")
    print(f"Count:  {len(simple_tokens)}")
    print("-" * 50)

# No TODOs — just run this and observe the output!
# Notice: "Hello," is ONE token, but should be "Hello" + ","
print("\\nProblem: punctuation is glued to words!")
print("Real LLMs handle this with Byte-Pair Encoding (BPE).")`,
        hints: [
          'This step has no TODOs — just click Run and read the output carefully.',
          'Notice how "Hello," appears as a single item instead of two separate tokens.',
          'GPT-4 would tokenize "Hello," as ["Hello", ","] — 2 tokens, not 1.',
        ],
        solutionCode: `sentences = [
    "Hello, how are you?",
    "It's a beautiful day!",
    "GPT-4 costs $0.03 per 1,000 tokens.",
    "Email: user@example.com"
]
for sentence in sentences:
    simple_tokens = sentence.split()
    print(f"Text:   {sentence}")
    print(f"Tokens: {simple_tokens}")
    print(f"Count:  {len(simple_tokens)}")
    print("-" * 50)
print("\\nProblem: punctuation is glued to words!")
print("Real LLMs handle this with Byte-Pair Encoding (BPE).")`,
        expectedOutputContains: 'Problem: punctuation',
        conceptCallout: 'GPT-4 uses BPE. "tokenization" becomes ["token", "ization"]. On average, 1 English word ≈ 1.3 tokens. Always estimate with padding!',
      },
      {
        id: 3,
        title: 'Step 3 — Build a BPE-Style Approximation',
        concept: 'We cannot run tiktoken in the browser, so we build our own approximation using the "4 characters per token" rule — a real industry heuristic used by developers daily.',
        goal: 'Fix the one None on the highlighted line to complete the token estimator function.',
        whyItMatters: 'This 4-char heuristic is used in production cost estimators across the industry. OpenAI themselves publish it as a rule of thumb. Your approximation will be within ~10% of tiktoken results.',
        starterCode: `import string
import math

def approximate_token_count(text):
    """Approximate BPE token count using character heuristics."""
    if not text:
        return 0
    
    # Each punctuation character = ~1 separate token
    punctuation_count = sum(1 for c in text if c in string.punctuation)
    
    # Strip punctuation and split into words
    clean_text = ''.join(c if c not in string.punctuation else ' ' for c in text)
    words = [w for w in clean_text.split() if w]
    
    word_token_estimate = 0
    for word in words:
        if len(word) <= 4:
            word_token_estimate += 1  # Short words = 1 token
        else:
            # TODO: Longer words need more tokens
            # Divide the word length by 4 and round UP (use math.ceil)
            word_token_estimate += None  # Fix this!
    
    return word_token_estimate + punctuation_count

# Test it!
tests = [
    "Hello!",
    "The quick brown fox",
    "Tokenization is a fundamental step in natural language processing."
]

for text in tests:
    count = approximate_token_count(text)
    print(f"'{text}'")
    print(f"  Approx tokens: {count}")
    print()`,
        hints: [
          'You need to calculate how many ~4-character chunks a long word produces.',
          'Use math.ceil() to always round UP (partial chunks still cost a full token).',
          'The formula is: math.ceil(len(word) / 4)',
        ],
        solutionCode: `import string, math

def approximate_token_count(text):
    if not text:
        return 0
    punctuation_count = sum(1 for c in text if c in string.punctuation)
    clean_text = ''.join(c if c not in string.punctuation else ' ' for c in text)
    words = [w for w in clean_text.split() if w]
    word_token_estimate = 0
    for word in words:
        if len(word) <= 4:
            word_token_estimate += 1
        else:
            word_token_estimate += math.ceil(len(word) / 4)
    return word_token_estimate + punctuation_count

tests = ["Hello!", "The quick brown fox",
         "Tokenization is a fundamental step in natural language processing."]
for text in tests:
    count = approximate_token_count(text)
    print(f"'{text}'")
    print(f"  Approx tokens: {count}")
    print()`,
        expectedOutputContains: 'Approx tokens: 2',
        conceptCallout: 'This function is within ~10% of tiktoken for English prose. For code or non-English text, accuracy varies — real engineers validate with the actual tokenizer before deployment.',
      },
      {
        id: 4,
        title: 'Step 4 — LLM Pricing & Cost Calculator',
        concept: 'Every LLM API charges per 1,000 tokens — separately for input (your prompt) and output (the response). Building a cost calculator lets you compare models before making API calls.',
        goal: 'Fix the two None lines to compute input_cost and output_cost correctly.',
        whyItMatters: 'Cost estimation is a core production engineering skill. A prompt with 10,000 tokens on GPT-4o costs 20x more than on GPT-3.5-Turbo. Choosing the right model for the right task can reduce bills by 90%.',
        starterCode: `# Step 4: LLM Cost Calculator
# Real pricing data (per 1,000 tokens, USD) - as of 2024

MODEL_PRICING = {
    "GPT-4o":          {"input_per_1k": 0.005,   "output_per_1k": 0.015,  "context_window": 128_000},
    "GPT-3.5-Turbo":   {"input_per_1k": 0.0005,  "output_per_1k": 0.0015, "context_window": 16_385},
    "Claude-3-Sonnet": {"input_per_1k": 0.003,   "output_per_1k": 0.015,  "context_window": 200_000},
    "Gemini-1.5-Pro":  {"input_per_1k": 0.00125, "output_per_1k": 0.005,  "context_window": 1_000_000},
}

def calculate_cost(input_tokens, output_tokens, model_name):
    """Calculate the USD cost of one LLM API call."""
    pricing = MODEL_PRICING[model_name]
    
    # TODO: Calculate input cost
    # Formula: (number_of_tokens / 1000) * price_per_1k_tokens
    input_cost = None   # Fix this!
    
    # TODO: Calculate output cost (same formula, different price key)
    output_cost = None  # Fix this!
    
    return {
        "model":       model_name,
        "input_cost":  input_cost,
        "output_cost": output_cost,
        "total_cost":  input_cost + output_cost
    }

# Test: send 500-token prompt, receive 200-token response
result = calculate_cost(500, 200, "GPT-4o")
print(f"Model:  {result['model']}")
print(f"Input:  \${result['input_cost']:.6f}")
print(f"Output: \${result['output_cost']:.6f}")
print(f"Total:  \${result['total_cost']:.6f}")

print("\\n--- Compare all models (500 in, 200 out) ---")
for model in MODEL_PRICING:
    r = calculate_cost(500, 200, model)
    print(f"{model:20s}  \${r['total_cost']:.6f}")`,
        hints: [
          'The pricing is per 1,000 tokens. So for 500 tokens: (500 / 1000) = 0.5 "units".',
          'Multiply that by the price: (input_tokens / 1000) * pricing["input_per_1k"]',
          'Output cost uses the same formula but with pricing["output_per_1k"]',
        ],
        solutionCode: `MODEL_PRICING = {
    "GPT-4o":          {"input_per_1k": 0.005,   "output_per_1k": 0.015,  "context_window": 128_000},
    "GPT-3.5-Turbo":   {"input_per_1k": 0.0005,  "output_per_1k": 0.0015, "context_window": 16_385},
    "Claude-3-Sonnet": {"input_per_1k": 0.003,   "output_per_1k": 0.015,  "context_window": 200_000},
    "Gemini-1.5-Pro":  {"input_per_1k": 0.00125, "output_per_1k": 0.005,  "context_window": 1_000_000},
}
def calculate_cost(input_tokens, output_tokens, model_name):
    pricing = MODEL_PRICING[model_name]
    input_cost  = (input_tokens  / 1000) * pricing["input_per_1k"]
    output_cost = (output_tokens / 1000) * pricing["output_per_1k"]
    return {"model": model_name, "input_cost": input_cost, "output_cost": output_cost, "total_cost": input_cost + output_cost}

result = calculate_cost(500, 200, "GPT-4o")
print(f"Model:  {result['model']}")
print(f"Input:  \${result['input_cost']:.6f}")
print(f"Output: \${result['output_cost']:.6f}")
print(f"Total:  \${result['total_cost']:.6f}")
print("\\n--- Compare all models (500 in, 200 out) ---")
for model in MODEL_PRICING:
    r = calculate_cost(500, 200, model)
    print(f"{model:20s}  \${r['total_cost']:.6f}")`,
        expectedOutputContains: '0.005500',
        conceptCallout: 'GPT-3.5-Turbo is ~10x cheaper than GPT-4o for the same call. For tasks that don\'t require advanced reasoning (FAQs, summarization, classification), GPT-3.5 saves significant cost at scale.',
      },
      {
        id: 5,
        title: 'Step 5 — Context Window Validation',
        concept: 'Every LLM has a hard token limit. Exceed it and the API returns an error — no output, and you still might get charged. A context window validator prevents this in production.',
        goal: 'Fill in the None to write a warning message when the context window is more than 80% full.',
        whyItMatters: 'A 90% full context window leaves very little room for the model\'s output. Engineers add this check before every large API call to prevent runtime errors and unexpected truncation.',
        starterCode: `MODEL_PRICING = {
    "GPT-4o":          {"context_window": 128_000},
    "GPT-3.5-Turbo":   {"context_window": 16_385},
    "Claude-3-Sonnet": {"context_window": 200_000},
    "Gemini-1.5-Pro":  {"context_window": 1_000_000},
}

def check_context_window(token_count, model_name):
    """Check if a token count fits and warn if near the limit."""
    max_tokens = MODEL_PRICING[model_name]["context_window"]
    fits = token_count <= max_tokens
    percent_used = (token_count / max_tokens) * 100
    tokens_remaining = max_tokens - token_count
    
    warning = None
    if percent_used > 80:
        # TODO: Write a helpful warning message!
        # Include the percent_used value so the user knows how serious it is
        warning = None  # Replace with a useful string

    return {
        "fits": fits,
        "percent_used": round(percent_used, 1),
        "tokens_remaining": max(0, tokens_remaining),
        "warning": warning
    }

# Test with 15,000 tokens (nearly fills GPT-3.5's 16k window)
for model in MODEL_PRICING:
    r = check_context_window(15_000, model)
    status = "FITS    " if r["fits"] else "EXCEEDS "
    print(f"{model:20s}: {status} | {r['percent_used']}% full | {r['tokens_remaining']:,} remaining")
    if r["warning"]:
        print(f"  WARNING: {r['warning']}")`,
        hints: [
          'The warning variable should be a string (text), not None.',
          'Use an f-string to include the percent_used value in the message.',
          'Example: warning = f"{round(percent_used, 1)}% of context window used — consider chunking!"',
        ],
        solutionCode: `MODEL_PRICING = {
    "GPT-4o": {"context_window": 128_000}, "GPT-3.5-Turbo": {"context_window": 16_385},
    "Claude-3-Sonnet": {"context_window": 200_000}, "Gemini-1.5-Pro": {"context_window": 1_000_000},
}
def check_context_window(token_count, model_name):
    max_tokens = MODEL_PRICING[model_name]["context_window"]
    fits = token_count <= max_tokens
    percent_used = (token_count / max_tokens) * 100
    tokens_remaining = max_tokens - token_count
    warning = None
    if percent_used > 80:
        warning = f"{round(percent_used, 1)}% of context window used — consider chunking your input!"
    return {"fits": fits, "percent_used": round(percent_used, 1),
            "tokens_remaining": max(0, tokens_remaining), "warning": warning}

for model in MODEL_PRICING:
    r = check_context_window(15_000, model)
    status = "FITS    " if r["fits"] else "EXCEEDS "
    print(f"{model:20s}: {status} | {r['percent_used']}% full | {r['tokens_remaining']:,} remaining")
    if r["warning"]:
        print(f"  WARNING: {r['warning']}")`,
        expectedOutputContains: 'WARNING',
        conceptCallout: 'In production, engineers add this check in a wrapper function that runs before every API call. If the check fails, the system automatically chunks the input into smaller pieces.',
      },
      {
        id: 6,
        title: 'Step 6 — Assemble the Full Token Audit Tool',
        concept: 'Combine all five previous functions into one complete, production-ready tool. This is exactly the kind of utility LLM engineers keep in their toolbox.',
        goal: 'Find and fix the one commented-out print line (remove the #) to complete the full audit table.',
        whyItMatters: 'This tool will help you make smart decisions about which LLM to use, how much a feature will cost at scale, and whether your prompts will fit before spending money on API calls.',
        starterCode: `import string, math

MODEL_PRICING = {
    "GPT-4o":          {"input_per_1k": 0.005,   "output_per_1k": 0.015,  "context_window": 128_000},
    "GPT-3.5-Turbo":   {"input_per_1k": 0.0005,  "output_per_1k": 0.0015, "context_window": 16_385},
    "Claude-3-Sonnet": {"input_per_1k": 0.003,   "output_per_1k": 0.015,  "context_window": 200_000},
    "Gemini-1.5-Pro":  {"input_per_1k": 0.00125, "output_per_1k": 0.005,  "context_window": 1_000_000},
}

def count_tokens(text):
    punct = sum(1 for c in text if c in string.punctuation)
    clean = ''.join(c if c not in string.punctuation else ' ' for c in text)
    words = [w for w in clean.split() if w]
    word_tokens = sum(1 if len(w) <= 4 else math.ceil(len(w) / 4) for w in words)
    return word_tokens + punct

def calculate_cost(input_tokens, output_tokens, model):
    p = MODEL_PRICING[model]
    return (input_tokens / 1000) * p["input_per_1k"] + (output_tokens / 1000) * p["output_per_1k"]

def token_audit(prompt_text, expected_output_tokens=150):
    token_count = count_tokens(prompt_text)
    
    print("=" * 62)
    print("  TOKEN AUDIT REPORT")
    print("=" * 62)
    preview = prompt_text.strip()[:60] + ("..." if len(prompt_text.strip()) > 60 else "")
    print(f"\\nPrompt:         \\"{preview}\\"")
    print(f"Characters:     {len(prompt_text):,}")
    print(f"Tokens (input): {token_count:,}")
    print(f"Est. output:    {expected_output_tokens:,} tokens\\n")
    
    print(f"{'Model':<20} {'Fits?':<10} {'Used%':<10} {'Est. Cost':<15}")
    print("-" * 62)
    
    for model_name, info in MODEL_PRICING.items():
        pct = (token_count / info["context_window"]) * 100
        fits = "Fits" if token_count <= info["context_window"] else "TOO LONG"
        cost = calculate_cost(token_count, expected_output_tokens, model_name)
        
        # TODO: Remove the # at the start of the next line to enable output
        # print(f"{model_name:<20} {fits:<10} {pct:<9.1f}%  \${cost:.6f}")
    
    print("=" * 62)
    print("\\nTip: Use low temperature (0.0-0.2) for factual tasks.")
    print("     Use higher temperature (0.7-1.2) for creative tasks.")

# === Change MY_PROMPT and see the numbers update! ===
MY_PROMPT = """
You are an expert Python tutor. Explain the concept of recursion
to a beginner programmer using a real-world analogy.
Include a simple working code example. Be concise but thorough.
"""

token_audit(MY_PROMPT, expected_output_tokens=300)`,
        hints: [
          'Find the commented-out print line (the one starting with # print(...))',
          'Remove just the # and the space before "print" to uncomment it.',
          'After that, try changing MY_PROMPT to your own text and re-run!',
        ],
        solutionCode: `import string, math
MODEL_PRICING = {
    "GPT-4o":          {"input_per_1k": 0.005,   "output_per_1k": 0.015,  "context_window": 128_000},
    "GPT-3.5-Turbo":   {"input_per_1k": 0.0005,  "output_per_1k": 0.0015, "context_window": 16_385},
    "Claude-3-Sonnet": {"input_per_1k": 0.003,   "output_per_1k": 0.015,  "context_window": 200_000},
    "Gemini-1.5-Pro":  {"input_per_1k": 0.00125, "output_per_1k": 0.005,  "context_window": 1_000_000},
}
def count_tokens(text):
    punct = sum(1 for c in text if c in string.punctuation)
    clean = ''.join(c if c not in string.punctuation else ' ' for c in text)
    words = [w for w in clean.split() if w]
    return sum(1 if len(w) <= 4 else math.ceil(len(w) / 4) for w in words) + punct
def calculate_cost(input_tokens, output_tokens, model):
    p = MODEL_PRICING[model]
    return (input_tokens / 1000) * p["input_per_1k"] + (output_tokens / 1000) * p["output_per_1k"]
def token_audit(prompt_text, expected_output_tokens=150):
    token_count = count_tokens(prompt_text)
    print("=" * 62)
    print("  TOKEN AUDIT REPORT")
    print("=" * 62)
    preview = prompt_text.strip()[:60] + ("..." if len(prompt_text.strip()) > 60 else "")
    print(f"\\nPrompt:         \\"{preview}\\"")
    print(f"Characters:     {len(prompt_text):,}")
    print(f"Tokens (input): {token_count:,}")
    print(f"Est. output:    {expected_output_tokens:,} tokens\\n")
    print(f"{'Model':<20} {'Fits?':<10} {'Used%':<10} {'Est. Cost':<15}")
    print("-" * 62)
    for model_name, info in MODEL_PRICING.items():
        pct = (token_count / info["context_window"]) * 100
        fits = "Fits" if token_count <= info["context_window"] else "TOO LONG"
        cost = calculate_cost(token_count, expected_output_tokens, model_name)
        print(f"{model_name:<20} {fits:<10} {pct:<9.1f}%  \${cost:.6f}")
    print("=" * 62)
    print("\\nTip: Use low temperature (0.0-0.2) for factual tasks.")
    print("     Use higher temperature (0.7-1.2) for creative tasks.")
MY_PROMPT = """
You are an expert Python tutor. Explain the concept of recursion
to a beginner programmer using a real-world analogy.
Include a simple working code example. Be concise but thorough.
"""
token_audit(MY_PROMPT, expected_output_tokens=300)`,
        expectedOutputContains: 'TOKEN AUDIT REPORT',
        conceptCallout: 'Congratulations! You have built a real LLM engineering tool from scratch. Try changing MY_PROMPT to your own text and see the costs update live. This is exactly how engineers estimate costs before deploying features.',
      },
    ],
  },

  'ai-3-1': {
    id: 'ai-3-1',
    title: 'Writing Effective Prompts: The Essentials',
    subtitle: 'Mastering Prompt Engineering & Problem Formulation (MIT Sloan Framework)',
    section: 'Module 3 · Chapter 1',
    estimatedTime: '7 min read',
    gfgUrl: 'https://mitsloanedtech.mit.edu/ai/basics/effective-prompts/',

    badgeText: 'MIT PROMPT GUIDELINES',
    badgeColor: '#7c3aed',

    sections: [
      {
        heading: 'What is a Prompt? ("Programming with Words")',
        paragraphs: [
          'Prompts are your textual or multimodal inputs into an AI system to direct its reasoning and obtain specific results. As AI scholar Ethan Mollick (2023) notes, it is best to think of generative AI tools like ChatGPT or Claude as "a machine you are programming with words".',
          'Unlike traditional coding languages that require strict syntax rules (like Python or C++), AI systems leverage Natural Language Processing (NLP), Machine Learning, and Intent Recognition to process human conversation. However, the quality, depth, and factual accuracy of the output hinge entirely on how you construct your prompts.'
        ]
      },
      {
        heading: 'The 3 Pillars of Prompt Engineering',
        paragraphs: [
          '1. Provide Context & Persona: Don\'t ask generic questions. Assign the AI an explicit professional identity (e.g., "You are an experienced wildlife biologist specializing in trees") and specify the target audience (e.g., "explain it to kindergarteners" vs "explain to graduate students"). You can even feed your own writing samples for voice matching.',
          '2. Be Specific & Granular: Include exact constraints, regions, timeframes, and formatting rules. The Granularity Rule states: The utility and accuracy of AI output is directly proportional to the specificity of your input query.',
          '3. Build on the Conversation: Chat-based LLMs remember preceding context within their context window. Refine outputs iteratively ("make it funnier", "format as a markdown table with 3 columns") without re-establishing baseline context. When changing topics completely, open a fresh chat session.'
        ]
      },
      {
        heading: 'The MIT Shift: Problem Formulation vs. Prompt Engineering',
        paragraphs: [
          'In his groundbreaking Harvard Business Review & MIT Sloan research, Dr. Oguz A. Acar (2023) highlights a vital distinction for the future of AI:',
          '• Prompt Engineering focuses on word choice, syntax tricks, and phrasing formulas.',
          '• Problem Formulation emphasizes defining the core problem—delineating its focus, scope, constraints, and business goals.',
          'As AI models become agentic and auto-refine user prompts, superficial prompt hacks will fade. Developing deep skills in clearly defining complex problems is what will truly set elite AI engineers and professionals apart.'
        ]
      },
      {
        heading: 'Crucial Limitations: AI Flaws, Hallucinations & Bias',
        paragraphs: [
          'Even the best-crafted prompt cannot overcome the structural limitations of generative AI models:',
          '• Hallucinations: AI models generate confident, grammatically perfect text that can be factually false or completely fabricated (such as CNET\'s 2023 published financial errors). Always inspect outputs with a critical eye.',
          '• Algorithmic Bias: Models reflect training data biases (e.g., MIT\'s viral headshot controversy where AI altered an Asian student\'s skin tone and eye color). Users must actively inspect outputs for non-inclusive language and bias.',
          '• Data Privacy: Never input confidential corporate data or private personal details into unmanaged public AI tools.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Briefing to a Top Executive Consultant',
      text: 'Giving a vague prompt to AI is like telling a top management consultant "Give me business advice." You will get a generic, useless 3-paragraph answer. Providing rich context, target audience, explicit constraints, and clear goals is like giving that consultant a detailed project brief—they deliver bespoke, high-impact, actionable strategy on the very first try!'
    },

    diagram: {
      type: 'effective_prompts',
      title: 'MIT Sloan Interactive Prompt Engineering & Problem Lab'
    },

    takeaways: [
      'Prompts are natural language instructions used to "program" generative AI models with words.',
      'The 3 Pillars of Effective Prompting: Provide Context & Persona, Be Specific & Granular, and Build Iteratively.',
      'Input Granularity Rule: Output utility is directly proportional to input specificity.',
      'Shift from Prompt Engineering to Problem Formulation: Defining problem scope and goals outlasts syntax hacks.',
      'Always critically audit outputs for AI hallucinations, factual errors, and algorithmic bias.'
    ],

    quiz: {
      question: 'According to MIT Sloan research (Acar, 2023), what is the key difference between Prompt Engineering and Problem Formulation?',
      options: [
        'Prompt engineering uses Python, while problem formulation uses SQL',
        'Prompt engineering focuses on text syntax tricks, whereas problem formulation focuses on defining the problem focus, scope, and goals',
        'Problem formulation is only used for image generation AI',
        'There is no difference; they are exact synonyms'
      ],
      correctIndex: 1,
      explanation: 'Spot on! While prompt engineering focuses on selecting specific words and punctuation, problem formulation emphasizes clearly defining the underlying problem, scope, boundaries, and objectives—a skill that outlasts evolving AI prompt auto-refinements.'
    }
  },

  'ai-3-2': {
    id: 'ai-3-2',
    title: 'System vs User vs Assistant Prompts',
    subtitle: 'Understanding the 3-Layered Prompt Architecture & Instruction Precedence',
    section: 'Module 3 · Chapter 2',
    estimatedTime: '8 min read',
    gfgUrl: 'https://scientyficworld.org/difference-between-system-assistant-and-user-prompt/',

    badgeText: 'PROMPT ARCHITECTURE',
    badgeColor: '#2563eb',

    sections: [
      {
        heading: 'Every AI Conversation Runs on 3 Stacked Layers',
        paragraphs: [
          'Have you ever wondered why the same question can produce completely different answers across different AI chats or tools? The reason is simple: every modern LLM conversation runs on three stacked instruction layers: the System Prompt, the Assistant Prompt, and the User Prompt.',
          'Understanding how these three roles interact allows you to build predictable, repeatable, production-grade AI workflows.'
        ]
      },
      {
        heading: '1. The System Prompt: The Constitution',
        paragraphs: [
          'A system prompt defines WHO the assistant must be and what rules it must NEVER break. It sets identity, core values, safety boundaries, and priority rankings that outrank everything else in the conversation.',
          'Think of the system prompt like a tiny constitution. It has the highest instruction precedence. A strong system prompt includes: 1) Role & Scope, 2) Ranked Priorities (e.g. Accuracy > Clarity > Style), 3) Safety & Refusal Rules, 4) Clarification Policy, and 5) Output Discipline.'
        ],
        codeBlockTitle: 'SYSTEM PROMPT CONSTITUTION TEMPLATE',
        codeBlock: `You are a careful, fact-first assistant focused on [domain].
Priorities (in order): [P1] > [P2] > [P3].
Safety: Never include personal data (PII) or credentials; decline unsafe or speculative requests.
If inputs are incomplete, ask exactly ONE clarifying question; if still ambiguous, proceed with explicit "Assumption:" labels.
Default to active voice; keep responses grounded, verifiable, and precise.`
      },
      {
        heading: '2. The Assistant Prompt: The SOP & Style Guide',
        paragraphs: [
          'If the system prompt is the constitution, the assistant prompt is your house style guide and Standard Operating Procedure (SOP). It standardizes tone, voice, formatting contracts, process steps, and quality gates.',
          'In code or API payloads, assistant prompts can also represent previous conversation turns or few-shot examples that demonstrate desired output structures to the model.'
        ],
        codeBlockTitle: 'ASSISTANT PROMPT & FEW-SHOT SOP TEMPLATE',
        codeBlock: `Tone: Conversational, practitioner-first, active voice.
Formatting: Question-style H2s; short paragraphs (2-4 sentences); minimal bullets; include one runnable example per major section.
Process: (1) Produce a tight outline; (2) Follow immediately with the full draft; (3) Start each section with a one-sentence direct answer.
Quality: If comparing options, add a small difference table; if flows matter, include one mermaid diagram; comment all code.`
      },
      {
        heading: '3. The User Prompt: The Steering Wheel',
        paragraphs: [
          'The user prompt is the specific task request supplied by the user. It answers: WHAT you want done, FOR WHOM, using WHICH DATA, and HOW you will judge success.',
          'Nine times out of ten, when AI responses feel generic or inaccurate, the user prompt is under-specified. A complete user prompt specifies: Goal, Audience, Inputs/Data, Scope, Format, Quality Criteria, and Caveats.'
        ],
        codeBlockTitle: 'WEAK VS STRONG USER PROMPT COMPARISON',
        codeBlock: `# Weak User Prompt:
"Explain Redis vs PostgreSQL caching."

# Strong User Prompt:
"Goal: Explain Redis vs PostgreSQL caching for product pages.
Audience: Junior backend engineers.
Inputs: Traffic ≈ 40,000 requests/day; 95% reads, 5% writes; TTL 15s.
Scope: Cover latency, consistency, invalidation, and memory cost.
Output: Q&A headings, 2 short examples (one Redis GET/SETEX, one Postgres view refresh), and a trade-offs table.
Quality: Must call out cache stampede risks and list 2 mitigations."`
      },
      {
        heading: 'Instruction Precedence: Who Wins in a Conflict?',
        paragraphs: [
          'When instructions clash, LLM models evaluate authority according to strict precedence rules: System Prompt > Assistant Prompt > User Prompt.',
          'If a user prompt requests personal data or unsafe code ("Extract phone numbers from this resume"), but the System Prompt prohibits PII, the model MUST refuse the user request because the System Prompt outranks the User Prompt.'
        ],
        codeBlockTitle: 'PRODUCTION CHAT API JSON PAYLOAD (ROLE ARRAY)',
        codeBlock: `[
  {
    "role": "system",
    "content": "You are a careful, fact-first writing assistant. Priorities: accuracy > clarity > completeness > style. Safety: never include personal data or credentials."
  },
  {
    "role": "assistant",
    "content": "Process: 1) Generate a compact outline. 2) Follow with full draft. 3) Start each section with a 1-sentence direct answer. 4) Include runnable code snippets."
  },
  {
    "role": "user",
    "content": "Goal: Write a developer tutorial on 'Implementing idempotent retries for HTTP APIs'. Audience: junior-to-mid backend engineers. Scope: idempotency keys, backoff with jitter. Include a short Node.js code example."
  }
]`
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Movie Director, Script Supervisor & Lead Actor',
      text: 'The System Prompt is the Movie Director (setting non-negotiable rating limits, safety rules, and overall film vision). The Assistant Prompt is the Script Supervisor (enforcing script formatting, camera angles, and delivery style). The User Prompt is the Scene Action called on set ("Action! Scene 4, Take 1 in the rain!"). Everything comes together seamlessly because the rules are set before action begins!'
    },

    diagram: {
      type: 'system_user_assistant',
      title: 'Interactive 3-Layer Prompt Stack & Code Payload Visualizer'
    },

    takeaways: [
      'Every chat conversation runs on 3 stacked layers: System Prompt (Constitution), Assistant Prompt (Style Guide/SOP), and User Prompt (Task Request).',
      'Instruction Precedence Rule: System Prompt > Assistant Prompt > User Prompt.',
      'System Prompts set role, ranked priorities (Accuracy > Clarity > Style), and refusal boundaries.',
      'Assistant Prompts enforce voice, formatting contracts, process steps, and quality gates.',
      'User Prompts must specify Goal, Audience, Inputs, Scope, Constraints, and Success Criteria.',
      'In API code payloads, prompts are passed as an ordered array of message objects with "role" keys.'
    ],

    quiz: {
      question: 'When instructions conflict between the System Prompt and the User Prompt (e.g. User asks for private emails, System forbids PII), which instruction takes priority?',
      options: [
        'The User Prompt always takes priority because the user pays for the API',
        'The Assistant Prompt overrides both',
        'The System Prompt takes highest priority and the model must refuse the user request',
        'The model chooses randomly depending on temperature'
      ],
      correctIndex: 2,
      explanation: 'Spot on! The instruction hierarchy is strictly System Prompt > Assistant Prompt > User Prompt. The System Prompt sets non-negotiable constitution-level rules and safety boundaries that outrank user asks.'
    }
  },

  'ai-3-3': {
    id: 'ai-3-3',
    title: 'Few-Shot Prompting: Teaching by Example',
    subtitle: 'From Zero-Shot to Few-Shot: Guiding LLMs with Pattern Matching & Exemplars (Google AI Essentials)',
    section: 'Module 3 · Chapter 3',
    estimatedTime: '6 min read',
    videoUrl: 'https://www.youtube.com/embed/9qdgEBVkWR4',
    gfgUrl: 'https://www.promptingguide.ai/techniques/fewshot',

    badgeText: 'GOOGLE AI ESSENTIALS',
    badgeColor: '#0ea5e9',

    sections: [
      {
        heading: 'The Power of Learning from Examples',
        paragraphs: [
          'Have you ever created something new by building upon previous examples? Perhaps you used a well-received report as a reference when drafting a project summary, or used a clean, engaging website as a visual model when designing your own user interface. LLMs operate on the exact same principle.',
          'Including concrete examples directly within your prompt provides immediate ground truth for tone, structure, phrasing, and formatting. It helps the model align with your intended output without needing pages of abstract rules.'
        ]
      },
      {
        heading: 'What is a "Shot"? The Prompting Spectrum',
        paragraphs: [
          'In artificial intelligence and prompt engineering, the technical term "shot" is simply a synonym for an "example". Prompting strategies are categorized by the number of demonstration examples provided:',
          '1. Zero-Shot Prompting: Providing zero examples in the prompt. The model performs the task based entirely on its pre-trained weights and the task description. Best for simple, straightforward, direct requests.',
          '2. One-Shot Prompting: Providing exactly one demonstration example. Establishes a baseline format or schema.',
          '3. Few-Shot Prompting: Providing two or more demonstration examples (typically 2 to 5). Teaches nuanced patterns, custom classification schemas, stylistic voice, and strict formatting contracts.'
        ],
        codeBlockTitle: 'ZERO-SHOT VS FEW-SHOT SPECTRUM',
        codeBlock: `# Zero-Shot (No examples provided)
Classify the sentiment of this review:
"The battery life on this laptop exceeded all my expectations!"
Sentiment:

# Few-Shot (2 examples demonstrate the exact output format)
Review: "The screen flickers intermittently." -> Sentiment: NEGATIVE [Hardware]
Review: "Delivery was fast and customer service was polite." -> Sentiment: POSITIVE [Service]
Review: "The battery life on this laptop exceeded all my expectations!" -> Sentiment:`
      },
      {
        heading: 'Google Retail Case Study: Skateboard Product Descriptions',
        paragraphs: [
          'Consider a practical e-commerce workflow: You work for an online retailer and need to write a product description for a newly listed skateboard. You already have approved descriptions for existing products (a bicycle and rollerblades) written in an exact house style: one sentence long, containing exactly two descriptive adjectives.',
          'Instead of attempting to describe grammatical rules in abstract text, you provide the existing descriptions as few-shot examples and leave the target item blank for the model to complete.'
        ],
        codeBlockTitle: 'FEW-SHOT RETAIL COPYWRITING TEMPLATE',
        codeBlock: `Write a one-sentence product description. Review the examples below and write the skateboard description in the exact same style.

Product: Bicycle
Description: A sleek and durable bicycle built for city commuting.

Product: Rollerblades
Description: Smooth and stylish rollerblades designed for effortless glide.

Product: Skateboard
Description:`
      },
      {
        heading: 'Why Few-Shot Prompting Works: In-Context Learning',
        paragraphs: [
          'Under the hood, few-shot prompting leverages In-Context Learning (ICL). The model does not alter its underlying neural weights or require costly fine-tuning. Instead, its attention mechanism dynamically conditions on the demonstrated patterns within the active context window.',
          'This makes few-shot prompting the fastest, most cost-effective method to enforce custom JSON payloads, domain-specific categorization taxonomies, and precise brand voice.'
        ]
      },
      {
        heading: 'How Many Examples Are Optimal? Avoiding Overfitting & Bloat',
        paragraphs: [
          'While few-shot prompting is powerful, there is no single universal rule for the exact number of examples to include. Modern foundation models can accurately reproduce patterns with just 2 to 4 high-quality exemplars.',
          'Beware of diminishing returns: If you include too many examples (e.g. 20+), you consume valuable context window space, increase latency and API token costs, and risk making the model over-rigid and less adaptable to edge cases. Experiment to discover the sweet spot for your task.'
        ],
        codeBlockTitle: 'PRODUCTION FEW-SHOT BEST PRACTICES',
        codeBlock: `1. Diversity: Provide examples that cover different edge cases and label classes.
2. Label Balance: Keep class distributions balanced (e.g. 1 positive, 1 neutral, 1 negative).
3. Formatting Consistency: Maintain identical delimiters (e.g. Input: / Output:) across all shots.
4. Density: 2 to 5 high-quality examples are usually optimal for modern LLMs.`
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Apprentice & The Approved Portfolio',
      text: 'Imagine onboarding a junior copywriter. If you say "Write a product description" (Zero-Shot), they will guess based on whatever ads they remember seeing in their life. If you hand them 2 finished, approved company product cards (Few-Shot) and say "Make the next one match this layout and voice," they capture the exact adjective count, tone, and brand identity on the very first try!'
    },

    diagram: {
      type: 'few_shot_prompting',
      title: 'Interactive Few-Shot Prompting Lab & Shot Spectrum Visualizer'
    },

    takeaways: [
      'In prompt engineering, a "shot" is a synonym for an example included in the prompt.',
      'Zero-Shot provides 0 examples; One-Shot provides 1 example; Few-Shot provides 2 or more examples.',
      'Few-shot prompting teaches desired format, phrasing, and style through concrete demonstration rather than abstract instructions.',
      'Few-shot works through In-Context Learning (ICL) without updating model weights.',
      'The optimal density is typically 2 to 5 high-quality examples; excessive examples waste context tokens and can reduce creative adaptability.'
    ],

    quiz: {
      question: 'What is the primary advantage of using Few-Shot Prompting over Zero-Shot Prompting when generating structured product descriptions?',
      options: [
        'Few-shot permanently modifies and retrains the underlying model weights',
        'Few-shot provides concrete demonstration examples that clarify desired structure, tone, and constraints without ambiguous explanations',
        'Few-shot guarantees zero token cost because examples are free in LLM APIs',
        'Few-shot makes the model run 10x faster by bypassing the context window'
      ],
      correctIndex: 1,
      explanation: 'Spot on! Few-shot prompting provides 2 or more concrete input-output examples, allowing the model to mirror the exact desired structure, stylistic tone, and constraints through in-context learning without requiring fine-tuning.'
    }
  },

  'ai-3-4': {
    id: 'ai-3-4',
    title: 'Chain-of-Thought Reasoning (CoT)',
    subtitle: 'Eliciting Step-by-Step Logic, Self-Consistency & Emergent Reasoning in LLMs (IBM Guide)',
    section: 'Module 3 · Chapter 4',
    estimatedTime: '8 min read',
    gfgUrl: 'https://www.ibm.com/think/topics/chain-of-thoughts',

    badgeText: 'IBM AI THINK',
    badgeColor: '#0f62fe',

    sections: [
      {
        heading: 'What is Chain-of-Thought (CoT) Prompting?',
        paragraphs: [
          'Chain-of-Thought (CoT) is a prompt engineering technique that dramatically enhances the problem-solving capabilities of Large Language Models (LLMs) on complex tasks involving multistep reasoning.',
          'Instead of asking an LLM to jump immediately from a prompt question to a final output, CoT prompts the model to generate a coherent sequence of intermediate logical reasoning steps that progressively lead to the final conclusion.',
          'Seminal AI research (Wei et al., 2022; IBM Research) demonstrates that eliciting intermediate reasoning enables models to tackle intricate arithmetic, symbolic deduction, common-sense reasoning, and enterprise decision workflows with significantly higher accuracy.'
        ]
      },
      {
        heading: 'The Mechanics: Why Thinking Step-by-Step Works',
        paragraphs: [
          'Under standard prompting, an LLM attempts to predict the final token directly from the input prompt in a single forward pass. For multistep problems (like calculating polynomial roots or resolving complex scheduling constraints), calculating the answer in one step requires compressing multiple logical transformations into a single token prediction, frequently resulting in hallucinations.',
          'By generating intermediate reasoning steps, the model produces intermediate tokens that feed back into its own attention context window. Each reasoning step acts as a memory buffer and computational scaffold for subsequent deduction steps.'
        ],
        codeBlockTitle: 'STANDARD VS CHAIN-OF-THOUGHT COMPARISON',
        codeBlock: `# Standard Prompting (Prone to calculation error)
Input: "Solve the quadratic equation: x^2 - 5x + 6 = 0"
Standard Output: "x = 5"  # INCORRECT (Jumped to conclusion)

# Chain-of-Thought Prompting (Step-by-Step Logic)
Input: "Solve the quadratic equation: x^2 - 5x + 6 = 0. Show your step-by-step reasoning."
CoT Output:
"Step 1: Identify coefficients in ax^2 + bx + c = 0: a = 1, b = -5, c = 6.
Step 2: Find two numbers that multiply to 6 and add up to -5: (-2) and (-3).
Step 3: Factor the polynomial: (x - 2)(x - 3) = 0.
Step 4: Set each factor to zero: x - 2 = 0 or x - 3 = 0.
Final Answer: The solutions are x = 2 and x = 3."  # CORRECT & VERIFIABLE`
      },
      {
        heading: 'Prompt Chaining vs. Chain-of-Thought',
        paragraphs: [
          'It is critical for AI engineers to distinguish between two foundational reasoning architectures:',
          '1. Chain-of-Thought (CoT): Elicits the entire step-by-step reasoning process within a single model inference turn. Highly efficient for mathematical deduction, classification logic, and code generation.',
          '2. Prompt Chaining: Breaks a complex business process into multiple distinct API calls, where the output of Prompt A is validated, transformed, and passed as the input payload to Prompt B. Ideal for multi-agent workflows, tool execution, and modular production pipelines.'
        ],
        codeBlockTitle: 'ARCHITECTURAL DISTINCTION',
        codeBlock: `# 1. Chain-of-Thought (Single Turn Internal Reasoning):
[User Prompt] -> [LLM generates: Step 1 -> Step 2 -> Step 3 -> Final Result]

# 2. Prompt Chaining (Multi-turn Orchestration):
[User Goal] -> [LLM Call 1: Extract Entities]
            -> [Python validation / Database lookup]
            -> [LLM Call 2: Draft Action Plan]
            -> [LLM Call 3: Security & Policy Audit]`
      },
      {
        heading: 'Key Variants of Chain-of-Thought Prompting',
        paragraphs: [
          'According to IBM AI Research and modern benchmarks, CoT has evolved into several high-performance variants:',
          '• Zero-Shot CoT (Kojima et al., 2022): Appending the trigger phrase "Let\'s think step by step" to the prompt. This simple prompt modifier unlocks latent reasoning pathways without requiring manual few-shot examples.',
          '• Few-Shot / Manual CoT: Supplying 2 to 4 exemplar problems complete with human-authored step-by-step reasoning chains. Provides strict control over reasoning methodology.',
          '• Self-Consistency CoT (Wang et al., 2022): Generating multiple diverse reasoning paths at higher temperature and selecting the final consensus answer via majority vote, reducing variance and calculation drift.',
          '• Auto-CoT (Zhang et al., 2022): Automatically clustering questions in a dataset and generating synthetic reasoning chains to eliminate manual prompt engineering effort.',
          '• Multimodal CoT: Combining visual cues (diagrams, UI mockups, charts) with textual step-by-step deduction.'
        ]
      },
      {
        heading: 'Advantages, Trade-offs & Production Considerations',
        paragraphs: [
          'Advantages: Superior accuracy on reasoning benchmarks, complete interpretability and observability (you can inspect the exact step where logic broke down), and improved educational value.',
          'Trade-offs: Higher token generation costs (generating 150 reasoning tokens per query increases API costs) and higher inference latency. For simple lookup queries, standard prompting remains more economical.'
        ],
        codeBlockTitle: 'PRODUCTION BEST PRACTICES FOR COT',
        codeBlock: `1. Use Zero-Shot CoT ("Let's think step by step") as your first baseline for logic tasks.
2. For high-stakes arithmetic or code generation, use Self-Consistency CoT with majority voting.
3. Keep reasoning steps concise to manage token costs while preserving logical integrity.
4. If an output is incorrect, inspect intermediate steps to identify whether the flaw was premise understanding, arithmetic, or conclusion synthesis.`
      }
    ],

    analogy: {
      title: 'Real-World Analogy: Mental Math vs. Showing Your Work on Paper',
      text: 'If a student tries to solve a 4-step algebra problem entirely in their head and immediately blurt out a number, they are prone to silly mental calculation errors. If the teacher instructs them to "Show your work step-by-step on paper," the student writes down intermediate values, catches arithmetic slips in real-time, and consistently arrives at the correct solution. CoT is simply showing the AI\'s work on paper!'
    },

    diagram: {
      type: 'chain_of_thought',
      title: 'Interactive Chain-of-Thought Reasoning & Architecture Lab'
    },

    takeaways: [
      'Chain-of-Thought (CoT) prompts LLMs to generate intermediate reasoning steps before arriving at a final answer.',
      'Intermediate tokens act as an active working memory scaffold in the context window for subsequent logical deductions.',
      'Zero-Shot CoT activates reasoning simply by appending "Let\'s think step by step" to the prompt.',
      'Prompt Chaining uses multiple sequential API calls, whereas CoT executes step-by-step reasoning within a single call.',
      'Self-Consistency CoT samples multiple reasoning paths and uses majority voting to achieve maximum accuracy on complex tasks.'
    ],

    quiz: {
      question: 'What is the primary difference between Prompt Chaining and Chain-of-Thought (CoT) prompting according to IBM AI engineering standards?',
      options: [
        'Prompt Chaining requires fine-tuning model weights, while CoT only works on pretrained models',
        'Prompt Chaining sequences multiple distinct API calls where outputs feed into subsequent prompts, while CoT elicits step-by-step reasoning within a single prompt',
        'Prompt Chaining is only used for Python code, while CoT is only used for math equations',
        'There is no difference; they are exact technical synonyms'
      ],
      correctIndex: 1,
      explanation: 'Spot on! CoT generates an internal step-by-step reasoning trajectory within a single prompt inference turn, whereas Prompt Chaining orchestrates multiple distinct, sequential API prompts that pass state between each other.'
    }
  },

  'ai-3-5': {
    id: 'ai-3-5',
    title: 'Structured Outputs & JSON Schema',
    subtitle: 'Guaranteed 100% Schema Reliability with Constrained Decoding & Pydantic (Humanloop Guide)',
    section: 'Module 3 · Chapter 5',
    estimatedTime: '8 min read',
    gfgUrl: 'https://humanloop.com/blog/structured-outputs',

    badgeText: 'STRUCTURED OUTPUTS / GEMINI',
    badgeColor: '#10b981',

    sections: [
      {
        heading: 'The Problem: Unreliable Free-Form Outputs',
        paragraphs: [
          'By default, Large Language Models produce unstructured, free-form text. When building production software, APIs, database pipelines, or user interfaces, applications require deterministic, machine-readable data structures such as JSON or TypedDict objects.',
          'Historically, getting LLMs to output valid JSON purely through prompt engineering ("Return only JSON: ...") was notoriously unreliable — achieving only ~35.9% format consistency on complex schemas. Models routinely added conversational preamble ("Here is your JSON:"), wrapped outputs in Markdown code fences (```json ... ```), omitted required keys, or invented unexpected fields that crashed downstream parsers.'
        ]
      },
      {
        heading: 'The Evolution: Prompting vs. JSON Mode vs. Structured Outputs',
        paragraphs: [
          'The AI industry has evolved through three distinct stages of output formatting:',
          '1. Prompt-Engineered JSON (2022): Asking the model in natural language to output JSON. High hallucination rate and requires brittle regex post-processing.',
          '2. JSON Mode (2023): Instructs the model\'s generation layer to guarantee valid JSON syntax (opening and closing brackets match). However, JSON Mode DOES NOT validate schema structure — it may still miss required fields or alter property data types.',
          '3. Structured Outputs (2024+): Guarantees 100% adherence to a provided JSON Schema or Pydantic model. If strict mode is enabled, the model mathematically cannot produce a response that deviates from your schema.'
        ],
        codeBlockTitle: 'JSON MODE VS STRUCTURED OUTPUTS COMPARISON',
        codeBlock: `# 1. JSON Mode (Syntax guaranteed, Schema NOT guaranteed):
{
  "user": "Alice",
  "score": "95"  # FAILED: String instead of Integer, omitted "id" field!
}

# 2. Structured Outputs with Strict Schema (100% Guaranteed):
{
  "id": 1042,
  "user": "Alice",
  "score": 95,
  "status": "ACTIVE"  # Guaranteed exact schema, correct types & required keys
}`
      },
      {
        heading: 'How Structured Outputs Work Under the Hood: Constrained Decoding',
        paragraphs: [
          'Standard LLMs generate text token by token by computing a probability distribution across their entire vocabulary (e.g. 100,000+ tokens).',
          'Structured Outputs use Constrained Decoding powered by Finite State Machines (FSMs) or Context-Free Grammars (CFGs). At each token step, the FSM determines which tokens in the vocabulary are syntactically and semantically valid according to the JSON Schema. Any token that would violate the schema is dynamically masked (logit probability set to -infinity), making it physically impossible for the model to emit an invalid character or hallucinated key.'
        ]
      },
      {
        heading: 'Implementing Structured Outputs in Google Gemini',
        paragraphs: [
          'Google Gemini provides first-class native SDK support for structured outputs through response_schema and response_mime_type:',
          '• Google Gemini SDK: Pass your Pydantic BaseModel or TypedDict directly into generation_config=genai.GenerationConfig(response_mime_type="application/json", response_schema=MySchema). Gemini dynamically restricts token decoding to guarantee 100% adherence to your defined schema.'
        ],
        codeBlockTitle: 'PRODUCTION PYTHON IMPLEMENTATION (PYDANTIC + GOOGLE GEMINI)',
        codeBlock: `from pydantic import BaseModel, Field
import google.generativeai as genai
import os

class CustomerTicketAnalysis(BaseModel):
    summary: str = Field(description="One-sentence executive summary of the issue")
    category: str = Field(description="Department: BILLING | TECH_SUPPORT | ACCOUNT")
    urgency_score: int = Field(ge=1, le=5, description="Urgency rating from 1 to 5")
    requires_escalation: bool

# Initialize Gemini with your API Key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        response_schema=CustomerTicketAnalysis
    )
)

response = model.generate_content("My credit card was charged $499 twice for invoice #8812.")
print(response.text)
# Guaranteed 100% compliant JSON string matching CustomerTicketAnalysis schema!`
      },
      {
        heading: 'Production Trade-offs: The Reasoning-in-Schema Pattern',
        paragraphs: [
          'While Structured Outputs eliminate formatting bugs, AI researchers (Rui Tam et al., Humanloop) discovered an important trade-off: forcing an LLM directly into a compact JSON schema can slightly reduce its multi-step reasoning performance if the model is forced to output final numbers without working space.',
          'The Production Solution (The Reasoning-in-Schema Pattern): Always include a reasoning_steps or chain_of_thought string field at the very top of your Pydantic schema. This allows the model to "think out loud" in structured fields before populating the final classification fields.'
        ],
        codeBlockTitle: 'THE REASONING-IN-SCHEMA PATTERN',
        codeBlock: `class VerifiedDecision(BaseModel):
    # Step 1: Give the LLM working memory space to reason inside the JSON
    chain_of_thought: str = Field(description="Step-by-step logical deductions")
    confidence: float = Field(ge=0.0, le=1.0)
    
    # Step 2: Final machine-readable verdict
    is_approved: bool
    action_items: list[str]`
      }
    ],

    analogy: {
      title: 'Real-World Analogy: Free-Form Paper Form vs. Strict Online Form Validation',
      text: 'Prompting for JSON without structured outputs is like giving someone a blank piece of paper and asking them to write down their tax information. They might misspell fields, skip required boxes, or write "ten" instead of the number 10. Structured Outputs is like a modern digital form with strict input masks: dropdowns only allow valid enum options, date fields enforce ISO formats, and the form physically cannot be submitted until every required field matches the exact schema!'
    },

    diagram: {
      type: 'structured_outputs',
      title: 'Interactive Structured Outputs, JSON Schema & Constrained Decoding Lab'
    },

    takeaways: [
      'Structured Outputs guarantees 100% schema reliability by enforcing JSON Schema at the token generation layer.',
      'Constrained decoding uses Finite State Machines (FSMs) to mask invalid tokens dynamically at each generation step.',
      'JSON Mode only guarantees valid JSON syntax, whereas Structured Outputs enforces exact property keys, data types, and required fields.',
      'Modern SDKs (OpenAI Pydantic parse and Gemini response_schema) directly deserialize outputs into type-safe objects.',
      'The Reasoning-in-Schema Pattern: Add a chain_of_thought field at the top of your schema to prevent reasoning degradation.'
    ],

    quiz: {
      question: 'Why is Structured Outputs superior to legacy JSON Mode when integrating LLM responses into production databases or backend APIs?',
      options: [
        'Structured Outputs permanently deletes the model weights on the server',
        'Structured Outputs enforces 100% compliance with exact property names, types, enums, and required fields, whereas JSON Mode only guarantees valid JSON syntax',
        'Structured Outputs makes API requests completely free of charge',
        'JSON Mode is 100% strict, while Structured Outputs allows random text'
      ],
      correctIndex: 1,
      explanation: 'Spot on! While legacy JSON Mode only guarantees that opening and closing brackets create valid JSON syntax, Structured Outputs uses constrained decoding to guarantee 100% strict adherence to your exact schema, types, enums, and required properties.'
    }
  },

  'ai-3-6': {
    id: 'ai-3-6',
    title: 'Iterative Prompt Refinement',
    subtitle: 'The 4-Step Engineering Cycle: Design, Test, Evaluate, Refine (IBM Think Guide)',
    section: 'Module 3 · Chapter 6',
    estimatedTime: '9 min read',
    gfgUrl: 'https://www.ibm.com/think/topics/iterative-prompting',

    badgeText: 'IBM THINK / WATSONX',
    badgeColor: '#1d4ed8',

    sections: [
      {
        heading: 'Why Prompt Engineering is a Cyclical Engineering Discipline',
        paragraphs: [
          'In production AI engineering, prompts are rarely perfect on the first attempt. Treating prompt creation as a "one-and-done" task leads to brittle systems that fail on unforeseen edge cases, drift in tone, or hallucinate facts when user inputs vary.',
          'According to IBM AI Research (watsonx), Iterative Prompting is a structured, systematic methodology that replaces guesswork with a disciplined feedback loop. By breaking development into four distinct phases—Design, Test, Evaluate, and Refine—engineers systematically converge on prompts that meet strict enterprise accuracy, latency, and compliance benchmarks.'
        ]
      },
      {
        heading: 'The 4-Phase Iterative Prompt Engineering Cycle',
        paragraphs: [
          'The IBM framework outlines four core phases in every iteration:',
          '1. Design (Baseline Formulation): Define clear roles, task objectives, input data placeholders, formatting instructions, and explicit constraints.',
          '2. Test (Execution & Sampling): Execute the prompt against a diverse test suite containing standard inputs, noisy real-world data, and adversarial edge cases.',
          '3. Evaluate (Diagnostic Analysis): Quantitatively and qualitatively measure model outputs. Track key failure modes: factual hallucination, instruction drift, schema violation, verbosity, and latency.',
          '4. Refine (Targeted Intervention): Apply surgical modifications (e.g. adding few-shot exemplars, tightening guardrails, adjusting temperature, or structuring the output) before re-testing.'
        ],
        codeBlockTitle: 'IBM ITERATIVE PROMPT CYCLE ALGORITHM',
        codeBlock: `def iterative_prompt_optimization(test_dataset, target_accuracy=0.95):
    prompt_version = 1
    current_prompt = load_initial_prompt()

    while True:
        results = evaluate_prompt(current_prompt, test_dataset)
        accuracy = results.accuracy_score
        print(f"Iteration {prompt_version}: Pass Rate = {accuracy * 100:.1f}%")

        if accuracy >= target_accuracy and results.zero_schema_errors:
            print("Convergence reached: Prompt is production-ready.")
            return current_prompt

        # Diagnose root cause of failure cases
        failure_modes = analyze_failure_modes(results.failed_samples)
        
        # Apply targeted prompt engineering levers
        current_prompt = apply_refinements(current_prompt, failure_modes)
        prompt_version += 1`
      },
      {
        heading: 'Case Study: 4 Iterations of an Enterprise IT Incident Triage Prompt',
        paragraphs: [
          'Consider an enterprise IT incident analysis prompt deployed in IBM watsonx Orchestrate:',
          '• Iteration 1 (Vague Baseline): "Analyze this server error log and tell me what is wrong." Result: Unfocused, verbose, and suggests irrelevant generic troubleshooting steps (~40% utility).',
          '• Iteration 2 (Role & Scope Grounding): Added persona ("Senior Site Reliability Engineer") and 3 structured output categories (Root Cause, Impact Severity, Action Plan). Result: Improved clarity, but format fluctuates across runs (~68% utility).',
          '• Iteration 3 (Few-Shot Exemplars & Negative Constraints): Injected 2 gold-standard log-to-incident exemplars and negative guardrails ("Do NOT suggest restarting the primary cluster"). Result: High accuracy with zero hallucinated actions (~88% utility).',
          '• Iteration 4 (Strict Structured JSON Schema & Automated CI/CD Regression): Enforced Pydantic schema with automated evaluation checks. Result: 100% reliable machine-readable dispatching ready for automated PagerDuty workflows (~99% utility).'
        ],
        codeBlockTitle: 'FOUR-STAGE PROMPT REFINEMENT PROGRESSION',
        codeBlock: `# Iteration 1 (Vague Baseline - 40% Pass Rate):
Analyze this server error log: {log_snippet}

# Iteration 2 (+ Role & Structured Checklist - 68% Pass Rate):
You are a Senior Site Reliability Engineer. Analyze {log_snippet}.
Provide: 1. Root Cause 2. Severity (LOW/HIGH/CRITICAL) 3. Next Steps.

# Iteration 3 (+ Few-Shot Exemplars & Guardrails - 88% Pass Rate):
You are a Senior SRE. Analyze the log. Follow the format of the examples below.
Constraint: Do NOT suggest manual database locks. Always verify replica health first.
[Example 1] Log -> Triage Report

# Iteration 4 (+ Structured Pydantic Schema - 99% Pass Rate):
response_format=IncidentReportSchema(strict=True)`
      },
      {
        heading: 'The 5 Core Prompt Refinement Levers',
        paragraphs: [
          'When an evaluation reveals prompt deficiencies, IBM engineers pull one of five specific refinement levers:',
          '1. The Specificity Lever: Replace ambiguous words ("summarize shortly") with exact numeric boundaries ("summarize in exactly 2 bullet points under 30 words total").',
          '2. The Context & Grounding Lever: Provide reference documents or RAG context to eliminate guesswork.',
          '3. The Few-Shot Exemplar Lever: Inject 2-3 input-output pairs that demonstrate complex edge cases.',
          '4. The Negative Constraint Lever: Explicitly list unallowed behaviors, obsolete APIs, or prohibited terms.',
          '5. The Decomposition Lever: Split an overloaded single prompt into a multi-step chain (e.g. Prompt A extracts entities, Prompt B scores risk).'
        ]
      },
      {
        heading: 'Establishing Stopping Conditions & Convergence Metrics',
        paragraphs: [
          'A common pitfall is endless subjective tweaking. Enterprise prompt engineering requires objective stopping conditions:',
          '• Quantitative Benchmark: Achieving predefined threshold metrics (e.g. >95% accuracy on an evaluation dataset of 100+ representative cases).',
          '• Deterministic Serialization: 0% schema validation errors across all test permutations.',
          '• Cost & Latency Budget: Token consumption and time-to-first-token within SLA boundaries.',
          'Once convergence is achieved, version-control the prompt artifact (e.g. prompt-v4.2.json) and integrate it into automated CI/CD evaluation pipelines.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: Sculpting a Statue from a Rough Marble Block',
      text: 'You cannot chisel a finished Renaissance masterpiece in a single strike. Iteration 1 is the rough cut that shapes the general outline. Iteration 2 carves out major anatomical features (role and structure). Iteration 3 refines the muscle contours and details (few-shot exemplars and constraints). Iteration 4 polishes the marble to perfection (strict schemas and automated evaluation). Prompt engineering is the art of deliberate, disciplined refinement!'
    },

    diagram: {
      type: 'iterative_prompting',
      title: 'Interactive Iterative Prompt Refinement & Optimization Lab'
    },

    takeaways: [
      'Iterative prompting replaces intuitive guesswork with a disciplined engineering feedback loop: Design, Test, Evaluate, Refine.',
      'Always test prompts against a diverse evaluation dataset containing edge cases and noise, not just happy-path inputs.',
      'Progressive refinement levers include specificity, role grounding, few-shot exemplars, negative constraints, and decomposition.',
      'Establish objective stopping conditions (e.g. >95% pass rate and 0% schema errors) to prevent endless subjective tweaking.',
      'Version-control prompt templates and integrate them into automated CI/CD regression suites to prevent prompt regression.'
    ],

    quiz: {
      question: 'According to IBM AI engineering methodology, what is the primary purpose of the "Evaluate" phase in the iterative prompting cycle?',
      options: [
        'To delete the model context and restart the server from scratch',
        'To diagnose specific failure modes (hallucinations, formatting drift, missing constraints) across test datasets to guide targeted prompt adjustments',
        'To increase token sampling temperature to maximum randomness',
        'To replace all prompt text with natural language translations'
      ],
      correctIndex: 1,
      explanation: 'Spot on! The Evaluate phase systematically analyzes test outputs against quality and safety benchmarks, identifying specific failure modes to inform surgical refinements rather than random guesswork.'
    }
  },

  'ai-3-7': {
    id: 'ai-3-7',
    title: 'Mini Project: Prompt Optimizer Tool',
    subtitle: 'Build a production-grade prompt evaluation and refinement engine — step by step in your browser',
    section: 'Module 3 · Mini Project',
    estimatedTime: '30 min',
    isProject: true,
    badgeText: 'CODING PROJECT',
    badgeColor: '#8b5cf6',
    videoUrl: null,
    gfgUrl: null,
    diagram: { type: 'mini_project_editor', projectId: 'prompt_optimizer' },
    projectMeta: {
      language: 'python',
      runtime: 'pyodide',
      finalTool: 'Production Prompt Optimizer & Evaluator',
      skills: ['functions', 'dictionaries', 'lists', 'f-strings', 'scoring algorithms', 'iterative refinement'],
    },
    steps: [
      {
        id: 1,
        title: 'Step 1 — Anatomy of a Well-Structured Prompt',
        concept: 'Every enterprise-grade prompt has four mandatory building blocks: a Role (who the AI is), a Task (what to do), Constraints (what NOT to do), and an Output Format (how to structure the response). Missing any one of these causes failure modes.',
        goal: 'Fill in the four TODO lines to complete the prompt_anatomy() function that breaks a prompt into its four components.',
        whyItMatters: 'Understanding prompt anatomy is the foundation of systematic prompt engineering. Without a structured template, every prompt is a one-off guess. With it, you have a repeatable framework that scales across any domain or use case.',
        starterCode: `# Step 1: Anatomy of a Well-Structured Prompt
# Every great prompt has 4 core building blocks.

def build_prompt(role, task, constraints, output_format):
    """Assemble a structured prompt from its four components."""
    
    # TODO 1: Create the role line using an f-string
    # It should look like: "ROLE: You are a {role}."
    role_line = None  # Fix this!
    
    # TODO 2: Create the task line
    # It should look like: "TASK: {task}"
    task_line = None  # Fix this!
    
    # TODO 3: Create the constraints line
    # It should look like: "CONSTRAINTS: {constraints}"
    constraints_line = None  # Fix this!
    
    # TODO 4: Create the output format line
    # It should look like: "OUTPUT FORMAT: {output_format}"
    format_line = None  # Fix this!
    
    # Join all lines with a newline separator
    return "\\n".join([role_line, task_line, constraints_line, format_line])

# Test it!
prompt = build_prompt(
    role="Senior data analyst with 10 years of experience",
    task="Analyze the following sales data and identify the top 3 revenue trends",
    constraints="Do NOT speculate beyond the data. Do NOT use jargon. Keep under 200 words.",
    output_format="Return exactly 3 bullet points, each starting with a bold trend name."
)

print(prompt)
print("\\n--- Prompt length:", len(prompt), "characters ---")`,
        hints: [
          'An f-string looks like: f"ROLE: You are a {role}."',
          'For role_line: role_line = f"ROLE: You are a {role}."',
          'For task_line: task_line = f"TASK: {task}"',
          'For constraints_line: constraints_line = f"CONSTRAINTS: {constraints}"',
          'For format_line: format_line = f"OUTPUT FORMAT: {output_format}"',
        ],
        solutionCode: `def build_prompt(role, task, constraints, output_format):
    role_line = f"ROLE: You are a {role}."
    task_line = f"TASK: {task}"
    constraints_line = f"CONSTRAINTS: {constraints}"
    format_line = f"OUTPUT FORMAT: {output_format}"
    return "\\n".join([role_line, task_line, constraints_line, format_line])

prompt = build_prompt(
    role="Senior data analyst with 10 years of experience",
    task="Analyze the following sales data and identify the top 3 revenue trends",
    constraints="Do NOT speculate beyond the data. Do NOT use jargon. Keep under 200 words.",
    output_format="Return exactly 3 bullet points, each starting with a bold trend name."
)
print(prompt)
print("\\n--- Prompt length:", len(prompt), "characters ---")`,
        expectedOutputContains: 'ROLE: You are a',
        conceptCallout: 'This four-part structure (Role, Task, Constraints, Output Format) maps directly to IBM\'s enterprise prompt design framework and is the foundation of every well-engineered production prompt.',
      },
      {
        id: 2,
        title: 'Step 2 — Detect Prompt Weaknesses with a Scorer',
        concept: 'A prompt scorer is a diagnostic function that evaluates a prompt\'s quality by checking for the presence of key engineering signals: role grounding, specificity, output constraints, negative guardrails, and few-shot examples.',
        goal: 'Fix the five None values inside score_prompt() so it correctly awards points for each quality signal.',
        whyItMatters: 'Manual eyeballing of prompts does not scale. A quantitative scorer lets you programmatically evaluate hundreds of prompt variants, track improvements across iterations, and set a minimum quality gate before deployment.',
        starterCode: `# Step 2: Prompt Quality Scorer
# We award points for each engineering best-practice present in the prompt.

def score_prompt(prompt_text):
    """Score a prompt 0-100 based on engineering best practices."""
    prompt_lower = prompt_text.lower()
    score = 0
    feedback = []

    # Check 1: Does it define a role? (20 points)
    has_role = "you are" in prompt_lower or "act as" in prompt_lower or "role:" in prompt_lower
    # TODO 1: Add 20 to score if has_role is True
    if has_role:
        score += None  # Fix this! Should be 20
        feedback.append("[PASS] Role definition found (+20 pts)")
    else:
        feedback.append("[FAIL] No role defined. Add 'You are a [expert]...' (-20 pts)")

    # Check 2: Is there a specific task? (20 points)
    has_task = len(prompt_text.split()) > 15  # More than 15 words = specific enough
    # TODO 2: Add 20 to score if has_task is True
    if has_task:
        score += None  # Fix this! Should be 20
        feedback.append("[PASS] Task is specific enough (+20 pts)")
    else:
        feedback.append("[FAIL] Prompt is too vague or short. Add more detail (-20 pts)")

    # Check 3: Does it have output format instructions? (20 points)
    has_format = any(w in prompt_lower for w in ["bullet", "list", "json", "table", "format", "structure", "return"])
    # TODO 3: Add 20 to score if has_format is True
    if has_format:
        score += None  # Fix this! Should be 20
        feedback.append("[PASS] Output format specified (+20 pts)")
    else:
        feedback.append("[FAIL] No output format. Specify 'Return as JSON' or 'Use bullet points' (-20 pts)")

    # Check 4: Are there negative constraints? (20 points)
    has_constraints = any(w in prompt_lower for w in ["do not", "don't", "avoid", "never", "without", "constraint"])
    # TODO 4: Add 20 to score if has_constraints is True
    if has_constraints:
        score += None  # Fix this! Should be 20
        feedback.append("[PASS] Negative constraints found (+20 pts)")
    else:
        feedback.append("[FAIL] No guardrails. Add 'Do NOT...' constraints (-20 pts)")

    # Check 5: Are there few-shot examples? (20 points)
    has_examples = any(w in prompt_lower for w in ["example", "for instance", "e.g.", "input:", "output:", "sample"])
    # TODO 5: Add 20 to score if has_examples is True
    if has_examples:
        score += None  # Fix this! Should be 20
        feedback.append("[PASS] Few-shot examples detected (+20 pts)")
    else:
        feedback.append("[WARN] No examples provided. Consider adding 1-2 input/output pairs (-20 pts)")

    return score, feedback

# Test with a weak prompt
weak_prompt = "Write a summary of this article."
score, feedback = score_prompt(weak_prompt)
print(f"Prompt: '{weak_prompt}'")
print(f"Quality Score: {score}/100\\n")
for line in feedback:
    print(line)`,
        hints: [
          'Each TODO is the same pattern — just replace None with the number of points for that check.',
          'Check 1 awards 20 points: score += 20',
          'All five checks award 20 points each, so a perfect prompt scores 100.',
        ],
        solutionCode: `def score_prompt(prompt_text):
    prompt_lower = prompt_text.lower()
    score = 0
    feedback = []
    has_role = "you are" in prompt_lower or "act as" in prompt_lower or "role:" in prompt_lower
    if has_role:
        score += 20
        feedback.append("[PASS] Role definition found (+20 pts)")
    else:
        feedback.append("[FAIL] No role defined. Add 'You are a [expert]...' (-20 pts)")
    has_task = len(prompt_text.split()) > 15
    if has_task:
        score += 20
        feedback.append("[PASS] Task is specific enough (+20 pts)")
    else:
        feedback.append("[FAIL] Prompt is too vague or short. Add more detail (-20 pts)")
    has_format = any(w in prompt_lower for w in ["bullet", "list", "json", "table", "format", "structure", "return"])
    if has_format:
        score += 20
        feedback.append("[PASS] Output format specified (+20 pts)")
    else:
        feedback.append("[FAIL] No output format. Specify 'Return as JSON' or 'Use bullet points' (-20 pts)")
    has_constraints = any(w in prompt_lower for w in ["do not", "don't", "avoid", "never", "without", "constraint"])
    if has_constraints:
        score += 20
        feedback.append("[PASS] Negative constraints found (+20 pts)")
    else:
        feedback.append("[FAIL] No guardrails. Add 'Do NOT...' constraints (-20 pts)")
    has_examples = any(w in prompt_lower for w in ["example", "for instance", "e.g.", "input:", "output:", "sample"])
    if has_examples:
        score += 20
        feedback.append("[PASS] Few-shot examples detected (+20 pts)")
    else:
        feedback.append("[WARN] No examples provided. Consider adding 1-2 input/output pairs (-20 pts)")
    return score, feedback

weak_prompt = "Write a summary of this article."
score, feedback = score_prompt(weak_prompt)
print(f"Prompt: '{weak_prompt}'")
print(f"Quality Score: {score}/100\\n")
for line in feedback:
    print(line)`,
        expectedOutputContains: 'Quality Score: 0/100',
        conceptCallout: 'This scorer mimics what enterprise "LLM-as-a-Judge" systems do automatically. Tools like promptfoo, OpenAI Evals, and IBM watsonx.governance use quantitative rubrics exactly like this to gate prompt quality before production deployment.',
      },
      {
        id: 3,
        title: 'Step 3 — Auto-Refine a Weak Prompt',
        concept: 'A prompt refiner automatically detects which quality signals are missing from a weak baseline prompt and surgically injects the missing components — role grounding, output format, constraints — without changing the user\'s original intent.',
        goal: 'Fix the three TODO lines inside auto_refine() to append the correct improvement strings when each check fails.',
        whyItMatters: 'This is the "Refine" phase of IBM\'s 4-step iterative cycle, automated in code. In production systems, LLM-as-a-Judge pipelines use this approach to auto-correct user prompts before they hit the main model, reducing API retry costs.',
        starterCode: `# Step 3: Automatic Prompt Refiner
# Detects weaknesses and injects fixes automatically.

def auto_refine(prompt_text, domain="general"):
    """Auto-improve a prompt by injecting missing engineering components."""
    prompt_lower = prompt_text.lower()
    improvements = []
    refined = prompt_text.strip()

    # Fix 1: Inject a role if missing
    has_role = "you are" in prompt_lower or "act as" in prompt_lower
    if not has_role:
        role_prefix = f"You are an expert {domain} specialist. "
        # TODO 1: Set refined = role_prefix + refined  (prepend the role to the prompt)
        refined = None  # Fix this!
        improvements.append(f"+ Injected role: 'Expert {domain} specialist'")

    # Fix 2: Inject output format if missing
    has_format = any(w in prompt_lower for w in ["bullet", "list", "json", "format", "return", "structure"])
    if not has_format:
        format_suffix = " Return your answer as a numbered list with a maximum of 5 items."
        # TODO 2: Set refined = refined + format_suffix  (append the format to the prompt)
        refined = None  # Fix this!
        improvements.append("+ Injected output format: numbered list, max 5 items")

    # Fix 3: Inject a constraint if missing
    has_constraint = any(w in prompt_lower for w in ["do not", "don't", "avoid", "never"])
    if not has_constraint:
        constraint_suffix = " Do NOT speculate or add information not present in the input."
        # TODO 3: Set refined = refined + constraint_suffix
        refined = None  # Fix this!
        improvements.append("+ Injected guardrail: no speculation beyond input data")

    return refined, improvements

# Test: refine a weak prompt
original = "Explain machine learning to me."
refined, improvements = auto_refine(original, domain="AI/ML")

print("ORIGINAL PROMPT:")
print(f"  '{original}'")
print("\\nREFINED PROMPT:")
print(f"  '{refined}'")
print("\\nIMPROVEMENTS APPLIED:")
for imp in improvements:
    print(f"  {imp}")`,
        hints: [
          'TODO 1: You want to ADD the role at the FRONT. Use: refined = role_prefix + refined',
          'TODO 2: You want to ADD the format at the END. Use: refined = refined + format_suffix',
          'TODO 3: Same pattern — append to end: refined = refined + constraint_suffix',
        ],
        solutionCode: `def auto_refine(prompt_text, domain="general"):
    prompt_lower = prompt_text.lower()
    improvements = []
    refined = prompt_text.strip()
    has_role = "you are" in prompt_lower or "act as" in prompt_lower
    if not has_role:
        role_prefix = f"You are an expert {domain} specialist. "
        refined = role_prefix + refined
        improvements.append(f"+ Injected role: 'Expert {domain} specialist'")
    has_format = any(w in prompt_lower for w in ["bullet", "list", "json", "format", "return", "structure"])
    if not has_format:
        format_suffix = " Return your answer as a numbered list with a maximum of 5 items."
        refined = refined + format_suffix
        improvements.append("+ Injected output format: numbered list, max 5 items")
    has_constraint = any(w in prompt_lower for w in ["do not", "don't", "avoid", "never"])
    if not has_constraint:
        constraint_suffix = " Do NOT speculate or add information not present in the input."
        refined = refined + constraint_suffix
        improvements.append("+ Injected guardrail: no speculation beyond input data")
    return refined, improvements

original = "Explain machine learning to me."
refined, improvements = auto_refine(original, domain="AI/ML")
print("ORIGINAL PROMPT:")
print(f"  '{original}'")
print("\\nREFINED PROMPT:")
print(f"  '{refined}'")
print("\\nIMPROVEMENTS APPLIED:")
for imp in improvements:
    print(f"  {imp}")`,
        expectedOutputContains: 'IMPROVEMENTS APPLIED',
        conceptCallout: 'Automated prompt refiners are used in agentic AI systems (like LangChain, AutoGPT, and watsonx Orchestrate) to silently improve user-written prompts before forwarding them to the underlying model — completely transparently.',
      },
      {
        id: 4,
        title: 'Step 4 — Build a Few-Shot Exemplar Injector',
        concept: 'Few-shot prompting (in-context learning) dramatically improves model accuracy by showing 2-3 concrete input-output examples inside the prompt. An exemplar injector programmatically formats and prepends these examples to any base prompt.',
        goal: 'Fix the one TODO inside format_exemplar() to assemble each example in the correct INPUT / OUTPUT format.',
        whyItMatters: 'Few-shot injection is one of the highest-ROI prompt engineering techniques. Studies show adding just 3 well-chosen exemplars can increase task accuracy by 20-40% without any model fine-tuning or extra API cost.',
        starterCode: `# Step 4: Few-Shot Exemplar Injector
# Adds concrete input/output examples to a base prompt.

def format_exemplar(input_text, output_text, index):
    """Format a single few-shot example pair."""
    # TODO: Return a multi-line string in this exact format:
    #   Example {index}:
    #   Input: {input_text}
    #   Output: {output_text}
    # Hint: use a triple-quoted f-string or \\n to join the lines
    return None  # Fix this!

def inject_few_shot(base_prompt, examples):
    """Prepend formatted exemplars to a base prompt."""
    if not examples:
        return base_prompt
    
    header = "--- FEW-SHOT EXAMPLES (follow this exact format) ---"
    formatted = [format_exemplar(ex["input"], ex["output"], i + 1)
                 for i, ex in enumerate(examples)]
    separator = "--- END EXAMPLES. Now process the actual input below. ---"
    
    return header + "\\n" + "\\n".join(formatted) + "\\n" + separator + "\\n\\n" + base_prompt

# Test it with a sentiment classifier
base = "You are a sentiment analyst. Classify the following customer review as POSITIVE, NEGATIVE, or NEUTRAL."
examples = [
    {"input": "The delivery was super fast and the product works perfectly!",
     "output": "POSITIVE"},
    {"input": "Item arrived broken and customer service never responded.",
     "output": "NEGATIVE"},
    {"input": "Package arrived on time. Product is okay.",
     "output": "NEUTRAL"},
]

final_prompt = inject_few_shot(base, examples)
print(final_prompt)`,
        hints: [
          'You need to return a string with three lines joined by newline characters.',
          'Use an f-string with \\n: return f"Example {index}:\\nInput: {input_text}\\nOutput: {output_text}"',
          'Make sure each line label matches exactly: "Example", "Input:", "Output:"',
        ],
        solutionCode: `def format_exemplar(input_text, output_text, index):
    return f"Example {index}:\\nInput: {input_text}\\nOutput: {output_text}"

def inject_few_shot(base_prompt, examples):
    if not examples:
        return base_prompt
    header = "--- FEW-SHOT EXAMPLES (follow this exact format) ---"
    formatted = [format_exemplar(ex["input"], ex["output"], i + 1)
                 for i, ex in enumerate(examples)]
    separator = "--- END EXAMPLES. Now process the actual input below. ---"
    return header + "\\n" + "\\n".join(formatted) + "\\n" + separator + "\\n\\n" + base_prompt

base = "You are a sentiment analyst. Classify the following customer review as POSITIVE, NEGATIVE, or NEUTRAL."
examples = [
    {"input": "The delivery was super fast and the product works perfectly!", "output": "POSITIVE"},
    {"input": "Item arrived broken and customer service never responded.", "output": "NEGATIVE"},
    {"input": "Package arrived on time. Product is okay.", "output": "NEUTRAL"},
]
final_prompt = inject_few_shot(base, examples)
print(final_prompt)`,
        expectedOutputContains: 'Example 1:',
        conceptCallout: 'The order of your examples matters. Research from Zhao et al. (2021) shows placing the most representative example LAST (closest to the actual query) produces the highest accuracy — a technique called "proximity ordering".',
      },
      {
        id: 5,
        title: 'Step 5 — Run the Iterative Evaluation Loop',
        concept: 'The evaluation loop is the core of the IBM 4-step iterative cycle. It tests a prompt against a dataset of ground-truth test cases, computes a pass rate, and returns a diagnostic report identifying which test cases failed and why.',
        goal: 'Fix the two TODO lines — one to record a PASS, one to record a FAIL — so the evaluator correctly tracks results.',
        whyItMatters: 'Without a structured evaluation loop, prompt "improvement" is subjective guesswork. A quantitative eval suite with ground-truth labels is the only way to know if Iteration 3 is genuinely better than Iteration 2 — or just differently wrong.',
        starterCode: `# Step 5: Iterative Evaluation Loop
# Tests a prompt template against a labeled dataset of test cases.

def evaluate_prompt(prompt_template, test_cases, model_output_fn):
    """
    Evaluate a prompt against test cases.
    prompt_template: string with {input} placeholder
    test_cases: list of {"input": ..., "expected": ...} dicts
    model_output_fn: function(prompt) -> response string (simulated here)
    """
    results = []
    passed = 0
    failed = 0

    for i, case in enumerate(test_cases):
        filled_prompt = prompt_template.replace("{input}", case["input"])
        actual_output = model_output_fn(filled_prompt)
        
        # Check if expected answer appears in the output
        is_correct = case["expected"].upper() in actual_output.upper()
        
        if is_correct:
            # TODO 1: Increment passed by 1
            passed = None  # Fix this!
            results.append({"case": i+1, "status": "PASS", "input": case["input"],
                            "expected": case["expected"], "got": actual_output})
        else:
            # TODO 2: Increment failed by 1
            failed = None  # Fix this!
            results.append({"case": i+1, "status": "FAIL", "input": case["input"],
                            "expected": case["expected"], "got": actual_output})

    total = len(test_cases)
    pass_rate = (passed / total) * 100 if total > 0 else 0
    return {"pass_rate": round(pass_rate, 1), "passed": passed, "failed": failed, "results": results}

# Simulated model (in real code this calls OpenAI/Gemini API)
def simulated_model(prompt):
    if "fast" in prompt or "perfect" in prompt or "love" in prompt:
        return "POSITIVE"
    if "broken" in prompt or "terrible" in prompt or "never" in prompt:
        return "NEGATIVE"
    return "NEUTRAL"

prompt_v1 = "Classify this review as POSITIVE, NEGATIVE, or NEUTRAL: {input}"
test_dataset = [
    {"input": "Delivery was super fast!", "expected": "POSITIVE"},
    {"input": "Product arrived broken.", "expected": "NEGATIVE"},
    {"input": "It arrived on time.", "expected": "NEUTRAL"},
    {"input": "I love this product!", "expected": "POSITIVE"},
    {"input": "Terrible quality, never buying again.", "expected": "NEGATIVE"},
]

report = evaluate_prompt(prompt_v1, test_dataset, simulated_model)
print(f"Pass Rate: {report['pass_rate']}% ({report['passed']}/{report['passed']+report['failed']} passed)\\n")
for r in report["results"]:
    print(f"  Case {r['case']}: {r['status']} | Expected: {r['expected']} | Got: {r['got']}")`,
        hints: [
          'TODO 1: passed needs to go up by 1. Use: passed = passed + 1  (or the shorthand: passed += 1)',
          'TODO 2: Same pattern for failed: failed = failed + 1',
          'In Python, +=1 is a shortcut for variable = variable + 1',
        ],
        solutionCode: `def evaluate_prompt(prompt_template, test_cases, model_output_fn):
    results = []
    passed = 0
    failed = 0
    for i, case in enumerate(test_cases):
        filled_prompt = prompt_template.replace("{input}", case["input"])
        actual_output = model_output_fn(filled_prompt)
        is_correct = case["expected"].upper() in actual_output.upper()
        if is_correct:
            passed += 1
            results.append({"case": i+1, "status": "PASS", "input": case["input"],
                            "expected": case["expected"], "got": actual_output})
        else:
            failed += 1
            results.append({"case": i+1, "status": "FAIL", "input": case["input"],
                            "expected": case["expected"], "got": actual_output})
    total = len(test_cases)
    pass_rate = (passed / total) * 100 if total > 0 else 0
    return {"pass_rate": round(pass_rate, 1), "passed": passed, "failed": failed, "results": results}

def simulated_model(prompt):
    if "fast" in prompt or "perfect" in prompt or "love" in prompt:
        return "POSITIVE"
    if "broken" in prompt or "terrible" in prompt or "never" in prompt:
        return "NEGATIVE"
    return "NEUTRAL"

prompt_v1 = "Classify this review as POSITIVE, NEGATIVE, or NEUTRAL: {input}"
test_dataset = [
    {"input": "Delivery was super fast!", "expected": "POSITIVE"},
    {"input": "Product arrived broken.", "expected": "NEGATIVE"},
    {"input": "It arrived on time.", "expected": "NEUTRAL"},
    {"input": "I love this product!", "expected": "POSITIVE"},
    {"input": "Terrible quality, never buying again.", "expected": "NEGATIVE"},
]
report = evaluate_prompt(prompt_v1, test_dataset, simulated_model)
print(f"Pass Rate: {report['pass_rate']}% ({report['passed']}/{report['passed']+report['failed']} passed)\\n")
for r in report["results"]:
    print(f"  Case {r['case']}: {r['status']} | Expected: {r['expected']} | Got: {r['got']}")`,
        expectedOutputContains: 'Pass Rate:',
        conceptCallout: 'A 60-80% pass rate on iteration 1 is normal. The goal is not perfection immediately — it is identifying exactly WHICH cases fail so you can apply targeted refinements in the next iteration.',
      },
      {
        id: 6,
        title: 'Step 6 — Assemble the Full Prompt Optimizer Engine',
        concept: 'Combine all five modules into a complete Production Prompt Optimizer: it takes any raw user prompt, scores it, auto-refines it, injects few-shot examples, runs an evaluation loop, and prints a full diagnostic report — all in one call.',
        goal: 'Find the one commented-out line (starts with # print) and uncomment it to activate the final quality gate check in the report.',
        whyItMatters: 'This is the exact architecture used in production AI systems like IBM watsonx.governance and Anthropic\'s Constitutional AI — a prompt quality pipeline that automatically gates, refines, and evaluates before any token hits the deployed model.',
        starterCode: `# Step 6: Full Production Prompt Optimizer
# Combines all 5 modules into a single pipeline.
import math, string

def score_prompt(prompt_text):
    p = prompt_text.lower()
    score = 0
    flags = []
    if "you are" in p or "act as" in p: score += 20; flags.append("[PASS] Role defined")
    else: flags.append("[FAIL] No role")
    if len(prompt_text.split()) > 15: score += 20; flags.append("[PASS] Task specific")
    else: flags.append("[FAIL] Too vague")
    if any(w in p for w in ["bullet","list","json","format","return"]): score += 20; flags.append("[PASS] Format specified")
    else: flags.append("[FAIL] No output format")
    if any(w in p for w in ["do not","don't","avoid","never"]): score += 20; flags.append("[PASS] Constraints present")
    else: flags.append("[FAIL] No constraints")
    if any(w in p for w in ["example","e.g.","input:","output:","sample"]): score += 20; flags.append("[PASS] Examples present")
    else: flags.append("[WARN] No examples")
    return score, flags

def auto_refine(prompt_text, domain="general"):
    p = prompt_text.lower(); refined = prompt_text.strip(); improvements = []
    if "you are" not in p and "act as" not in p:
        refined = f"You are an expert {domain} specialist. " + refined
        improvements.append(f"Injected role: {domain} specialist")
    if not any(w in p for w in ["bullet","list","json","format","return"]):
        refined += " Return your answer as a numbered list, max 5 items."
        improvements.append("Injected output format: numbered list")
    if not any(w in p for w in ["do not","don't","avoid","never"]):
        refined += " Do NOT speculate or fabricate information."
        improvements.append("Injected guardrail: no speculation")
    return refined, improvements

def inject_few_shot(base_prompt, examples):
    if not examples: return base_prompt
    parts = ["--- FEW-SHOT EXAMPLES ---"]
    for i, ex in enumerate(examples):
        parts.append(f"Example {i+1}:\\nInput: {ex['input']}\\nOutput: {ex['output']}")
    parts.append("--- END EXAMPLES ---\\n")
    return "\\n".join(parts) + "\\n" + base_prompt

def evaluate_prompt(prompt_template, test_cases, model_fn):
    passed = 0; results = []
    for i, case in enumerate(test_cases):
        out = model_fn(prompt_template.replace("{input}", case["input"]))
        ok = case["expected"].upper() in out.upper()
        if ok: passed += 1
        results.append({"case": i+1, "status": "PASS" if ok else "FAIL",
                        "expected": case["expected"], "got": out})
    rate = round((passed / len(test_cases)) * 100, 1) if test_cases else 0
    return {"pass_rate": rate, "passed": passed, "failed": len(test_cases)-passed, "results": results}

def simulated_model(prompt):
    p = prompt.lower()
    if any(w in p for w in ["fast","great","love","perfect","excellent"]): return "POSITIVE"
    if any(w in p for w in ["broken","terrible","never","awful","refund"]): return "NEGATIVE"
    return "NEUTRAL"

# =============================================
#  FULL PROMPT OPTIMIZER PIPELINE
# =============================================
def optimize_prompt(raw_prompt, domain, examples, test_cases):
    print("=" * 60)
    print("  PRODUCTION PROMPT OPTIMIZER REPORT")
    print("=" * 60)

    # Phase 1: Score the original
    original_score, flags = score_prompt(raw_prompt)
    print(f"\\n[1] BASELINE QUALITY SCORE: {original_score}/100")
    for f in flags: print(f"    {f}")

    # Phase 2: Auto-refine
    refined, improvements = auto_refine(raw_prompt, domain)
    refined_score, _ = score_prompt(refined)
    print(f"\\n[2] AUTO-REFINEMENT APPLIED ({len(improvements)} fixes):")
    for imp in improvements: print(f"    + {imp}")
    print(f"    New score: {refined_score}/100")

    # Phase 3: Inject few-shot examples
    final_prompt = inject_few_shot(refined + " {input}", examples)
    final_score, _ = score_prompt(final_prompt)
    print(f"\\n[3] FEW-SHOT EXAMPLES INJECTED: {len(examples)} examples added")

    # Phase 4: Evaluate
    report = evaluate_prompt(final_prompt, test_cases, simulated_model)
    print(f"\\n[4] EVALUATION RESULTS: {report['pass_rate']}% pass rate ({report['passed']}/{len(test_cases)} cases)")
    for r in report["results"]:
        print(f"    Case {r['case']}: {r['status']} (expected {r['expected']}, got {r['got']})")

    # Phase 5: Final quality gate
    print("\\n[5] FINAL QUALITY GATE:")
    # TODO: Remove the # from the start of the next line to activate the gate check
    # print(f"    {'PRODUCTION READY' if report['pass_rate'] >= 80 else 'NEEDS MORE ITERATION'} — Pass Rate: {report['pass_rate']}%")
    print("=" * 60)

# === Run the optimizer ===
raw = "Classify customer reviews."
examples = [
    {"input": "Arrived fast, works great!", "output": "POSITIVE"},
    {"input": "Broken on arrival, awful support.", "output": "NEGATIVE"},
]
tests = [
    {"input": "I love this product so much!", "expected": "POSITIVE"},
    {"input": "Terrible, want a refund.", "expected": "NEGATIVE"},
    {"input": "It came in the mail.", "expected": "NEUTRAL"},
]

optimize_prompt(raw, domain="customer service", examples=examples, test_cases=tests)`,
        hints: [
          'Find the line that starts with # print(f"    {\'PRODUCTION READY\'...',
          'Remove the # and the space after it to uncomment the line.',
          'After fixing it, try changing the raw prompt at the bottom and re-run to see different results!',
        ],
        solutionCode: `import math, string

def score_prompt(prompt_text):
    p = prompt_text.lower(); score = 0; flags = []
    if "you are" in p or "act as" in p: score += 20; flags.append("[PASS] Role defined")
    else: flags.append("[FAIL] No role")
    if len(prompt_text.split()) > 15: score += 20; flags.append("[PASS] Task specific")
    else: flags.append("[FAIL] Too vague")
    if any(w in p for w in ["bullet","list","json","format","return"]): score += 20; flags.append("[PASS] Format specified")
    else: flags.append("[FAIL] No output format")
    if any(w in p for w in ["do not","don't","avoid","never"]): score += 20; flags.append("[PASS] Constraints present")
    else: flags.append("[FAIL] No constraints")
    if any(w in p for w in ["example","e.g.","input:","output:","sample"]): score += 20; flags.append("[PASS] Examples present")
    else: flags.append("[WARN] No examples")
    return score, flags

def auto_refine(prompt_text, domain="general"):
    p = prompt_text.lower(); refined = prompt_text.strip(); improvements = []
    if "you are" not in p and "act as" not in p:
        refined = f"You are an expert {domain} specialist. " + refined
        improvements.append(f"Injected role: {domain} specialist")
    if not any(w in p for w in ["bullet","list","json","format","return"]):
        refined += " Return your answer as a numbered list, max 5 items."
        improvements.append("Injected output format: numbered list")
    if not any(w in p for w in ["do not","don't","avoid","never"]):
        refined += " Do NOT speculate or fabricate information."
        improvements.append("Injected guardrail: no speculation")
    return refined, improvements

def inject_few_shot(base_prompt, examples):
    if not examples: return base_prompt
    parts = ["--- FEW-SHOT EXAMPLES ---"]
    for i, ex in enumerate(examples):
        parts.append(f"Example {i+1}:\\nInput: {ex['input']}\\nOutput: {ex['output']}")
    parts.append("--- END EXAMPLES ---\\n")
    return "\\n".join(parts) + "\\n" + base_prompt

def evaluate_prompt(prompt_template, test_cases, model_fn):
    passed = 0; results = []
    for i, case in enumerate(test_cases):
        out = model_fn(prompt_template.replace("{input}", case["input"]))
        ok = case["expected"].upper() in out.upper()
        if ok: passed += 1
        results.append({"case": i+1, "status": "PASS" if ok else "FAIL",
                        "expected": case["expected"], "got": out})
    rate = round((passed / len(test_cases)) * 100, 1) if test_cases else 0
    return {"pass_rate": rate, "passed": passed, "failed": len(test_cases)-passed, "results": results}

def simulated_model(prompt):
    p = prompt.lower()
    if any(w in p for w in ["fast","great","love","perfect","excellent"]): return "POSITIVE"
    if any(w in p for w in ["broken","terrible","never","awful","refund"]): return "NEGATIVE"
    return "NEUTRAL"

def optimize_prompt(raw_prompt, domain, examples, test_cases):
    print("=" * 60)
    print("  PRODUCTION PROMPT OPTIMIZER REPORT")
    print("=" * 60)
    original_score, flags = score_prompt(raw_prompt)
    print(f"\\n[1] BASELINE QUALITY SCORE: {original_score}/100")
    for f in flags: print(f"    {f}")
    refined, improvements = auto_refine(raw_prompt, domain)
    refined_score, _ = score_prompt(refined)
    print(f"\\n[2] AUTO-REFINEMENT APPLIED ({len(improvements)} fixes):")
    for imp in improvements: print(f"    + {imp}")
    print(f"    New score: {refined_score}/100")
    final_prompt = inject_few_shot(refined + " {input}", examples)
    print(f"\\n[3] FEW-SHOT EXAMPLES INJECTED: {len(examples)} examples added")
    report = evaluate_prompt(final_prompt, test_cases, simulated_model)
    print(f"\\n[4] EVALUATION RESULTS: {report['pass_rate']}% pass rate ({report['passed']}/{len(test_cases)} cases)")
    for r in report["results"]:
        print(f"    Case {r['case']}: {r['status']} (expected {r['expected']}, got {r['got']})")
    print("\\n[5] FINAL QUALITY GATE:")
    print(f"    {'PRODUCTION READY' if report['pass_rate'] >= 80 else 'NEEDS MORE ITERATION'} - Pass Rate: {report['pass_rate']}%")
    print("=" * 60)

raw = "Classify customer reviews."
examples = [
    {"input": "Arrived fast, works great!", "output": "POSITIVE"},
    {"input": "Broken on arrival, awful support.", "output": "NEGATIVE"},
]
tests = [
    {"input": "I love this product so much!", "expected": "POSITIVE"},
    {"input": "Terrible, want a refund.", "expected": "NEGATIVE"},
    {"input": "It came in the mail.", "expected": "NEUTRAL"},
]
optimize_prompt(raw, domain="customer service", examples=examples, test_cases=tests)`,
        expectedOutputContains: 'PRODUCTION PROMPT OPTIMIZER REPORT',
        conceptCallout: 'Congratulations! You have built a complete Production Prompt Optimizer from scratch — the same architecture powering enterprise AI systems. Try changing the raw prompt variable at the bottom to test any domain. This tool is genuinely useful for evaluating prompts before you spend real API credits.',
      },
    ],
  },

  'ai-4-1': {
    id: 'ai-4-1',
    title: 'What is an AI API?',
    subtitle: 'How Modern Applications Connect to Frontier LLMs via REST, JSON & Stateless Protocols',
    section: 'Module 4 · Chapter 1',
    estimatedTime: '8 min read',
    gfgUrl: 'https://www.ibm.com/think/topics/rest-apis',

    badgeText: 'AI API FUNDAMENTALS',
    badgeColor: '#0284c7',

    sections: [
      {
        heading: 'From Supercomputers to a Single HTTP Request',
        paragraphs: [
          'Frontier Large Language Models (such as GPT-4o, Claude 3.5 Sonnet, or Gemini 1.5 Pro) are massive neural networks with hundreds of billions of parameters. Running or fine-tuning them locally requires specialized server clusters equipped with multi-million-dollar H100/A100 GPU arrays, complex model parallelism, and liquid-cooled data centers.',
          'An AI API (Application Programming Interface) abstracts away all this infrastructure complexity. It provides a standardized programmatic gateway over the public internet, allowing any web app, mobile device, or backend service to tap into state-of-the-art artificial intelligence by sending a lightweight HTTP request and receiving a structured response in milliseconds.'
        ]
      },
      {
        heading: 'The Anatomy of an AI API Request',
        paragraphs: [
          'Almost all modern AI APIs follow the REST (Representational State Transfer) architectural pattern over HTTPS. An AI API call consists of four core components:',
          '1. The Endpoint URL: The specific network address exposed by the provider (e.g. https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent).',
          '2. The HTTP Method: Almost always POST, because you are sending a payload containing instructions and input data to generate a new completion.',
          '3. Request Headers: Metadata that authenticates and describes the transmission. This includes x-goog-api-key: <key> and Content-Type: application/json.',
          '4. The JSON Body (Payload): A structured dictionary specifying the model contents array, systemInstruction, and hyperparameters (such as temperature, maxOutputTokens, and response_mime_type).'
        ],
        codeBlockTitle: 'RAW REST HTTP REQUEST VS PYTHON SDK CALL (GOOGLE GEMINI)',
        codeBlock: `# 1. Raw HTTP Request (as sent over the wire to Gemini endpoint):
POST /v1beta/models/gemini-1.5-pro:generateContent HTTP/1.1
Host: generativelanguage.googleapis.com
x-goog-api-key: AIzaSyD94kK2801nLq...
Content-Type: application/json

{
  "contents": [
    {
      "role": "user",
      "parts": [{"text": "Calculate the compound interest on $10,000 at 7% over 5 years."}]
    }
  ],
  "systemInstruction": {
    "parts": [{"text": "You are an expert financial analyst."}]
  },
  "generationConfig": {
    "temperature": 0.2,
    "maxOutputTokens": 200
  }
}

# 2. Equivalent Google Gemini Python SDK Implementation:
import google.generativeai as genai
import os

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    system_instruction="You are an expert financial analyst."
)

response = model.generate_content(
    "Calculate the compound interest on $10,000 at 7% over 5 years.",
    generation_config=genai.GenerationConfig(temperature=0.2, max_output_tokens=200)
)
print(response.text)`
      },
      {
        heading: 'Statelessness: Why the Model Does Not Remember You',
        paragraphs: [
          'A fundamental architectural principle of AI APIs is that they are entirely stateless. The remote AI server retains zero memory of previous requests once a connection terminates.',
          'If a user sends "Hi, my name is Alex" in Request 1, and then sends "What is my name?" in Request 2, the model will have no idea who they are unless the client application explicitly re-sends the entire preceding conversation history inside the contents / messages array.',
          'This stateless design is deliberate: it allows cloud providers to load-balance millions of concurrent requests dynamically across tens of thousands of GPUs without needing sticky sessions or synchronized server-side memory caches.'
        ]
      },
      {
        heading: 'The Anatomy of an AI API Response & HTTP Status Codes',
        paragraphs: [
          'When the model finishes generating tokens, the API server sends back a JSON response containing the generated text, metadata, and token accounting statistics.',
          'Key response fields include candidates (the generated completion parts and finishReason), and usageMetadata (exact count of promptTokenCount, candidatesTokenCount, and totalTokenCount used for billing).',
          'Production applications must inspect HTTP status codes to handle failures gracefully:',
          '• 200 OK: Request succeeded and complete completion generated.',
          '• 400 Bad Request: Malformed JSON syntax or invalid parameter values.',
          '• 401 / 403 Unauthorized: Invalid, expired, or missing API secret key.',
          '• 429 Too Many Requests: Rate limit exceeded (Requests Per Minute or Tokens Per Minute) or quota depleted.',
          '• 500 / 503 Server Error: Cloud provider infrastructure timeout or GPU capacity bottleneck.'
        ],
        codeBlockTitle: 'STANDARD GEMINI JSON RESPONSE PAYLOAD',
        codeBlock: `{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "At a 7% annual interest rate compounded annually, $10,000 grows to $14,025.52 after 5 years."
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 34,
    "candidatesTokenCount": 28,
    "totalTokenCount": 62
  }
}`
      },
      {
        heading: 'Major AI API Providers: Architecture Comparison',
        paragraphs: [
          'While REST and JSON are universal, major providers differ in authentication and client libraries:',
          '• OpenAI: Uses Authorization: Bearer <sk-...> headers, project-scoped API keys, and standard /v1/chat/completions endpoints.',
          '• Google Gemini API: Supports both quick API keys (via x-goog-api-key or URL parameters) and enterprise Google Cloud IAM / Application Default Credentials (ADC) for Vertex AI deployments.',
          '• Anthropic Claude: Uses x-api-key headers, explicit anthropic-version headers, and a unified Messages API (/v1/messages).',
          'Modern AI engineers frequently use unified routing clients (such as LiteLLM or LangChain) to switch between these providers seamlessly with minimal code refactoring.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Five-Star Restaurant & The Waiter',
      text: 'You do not build an industrial kitchen, buy commercial ovens, and hire Michelin-star chefs in your living room just to eat dinner. Instead, you sit at a table, place an order with the waiter (the API request), the kitchen (the GPU cluster) cooks the meal according to your specifications, and the waiter brings the finished dish to your table (the JSON response). You only pay for what you ordered on the bill (token usage)!'
    },

    diagram: {
      type: 'ai_api_anatomy',
      title: 'Interactive AI API Request & Response Anatomy Lab'
    },

    takeaways: [
      'AI APIs turn billion-dollar GPU clusters into a simple, pay-per-token HTTP POST request over standard HTTPS.',
      'Core request components are the Endpoint URL, HTTP Method (POST), Authorization Headers, and the JSON payload.',
      'AI APIs are strictly stateless: the client application is entirely responsible for maintaining and re-sending chat history.',
      'API responses return the generated completion alongside precise token usage metrics (prompt_tokens and completion_tokens).',
      'Robust AI applications must implement automated exponential backoff to handle 429 rate limit errors gracefully.'
    ],

    quiz: {
      question: 'Why must a client application send the entire chat history in every new AI API request when building a multi-turn chatbot?',
      options: [
        'Because AI APIs are strictly stateless and the server does not retain memory of previous request-response turns',
        'Because the model weights are deleted from the GPU after every request',
        'To force the client to consume 10x more bandwidth on every turn',
        'Because HTTP POST requests can only transmit one word per network packet'
      ],
      correctIndex: 0,
      explanation: 'Spot on! AI APIs are fundamentally stateless. The provider does not persist conversation sessions on the server, so the client must supply previous messages in the messages array to maintain conversation context.'
    }
  },

  'ai-4-2': {
    id: 'ai-4-2',
    title: 'Managing API Keys Safely',
    subtitle: 'Environment Variables, Backend Proxies, Secret Managers & Leak Prevention',
    section: 'Module 4 · Chapter 2',
    estimatedTime: '8 min read',
    gfgUrl: 'https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password',

    badgeText: 'SECURITY & SECRETS',
    badgeColor: '#e11d48',

    sections: [
      {
        heading: 'The $10,000 Mistake: Why AI API Keys are High-Value Targets',
        paragraphs: [
          'An AI API key is not just an identifier—it is a direct authorization bearer token linked to your credit card with zero default spending throttles. If an attacker gains access to your secret key, they can run thousands of high-throughput model inferences, fine-tune massive models, or resell access on black-market proxy networks, racking up thousands of dollars in unauthorized charges within minutes.',
          'Automated botnets continuously scrape public GitHub repositories and public Docker images, detecting exposed API keys in less than two seconds after a commit is pushed. Once a key is published to a Git commit, deleting the commit or deleting the repository is not enough—the secret is already compromised.'
        ]
      },
      {
        heading: 'The Local Development Standard: .env and .gitignore',
        paragraphs: [
          'The fundamental rule of modern software engineering is: NEVER hardcode secret keys in source files.',
          'For local development, store secrets in a local .env file that is explicitly ignored by version control. Provide a sanitized .env.example file so team members know which variables are required without exposing actual credentials.',
          'In Python, use the python-dotenv package to load environment variables into process memory seamlessly without exposing raw credentials in code.'
        ],
        codeBlockTitle: 'SECURE LOCAL SECRETS PATTERN (PYTHON & .ENV)',
        codeBlock: `# 1. In your .gitignore file (MANDATORY):
.env
.env.local
.env.*.local
*.pem
secrets/

# 2. In your .env.example file (Safe to commit to Git):
GEMINI_API_KEY="your-gemini-api-key-here"
MAX_MONTHLY_BUDGET_USD=100

# 3. In your Python application code (app.py):
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load variables from local .env file into process memory
load_dotenv()

# Read key from secure process environment
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not configured.")

# Initialize Google Gemini client using environment variable
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Summarize this document.")
`
      },
      {
        heading: 'The Backend Proxy Architecture: Never Expose Keys to the Client',
        paragraphs: [
          'One of the most catastrophic beginner errors is importing an AI SDK directly into frontend browser code (such as React, Vue, or Next.js client components) or mobile applications.',
          'Any code, variable, or network call executed in a client browser can be viewed by opening Developer Tools (F12) or inspecting the network waterfall. Prefixing a key with NEXT_PUBLIC_ or REACT_APP_ bakes the secret directly into the compiled JavaScript bundle downloaded by every user.',
          'The industry-standard solution is the Backend Proxy Pattern: The browser only communicates with your own secure backend server route (e.g. /api/chat). The server verifies user authentication, rate-limits user sessions, holds the secret API key in memory, and makes the upstream call to Google Gemini.'
        ],
        codeBlockTitle: 'CLIENT LEAK ANTI-PATTERN VS SECURE BACKEND PROXY',
        codeBlock: `// DANGEROUS ANTI-PATTERN (Exposes secret key to every visitor's browser!):
// In React frontend:
const model = genai.getGenerativeModel({ apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY }); // LEAK!

// SECURE BACKEND PROXY PATTERN:
// 1. Frontend Client (Browser):
async function askAI(userPrompt) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userPrompt })
  });
  return await res.json();
}

// 2. Backend Server Route (/api/chat - Node/Python):
// Runs on private server where process.env is never exposed to browser
export async function POST(req) {
  const session = await authenticateUser(req);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { prompt } = await req.json();
  const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" }); // uses server process.env.GEMINI_API_KEY
  const result = await model.generateContent(prompt);
  return Response.json({ text: result.response.text() });
}`
      },
      {
        heading: 'Production Cloud Secrets Management & Account Hardening',
        paragraphs: [
          'In enterprise production environments (AWS, Google Cloud, Azure), raw .env files on servers are replaced by dedicated Secrets Managers (such as GCP Secret Manager, AWS Secrets Manager, or HashiCorp Vault).',
          'Key hardening best practices every team must implement:',
          '1. Set Hard Billing Limits: In the AI provider dashboard, configure soft alert thresholds (e.g. email alert at $50) and hard cutoffs (e.g. terminate all requests if charges reach $100).',
          '2. Project-Scoped & Restricted Keys: Create dedicated keys for each microservice with granular permissions rather than sharing a root account key.',
          '3. Install Pre-Commit Secret Scanners: Use automated git hooks (such as Gitleaks, TruffleHog, or git-secrets) to block accidental commits containing secret patterns before they ever leave your local machine.'
        ]
      },
      {
        heading: 'Emergency Incident Response: What to Do If a Key Leaks',
        paragraphs: [
          'If an API secret is ever accidentally pushed to a public repository or shared in public logs, execute this emergency runbook immediately:',
          '1. Revoke the Key Immediately: Navigate to the provider dashboard and click Delete / Revoke. Do not waste time deleting the commit first—revoking the key invalidates all active bot access instantly.',
          '2. Generate a Replacement Key: Create a new key and update your hosting environment settings (e.g. Vercel / AWS parameter store).',
          '3. Audit Request & Billing Logs: Review real-time API logs for abnormal spikes in tokens or unfamiliar geographic IP ranges.',
          '4. Purge Git History: Use git-filter-repo or BFG Repo-Cleaner if you need to scrub the historical commit tree clean.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Blank Check vs. The Bank Teller',
      text: 'Hardcoding an API key in frontend code is like leaving a signed, blank credit card voucher on a public park bench—anyone who walks by can charge whatever they want to your account. Building a backend proxy is like having a bank teller: customers ask the teller for service, the teller validates their ID, and the teller securely accesses the vault in the back room without ever handing the master key to the customer!'
    },

    diagram: {
      type: 'api_security_diagram',
      title: 'Interactive API Key Security & Leak Prevention Architecture'
    },

    takeaways: [
      'Never hardcode API keys in source files or push .env files to Git version control.',
      'Always add .env, .env.local, and secrets/ to .gitignore and commit a sanitized .env.example template.',
      'Frontend code must never hold API keys. Always route requests through a secure Backend Proxy (/api/chat).',
      'Set hard monthly billing limits and alert thresholds in your provider dashboard to prevent runaway charges.',
      'If a key is compromised, immediately revoke it in the dashboard before doing any Git history cleanups.'
    ],

    quiz: {
      question: 'Why is setting NEXT_PUBLIC_GEMINI_API_KEY in a frontend Next.js or React application considered a critical security vulnerability?',
      options: [
        'Because frontend environment variables are bundled directly into client-side JavaScript, allowing any user to inspect and steal the secret key using browser DevTools',
        'Because frontend requests run 10x slower than backend requests',
        'Because the Gemini server rejects all requests originating from web browsers',
        'Because React does not support string variables'
      ],
      correctIndex: 0,
      explanation: 'Spot on! Any environment variable prefixed with NEXT_PUBLIC_ (or REACT_APP_) is bundled into the client-side JavaScript code. Any visitor can open browser DevTools, inspect the source or network requests, and extract the secret key to run unauthorized requests on your credit card.'
    }
  },

  'ai-4-3': {
    id: 'ai-4-3',
    title: 'Making Your First AI Request',
    subtitle: 'Step-by-Step Python Guide: SDK Installation, Model Selection, GenerationConfig & Response Handling',
    section: 'Module 4 · Chapter 3',
    estimatedTime: '7 min read',
    gfgUrl: 'https://ai.google.dev/gemini-api/docs/quickstart?lang=python',

    badgeText: 'GEMINI PYTHON SDK',
    badgeColor: '#2563eb',

    sections: [
      {
        heading: 'Setting Up Your Python Environment',
        paragraphs: [
          'Connecting your code to Google Gemini takes less than five lines of Python. First, install the official Google Generative AI client library in your terminal or virtual environment:',
          'pip install -U google-generativeai python-dotenv',
          'Next, acquire your API key from Google AI Studio (aistudio.google.com) and store it in your local .env file. With the key loaded, calling genai.configure(api_key=...) establishes the authenticated session for all downstream model invocations.'
        ]
      },
      {
        heading: 'Model Selection: Gemini 1.5 Flash vs Gemini 1.5 Pro',
        paragraphs: [
          'Google provides two primary frontier model families optimized for distinct production trade-offs:',
          '1. Gemini 1.5 Flash: The high-speed, cost-efficient powerhouse. Built for high-frequency tasks, chatbots, summary pipelines, classification, and sub-second real-time streaming where latency and cost per query are primary concerns.',
          '2. Gemini 1.5 Pro: The frontier reasoning model. Engineered for multi-step reasoning, complex coding, mathematics, deep document synthesis, and demanding multimodal analysis across massive context windows (up to 2 million tokens).'
        ]
      },
      {
        heading: 'Crafting the Request with System Instructions & GenerationConfig',
        paragraphs: [
          'In production, you rarely call a model with default settings. You configure its behavior using two primary mechanisms:',
          '• System Instructions: Passed during GenerativeModel initialization to define persistent personas, tone, and non-negotiable behavioral guardrails.',
          '• GenerationConfig: Fine-tunes decoding hyperparameters per request:',
          '  - temperature (0.0 to 2.0): Lower values (0.0 - 0.3) yield deterministic, factual answers; higher values (0.7 - 1.0) increase creativity and lexical diversity.',
          '  - max_output_tokens: A hard safety ceiling on the maximum number of tokens generated.',
          '  - top_p & top_k: Advanced nucleus and top-k sampling parameters that control vocabulary candidate truncation.'
        ],
        codeBlockTitle: 'END-TO-END PRODUCTION GEMINI REQUEST SCRIPT',
        codeBlock: `import os
from dotenv import load_dotenv
import google.generativeai as genai

# 1. Load credentials from environment
load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is missing!")

# 2. Configure SDK
genai.configure(api_key=api_key)

# 3. Initialize Model with System Instructions
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="You are a senior site reliability engineer (SRE). Provide concise, root-cause-first explanations with actionable terminal commands."
)

# 4. Define Generation Hyperparameters
config = genai.GenerationConfig(
    temperature=0.2,          # Low randomness for technical accuracy
    max_output_tokens=300,    # Prevent runaway token generation
    top_p=0.95
)

# 5. Execute Request with Robust Error Handling
try:
    prompt = "Why is our Linux server reporting 'No space left on device' when 'df -h' shows 40% free disk space?"
    response = model.generate_content(prompt, generation_config=config)
    
    # 6. Extract Response Text and Usage Telemetry
    print("AI RESPONSE:")
    print(response.text)
    print("\n--- TELEMETRY METRICS ---")
    if hasattr(response, 'usage_metadata'):
        meta = response.usage_metadata
        print(f"Prompt Tokens:     {meta.prompt_token_count}")
        print(f"Candidate Tokens:  {meta.candidates_token_count}")
        print(f"Total Tokens:      {meta.total_token_count}")

except Exception as e:
    print(f"API Error Occurred: {e}")`
      },
      {
        heading: 'Inspecting Response Candidates & Finish Reasons',
        paragraphs: [
          'Under the hood, generate_content returns a GenerateContentResponse object. While response.text is the most common shortcut to extract text, production applications must inspect response.candidates[0].finish_reason to verify clean completion.',
          'Common finish reasons include:',
          '• STOP: The model naturally finished generating text according to its prompt.',
          '• MAX_TOKENS: Generation was truncated prematurely because max_output_tokens was reached.',
          '• SAFETY: Generation was blocked by automated content safety filters.',
          'Checking finish_reason prevents truncated or malformed responses from silently reaching end users.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Precision Camera & Lens Controls',
      text: 'Calling an AI model is like taking a professional photograph. Choosing between Flash and Pro is selecting your camera body (a lightweight action camera for speed vs a studio DSLR for extreme detail). Setting System Instructions is choosing your lens and scene backdrop. Adjusting temperature and max_output_tokens is dialing the aperture and shutter speed: you control exactly how much light (creativity) enters the sensor and how long the exposure lasts (output length)!'
    },

    diagram: {
      type: 'first_ai_request',
      title: 'Interactive Google Gemini Python Request & Tuning Workbench'
    },

    takeaways: [
      'Initialize Google Gemini in Python using genai.configure(api_key=...) with keys loaded from environment variables.',
      'Use gemini-1.5-flash for low-latency, high-volume production tasks; choose gemini-1.5-pro for complex multi-step reasoning.',
      'Pass system_instruction during model initialization to anchor role, tone, and refusal guardrails.',
      'Use GenerationConfig to tune temperature (randomness) and set max_output_tokens to prevent runaway billing.',
      'Always inspect response.usage_metadata for token telemetry and check finish_reason for unexpected truncations.'
    ],

    quiz: {
      question: 'Which Google Gemini model and temperature setting should you choose when building a high-volume, low-latency microservice that extracts ISO invoice dates from receipts?',
      options: [
        'gemini-1.5-flash with temperature=0.0 (maximizing speed, minimizing cost, and enforcing deterministic factual extraction)',
        'gemini-1.5-pro with temperature=1.8 (maximizing poetic variation and high latency)',
        'gemini-1.0 with max_output_tokens=1 (forcing single-character output)',
        'Any model without an API key'
      ],
      correctIndex: 0,
      explanation: 'Spot on! For structured, high-volume data extraction like invoice dates, gemini-1.5-flash delivers sub-second latency at minimal cost, and temperature=0.0 eliminates random token variations for strict deterministic accuracy.'
    }
  },

  'ai-4-4': {
    id: 'ai-4-4',
    title: 'Chat Completions & Messages',
    subtitle: 'Managing Multi-Turn Conversations, History Persistence, Roles & Sliding Context Windows',
    section: 'Module 4 · Chapter 4',
    estimatedTime: '8 min read',
    gfgUrl: 'https://ai.google.dev/gemini-api/docs/chat',

    badgeText: 'MULTI-TURN CHAT SESSIONS',
    badgeColor: '#8b5cf6',

    sections: [
      {
        heading: 'How Multi-Turn Conversations Actually Work',
        paragraphs: [
          'In previous lessons, we learned that AI APIs are completely stateless. A Large Language Model has no internal memory of previous requests. When a user experiences a continuous, context-aware chatbot conversation, it is because the client application maintains a growing array of messages and transmits the entire transcript on every turn.',
          'The Google Generative AI Python SDK simplifies this through the ChatSession abstraction. Calling model.start_chat() creates an interactive session object that automatically tracks, appends, and formats previous user queries and model responses in memory.'
        ]
      },
      {
        heading: 'Message Roles in Gemini: user and model',
        paragraphs: [
          'In the Google Gemini ecosystem, conversational history is modeled as an alternating sequence of Content objects with two primary roles:',
          '1. role: "user": Represents messages originating from the human or client application.',
          '2. role: "model": Represents prior responses generated by the Gemini neural network.',
          'System instructions (e.g. "You are an empathetic customer support agent") are not stored as conversational turns; they are passed separately as system_instruction during model instantiation to anchor the model persona across all turns without cluttering the chat history.'
        ]
      },
      {
        heading: 'History Persistence: Saving and Rehydrating Chat Sessions',
        paragraphs: [
          'In production web applications, users frequently close their browser tabs and return hours or days later. Since your backend cannot keep Python ChatSession objects alive in RAM indefinitely, you must serialize chat.history to a database (such as PostgreSQL JSONB, MongoDB, or Redis) and rehydrate it on demand.',
          'The SDK makes rehydration straightforward: you extract history from the database as a list of dicts with role and parts keys, and pass it directly into model.start_chat(history=saved_history).'
        ],
        codeBlockTitle: 'MULTI-TURN CHAT, HISTORY EXPORT & REHYDRATION IN PYTHON',
        codeBlock: `import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="You are an expert travel consultant specializing in East Asia."
)

# 1. Start an active chat session
chat = model.start_chat(history=[])

# Turn 1: User introduces context
res1 = chat.send_message("I am planning a 10-day trip to Tokyo in November.")
print("Model Turn 1:", res1.text)

# Turn 2: User asks follow-up (model recalls Tokyo & November)
res2 = chat.send_message("What kind of jacket should I pack for the weather?")
print("\nModel Turn 2:", res2.text)

# 2. Inspect & Export History for Database Storage
serialized_history = []
for turn in chat.history:
    serialized_history.append({
        "role": turn.role,
        "parts": [part.text for part in turn.parts]
    })

# 3. Simulate Next Day: Rehydrate Chat Session from Stored DB History
new_chat_session = model.start_chat(history=serialized_history)
res3 = new_chat_session.send_message("Can you suggest 3 day trips from our base city?")
print("\nModel Turn 3 (Rehydrated):", res3.text)`
      },
      {
        heading: 'The Sliding Context Window & History Pruning Pattern',
        paragraphs: [
          'While Gemini 1.5 models support massive context windows (up to 1-2 million tokens), re-transmitting 100 conversation turns on every single request increases latency and token costs exponentially.',
          'To optimize cost and latency, production architectures apply the Sliding Context Window pattern: keep the persistent system instruction, prune the oldest conversation turns, and retain only the most recent N turns (e.g. the last 10 messages) before sending the payload.',
          'For critical older context, enterprise systems use an asynchronous background job that generates a compact "running summary" of older turns and injects it as context before the active sliding window.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Courtroom Stenographer & Running Transcript',
      text: 'Imagine a high-stakes court trial. The judge and jury do not have photographic memory of testimony from three weeks ago. Instead, the court stenographer records every exchange in an official transcript. Whenever a lawyer asks a follow-up question on Day 20, the judge references the running transcript to evaluate the context. In an AI chat, your backend is the stenographer: it records every turn and hands the transcript back to the model on every new question!'
    },

    diagram: {
      type: 'chat_completions',
      title: 'Interactive Multi-Turn Chat Architecture & Sliding Window Workbench'
    },

    takeaways: [
      'Multi-turn AI chats are powered by client-side history accumulation using model.start_chat().',
      'Gemini conversations alternate strictly between role: "user" and role: "model".',
      'System instructions are passed during model initialization, anchoring behavior without consuming conversational history slots.',
      'Persist chat.history to your database as structured JSON and rehydrate sessions using model.start_chat(history=saved_history).',
      'Apply the Sliding Context Window pattern to trim older conversation turns, minimizing latency and token costs.'
    ],

    quiz: {
      question: 'How do production web applications allow users to resume an ongoing AI conversation after refreshing their browser or logging in on a new device?',
      options: [
        'They serialize the conversation turns (roles and text parts) to a database and rehydrate a new session using model.start_chat(history=saved_history)',
        'The Google server keeps a continuous WebSocket connection open to the user IP forever',
        'The model stores the user name and history directly inside its neural network weights',
        'Users must re-type all their previous questions manually on every login'
      ],
      correctIndex: 0,
      explanation: 'Spot on! AI APIs are stateless. Production applications persist conversation history in a database (like PostgreSQL or Redis) and pass the serialized message array into model.start_chat(history=...) to reconstruct the conversation context seamlessly.'
    }
  },

  'ai-4-5': {
    id: 'ai-4-5',
    title: 'Streaming Responses in Real-Time',
    subtitle: 'Server-Sent Events (SSE), Python Generators, Chunk Processing & Sub-Second Perceived Latency',
    section: 'Module 4 · Chapter 5',
    estimatedTime: '7 min read',
    gfgUrl: 'https://ai.google.dev/gemini-api/docs/streaming',

    badgeText: 'REAL-TIME STREAMING',
    badgeColor: '#06b6d4',

    sections: [
      {
        heading: 'Why Streaming is Mandatory in Production UX',
        paragraphs: [
          'Large Language Models generate text autoregressively, computing one token at a time. For a 500-word response, generating the complete output might take 4 to 8 seconds. In a standard HTTP blocking request, the user stares at a blank screen with a frozen spinner for the entire duration, creating a sluggish user experience.',
          'With streaming enabled, the model emits tokens over HTTP using Server-Sent Events (SSE) or chunked transfer encoding as fast as they are computed. Time to First Token (TTFT) drops to 200–300 milliseconds. The user sees words appearing immediately on screen, making the application feel instantaneous.'
        ]
      },
      {
        heading: 'Streaming with the Google Gemini Python SDK',
        paragraphs: [
          'Activating streaming in Python requires adding a single parameter: stream=True. When passed to model.generate_content() or chat.send_message(), the SDK returns an iterable GenerateContentResponse stream rather than blocking until the full text is assembled.',
          'Iterating through the stream with a standard for chunk in response: loop allows you to read chunk.text and immediately write it to stdout, a WebSocket pipe, or an SSE stream.'
        ]
      },
      {
        heading: 'FastAPI Backend Streaming Architecture',
        paragraphs: [
          'In production web applications, your frontend connects to your backend API via an EventSource or the fetch() ReadableStream interface. Your Python backend acts as a streaming bridge between Google Gemini and the user browser.',
          'Using FastAPI StreamingResponse with media_type="text/event-stream", each incoming token chunk from Gemini is yielded with standard SSE formatting (data: {"text": "..."}\\n\\n) directly down the open TCP connection.'
        ],
        codeBlockTitle: 'END-TO-END PYTHON & FASTAPI SSE STREAMING PIPELINE',
        codeBlock: `import os
import asyncio
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

app = FastAPI()
model = genai.GenerativeModel("gemini-1.5-flash")

# 1. Local CLI Streaming Demonstration
def stream_to_terminal(prompt: str):
    print("AI Response: ", end="", flush=True)
    # Pass stream=True to receive an iterable generator
    response_stream = model.generate_content(prompt, stream=True)
    for chunk in response_stream:
        # Each chunk contains freshly sampled tokens
        print(chunk.text, end="", flush=True)
    print("\n--- STREAM COMPLETE ---")

# 2. Production FastAPI Server-Sent Events (SSE) Endpoint
async def generate_sse_stream(prompt: str):
    response_stream = model.generate_content(prompt, stream=True)
    for chunk in response_stream:
        if chunk.text:
            # Yield Server-Sent Events (SSE) format
            yield f"data: {chunk.text}\\n\\n"
            await asyncio.sleep(0.01)  # Yield control to event loop
    yield "data: [DONE]\\n\\n"

@app.get("/api/chat/stream")
async def chat_stream_endpoint(prompt: str):
    return StreamingResponse(
        generate_sse_stream(prompt),
        media_type="text/event-stream"
    )`
      },
      {
        heading: 'Error Handling and Interrupted Streams',
        paragraphs: [
          'Streaming connections require careful error handling. If a network interruption occurs midway through generation, or if the model halts due to safety filters, the iterator may terminate abruptly.',
          'Always wrap chunk iteration in try...except blocks. If a connection drops, your frontend should preserve the partially rendered text rather than discarding the entire response.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Water Faucet vs The 5-Gallon Delivery Truck',
      text: 'A blocking API call is like ordering a 5-gallon water jug delivered by truck: you must wait 30 minutes with an empty cup until the entire jug arrives at your doorstep before taking a single sip. Streaming is like turning on your kitchen faucet: water starts flowing into your glass within milliseconds. Even if filling the whole pitcher takes time, you can begin drinking immediately from the very first drop!'
    },

    diagram: {
      type: 'streaming_responses',
      title: 'Interactive Real-Time Streaming & SSE Architecture Workbench'
    },

    takeaways: [
      'Enable streaming in the Gemini SDK by passing stream=True to generate_content() or chat.send_message().',
      'Streaming reduces perceived latency (TTFT) from 4-8 seconds down to 200-300ms by rendering tokens as they are generated.',
      'Iterate over response chunks using for chunk in response: and read chunk.text.',
      'In production backends (e.g. FastAPI), pipe chunks to web clients using StreamingResponse with media_type="text/event-stream".',
      'Always implement client-side fallback handling for streams interrupted by network disconnects or content safety filters.'
    ],

    quiz: {
      question: 'What is the primary architectural benefit of setting stream=True when calling an AI API in a user-facing chatbot?',
      options: [
        'It drastically reduces Time to First Token (TTFT), displaying words on the user screen within 200ms instead of waiting for the full response to finish generating',
        'It makes the model run on the user local GPU without using internet bandwidth',
        'It prevents the API key from being billed',
        'It translates the response into 10 languages simultaneously'
      ],
      correctIndex: 0,
      explanation: 'Spot on! Autoregressive models generate text token by token. Streaming delivers each token over HTTP chunks as soon as it is computed, reducing perceived wait time from several seconds down to a fraction of a second.'
    }
  },

  'ai-4-6': {
    id: 'ai-4-6',
    title: 'Function Calling & Tool Use',
    subtitle: 'Empowering LLMs with Deterministic Capabilities: API Execution, Database Queries & Multi-Step Loops',
    section: 'Module 4 · Chapter 6',
    estimatedTime: '9 min read',
    gfgUrl: 'https://ai.google.dev/gemini-api/docs/function-calling',

    badgeText: 'TOOL CALLING & AGENTS',
    badgeColor: '#f59e0b',

    sections: [
      {
        heading: 'Why LLMs Need Tools',
        paragraphs: [
          'Large Language Models are brilliant reasoners, but they have two fundamental limitations: their knowledge is frozen at training cutoff time, and they cannot take real-world actions like running SQL queries, fetching live stock prices, or booking calendar invites.',
          'Function Calling (Tool Use) bridges this gap. By passing Python functions into the model, the LLM can autonomously recognize when an external calculation or live API lookup is required, generate structured arguments, and instruct your application to execute the tool.'
        ]
      },
      {
        heading: 'The 4-Step Tool Calling Execution Loop',
        paragraphs: [
          'It is critical to understand that the AI model DOES NOT execute your Python code directly on Google servers. Instead, execution follows a secure 4-step exchange:',
          '1. Declaration: You pass Python functions (with type hints and docstrings) into tools=[get_weather, run_query].',
          '2. Tool Decision: The user asks a question ("What is the weather in Tokyo?"). Gemini detects that get_weather is relevant and returns a function_call object containing the name and arguments ({"city": "Tokyo"}).',
          '3. Local Execution: Your backend securely executes your Python function locally and retrieves the real-time result (e.g. {"temp": "18C", "condition": "Sunny"}).',
          '4. Synthesis: Your backend sends the tool output back to Gemini as a function_response. The model synthesizes the raw data into a natural language answer.'
        ]
      },
      {
        heading: 'Automatic vs Manual Function Calling in Python',
        paragraphs: [
          'The Google Generative AI Python SDK supports both automatic and manual execution patterns.',
          'When using chat sessions with enable_automatic_function_calling=True, the SDK intercepts the model tool requests, invokes your local Python function automatically, and returns the final synthesized response seamlessly.'
        ],
        codeBlockTitle: 'PRODUCTION FUNCTION CALLING WITH AUTOMATIC & MANUAL DISPATCH',
        codeBlock: `import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# 1. Define real deterministic Python tool functions with clear type hints & docstrings
def get_stock_price(ticker: str) -> dict:
    """Fetches the current real-time market price for a given stock ticker."""
    # In production, call a real financial API (e.g. Alpha Vantage, Yahoo Finance)
    mock_db = {
        "GOOGL": {"price": 178.50, "currency": "USD", "change": "+1.4%"},
        "AAPL": {"price": 224.20, "currency": "USD", "change": "-0.3%"},
        "MSFT": {"price": 415.80, "currency": "USD", "change": "+0.8%"}
    }
    return mock_db.get(ticker.upper(), {"error": f"Ticker {ticker} not found."})

def calculate_portfolio_value(shares: int, price_per_share: float) -> dict:
    """Calculates total position valuation given share quantity and unit price."""
    total = shares * price_per_share
    return {"shares": shares, "unit_price": price_per_share, "total_value": round(total, 2)}

# 2. Register tools with the Gemini GenerativeModel
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    tools=[get_stock_price, calculate_portfolio_value]
)

# 3. Automatic Function Calling in a Chat Session
chat = model.start_chat(enable_automatic_function_calling=True)
query = "I own 50 shares of GOOGL. What is the current stock price and what is my total position worth?"

response = chat.send_message(query)
print("AGENT SYNTHESIZED RESPONSE:")
print(response.text)`
      },
      {
        heading: 'Best Practices for Tool Definitions',
        paragraphs: [
          'For reliable tool calling in production:',
          '• Write descriptive docstrings: Gemini relies on your docstring to understand WHEN and WHY to call the tool.',
          '• Use strict type hints: Specify str, int, float, bool, or Enum on all parameters.',
          '• Keep return values structured: Return Python dictionaries or JSON strings rather than unstructured sentences.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Executive Architect & Specialist Contractors',
      text: 'Think of an LLM as an elite architect and your tool functions as licensed specialist contractors (plumbers, electricians, structural engineers). The architect designs the house and diagnoses problems, but does not climb ladders or solder copper pipes. When a blueprint needs electrical load calculations, the architect drafts an exact work order (function_call), hands it to the electrician, receives the certified amperage report (function_response), and incorporates it into the final master plan!'
    },

    diagram: {
      type: 'function_calling',
      title: 'Interactive 4-Step Tool Execution Loop & Dispatch Simulator'
    },

    takeaways: [
      'Function calling allows LLMs to interact with live databases, external REST APIs, and deterministic calculation engines.',
      'The model does NOT run your code on its servers; it emits structured arguments (function_call) for your backend to execute locally.',
      'Google Gemini inspects Python docstrings and type annotations to understand when and how to invoke tools.',
      'Enable automatic dispatch with model.start_chat(enable_automatic_function_calling=True) for seamless autonomous execution.',
      'Always return structured dictionaries from tools and handle potential tool errors gracefully.'
    ],

    quiz: {
      question: 'When an AI model decides to invoke a tool, where does the actual Python function code execute?',
      options: [
        'On your local backend application server—the model only generates the function name and argument parameters',
        'Inside Google cloud neural network weights',
        'On the user web browser without network access',
        'On a decentralized blockchain network'
      ],
      correctIndex: 0,
      explanation: 'Spot on! AI models do not run arbitrary user code. The model identifies the required function and outputs the structured arguments (function_call); your application executes the local Python function and sends the result back to the model.'
    }
  },

  'ai-4-7': {
    id: 'ai-4-7',
    title: 'JSON Mode & Schema Enforcement',
    subtitle: 'Constrained Logit Decoding, Deterministic Output Guarantees & Zero-Regex Parsing',
    section: 'Module 4 · Chapter 7',
    estimatedTime: '8 min read',
    gfgUrl: 'https://ai.google.dev/gemini-api/docs/json_mode',

    badgeText: 'CONSTRAINED DECODING',
    badgeColor: '#10b981',

    sections: [
      {
        heading: 'The Problem with Unconstrained LLM Output',
        paragraphs: [
          'When building production AI pipelines, downstream microservices expect strict, machine-readable JSON. In early prompt engineering, developers added instructions like "Respond ONLY in valid JSON with no markdown backticks".',
          'However, heuristic prompt instructions frequently break in production: models output markdown prefixes (\`\`\`json), trailing commas, unescaped quotes, or conversational preamble ("Sure, here is your JSON:"). This causes json.loads() crashes in production.'
        ]
      },
      {
        heading: 'How Constrained Logit Decoding Works',
        paragraphs: [
          'Google Gemini solves this at the neural engine level through Constrained Logit Decoding. When you configure response_mime_type="application/json", the model sampling engine mathematically masks (sets the logit probability to -infinity) for any token that would produce invalid JSON syntax.',
          'If the model opens a JSON string {"status": ", the only permissible tokens next are string characters or an escaping backslash. Tokens like unquoted keywords or malformed brackets are physically prevented from being sampled.'
        ]
      },
      {
        heading: 'Configuring JSON Mode in Python',
        paragraphs: [
          'Enabling JSON Mode in the Gemini Python SDK is configured via GenerationConfig:',
          'generation_config=genai.GenerationConfig(response_mime_type="application/json")',
          'With this setting, response.text is mathematically guaranteed to parse directly with json.loads(response.text) without regex trimming or string replacements.'
        ],
        codeBlockTitle: 'PRODUCTION JSON MODE EXTRACTION & VALIDATION SCRIPT',
        codeBlock: `import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# 1. Initialize model with JSON Mode configuration
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="You are a data extraction engine. Extract structured entities from unstructured text.",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        temperature=0.0  # Zero randomness for strict deterministic extraction
    )
)

# 2. Unstructured input text
raw_email = """
Hi Support, I bought the Pro Dev Annual plan for $299 on October 14, 2024. 
My order ID is ORD-88421 and my license key is LIC-9921-X. 
Can you please send me an updated VAT invoice for Acme Corp (Tax ID: US-991823)?
"""

prompt = f"""
Extract the purchase details from the email below.
Return a JSON object with keys:
- "order_id": string
- "plan_name": string
- "amount_usd": float
- "purchase_date": string (YYYY-MM-DD)
- "company_name": string
- "tax_id": string
- "action_required": string

Input Email:
{raw_email}
"""

response = model.generate_content(prompt)

# 3. Direct JSON deserialization without regex or markdown trimming
data = json.loads(response.text)
print("EXTRACTED VALIDATED JSON OBJECT:")
print(json.dumps(data, indent=2))
print(f"\\nOrder ID: {data['order_id']} | Total USD: {data['amount_usd']}")`
      },
      {
        heading: 'JSON Mode vs Schema Enforcement',
        paragraphs: [
          'While response_mime_type="application/json" guarantees syntactically valid JSON syntax (no trailing commas, balanced braces), it does not enforce specific property names or types. If you need strict schema guarantees (e.g. amount_usd must be a float and category must be an enum), you combine JSON mode with response_schema.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Railway Track vs Off-Road Driving',
      text: 'Prompting an LLM to output JSON with plain text instructions is like driving off-road with a steering wheel and hoping you stay between the lines. Constrained Logit Decoding is like placing the train on a steel railway track: the physical rails make it impossible for the train to turn anywhere except the exact predetermined destination!'
    },

    diagram: {
      type: 'json_schema_enforcement',
      title: 'Interactive Logit Masking & JSON Mode Decoding Engine'
    },

    takeaways: [
      'Avoid heuristic prompt workarounds like "Return only JSON" for production data extraction.',
      'Configure response_mime_type="application/json" in GenerationConfig to enable hardware-level JSON enforcement.',
      'Constrained logit decoding mathematically suppresses tokens that violate JSON syntax rules.',
      'Outputs from JSON Mode parse cleanly with json.loads(response.text) with zero regex or backtick stripping.',
      'Set temperature=0.0 to maximize determinism when extracting structured fields.'
    ],

    quiz: {
      question: 'How does Gemini guarantee that output generated with response_mime_type="application/json" is syntactically valid JSON?',
      options: [
        'By applying constrained logit decoding during sampling, masking out any tokens that would cause a JSON syntax violation',
        'By running a post-processing Python script that formats text with regex after generation finishes',
        'By asking ChatGPT to proofread the output before returning it',
        'By converting all numbers to letters'
      ],
      correctIndex: 0,
      explanation: 'Spot on! Constrained logit decoding works at the token generation level by setting the sampling probability of illegal syntax tokens to zero, making it mathematically impossible to emit invalid JSON.'
    }
  },

  'ai-4-8': {
    id: 'ai-4-8',
    title: 'Structured Outputs & Pydantic Validation',
    subtitle: 'End-to-End Type Safety: Nested Schemas, Enums, Field Constraints & Zero Runtime Failures',
    section: 'Module 4 · Chapter 8',
    estimatedTime: '9 min read',
    gfgUrl: 'https://ai.google.dev/gemini-api/docs/structured_outputs',

    badgeText: 'PYDANTIC TYPE SAFETY',
    badgeColor: '#6366f1',

    sections: [
      {
        heading: 'The Frontier of Type Safety: Structured Outputs',
        paragraphs: [
          'In modern software engineering, raw JSON dictionaries are prone to runtime bugs: typos in dictionary keys (data["orderId"] vs data["order_id"]), missing required fields, or unexpected string values for numerical metrics.',
          'Structured Outputs combine Google Gemini with Pydantic type models. By passing a Pydantic class into response_schema, the model is constrained to adhere strictly to your class definition—including nested objects, list types, typed enums, and numerical range constraints.'
        ]
      },
      {
        heading: 'Defining Robust Pydantic Schemas',
        paragraphs: [
          'When creating schemas for Gemini, use standard Pydantic BaseModel classes. You can annotate fields with Field(description=...) to provide semantic context directly to the model during sampling.',
          'Key features supported in Gemini Structured Outputs:',
          '• Enums (enum.Enum): Constrains string fields to an exact whitelist of allowed options.',
          '• Nested Models: Represents complex hierarchical data structures (e.g. an order containing a list of line items).',
          '• Optional & List types: list[str], list[ItemModel], or Optional[str].'
        ]
      },
      {
        heading: 'End-to-End Python Implementation',
        paragraphs: [
          'In Python, pass your Pydantic schema class directly to response_schema inside GenerationConfig. Once generated, parsing the output into a verified Pydantic instance takes a single line of code: MySchema.model_validate_json(response.text).'
        ],
        codeBlockTitle: 'END-TO-END TYPE-SAFE PYDANTIC STRUCTURED OUTPUTS PIPELINE',
        codeBlock: `import os
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# 1. Define Strict Enum & Nested Data Models
class PriorityLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class SecurityFinding(BaseModel):
    vulnerability_name: str = Field(description="Standard CVE or vulnerability title")
    file_path: str = Field(description="Relative path to affected source file")
    line_number: Optional[int] = Field(description="Line number if identifiable")
    priority: PriorityLevel = Field(description="Severity tier")
    remediation_step: str = Field(description="Actionable remediation instructions")

class SecurityAuditReport(BaseModel):
    repository_name: str
    security_score: int = Field(ge=0, le=100, description="Overall security score from 0 to 100")
    summary: str = Field(description="Executive summary of the audit")
    findings: List[SecurityFinding] = Field(description="List of detected vulnerabilities")
    passed_audit: bool = Field(description="True if score >= 75 and no CRITICAL findings")

# 2. Configure Model with Pydantic response_schema
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        response_schema=SecurityAuditReport,
        temperature=0.1
    )
)

# 3. Audit Code Snippet
code_to_audit = """
@app.route('/api/user')
def get_user():
    user_id = request.args.get('id')
    # Direct SQL query string formatting
    query = f"SELECT * FROM users WHERE id = '{user_id}'"
    cursor.execute(query)
    return jsonify(cursor.fetchall())
"""

prompt = f"Perform a senior security audit on this code snippet:\\n{code_to_audit}"
response = model.generate_content(prompt)

# 4. Instant Zero-Error Pydantic Validation & Autocomplete Access
report: SecurityAuditReport = SecurityAuditReport.model_validate_json(response.text)

print(f"AUDIT REPORT: {report.repository_name}")
print(f"Security Score: {report.security_score}/100 | Passed: {report.passed_audit}")
print(f"Summary: {report.summary}\\n")
for f in report.findings:
    print(f"[{f.priority.value}] {f.vulnerability_name} at {f.file_path}:{f.line_number}")
    print(f"  Remediation: {f.remediation_step}\\n")`
      },
      {
        heading: 'Why Structured Outputs Eliminate Pipeline Runtime Failures',
        paragraphs: [
          'In traditional AI pipelines, data ingestion errors account for over 60% of runtime exceptions due to missing fields or unexpected schema formats. By integrating Pydantic with Gemini Structured Outputs, your IDE provides full static type-checking (code autocomplete for report.findings[0].vulnerability_name), and downstream database ORMs receive guaranteed, type-safe models.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Precision Industrial Injection Mold',
      text: 'Imagine manufacturing precision gears. Using standard text prompting is like trying to carve each plastic gear by hand with a pocketknife—every single gear will have slight imperfections. Structured Outputs with Pydantic is like using a steel injection mold: molten polymer is forced into the exact pre-shaped cavity, guaranteeing that every single manufactured part matches the blueprint down to the micrometer!'
    },

    diagram: {
      type: 'structured_outputs_parsing',
      title: 'Interactive Pydantic Schema Workbench & Type-Safe Pipeline'
    },

    takeaways: [
      'Pass Pydantic models directly into response_schema inside GenerationConfig for end-to-end type safety.',
      'Use Python Enums to constrain fields to strict categorical values.',
      'Enrich Pydantic fields with Field(description=...) to guide model reasoning during constrained generation.',
      'Parse the response directly using MyModel.model_validate_json(response.text) for instant validated Python objects with full IDE autocomplete.',
      'Structured outputs prevent runtime crashes across ETL pipelines, database ingestion, and microservices.'
    ],

    quiz: {
      question: 'What is the key advantage of passing a Pydantic model to Gemini response_schema compared to using unconstrained JSON mode?',
      options: [
        'It guarantees both valid JSON syntax AND enforces the exact field names, data types, nested models, and Enum constraints defined in your Pydantic class',
        'It makes the model run 100x faster than normal',
        'It eliminates the need for an internet connection',
        'It automatically publishes your project to GitHub'
      ],
      correctIndex: 0,
      explanation: 'Spot on! While JSON mode only guarantees valid JSON syntax, Structured Outputs with response_schema enforces the exact structure, property names, nested lists, and type constraints of your Pydantic schema.'
    }
  },

  'ai-4-9': {
    id: 'ai-4-9',
    title: 'Mini Project: Live Weather AI Assistant',
    subtitle: 'Build a Full-Featured Tool-Calling Weather Agent in Python with Mock Weather API & Autonomous Dispatch',
    section: 'Module 4 · Capstone Project',
    estimatedTime: '15 min practical',
    badgeText: 'MINI PROJECT: AI APIS',
    badgeColor: '#f59e0b',
    isProject: true,
    videoUrl: null,
    gfgUrl: null,
    diagram: { type: 'mini_project_editor', projectId: 'live_weather_assistant' },
    projectMeta: {
      language: 'python',
      runtime: 'pyodide',
      finalTool: 'Live Weather AI Assistant (Function Calling)',
      skills: ['tool calling', 'registries', 'dispatchers', 'reAct loop', 'error handling'],
    },
    projectOverview: {
      title: 'Production Tool-Calling Weather & Travel Agent',
      description: 'Build an autonomous Python AI agent using the Google Gemini function-calling architecture. You will create mock weather and air quality API tools, build an automatic tool dispatch registry, and assemble an interactive multi-turn agent that autonomously decides when to check real-time weather and advise travelers.',
      technologies: ['Python 3.11', 'Google Gemini API', 'Function Calling / Tool Use', 'Pyodide WebAssembly'],
      prerequisites: 'Completion of Module 4 (AI APIs, Multi-Turn Chat, Streaming, Function Calling, Structured Outputs).'
    },

    steps: [
      {
        id: 1,
        title: 'Step 1 — Build the Mock Real-Time Weather Service',
        concept: 'In production systems, your agent invokes external REST services. Before connecting Gemini, we build a deterministic weather and air quality service that returns structured weather metrics for query locations.',
        goal: 'Complete get_weather_service() to look up the city in the database (case-insensitive) and return the structured weather dictionary.',
        whyItMatters: 'Clean, structured tool return values are critical because the AI model parses this dictionary to synthesize its final natural response.',
        starterCode: `# Step 1: Mock Real-Time Weather Service
# Build the deterministic tool function that looks up weather metrics.

MOCK_WEATHER_DATABASE = {
    "tokyo": {"temperature": 18, "condition": "Sunny", "humidity": 45, "air_quality": "Good"},
    "london": {"temperature": 12, "condition": "Rainy", "humidity": 88, "air_quality": "Moderate"},
    "paris": {"temperature": 15, "condition": "Partly Cloudy", "humidity": 60, "air_quality": "Good"},
    "new york": {"temperature": 22, "condition": "Clear", "humidity": 50, "air_quality": "Good"}
}

def get_weather_service(city_name: str) -> dict:
    """Fetches real-time weather and air quality metrics for a specified city."""
    # TODO: Normalize city_name by converting to lowercase and stripping whitespace
    # normalized = ...
    # Look up in MOCK_WEATHER_DATABASE. If not found, return {"error": f"City '{city_name}' not found in database."}
    normalized = city_name.strip().lower()
    return MOCK_WEATHER_DATABASE.get(normalized, {"error": f"City '{city_name}' not found."})

# Test the service
print("Tokyo Weather:", get_weather_service("Tokyo"))
print("Unknown City:", get_weather_service("Atlantis"))`,
        hints: [
          'TODO: Normalize the string with city_name.strip().lower()',
          'Use MOCK_WEATHER_DATABASE.get(normalized, {"error": ...}) to handle unknown cities cleanly'
        ],
        solutionCode: `MOCK_WEATHER_DATABASE = {
    "tokyo": {"temperature": 18, "condition": "Sunny", "humidity": 45, "air_quality": "Good"},
    "london": {"temperature": 12, "condition": "Rainy", "humidity": 88, "air_quality": "Moderate"},
    "paris": {"temperature": 15, "condition": "Partly Cloudy", "humidity": 60, "air_quality": "Good"},
    "new york": {"temperature": 22, "condition": "Clear", "humidity": 50, "air_quality": "Good"}
}

def get_weather_service(city_name: str) -> dict:
    """Fetches real-time weather and air quality metrics for a specified city."""
    normalized = city_name.strip().lower()
    return MOCK_WEATHER_DATABASE.get(normalized, {"error": f"City '{city_name}' not found."})

print("Tokyo Weather:", get_weather_service("Tokyo"))
print("Unknown City:", get_weather_service("Atlantis"))`,
        expectedOutputContains: 'Tokyo Weather:',
        conceptCallout: 'Notice how the docstring clearly explains the purpose of the function. In the Gemini Python SDK, this docstring is passed directly as the tool description to help the model decide when to call it.'
      },
      {
        id: 2,
        title: 'Step 2 — Implement the Tool Registry & Schema Declarer',
        concept: 'To allow an agent to use multiple tools dynamically, production systems register tools in a dictionary map and extract their parameter signatures into JSON schema definitions.',
        goal: 'Complete register_tool() to map tool names to Python callable functions and generate schema metadata.',
        whyItMatters: 'A centralized tool registry allows your agent to support 10+ tools (e.g. weather, flights, hotels, currency conversion) without messy if/else chains.',
        starterCode: `# Step 2: Tool Registry & Schema Declarer
# Registers callable tools into a centralized dispatch dictionary.

TOOL_REGISTRY = {}

def register_tool(name: str, func, description: str):
    """Registers a tool function into the global dispatch table."""
    # TODO: Store name, func, and description in TOOL_REGISTRY[name]
    TOOL_REGISTRY[name] = {
        "func": func,
        "description": description
    }

def get_weather(city: str):
    """Get live weather."""
    return {"city": city, "temp": 20, "condition": "Sunny"}

def get_air_quality(city: str):
    """Get air quality index."""
    return {"city": city, "aqi": 35, "status": "Good"}

# Register tools
register_tool("get_weather", get_weather, "Fetches current temperature and conditions for a city.")
register_tool("get_air_quality", get_air_quality, "Fetches Air Quality Index (AQI) rating for a city.")

print(f"Registered {len(TOOL_REGISTRY)} tools: {list(TOOL_REGISTRY.keys())}")`,
        hints: [
          'Assign TOOL_REGISTRY[name] = {"func": func, "description": description}'
        ],
        solutionCode: `TOOL_REGISTRY = {}

def register_tool(name: str, func, description: str):
    """Registers a tool function into the global dispatch table."""
    TOOL_REGISTRY[name] = {
        "func": func,
        "description": description
    }

def get_weather(city: str):
    """Get live weather."""
    return {"city": city, "temp": 20, "condition": "Sunny"}

def get_air_quality(city: str):
    """Get air quality index."""
    return {"city": city, "aqi": 35, "status": "Good"}

register_tool("get_weather", get_weather, "Fetches current temperature and conditions for a city.")
register_tool("get_air_quality", get_air_quality, "Fetches Air Quality Index (AQI) rating for a city.")

print(f"Registered {len(TOOL_REGISTRY)} tools: {list(TOOL_REGISTRY.keys())}")`,
        expectedOutputContains: 'Registered 2 tools:',
        conceptCallout: 'In the Gemini SDK, passing a list of Python functions directly to tools=[get_weather, get_air_quality] automatically builds the schema using Python type hints.'
      },
      {
        id: 3,
        title: 'Step 3 — Build the Safe Dynamic Tool Dispatcher',
        concept: 'When Gemini returns a function call instruction, your backend must safely extract the function name, unpack arguments, execute the local function, and catch exceptions without crashing.',
        goal: 'Implement dispatch_tool_call() to invoke the registered tool function with keyword arguments and handle errors gracefully.',
        whyItMatters: 'Robust error trapping in tool dispatchers ensures that even if an API fails, the agent receives an informative error dictionary and can recover gracefully.',
        starterCode: `# Step 3: Safe Dynamic Tool Dispatcher
# Executes registered tools and catches potential runtime errors.

TOOL_REGISTRY = {
    "get_weather": {
        "func": lambda city: {"city": city, "temperature": 18, "condition": "Sunny"}
    }
}

def dispatch_tool_call(tool_name: str, args: dict) -> dict:
    """Safely dispatches a tool execution request from the model."""
    if tool_name not in TOOL_REGISTRY:
        return {"error": f"Tool '{tool_name}' is not registered."}
    
    try:
        tool_func = TOOL_REGISTRY[tool_name]["func"]
        # TODO: Execute tool_func(**args) and return the result
        result = tool_func(**args)
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Test successful dispatch
res1 = dispatch_tool_call("get_weather", {"city": "Tokyo"})
print("Valid Tool Dispatch:", res1)

# Test unknown tool dispatch
res2 = dispatch_tool_call("book_flight", {"destination": "Tokyo"})
print("Unknown Tool Dispatch:", res2)`,
        hints: [
          'Call tool_func(**args) inside the try block and return {"status": "success", "result": result}'
        ],
        solutionCode: `TOOL_REGISTRY = {
    "get_weather": {
        "func": lambda city: {"city": city, "temperature": 18, "condition": "Sunny"}
    }
}

def dispatch_tool_call(tool_name: str, args: dict) -> dict:
    """Safely dispatches a tool execution request from the model."""
    if tool_name not in TOOL_REGISTRY:
        return {"error": f"Tool '{tool_name}' is not registered."}
    
    try:
        tool_func = TOOL_REGISTRY[tool_name]["func"]
        result = tool_func(**args)
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

res1 = dispatch_tool_call("get_weather", {"city": "Tokyo"})
print("Valid Tool Dispatch:", res1)

res2 = dispatch_tool_call("book_flight", {"destination": "Tokyo"})
print("Unknown Tool Dispatch:", res2)`,
        expectedOutputContains: 'Valid Tool Dispatch:',
        conceptCallout: 'The double-star **args syntax in Python unpacks dictionary keys directly into named function parameters matching the tool signature.'
      },
      {
        id: 4,
        title: 'Step 4 — Build the Complete Autonomous Tool-Calling Agent Loop',
        concept: 'Now we assemble the complete autonomous agent loop: simulate user prompt interpretation, autonomous tool selection, execution, and final response synthesis.',
        goal: 'Assemble run_agent_loop() to coordinate query parsing, tool execution, and human-friendly response generation.',
        whyItMatters: 'This ReAct (Reason + Act) loop is the core architectural pattern behind modern AI agents like Claude Code, ChatGPT Tools, and Gemini Assistants.',
        starterCode: `# Step 4: Complete Autonomous Tool-Calling Agent Loop
# Simulates the full 4-step tool invocation and response synthesis cycle.

DATABASE = {
    "tokyo": {"temp": 18, "condition": "Sunny", "humidity": 45, "recommendation": "Great for outdoor sightseeing"},
    "london": {"temp": 11, "condition": "Light Rain", "humidity": 85, "recommendation": "Bring an umbrella and waterproof coat"}
}

def get_weather_tool(city: str) -> dict:
    """Lookup current weather."""
    return DATABASE.get(city.lower(), {"error": "City not found in database."})

def run_agent_loop(user_query: str):
    print(f"USER QUERY: '{user_query}'")
    
    # 1. Simulate Model Reasoning: Detect if tool is needed
    query_lower = user_query.lower()
    target_city = None
    for city in DATABASE.keys():
        if city in query_lower:
            target_city = city
            break
            
    if not target_city:
        return "I can help with weather for Tokyo or London. Which city would you like to check?"
        
    print(f"-> [Agent Reasoning]: Model decided to call get_weather_tool(city='{target_city.capitalize()}')")
    
    # 2. Execute tool locally
    tool_data = get_weather_tool(target_city)
    print(f"-> [Tool Execution]: Retrieved raw data: {tool_data}")
    
    # 3. Synthesize natural language answer
    final_answer = (
        f"The current weather in {target_city.capitalize()} is {tool_data['temp']}°C with {tool_data['condition']}. "
        f"Humidity is {tool_data['humidity']}%. Travel Tip: {tool_data['recommendation']}."
    )
    return final_answer

# Run test query
response = run_agent_loop("What should I wear for my trip to Tokyo today?")
print(f"\\nFINAL SYNTHESIZED AGENT ANSWER:\\n{response}")`,
        hints: [
          'Inspect how tool_data values are formatted into the final_answer string'
        ],
        solutionCode: `DATABASE = {
    "tokyo": {"temp": 18, "condition": "Sunny", "humidity": 45, "recommendation": "Great for outdoor sightseeing"},
    "london": {"temp": 11, "condition": "Light Rain", "humidity": 85, "recommendation": "Bring an umbrella and waterproof coat"}
}

def get_weather_tool(city: str) -> dict:
    """Lookup current weather."""
    return DATABASE.get(city.lower(), {"error": "City not found in database."})

def run_agent_loop(user_query: str):
    print(f"USER QUERY: '{user_query}'")
    query_lower = user_query.lower()
    target_city = None
    for city in DATABASE.keys():
        if city in query_lower:
            target_city = city
            break
            
    if not target_city:
        return "I can help with weather for Tokyo or London. Which city would you like to check?"
        
    print(f"-> [Agent Reasoning]: Model decided to call get_weather_tool(city='{target_city.capitalize()}')")
    tool_data = get_weather_tool(target_city)
    print(f"-> [Tool Execution]: Retrieved raw data: {tool_data}")
    
    final_answer = (
        f"The current weather in {target_city.capitalize()} is {tool_data['temp']}°C with {tool_data['condition']}. "
        f"Humidity is {tool_data['humidity']}%. Travel Tip: {tool_data['recommendation']}."
    )
    return final_answer

response = run_agent_loop("What should I wear for my trip to Tokyo today?")
print(f"\\nFINAL SYNTHESIZED AGENT ANSWER:\\n{response}")`,
        expectedOutputContains: 'FINAL SYNTHESIZED AGENT ANSWER:',
        conceptCallout: 'Congratulations! You have constructed an end-to-end autonomous tool-calling AI agent. You understand how AI models decide when to call tools, how backends execute them safely, and how data is synthesized back into natural human answers!'
      }
    ]
  },

  'ai-5-1': {
    id: 'ai-5-1',
    title: 'Why LLMs Forget & Knowledge Cutoffs',
    subtitle: 'Understanding Working Memory Limits, Attention Dilution, and the Bridge to RAG',
    section: 'Module 5 · Chapter 1',
    estimatedTime: '10 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/retrieval-augmented-generation-rag-in-ai/',

    badgeText: 'MODULE 5 • RAG FOUNDATIONS',
    badgeColor: '#0284c7',
    videoUrl: 'https://www.youtube.com/embed/mKtBS-pKY3Y',

    diagram: {
      type: 'context_memory_limit'
    },

    sections: [
      {
        heading: 'The Working Memory Paradox: Short-Term vs Long-Term Memory',
        paragraphs: [
          'Large Language Models exhibit extraordinary reasoning across domain-specific tasks, including code synthesis, financial analysis, and scientific literature digestion. However, they are bounded by a fundamental architectural limitation: working memory.',
          'To understand this limitation, consider a human cognitive parallel. If someone asks you to add 138 + 423, you commit the numbers to your short-term working memory to produce 561. If asked for the answer a year later, you will have forgotten it because it was never stored in long-term memory. Similarly, if asked to recite 20 digits of Pi (3.14159265358979323846...), short-term recall collapses under cognitive load.',
          'In Large Language Models, this short-term working memory capacity is known as the Context Window. The context window represents the strict upper bound on how many tokens an LLM can hold and attend to at any single instant.'
        ],
        codeBlockTitle: 'Context Window Spectrum Across Modern Models',
        codeBlock: `# Model Context Window & Capacity Spectrum
# -------------------------------------------------------------
# Flash / Nano Models: ~2,000 - 4,000 tokens (~1,500 - 3,000 words)
# Standard Frontier:  ~128,000 tokens (~96,000 words)
# Gemini 1.5/2.5 Pro: Up to 1,000,000+ tokens (~750,000 words / 50k lines of code)

def select_model_by_context(document_token_count: int, requires_ultra_low_latency: bool) -> str:
    """Select the optimal model based on payload size and latency targets."""
    if requires_ultra_low_latency and document_token_count < 3000:
        return "gemini-1.5-flash"  # Ultra-fast TTFT, lightweight working memory
    elif document_token_count > 100000:
        return "gemini-1.5-pro"    # Large 1M+ token context window
    return "gemini-1.5-flash"`
      },
      {
        heading: 'Knowledge Cutoffs & Frozen Parametric Weights',
        paragraphs: [
          'LLM memory is divided into two distinct categories:',
          '1. Parametric Memory: The billions of weights configured during pre-training. This knowledge is static, immutable, and frozen at the pre-training cutoff date. An LLM cannot learn what happened yesterday through its weights without expensive retraining or fine-tuning.',
          '2. Working Context Memory: The dynamic text passed into the prompt at runtime. This is the only place where real-time, private, or session-specific information can be consumed.',
          'Because parametric weights are frozen, any new facts, internal enterprise documents, or user preferences must enter through the working context window.'
        ]
      },
      {
        heading: 'Why LLMs Forget: The FIFO Truncation Trap',
        paragraphs: [
          'In multi-turn chat applications, developers maintain conversation history by storing messages in an array. However, as the conversation lengthens, the total token count eventually hits the model limit.',
          'The naive engineering response is a sliding window based on First-In, First-Out (FIFO) eviction (e.g. keeping only the last 6 messages with conversation[-6:]).',
          'While this prevents token overflow errors, it causes catastrophic forgetting. Early critical constraints—such as user dietary restrictions, API keys, or background facts (like Sally owning 14 apples)—get dropped from the prompt and vanish from the model attention heads.'
        ],
        codeBlockTitle: 'The FIFO Context Truncation Demonstration (Python)',
        codeBlock: `import google.generativeai as genai

# Simulating a sliding context window of 6 messages (3 user/assistant turns)
MAX_WINDOW_MESSAGES = 6

conversation_history = []

def add_message(role: str, text: str):
    conversation_history.append({"role": role, "text": text})

# Turn 1: Critical user fact
add_message("user", "My favorite restaurant is Luigi's Italian Pasta House.")
add_message("model", "Noted! I will remember Luigi's is your favorite.")

# Turns 2-4: Routine conversation
add_message("user", "What is the capital of Japan?")
add_message("model", "The capital of Japan is Tokyo.")
add_message("user", "What is 15 * 8?")
add_message("model", "15 * 8 is 120.")
add_message("user", "Tell me a short science joke.")
add_message("model", "Why do biologists look forward to cell division? Because it multiplies!")

# Sliding window truncation: keep only the most recent 6 messages
active_context = conversation_history[-MAX_WINDOW_MESSAGES:]

# Turn 5: User tests memory
add_message("user", "What is my favorite restaurant?")
active_context = conversation_history[-MAX_WINDOW_MESSAGES:]

print("ACTIVE CONTEXT SENT TO LLM:")
for msg in active_context:
    print(f"[{msg['role'].upper()}]: {msg['text']}")

# RESULT: The first turn mentioning Luigi's was completely evicted by FIFO!
# The LLM will now respond: 'I am sorry, you have not mentioned your favorite restaurant.'`
      },
      {
        heading: 'Attention Dilution & Noise: The Sally & Bob Apple Problem',
        paragraphs: [
          'Even when an LLM possesses a large context window, stuffing it with uncurated raw text introduces Attention Dilution (also known as Context Rot and the "Lost in the Middle" phenomenon).',
          'Consider this scenario: "Sally and Bob own an apple farm in Vermont. Sally has 14 apples. Apples are often red. 12 is a nice number. Bob has no red apples, but he has 2 green apples. Green apples often taste sour. How many apples do they have in total?"',
          'Human and artificial attention mechanisms must expend computational bandwidth filtering out irrelevant noise (apple colors, taste opinions, favorite numbers) to extract the signal (14 + 2 = 16).',
          'This establishes the discipline of Context Engineering: strategically curating, formatting, compressing, and ordering the exact subset of knowledge required for a task, rather than dumping unstructured raw data into the prompt.'
        ]
      },
      {
        heading: 'Context Engineering Solution 1: AI Summarization Compression',
        paragraphs: [
          'Instead of dropping older exchanges with a hard FIFO slice, robust production systems use an AI summarization pipeline.',
          'When conversation history approaches a token threshold (e.g. 80% of budget), a background model compresses the past conversation into a dense 50-token semantic summary while preserving all extracted entities, numbers, and decisions.',
          'This leaves 80%+ of the context window free for new real-time queries while maintaining zero memory loss.'
        ],
        codeBlockTitle: 'Context Compression with Google Gemini (Python)',
        codeBlock: `import google.generativeai as genai
import os

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def compress_conversation(history_text: str) -> str:
    """Compresses lengthy multi-turn chat into a concise state summary."""
    prompt = f"""
Analyze this conversation history and create a compact, dense summary.
PRESERVE ALL: user facts, preferences, names, numbers, constraints, and pending tasks.
OMIT ALL: conversational pleasantries, jokes, and repeated greetings.

Conversation:
{history_text}

Compact Semantic Summary:"""
    
    response = model.generate_content(prompt)
    return response.text.strip()

# Example raw conversation (approx 150 tokens)
raw_chat = """
User: Hi, I am planning a trip to Kyoto for 4 days starting October 12th.
Assistant: Wonderful! Kyoto is gorgeous in autumn.
User: I am vegetarian and my budget is $150 per day for food.
Assistant: Got it. I will look for vegetarian-friendly dining under $150/day.
User: Also, my hotel is near Gion district.
"""

compressed_state = compress_conversation(raw_chat)
print("COMPRESSED SYSTEM MEMORY (Reduced from 150 -> 40 tokens):")
print(compressed_state)
# Output: User visiting Kyoto Oct 12-16 (4 days). Hotel: near Gion. Diet: vegetarian. Food budget: $150/day.`
      },
      {
        heading: 'Context Engineering Solution 2: Profile & Session Persistence',
        paragraphs: [
          'For multi-user web applications (such as customer support, SaaS platforms, or personalized tutors), state must persist across independent user sessions without leaking data between accounts—similar to how Netflix maintains separate profile states for Alice and Bob.',
          'By serializing structured user preference files (e.g. profile_alice.json vs profile_bob.json), the backend rehydrates the user profile on login and prepends it to the system instruction.'
        ],
        codeBlockTitle: 'Profile-Based Memory Persistence (Python)',
        codeBlock: `import json
import os

PROFILE_DIR = "./user_profiles"
os.makedirs(PROFILE_DIR, exist_ok=True)

def save_user_profile(user_id: str, profile_data: dict):
    filepath = os.path.join(PROFILE_DIR, f"profile_{user_id}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(profile_data, f, indent=2)

def load_user_profile(user_id: str) -> dict:
    filepath = os.path.join(PROFILE_DIR, f"profile_{user_id}.json")
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"user_id": user_id, "preferences": [], "history_summary": ""}

# Save Alice's preference
save_user_profile("alice", {
    "user_id": "alice",
    "diet": "vegetarian",
    "favorite_cuisine": "Italian",
    "favorite_restaurant": "Luigi's Pasta House"
})

# Bob visits: gets completely fresh, isolated memory
bob_profile = load_user_profile("bob")
print(f"Bob Profile Diet: {bob_profile.get('diet', 'None specified')}")

# Alice returns tomorrow: instant memory rehydration
alice_profile = load_user_profile("alice")
print(f"Alice Returning: Favorite Cuisine = {alice_profile['favorite_cuisine']}")`
      },
      {
        heading: 'The Ultimate Solution: Retrieval-Augmented Generation (RAG)',
        paragraphs: [
          'While summarization and profile JSON files manage short conversations and user settings, enterprise knowledge bases (thousands of PDFs, documentation portals, product catalogs) cannot fit into any context window simultaneously.',
          'This brings us to Retrieval-Augmented Generation (RAG).',
          'RAG separates memory storage from reasoning compute: all company knowledge is indexed in an external searchable store (such as a Vector Database). When a user submits a prompt, the system searches the knowledge base, retrieves only the 2 to 5 most relevant paragraphs, and injects them dynamically into the LLM context window.',
          'In the upcoming lessons of Module 5, you will master the full RAG pipeline: generating vector embeddings, indexing databases (Chroma/Pinecone), performing semantic search, and synthesizing grounded answers.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The Small Whiteboard vs The Filing Cabinet',
      text: 'Think of an LLM as a world-class researcher working at a desk with a small whiteboard (the context window). Everything written on the whiteboard is in active working memory. When the board fills up, older notes must be erased (FIFO truncation). If someone litters the board with irrelevant sticky notes (noise), the researcher gets distracted. RAG is like placing a 10-drawer filing cabinet (vector database) next to the desk: when a question is asked, the researcher pulls only the exact 2 relevant index cards, pins them to the whiteboard, and answers with 100% accuracy!'
    },

    takeaways: [
      'The Context Window is the strict upper bound on how many tokens an LLM can hold and attend to at any given moment.',
      'Parametric memory is static and frozen at the pre-training cutoff date; real-time and private facts must be injected through working context.',
      'Naive FIFO sliding windows (e.g. conversation[-6:]) cause catastrophic forgetting of early critical facts.',
      'Context Engineering strategically curates, compresses, and structures input data to avoid attention dilution and token waste.',
      'AI Summarization and Profile JSON persistence solve short-term state, while RAG (Retrieval-Augmented Generation) connects LLMs to infinite external long-term knowledge.'
    ],

    quiz: {
      question: 'Why does an LLM fail to remember information shared 10 messages earlier when a backend uses a sliding window of conversation[-6:]?',
      options: [
        'Because neural networks permanently delete their training weights when idle',
        'Because older messages get truncated and removed from the active context window via First-In, First-Out (FIFO) eviction',
        'Because LLMs cannot read more than 10 words at a time',
        'Because API keys automatically expire after 5 minutes of chat'
      ],
      correctIndex: 1,
      explanation: 'Correct! LLMs are completely stateless between requests. When a backend uses a fixed sliding window like conversation[-6:], earlier exchanges are dropped from the prompt payload and never reach the model attention heads.'
    }
  },

  'ai-5-2': {
    id: 'ai-5-2',
    title: 'Building Custom Knowledge Bases',
    subtitle: 'Document Ingestion, Cleaning & Intelligent Chunking Strategies for RAG',
    section: 'Module 5 · Chapter 2',
    estimatedTime: '8 min read',
    gfgUrl: 'https://www.geeksforgeeks.org/retrieval-augmented-generation-rag-in-ai/',

    badgeText: 'CORE RAG ARCHITECTURE',
    badgeColor: '#7c3aed',

    illustrationImage: {
      src: '/rag-knowledge-base-architecture.png',
      title: 'End-to-End RAG Knowledge Base Architecture Blueprint',
      badge: 'Offline Ingestion + Online Retrieval',
      caption: 'Full architectural flow: (1) Offline document extraction, recursive chunking, embedding generation & vector storage, (2) Online user query embedding, semantic search comparison, and LLM context synthesis. Click image to expand.'
    },

    sections: [
      {
        heading: 'The Foundation of RAG: What is a Custom Knowledge Base?',
        paragraphs: [
          'Foundation models (like GPT-4o, Claude 3.5 Sonnet, or Gemini 1.5 Pro) are world-class reasoning engines trained on public internet datasets. However, they know nothing about your private company wiki, internal API documentation, proprietary codebases, or customer agreements signed five minutes ago.',
          'A Custom Knowledge Base is the foundational data substrate for all Retrieval-Augmented Generation (RAG) applications. It is an automated pipeline (an "AI ETL") that transforms messy, unstructured files (PDFs, Markdown documents, Notion databases, customer support tickets, Word documents) into a high-precision, search-ready format.',
          'Why can\'t we just feed an entire 500-page document directly into an LLM prompt? While modern models have large context windows (128k to 2M tokens), dumping raw massive documents into every prompt causes three severe problems: (1) Cost explosion ($0.50+ per single query), (2) High latency (5-15 seconds per response), and (3) "Lost in the Middle" attention degradation where models fail to retrieve needles from massive haystacks.'
        ]
      },
      {
        heading: 'The 4-Stage Knowledge Base Ingestion Pipeline',
        paragraphs: [
          'In production AI engineering, building a knowledge base follows a structured 4-stage lifecycle:',
          '1. Document Extraction & Parsing: Extracting raw text, structural hierarchy, and tables from diverse formats (PDFs via PyPDF/Docling, Markdown via AST parsers, HTML via BeautifulSoup, and image scans via OCR).',
          '2. Cleaning & Normalization: Removing noise such as repeated website headers/footers, page numbers, duplicate whitespace, and garbage characters while preserving semantic formatting (Markdown headers #, ##, and bullet lists).',
          '3. Intelligent Chunking: Slicing long documents into self-contained text passages (typically 200 to 500 tokens) with intentional overlap so critical thoughts are never cut in half.',
          '4. Metadata Enrichment: Attaching structured tags (e.g. source_file, page_number, section_header, author, timestamp, department) to every chunk so downstream search engines can perform hybrid filtering.'
        ]
      },
      {
        heading: 'Comparing the 4 Major Chunking Strategies',
        paragraphs: [
          'Chunking is the single most critical factor determining RAG retrieval accuracy. If your chunking strategy is flawed, your vector search will retrieve broken or misleading context, and the LLM will hallucinate.',
          'Let us compare the four primary chunking strategies used in modern AI systems:',
          '1. Fixed-Size Chunking (Character/Token-based): Slices text into exact fixed counts (e.g., every 500 characters). While simple and fast, it is naive because it frequently cuts sentences, equations, and numbers in half (e.g., splitting "$10,000" into "$10" in Chunk 1 and ",000" in Chunk 2).',
          '2. Recursive Character Text Splitting (Industry Standard): Uses a hierarchical priority list of separators: first attempts double line breaks (\\n\\n) to preserve paragraphs, then single line breaks (\\n) for lines, then spaces ( ) for words, and only as a last resort splits characters. This keeps logical paragraphs intact.',
          '3. Document-Aware / Markdown Header Chunking: Slices documents along structural headings (H1, H2, H3). It prepends the parent breadcrumb hierarchy (e.g., "# Cloud Security > ## Authentication > ### MFA Policy") to every child chunk so the model never loses the high-level context.',
          '4. Semantic / Sentence-Window Chunking: Splits the document into individual sentences, measures semantic similarity between consecutive sentences using embeddings, and merges sentences only until a semantic topic shift occurs.'
        ],
        codeBlockTitle: 'Building a Recursive Chunking Pipeline (Python)',
        codeBlock: `import re
from typing import List, Dict, Any

class CustomKnowledgeBase:
    """Production-grade Ingestion & Chunking Pipeline for RAG."""
    
    def __init__(self, chunk_size: int = 400, chunk_overlap: int = 80):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.knowledge_store: List[Dict[str, Any]] = []

    def clean_text(self, text: str) -> str:
        """Normalizes whitespace and strips boilerplate noise."""
        text = re.sub(r'\\r\\n', '\\n', text)
        text = re.sub(r'[ \\t]+', ' ', text)
        text = re.sub(r'\\n{3,}', '\\n\\n', text)
        return text.strip()

    def recursive_split(self, text: str) -> List[str]:
        """Hierarchically splits text across paragraphs, sentences, and words."""
        if len(text) <= self.chunk_size:
            return [text] if text.strip() else []

        separators = ["\\n\\n", "\\n", ". ", " "]
        for sep in separators:
            parts = text.split(sep)
            if len(parts) > 1:
                chunks = []
                current_chunk = ""
                
                for part in parts:
                    candidate = f"{current_chunk}{sep}{part}" if current_chunk else part
                    if len(candidate) <= self.chunk_size:
                        current_chunk = candidate
                    else:
                        if current_chunk:
                            chunks.append(current_chunk.strip())
                        # Calculate overlap from trailing end of current_chunk
                        overlap_prefix = current_chunk[-self.chunk_overlap:] if self.chunk_overlap > 0 else ""
                        current_chunk = f"{overlap_prefix}{sep}{part}".strip()
                
                if current_chunk:
                    chunks.append(current_chunk.strip())
                return chunks

        # Fallback hard slice if no separator matched
        return [text[i:i + self.chunk_size] for i in range(0, len(text), self.chunk_size - self.chunk_overlap)]

    def ingest_document(self, doc_id: str, content: str, metadata: Dict[str, Any]):
        """Cleans, chunks, and tags a document with rich metadata."""
        cleaned = self.clean_text(content)
        raw_chunks = self.recursive_split(cleaned)
        
        for idx, chunk_text in enumerate(raw_chunks):
            chunk_record = {
                "chunk_id": f"{doc_id}_chunk_{idx:03d}",
                "document_id": doc_id,
                "chunk_index": idx,
                "text": chunk_text,
                "char_length": len(chunk_text),
                "metadata": {
                    **metadata,
                    "total_chunks": len(raw_chunks),
                    "chunk_index": idx
                }
            }
            self.knowledge_store.append(chunk_record)
            
        print(f"[SUCCESS] Ingested '{doc_id}': Created {len(raw_chunks)} searchable chunks.")

# Example Ingestion Run
kb = CustomKnowledgeBase(chunk_size=300, chunk_overlap=60)
sample_policy = """
# Enterprise SLA & Refund Policy
Our service provides a 99.9% uptime guarantee for all Enterprise tier subscribers.
If monthly uptime drops below 99.0%, clients are entitled to a 25% billing credit.

## Claim Procedure
To claim an SLA credit, submit an official ticket to support@company.com within 30 days
of the incident date. Credits are applied directly to the next billing cycle invoice.
"""

kb.ingest_document(
    doc_id="sla_policy_2026",
    content=sample_policy,
    metadata={"department": "Customer Support", "tier": "Enterprise", "version": "2026.1"}
)

print(f"Total chunks in knowledge base: {len(kb.knowledge_store)}")`
      },
      {
        heading: 'Why Chunk Overlap Prevents Context Fracturing',
        paragraphs: [
          'Why do we configure a chunk overlap (typically 10% to 20% of the chunk size)?',
          'Imagine a financial document stating: "The company recorded a quarterly profit of $4.5 million, representing a 28% increase over prior year." If a naive splitter without overlap cuts directly after "profit of", Chunk 1 ends with "...profit of" and Chunk 2 begins with "$4.5 million, representing...".',
          'When a user asks "What was the quarterly profit?", neither chunk individually contains the complete subject-predicate relationship! Chunk 1 has the concept "profit" with no number, and Chunk 2 has the number "$4.5M" with no mention of profit.',
          'By setting a chunk overlap of 50–100 characters (or 20–40 tokens), the boundary sentence is duplicated across both Chunk 1 and Chunk 2. This guarantees that no matter which chunk the vector search retrieves, the full semantic thought is preserved intact.'
        ]
      },
      {
        heading: 'Metadata Enrichment: Empowering Hybrid Vector Search',
        paragraphs: [
          'A modern knowledge chunk is not just raw text—it is a structured JSON object carrying rich metadata tags.',
          'Common metadata attributes include: source_file (e.g. "Q3_Report.pdf"), page_number (e.g. 14), section_path (e.g. "Security > Authentication > MFA"), timestamp (e.g. "2026-08-15"), and department (e.g. "Legal").',
          'Why is metadata indispensable? In enterprise RAG, vector search alone can be imprecise when searching across thousands of similar documents. Metadata enables pre-filtering (filtering by SQL/JSON attributes BEFORE computing vector similarity). For example: "Search only within department == \'Legal\' AND created_year >= 2025". This eliminates 95% of irrelevant vector candidates, slashing retrieval latency and eliminating cross-department hallucinations.'
        ]
      }
    ],

    analogy: {
      title: 'Real-World Analogy: The 500-Page Encyclopedia vs The Indexed Flashcards',
      text: 'Handing an LLM a 500-page raw PDF manual is like asking a human to read an entire encyclopedia volume in 2 seconds to answer a single question about page 42. Building a knowledge base is like taking that encyclopedia, neatly slicing it into single-topic index cards (chunking), highlighting the overlapping sentences between cards so no thoughts are severed, writing the chapter and page number on the top corner (metadata), and filing them in a color-coded drawer. When a question arrives, you pull only the exact 2 cards needed and hand them directly to the researcher!'
    },

    diagram: {
      type: 'knowledge_base_ingestion',
      title: 'Interactive Knowledge Base Ingestion & Chunking Architecture'
    },

    takeaways: [
      'A Custom Knowledge Base is the foundational data substrate that grounds LLMs in private, up-to-date domain facts.',
      'The AI ETL lifecycle consists of 4 stages: Extraction & Parsing, Cleaning & Normalization, Intelligent Chunking, and Metadata Enrichment.',
      'Recursive Character Text Splitting (paragraphs → lines → words) is the industry standard for preserving logical sentence boundaries.',
      'Chunk overlap (10% to 20%) is mandatory to prevent boundary fracturing where subjects and numbers are severed across chunks.',
      'Rich metadata tags enable fast SQL/JSON pre-filtering before vector distance calculation, drastically reducing noise and latency.'
    ],

    quiz: {
      question: 'An AI engineer notices that their RAG system fails to answer questions when key numerical facts span across the boundary of two adjacent text chunks. What is the most effective engineering solution?',
      options: [
        'Increase model temperature to 1.0 so the LLM guesses the missing number',
        'Configure a 15% to 20% chunk overlap so boundary sentences are preserved in both adjacent chunks',
        'Convert all documents to uppercase text before indexing',
        'Delete all punctuation marks from the source document'
      ],
      correctIndex: 1,
      explanation: 'Spot on! Chunk overlap ensures that boundary sentences spanning across chunk thresholds are duplicated into both neighboring chunks, preventing critical context or numbers from being split and lost.'
    }
  }
};












