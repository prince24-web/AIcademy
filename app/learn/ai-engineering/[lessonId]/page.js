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

// Sequence of lesson IDs for next/prev navigation
const lessonOrder = ['ai-1-1', 'ai-1-2', 'ai-1-3', 'ai-1-4', 'ai-1-5', 'ai-2-1', 'ai-2-2', 'ai-2-3'];

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
