'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import { aiLessonsData } from '../aiLessonsData';

// ─── SVG VECTOR ICONS ──────────────────────────────────────────────────
const IconArrowLeft = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const IconArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconExternalLink = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconCheckmark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconSparkles = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275-1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
  </svg>
);

const IconVideo = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="3" ry="3"/>
  </svg>
);

// Nested Circles SVG Diagram Component (Matching User Reference Image Style)
const NestedCirclesDiagram = () => {
  const [activeCircle, setActiveCircle] = useState(null);

  return (
    <div className={styles.nestedSvgContainer}>
      <svg viewBox="0 0 500 460" className={styles.nestedSvg}>
        <defs>
          <filter id="circleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* 1. OUTER CIRCLE: Artificial Intelligence */}
        <g
          className={styles.circleGroup}
          onMouseEnter={() => setActiveCircle('ai')}
          onMouseLeave={() => setActiveCircle(null)}
        >
          <circle cx="250" cy="230" r="210" fill="#15803d" stroke="#166534" strokeWidth="4" filter="url(#circleShadow)" />
          <text x="250" y="75" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="800" fontFamily="Inter, sans-serif">
            Artificial Intelligence
          </text>
          <text x="250" y="98" textAnchor="middle" fill="#dcfce7" fontSize="13" fontWeight="600" opacity="0.95">
            The Broad Concept of Smart Machines
          </text>
        </g>

        {/* 2. MIDDLE CIRCLE: Machine Learning */}
        <g
          className={styles.circleGroup}
          onMouseEnter={() => setActiveCircle('ml')}
          onMouseLeave={() => setActiveCircle(null)}
        >
          <circle cx="250" cy="275" r="148" fill="#86efac" stroke="#16a34a" strokeWidth="3.5" filter="url(#circleShadow)" />
          <text x="250" y="185" textAnchor="middle" fill="#064e3b" fontSize="21" fontWeight="800" fontFamily="Inter, sans-serif">
            Machine Learning
          </text>
          <text x="250" y="206" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="600">
            Algorithms Learning from Data
          </text>
        </g>

        {/* 3. INNER CIRCLE: Deep Learning */}
        <g
          className={styles.circleGroup}
          onMouseEnter={() => setActiveCircle('dl')}
          onMouseLeave={() => setActiveCircle(null)}
        >
          <circle cx="250" cy="335" r="86" fill="#ffffff" stroke="#22c55e" strokeWidth="3.5" filter="url(#circleShadow)" />
          <text x="250" y="328" textAnchor="middle" fill="#0f172a" fontSize="19" fontWeight="900" fontFamily="Inter, sans-serif">
            Deep Learning
          </text>
          <text x="250" y="350" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="700">
            Multi-Layer Neural Networks
          </text>
        </g>
      </svg>

      {/* Info Callout Box */}
      <div className={styles.nestedInfoCard}>
        {activeCircle === 'ai' && (
          <p><strong>Artificial Intelligence (AI)</strong>: The outer umbrella encompassing all intelligent machines, expert rule systems, and self-learning models.</p>
        )}
        {activeCircle === 'ml' && (
          <p><strong>Machine Learning (ML)</strong>: The middle layer of algorithms that automatically discover patterns from data without hand-written code.</p>
        )}
        {activeCircle === 'dl' && (
          <p><strong>Deep Learning (DL)</strong>: The inner core inspired by human brain neural networks powering ChatGPT, Midjourney, and Autonomous Vision.</p>
        )}
        {!activeCircle && (
          <p><em>Hover over any circle in the diagram above to inspect how AI, Machine Learning, and Deep Learning fit together!</em></p>
        )}
      </div>
    </div>
  );
};

// LLM Architecture Flowchart Diagram Component (Matching User Reference Flowchart Image)
const LLMFlowchartDiagram = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = {
    input: {
      title: '1. Input Data',
      desc: 'The raw text prompt provided by the user (e.g., "Explain quantum computing in simple terms").'
    },
    tokenization: {
      title: '2. Tokenization',
      desc: 'Breaks raw text strings into numerical sub-word pieces called "tokens" (e.g., "quantum" → 14932).'
    },
    embedding: {
      title: '3. Embedding Layer',
      desc: 'Translates discrete token numbers into dense vector coordinates in high-dimensional semantic space.'
    },
    transformer: {
      title: '4. Transformer Blocks',
      desc: 'The heart of the LLM containing stacked layers of Self-Attention and Feed-Forward Neural Networks.'
    },
    attention: {
      title: '4a. Self-Attention Mechanism',
      desc: 'Calculates context weights between words in a sequence (e.g., connecting "it" to "river" instead of "bank").'
    },
    feedforward: {
      title: '4b. Feed-Forward Network',
      desc: 'Processes attention-weighted features through dense non-linear layers to extract higher-level representations.'
    },
    output: {
      title: '5. Output Layer',
      desc: 'Converts final hidden vectors back into probability distributions (Softmax) over candidate vocabulary words.'
    },
    optimization: {
      title: '6. Training & Loss Optimization',
      desc: 'Calculates error (Loss) between predicted vs actual next words, updating parameters via Gradient Descent.'
    }
  };

  return (
    <div className={styles.flowchartContainer}>
      <svg viewBox="0 0 540 680" className={styles.flowchartSvg}>
        <defs>
          <filter id="nodeGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.2" />
          </filter>

          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
          </marker>
        </defs>

        {/* CONNECTION LINES & ARROWS */}
        <line x1="270" y1="48" x2="270" y2="82" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="270" y1="126" x2="270" y2="160" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="270" y1="204" x2="270" y2="242" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />

        {/* Transformer Splits */}
        <path d="M 270 338 L 140 338 L 140 344" fill="none" stroke="#22c55e" strokeWidth="2.5" />
        <path d="M 270 338 L 400 338 L 400 344" fill="none" stroke="#22c55e" strokeWidth="2.5" />

        {/* Branch Labels */}
        <text x="180" y="328" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">Self-Attention</text>
        <text x="360" y="328" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">Feed-Forward</text>

        {/* Rejoin Branches to Output Layer */}
        <path d="M 140 382 L 140 420 L 270 420" fill="none" stroke="#22c55e" strokeWidth="2.5" />
        <path d="M 400 382 L 400 420 L 270 420" fill="none" stroke="#22c55e" strokeWidth="2.5" />
        <line x1="270" y1="420" x2="270" y2="462" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="270" y1="506" x2="270" y2="548" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />

        {/* NODE 1: INPUT DATA */}
        <g
          className={`${styles.flowNode} ${activeStep === 'input' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('input')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="150" y="10" width="240" height="38" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" filter="url(#nodeGlow)" />
          <text x="270" y="34" textAnchor="middle" fill="#14532d" fontSize="15" fontWeight="800">Input Data</text>
        </g>

        {/* NODE 2: TOKENIZATION */}
        <g
          className={`${styles.flowNode} ${activeStep === 'tokenization' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('tokenization')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="150" y="88" width="240" height="38" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" filter="url(#nodeGlow)" />
          <text x="270" y="112" textAnchor="middle" fill="#14532d" fontSize="15" fontWeight="800">Tokenization</text>
        </g>

        {/* NODE 3: EMBEDDING LAYER */}
        <g
          className={`${styles.flowNode} ${activeStep === 'embedding' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('embedding')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="150" y="166" width="240" height="38" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" filter="url(#nodeGlow)" />
          <text x="270" y="190" textAnchor="middle" fill="#14532d" fontSize="15" fontWeight="800">Embedding Layer</text>
        </g>

        {/* NODE 4: TRANSFORMER BLOCKS (DIAMOND NODE) */}
        <g
          className={`${styles.flowNode} ${activeStep === 'transformer' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('transformer')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <polygon points="270 242, 345 290, 270 338, 195 290" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" filter="url(#nodeGlow)" />
          <text x="270" y="284" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="900">Transformer</text>
          <text x="270" y="298" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="900">Blocks</text>
        </g>

        {/* NODE 5: SELF-ATTENTION MECHANISM */}
        <g
          className={`${styles.flowNode} ${activeStep === 'attention' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('attention')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="35" y="344" width="210" height="38" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" filter="url(#nodeGlow)" />
          <text x="140" y="368" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="800">Self-Attention Mechanism</text>
        </g>

        {/* NODE 6: FEED-FORWARD NETWORK */}
        <g
          className={`${styles.flowNode} ${activeStep === 'feedforward' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('feedforward')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="295" y="344" width="210" height="38" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" filter="url(#nodeGlow)" />
          <text x="400" y="368" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="800">Feed-Forward Network</text>
        </g>

        {/* NODE 7: OUTPUT LAYER */}
        <g
          className={`${styles.flowNode} ${activeStep === 'output' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('output')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="150" y="468" width="240" height="38" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" filter="url(#nodeGlow)" />
          <text x="270" y="492" textAnchor="middle" fill="#14532d" fontSize="15" fontWeight="800">Output Layer</text>
        </g>

        {/* NODE 8: TRAINING & LOSS OPTIMIZATION */}
        <g
          className={`${styles.flowNode} ${activeStep === 'optimization' ? styles.flowNodeActive : ''}`}
          onMouseEnter={() => setActiveStep('optimization')}
          onMouseLeave={() => setActiveStep(null)}
        >
          <rect x="110" y="554" width="320" height="42" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" filter="url(#nodeGlow)" />
          <text x="270" y="580" textAnchor="middle" fill="#14532d" fontSize="15" fontWeight="900">Training & Loss Optimization</text>
        </g>
      </svg>

      {/* Interactive Step Description Box */}
      <div className={styles.flowchartInfoBox}>
        {activeStep ? (
          <div>
            <strong>{steps[activeStep].title}</strong>: {steps[activeStep].desc}
          </div>
        ) : (
          <div>
            <em>Hover over any block in the flowchart above to inspect each stage of the LLM architecture!</em>
          </div>
        )}
      </div>
    </div>
  );
};

// Vector Art Icons for Training vs Inference Diagram
const PersonSvg = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <circle cx="20" cy="12" r="7" fill="#2563eb" />
    <path d="M 6 32 C 6 22, 10 18, 20 18 C 30 18, 34 22, 34 32 Z" fill="#2563eb" />
  </g>
);

const BicycleSvg = ({ x, y, color = "#d97706", scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <circle cx="12" cy="22" r="10" fill="none" stroke={color} strokeWidth="2.5" />
    <circle cx="48" cy="22" r="10" fill="none" stroke={color} strokeWidth="2.5" />
    <circle cx="28" cy="22" r="3" fill={color} />
    <line x1="12" y1="22" x2="28" y2="22" stroke={color} strokeWidth="2" />
    <line x1="12" y1="22" x2="22" y2="10" stroke={color} strokeWidth="2" />
    <line x1="28" y1="22" x2="22" y2="10" stroke={color} strokeWidth="2" />
    <line x1="28" y1="22" x2="40" y2="8" stroke={color} strokeWidth="2" />
    <line x1="48" y1="22" x2="40" y2="8" stroke={color} strokeWidth="2" />
    <line x1="40" y1="8" x2="36" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="19" y1="9" x2="25" y2="9" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </g>
);

const StrawberrySvg = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <path d="M 12 8 C 4 12, 4 26, 16 32 C 28 26, 28 12, 20 8 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
    <circle cx="12" cy="16" r="1" fill="#fef08a" />
    <circle cx="20" cy="16" r="1" fill="#fef08a" />
    <circle cx="16" cy="22" r="1" fill="#fef08a" />
    <circle cx="12" cy="26" r="1" fill="#fef08a" />
    <circle cx="20" cy="26" r="1" fill="#fef08a" />
    <path d="M 12 9 C 14 5, 18 5, 20 9 C 18 7, 14 7, 12 9 Z" fill="#16a34a" />
    <path d="M 16 9 L 16 4" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
  </g>
);

// Training vs Inference Diagram Component (Matching User Reference Diagram Image)
const TrainingInferenceDiagram = () => {
  const [activeStage, setActiveStage] = useState(null);

  const stages = {
    labeled_data: {
      title: '1. Training Data (Labeled Dataset)',
      desc: 'Massive amounts of input data labeled with correct answers (e.g. photos tagged as Person, Bicycle, Strawberry). Used to teach the neural network.'
    },
    train_forward: {
      title: '2. Training Forward Pass',
      desc: 'The input image passes forward through the neural network layers, producing an initial probabilistic prediction (e.g., guessing "Strawberry").'
    },
    error_calc: {
      title: '3. Loss & Error Calculation (?)',
      desc: 'Compares the model prediction ("Strawberry") with the actual ground truth ("Bicycle"). The difference represents the error/loss.'
    },
    backprop: {
      title: '4. Backward Pass (Backpropagation)',
      desc: 'The calculated error flows backward through the network, updating weights and biases to reduce future prediction mistakes.'
    },
    model_weights: {
      title: '5. Model Weights Transfer (Frozen Parameters)',
      desc: 'Once training achieves high accuracy, parameter updating stops. The final optimized weights are saved and transferred to production.'
    },
    unseen_data: {
      title: '6. Unseen Inference Input',
      desc: 'An end user submits a new, unlabeled input (e.g. a new photo of a bicycle or a prompt). The model has never seen this specific image before.'
    },
    inference_pass: {
      title: '7. Real-Time Inference Forward Pass',
      desc: 'The unseen input passes forward through the locked/frozen weights in milliseconds, instantly outputting the accurate prediction: "Bicycle"!'
    }
  };

  return (
    <div className={styles.flowchartContainer}>
      <svg viewBox="0 0 920 490" className={styles.flowchartSvg} style={{ maxWidth: '820px' }}>
        <defs>
          <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>

        {/* SECTION HEADINGS */}
        <text x="30" y="140" fill="#1d4ed8" fontSize="26" fontWeight="900">Training</text>
        <text x="30" y="380" fill="#1d4ed8" fontSize="26" fontWeight="900">Inference</text>

        {/* TOP HALF: TRAINING */}
        {/* 1. Labeled Data Stack */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('labeled_data')} onClick={() => setActiveStage('labeled_data')}>
          {/* Stacked Cards */}
          <rect x="150" y="45" width="130" height="150" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <PersonSvg x={195} y={80} scale={1.2} />
          <text x="195" y="65" fill="#1e3a8a" fontSize="13" fontStyle="italic" fontWeight="700">Person</text>

          <rect x="140" y="35" width="130" height="150" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
          <BicycleSvg x={175} y={75} color="#d97706" scale={1.1} />
          <text x="180" y="55" fill="#1e3a8a" fontSize="13" fontStyle="italic" fontWeight="700">Bicycle</text>

          <rect x="130" y="25" width="130" height="150" rx="10" fill="#ffffff" stroke="#334155" strokeWidth="2" />
          <StrawberrySvg x={175} y={65} scale={1.3} />
          <text x="155" y="140" fill="#9f1239" fontSize="14" fontStyle="italic" fontWeight="800">Strawberry</text>

          <text x="215" y="168" fill="#475569" fontSize="11" fontWeight="700" transform="rotate(-30 215 168)">Lots of labeled data!</text>
        </g>

        {/* Arrow Data -> Training Net */}
        <line x1="285" y1="100" x2="345" y2="100" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />

        {/* 2. Training Neural Network */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('train_forward')} onClick={() => setActiveStage('train_forward')}>
          <rect x="350" y="15" width="130" height="170" rx="14" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="370" cy="40" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <circle cx="370" cy="80" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <circle cx="370" cy="120" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <circle cx="370" cy="160" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />

          <circle cx="415" cy="60" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <circle cx="415" cy="100" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <circle cx="415" cy="140" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />

          <circle cx="460" cy="60" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <circle cx="460" cy="100" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <circle cx="460" cy="140" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />

          <line x1="381" y1="40" x2="404" y2="60" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="381" y1="80" x2="404" y2="60" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="381" y1="80" x2="404" y2="100" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="381" y1="120" x2="404" y2="100" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="381" y1="160" x2="404" y2="140" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="426" y1="60" x2="449" y2="60" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="426" y1="100" x2="449" y2="100" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="426" y1="140" x2="449" y2="140" stroke="#94a3b8" strokeWidth="1.2" />
        </g>

        {/* Forward Arrow to Prediction */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('train_forward')} onClick={() => setActiveStage('train_forward')}>
          <line x1="480" y1="85" x2="600" y2="85" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />
          <text x="515" y="75" fill="#3b82f6" fontSize="13" fontWeight="800">Forward</text>
          <text x="610" y="92" fill="#0f172a" fontSize="17" fontWeight="800">&quot;Strawberry&quot;</text>
        </g>

        {/* Ground Truth Label Box */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('error_calc')} onClick={() => setActiveStage('error_calc')}>
          <rect x="780" y="20" width="105" height="90" rx="8" fill="#ffffff" stroke="#334155" strokeWidth="2" />
          <BicycleSvg x={800} y={35} color="#d97706" scale={1.1} />
          <text x="805" y="100" fill="#0f172a" fontSize="14" fontWeight="800">&quot;Bicycle&quot;</text>
        </g>

        {/* Ground Truth Arrow to Loss Diamond */}
        <line x1="780" y1="65" x2="755" y2="65" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
        <line x1="700" y1="65" x2="725" y2="65" stroke="#3b82f6" strokeWidth="2.5" />

        {/* Loss Evaluation Diamond Node */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('error_calc')} onClick={() => setActiveStage('error_calc')}>
          <polygon points="740,50 760,65 740,80 720,65" fill="#ffffff" stroke="#334155" strokeWidth="2" />
          <text x="736" y="70" fill="#0f172a" fontSize="16" fontWeight="800">?</text>
          <text x="725" y="98" fill="#475569" fontSize="12" fontWeight="700">Error</text>
        </g>

        {/* Backpropagation Line */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('backprop')} onClick={() => setActiveStage('backprop')}>
          <path d="M 740,102 L 740,145 L 350,145" fill="none" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />
          <text x="500" y="162" fill="#3b82f6" fontSize="13" fontWeight="800">Backward (Backpropagation)</text>
        </g>

        {/* Model Weights Transfer Downward Arrow */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('model_weights')} onClick={() => setActiveStage('model_weights')}>
          <line x1="415" y1="185" x2="415" y2="245" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />
          <text x="425" y="215" fill="#3b82f6" fontSize="13" fontWeight="800">Model weights</text>
        </g>

        {/* BOTTOM HALF: INFERENCE */}
        {/* Unseen Input Box */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('unseen_data')} onClick={() => setActiveStage('unseen_data')}>
          <rect x="130" y="300" width="140" height="120" rx="10" fill="#ffffff" stroke="#334155" strokeWidth="2" />
          <BicycleSvg x={165} y={320} color="#65a30d" scale={1.25} />
          <text x="172" y="405" fill="#047857" fontSize="15" fontStyle="italic" fontWeight="800">??????</text>
        </g>

        {/* Arrow Unseen Input -> Inference Net */}
        <line x1="270" y1="365" x2="345" y2="365" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />

        {/* Inference Neural Network (Frozen Weights) */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('inference_pass')} onClick={() => setActiveStage('inference_pass')}>
          <rect x="350" y="250" width="130" height="170" rx="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          
          <circle cx="370" cy="275" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="370" cy="315" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="370" cy="355" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="370" cy="395" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />

          <circle cx="415" cy="295" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="415" cy="335" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="415" cy="375" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />

          <circle cx="460" cy="295" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="460" cy="335" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="460" cy="375" r="11" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />

          <line x1="381" y1="275" x2="404" y2="295" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="381" y1="315" x2="404" y2="295" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="381" y1="315" x2="404" y2="335" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="381" y1="355" x2="404" y2="335" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="381" y1="395" x2="404" y2="375" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="426" y1="295" x2="449" y2="295" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="426" y1="335" x2="449" y2="335" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="426" y1="375" x2="449" y2="375" stroke="#3b82f6" strokeWidth="1.5" />
        </g>

        {/* Forward Arrow to Final Inference Prediction */}
        <g className={styles.flowNode} onMouseEnter={() => setActiveStage('inference_pass')} onClick={() => setActiveStage('inference_pass')}>
          <line x1="480" y1="335" x2="600" y2="335" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />
          <text x="515" y="325" fill="#3b82f6" fontSize="13" fontWeight="800">Forward</text>
          <text x="610" y="342" fill="#15803d" fontSize="19" fontWeight="900">&quot;Bicycle&quot;</text>
        </g>
      </svg>

      {/* Interactive Step Callout Description Box */}
      <div className={styles.flowchartInfoBox} style={{ background: '#eff6ff', borderColor: '#93c5fd', color: '#1e3a8a' }}>
        {activeStage ? (
          <div>
            <strong>{stages[activeStage].title}</strong>: {stages[activeStage].desc}
          </div>
        ) : (
          <div>
            <em>Hover over or click any node in the diagram above to inspect how Training (Backpropagation) vs. Inference (Frozen Weights) operates!</em>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── TRANSFORMER DIAGRAM ────────────────────────────────────────────────────
const TransformerDiagram = () => {
  const [activeNode, setActiveNode] = useState(null);

  const info = {
    rnn:      { title: 'RNN (Old Approach)', desc: 'Words are fed in one at a time — word 1, then word 2, then word 3. By word 50, the model has nearly forgotten word 1. Training is also painfully slow because each step depends on the last.' },
    parallel: { title: 'Transformer: Parallel Processing', desc: 'All words are fed into the model simultaneously in a single step. No waiting. No sequential bottleneck. This allows massive GPU parallelism and training on 45 TB of text data.' },
    pos:      { title: 'Positional Encoding', desc: 'Since all words arrive at once, each word is tagged with its position number (1, 2, 3...) before entering the network. The model learns what position means from training data — word order is stored in the data itself, not the network structure.' },
    attn:     { title: 'Attention Heat Map', desc: 'When translating a word, the model looks at every other word in the sentence simultaneously. Darker connections = higher attention weight. The model learns which words to attend to from thousands of training examples.' },
    self:     { title: 'Self-Attention: Context Disambiguation', desc: '"Server" in Sentence 1 attends to "check" → waiter meaning. "Server" in Sentence 2 attends to "crashed" → computer meaning. Same word, different meaning, learned entirely from context.' },
    bert:     { title: 'BERT, GPT-3, T5, ChatGPT', desc: 'All modern Large Language Models are built on the Transformer architecture. BERT powers Google Search. GPT-3 was trained on 45 TB of text. The Transformer is the engine underneath every LLM you use today.' },
  };

  const handleHover = (key) => setActiveNode(key);
  const handleLeave = () => setActiveNode(null);

  return (
    <div className={styles.diagramBox} style={{ padding: '0' }}>

      {/* ── SECTION 1: RNN vs TRANSFORMER ── */}
      <div style={{ padding: '1.5rem 1.5rem 0' }}>
        <h4 style={{ color: '#c4b5fd', fontWeight: 700, margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Before vs. After: RNN Sequential vs. Transformer Parallel</h4>
      </div>
      <svg viewBox="0 0 760 180" style={{ width: '100%', maxHeight: 180, display: 'block' }}>
        <defs>
          <marker id="arrowT" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrowP" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa" />
          </marker>
        </defs>

        {/* RNN side */}
        <g onMouseEnter={() => handleHover('rnn')} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }}>
          <rect x="20" y="20" width="320" height="140" rx="12" fill={activeNode === 'rnn' ? '#3b1f4a' : '#1e1b2e'} stroke="#f87171" strokeWidth="1.5" />
          <text x="180" y="44" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="700">RNN — Sequential (Slow)</text>
          {['W1','W2','W3','W4'].map((w, i) => (
            <g key={w}>
              <rect x={36 + i * 70} y="62" width="44" height="28" rx="6" fill="#7f1d1d" stroke="#fca5a5" strokeWidth="1" />
              <text x={58 + i * 70} y="81" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="600">{w}</text>
              {i < 3 && <line x1={80 + i * 70} y1="76" x2={106 + i * 70} y2="76" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowT)" />}
            </g>
          ))}
          <text x="180" y="118" textAnchor="middle" fill="#fca5a5" fontSize="10">One word at a time...</text>
          <text x="180" y="135" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="600">Long context = forgotten by the end</text>
          <text x="180" y="152" textAnchor="middle" fill="#9ca3af" fontSize="9.5">hover to learn more</text>
        </g>

        {/* VS badge */}
        <g>
          <circle cx="380" cy="90" r="18" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="380" y="95" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700">VS</text>
        </g>

        {/* Transformer side */}
        <g onMouseEnter={() => handleHover('parallel')} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }}>
          <rect x="418" y="20" width="322" height="140" rx="12" fill={activeNode === 'parallel' ? '#1e1f4a' : '#0f172a'} stroke="#a78bfa" strokeWidth="1.5" />
          <text x="579" y="44" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">Transformer — Parallel (Fast)</text>
          <g transform="translate(579, 85)">
            {['W1','W2','W3','W4'].map((w, i) => {
              const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
              const cx = Math.cos(angle) * 44;
              const cy = Math.sin(angle) * 30;
              return (
                <g key={w}>
                  <line x1="0" y1="0" x2={cx * 0.6} y2={cy * 0.6} stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
                  <rect x={cx - 18} y={cy - 12} width="36" height="22" rx="5" fill="#3730a3" stroke="#818cf8" strokeWidth="1" />
                  <text x={cx} y={cy + 4} textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="600">{w}</text>
                </g>
              );
            })}
            <circle cx="0" cy="0" r="14" fill="#4f46e5" stroke="#818cf8" strokeWidth="1.5" />
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">ALL</text>
          </g>
          <text x="579" y="148" textAnchor="middle" fill="#818cf8" fontSize="9.5">hover to learn more</text>
        </g>
      </svg>

      {/* ── SECTION 2: 3 INNOVATIONS ── */}
      <div style={{ padding: '1.5rem 1.5rem 0' }}>
        <h4 style={{ color: '#c4b5fd', fontWeight: 700, margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>The 3 Key Innovations Inside a Transformer</h4>
      </div>
      <svg viewBox="0 0 760 200" style={{ width: '100%', maxHeight: 200, display: 'block' }}>
        <defs>
          <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" /><stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="attnGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="selfGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* Card 1: Positional Encoding */}
        <g onMouseEnter={() => handleHover('pos')} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }}>
          <rect x="20" y="20" width="220" height="160" rx="14" fill={activeNode === 'pos' ? '#0c2a3a' : '#0f2332'} stroke="#0ea5e9" strokeWidth="1.5" />
          <rect x="20" y="20" width="220" height="40" rx="14" fill="url(#posGrad)" />
          <rect x="20" y="46" width="220" height="14" fill="url(#posGrad)" />
          <text x="130" y="46" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">1. Positional Encoding</text>
          <text x="130" y="80" textAnchor="middle" fill="#7dd3fc" fontSize="10.5" fontWeight="600">Word Order in the Data</text>
          {['Jane', 'went', 'looking', 'for'].map((w, i) => (
            <g key={w}>
              <rect x={30 + i * 50} y="100" width="40" height="22" rx="5" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
              <text x={50 + i * 50} y="115" textAnchor="middle" fill="#7dd3fc" fontSize="9.5">{w}</text>
              <text x={50 + i * 50} y="138" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontWeight="700">#{i + 1}</text>
            </g>
          ))}
          <text x="130" y="168" textAnchor="middle" fill="#7dd3fc" fontSize="9">Each word tagged with its position</text>
        </g>

        {/* Card 2: Attention */}
        <g onMouseEnter={() => handleHover('attn')} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }}>
          <rect x="268" y="20" width="224" height="160" rx="14" fill={activeNode === 'attn' ? '#2d1f50' : '#1a1040'} stroke="#a855f7" strokeWidth="1.5" />
          <rect x="268" y="20" width="224" height="40" rx="14" fill="url(#attnGrad)" />
          <rect x="268" y="46" width="224" height="14" fill="url(#attnGrad)" />
          <text x="380" y="46" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">2. Attention</text>
          <text x="380" y="80" textAnchor="middle" fill="#d8b4fe" fontSize="10.5" fontWeight="600">Context from Every Word</text>
          {[['European', 1.0], ['economic', 0.85], ['area', 0.3], ['signed', 0.15]].map(([w, weight], i) => (
            <g key={w}>
              <rect x={276} y={96 + i * 18} width="130" height="14" rx="3" fill={`rgba(168,85,247,${weight * 0.35})`} stroke={`rgba(168,85,247,${weight * 0.7})`} strokeWidth="1" />
              <text x={284} y={107 + i * 18} fill="#e9d5ff" fontSize="8.5">{w}</text>
              <rect x={414} y={97 + i * 18} width={Math.round(60 * weight)} height="12" rx="3" fill={`rgba(168,85,247,${0.4 + weight * 0.5})`} />
            </g>
          ))}
          <text x="380" y="170" textAnchor="middle" fill="#d8b4fe" fontSize="9">Attention heat map — darker = higher weight</text>
        </g>

        {/* Card 3: Self-Attention */}
        <g onMouseEnter={() => handleHover('self')} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }}>
          <rect x="516" y="20" width="224" height="160" rx="14" fill={activeNode === 'self' ? '#2c1b00' : '#1c1200'} stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="516" y="20" width="224" height="40" rx="14" fill="url(#selfGrad)" />
          <rect x="516" y="46" width="224" height="14" fill="url(#selfGrad)" />
          <text x="628" y="46" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">3. Self-Attention</text>
          <text x="628" y="80" textAnchor="middle" fill="#fcd34d" fontSize="10.5" fontWeight="600">Word Meaning from Context</text>
          <rect x="524" y="95" width="208" height="22" rx="5" fill="#1c1a00" stroke="#fbbf24" strokeWidth="1" />
          <text x="628" y="111" textAnchor="middle" fill="#fde68a" fontSize="9">"Server, can I have the check?" → waiter</text>
          <line x1="628" y1="118" x2="628" y2="128" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="524" y="128" width="208" height="22" rx="5" fill="#1c1a00" stroke="#fbbf24" strokeWidth="1" />
          <text x="628" y="144" textAnchor="middle" fill="#fde68a" fontSize="9">"I just crashed the server" → machine</text>
          <text x="628" y="170" textAnchor="middle" fill="#fcd34d" fontSize="9">Same word, different context = different meaning</text>
        </g>
      </svg>

      {/* ── REAL MODELS BUILT ON TRANSFORMERS ── */}
      <div style={{ padding: '1.5rem 1.5rem 0' }}>
        <h4 style={{ color: '#c4b5fd', fontWeight: 700, margin: '0 0 0.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Real-World Models Built on Transformers</h4>
      </div>
      <svg viewBox="0 0 760 90" style={{ width: '100%', maxHeight: 90, display: 'block', marginBottom: '0.5rem' }}>
        {[
          { name: 'BERT', sub: 'Google Search', color: '#4285f4', x: 60 },
          { name: 'GPT-3', sub: '45 TB of text', color: '#10a37f', x: 210 },
          { name: 'T5', sub: 'Text-to-Text', color: '#f59e0b', x: 360 },
          { name: 'ChatGPT', sub: 'OpenAI', color: '#06b6d4', x: 510 },
          { name: 'Gemini', sub: 'Google DeepMind', color: '#8b5cf6', x: 660 },
        ].map(({ name, sub, color, x }) => (
          <g key={name} onMouseEnter={() => handleHover('bert')} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }}>
            <rect x={x - 55} y="10" width="110" height="64" rx="10"
              fill={activeNode === 'bert' ? `${color}22` : `${color}11`}
              stroke={color} strokeWidth="1.5" />
            <text x={x} y="40" textAnchor="middle" fill={color} fontSize="13" fontWeight="800">{name}</text>
            <text x={x} y="58" textAnchor="middle" fill="#94a3b8" fontSize="9.5">{sub}</text>
            <text x={x} y="70" textAnchor="middle" fill="#64748b" fontSize="8.5">Transformer</text>
          </g>
        ))}
      </svg>

      {/* INFO BOX */}
      <div className={styles.flowchartInfoBox} style={{ background: '#1e1040', borderColor: '#7c3aed', color: '#e9d5ff', margin: '0.75rem 1.5rem 1.5rem' }}>
        {activeNode ? (
          <div><strong style={{ color: '#c4b5fd' }}>{info[activeNode].title}:</strong> {info[activeNode].desc}</div>
        ) : (
          <div><em style={{ color: '#a78bfa' }}>Hover over any section above to explore how the Transformer works step by step.</em></div>
        )}
      </div>
    </div>
  );
};

// ─── TOKENIZATION DIAGRAM ───────────────────────────────────────────────────
const TokenizationDiagram = () => {
  const [activeTab, setActiveTab] = useState('subword');
  const [bpeStep, setBpeStep] = useState(0);
  const [hoverToken, setHoverToken] = useState(null);

  const sentence = 'The quick brown fox';

  const wordTokens = [
    { text: 'The', id: 1996, color: '#06b6d4' },
    { text: 'quick', id: 4248, color: '#8b5cf6' },
    { text: 'brown', id: 2829, color: '#f59e0b' },
    { text: 'fox', id: 4419, color: '#10b981' },
  ];

  const charTokens = ['T','h','e',' ','q','u','i','c','k',' ','b','r','o','w','n',' ','f','o','x'];

  const subwordTokens = [
    { text: 'The', note: 'common word → single token', color: '#06b6d4' },
    { text: 'quick', note: 'common word → single token', color: '#8b5cf6' },
    { text: 'bro', note: 'frequent subword', color: '#f59e0b' },
    { text: '##wn', note: 'continuation subword', color: '#f59e0b' },
    { text: 'fox', note: 'common word → single token', color: '#10b981' },
  ];

  const bpeSteps = [
    { vocab: ['d', 'o', 'g', 's', 'c', 'a', 't'], merge: null, desc: 'Start: vocabulary = individual characters only.' },
    { vocab: ['d', 'o', 'g', 's', 'c', 'a', 't', 'do'], merge: 'd+o → do', desc: '"d" and "o" are the most frequent pair. Merge them into "do".' },
    { vocab: ['d', 'o', 'g', 's', 'c', 'a', 't', 'do', 'dog'], merge: 'do+g → dog', desc: '"do" and "g" are now the most frequent pair. Merge into "dog".' },
    { vocab: ['d', 'o', 'g', 's', 'c', 'a', 't', 'do', 'dog', 'dogs'], merge: 'dog+s → dogs', desc: '"dog" + "s" merge. Plural form "dogs" is now a single token.' },
    { vocab: ['d', 'o', 'g', 's', 'c', 'a', 't', 'do', 'dog', 'dogs', 'cat'], merge: 'c+a+t → cat', desc: '"cat" assembles from characters. All common words become single tokens.' },
  ];

  const failureExamples = [
    { input: 'How many letters in "strawberry"?', issue: '"strawberry" is 1 opaque token', result: 'Model often says 8 or 9 (wrong — it is 10)', color: '#f87171' },
    { input: '12,456,789 + 1 = ?', issue: 'Numbers split into arbitrary subword tokens', result: 'Digit-by-digit arithmetic breaks down', color: '#fb923c' },
    { input: 'Translate the name "Dzintars"', issue: 'Rare name splits into 4+ unusual subword fragments', result: 'Poor embedding quality, inaccurate translation', color: '#fbbf24' },
  ];

  const tabs = [
    { id: 'word', label: 'Word-Level', color: '#f87171' },
    { id: 'char', label: 'Character-Level', color: '#fb923c' },
    { id: 'subword', label: 'Subword (BPE)', color: '#a78bfa' },
    { id: 'bpe', label: 'BPE Animation', color: '#34d399' },
    { id: 'fail', label: 'LLM Failures', color: '#f59e0b' },
  ];

  return (
    <div className={styles.diagramBox} style={{ padding: 0 }}>

      {/* TAB BAR */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '1.25rem 1.5rem 0', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '0.4rem 0.9rem', borderRadius: '999px', border: `1.5px solid ${t.color}`,
            background: activeTab === t.id ? t.color : 'transparent',
            color: activeTab === t.id ? '#0f172a' : t.color,
            fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s'
          }}>{t.label}</button>
        ))}
      </div>

      {/* WORD LEVEL */}
      {activeTab === 'word' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>Sentence: <em style={{ color: '#e2e8f0' }}>"The quick brown fox"</em></p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {wordTokens.map((t, i) => (
              <div key={i} onMouseEnter={() => setHoverToken(i)} onMouseLeave={() => setHoverToken(null)}
                style={{ background: hoverToken === i ? `${t.color}30` : `${t.color}15`, border: `2px solid ${t.color}`,
                  borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ color: t.color, fontWeight: 700, fontSize: '1rem' }}>{t.text}</div>
                <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.2rem' }}>ID: {t.id}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '0.3rem' }}>Token IDs fed into model:</div>
            <code style={{ color: '#67e8f9', fontSize: '0.9rem' }}>[1996, 4248, 2829, 4419]</code>
          </div>
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#3f1818', border: '1px solid #f87171', borderRadius: '8px' }}>
            <strong style={{ color: '#f87171', fontSize: '0.8rem' }}>Trade-off:</strong>
            <span style={{ color: '#fca5a5', fontSize: '0.8rem' }}> Huge vocabulary (100k+ words). Any unseen word = system failure (OOV problem).</span>
          </div>
        </div>
      )}

      {/* CHARACTER LEVEL */}
      {activeTab === 'char' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>Every individual character becomes its own token:</p>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {charTokens.map((c, i) => (
              <div key={i} style={{ background: c === ' ' ? '#1e293b' : '#1c1040', border: `1.5px solid ${c === ' ' ? '#334155' : '#8b5cf6'}`,
                borderRadius: '5px', padding: '0.3rem 0.45rem', minWidth: '2rem', textAlign: 'center' }}>
                <span style={{ color: c === ' ' ? '#475569' : '#c4b5fd', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {c === ' ' ? '\u2423' : c}
                </span>
              </div>
            ))}
          </div>
          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #334155', marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>19 tokens for 4 words (vs. 4 tokens word-level). Context window cost is ~5x larger.</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{ padding: '0.6rem 0.8rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '7px' }}>
              <strong style={{ color: '#34d399', fontSize: '0.78rem' }}>Pro:</strong>
              <span style={{ color: '#6ee7b7', fontSize: '0.78rem' }}> Tiny vocabulary (~100). No OOV words ever.</span>
            </div>
            <div style={{ padding: '0.6rem 0.8rem', background: '#3f1818', border: '1px solid #f87171', borderRadius: '7px' }}>
              <strong style={{ color: '#f87171', fontSize: '0.78rem' }}>Con:</strong>
              <span style={{ color: '#fca5a5', fontSize: '0.78rem' }}> Learning meaning from characters is extremely hard. Needs huge context window.</span>
            </div>
          </div>
        </div>
      )}

      {/* SUBWORD */}
      {activeTab === 'subword' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>Hover each token to see how it was assigned:</p>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {subwordTokens.map((t, i) => (
              <div key={i} onMouseEnter={() => setHoverToken(i)} onMouseLeave={() => setHoverToken(null)}
                style={{ background: hoverToken === i ? `${t.color}25` : `${t.color}12`, border: `2px solid ${t.color}`,
                  borderRadius: '8px', padding: '0.45rem 0.75rem', cursor: 'pointer', transition: 'all 0.2s', minWidth: '2.5rem', textAlign: 'center' }}>
                <div style={{ color: t.color, fontWeight: 700, fontSize: '1rem', fontFamily: 'monospace' }}>{t.text}</div>
                {hoverToken === i && (
                  <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '0.2rem', whiteSpace: 'nowrap' }}>{t.note}</div>
                )}
              </div>
            ))}
          </div>
          <svg viewBox="0 0 680 100" style={{ width: '100%', maxHeight: 100, display: 'block', marginBottom: '1rem' }}>
            <defs>
              <linearGradient id="freqGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <rect x="20" y="20" width="640" height="18" rx="9" fill="#1e293b" />
            <rect x="20" y="20" width="500" height="18" rx="9" fill="url(#freqGrad)" />
            <text x="20" y="56" fill="#94a3b8" fontSize="11">Rare / long words</text>
            <text x="560" y="56" fill="#94a3b8" fontSize="11" textAnchor="end">Common words</text>
            <text x="20" y="72" fill="#c4b5fd" fontSize="10">split into many subword tokens</text>
            <text x="560" y="72" fill="#6ee7b7" fontSize="10" textAnchor="end">single token each</text>
          </svg>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{ padding: '0.6rem 0.8rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '7px' }}>
              <strong style={{ color: '#34d399', fontSize: '0.78rem' }}>Pro:</strong>
              <span style={{ color: '#6ee7b7', fontSize: '0.78rem' }}> Manageable vocabulary (30k–50k). Handles unknown words gracefully.</span>
            </div>
            <div style={{ padding: '0.6rem 0.8rem', background: '#1c1200', border: '1px solid #f59e0b', borderRadius: '7px' }}>
              <strong style={{ color: '#f59e0b', fontSize: '0.78rem' }}>Con:</strong>
              <span style={{ color: '#fcd34d', fontSize: '0.78rem' }}> Rare words still get weird splits. Tokenization affects LLM reasoning ability.</span>
            </div>
          </div>
        </div>
      )}

      {/* BPE ANIMATION */}
      {activeTab === 'bpe' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>Click "Next Step" to watch Byte-Pair Encoding build a vocabulary:</p>
          <div style={{ background: '#0c1a2e', border: '1px solid #0ea5e9', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ color: '#7dd3fc', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 700 }}>Step {bpeStep + 1} of {bpeSteps.length}</div>
            {bpeSteps[bpeStep].merge && (
              <div style={{ color: '#34d399', fontSize: '0.85rem', marginBottom: '0.5rem', fontFamily: 'monospace' }}>Merge: {bpeSteps[bpeStep].merge}</div>
            )}
            <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{bpeSteps[bpeStep].desc}</div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.4rem' }}>Current vocabulary:</div>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {bpeSteps[bpeStep].vocab.map((v, i) => {
                const isNew = bpeStep > 0 && !bpeSteps[bpeStep - 1].vocab.includes(v);
                return (
                  <span key={i} style={{ background: isNew ? '#0c2a1f' : '#1e293b', border: `1.5px solid ${isNew ? '#34d399' : '#334155'}`,
                    color: isNew ? '#34d399' : '#94a3b8', borderRadius: '5px', padding: '0.2rem 0.45rem',
                    fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: isNew ? 700 : 400 }}>{v}</span>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setBpeStep(s => Math.max(0, s - 1))} disabled={bpeStep === 0}
              style={{ padding: '0.4rem 1rem', borderRadius: '7px', border: '1.5px solid #475569',
                background: bpeStep === 0 ? 'transparent' : '#1e293b', color: '#94a3b8', cursor: bpeStep === 0 ? 'not-allowed' : 'pointer', fontSize: '0.82rem' }}>Back</button>
            <button onClick={() => setBpeStep(s => Math.min(bpeSteps.length - 1, s + 1))} disabled={bpeStep === bpeSteps.length - 1}
              style={{ padding: '0.4rem 1rem', borderRadius: '7px', border: '1.5px solid #34d399',
                background: bpeStep === bpeSteps.length - 1 ? 'transparent' : '#0c2a1f',
                color: '#34d399', cursor: bpeStep === bpeSteps.length - 1 ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.82rem' }}>Next Step</button>
          </div>
        </div>
      )}

      {/* LLM FAILURES */}
      {activeTab === 'fail' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>Tokenization causes real, observable LLM failure modes:</p>
          {failureExamples.map((f, i) => (
            <div key={i} style={{ background: `${f.color}0f`, border: `1.5px solid ${f.color}50`, borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '0.65rem' }}>
              <div style={{ color: f.color, fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>Input: "{f.input}"</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Token issue: {f.issue}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>Result: {f.result}</div>
            </div>
          ))}
          <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#1a1000', border: '1px solid #f59e0b', borderRadius: '8px' }}>
            <strong style={{ color: '#f59e0b', fontSize: '0.8rem' }}>Key insight:</strong>
            <span style={{ color: '#fcd34d', fontSize: '0.8rem' }}> These failures are not bugs — they are the expected consequence of how tokenization works. Once you understand tokens, you can predict exactly when and why an LLM will struggle.</span>
          </div>
        </div>
      )}

    </div>
  );
};

// ─── CONTEXT WINDOW DIAGRAM ───────────────────────────────────────────────────
const ContextWindowDiagram = () => {
  const [activeTab, setActiveTab] = useState('fill');
  const [tokensCount, setTokensCount] = useState(4000);
  const [selectedFill, setSelectedFill] = useState(null);

  const fillItems = [
    { name: 'System Prompt', pct: 15, color: '#ec4899', desc: 'Hidden instructions specifying persona, safety guardrails & output rules.' },
    { name: 'Document / Code / RAG', pct: 45, color: '#8b5cf6', desc: 'Attached files, PDF content, pasted code snippets, or RAG retrieval chunks.' },
    { name: 'Conversation History', pct: 25, color: '#0ea5e9', desc: 'Previous back-and-forth prompts & model responses in the current session.' },
    { name: 'Current User Prompt', pct: 5, color: '#10b981', desc: 'Your active question/request sent right now.' },
    { name: 'Remaining Headroom', pct: 10, color: '#334155', desc: 'Space available for the model to generate its response.' },
  ];

  const timeline = [
    { year: '2020', model: 'GPT-3', size: '2,048 tokens', words: '~1,500 words', desc: 'Basic chat sessions, single short articles.' },
    { year: '2023', model: 'GPT-4', size: '8,192 tokens', words: '~6,000 words', desc: 'Multi-turn conversations, standard essays.' },
    { year: '2023', model: 'GPT-4 Turbo / Granite 3', size: '128,000 tokens', words: '~96,000 words', desc: 'Full novel length, entire code repositories.' },
    { year: '2024+', model: 'Gemini 1.5 Pro', size: '1,000,000+ tokens', words: '~750,000 words', desc: 'Hour-long video analysis, massive codebase ingestion.' },
  ];

  // Compute quadratic scaling cost relative to 1k tokens = 1 unit
  const computeUnits = Math.pow(tokensCount / 1000, 2).toFixed(1);

  const tabs = [
    { id: 'fill', label: 'Window Breakdown', color: '#0ea5e9' },
    { id: 'evolution', label: 'Context Timeline', color: '#a78bfa' },
    { id: 'quadratic', label: 'O(n²) Cost Calculator', color: '#f43f5e' },
    { id: 'middle', label: 'Lost in Middle', color: '#f59e0b' },
  ];

  return (
    <div className={styles.diagramBox} style={{ padding: 0 }}>
      {/* TAB BAR */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '1.25rem 1.5rem 0', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '0.4rem 0.9rem', borderRadius: '999px', border: `1.5px solid ${t.color}`,
            background: activeTab === t.id ? t.color : 'transparent',
            color: activeTab === t.id ? '#0f172a' : t.color,
            fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s'
          }}>{t.label}</button>
        ))}
      </div>

      {/* TAB 1: WINDOW BREAKDOWN */}
      {activeTab === 'fill' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>
            Click any section of the context window to see what occupies it:
          </p>
          
          {/* BAR VISUALIZER */}
          <div style={{ display: 'flex', height: '40px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #334155', marginBottom: '1.25rem' }}>
            {fillItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFill(idx)}
                style={{
                  width: `${item.pct}%`,
                  background: item.color,
                  cursor: 'pointer',
                  opacity: selectedFill === null || selectedFill === idx ? 1 : 0.4,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
                title={`${item.name} (${item.pct}%)`}
              >
                {item.pct >= 10 ? `${item.pct}%` : ''}
              </div>
            ))}
          </div>

          {/* LEGEND / DETAILS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
            {fillItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFill(idx)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: `1.5px solid ${selectedFill === idx ? item.color : '#334155'}`,
                  background: selectedFill === idx ? `${item.color}20` : '#1e293b',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: item.color, fontWeight: 700, fontSize: '0.8rem' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                  {item.name} ({item.pct}%)
                </div>
              </div>
            ))}
          </div>

          {selectedFill !== null && (
            <div style={{ background: `${fillItems[selectedFill].color}15`, border: `1.5px solid ${fillItems[selectedFill].color}`, borderRadius: '10px', padding: '0.85rem 1rem' }}>
              <div style={{ color: fillItems[selectedFill].color, fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {fillItems[selectedFill].name}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                {fillItems[selectedFill].desc}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TIMELINE */}
      {activeTab === 'evolution' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>
            Rapid expansion of context windows across model generations:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {timeline.map((item, idx) => (
              <div key={idx} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: '#0ea5e920', border: '1px solid #0ea5e9', borderRadius: '8px', padding: '0.4rem 0.75rem', textAlign: 'center', minWidth: '70px' }}>
                  <div style={{ color: '#0ea5e9', fontWeight: 800, fontSize: '0.85rem' }}>{item.year}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.68rem' }}>{item.model}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem' }}>
                    {item.size} <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 400 }}>({item.words})</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: O(N²) QUADRATIC COST */}
      {activeTab === 'quadratic' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>
            Self-attention computes every token against every other token. Slide to see quadratic scaling:
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 700 }}>
              <span>Context Length: <span style={{ color: '#f43f5e' }}>{tokensCount.toLocaleString()} tokens</span></span>
              <span>Compute Scale: <span style={{ color: '#f43f5e' }}>{computeUnits}x</span></span>
            </div>
            <input
              type="range"
              min="1000"
              max="16000"
              step="1000"
              value={tokensCount}
              onChange={(e) => setTokensCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.72rem', marginTop: '0.25rem' }}>
              <span>1k tokens (1x)</span>
              <span>4k tokens (16x)</span>
              <span>8k tokens (64x)</span>
              <span>16k tokens (256x)</span>
            </div>
          </div>

          <div style={{ background: '#1e1b2e', border: '1px solid #f43f5e50', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ color: '#fda4af', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              Attention Matrix Operations: {(tokensCount * tokensCount).toLocaleString()} dot-products
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
              Doubling tokens quadruples computational requirements. That is why processing massive long-context inputs requires huge GPU memory bandwidth and specialized FlashAttention algorithms.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LOST IN THE MIDDLE */}
      {activeTab === 'middle' && (
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>
            LLMs retrieve key facts accurately at the beginning or end of a prompt, but accuracy dips in the middle:
          </p>

          <svg viewBox="0 0 600 160" style={{ width: '100%', display: 'block', marginBottom: '1rem' }}>
            {/* Grid lines */}
            <line x1="50" y1="30" x2="550" y2="30" stroke="#334155" strokeDasharray="3 3" />
            <line x1="50" y1="80" x2="550" y2="80" stroke="#334155" strokeDasharray="3 3" />
            <line x1="50" y1="130" x2="550" y2="130" stroke="#334155" />

            {/* U-Shape Curve */}
            <path
              d="M 60 40 Q 300 140 540 40"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
            />

            {/* Data points */}
            <circle cx="60" cy="40" r="6" fill="#34d399" />
            <circle cx="300" cy="120" r="6" fill="#f87171" />
            <circle cx="540" cy="40" r="6" fill="#34d399" />

            {/* Labels */}
            <text x="60" y="24" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">Primacy (High Accuracy)</text>
            <text x="300" y="145" fill="#f87171" fontSize="11" textAnchor="middle" fontWeight="bold">Middle (Degraded Performance)</text>
            <text x="540" y="24" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">Recency (High Accuracy)</text>

            <text x="50" y="150" fill="#64748b" fontSize="10">Beginning of Prompt</text>
            <text x="550" y="150" fill="#64748b" fontSize="10" textAnchor="end">End of Prompt</text>
          </svg>

          <div style={{ background: '#1c1200', border: '1px solid #f59e0b', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <strong style={{ color: '#f59e0b', fontSize: '0.8rem' }}>Prompting Tip: </strong>
            <span style={{ color: '#fcd34d', fontSize: '0.8rem' }}>
              Place your core questions or essential document context at the very start or end of your prompt for best accuracy.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── EMBEDDINGS DIAGRAM ───────────────────────────────────────────────────
const EmbeddingsDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [arithmeticStep, setArithmeticStep] = useState(0);
  const [cbowMode, setCbowMode] = useState('cbow');
  const [hoveredWord, setHoveredWord] = useState(null);
  const [posStep, setPosStep] = useState(0);

  const panels = [
    { label: 'One-Hot vs Dense', color: '#f87171' },
    { label: 'Vector Space Map', color: '#a78bfa' },
    { label: 'Vector Arithmetic', color: '#34d399' },
    { label: 'Word2Vec Training', color: '#f59e0b' },
    { label: 'Positional Encoding', color: '#0ea5e9' },
  ];

  // --- Panel 1: One-Hot vs Dense ---
  const oneHotWords = ['cat', 'dog', 'king', 'queen', 'good', 'great'];
  const denseVecs = [
    { word: 'cat',   vec: [0.12, -0.34, 0.91, -0.05, 0.67], color: '#f87171' },
    { word: 'dog',   vec: [0.14, -0.31, 0.88,  0.02, 0.71], color: '#fb923c' },
    { word: 'king',  vec: [0.82,  0.91, 0.12,  0.95, 0.21], color: '#a78bfa' },
    { word: 'queen', vec: [0.79,  0.87, 0.18,  0.93, -0.14], color: '#c084fc' },
    { word: 'good',  vec: [-0.55, 0.63, -0.22, 0.41, 0.88], color: '#34d399' },
    { word: 'great', vec: [-0.52, 0.61, -0.19, 0.44, 0.91], color: '#6ee7b7' },
  ];

  // --- Panel 2: 2D word map dots ---
  const wordDots = [
    { word: 'king',     x: 72, y: 25, color: '#a78bfa', cluster: 'royalty' },
    { word: 'queen',    x: 85, y: 32, color: '#c084fc', cluster: 'royalty' },
    { word: 'prince',   x: 76, y: 40, color: '#818cf8', cluster: 'royalty' },
    { word: 'man',      x: 30, y: 28, color: '#38bdf8', cluster: 'people' },
    { word: 'woman',    x: 44, y: 30, color: '#7dd3fc', cluster: 'people' },
    { word: 'person',   x: 37, y: 42, color: '#93c5fd', cluster: 'people' },
    { word: 'cat',      x: 20, y: 72, color: '#f87171', cluster: 'animals' },
    { word: 'dog',      x: 30, y: 78, color: '#fb923c', cluster: 'animals' },
    { word: 'lion',     x: 14, y: 82, color: '#fbbf24', cluster: 'animals' },
    { word: 'tennis',   x: 68, y: 75, color: '#34d399', cluster: 'sport' },
    { word: 'soccer',   x: 80, y: 82, color: '#6ee7b7', cluster: 'sport' },
    { word: 'court',    x: 75, y: 68, color: '#a7f3d0', cluster: 'sport' },
  ];
  const clusterColors = { royalty: '#a78bfa', people: '#38bdf8', animals: '#f87171', sport: '#34d399' };

  // --- Panel 3: Vector arithmetic steps ---
  const arithmeticSteps = [
    { eq: 'king', label: 'Start with vector for "king"', color: '#a78bfa',
      desc: 'The embedding for "king" encodes concepts like royalty, power, and male gender.' },
    { eq: 'king − man', label: 'Subtract vector for "man"', color: '#f87171',
      desc: 'Removing "man" strips out the male-gender direction from the vector. What remains is roughly "royalty without gender".' },
    { eq: 'king − man + woman', label: 'Add vector for "woman"', color: '#34d399',
      desc: 'Adding "woman" injects the female-gender direction. The resulting vector points toward... "queen"!' },
    { eq: '≈ queen', label: 'Result: closest word is "queen"', color: '#f59e0b',
      desc: 'The arithmetic works because gender is a consistent geometric direction across the entire embedding space.' },
  ];

  // --- Panel 4: CBOW / Skip-gram ---
  const sentence = ['The', 'quick', 'brown', 'fox', 'jumps'];
  const centerIdx = 2; // 'brown'

  // --- Panel 5: Positional encoding ---
  const posSteps = [
    { label: 'Step 1: Tokens are embedded', desc: 'Each token ID is looked up in the embedding table, producing a dense vector.', highlight: 'embed' },
    { label: 'Step 2: Positional vectors are created', desc: 'For each position (1, 2, 3…) a unique positional vector is computed using sine/cosine waves at different frequencies.', highlight: 'pos' },
    { label: 'Step 3: Vectors are summed', desc: 'The word embedding and positional vector are added element-wise. Shape is unchanged.', highlight: 'sum' },
    { label: 'Step 4: Combined matrix enters attention', desc: 'The result encodes both WHAT the word means and WHERE it sits in the sequence.', highlight: 'out' },
  ];
  const posTokens = ['The', 'old', 'library', 'is', 'dark'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* --- PANEL SWITCHER --- */}
      <div className={styles.diagramBox} style={{ padding: 0 }}>
        <div style={{ display: 'flex', gap: '0.4rem', padding: '1.25rem 1.5rem 0', flexWrap: 'wrap' }}>
          {panels.map((p, i) => (
            <button key={i} onClick={() => setActivePanel(i)} style={{
              padding: '0.4rem 0.85rem', borderRadius: '999px',
              border: `1.5px solid ${p.color}`,
              background: activePanel === i ? p.color : 'transparent',
              color: activePanel === i ? '#0f172a' : p.color,
              fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s'
            }}>{i + 1}. {p.label}</button>
          ))}
        </div>

        {/* ===== PANEL 1: ONE-HOT vs DENSE ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* One-hot side */}
              <div>
                <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>One-Hot Encoding (50,000-D)</div>
                {oneHotWords.map((w, wi) => (
                  <div key={wi} style={{ marginBottom: '0.4rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'inline-block', width: '3.5rem' }}>{w}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>
                      [{'0 '.repeat(wi)}<span style={{ color: '#f87171', fontWeight: 800 }}>1</span>{' 0'.repeat(oneHotWords.length - wi - 1)} ···]
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#3f1818', border: '1px solid #f87171', borderRadius: '7px', fontSize: '0.75rem', color: '#fca5a5' }}>
                  50,000 zeros per word. No similarity between words.
                </div>
              </div>
              {/* Dense embedding side */}
              <div>
                <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Word Embedding (5-D shown)</div>
                {denseVecs.map((d, di) => (
                  <div key={di} style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: d.color, fontSize: '0.78rem', fontWeight: 700, width: '3.5rem' }}>{d.word}</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {d.vec.map((v, vi) => (
                        <div key={vi} style={{
                          width: '28px', height: '18px', borderRadius: '3px', fontSize: '0.6rem',
                          background: v > 0 ? `rgba(139,92,246,${Math.abs(v) * 0.8})` : `rgba(248,113,113,${Math.abs(v) * 0.8})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e2e8f0',
                          border: '1px solid #334155'
                        }}>{v.toFixed(2)}</div>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#0c1040', border: '1px solid #a78bfa', borderRadius: '7px', fontSize: '0.75rem', color: '#c4b5fd' }}>
                  Notice: cat & dog similar. king & queen similar. good & great similar.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: VECTOR SPACE MAP ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 0.75rem' }}>Hover any word to highlight its cluster. Similar words cluster together:</p>
            <svg viewBox="0 0 100 100" style={{ width: '100%', maxHeight: '340px', background: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
              {/* Cluster halos */}
              <ellipse cx="78" cy="32" rx="16" ry="14" fill="#a78bfa15" stroke="#a78bfa30" strokeWidth="0.4" />
              <ellipse cx="37" cy="33" rx="14" ry="12" fill="#38bdf815" stroke="#38bdf830" strokeWidth="0.4" />
              <ellipse cx="22" cy="77" rx="12" ry="10" fill="#f8717115" stroke="#f8717130" strokeWidth="0.4" />
              <ellipse cx="75" cy="75" rx="13" ry="10" fill="#34d39915" stroke="#34d39930" strokeWidth="0.4" />

              {/* Axis labels */}
              <text x="2" y="98" fill="#334155" fontSize="2.5">← less royal</text>
              <text x="70" y="98" fill="#334155" fontSize="2.5">more royal →</text>
              <text x="0" y="8" fill="#334155" fontSize="2.5" transform="rotate(-90,3,60)">fem ↑</text>

              {/* Cluster labels */}
              <text x="64" y="15" fill="#a78bfa" fontSize="3" fontWeight="bold">Royalty</text>
              <text x="28" y="18" fill="#38bdf8" fontSize="3" fontWeight="bold">People</text>
              <text x="8" y="66" fill="#f87171" fontSize="3" fontWeight="bold">Animals</text>
              <text x="66" y="62" fill="#34d399" fontSize="3" fontWeight="bold">Sports</text>

              {wordDots.map((d, i) => (
                <g key={i} onMouseEnter={() => setHoveredWord(d.word)} onMouseLeave={() => setHoveredWord(null)} style={{ cursor: 'pointer' }}>
                  <circle cx={d.x} cy={d.y} r={hoveredWord === d.word ? 3.5 : 2.2}
                    fill={d.color} opacity={hoveredWord && hoveredWord !== d.word ? 0.3 : 1}
                    style={{ transition: 'all 0.15s' }}
                  />
                  <text x={d.x + 2.5} y={d.y + 1} fill={d.color}
                    fontSize={hoveredWord === d.word ? '3.5' : '2.8'}
                    fontWeight={hoveredWord === d.word ? 'bold' : 'normal'}
                    opacity={hoveredWord && hoveredWord !== d.word ? 0.3 : 1}
                    style={{ transition: 'all 0.15s' }}
                  >{d.word}</text>
                </g>
              ))}
            </svg>
            {hoveredWord && (
              <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: '#1e293b', border: `1px solid ${clusterColors[wordDots.find(w => w.word === hoveredWord)?.cluster]}`, borderRadius: '7px', fontSize: '0.8rem', color: '#e2e8f0' }}>
                <strong style={{ color: clusterColors[wordDots.find(w => w.word === hoveredWord)?.cluster] }}>{hoveredWord}</strong> — cluster: {wordDots.find(w => w.word === hoveredWord)?.cluster}
              </div>
            )}
          </div>
        )}

        {/* ===== PANEL 3: VECTOR ARITHMETIC ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>Click through the steps of the famous king − man + woman = queen analogy:</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>
              {arithmeticSteps.map((s, i) => (
                <button key={i} onClick={() => setArithmeticStep(i)}
                  style={{
                    padding: '0.35rem 0.8rem', borderRadius: '8px',
                    border: `2px solid ${s.color}`,
                    background: arithmeticStep === i ? `${s.color}25` : 'transparent',
                    color: s.color, fontWeight: 700, fontSize: '0.82rem',
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'monospace'
                  }}>{s.eq}</button>
              ))}
            </div>

            {/* SVG visualizer */}
            <svg viewBox="0 0 500 160" style={{ width: '100%', display: 'block', marginBottom: '1rem' }}>
              <defs>
                <marker id="arrowK" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
                </marker>
                <marker id="arrowM" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f87171" />
                </marker>
                <marker id="arrowW" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                </marker>
                <marker id="arrowQ" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              {/* Axes */}
              <line x1="40" y1="140" x2="460" y2="140" stroke="#334155" strokeWidth="1" />
              <line x1="40" y1="140" x2="40" y2="20" stroke="#334155" strokeWidth="1" />
              <text x="250" y="158" fill="#475569" fontSize="10" textAnchor="middle">gender axis</text>
              <text x="15" y="80" fill="#475569" fontSize="10" textAnchor="middle" transform="rotate(-90,15,80)">royalty</text>

              {/* Word dots */}
              <circle cx="120" cy="50" r="6" fill="#38bdf8" />
              <text x="122" y="44" fill="#38bdf8" fontSize="10">man</text>
              <circle cx="340" cy="50" r="6" fill="#a78bfa" />
              <text x="344" y="44" fill="#a78bfa" fontSize="10">king</text>
              <circle cx="190" cy="50" r="6" fill="#ec4899" />
              <text x="192" y="44" fill="#ec4899" fontSize="10">woman</text>
              <circle cx="{arithmeticStep >= 3 ? 410 : 0}" cy="50" r="{arithmeticStep >= 3 ? 8 : 0}" fill="#f59e0b" />
              {arithmeticStep >= 3 && <>
                <circle cx="410" cy="50" r="8" fill="#f59e0b" />
                <text x="414" y="44" fill="#f59e0b" fontSize="11" fontWeight="bold">queen</text>
              </>}

              {/* Arrows shown progressively */}
              {arithmeticStep >= 0 && <line x1="120" y1="50" x2="335" y2="50" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowK)" strokeDasharray={arithmeticStep === 0 ? '5 3' : 'none'} />}
              {arithmeticStep >= 1 && <line x1="340" y1="50" x2="195" y2="50" stroke="#f87171" strokeWidth="2" markerEnd="url(#arrowM)" />}
              {arithmeticStep >= 2 && <line x1="190" y1="50" x2="402" y2="50" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowW)" />}
            </svg>

            <div style={{ padding: '0.85rem 1rem', background: `${arithmeticSteps[arithmeticStep].color}15`, border: `1.5px solid ${arithmeticSteps[arithmeticStep].color}`, borderRadius: '10px' }}>
              <div style={{ color: arithmeticSteps[arithmeticStep].color, fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem', fontFamily: 'monospace' }}>
                {arithmeticSteps[arithmeticStep].eq}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{arithmeticSteps[arithmeticStep].desc}</div>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: WORD2VEC ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setCbowMode('cbow')} style={{
                padding: '0.4rem 0.9rem', borderRadius: '999px',
                border: '1.5px solid #f59e0b',
                background: cbowMode === 'cbow' ? '#f59e0b' : 'transparent',
                color: cbowMode === 'cbow' ? '#0f172a' : '#f59e0b',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>CBOW (predict center)</button>
              <button onClick={() => setCbowMode('skipgram')} style={{
                padding: '0.4rem 0.9rem', borderRadius: '999px',
                border: '1.5px solid #34d399',
                background: cbowMode === 'skipgram' ? '#34d399' : 'transparent',
                color: cbowMode === 'skipgram' ? '#0f172a' : '#34d399',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Skip-gram (predict context)</button>
            </div>

            {/* Sentence display */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {sentence.map((w, i) => {
                const isCenter = i === centerIdx;
                const isContext = Math.abs(i - centerIdx) === 1;
                let borderColor = '#334155';
                let bg = '#1e293b';
                let label = '';
                if (cbowMode === 'cbow') {
                  if (isCenter) { borderColor = '#f59e0b'; bg = '#f59e0b20'; label = 'TARGET'; }
                  if (isContext) { borderColor = '#0ea5e9'; bg = '#0ea5e920'; label = 'INPUT'; }
                } else {
                  if (isCenter) { borderColor = '#34d399'; bg = '#34d39920'; label = 'INPUT'; }
                  if (isContext) { borderColor = '#f87171'; bg = '#f8717120'; label = 'TARGET'; }
                }
                return (
                  <div key={i} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: `2px solid ${borderColor}`, background: bg, textAlign: 'center' }}>
                    <div style={{ color: '#f8fafc', fontWeight: 700 }}>{w}</div>
                    {label && <div style={{ color: borderColor, fontSize: '0.65rem', fontWeight: 800, marginTop: '0.2rem' }}>{label}</div>}
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
              {cbowMode === 'cbow'
                ? '"quick" and "fox" (context words) are fed as input. The model must predict "brown" (center word). After training, the hidden-layer weights become the embedding matrix.'
                : '"brown" (center word) is the input. The model must predict "quick" and "fox" (context). Skip-gram works better for rare words and larger datasets.'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div style={{ padding: '0.6rem 0.8rem', background: '#1c1200', border: '1px solid #f59e0b', borderRadius: '7px' }}>
                <strong style={{ color: '#f59e0b', fontSize: '0.78rem' }}>CBOW:</strong>
                <span style={{ color: '#fcd34d', fontSize: '0.78rem' }}> Faster training. Works well on frequent words. Better for large datasets.</span>
              </div>
              <div style={{ padding: '0.6rem 0.8rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '7px' }}>
                <strong style={{ color: '#34d399', fontSize: '0.78rem' }}>Skip-gram:</strong>
                <span style={{ color: '#6ee7b7', fontSize: '0.78rem' }}> Slower but better with rare words. Produces richer embeddings.</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 5: POSITIONAL ENCODING ===== */}
        {activePanel === 4 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Transformers process all tokens at once — positional encoding tells them the order. Step through:
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {posSteps.map((s, i) => (
                <button key={i} onClick={() => setPosStep(i)} style={{
                  padding: '0.35rem 0.75rem', borderRadius: '7px',
                  border: `1.5px solid ${posStep === i ? '#0ea5e9' : '#334155'}`,
                  background: posStep === i ? '#0ea5e920' : 'transparent',
                  color: posStep === i ? '#7dd3fc' : '#64748b',
                  fontWeight: posStep === i ? 700 : 400, fontSize: '0.75rem', cursor: 'pointer'
                }}>{s.label}</button>
              ))}
            </div>

            {/* Token row */}
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {posTokens.map((t, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ padding: '0.4rem 0.6rem', borderRadius: '7px', border: '1.5px solid #334155', background: posStep >= 0 ? '#0ea5e920' : '#1e293b', marginBottom: '0.25rem' }}>
                    <div style={{ color: '#7dd3fc', fontWeight: 700, fontSize: '0.85rem' }}>{t}</div>
                  </div>
                  {posStep >= 1 && (
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontFamily: 'monospace' }}>pos {i+1}</div>
                  )}
                  {posStep >= 1 && (
                    <div style={{ padding: '0.3rem 0.5rem', borderRadius: '5px', border: '1.5px solid #ec489960', background: '#ec489915', marginTop: '0.2rem' }}>
                      <div style={{ color: '#f9a8d4', fontSize: '0.65rem', fontFamily: 'monospace' }}>sin/cos</div>
                    </div>
                  )}
                  {posStep >= 2 && (
                    <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700 }}>+</div>
                  )}
                  {posStep >= 2 && (
                    <div style={{ padding: '0.3rem 0.5rem', borderRadius: '5px', border: '1.5px solid #34d39960', background: '#34d39915', marginTop: '0.2rem' }}>
                      <div style={{ color: '#6ee7b7', fontSize: '0.65rem', fontFamily: 'monospace' }}>embed</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#0c1a2e', border: `1.5px solid ${posStep >= 3 ? '#34d399' : '#0ea5e9'}`, borderRadius: '10px' }}>
              <div style={{ color: posStep >= 3 ? '#34d399' : '#7dd3fc', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                {posSteps[posStep].label}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{posSteps[posStep].desc}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MODEL PARAMETERS DIAGRAM ──────────────────────────────────────────────────
const ModelParametersDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [weight1, setWeight1] = useState(0.8);
  const [weight2, setWeight2] = useState(0.5);
  const [bias, setBias] = useState(0.2);
  const [trainingStep, setTrainingStep] = useState(0);
  const [hpTab, setHpTab] = useState('params');

  const panels = [
    { label: 'Neuron Calculator', color: '#f59e0b' },
    { label: 'Training Loop', color: '#f87171' },
    { label: 'Parameter Scale', color: '#a78bfa' },
    { label: 'Params vs Hyperparams', color: '#34d399' },
  ];

  // Neuron output computation (ReLU activation)
  const input1 = 0.6;
  const input2 = 0.9;
  const rawSum = input1 * weight1 + input2 * weight2 + bias;
  const output = Math.max(0, rawSum).toFixed(3);

  // Training loop steps
  const trainingSteps = [
    {
      icon: '→', title: 'Forward Pass',
      color: '#0ea5e9',
      desc: 'Feed training data through the network. Current weights produce a prediction.'
    },
    {
      icon: '✗', title: 'Measure Loss',
      color: '#f87171',
      desc: 'Compare prediction to correct answer. Loss function outputs a single error score.'
    },
    {
      icon: '←', title: 'Backpropagation',
      color: '#f59e0b',
      desc: 'Trace error backwards. Calculus computes each weight\'s "gradient" — how much it contributed to the error.'
    },
    {
      icon: '↑', title: 'Update Weights',
      color: '#34d399',
      desc: 'Nudge every weight in the direction that reduces loss. Step size = learning rate. Repeat billions of times.'
    },
  ];

  // Model scale data
  const models = [
    { name: 'GPT-2', year: 2019, params: 1.5,  color: '#64748b', memGB: 3,   desc: 'Early open model, good at text generation' },
    { name: 'GPT-3', year: 2020, params: 175,  color: '#0ea5e9', memGB: 350, desc: 'First model to show emergent few-shot learning' },
    { name: 'Llama 3 70B', year: 2024, params: 70, color: '#a78bfa', memGB: 140, desc: 'Open weights, state-of-art efficiency' },
    { name: 'GPT-4 (est.)', year: 2023, params: 600, color: '#f59e0b', memGB: 1200, desc: 'Industry leading reasoning capability' },
    { name: 'Gemini 1.5 Pro (est.)', year: 2024, params: 1000, color: '#f87171', memGB: 2000, desc: 'Multimodal, 1M token context window' },
  ];
  const maxParams = 1000;

  // Params vs Hyperparams table
  const comparison = [
    { aspect: 'Who sets it?',       param: 'Set automatically by training algorithm', hyper: 'Set manually by engineers' },
    { aspect: 'When is it set?',    param: 'During training, updated continuously', hyper: 'Before training begins' },
    { aspect: 'Examples',          param: 'Weights, biases', hyper: 'Learning rate, batch size, layers, epochs' },
    { aspect: 'What it encodes',    param: 'Knowledge learned from data', hyper: 'Rules about how learning happens' },
    { aspect: 'Stored in model?',   param: 'Yes — parameters ARE the model file', hyper: 'No — discarded after training' },
    { aspect: 'Count in GPT-3',     param: '175,000,000,000 parameters', hyper: 'Dozens of hyperparameter choices' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.diagramBox} style={{ padding: 0 }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '0.4rem', padding: '1.25rem 1.5rem 0', flexWrap: 'wrap' }}>
          {panels.map((p, i) => (
            <button key={i} onClick={() => setActivePanel(i)} style={{
              padding: '0.4rem 0.85rem', borderRadius: '999px',
              border: `1.5px solid ${p.color}`,
              background: activePanel === i ? p.color : 'transparent',
              color: activePanel === i ? '#0f172a' : p.color,
              fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s'
            }}>{i + 1}. {p.label}</button>
          ))}
        </div>

        {/* ===== PANEL 1: NEURON CALCULATOR ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Drag the sliders to change weights and bias. Watch how the neuron output changes in real time:
            </p>

            {/* SVG neuron diagram */}
            <svg viewBox="0 0 520 140" style={{ width: '100%', display: 'block', marginBottom: '1.25rem' }}>
              {/* Input nodes */}
              <circle cx="60" cy="45" r="18" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
              <text x="60" y="50" fill="#7dd3fc" fontSize="11" textAnchor="middle" fontWeight="bold">{input1}</text>
              <text x="60" y="30" fill="#64748b" fontSize="9" textAnchor="middle">input₁</text>

              <circle cx="60" cy="100" r="18" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
              <text x="60" y="105" fill="#7dd3fc" fontSize="11" textAnchor="middle" fontWeight="bold">{input2}</text>
              <text x="60" y="88" fill="#64748b" fontSize="9" textAnchor="middle">input₂</text>

              {/* Weight lines */}
              <line x1="78" y1="52" x2="220" y2="72" stroke="#f59e0b" strokeWidth={Math.abs(weight1) * 3 + 0.5} opacity="0.8" />
              <text x="148" y="58" fill="#f59e0b" fontSize="10" fontWeight="bold">w₁={weight1.toFixed(2)}</text>

              <line x1="78" y1="95" x2="220" y2="78" stroke="#ec4899" strokeWidth={Math.abs(weight2) * 3 + 0.5} opacity="0.8" />
              <text x="148" y="102" fill="#ec4899" fontSize="10" fontWeight="bold">w₂={weight2.toFixed(2)}</text>

              {/* Neuron body */}
              <circle cx="255" cy="72" r="32" fill="#1e1040" stroke="#a78bfa" strokeWidth="2" />
              <text x="255" y="67" fill="#a78bfa" fontSize="9" textAnchor="middle">Σ + bias</text>
              <text x="255" y="80" fill="#c4b5fd" fontSize="10" textAnchor="middle" fontWeight="bold">{rawSum.toFixed(3)}</text>

              {/* Bias label */}
              <text x="255" y="115" fill="#64748b" fontSize="9" textAnchor="middle">bias={bias.toFixed(2)}</text>

              {/* Arrow to activation */}
              <line x1="287" y1="72" x2="340" y2="72" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr2)" />
              <defs><marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#64748b" /></marker></defs>
              <text x="315" y="65" fill="#64748b" fontSize="8" textAnchor="middle">ReLU</text>

              {/* Output node */}
              <circle cx="385" cy="72" r="28" fill="#0c2a1f" stroke="#34d399" strokeWidth="2.5" />
              <text x="385" y="68" fill="#34d399" fontSize="9" textAnchor="middle">output</text>
              <text x="385" y="82" fill="#6ee7b7" fontSize="13" textAnchor="middle" fontWeight="bold">{output}</text>

              {/* Formula */}
              <text x="460" y="68" fill="#475569" fontSize="8" textAnchor="middle">max(0,</text>
              <text x="460" y="78" fill="#475569" fontSize="8" textAnchor="middle">rawSum)</text>
            </svg>

            {/* Sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Weight 1 (w₁)', val: weight1, set: setWeight1, color: '#f59e0b' },
                { label: 'Weight 2 (w₂)', val: weight2, set: setWeight2, color: '#ec4899' },
                { label: 'Bias', val: bias, set: setBias, color: '#a78bfa' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ color: s.color, fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                    {s.label}: <span style={{ fontFamily: 'monospace' }}>{s.val.toFixed(2)}</span>
                  </div>
                  <input type="range" min="-1" max="1" step="0.05" value={s.val}
                    onChange={e => s.set(Number(e.target.value))}
                    style={{ width: '100%', accentColor: s.color, cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.65rem' }}>
                    <span>-1 (suppress)</span><span>+1 (amplify)</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '0.85rem', padding: '0.65rem 0.85rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#6ee7b7' }}>
              ({input1} × {weight1.toFixed(2)}) + ({input2} × {weight2.toFixed(2)}) + {bias.toFixed(2)} = {rawSum.toFixed(3)} → ReLU → <strong>{output}</strong>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: TRAINING LOOP ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Click each step to understand how parameters are discovered through training:
            </p>

            {/* Circular loop SVG */}
            <svg viewBox="0 0 400 200" style={{ width: '100%', display: 'block', marginBottom: '1rem' }}>
              {/* Loop arc indicators */}
              <ellipse cx="200" cy="100" rx="140" ry="70" fill="none" stroke="#1e293b" strokeWidth="20" strokeDasharray="4 2" />

              {/* Step circles */}
              {trainingSteps.map((s, i) => {
                const angles = [270, 0, 90, 180];
                const rad = angles[i] * Math.PI / 180;
                const cx = 200 + 140 * Math.cos(rad);
                const cy = 100 + 70 * Math.sin(rad);
                return (
                  <g key={i} onClick={() => setTrainingStep(i)} style={{ cursor: 'pointer' }}>
                    <circle cx={cx} cy={cy} r={trainingStep === i ? 26 : 20}
                      fill={trainingStep === i ? s.color : '#1e293b'}
                      stroke={s.color} strokeWidth="2"
                      style={{ transition: 'all 0.2s' }}
                    />
                    <text x={cx} y={cy + 4} fill={trainingStep === i ? '#0f172a' : s.color}
                      fontSize="14" textAnchor="middle" fontWeight="bold">{s.icon}</text>
                    <text x={cx} y={cy + (cy < 100 ? -28 : 32)}
                      fill={s.color} fontSize="9" textAnchor="middle" fontWeight="bold">{s.title}</text>
                  </g>
                );
              })}

              {/* Center label */}
              <text x="200" y="97" fill="#475569" fontSize="10" textAnchor="middle">Training</text>
              <text x="200" y="110" fill="#475569" fontSize="10" textAnchor="middle">Loop</text>
            </svg>

            <div style={{ padding: '0.85rem 1rem', background: `${trainingSteps[trainingStep].color}15`, border: `1.5px solid ${trainingSteps[trainingStep].color}`, borderRadius: '10px' }}>
              <div style={{ color: trainingSteps[trainingStep].color, fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                {trainingSteps[trainingStep].icon} {trainingSteps[trainingStep].title}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.83rem' }}>{trainingSteps[trainingStep].desc}</div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: PARAMETER SCALE ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Real-world model parameter counts and their approximate memory footprint at 16-bit:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {models.map((m, i) => (
                <div key={i} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '0.7rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div>
                      <span style={{ color: m.color, fontWeight: 800, fontSize: '0.88rem' }}>{m.name}</span>
                      <span style={{ color: '#475569', fontSize: '0.72rem', marginLeft: '0.5rem' }}>({m.year})</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: m.color, fontWeight: 700, fontSize: '0.85rem' }}>{m.params}B params</span>
                      <span style={{ color: '#64748b', fontSize: '0.72rem', marginLeft: '0.4rem' }}>~{m.memGB}GB RAM</span>
                    </div>
                  </div>
                  <div style={{ height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(m.params / maxParams) * 100}%`, height: '100%', background: m.color, borderRadius: '4px', transition: 'width 0.5s' }} />
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.73rem', marginTop: '0.3rem' }}>{m.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.85rem', background: '#1c1200', border: '1px solid #f59e0b', borderRadius: '8px', fontSize: '0.78rem', color: '#fcd34d' }}>
              Memory rule of thumb: params × 2 bytes (16-bit) = minimum GPU RAM needed. A 70B model needs ~140 GB — more than most consumer GPUs combined.
            </div>
          </div>
        )}

        {/* ===== PANEL 4: PARAMS vs HYPERPARAMS ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setHpTab('params')} style={{
                padding: '0.4rem 0.9rem', borderRadius: '999px',
                border: '1.5px solid #34d399',
                background: hpTab === 'params' ? '#34d399' : 'transparent',
                color: hpTab === 'params' ? '#0f172a' : '#34d399',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Parameters (learned)</button>
              <button onClick={() => setHpTab('hyper')} style={{
                padding: '0.4rem 0.9rem', borderRadius: '999px',
                border: '1.5px solid #a78bfa',
                background: hpTab === 'hyper' ? '#a78bfa' : 'transparent',
                color: hpTab === 'hyper' ? '#0f172a' : '#a78bfa',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Hyperparameters (manual)</button>
              <button onClick={() => setHpTab('table')} style={{
                padding: '0.4rem 0.9rem', borderRadius: '999px',
                border: '1.5px solid #f59e0b',
                background: hpTab === 'table' ? '#f59e0b' : 'transparent',
                color: hpTab === 'table' ? '#0f172a' : '#f59e0b',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Side-by-Side</button>
            </div>

            {hpTab === 'params' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Weights — multiply inputs to control their influence on the output.', 'Biases — add an offset so neurons can activate even with small inputs.', 'Embedding weights — map token IDs to dense vectors in embedding space.', 'Attention weights — learned Q, K, V matrices in every attention head.', 'Feed-forward weights — dense layers that transform attention outputs.'].map((t, i) => (
                  <div key={i} style={{ padding: '0.55rem 0.85rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.82rem' }}>
                    <strong style={{ color: '#34d399' }}>{t.split('—')[0]}</strong>{t.includes('—') ? '—' + t.split('—')[1] : ''}
                  </div>
                ))}
              </div>
            )}

            {hpTab === 'hyper' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { name: 'Learning rate', desc: 'How big each parameter update step is. Too high = unstable. Too low = slow.', ex: '0.0001' },
                  { name: 'Batch size', desc: 'How many examples are processed before each weight update.', ex: '32 – 2048' },
                  { name: 'Number of layers', desc: 'How many transformer blocks deep the model is.', ex: '32 (Llama 70B)' },
                  { name: 'Embedding dimension', desc: 'Width of each layer — how many features each token is represented by.', ex: '4096 (Llama 70B)' },
                  { name: 'Training epochs', desc: 'How many passes through the entire training dataset.', ex: '1–3 for LLMs' },
                ].map((h, i) => (
                  <div key={i} style={{ padding: '0.55rem 0.85rem', background: '#1c0040', border: '1px solid #a78bfa', borderRadius: '8px' }}>
                    <strong style={{ color: '#a78bfa', fontSize: '0.82rem' }}>{h.name} </strong>
                    <span style={{ color: '#c4b5fd', fontSize: '0.78rem' }}>{h.desc}</span>
                    <span style={{ color: '#475569', fontSize: '0.72rem', display: 'block', marginTop: '0.15rem' }}>Typical: {h.ex}</span>
                  </div>
                ))}
              </div>
            )}

            {hpTab === 'table' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '0.5rem', textAlign: 'left', color: '#94a3b8', borderBottom: '2px solid #334155' }}>Aspect</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', color: '#34d399', borderBottom: '2px solid #334155' }}>Parameters</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', color: '#a78bfa', borderBottom: '2px solid #334155' }}>Hyperparameters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#1e293b' : '#0f172a' }}>
                        <td style={{ padding: '0.5rem 0.6rem', color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid #1e293b' }}>{row.aspect}</td>
                        <td style={{ padding: '0.5rem 0.6rem', color: '#6ee7b7', borderBottom: '1px solid #1e293b' }}>{row.param}</td>
                        <td style={{ padding: '0.5rem 0.6rem', color: '#c4b5fd', borderBottom: '1px solid #1e293b' }}>{row.hyper}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── TEMPERATURE & SAMPLING DIAGRAM ──────────────────────────────────────────────
const TemperatureSamplingDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [temperature, setTemperature] = useState(1.0);
  const [topK, setTopK] = useState(5);
  const [topP, setTopP] = useState(0.9);
  const [pipelineStep, setPipelineStep] = useState(0);

  const panels = [
    { label: 'Temperature Effect', color: '#f87171' },
    { label: 'Top-K Sampling', color: '#f59e0b' },
    { label: 'Top-P (Nucleus)', color: '#a78bfa' },
    { label: 'Full Pipeline', color: '#34d399' },
  ];

  // Raw logits for 8 tokens — fixed
  const tokens = [
    { word: 'blue',   logit: 4.2, color: '#38bdf8' },
    { word: 'clear',  logit: 3.1, color: '#0ea5e9' },
    { word: 'bright', logit: 2.4, color: '#6366f1' },
    { word: 'dark',   logit: 1.8, color: '#8b5cf6' },
    { word: 'falling',logit: 0.8, color: '#a78bfa' },
    { word: 'always', logit: 0.2, color: '#c084fc' },
    { word: 'not',    logit: -0.9, color: '#f87171' },
    { word: 'banana', logit: -3.5, color: '#ef4444' },
  ];

  // Apply temperature and compute softmax
  const computeProbs = (temp) => {
    const scaled = tokens.map(t => t.logit / Math.max(temp, 0.01));
    const maxVal = Math.max(...scaled);
    const exps = scaled.map(s => Math.exp(s - maxVal));
    const sumExp = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sumExp);
  };

  const probs = computeProbs(temperature);
  const maxProb = Math.max(...probs);

  // Top-K: keep only top K tokens, renormalize
  const sortedByProb = [...tokens.map((t, i) => ({ ...t, prob: probs[i], origIdx: i }))]
    .sort((a, b) => b.prob - a.prob);
  const topKTokens = sortedByProb.slice(0, topK);
  const topKSum = topKTokens.reduce((s, t) => s + t.prob, 0);
  const topKNorm = topKTokens.map(t => ({ ...t, normProb: t.prob / topKSum }));

  // Top-P: cumulative sum until P reached
  let cumSum = 0;
  const topPTokens = [];
  for (const t of sortedByProb) {
    cumSum += t.prob;
    topPTokens.push({ ...t, cumSum: Math.min(cumSum, 1) });
    if (cumSum >= topP) break;
  }
  const topPSum = topPTokens.reduce((s, t) => s + t.prob, 0);
  const topPNorm = topPTokens.map(t => ({ ...t, normProb: t.prob / topPSum }));

  // Pipeline steps
  const pipelineSteps = [
    {
      label: 'Raw Logits', color: '#94a3b8',
      desc: 'The LLM processes your prompt and outputs a raw score (logit) for every token in its vocabulary. These are not probabilities yet.',
      subset: tokens.map((t, i) => ({ ...t, displayVal: t.logit.toFixed(1), barVal: (t.logit + 4) / 8 }))
    },
    {
      label: '÷ Temperature + Softmax', color: '#f87171',
      desc: `Divide all logits by temperature (${temperature.toFixed(1)}), then apply softmax. Low temp → spiky. High temp → flat.`,
      subset: tokens.map((t, i) => ({ ...t, displayVal: (probs[i] * 100).toFixed(1) + '%', barVal: probs[i] / maxProb }))
    },
    {
      label: `Top-K (K=${topK})`, color: '#f59e0b',
      desc: `Keep only the top ${topK} tokens by probability. Discard the rest. Renormalize to sum to 1.0.`,
      subset: sortedByProb.map((t, i) => ({ ...t, displayVal: i < topK ? (topKNorm.find(x => x.word === t.word)?.normProb * 100).toFixed(1) + '%' : '✕', barVal: i < topK ? (topKNorm.find(x => x.word === t.word)?.normProb / (topKNorm[0]?.normProb || 1)) : 0, kept: i < topK }))
    },
    {
      label: `Top-P (P=${topP})`, color: '#a78bfa',
      desc: `From the Top-K set, keep tokens until cumulative probability reaches ${topP}. Renormalize. Sample from this final set.`,
      subset: sortedByProb.map((t, i) => {
        const inTopP = topPNorm.find(x => x.word === t.word);
        const inTopK = i < topK;
        return { ...t, displayVal: inTopP ? (inTopP.normProb * 100).toFixed(1) + '%' : inTopK ? 'cut' : '✕', barVal: inTopP ? (inTopP.normProb / (topPNorm[0]?.normProb || 1)) : 0, kept: !!inTopP };
      })
    },
  ];

  const tempLabels = [
    { t: 0.1, label: 'Near-greedy', color: '#ef4444' },
    { t: 0.5, label: 'Focused', color: '#f97316' },
    { t: 1.0, label: 'Default', color: '#22c55e' },
    { t: 1.5, label: 'Creative', color: '#a78bfa' },
    { t: 2.0, label: 'Wild', color: '#ec4899' },
  ];
  const currentLabel = tempLabels.reduce((prev, curr) => Math.abs(curr.t - temperature) < Math.abs(prev.t - temperature) ? curr : prev);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.diagramBox} style={{ padding: 0 }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '0.4rem', padding: '1.25rem 1.5rem 0', flexWrap: 'wrap' }}>
          {panels.map((p, i) => (
            <button key={i} onClick={() => setActivePanel(i)} style={{
              padding: '0.4rem 0.85rem', borderRadius: '999px',
              border: `1.5px solid ${p.color}`,
              background: activePanel === i ? p.color : 'transparent',
              color: activePanel === i ? '#0f172a' : p.color,
              fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s'
            }}>{i + 1}. {p.label}</button>
          ))}
        </div>

        {/* ===== PANEL 1: TEMPERATURE EFFECT ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Drag the temperature slider to see how the probability distribution over the next tokens changes. Prompt context: <em style={{ color: '#7dd3fc' }}>"The sky is..."</em>
            </p>

            {/* Temperature slider */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Temperature</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: currentLabel.color, fontWeight: 800, fontSize: '1.1rem', fontFamily: 'monospace' }}>{temperature.toFixed(2)}</span>
                  <span style={{ color: currentLabel.color, fontSize: '0.75rem', border: `1px solid ${currentLabel.color}`, borderRadius: '999px', padding: '0.1rem 0.5rem' }}>{currentLabel.label}</span>
                </div>
              </div>
              <input type="range" min="0.05" max="3" step="0.05" value={temperature}
                onChange={e => setTemperature(Number(e.target.value))}
                style={{ width: '100%', accentColor: currentLabel.color, cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.65rem', marginTop: '0.15rem' }}>
                <span>0 → Greedy (deterministic)</span>
                <span>3 → Near-uniform (chaotic)</span>
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {tokens.map((tok, i) => {
                const p = probs[i];
                const pct = (p * 100).toFixed(1);
                const barW = (p / maxProb) * 100;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '52px', color: tok.color, fontWeight: 700, fontSize: '0.78rem', textAlign: 'right', flexShrink: 0 }}>{tok.word}</div>
                    <div style={{ flex: 1, background: '#0f172a', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
                      <div style={{ width: `${barW}%`, height: '100%', background: tok.color, borderRadius: '4px', transition: 'width 0.15s ease', display: 'flex', alignItems: 'center', paddingLeft: '6px' }}>
                        {barW > 20 && <span style={{ color: '#0f172a', fontSize: '0.68rem', fontWeight: 800 }}>{pct}%</span>}
                      </div>
                    </div>
                    {barW <= 20 && <span style={{ color: tok.color, fontSize: '0.68rem', width: '36px', flexShrink: 0 }}>{pct}%</span>}
                  </div>
                );
              })}
            </div>

            {/* Insight box */}
            <div style={{ marginTop: '1rem', padding: '0.65rem 0.85rem', background: `${currentLabel.color}12`, border: `1px solid ${currentLabel.color}40`, borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1' }}>
              {temperature < 0.3 && 'Near-greedy mode: "blue" dominates the distribution. The model will almost always output "blue" — very deterministic.'}
              {temperature >= 0.3 && temperature < 0.8 && 'Focused mode: top 2–3 tokens have most of the probability mass. Responses are coherent and predictable.'}
              {temperature >= 0.8 && temperature < 1.3 && 'Balanced mode: good spread across top tokens. Model feels natural — creative but not erratic.'}
              {temperature >= 1.3 && temperature < 2.0 && 'Creative mode: even low-probability tokens like "falling" get a real chance. Output will vary significantly.'}
              {temperature >= 2.0 && 'Chaotic mode: distribution is nearly flat — even "banana" could be sampled. Output quality degrades significantly.'}
            </div>
          </div>
        )}

        {/* ===== PANEL 2: TOP-K ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Top-K keeps only the <strong style={{ color: '#f59e0b' }}>K most probable tokens</strong> and discards the rest. Adjust K:
            </p>

            {/* K slider */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Top-K value</span>
                <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'monospace' }}>K = {topK}</span>
              </div>
              <input type="range" min="1" max="8" step="1" value={topK}
                onChange={e => setTopK(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.65rem', marginTop: '0.15rem' }}>
                <span>K=1 (greedy)</span><span>K=8 (all tokens)</span>
              </div>
            </div>

            {/* Tokens sorted by prob */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {sortedByProb.map((tok, i) => {
                const kept = i < topK;
                const normProbEntry = topKNorm.find(x => x.word === tok.word);
                const displayProb = kept ? (normProbEntry?.normProb * 100).toFixed(1) + '%' : 'removed';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: kept ? 1 : 0.35 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: kept ? '#f59e0b' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: kept ? '#0f172a' : '#64748b', fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ width: '52px', color: tok.color, fontWeight: 700, fontSize: '0.78rem', flexShrink: 0 }}>{tok.word}</div>
                    <div style={{ flex: 1, background: '#0f172a', borderRadius: '4px', height: '18px', overflow: 'hidden' }}>
                      {kept && <div style={{ width: `${(normProbEntry?.normProb / topKNorm[0]?.normProb) * 100}%`, height: '100%', background: tok.color, borderRadius: '4px', transition: 'width 0.2s' }} />}
                    </div>
                    <span style={{ color: kept ? tok.color : '#475569', fontSize: '0.72rem', width: '60px', textAlign: 'right', flexShrink: 0 }}>{displayProb}</span>
                    {kept && <span style={{ color: '#34d399', fontSize: '0.72rem' }}>✓</span>}
                    {!kept && <span style={{ color: '#f87171', fontSize: '0.72rem' }}>✕</span>}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '0.85rem', padding: '0.6rem 0.85rem', background: '#1c1200', border: '1px solid #f59e0b', borderRadius: '8px', fontSize: '0.78rem', color: '#fcd34d' }}>
              {topK === 1 ? 'K=1 is greedy sampling — only the top token is eligible, always the same pick.' : `Top ${topK} tokens kept. Their probabilities are renormalized to sum to 100%. Sampling happens from these ${topK} options only.`}
            </div>
          </div>
        )}

        {/* ===== PANEL 3: TOP-P ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Top-P keeps tokens until their <strong style={{ color: '#a78bfa' }}>cumulative probability reaches P</strong>. The pool size adapts dynamically:
            </p>

            {/* P slider */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Top-P value</span>
                <span style={{ color: '#a78bfa', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'monospace' }}>P = {topP.toFixed(2)}</span>
              </div>
              <input type="range" min="0.1" max="1.0" step="0.05" value={topP}
                onChange={e => setTopP(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#a78bfa', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.65rem', marginTop: '0.15rem' }}>
                <span>0 (greedy)</span><span>1.0 (all tokens)</span>
              </div>
            </div>

            {/* Cumulative prob visualization */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {sortedByProb.map((tok, i) => {
                let cumProbHere = 0;
                for (let j = 0; j <= i; j++) cumProbHere += probs[sortedByProb[j].origIdx];
                const kept = topPNorm.find(x => x.word === tok.word);
                const normEntry = topPNorm.find(x => x.word === tok.word);
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: kept ? 1 : 0.35 }}>
                    <div style={{ width: '52px', color: tok.color, fontWeight: 700, fontSize: '0.78rem', flexShrink: 0 }}>{tok.word}</div>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <div style={{ background: '#0f172a', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
                        <div style={{ width: `${(probs[tok.origIdx] / maxProb) * 100}%`, height: '100%', background: kept ? tok.color : '#334155', borderRadius: '4px' }} />
                      </div>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.7rem', width: '80px', textAlign: 'right', flexShrink: 0 }}>cum: {(Math.min(cumProbHere, 1) * 100).toFixed(1)}%</span>
                    {kept ? <span style={{ color: '#34d399', fontSize: '0.72rem' }}>✓</span> : <span style={{ color: '#f87171', fontSize: '0.72rem' }}>✕</span>}
                  </div>
                );
              })}
            </div>

            {/* Cumulative progress bar */}
            <div style={{ marginTop: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                <span>Cumulative coverage of kept tokens</span>
                <span style={{ color: '#a78bfa' }}>{Math.min(topPSum * 100, 100).toFixed(1)}% / target {topP * 100}%</span>
              </div>
              <div style={{ background: '#0f172a', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(topPSum, 1) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #a78bfa, #c084fc)', transition: 'width 0.2s' }} />
              </div>
            </div>
            <div style={{ marginTop: '0.6rem', padding: '0.55rem 0.85rem', background: '#1c0040', border: '1px solid #a78bfa', borderRadius: '8px', fontSize: '0.78rem', color: '#c4b5fd' }}>
              {topPNorm.length} token{topPNorm.length !== 1 ? 's' : ''} selected to reach P={topP}. {topP === 1.0 ? 'P=1.0 keeps all tokens — no filtering.' : `The model samples from these ${topPNorm.length} options after renormalization.`}
            </div>
          </div>
        )}

        {/* ===== PANEL 4: FULL PIPELINE ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              The full pipeline combining all three. Click each step to see what the token pool looks like at that stage:
            </p>

            {/* Step buttons */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {pipelineSteps.map((s, i) => (
                <button key={i} onClick={() => setPipelineStep(i)} style={{
                  padding: '0.4rem 0.75rem', borderRadius: '8px',
                  border: `1.5px solid ${s.color}`,
                  background: pipelineStep === i ? `${s.color}20` : 'transparent',
                  color: pipelineStep === i ? s.color : '#64748b',
                  fontWeight: pipelineStep === i ? 700 : 400, fontSize: '0.75rem', cursor: 'pointer'
                }}>{i + 1}. {s.label}</button>
              ))}
            </div>

            {/* Token bars at current step */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
              {pipelineSteps[pipelineStep].subset.map((tok, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: tok.kept === false ? 0.3 : 1 }}>
                  <div style={{ width: '52px', color: tok.color, fontWeight: 700, fontSize: '0.78rem', flexShrink: 0 }}>{tok.word}</div>
                  <div style={{ flex: 1, background: '#0f172a', borderRadius: '4px', height: '18px', overflow: 'hidden' }}>
                    <div style={{ width: `${(tok.barVal || 0) * 100}%`, height: '100%', background: tok.kept === false ? '#334155' : tok.color, borderRadius: '4px', transition: 'width 0.2s' }} />
                  </div>
                  <span style={{ color: tok.kept === false ? '#475569' : tok.color, fontSize: '0.72rem', width: '55px', textAlign: 'right', flexShrink: 0 }}>{tok.displayVal}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '0.75rem 0.9rem', background: `${pipelineSteps[pipelineStep].color}12`, border: `1.5px solid ${pipelineSteps[pipelineStep].color}`, borderRadius: '10px' }}>
              <div style={{ color: pipelineSteps[pipelineStep].color, fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>Step {pipelineStep + 1}: {pipelineSteps[pipelineStep].label}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{pipelineSteps[pipelineStep].desc}</div>
            </div>

            {/* Settings reminder */}
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[{ label: 'Temp', val: temperature.toFixed(1), color: '#f87171' }, { label: 'Top-K', val: topK, color: '#f59e0b' }, { label: 'Top-P', val: topP.toFixed(2), color: '#a78bfa' }].map((s, i) => (
                <div key={i} style={{ padding: '0.3rem 0.65rem', background: '#1e293b', border: `1px solid ${s.color}40`, borderRadius: '6px', fontSize: '0.75rem' }}>
                  <span style={{ color: '#64748b' }}>{s.label}: </span>
                  <span style={{ color: s.color, fontWeight: 700 }}>{s.val}</span>
                </div>
              ))}
              <span style={{ color: '#475569', fontSize: '0.72rem', alignSelf: 'center' }}>(adjust in other panels)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── HALLUCINATIONS & LIMITATIONS DIAGRAM ──────────────────────────────────────
const HallucinationsDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [famousExampleIdx, setFamousExampleIdx] = useState(0);
  const [granularityIdx, setGranularityIdx] = useState(0);
  const [causeIdx, setCauseIdx] = useState(0);
  
  // Mitigation Lab state
  const [promptQuality, setPromptQuality] = useState('vague'); // 'vague' | 'precise'
  const [labTemp, setLabTemp] = useState(1.2);
  const [useRAG, setUseRAG] = useState(false);

  const panels = [
    { label: '3 Famous Examples', color: '#ef4444' },
    { label: '4 Granularity Types', color: '#f59e0b' },
    { label: 'Root Cause Explorer', color: '#a78bfa' },
    { label: 'Mitigation Lab', color: '#34d399' },
  ];

  // Panel 1: Famous Examples
  const famousExamples = [
    {
      title: '1. Earth-to-Moon Distance',
      claim: '"The distance from Earth to the Moon is 54 million kilometers."',
      truth: '54 million km is the average distance to MARS! The Moon is only ~384,400 km away.',
      reason: 'The model confused two space numbers stored closely together in embedding space.',
      badge: 'Factual Error',
      color: '#f87171'
    },
    {
      title: '2. Career Biography Swap',
      claim: '"Before working at IBM, I worked at a major Australian airline."',
      truth: 'The presenter never worked at an airline — his brother did! The LLM blended related family bio facts.',
      reason: 'Entity confusion when multi-person details are co-located in training text.',
      badge: 'Context Blending',
      color: '#fb923c'
    },
    {
      title: '3. Google Bard JWST Launch ($100B Mistake)',
      claim: '"The James Webb Space Telescope took the first picture of an exoplanet."',
      truth: 'The first direct image of an exoplanet (2M1207b) was captured in 2004 by the VLT, 17 years before JWST.',
      reason: 'High co-occurrence of "JWST", "exoplanet", and "first image" in recent news created a false associative completion.',
      badge: 'High Impact Error',
      color: '#ec4899'
    }
  ];

  // Panel 2: 4 Granularity Types
  const granularityTypes = [
    {
      name: 'Sentence Contradiction',
      desc: 'A sentence in the output directly contradicts a sentence generated moments earlier.',
      exampleInput: 'Describe today\'s weather in London.',
      exampleOutput: 'The sky is clear and blue today in London. [...] Bring a raincoat as the sky is dark green and storming.',
      badgeColor: '#f87171'
    },
    {
      name: 'Prompt Contradiction',
      desc: 'The generated output directly violates the explicit instructions in the prompt.',
      exampleInput: 'Write a positive 5-star review of Bella Italia restaurant.',
      exampleOutput: 'The pasta was cold, the wine tasted stale, and the service was extremely rude.',
      badgeColor: '#fb923c'
    },
    {
      name: 'Factual Contradiction',
      desc: 'Statements that directly violate well-established world facts.',
      exampleInput: 'Who was the first President of the United States?',
      exampleOutput: 'Barack Obama was elected as the first President of the United States in 1789.',
      badgeColor: '#ec4899'
    },
    {
      name: 'Irrelevant Tangent',
      desc: 'Inserting random, completely unrelated facts that clutter the response.',
      exampleInput: 'What is the capital of France?',
      exampleOutput: 'The capital of France is Paris. Paris is also the name of a famous pop singer who released an album in 2006.',
      badgeColor: '#a78bfa'
    }
  ];

  // Panel 3: Root Causes
  const rootCauses = [
    {
      title: '1. Web Data Noise & Gaps',
      icon: '🌐',
      desc: 'LLMs are trained on massive web scrapes (Reddit, Wikipedia, forums). The internet contains sarcasm, errors, and unverified claims. When data is missing, models fill gaps with statistical guesses.',
      color: '#38bdf8'
    },
    {
      title: '2. Sampling & Generation Objectives',
      icon: '🎲',
      desc: 'Beam search and high temperature sampling introduce tradeoffs between fluency and accuracy. Pushing for high creativity forces the model to sample low-probability tokens that may be factual errors.',
      color: '#f59e0b'
    },
    {
      title: '3. Input Context Ambiguity',
      icon: '❓',
      desc: 'Without explicit background context, prompts confuse the model. Asking "Can cats speak English?" without mentioning the "Garfield comic strip" leads the model to make wrong contextual assumptions.',
      color: '#a78bfa'
    }
  ];

  // Computed lab output based on controls
  const getLabResult = () => {
    if (useRAG) {
      return {
        status: 'Grounded & Accurately Verified',
        color: '#34d399',
        output: 'Based on the provided document: The James Webb Space Telescope (JWST) was launched in December 2021. The first image of an exoplanet was captured in 2004 by the Very Large Telescope (VLT).',
        explanation: 'RAG grounding provided external verified source text. Hallucination rate = 0%.'
      };
    }
    if (promptQuality === 'vague' && labTemp > 0.8) {
      return {
        status: 'Severe Hallucination Risk',
        color: '#ef4444',
        output: 'JWST took the very first image of an exoplanet in 1998, which orbited Alpha Centauri at a distance of 54 million kilometers.',
        explanation: 'Vague prompt + high temperature (T=' + labTemp + ') caused random associative token sampling and factual blending.'
      };
    }
    if (promptQuality === 'vague' && labTemp <= 0.3) {
      return {
        status: 'Minor Factual Drift',
        color: '#f59e0b',
        output: 'JWST discovered the first exoplanet in space history shortly after its 2021 launch.',
        explanation: 'Low temperature reduced randomness, but vague prompt without grounding still led to historical inaccuracy.'
      };
    }
    return {
      status: 'High Accuracy & Focused Output',
      color: '#38bdf8',
      output: 'The James Webb Space Telescope has imaged several exoplanets (such as HIP 65426 b). However, the first-ever direct image of an exoplanet was taken in 2004 by the VLT.',
      explanation: 'Precise prompt constraints guided token probabilities toward factual precision.'
    };
  };

  const labResult = getLabResult();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.diagramBox} style={{ padding: 0 }}>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0.4rem', padding: '1.25rem 1.5rem 0', flexWrap: 'wrap' }}>
          {panels.map((p, i) => (
            <button key={i} onClick={() => setActivePanel(i)} style={{
              padding: '0.4rem 0.85rem', borderRadius: '999px',
              border: `1.5px solid ${p.color}`,
              background: activePanel === i ? p.color : 'transparent',
              color: activePanel === i ? '#0f172a' : p.color,
              fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s'
            }}>{i + 1}. {p.label}</button>
          ))}
        </div>

        {/* ===== PANEL 1: 3 FAMOUS EXAMPLES ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Click through the three famous real-world hallucinations discussed in the transcript:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {famousExamples.map((ex, i) => (
                <button key={i} onClick={() => setFamousExampleIdx(i)} style={{
                  padding: '0.35rem 0.75rem', borderRadius: '8px',
                  border: `1.5px solid ${famousExampleIdx === i ? ex.color : '#334155'}`,
                  background: famousExampleIdx === i ? `${ex.color}20` : 'transparent',
                  color: famousExampleIdx === i ? ex.color : '#64748b',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{ex.title.split('.')[1]}</button>
              ))}
            </div>

            {/* Example Card */}
            <div style={{ background: '#1e293b', border: `1.5px solid ${famousExamples[famousExampleIdx].color}`, borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ color: famousExamples[famousExampleIdx].color, margin: 0, fontSize: '1rem', fontWeight: 800 }}>
                  {famousExamples[famousExampleIdx].title}
                </h4>
                <span style={{ background: `${famousExamples[famousExampleIdx].color}25`, color: famousExamples[famousExampleIdx].color, border: `1px solid ${famousExamples[famousExampleIdx].color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700 }}>
                  {famousExamples[famousExampleIdx].badge}
                </span>
              </div>

              <div style={{ marginBottom: '0.85rem', padding: '0.75rem', background: '#3f1818', border: '1px solid #ef4444', borderRadius: '8px' }}>
                <div style={{ color: '#fca5a5', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>❌ AI Hallucination Output:</div>
                <div style={{ color: '#f87171', fontSize: '0.88rem', fontFamily: 'monospace' }}>{famousExamples[famousExampleIdx].claim}</div>
              </div>

              <div style={{ marginBottom: '0.85rem', padding: '0.75rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '8px' }}>
                <div style={{ color: '#6ee7b7', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>✓ Actual Ground Truth Fact:</div>
                <div style={{ color: '#a7f3d0', fontSize: '0.85rem' }}>{famousExamples[famousExampleIdx].truth}</div>
              </div>

              <div style={{ padding: '0.65rem 0.85rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.78rem', color: '#94a3b8' }}>
                <strong style={{ color: '#cbd5e1' }}>Why it happened:</strong> {famousExamples[famousExampleIdx].reason}
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: 4 GRANULARITY TYPES ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Select a hallucination granularity level to inspect its mechanics:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              {granularityTypes.map((gt, i) => (
                <button key={i} onClick={() => setGranularityIdx(i)} style={{
                  padding: '0.6rem 0.75rem', borderRadius: '8px',
                  border: `1.5px solid ${granularityIdx === i ? gt.badgeColor : '#334155'}`,
                  background: granularityIdx === i ? `${gt.badgeColor}15` : '#1e293b',
                  color: granularityIdx === i ? gt.badgeColor : '#cbd5e1',
                  fontWeight: 700, fontSize: '0.78rem', textAlign: 'left', cursor: 'pointer'
                }}>
                  {i + 1}. {gt.name}
                </button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${granularityTypes[granularityIdx].badgeColor}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: granularityTypes[granularityIdx].badgeColor, fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                {granularityTypes[granularityIdx].name}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: '0 0 0.85rem' }}>
                {granularityTypes[granularityIdx].desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ padding: '0.6rem 0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '7px' }}>
                  <span style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, display: 'block' }}>USER PROMPT:</span>
                  <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontFamily: 'monospace' }}>"{granularityTypes[granularityIdx].exampleInput}"</span>
                </div>

                <div style={{ padding: '0.6rem 0.8rem', background: '#2d1515', border: '1px solid #ef4444', borderRadius: '7px' }}>
                  <span style={{ color: '#f87171', fontSize: '0.7rem', fontWeight: 800, display: 'block' }}>HALLUCINATED OUTPUT:</span>
                  <span style={{ color: '#fca5a5', fontSize: '0.8rem', fontFamily: 'monospace' }}>"{granularityTypes[granularityIdx].exampleOutput}"</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: ROOT CAUSE EXPLORER ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Explore the three core architectural reasons why LLMs hallucinate:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {rootCauses.map((rc, i) => (
                <div key={i} onClick={() => setCauseIdx(i)} style={{
                  padding: '0.9rem 1.1rem', borderRadius: '10px',
                  border: `1.5px solid ${rc.color}`,
                  background: causeIdx === i ? `${rc.color}15` : '#1e293b',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ color: rc.color, fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{rc.icon}</span> {rc.title}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: '1.4' }}>{rc.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PANEL 4: MITIGATION LAB ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Test how prompt clarity, temperature tuning, and RAG grounding eliminate hallucinations:
            </p>

            {/* Controls Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {/* Prompt framing toggle */}
              <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>PROMPT FRAMING</label>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button onClick={() => setPromptQuality('vague')} style={{ flex: 1, padding: '0.3rem', borderRadius: '4px', border: 'none', background: promptQuality === 'vague' ? '#ef4444' : '#0f172a', color: '#fff', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Vague</button>
                  <button onClick={() => setPromptQuality('precise')} style={{ flex: 1, padding: '0.3rem', borderRadius: '4px', border: 'none', background: promptQuality === 'precise' ? '#38bdf8' : '#0f172a', color: '#fff', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Precise</button>
                </div>
              </div>

              {/* Temp slider */}
              <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <label style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700 }}>TEMP</label>
                  <span style={{ color: labTemp > 0.8 ? '#f87171' : '#34d399', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace' }}>T={labTemp.toFixed(1)}</span>
                </div>
                <input type="range" min="0.1" max="1.5" step="0.2" value={labTemp} onChange={e => setLabTemp(Number(e.target.value))} style={{ width: '100%', accentColor: labTemp > 0.8 ? '#f87171' : '#34d399', cursor: 'pointer' }} />
              </div>

              {/* RAG Toggle */}
              <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>RAG GROUNDING</label>
                <button onClick={() => setUseRAG(!useRAG)} style={{ width: '100%', padding: '0.3rem', borderRadius: '4px', border: 'none', background: useRAG ? '#34d399' : '#0f172a', color: useRAG ? '#0f172a' : '#64748b', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer' }}>
                  {useRAG ? '✓ RAG ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Live Result Box */}
            <div style={{ background: '#0f172a', border: `2px solid ${labResult.color}`, borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: labResult.color, fontWeight: 800, fontSize: '0.85rem' }}>
                  {labResult.status}
                </span>
                <span style={{ background: `${labResult.color}20`, color: labResult.color, padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                  SIMULATED RESPONSE
                </span>
              </div>

              <div style={{ padding: '0.65rem 0.85rem', background: '#1e293b', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#e2e8f0', marginBottom: '0.6rem' }}>
                "{labResult.output}"
              </div>

              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                <strong style={{ color: '#cbd5e1' }}>Analysis:</strong> {labResult.explanation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sequence of lesson IDs for next/prev navigation
const lessonOrder = ['ai-1-1', 'ai-1-2', 'ai-1-3', 'ai-1-4', 'ai-1-5', 'ai-2-1', 'ai-2-2', 'ai-2-3', 'ai-2-4', 'ai-2-5', 'ai-2-6', 'ai-2-7', 'ai-2-8', 'ai-2-9'];

export default function AILessonArticlePage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.lessonId || 'ai-1-1';
  const lesson = aiLessonsData[lessonId] || aiLessonsData['ai-1-1'];

  // Single quiz selection state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Multi-quiz selection state (for Chapter 5 Knowledge Check)
  const [multiAnswers, setMultiAnswers] = useState({});

  const currentIdx = lessonOrder.indexOf(lessonId);
  const nextLessonId = currentIdx < lessonOrder.length - 1 ? lessonOrder[currentIdx + 1] : null;
  const prevLessonId = currentIdx > 0 ? lessonOrder[currentIdx - 1] : null;

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleMultiSelect = (qId, optionIdx) => {
    setMultiAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  return (
    <div className={styles.container}>
      {/* ─── TOP STICKY HEADER ─────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <Link href="/learn/ai-engineering" className={styles.btnBack}>
            <IconArrowLeft size={16} /> Roadmap
          </Link>
          <div className={styles.navTitleGroup}>
            <span className={styles.navSectionTag}>{lesson.section}</span>
            <span className={styles.navLessonTitle}>{lesson.title}</span>
          </div>
        </div>

        <div className={styles.navRight}>
          <span className={styles.readTimeBadge}>{lesson.estimatedTime}</span>
          {lesson.gfgUrl && (
            <a
              href={lesson.gfgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGfg}
            >
              Reference Articles <IconExternalLink size={14} />
            </a>
          )}
        </div>
      </header>

      {/* ─── ARTICLE WRAPPER ───────────────────────────────────────── */}
      <main className={styles.articleWrapper}>
        
        {/* HERO HEADER CARD */}
        <div className={styles.heroCard}>
          <div
            className={styles.heroBadge}
            style={{ background: lesson.badgeColor || '#7c3aed' }}
          >
            {lesson.badgeText || 'AI LESSON'}
          </div>
          <h1 className={styles.articleTitle}>{lesson.title}</h1>
          <p className={styles.articleSubtitle}>{lesson.subtitle}</p>
        </div>

        {/* MAIN TEXT SECTIONS */}
        {lesson.sections &&
          lesson.sections.map((sec, idx) => (
            <section key={idx} className={styles.contentSection}>
              <h2 className={styles.sectionHeading}>
                <IconSparkles size={20} style={{ color: '#7c3aed' }} />
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className={styles.paragraph}>
                  {p}
                </p>
              ))}
            </section>
          ))}

        {/* ELI5 ANALOGY CARD */}
        {lesson.analogy && (
          <div className={styles.analogyCard}>
            <h3 className={styles.analogyTitle}>{lesson.analogy.title}</h3>
            <p className={styles.analogyText}>{lesson.analogy.text}</p>
          </div>
        )}

        {/* ANIMATED DIAGRAMS */}
        {lesson.diagram && (
          <div className={styles.diagramBox}>
            <h3 className={styles.diagramTitle}>{lesson.diagram.title}</h3>

            {/* Traditional vs AI Diagram */}
            {lesson.diagram.type === 'traditional_vs_ai' && (
              <div className={styles.diagramGrid}>
                <div className={styles.diagramCard}>
                  <div className={styles.diagramLabel}>{lesson.diagram.traditional.label}</div>
                  <div className={styles.diagramStep}>{lesson.diagram.traditional.input}</div>
                  <div className={styles.diagramArrow}>↓</div>
                  <div className={styles.diagramStep}>{lesson.diagram.traditional.process}</div>
                  <div className={styles.diagramArrow}>↓</div>
                  <div className={styles.diagramStep}>{lesson.diagram.traditional.output}</div>
                </div>

                <div className={styles.diagramCard} style={{ borderColor: '#a78bfa' }}>
                  <div className={styles.diagramLabel} style={{ color: '#c084fc' }}>{lesson.diagram.ai.label}</div>
                  <div className={styles.diagramStep}>{lesson.diagram.ai.input}</div>
                  <div className={styles.diagramArrow} style={{ color: '#a78bfa' }}>↓</div>
                  <div className={styles.diagramStep} style={{ background: '#312e81', borderColor: '#6366f1' }}>{lesson.diagram.ai.process}</div>
                  <div className={styles.diagramArrow} style={{ color: '#a78bfa' }}>↓</div>
                  <div className={styles.diagramStep} style={{ borderColor: '#22c55e', color: '#4ade80' }}>{lesson.diagram.ai.output}</div>
                </div>
              </div>
            )}

            {/* Nesting Circles Diagram */}
            {lesson.diagram.type === 'nesting_dolls' && (
              <NestedCirclesDiagram />
            )}

            {/* LLM Architecture Flowchart Diagram */}
            {lesson.diagram.type === 'llm_flowchart' && (
              <LLMFlowchartDiagram />
            )}

            {/* Training vs Inference Diagram */}
            {lesson.diagram.type === 'training_vs_inference' && (
              <TrainingInferenceDiagram />
            )}

            {/* Transformer Architecture Diagram */}
            {lesson.diagram.type === 'transformer_architecture' && (
              <TransformerDiagram />
            )}

            {/* Tokenization Diagram */}
            {lesson.diagram.type === 'tokenization' && (
              <TokenizationDiagram />
            )}

            {/* Context Window Diagram */}
            {lesson.diagram.type === 'context_window' && (
              <ContextWindowDiagram />
            )}

            {/* Embeddings Diagram */}
            {lesson.diagram.type === 'embeddings' && (
              <EmbeddingsDiagram />
            )}

            {/* Model Parameters Diagram */}
            {lesson.diagram.type === 'model_parameters' && (
              <ModelParametersDiagram />
            )}

            {/* Temperature & Sampling Diagram */}
            {lesson.diagram.type === 'temperature_sampling' && (
              <TemperatureSamplingDiagram />
            )}

            {/* Hallucinations & Limitations Diagram */}
            {lesson.diagram.type === 'hallucinations' && (
              <HallucinationsDiagram />
            )}

            {/* Industry Grid Diagram */}
            {lesson.diagram.type === 'industry_grid' && (
              <div className={styles.industryGrid}>
                {lesson.diagram.sectors.map((sec, sIdx) => (
                  <div key={sIdx} className={styles.industryCard}>
                    <div className={styles.industryHeader}>{sec.name}</div>
                    <p className={styles.industryDesc}>{sec.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* KEY TAKEAWAYS CHECKLIST */}
        {lesson.takeaways && (
          <div className={styles.takeawaysCard}>
            <h3 className={styles.takeawaysTitle}>
              <IconCheckmark size={22} /> Key Rules & Takeaways
            </h3>
            <ul className={styles.takeawaysList}>
              {lesson.takeaways.map((item, tIdx) => (
                <li key={tIdx} className={styles.takeawayItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* EMBEDDED YOUTUBE VIDEO WALKTHROUGH */}
        {lesson.videoUrl && (
          <div className={styles.videoCard}>
            <div className={styles.videoCardHeader}>
              <IconVideo size={22} />
              <span>Video Walkthrough &amp; Practical Demonstration</span>
            </div>
            <div className={styles.videoEmbedRatio}>
              <iframe
                src={lesson.videoUrl}
                title="Video Tutorial Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* SINGLE KNOWLEDGE CHECK QUIZ */}
        {lesson.quiz && (
          <div className={styles.quizCard}>
            <div className={styles.quizHeader}>
              <IconSparkles size={22} /> Interactive Knowledge Check
            </div>
            <p className={styles.quizQuestion}>{lesson.quiz.question}</p>

            <div className={styles.quizOptions}>
              {lesson.quiz.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === lesson.quiz.correctIndex;
                let btnStyle = styles.optionBtn;

                if (isAnswered) {
                  if (isCorrect) btnStyle += ` ${styles.optionCorrect}`;
                  else if (isSelected && !isCorrect) btnStyle += ` ${styles.optionIncorrect}`;
                }

                return (
                  <button
                    key={oIdx}
                    className={btnStyle}
                    onClick={() => handleOptionSelect(oIdx)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={styles.explanationBox}>
                <strong>Explanation:</strong> {lesson.quiz.explanation}
              </div>
            )}
          </div>
        )}

        {/* MULTI-QUIZ FOR CHAPTER 5 */}
        {lesson.multiQuiz && (
          <div className={styles.quizCard}>
            <div className={styles.quizHeader}>
              <IconSparkles size={22} /> Module 1 Final Knowledge Check
            </div>
            {lesson.multiQuiz.map((q) => (
              <div key={q.id} style={{ marginBottom: '28px' }}>
                <p className={styles.quizQuestion}>{q.question}</p>
                <div className={styles.quizOptions}>
                  {q.options.map((opt, oIdx) => {
                    const userSel = multiAnswers[q.id];
                    const isSelected = userSel === oIdx;
                    const isCorrect = oIdx === q.correctIndex;
                    let btnStyle = styles.optionBtn;

                    if (userSel !== undefined) {
                      if (isCorrect) btnStyle += ` ${styles.optionCorrect}`;
                      else if (isSelected && !isCorrect) btnStyle += ` ${styles.optionIncorrect}`;
                    }

                    return (
                      <button
                        key={oIdx}
                        className={btnStyle}
                        onClick={() => handleMultiSelect(q.id, oIdx)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {multiAnswers[q.id] !== undefined && (
                  <div className={styles.explanationBox}>
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM NAVIGATION BUTTONS */}
        <div className={styles.bottomNav}>
          {prevLessonId ? (
            <Link href={`/learn/ai-engineering/${prevLessonId}`} className={styles.btnBack}>
              <IconArrowLeft size={16} /> Previous Lesson
            </Link>
          ) : <div />}

          {nextLessonId ? (
            <Link href={`/learn/ai-engineering/${nextLessonId}`} className={styles.btnNext}>
              Next Lesson <IconArrowRight size={18} />
            </Link>
          ) : (
            <Link href="/learn/ai-engineering" className={styles.btnNext}>
              Finish Module 1
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}
