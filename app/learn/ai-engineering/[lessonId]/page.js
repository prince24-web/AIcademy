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

const IconSparkles = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/>
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

// Sequence of lesson IDs for next/prev navigation
const lessonOrder = ['ai-1-1', 'ai-1-2', 'ai-1-3', 'ai-1-4', 'ai-1-5', 'ai-2-1'];

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
