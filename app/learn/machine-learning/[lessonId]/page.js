'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { mlLessonsData } from '../mlLessonsData';

// ─── SVG VECTOR ICONS (STRICTLY NO EMOJIS) ──────────────────────────────────
const IconArrowLeft = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const IconArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconSparkles = ({ size = 20, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

const IconCheckmark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconCode = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconLayers = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);

const IconTarget = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

// ─── SYNTAX HIGHLIGHTED CODE BLOCK ──────────────────────────────────────────
const SyntaxCodeBlock = ({ code, title = 'Python Script', language = 'Python' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '1.25rem 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        padding: '0.65rem 1rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <IconCode size={16} style={{ color: '#475569' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', fontFamily: 'monospace' }}>
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? '#ecfdf5' : '#f1f5f9',
            border: `1px solid ${copied ? '#a7f3d0' : '#cbd5e1'}`,
            color: copied ? '#047857' : '#475569',
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '0.25rem 0.65rem',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          {copied ? 'Copied' : 'Copy Code'}
        </button>
      </div>

      <pre style={{
        margin: 0,
        padding: '1.1rem 1.25rem',
        color: '#1e293b',
        fontSize: '0.82rem',
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        lineHeight: '1.6',
        overflowX: 'auto',
        background: '#f8fafc'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ─── MINIMALIST LIGHT-MODE WHAT IS MACHINE LEARNING DIAGRAM ─────────────────
const WhatIsMLDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('spam');
  const [learningStep, setLearningStep] = useState(0);

  // E, T, P Scenarios
  const etpScenarios = [
    {
      id: 'spam',
      title: 'Email Spam Filter',
      category: 'Classification',
      task: 'Classify whether an incoming email is Spam or Inbox.',
      experience: '100,000 historical emails previously flagged or approved by users.',
      performance: 'Classification Accuracy (% of emails correctly classified without sending legitimate mail to spam).'
    },
    {
      id: 'house',
      title: 'Real Estate Valuation',
      category: 'Regression',
      task: 'Predict the selling price ($) of a residential property.',
      experience: 'Historical sales records with square footage, bedrooms, location, and final sale prices.',
      performance: 'Root Mean Squared Error (RMSE) and Mean Absolute Percentage Error (MAPE).'
    },
    {
      id: 'vision',
      title: 'Medical Image Pathology',
      category: 'Computer Vision',
      task: 'Detect the presence of benign or malignant tumors in chest X-rays.',
      experience: '50,000 verified radiographic scans annotated by board-certified radiologists.',
      performance: 'Recall & Sensitivity (ensuring malignant cases are never missed false-negatives).'
    },
    {
      id: 'driving',
      title: 'Autonomous Vehicle Steering',
      category: 'Robotics / Control',
      task: 'Output continuous steering angle and throttle to keep the vehicle safely in-lane.',
      experience: '1,000,000 hours of synchronized video, lidar feeds, and expert driver steering maneuvers.',
      performance: 'Average disengagement-free miles driven between safety interventions.'
    }
  ];

  const currentScenario = etpScenarios.find(s => s.id === selectedScenario) || etpScenarios[0];

  // Learning sandbox steps
  const learningStepsData = [
    {
      step: 0,
      title: 'Initial Random State',
      desc: 'The model has no knowledge. Weight and bias are initialized randomly.',
      weights: 'w = 0.50,  b = 0.00',
      formula: 'y_pred = 0.50 * x + 0.00',
      example: 'For x=3: y_pred = 1.50 (Actual y = 7.00)',
      error: 'High Error (Loss = 18.25)',
      statusColor: '#ef4444'
    },
    {
      step: 1,
      title: 'Iterative Error Feedback (Epoch 50)',
      desc: 'The optimizer calculates the gradient of the error and nudges the parameters.',
      weights: 'w = 1.45,  b = 0.60',
      formula: 'y_pred = 1.45 * x + 0.60',
      example: 'For x=3: y_pred = 4.95 (Actual y = 7.00)',
      error: 'Moderate Error (Loss = 4.10)',
      statusColor: '#f59e0b'
    },
    {
      step: 2,
      title: 'Convergence / Optimal Rule Extracted (Epoch 200)',
      desc: 'The parameters converge to the true underlying statistical rule.',
      weights: 'w = 2.00,  b = 1.00',
      formula: 'y_pred = 2.00 * x + 1.00',
      example: 'For x=3: y_pred = 7.00 (Actual y = 7.00)',
      error: 'Optimal / Zero Error (Loss = 0.00)',
      statusColor: '#10b981'
    }
  ];

  const curStep = learningStepsData[learningStep];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '2rem 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              background: '#f1f5f9',
              color: '#475569',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid #e2e8f0'
            }}>
              INTERACTIVE PARADIGM EXPLORER
            </span>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              What is Machine Learning?
            </h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.25rem 0 0' }}>
            Explore how data-driven learning differs from traditional rule-based algorithms.
          </p>
        </div>

        {/* Minimalist Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          background: '#f8fafc',
          padding: '0.25rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          {[
            { label: 'Traditional vs ML', tab: 0 },
            { label: 'Mitchell E-T-P Framework', tab: 1 },
            { label: 'Rule Discovery Simulation', tab: 2 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === t.tab ? '#ffffff' : 'transparent',
                color: activeTab === t.tab ? '#0f172a' : '#64748b',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: TRADITIONAL VS MACHINE LEARNING ─── */}
      {activeTab === 0 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            
            {/* TRADITIONAL SOFTWARE CARD */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
                  1. Traditional Programming
                </span>
                <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                  Deterministic
                </span>
              </div>

              {/* Step diagram */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ flex: 1, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.5rem', textAlign: 'center', fontSize: '0.74rem', fontWeight: 700, color: '#334155' }}>
                    Data (Input)
                  </div>
                  <div style={{ flex: 1, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.5rem', textAlign: 'center', fontSize: '0.74rem', fontWeight: 700, color: '#334155' }}>
                    Rules (Code)
                  </div>
                </div>

                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>↓ executes on computer ↓</div>

                <div style={{ background: '#ffffff', border: '1.5px solid #94a3b8', borderRadius: '6px', padding: '0.6rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
                  Answers (Output)
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', fontSize: '0.75rem', color: '#475569', lineHeight: '1.45' }}>
                <strong style={{ color: '#0f172a' }}>How it works: </strong>
                A human engineer manually designs and hardcodes every conditional branch. If an unhandled case appears, the system produces bugs.
              </div>
            </div>

            {/* MACHINE LEARNING CARD */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                  2. Machine Learning
                </span>
                <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800, border: '1px solid #e2e8f0' }}>
                  Data-Driven
                </span>
              </div>

              {/* Step diagram */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ flex: 1, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.5rem', textAlign: 'center', fontSize: '0.74rem', fontWeight: 700, color: '#0f172a' }}>
                    Data (Observations)
                  </div>
                  <div style={{ flex: 1, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.5rem', textAlign: 'center', fontSize: '0.74rem', fontWeight: 700, color: '#0f172a' }}>
                    Answers (Labels)
                  </div>
                </div>

                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>↓ trained by algorithm ↓</div>

                <div style={{ background: '#ffffff', border: '1.5px solid #475569', borderRadius: '6px', padding: '0.6rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
                  Rules (Learned Model)
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', fontSize: '0.75rem', color: '#475569', lineHeight: '1.45' }}>
                <strong style={{ color: '#0f172a' }}>How it works: </strong>
                The computer automatically extracts the statistical relationship connecting inputs to outputs. Unseen data is then passed into the model to predict answers.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: MITCHELL E-T-P FRAMEWORK ─── */}
      {activeTab === 1 && (
        <div>
          {/* Scenario Selector Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {etpScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: `1px solid ${selectedScenario === s.id ? '#475569' : '#e2e8f0'}`,
                  background: selectedScenario === s.id ? '#f1f5f9' : '#ffffff',
                  color: selectedScenario === s.id ? '#0f172a' : '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* E, T, P Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Task (T)
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                What action is the model performing?
              </div>
              <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: '1.45', margin: 0 }}>
                {currentScenario.task}
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Experience (E)
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                What training data does it learn from?
              </div>
              <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: '1.45', margin: 0 }}>
                {currentScenario.experience}
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Performance Measure (P)
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                How is improvement measured?
              </div>
              <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: '1.45', margin: 0 }}>
                {currentScenario.performance}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: RULE DISCOVERY SIMULATION ─── */}
      {activeTab === 2 && (
        <div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0 0 1rem' }}>
            Observe how a machine learning model discovers the mathematical rule <code>y = 2x + 1</code> purely from data points:
          </p>

          {/* Stepper Toolbar */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {learningStepsData.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setLearningStep(idx)}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${learningStep === idx ? '#475569' : '#e2e8f0'}`,
                  background: learningStep === idx ? '#f1f5f9' : '#ffffff',
                  color: learningStep === idx ? '#0f172a' : '#64748b',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Step {idx + 1}: {s.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Step Detail Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                {curStep.title}
              </span>
              <span style={{ background: '#ffffff', color: curStep.statusColor, border: `1px solid ${curStep.statusColor}`, padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                {curStep.error}
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#475569', margin: '0 0 0.85rem', lineHeight: '1.45' }}>
              {curStep.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Learned Parameters:</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '0.2rem' }}>
                  {curStep.weights}
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Synthesized Function:</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '0.2rem' }}>
                  {curStep.formula}
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Validation Sample:</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginTop: '0.2rem' }}>
                  {curStep.example}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN MACHINE LEARNING LESSON ARTICLE PAGE ──────────────────────────────
const lessonOrder = ['ml-1-1', 'ml-1-2', 'ml-1-3', 'ml-1-4', 'ml-1-5', 'ml-1-6', 'ml-1-7', 'ml-1-8', 'ml-1-p1'];

export default function MLLessonArticlePage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.lessonId || 'ml-1-1';
  const lesson = mlLessonsData[lessonId] || mlLessonsData['ml-1-1'];

  // Single quiz selection state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentIdx = lessonOrder.indexOf(lessonId);
  const nextLessonId = currentIdx < lessonOrder.length - 1 ? lessonOrder[currentIdx + 1] : null;
  const prevLessonId = currentIdx > 0 ? lessonOrder[currentIdx - 1] : null;

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setIsAnswered(true);
  };

  return (
    <div className={styles.container}>
      {/* ─── TOP STICKY HEADER ─────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <Link href="/learn/machine-learning" className={styles.btnBack}>
            <IconArrowLeft size={16} /> Roadmap
          </Link>
          <div className={styles.navTitleGroup}>
            <span className={styles.navSectionTag}>{lesson.module || 'Machine Learning'}</span>
            <span className={styles.navLessonTitle}>{lesson.title}</span>
          </div>
        </div>

        <div className={styles.navRight}>
          <span className={styles.readTimeBadge}>{lesson.duration || '15 min read'}</span>
          {lesson.gfgUrl && (
            <a
              href={lesson.gfgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGfg}
            >
              Reference Docs
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
            style={{ background: lesson.badgeColor || '#475569' }}
          >
            {lesson.badgeText || 'ML LESSON'}
          </div>
          <h1 className={styles.articleTitle}>{lesson.title}</h1>
          <p className={styles.articleSubtitle}>{lesson.subtitle}</p>
        </div>

        {/* LEARNING OBJECTIVES */}
        {lesson.learningObjectives && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <IconTarget size={18} /> In This Lesson, You Will Learn:
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.85rem', lineHeight: '1.7' }}>
              {lesson.learningObjectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {/* MAIN TEXT SECTIONS */}
        {lesson.sections &&
          lesson.sections.map((sec, idx) => (
            <section key={idx} className={styles.contentSection}>
              <h2 className={styles.sectionHeading}>
                <IconSparkles size={20} style={{ color: '#475569' }} />
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className={styles.paragraph}>
                  {p}
                </p>
              ))}
              {sec.codeBlock && (
                <SyntaxCodeBlock
                  code={sec.codeBlock}
                  title={sec.codeBlockTitle}
                  language="Python"
                />
              )}
            </section>
          ))}

        {/* ELI5 ANALOGY CARD */}
        {lesson.analogy && (
          <div className={styles.analogyCard} style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <h3 className={styles.analogyTitle} style={{ color: '#0f172a' }}>{lesson.analogy.title}</h3>
            <p className={styles.analogyText} style={{ color: '#334155' }}>{lesson.analogy.text}</p>
          </div>
        )}

        {/* INTERACTIVE DIAGRAMS (LIGHT MODE MINIMALIST) */}
        {lesson.diagram && (
          <div className={styles.diagramBox} style={{ background: 'transparent', padding: 0, border: 'none' }}>
            {lesson.diagram.type === 'what_is_ml' && (
              <WhatIsMLDiagram />
            )}
          </div>
        )}

        {/* KEY TAKEAWAYS CHECKLIST */}
        {lesson.takeaways && (
          <div className={styles.takeawaysCard} style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <h3 className={styles.takeawaysTitle} style={{ color: '#0f172a' }}>
              <IconCheckmark size={22} style={{ color: '#10b981' }} /> Key Takeaways
            </h3>
            <ul className={styles.takeawaysList}>
              {lesson.takeaways.map((takeaway, idx) => (
                <li key={idx} className={styles.takeawayItem} style={{ color: '#334155' }}>
                  <span className={styles.takeawayBullet} style={{ background: '#475569' }}></span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* KNOWLEDGE CHECK QUIZ */}
        {lesson.quiz && (
          <div className={styles.quizCard} style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <div className={styles.quizHeader}>
              <span className={styles.quizTag} style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>KNOWLEDGE CHECK</span>
              <h3 className={styles.quizQuestion} style={{ color: '#0f172a' }}>{lesson.quiz.question}</h3>
            </div>

            <div className={styles.quizOptions}>
              {lesson.quiz.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === lesson.quiz.correctIndex;
                let optionStyle = {
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#1e293b'
                };

                if (isAnswered) {
                  if (isCorrect) {
                    optionStyle = {
                      background: '#ecfdf5',
                      border: '1.5px solid #10b981',
                      color: '#065f46'
                    };
                  } else if (isSelected) {
                    optionStyle = {
                      background: '#fef2f2',
                      border: '1.5px solid #ef4444',
                      color: '#991b1b'
                    };
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => !isAnswered && handleOptionSelect(oIdx)}
                    style={{
                      ...optionStyle,
                      padding: '0.85rem 1.25rem',
                      borderRadius: '10px',
                      textAlign: 'left',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: isAnswered ? 'default' : 'pointer',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <IconCheckmark size={18} />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div style={{
                marginTop: '1rem',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                background: selectedOption === lesson.quiz.correctIndex ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${selectedOption === lesson.quiz.correctIndex ? '#a7f3d0' : '#fecaca'}`,
                color: selectedOption === lesson.quiz.correctIndex ? '#065f46' : '#991b1b',
                fontSize: '0.8rem',
                lineHeight: '1.5'
              }}>
                <strong>{selectedOption === lesson.quiz.correctIndex ? 'Correct! ' : 'Not quite. '}</strong>
                {lesson.quiz.explanation}
              </div>
            )}
          </div>
        )}

        {/* BOTTOM NAVIGATION BUTTONS */}
        <div className={styles.bottomNav}>
          {prevLessonId ? (
            <Link href={`/learn/machine-learning/${prevLessonId}`} className={styles.btnNavPrev}>
              <IconArrowLeft size={16} /> Previous Lesson
            </Link>
          ) : (
            <div />
          )}

          {nextLessonId ? (
            <Link href={`/learn/machine-learning/${nextLessonId}`} className={styles.btnNavNext} style={{ background: '#475569', boxShadow: '0 4px 12px rgba(71,85,105,0.25)' }}>
              Next Lesson <IconArrowRight size={16} />
            </Link>
          ) : (
            <Link href="/learn/machine-learning" className={styles.btnNavNext} style={{ background: '#475569' }}>
              Complete Module <IconCheckmark size={16} />
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}
