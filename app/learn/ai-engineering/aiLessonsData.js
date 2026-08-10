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
  }
};
