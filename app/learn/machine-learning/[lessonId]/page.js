'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { mlLessonsData } from '../mlLessonsData';

// ─── CONFETTI CELEBRATION TRIGGER ───────────────────────────────────────────
const triggerConfetti = (originX = 0.5, originY = 0.6) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  try {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = [
      '#001f54', '#0a3a82', '#0284c7', '#38bdf8',
      '#6366f1', '#8b5cf6', '#f59e0b', '#ec4899',
      '#10b981', '#06b6d4', '#fbbf24', '#f97316'
    ];

    const particleCount = 140;
    const particles = [];
    const startX = width * originX;
    const startY = height * originY;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.PI * (Math.random() * 1.5 - 1.25); // upward fan
      const speed = Math.random() * 22 + 10;
      particles.push({
        x: startX + (Math.random() * 40 - 20),
        y: startY + (Math.random() * 20 - 10),
        vx: Math.cos(angle) * speed * (Math.random() * 0.9 + 0.4),
        vy: Math.sin(angle) * speed * (Math.random() * 0.9 + 0.4) - 4,
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 18,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.12 + 0.05,
        alpha: 1,
        decay: Math.random() * 0.011 + 0.007,
        shape: Math.random() > 0.35 ? 'rect' : 'circle'
      });
    }

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let aliveCount = 0;

      for (let p of particles) {
        if (p.alpha <= 0) continue;
        aliveCount++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.48; // gravity
        p.vx *= 0.985; // drag
        p.rotation += p.rSpeed;
        p.wobble += p.wobbleSpeed;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        const scaleX = Math.cos(p.wobble);

        if (p.shape === 'rect') {
          ctx.fillRect((-p.size / 2) * scaleX, -p.size / 2, p.size * scaleX, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, (p.size / 2) * Math.abs(scaleX), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (aliveCount > 0) {
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
    };

    animId = requestAnimationFrame(render);
  } catch (err) {
    console.error('Confetti animation error:', err);
  }
};

// ─── SVG VECTOR ICONS (STRICTLY NO EMOJIS) ──────────────────────────────────
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

const IconSparkles = ({ size = 20, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

const IconCheckmark = ({ size = 20, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconCode = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconTarget = ({ size = 18, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconCpu = ({ size = 18, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);

// ─── RICH PYTHON SYNTAX HIGHLIGHTER ─────────────────────────────────────────
const renderHighlightedPython = (codeString) => {
  if (!codeString) return null;
  const lines = codeString.split('\n');

  // Tokenize regex matching comments, strings, keywords, built-ins, numbers, operators
  const tokenRegex = /(#[^\n]*)|(f?"(?:[^"\\]|\\.)*"|f?'(?:[^'\\]|\\.)*')|(\b(?:def|return|import|from|as|class|if|else|elif|for|while|in|is|not|and|or|True|False|None)\b)|(\b(?:print|np|sklearn|linear_model|LinearRegression|array|model|fit|predict|coef_|intercept_)\b)|(\b\d+(?:\.\d+)?\b)|([+\-*/=<>!%&|^~:]+)|([a-zA-Z_]\w*)|([^\s\w])/g;

  return lines.map((line, lineIdx) => {
    if (!line.trim()) {
      return <div key={lineIdx} style={{ height: '1.25em' }}>&nbsp;</div>;
    }

    if (line.trim().startsWith('#')) {
      return (
        <div key={lineIdx} style={{ color: '#64748b', fontStyle: 'italic' }}>
          {line}
        </div>
      );
    }

    const elements = [];
    let lastIdx = 0;
    let match;
    tokenRegex.lastIndex = 0;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIdx) {
        elements.push(line.slice(lastIdx, match.index));
      }

      const [full, comment, str, kw, builtin, num, op, ident, punct] = match;

      if (comment) {
        elements.push(
          <span key={match.index} style={{ color: '#64748b', fontStyle: 'italic' }}>
            {comment}
          </span>
        );
      } else if (str) {
        elements.push(
          <span key={match.index} style={{ color: '#4ade80' }}>
            {str}
          </span>
        );
      } else if (kw) {
        elements.push(
          <span key={match.index} style={{ color: '#c084fc', fontWeight: 700 }}>
            {kw}
          </span>
        );
      } else if (builtin) {
        elements.push(
          <span key={match.index} style={{ color: '#60a5fa' }}>
            {builtin}
          </span>
        );
      } else if (num) {
        elements.push(
          <span key={match.index} style={{ color: '#fbbf24' }}>
            {num}
          </span>
        );
      } else if (op) {
        elements.push(
          <span key={match.index} style={{ color: '#38bdf8' }}>
            {op}
          </span>
        );
      } else if (ident) {
        elements.push(
          <span key={match.index} style={{ color: '#f8fafc' }}>
            {ident}
          </span>
        );
      } else {
        elements.push(
          <span key={match.index} style={{ color: '#94a3b8' }}>
            {punct || full}
          </span>
        );
      }

      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < line.length) {
      elements.push(line.slice(lastIdx));
    }

    return (
      <div key={lineIdx} style={{ whiteSpace: 'pre' }}>
        {elements}
      </div>
    );
  });
};

// ─── SYNTAX HIGHLIGHTED DARK-MODE CODE BLOCK ────────────────────────────────
const SyntaxCodeBlock = ({ code, title = 'Python Script' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.codeBlockWrapper}>
      <div className={styles.codeBlockHeader}>
        <div className={styles.codeHeaderLeft}>
          <div className={styles.codeWindowDots}>
            <div className={`${styles.codeDot} ${styles.codeDotRed}`} />
            <div className={`${styles.codeDot} ${styles.codeDotYellow}`} />
            <div className={`${styles.codeDot} ${styles.codeDotGreen}`} />
          </div>
          <span className={styles.codeTitle}>{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`${styles.btnCopyCode} ${copied ? styles.btnCopyCodeSuccess : ''}`}
        >
          {copied ? <IconCheckmark size={14} /> : <IconCode size={14} />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      <pre className={styles.codePre}>
        <code>{renderHighlightedPython(code)}</code>
      </pre>
    </div>
  );
};

// ─── LIVELY & COLORFUL WHAT IS MACHINE LEARNING DIAGRAM (NAVY THEME) ────────
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
      badgeColor: '#0284c7',
      task: 'Classify incoming emails as Spam or Legitimate (Inbox).',
      experience: '100,000 historical emails annotated by users with body text, sender reputation, and headers.',
      performance: 'Accuracy Rate (% correctly labeled) and False-Positive Rate (vital legitimate emails must not land in Spam).'
    },
    {
      id: 'house',
      title: 'Real Estate Valuation',
      category: 'Regression',
      badgeColor: '#001f54',
      task: 'Predict the continuous monetary selling price ($) of a residential home.',
      experience: 'Past records of 50,000 home sales including square footage, zip code, bedrooms, and sale date.',
      performance: 'Root Mean Squared Error (RMSE) and R² Coefficient of Determination.'
    },
    {
      id: 'vision',
      title: 'Radiology Tumor Detection',
      category: 'Computer Vision',
      badgeColor: '#7c3aed',
      task: 'Segment and identify benign vs malignant lesions in chest CT scans.',
      experience: '40,000 verified radiographic DICOM scans verified by biopsy reports.',
      performance: 'Sensitivity / Recall (>99.5% to ensure zero false-negative missed tumors).'
    },
    {
      id: 'driving',
      title: 'Autonomous Vehicle Steering',
      category: 'Robotics & Control',
      badgeColor: '#d97706',
      task: 'Output real-time steering angle, brake pressure, and throttle trajectory.',
      experience: '2,000,000 hours of multi-camera video, lidar point clouds, and expert human driver intervention logs.',
      performance: 'Mean Miles Traveled between safety-critical disengagements.'
    }
  ];

  const currentScenario = etpScenarios.find(s => s.id === selectedScenario) || etpScenarios[0];

  // Learning sandbox points: y = 2x + 1
  const rawPoints = [
    { x: 1, y: 3 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 9 }
  ];

  const learningStepsData = [
    {
      step: 0,
      epoch: 'Epoch 0 (Initial)',
      title: 'Random Initialization',
      desc: 'The model has no initial knowledge. Weights and bias are set to naive random guesses.',
      w: 0.5,
      b: 0.0,
      weights: 'w = 0.50,  b = 0.00',
      formula: 'y_pred = 0.50 * x + 0.00',
      loss: '18.25',
      lossPercent: 100,
      lossColor: '#ef4444'
    },
    {
      step: 1,
      epoch: 'Epoch 40 (Learning)',
      title: 'Gradient Optimization',
      desc: 'Loss gradients compute error directions; optimizer updates parameters toward steeper descent.',
      w: 1.45,
      b: 0.6,
      weights: 'w = 1.45,  b = 0.60',
      formula: 'y_pred = 1.45 * x + 0.60',
      loss: '4.10',
      lossPercent: 28,
      lossColor: '#f59e0b'
    },
    {
      step: 2,
      epoch: 'Epoch 200 (Converged)',
      title: 'Optimal Rule Synthesized',
      desc: 'Loss hits zero. The model extracted the true underlying law y = 2x + 1 purely from data.',
      w: 2.0,
      b: 1.0,
      weights: 'w = 2.00,  b = 1.00',
      formula: 'y_pred = 2.00 * x + 1.00',
      loss: '0.00',
      lossPercent: 0,
      lossColor: '#001f54'
    }
  ];

  const curStep = learningStepsData[learningStep];

  // Coordinates mapping for 280x180 SVG canvas
  const mapX = (x) => 35 + (x / 5) * 210;
  const mapY = (y) => 155 - (y / 11) * 135;

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              INTERACTIVE PARADIGM ARENA
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              The Mechanics of Machine Learning
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Compare deterministic code vs statistical learning, explore Mitchell E-T-P framing, and watch rule discovery in action.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2'
        }}>
          {[
            { label: 'Code vs ML Paradigm', tab: 0 },
            { label: 'Mitchell E-T-P Framework', tab: 1 },
            { label: 'Live Rule Discovery', tab: 2 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: PARADIGM SHIFT (TRADITIONAL VS MACHINE LEARNING) ─── */}
      {activeTab === 0 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            {/* TRADITIONAL SOFTWARE CARD */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '16px',
              padding: '1.4rem',
              position: 'relative',
              boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Traditional Programming
                </span>
                <span style={{ background: '#e2e8f0', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
                  Deterministic
                </span>
              </div>

              {/* Data Flow */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <div style={{ flex: 1, background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>Input 1</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>Data (x)</div>
                  </div>
                  <div style={{ flex: 1, background: '#f5f3ff', border: '1.5px solid #ddd6fe', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6d28d9', textTransform: 'uppercase' }}>Input 2</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#5b21b6', marginTop: '0.2rem' }}>Rules (Code)</div>
                  </div>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  <IconCpu size={16} /> Computer executes instructions line-by-line
                </div>

                <div style={{ background: '#f0f4fc', border: '2px solid #001f54', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0a3a82', textTransform: 'uppercase' }}>Output</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#001f54', marginTop: '0.2rem' }}>Answers / Results (y)</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', fontSize: '0.78rem', color: '#475569', lineHeight: '1.5' }}>
                <strong style={{ color: '#0f172a' }}>Limitation: </strong>
                Human must know the exact logic in advance. If edge cases or real-world noise are not anticipated, the software crashes or yields wrong answers.
              </div>
            </div>

            {/* MACHINE LEARNING CARD */}
            <div style={{
              background: '#f0f4fc',
              border: '2px solid #001f54',
              borderRadius: '16px',
              padding: '1.4rem',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,31,84,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Machine Learning
                </span>
                <span style={{ background: '#001f54', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
                  Data-Driven
                </span>
              </div>

              {/* Data Flow */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <div style={{ flex: 1, background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>Observation</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>Data (x)</div>
                  </div>
                  <div style={{ flex: 1, background: '#e0f2fe', border: '1.5px solid #bae6fd', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase' }}>Ground Truth</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#075985', marginTop: '0.2rem' }}>Answers (y)</div>
                  </div>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #001f54',
                  borderRadius: '10px',
                  padding: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#001f54',
                  fontSize: '0.8rem',
                  fontWeight: 800
                }}>
                  <IconSparkles size={16} /> ML Optimizer minimizes error across data
                </div>

                <div style={{ background: '#ffffff', border: '2px solid #0a3a82', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase' }}>Synthesized Output</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#001f54', marginTop: '0.2rem' }}>Rules / Model Function f(x)</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #c2d4f2', borderRadius: '10px', padding: '0.85rem', fontSize: '0.78rem', color: '#001f54', lineHeight: '1.5' }}>
                <strong style={{ color: '#001f54' }}>Superpower: </strong>
                The computer infers mathematical relationships automatically. Once synthesized, passing brand new input x computes accurate predictions without hardcoded heuristics.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: MITCHELL E-T-P FRAMEWORK ─── */}
      {activeTab === 1 && (
        <div>
          {/* Scenario Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {etpScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  border: `2px solid ${selectedScenario === s.id ? '#001f54' : '#e2e8f0'}`,
                  background: selectedScenario === s.id ? '#f0f4fc' : '#ffffff',
                  color: selectedScenario === s.id ? '#001f54' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: selectedScenario === s.id ? '0 4px 12px rgba(0,31,84,0.1)' : 'none',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.badgeColor }} />
                {s.title}
              </button>
            ))}
          </div>

          {/* Three Pillars: T, E, P */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            
            {/* Task T */}
            <div style={{
              background: '#eff6ff',
              border: '1.5px solid #bfdbfe',
              borderRadius: '14px',
              padding: '1.25rem',
              boxShadow: '0 4px 12px rgba(2,132,199,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#0284c7', color: '#ffffff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>
                  T
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0369a1', textTransform: 'uppercase' }}>
                  Class of Tasks
                </span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.4rem' }}>
                What action is the model performing?
              </div>
              <p style={{ fontSize: '0.78rem', color: '#1e40af', lineHeight: '1.5', margin: 0 }}>
                {currentScenario.task}
              </p>
            </div>

            {/* Experience E */}
            <div style={{
              background: '#f5f3ff',
              border: '1.5px solid #ddd6fe',
              borderRadius: '14px',
              padding: '1.25rem',
              boxShadow: '0 4px 12px rgba(124,58,237,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#7c3aed', color: '#ffffff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>
                  E
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#6d28d9', textTransform: 'uppercase' }}>
                  Training Experience
                </span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#4c1d95', marginBottom: '0.4rem' }}>
                What historical data does it ingest?
              </div>
              <p style={{ fontSize: '0.78rem', color: '#5b21b6', lineHeight: '1.5', margin: 0 }}>
                {currentScenario.experience}
              </p>
            </div>

            {/* Performance P */}
            <div style={{
              background: '#f0f4fc',
              border: '1.5px solid #c2d4f2',
              borderRadius: '14px',
              padding: '1.25rem',
              boxShadow: '0 4px 12px rgba(0,31,84,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#001f54', color: '#ffffff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>
                  P
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase' }}>
                  Performance Metric
                </span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#001f54', marginBottom: '0.4rem' }}>
                How is improvement mathematically proven?
              </div>
              <p style={{ fontSize: '0.78rem', color: '#0a3a82', lineHeight: '1.5', margin: 0 }}>
                {currentScenario.performance}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 2: LIVE RULE DISCOVERY SIMULATOR ─── */}
      {activeTab === 2 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            
            {/* SVG Visual Plane */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #c2d4f2',
              borderRadius: '16px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#64748b', marginBottom: '0.5rem' }}>
                <span>Coordinate Plane: Actual vs Predicted</span>
                <span style={{ color: '#001f54' }}>Target: y = 2x + 1</span>
              </div>

              <svg width="280" height="180" viewBox="0 0 280 180" style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                {/* Grid Lines */}
                <line x1="35" y1="155" x2="260" y2="155" stroke="#94a3b8" strokeWidth="2" />
                <line x1="35" y1="20" x2="35" y2="155" stroke="#94a3b8" strokeWidth="2" />

                {/* Grid axis labels */}
                <text x="245" y="172" fontSize="10" fill="#64748b" fontWeight="bold">x</text>
                <text x="18" y="30" fontSize="10" fill="#64748b" fontWeight="bold">y</text>

                {/* Candidate Line */}
                <line
                  x1={mapX(0)}
                  y1={mapY(curStep.w * 0 + curStep.b)}
                  x2={mapX(5)}
                  y2={mapY(curStep.w * 5 + curStep.b)}
                  stroke={curStep.lossColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Error Residual Dashes & Data Points */}
                {rawPoints.map((pt, pIdx) => {
                  const predY = curStep.w * pt.x + curStep.b;
                  return (
                    <g key={pIdx}>
                      {/* Residual line */}
                      <line
                        x1={mapX(pt.x)}
                        y1={mapY(pt.y)}
                        x2={mapX(pt.x)}
                        y2={mapY(predY)}
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      {/* Point */}
                      <circle cx={mapX(pt.x)} cy={mapY(pt.y)} r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  );
                })}
              </svg>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.6rem', fontSize: '0.72rem', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#0284c7' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0284c7' }} /> Training Points
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: curStep.lossColor }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: curStep.lossColor }} /> Learned Line
                </span>
              </div>
            </div>

            {/* Stepper Controls & Feedback */}
            <div>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                {learningStepsData.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLearningStep(idx)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${learningStep === idx ? '#001f54' : '#e2e8f0'}`,
                      background: learningStep === idx ? '#f0f4fc' : '#ffffff',
                      color: learningStep === idx ? '#001f54' : '#64748b',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {s.epoch}
                  </button>
                ))}
              </div>

              <div style={{ background: '#f8fafc', border: '1.5px solid #c2d4f2', borderRadius: '14px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    {curStep.title}
                  </span>
                  <span style={{ background: '#ffffff', color: curStep.lossColor, border: `1.5px solid ${curStep.lossColor}`, padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                    MSE Loss: {curStep.loss}
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 1rem', lineHeight: '1.45' }}>
                  {curStep.desc}
                </p>

                {/* Progress bar of loss */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 700, color: '#64748b', marginBottom: '0.3rem' }}>
                    <span>Model Error Residual</span>
                    <span>{curStep.lossPercent}%</span>
                  </div>
                  <div style={{ height: 8, width: '100%', background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${curStep.lossPercent}%`, background: curStep.lossColor, transition: 'width 0.4s ease' }} />
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Derived Rule:</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', fontFamily: 'Consolas, monospace' }}>
                    {curStep.formula}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

// ─── CONCENTRIC AI VS ML VS DEEP LEARNING DIAGRAM (MATCHING USER IMAGE) ────
const AiMlDlHierarchyDiagram = () => {
  const [selectedLayer, setSelectedLayer] = useState('dl');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDecisionTask, setSelectedDecisionTask] = useState('tabular');

  const layerData = {
    ai: {
      id: 'ai',
      name: 'Artificial Intelligence (AI)',
      short: 'AI',
      color: '#2563eb',
      lightBg: '#eff6ff',
      borderColor: '#93c5fd',
      subtitle: 'The Encompassing Universe (Founded 1956)',
      scope: 'Any computational system, program, or hardware engineered to simulate human cognitive functions, reasoning, perception, or decision-making.',
      corePhilosophy: 'Simulating human intelligence via both rule-based heuristics and statistical data learning.',
      algorithms: ['Symbolic Reasoning', 'Expert Systems (IF-THEN)', 'A* Pathfinding Search', 'Constraint Satisfaction', 'Minimax & Game Trees'],
      dataProfile: 'Can operate with zero data (using hand-crafted logic) or massive data.',
      computeProfile: 'Minimal CPU to massive supercomputers depending on implementation.',
      milestones: 'IBM Deep Blue (1997), MYCIN Expert System (1980s), Roomba Path Planning.'
    },
    ml: {
      id: 'ml',
      name: 'Machine Learning (ML)',
      short: 'ML',
      color: '#059669',
      lightBg: '#ecfdf5',
      borderColor: '#6ee7b7',
      subtitle: 'The Statistical Engine (A Subset of AI)',
      scope: 'Algorithms that build mathematical models from training data to make predictions or decisions without being explicitly hardcoded.',
      corePhilosophy: 'Extracting statistical patterns from structured tabular feature matrices (Rows x Columns).',
      algorithms: ['Linear & Logistic Regression', 'Random Forest', 'Gradient Boosting (XGBoost)', 'Support Vector Machines (SVM)', 'K-Means Clustering'],
      dataProfile: 'Thrives on thousands to hundreds of thousands of structured tabular rows.',
      computeProfile: 'Fast training on standard CPUs; highly memory efficient.',
      milestones: 'Credit Card Fraud Scoring, Email Spam Filters, Netflix Collaborative Filtering.'
    },
    dl: {
      id: 'dl',
      name: 'Deep Learning (DL)',
      short: 'DL',
      color: '#7c3aed',
      lightBg: '#f5f3ff',
      borderColor: '#c4b5fd',
      subtitle: 'Multi-Layer Neural Networks (A Subset of ML)',
      scope: 'Artificial neural networks with deep stacked hidden layers capable of end-to-end representation learning directly from raw unstructured data.',
      corePhilosophy: 'Automatically extracting hierarchical representations from raw pixels, audio, and tokens without manual feature engineering.',
      algorithms: ['Convolutional Neural Networks (CNN)', 'Transformers & Self-Attention', 'Recurrent Neural Networks (LSTM)', 'Diffusion Models', 'Large Language Models (LLMs)'],
      dataProfile: 'Requires massive unstructured datasets (millions of images/documents) to converge.',
      computeProfile: 'Demands specialized GPU / TPU clusters for matrix multiplication.',
      milestones: 'AlexNet (2012), AlphaFold (2020), ChatGPT / GPT-4 (2023), Tesla FSD.'
    }
  };

  const curLayer = layerData[selectedLayer];

  const decisionTasks = [
    {
      id: 'tabular',
      title: 'Bank Loan Credit Scoring',
      type: 'Traditional ML (XGBoost / Random Forest)',
      reason: 'Structured tabular spreadsheet data (Credit score, income, debt ratio). Traditional ML trains in seconds, prevents overfitting, and offers regulatory compliance transparency.',
      bestChoice: 'ml',
      scores: { accuracy: '98%', speed: 'Instant (1.2s)', compute: 'Low (1x CPU)', interpret: 'High (Feature SHAP)' }
    },
    {
      id: 'vision',
      title: 'Autonomous Car Object Detection',
      type: 'Deep Learning (YOLO / Vision Transformers)',
      reason: 'Raw 4K camera streams and lidar point clouds cannot be manually engineered with if-else rules. Deep neural networks extract hierarchical spatial features directly from pixels.',
      bestChoice: 'dl',
      scores: { accuracy: '99.4%', speed: '60 FPS real-time', compute: 'High (4x GPU)', interpret: 'Low (Black-box)' }
    },
    {
      id: 'chess',
      title: 'Sudoku / Route Optimization',
      type: 'Classical AI (A* Search / Constraint Satisfaction)',
      reason: 'Mathematical deterministic puzzle with strict formal rules. Search algorithms calculate the provably optimal solution with zero training data or statistical guesswork.',
      bestChoice: 'ai',
      scores: { accuracy: '100% (Provable)', speed: 'Milliseconds', compute: 'Minimal CPU', interpret: 'Total (Logic Trace)' }
    },
    {
      id: 'nlp',
      title: 'Multilingual Conversational Agent',
      type: 'Deep Learning (Large Language Model Transformers)',
      reason: 'Human language has billions of contextual permutations. Multi-head self-attention models capture semantic relationships across vast text corpora.',
      bestChoice: 'dl',
      scores: { accuracy: 'State-of-the-Art', speed: '50ms token stream', compute: 'Very High (Cluster)', interpret: 'Low (Attention maps)' }
    }
  ];

  const curDecision = decisionTasks.find(d => d.id === selectedDecisionTask) || decisionTasks[0];

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              TAXONOMY & ARCHITECTURE
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              AI vs Machine Learning vs Deep Learning
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Click the concentric rings below to explore each layer in the nested artificial intelligence hierarchy.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2'
        }}>
          {[
            { label: 'Concentric Hierarchy', tab: 0 },
            { label: 'Feature Engineering vs DL', tab: 1 },
            { label: 'Domain Decision Matrix', tab: 2 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: CONCENTRIC CIRCLES (EXACTLY MATCHING USER'S IMAGE) ─── */}
      {activeTab === 0 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            
            {/* SVG Concentric Diagram Box with Subtle Gradient Background */}
            <div style={{
              background: 'linear-gradient(135deg, #e0e7ff 0%, #ecfdf5 50%, #f5f3ff 100%)',
              border: '1.5px solid #c2d4f2',
              borderRadius: '20px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', marginBottom: '0.75rem' }}>
                CLICK ANY RING TO INSPECT:
              </div>

              {/* Exact Nested SVG Circle Component */}
              <svg width="320" height="320" viewBox="0 0 320 320" style={{ cursor: 'pointer' }}>
                
                {/* 1. OUTER CIRCLE: Artificial Intelligence (AI) */}
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  fill="#3b82f6"
                  stroke={selectedLayer === 'ai' ? '#ffffff' : '#2563eb'}
                  strokeWidth={selectedLayer === 'ai' ? '4' : '1'}
                  filter={selectedLayer === 'ai' ? 'drop-shadow(0 0 12px rgba(59,130,246,0.8))' : 'none'}
                  onClick={() => setSelectedLayer('ai')}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <text
                  x="160"
                  y="52"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="15"
                  fontWeight="900"
                  onClick={() => setSelectedLayer('ai')}
                  style={{ userSelect: 'none' }}
                >
                  Artificial
                </text>
                <text
                  x="160"
                  y="72"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="15"
                  fontWeight="900"
                  onClick={() => setSelectedLayer('ai')}
                  style={{ userSelect: 'none' }}
                >
                  Intelligence (AI)
                </text>

                {/* 2. MIDDLE CIRCLE: Machine Learning (ML) */}
                <circle
                  cx="160"
                  cy="188"
                  r="105"
                  fill="#10b981"
                  stroke={selectedLayer === 'ml' ? '#ffffff' : '#059669'}
                  strokeWidth={selectedLayer === 'ml' ? '4' : '1'}
                  filter={selectedLayer === 'ml' ? 'drop-shadow(0 0 12px rgba(16,185,129,0.8))' : 'none'}
                  onClick={() => setSelectedLayer('ml')}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <text
                  x="160"
                  y="126"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="900"
                  onClick={() => setSelectedLayer('ml')}
                  style={{ userSelect: 'none' }}
                >
                  Machine
                </text>
                <text
                  x="160"
                  y="144"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="900"
                  onClick={() => setSelectedLayer('ml')}
                  style={{ userSelect: 'none' }}
                >
                  Learning (ML)
                </text>

                {/* 3. INNER CIRCLE: Deep Learning (DL) */}
                <circle
                  cx="178"
                  cy="224"
                  r="56"
                  fill="#8b5cf6"
                  stroke={selectedLayer === 'dl' ? '#ffffff' : '#7c3aed'}
                  strokeWidth={selectedLayer === 'dl' ? '4' : '1'}
                  filter={selectedLayer === 'dl' ? 'drop-shadow(0 0 12px rgba(139,92,246,0.8))' : 'none'}
                  onClick={() => setSelectedLayer('dl')}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <text
                  x="178"
                  y="218"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="900"
                  onClick={() => setSelectedLayer('dl')}
                  style={{ userSelect: 'none' }}
                >
                  Deep
                </text>
                <text
                  x="178"
                  y="235"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="900"
                  onClick={() => setSelectedLayer('dl')}
                  style={{ userSelect: 'none' }}
                >
                  Learning
                </text>
                <text
                  x="178"
                  y="251"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="900"
                  onClick={() => setSelectedLayer('dl')}
                  style={{ userSelect: 'none' }}
                >
                  (DL)
                </text>
              </svg>

              {/* Quick layer picker pills */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.85rem' }}>
                {[
                  { id: 'ai', label: 'AI (Outer)', color: '#2563eb' },
                  { id: 'ml', label: 'ML (Middle)', color: '#059669' },
                  { id: 'dl', label: 'DL (Inner)', color: '#7c3aed' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedLayer(p.id)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      border: `1.5px solid ${selectedLayer === p.id ? p.color : '#cbd5e1'}`,
                      background: selectedLayer === p.id ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      color: selectedLayer === p.id ? p.color : '#475569',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Inspector Card */}
            <div style={{
              background: curLayer.lightBg,
              border: `2px solid ${curLayer.borderColor}`,
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 900, color: curLayer.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {curLayer.subtitle}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '0.2rem 0 0' }}>
                    {curLayer.name}
                  </h4>
                </div>
                <span style={{
                  background: curLayer.color,
                  color: '#ffffff',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 900
                }}>
                  {curLayer.short}
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: '1.55', margin: '0 0 1rem' }}>
                {curLayer.scope}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.78rem' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>Core Mechanism:</div>
                  <div style={{ color: '#475569' }}>{curLayer.corePhilosophy}</div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>Key Representative Algorithms:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {curLayer.algorithms.map((alg, aIdx) => (
                      <span key={aIdx} style={{ background: curLayer.lightBg, border: `1px solid ${curLayer.borderColor}`, color: curLayer.color, padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {alg}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>Historical Breakthroughs:</div>
                  <div style={{ color: '#0f172a', fontWeight: 600 }}>{curLayer.milestones}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: FEATURE ENGINEERING VS REPRESENTATION LEARNING ─── */}
      {activeTab === 1 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            {/* Traditional ML Pipeline */}
            <div style={{ background: '#ecfdf5', border: '2px solid #a7f3d0', borderRadius: '16px', padding: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#065f46', textTransform: 'uppercase' }}>
                  1. Traditional Machine Learning Flow
                </span>
                <span style={{ background: '#059669', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
                  Manual Features
                </span>
              </div>

              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ background: '#ffffff', border: '1.5px solid #a7f3d0', borderRadius: '8px', padding: '0.65rem', textAlign: 'center', fontWeight: 800, color: '#065f46', fontSize: '0.8rem' }}>
                  Input (Raw Vehicle Image)
                </div>
                <div style={{ textAlign: 'center', color: '#059669', fontSize: '0.8rem' }}>↓ Handcrafted by Data Scientist ↓</div>
                <div style={{ background: '#ffffff', border: '2px dashed #059669', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>Human Feature Extraction</div>
                  <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 700, marginTop: '0.2rem' }}>
                    Calculate circular wheel contours, edge gradients, vehicle length ratio
                  </div>
                </div>
                <div style={{ textAlign: 'center', color: '#059669', fontSize: '0.8rem' }}>↓ Features fed into classifier ↓</div>
                <div style={{ background: '#ffffff', border: '1.5px solid #a7f3d0', borderRadius: '8px', padding: '0.65rem', textAlign: 'center', fontWeight: 800, color: '#065f46', fontSize: '0.8rem' }}>
                  Classifier Model (Random Forest / SVM) → Output: "Car"
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '0.75rem', fontSize: '0.75rem', color: '#065f46', lineHeight: '1.5' }}>
                <strong>Bottleneck: </strong> If human domain experts fail to engineer the exact edge filters, the model cannot distinguish complex visual scenes.
              </div>
            </div>

            {/* Deep Learning Pipeline */}
            <div style={{ background: '#f5f3ff', border: '2px solid #ddd6fe', borderRadius: '16px', padding: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#6d28d9', textTransform: 'uppercase' }}>
                  2. Deep Learning Flow
                </span>
                <span style={{ background: '#7c3aed', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
                  End-to-End Neural
                </span>
              </div>

              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ background: '#ffffff', border: '1.5px solid #ddd6fe', borderRadius: '8px', padding: '0.65rem', textAlign: 'center', fontWeight: 800, color: '#6d28d9', fontSize: '0.8rem' }}>
                  Input (Raw Unstructured Image)
                </div>
                <div style={{ textAlign: 'center', color: '#7c3aed', fontSize: '0.8rem' }}>↓ Automated Multi-Layer Representation Learning ↓</div>
                <div style={{ background: '#ffffff', border: '1.5px solid #8b5cf6', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '0.72rem', background: '#f5f3ff', padding: '0.3rem', borderRadius: '4px', color: '#4c1d95', fontWeight: 700 }}>
                    • Layer 1-4: Detects low-level diagonal edges & color shifts
                  </div>
                  <div style={{ fontSize: '0.72rem', background: '#ede9fe', padding: '0.3rem', borderRadius: '4px', color: '#4c1d95', fontWeight: 700 }}>
                    • Layer 5-16: Combines edges into wheels, windows, mirrors
                  </div>
                  <div style={{ fontSize: '0.72rem', background: '#ddd6fe', padding: '0.3rem', borderRadius: '4px', color: '#4c1d95', fontWeight: 800 }}>
                    • Layer 17+: Assembles complete vehicle concept
                  </div>
                </div>
                <div style={{ textAlign: 'center', color: '#7c3aed', fontSize: '0.8rem' }}>↓ Neural Classification Head ↓</div>
                <div style={{ background: '#ffffff', border: '1.5px solid #ddd6fe', borderRadius: '8px', padding: '0.65rem', textAlign: 'center', fontWeight: 800, color: '#6d28d9', fontSize: '0.8rem' }}>
                  Softmax Probability Output: "Sedan" (99.8%)
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #ddd6fe', borderRadius: '8px', padding: '0.75rem', fontSize: '0.75rem', color: '#5b21b6', lineHeight: '1.5' }}>
                <strong>Advantage: </strong> No manual feature engineering required. The neural network learns directly from raw pixels given sufficient data.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 2: DOMAIN DECISION MATRIX ─── */}
      {activeTab === 2 && (
        <div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem' }}>
            Select an industry problem to see which tier in the AI hierarchy is the optimal engineering choice:
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {decisionTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => setSelectedDecisionTask(task.id)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  border: `1.5px solid ${selectedDecisionTask === task.id ? '#001f54' : '#e2e8f0'}`,
                  background: selectedDecisionTask === task.id ? '#f0f4fc' : '#ffffff',
                  color: selectedDecisionTask === task.id ? '#001f54' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {task.title}
              </button>
            ))}
          </div>

          {/* Decision Verdict Card */}
          <div style={{
            background: '#f8fafc',
            border: '1.5px solid #c2d4f2',
            borderRadius: '16px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Recommended Technology Tier:</div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: '0.2rem 0 0' }}>
                  {curDecision.type}
                </h4>
              </div>
              <span style={{
                background: curDecision.bestChoice === 'ml' ? '#059669' : curDecision.bestChoice === 'dl' ? '#7c3aed' : '#2563eb',
                color: '#ffffff',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 900
              }}>
                {curDecision.bestChoice.toUpperCase()} SELECTION
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: '1.55', margin: '0 0 1.25rem' }}>
              {curDecision.reason}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Accuracy Potential:</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>{curDecision.scores.accuracy}</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Training Speed:</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>{curDecision.scores.speed}</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Compute Budget:</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>{curDecision.scores.compute}</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Interpretability:</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>{curDecision.scores.interpret}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SVG VECTOR ICONS FOR SUPERVISED VS UNSUPERVISED DIAGRAM ────────────────
const IconFruitFish = ({ size = 26, color = '#0284c7' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6Z" />
    <path d="M18 12c0-1.66-1.34-3-3-3" />
    <path d="M2 16l4.5-4L2 8c1.5 2.5 1.5 5.5 0 8Z" />
    <circle cx="17" cy="10.5" r="0.75" fill={color} />
  </svg>
);

const IconFruitPear = ({ size = 26, color = '#8b5cf6' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v3" />
    <path d="M10 5c-2 2-3 4-3 7 0 4 2.2 7 5 7s5-3 5-7c0-3-1-5-3-7-1.5-1.5-2.5-1.5-4 0Z" />
    <path d="M12 2c1.5 0 3 .5 3 1.5" />
  </svg>
);

const IconFruitApple = ({ size = 26, color = '#10b981' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 2-1 3-2 4" />
    <path d="M12 2c1 1 2.5 1 3.5 0" />
    <path d="M12 6c-3-2.5-7-1.5-7 3 0 5.5 3.5 11 7 11s7-5.5 7-11c0-4.5-4-5.5-7-3Z" />
    <path d="M12 18v2" />
  </svg>
);

// ─── SUPERVISED VS UNSUPERVISED LEARNING DIAGRAM (MATCHING USER IMAGE) ─────
const SupervisedVsUnsupervisedDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState('churn');

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2200);
  };

  const scenarios = [
    {
      id: 'churn',
      title: 'Customer Churn vs Market Segments',
      supervised: {
        task: 'Predict if a specific user will cancel their subscription this month (Yes/No).',
        data: 'Historical table of 100,000 customers with labeled status: "Churned" (1) vs "Retained" (0).',
        algorithm: 'Random Forest / XGBoost Classifier',
        metric: 'ROC-AUC & Recall'
      },
      unsupervised: {
        task: 'Discover 4 natural customer personas based on browsing frequency and spend.',
        data: 'Raw log features with zero labels (Average session duration, purchase total, pages viewed).',
        algorithm: 'K-Means / DBSCAN Clustering',
        metric: 'Silhouette Score & Elbow Inertia'
      }
    },
    {
      id: 'health',
      title: 'Medical Diagnostics vs Cell Discovery',
      supervised: {
        task: 'Classify whether a lung scan contains a Malignant or Benign biopsy-verified nodule.',
        data: '40,000 CT scans accompanied by verified pathologist biopsy labels.',
        algorithm: 'Supervised Convolutional Neural Network (ResNet)',
        metric: 'Sensitivity (>99.5%)'
      },
      unsupervised: {
        task: 'Cluster 500,000 single-cell RNA sequences to discover previously unknown rare cell subtypes.',
        data: 'Gene expression matrices with zero pre-existing cell classification labels.',
        algorithm: 'UMAP / t-SNE Dimensionality Reduction + Louvain Clustering',
        metric: 'Biological Marker Validation'
      }
    },
    {
      id: 'finance',
      title: 'Credit Approval vs Anomaly Fraud',
      supervised: {
        task: 'Predict the interest rate and default probability for a new loan applicant.',
        data: 'Past 10 years of repaid vs defaulted loan applications with credit scores.',
        algorithm: 'Gradient Boosted Trees (LightGBM)',
        metric: 'Mean Squared Error & F1 Score'
      },
      unsupervised: {
        task: 'Detect novel zero-day credit card transaction anomalies with no prior fraud signature.',
        data: 'Unlabeled real-time payment stream (Amount, merchant category, time of day).',
        algorithm: 'Isolation Forest / One-Class SVM',
        metric: 'Outlier Density Score'
      }
    }
  ];

  const curScenario = scenarios.find(s => s.id === activeScenario) || scenarios[0];

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              DATA PIPELINE ARCHITECTURE
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              Supervised vs. Unsupervised Learning
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Interactive comparison of learning with ground-truth supervisor labels vs autonomous unsupervised pattern discovery.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2'
        }}>
          {[
            { label: 'Dual Pipeline Diagram', tab: 0 },
            { label: 'Real-World Scenarios', tab: 1 },
            { label: 'Paradigm Comparison', tab: 2 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: EXACT REPLICATION OF USER'S ILLUSTRATION ─── */}
      {activeTab === 0 && (
        <div>
          {/* Action Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700 }}>
              Observe how the presence of the <strong>Supervisor</strong> guides classification vs clustering.
            </span>
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              style={{
                background: isSimulating ? '#94a3b8' : '#001f54',
                color: '#ffffff',
                border: 'none',
                padding: '0.5rem 1.1rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: isSimulating ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(0,31,84,0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              <IconSparkles size={16} /> {isSimulating ? 'Processing Dataflow...' : 'Simulate Pipeline Dataflow'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* ─── 1. SUPERVISED LEARNING PIPELINE ─── */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #c2d4f2',
              borderRadius: '18px',
              padding: '1.5rem',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#001f54',
                  letterSpacing: '0.3px',
                  background: '#f0f4fc',
                  padding: '0.35rem 1.25rem',
                  borderRadius: '20px',
                  border: '1.5px solid #c2d4f2'
                }}>
                  Supervised learning
                </span>
              </div>

              {/* Grid Layout: Input -> Model -> Output */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 1.2fr) auto minmax(180px, 2fr) auto minmax(140px, 1.4fr)',
                alignItems: 'center',
                gap: '1rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem'
              }}>
                
                {/* 1A. Input Data (Mixed) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', marginBottom: '0.6rem' }}>
                    input data
                  </span>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    background: '#ffffff',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <IconFruitFish size={24} color="#0284c7" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                    <IconFruitFish size={24} color="#0284c7" />
                    <IconFruitApple size={24} color="#10b981" />
                    <IconFruitApple size={24} color="#10b981" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                    <IconFruitFish size={24} color="#0284c7" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: 900 }}>→</div>

                {/* 1B. Model / Algorithm (Neural Network Canvas) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="220" height="130" viewBox="0 0 220 130" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    {/* Inter-layer connection lines */}
                    {[25, 55, 85, 115].map((y1, i) =>
                      [25, 55, 85, 115].map((y2, j) => (
                        <line key={`c1-${i}-${j}`} x1="35" y1={y1} x2="85" y2={y2} stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="2 2" />
                      ))
                    )}
                    {[25, 55, 85, 115].map((y1, i) =>
                      [25, 55, 85, 115].map((y2, j) => (
                        <line key={`c2-${i}-${j}`} x1="85" y1={y1} x2="135" y2={y2} stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="2 2" />
                      ))
                    )}
                    {[25, 55, 85, 115].map((y1, i) =>
                      [25, 55, 85, 115].map((y2, j) => (
                        <line key={`c3-${i}-${j}`} x1="135" y1={y1} x2="185" y2={y2} stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="2 2" />
                      ))
                    )}

                    {/* Nodes Column 1 (Light Lavender) */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`n1-${idx}`} cx="35" cy={y} r="7" fill={simStep === 1 ? '#38bdf8' : '#cbd5e1'} />
                    ))}
                    {/* Nodes Column 2 */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`n2-${idx}`} cx="85" cy={y} r="7" fill={simStep === 2 ? '#0284c7' : '#94a3b8'} />
                    ))}
                    {/* Nodes Column 3 */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`n3-${idx}`} cx="135" cy={y} r="7" fill={simStep === 2 ? '#001f54' : '#64748b'} />
                    ))}
                    {/* Nodes Column 4 (Deep Slate) */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`n4-${idx}`} cx="185" cy={y} r="7" fill={simStep === 3 ? '#001f54' : '#334155'} />
                    ))}
                  </svg>
                  <span style={{ fontSize: '0.72rem', fontStyle: 'italic', fontWeight: 800, color: '#64748b', marginTop: '0.35rem' }}>
                    model/algorithm
                  </span>
                </div>

                {/* Branching Output Arrow */}
                <div style={{ color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>→</div>

                {/* 1C. Predicted Output (Sorted by Class) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', marginBottom: '0.6rem' }}>
                    Predicted output
                  </span>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    background: '#ffffff',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #c2d4f2'
                  }}>
                    {/* Pears Row */}
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', background: '#f5f3ff', padding: '0.2rem 0.45rem', borderRadius: '6px' }}>
                      <IconFruitPear size={18} color="#8b5cf6" />
                      <IconFruitPear size={18} color="#8b5cf6" />
                      <IconFruitPear size={18} color="#8b5cf6" />
                      <IconFruitPear size={18} color="#8b5cf6" />
                    </div>
                    {/* Fish Row */}
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', background: '#eff6ff', padding: '0.2rem 0.45rem', borderRadius: '6px' }}>
                      <IconFruitFish size={18} color="#0284c7" />
                      <IconFruitFish size={18} color="#0284c7" />
                      <IconFruitFish size={18} color="#0284c7" />
                    </div>
                    {/* Apple Row */}
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', background: '#ecfdf5', padding: '0.2rem 0.45rem', borderRadius: '6px' }}>
                      <IconFruitApple size={18} color="#10b981" />
                      <IconFruitApple size={18} color="#10b981" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Supervisor Annotation Guide */}
              <div style={{
                marginTop: '1.25rem',
                background: '#ffffff',
                border: '1.5px dashed #001f54',
                borderRadius: '12px',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontStyle: 'italic', fontWeight: 800, color: '#0284c7' }}>Fish</span>
                    <IconFruitFish size={22} color="#0284c7" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontStyle: 'italic', fontWeight: 800, color: '#8b5cf6' }}>Pear</span>
                    <IconFruitPear size={22} color="#8b5cf6" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontStyle: 'italic', fontWeight: 800, color: '#10b981' }}>Apple</span>
                    <IconFruitApple size={22} color="#10b981" />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#001f54', fontWeight: 800 }}>
                  <span>↑ labeled data (by supervisor) fed during training</span>
                </div>
              </div>
            </div>

            {/* ─── 2. UNSUPERVISED LEARNING PIPELINE ─── */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #c2d4f2',
              borderRadius: '18px',
              padding: '1.5rem',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#001f54',
                  letterSpacing: '0.3px',
                  background: '#f0f4fc',
                  padding: '0.35rem 1.25rem',
                  borderRadius: '20px',
                  border: '1.5px solid #c2d4f2'
                }}>
                  Unsupervised learning
                </span>
              </div>

              {/* Grid Layout: Input -> Model -> Output */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 1.2fr) auto minmax(180px, 2fr) auto minmax(140px, 1.4fr)',
                alignItems: 'center',
                gap: '1rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem'
              }}>
                
                {/* 2A. Unlabeled Input Data */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', marginBottom: '0.6rem' }}>
                    unlabeled input data
                  </span>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    background: '#ffffff',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <IconFruitFish size={24} color="#0284c7" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                    <IconFruitFish size={24} color="#0284c7" />
                    <IconFruitApple size={24} color="#10b981" />
                    <IconFruitApple size={24} color="#10b981" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                    <IconFruitFish size={24} color="#0284c7" />
                    <IconFruitPear size={24} color="#8b5cf6" />
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: 900 }}>→</div>

                {/* 2B. Model / Algorithm (Clustering Network) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="220" height="130" viewBox="0 0 220 130" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    {/* Inter-layer connection lines */}
                    {[25, 55, 85, 115].map((y1, i) =>
                      [25, 55, 85, 115].map((y2, j) => (
                        <line key={`uc1-${i}-${j}`} x1="35" y1={y1} x2="85" y2={y2} stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="2 2" />
                      ))
                    )}
                    {[25, 55, 85, 115].map((y1, i) =>
                      [25, 55, 85, 115].map((y2, j) => (
                        <line key={`uc2-${i}-${j}`} x1="85" y1={y1} x2="135" y2={y2} stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="2 2" />
                      ))
                    )}
                    {[25, 55, 85, 115].map((y1, i) =>
                      [25, 55, 85, 115].map((y2, j) => (
                        <line key={`uc3-${i}-${j}`} x1="135" y1={y1} x2="185" y2={y2} stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="2 2" />
                      ))
                    )}

                    {/* Nodes Column 1 */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`un1-${idx}`} cx="35" cy={y} r="7" fill={simStep === 1 ? '#a855f7' : '#cbd5e1'} />
                    ))}
                    {/* Nodes Column 2 */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`un2-${idx}`} cx="85" cy={y} r="7" fill={simStep === 2 ? '#7c3aed' : '#94a3b8'} />
                    ))}
                    {/* Nodes Column 3 */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`un3-${idx}`} cx="135" cy={y} r="7" fill={simStep === 2 ? '#5b21b6' : '#64748b'} />
                    ))}
                    {/* Nodes Column 4 */}
                    {[25, 55, 85, 115].map((y, idx) => (
                      <circle key={`un4-${idx}`} cx="185" cy={y} r="7" fill={simStep === 3 ? '#4c1d95' : '#334155'} />
                    ))}
                  </svg>
                  <span style={{ fontSize: '0.72rem', fontStyle: 'italic', fontWeight: 800, color: '#64748b', marginTop: '0.35rem' }}>
                    model/algorithm
                  </span>
                </div>

                {/* Branching Output Arrow */}
                <div style={{ color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>→</div>

                {/* 2C. Discovered Clustered Output */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', marginBottom: '0.6rem' }}>
                    output (discovered clusters)
                  </span>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    background: '#ffffff',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #c2d4f2'
                  }}>
                    {/* Cluster 1 (Pears) */}
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', background: '#f5f3ff', padding: '0.2rem 0.45rem', borderRadius: '6px' }}>
                      <IconFruitPear size={18} color="#8b5cf6" />
                      <IconFruitPear size={18} color="#8b5cf6" />
                      <IconFruitPear size={18} color="#8b5cf6" />
                      <IconFruitPear size={18} color="#8b5cf6" />
                    </div>
                    {/* Cluster 2 (Fish) */}
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', background: '#eff6ff', padding: '0.2rem 0.45rem', borderRadius: '6px' }}>
                      <IconFruitFish size={18} color="#0284c7" />
                      <IconFruitFish size={18} color="#0284c7" />
                      <IconFruitFish size={18} color="#0284c7" />
                    </div>
                    {/* Cluster 3 (Apples) */}
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', background: '#ecfdf5', padding: '0.2rem 0.45rem', borderRadius: '6px' }}>
                      <IconFruitApple size={18} color="#10b981" />
                      <IconFruitApple size={18} color="#10b981" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Unsupervised Note */}
              <div style={{
                marginTop: '1.25rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.75rem 1.25rem',
                fontSize: '0.78rem',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <IconSparkles size={16} style={{ color: '#001f54' }} />
                <span><strong>Key Observation: </strong> Notice there is NO supervisor arrow. The model discovered 3 natural clusters purely based on geometry and pixel shape similarities!</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: REAL-WORLD SCENARIOS ─── */}
      {activeTab === 1 && (
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenario(sc.id)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  border: `1.5px solid ${activeScenario === sc.id ? '#001f54' : '#e2e8f0'}`,
                  background: activeScenario === sc.id ? '#f0f4fc' : '#ffffff',
                  color: activeScenario === sc.id ? '#001f54' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {sc.title}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Supervised Formulation */}
            <div style={{ background: '#f0f4fc', border: '2px solid #001f54', borderRadius: '16px', padding: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase' }}>
                  Supervised Approach
                </span>
                <span style={{ background: '#001f54', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
                  With Labels (X, y)
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700, margin: '0 0 0.75rem' }}>
                {curScenario.supervised.task}
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #c2d4f2', borderRadius: '8px', padding: '0.75rem', fontSize: '0.78rem', marginBottom: '0.75rem', color: '#334155' }}>
                <strong>Training Data: </strong>{curScenario.supervised.data}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#001f54', fontWeight: 800 }}>
                <span>Algorithm: {curScenario.supervised.algorithm}</span>
                <span>Metric: {curScenario.supervised.metric}</span>
              </div>
            </div>

            {/* Unsupervised Formulation */}
            <div style={{ background: '#f5f3ff', border: '2px solid #7c3aed', borderRadius: '16px', padding: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#6d28d9', textTransform: 'uppercase' }}>
                  Unsupervised Approach
                </span>
                <span style={{ background: '#7c3aed', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
                  No Labels (X only)
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700, margin: '0 0 0.75rem' }}>
                {curScenario.unsupervised.task}
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #ddd6fe', borderRadius: '8px', padding: '0.75rem', fontSize: '0.78rem', marginBottom: '0.75rem', color: '#334155' }}>
                <strong>Training Data: </strong>{curScenario.unsupervised.data}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#6d28d9', fontWeight: 800 }}>
                <span>Algorithm: {curScenario.unsupervised.algorithm}</span>
                <span>Metric: {curScenario.unsupervised.metric}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: PARADIGM COMPARISON MATRIX ─── */}
      {activeTab === 2 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: '#f0f4fc', borderBottom: '2px solid #001f54', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem', color: '#001f54', fontWeight: 900 }}>Dimension</th>
                <th style={{ padding: '0.75rem', color: '#001f54', fontWeight: 900 }}>Supervised Learning</th>
                <th style={{ padding: '0.75rem', color: '#001f54', fontWeight: 900 }}>Unsupervised Learning</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Training Input</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Features paired with Target Labels: (X, y)</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Features only with NO Labels: (X)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Supervisor Feedback</td>
                <td style={{ padding: '0.75rem', color: '#059669', fontWeight: 700 }}>Direct error loss between y_pred and y_actual</td>
                <td style={{ padding: '0.75rem', color: '#dc2626', fontWeight: 700 }}>None (Self-supervised / distance-based)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Primary Tasks</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Classification (categories) & Regression (numbers)</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Clustering, Dimensionality Reduction, Anomaly Detection</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Popular Algorithms</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Linear/Logistic Regression, Random Forest, SVM, XGBoost</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>K-Means, Hierarchical, DBSCAN, PCA, Isolation Forest</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Data Annotation Cost</td>
                <td style={{ padding: '0.75rem', color: '#dc2626', fontWeight: 700 }}>High (Requires human annotators)</td>
                <td style={{ padding: '0.75rem', color: '#059669', fontWeight: 700 }}>Zero / Minimal (Ingests raw unannotated logs)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── REGRESSION VS CLASSIFICATION DIAGRAM (MATCHING USER IMAGE) ───────────
const RegressionVsClassificationDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Interactive classification test point
  const [testPoint, setTestPoint] = useState({ x: 120, y: 110, classType: 'A', label: 'Class A (Green)' });
  
  // Interactive regression slider
  const [sliderX, setSliderX] = useState(60);

  // Classification coordinates dataset (approx 35 points)
  const classPoints = [
    // Class A (Green - left of S-curve)
    { cx: 50, cy: 60, type: 'A' }, { cx: 70, cy: 80, type: 'A' }, { cx: 90, cy: 50, type: 'A' },
    { cx: 110, cy: 70, type: 'A' }, { cx: 60, cy: 110, type: 'A' }, { cx: 80, cy: 130, type: 'A' },
    { cx: 100, cy: 100, type: 'A' }, { cx: 120, cy: 85, type: 'A' }, { cx: 55, cy: 155, type: 'A' },
    { cx: 75, cy: 175, type: 'A' }, { cx: 95, cy: 150, type: 'A' }, { cx: 115, cy: 135, type: 'A' },
    { cx: 135, cy: 155, type: 'A' }, { cx: 110, cy: 180, type: 'A' }, { cx: 80, cy: 200, type: 'A' },
    { cx: 130, cy: 195, type: 'A' }, { cx: 150, cy: 175, type: 'A' },
    // Class B (Blue - right of S-curve)
    { cx: 160, cy: 45, type: 'B' }, { cx: 180, cy: 65, type: 'B' }, { cx: 200, cy: 50, type: 'B' },
    { cx: 170, cy: 85, type: 'B' }, { cx: 190, cy: 105, type: 'B' }, { cx: 210, cy: 80, type: 'B' },
    { cx: 175, cy: 130, type: 'B' }, { cx: 195, cy: 145, type: 'B' }, { cx: 215, cy: 125, type: 'B' },
    { cx: 165, cy: 165, type: 'B' }, { cx: 185, cy: 185, type: 'B' }, { cx: 205, cy: 170, type: 'B' },
    { cx: 170, cy: 205, type: 'B' }, { cx: 190, cy: 215, type: 'B' }, { cx: 210, cy: 200, type: 'B' }
  ];

  // Regression scatter cloud dataset (dense scatter cloud trending along y = 0.72x + 12)
  const regPoints = [
    // Lower band (x: 20-35)
    { x: 21, y: 8, col: '#10b981' }, { x: 22, y: 18, col: '#0284c7' }, { x: 23, y: 28, col: '#10b981' }, { x: 24, y: 38, col: '#0284c7' }, { x: 25, y: 14, col: '#10b981' },
    { x: 26, y: 24, col: '#0284c7' }, { x: 27, y: 48, col: '#10b981' }, { x: 28, y: 32, col: '#0284c7' }, { x: 29, y: 12, col: '#10b981' }, { x: 30, y: 22, col: '#0284c7' },
    { x: 31, y: 42, col: '#10b981' }, { x: 32, y: 52, col: '#0284c7' }, { x: 33, y: 36, col: '#10b981' }, { x: 34, y: 26, col: '#0284c7' }, { x: 35, y: 18, col: '#10b981' },
    // Middle-low band (x: 36-50)
    { x: 36, y: 34, col: '#0284c7' }, { x: 37, y: 44, col: '#10b981' }, { x: 38, y: 58, col: '#0284c7' }, { x: 39, y: 28, col: '#10b981' }, { x: 40, y: 48, col: '#0284c7' },
    { x: 41, y: 64, col: '#10b981' }, { x: 42, y: 38, col: '#0284c7' }, { x: 43, y: 52, col: '#10b981' }, { x: 44, y: 24, col: '#0284c7' }, { x: 45, y: 42, col: '#10b981' },
    { x: 46, y: 56, col: '#0284c7' }, { x: 47, y: 68, col: '#10b981' }, { x: 48, y: 36, col: '#0284c7' }, { x: 49, y: 50, col: '#10b981' }, { x: 50, y: 62, col: '#0284c7' },
    // Center band (x: 51-65)
    { x: 51, y: 42, col: '#10b981' }, { x: 52, y: 72, col: '#0284c7' }, { x: 53, y: 54, col: '#10b981' }, { x: 54, y: 66, col: '#0284c7' }, { x: 55, y: 38, col: '#10b981' },
    { x: 56, y: 48, col: '#0284c7' }, { x: 57, y: 58, col: '#10b981' }, { x: 58, y: 74, col: '#0284c7' }, { x: 59, y: 44, col: '#10b981' }, { x: 60, y: 60, col: '#0284c7' },
    { x: 61, y: 76, col: '#10b981' }, { x: 62, y: 50, col: '#0284c7' }, { x: 63, y: 68, col: '#10b981' }, { x: 64, y: 56, col: '#0284c7' }, { x: 65, y: 46, col: '#10b981' },
    // Middle-high band (x: 66-80)
    { x: 66, y: 64, col: '#0284c7' }, { x: 67, y: 78, col: '#10b981' }, { x: 68, y: 54, col: '#0284c7' }, { x: 69, y: 70, col: '#10b981' }, { x: 70, y: 84, col: '#0284c7' },
    { x: 71, y: 60, col: '#10b981' }, { x: 72, y: 74, col: '#0284c7' }, { x: 73, y: 52, col: '#10b981' }, { x: 74, y: 66, col: '#0284c7' }, { x: 75, y: 86, col: '#10b981' },
    { x: 76, y: 72, col: '#0284c7' }, { x: 77, y: 80, col: '#10b981' }, { x: 78, y: 58, col: '#0284c7' }, { x: 79, y: 76, col: '#10b981' }, { x: 80, y: 90, col: '#0284c7' },
    // Upper band (x: 81-100)
    { x: 81, y: 68, col: '#10b981' }, { x: 82, y: 82, col: '#0284c7' }, { x: 83, y: 94, col: '#10b981' }, { x: 84, y: 74, col: '#0284c7' }, { x: 85, y: 88, col: '#10b981' },
    { x: 86, y: 64, col: '#0284c7' }, { x: 87, y: 78, col: '#10b981' }, { x: 88, y: 92, col: '#0284c7' }, { x: 89, y: 72, col: '#10b981' }, { x: 90, y: 84, col: '#0284c7' },
    { x: 91, y: 96, col: '#10b981' }, { x: 92, y: 80, col: '#0284c7' }, { x: 93, y: 68, col: '#10b981' }, { x: 94, y: 90, col: '#0284c7' }, { x: 95, y: 76, col: '#10b981' },
    { x: 96, y: 86, col: '#0284c7' }, { x: 97, y: 98, col: '#10b981' }, { x: 98, y: 82, col: '#0284c7' }, { x: 99, y: 94, col: '#10b981' }, { x: 100, y: 88, col: '#0284c7' }
  ];

  // Handle clicking inside Classification coordinate box
  const handleClassificationClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Approximate S-curve decision boundary: x = 110 + 40 * sin(y / 35)
    const boundaryX = 110 + 40 * Math.sin((clickY - 40) / 45);
    const isClassA = clickX < boundaryX;

    setTestPoint({
      x: clickX,
      y: clickY,
      classType: isClassA ? 'A' : 'B',
      label: isClassA ? 'Class A (Green Region)' : 'Class B (Blue Region)'
    });
  };

  // Calculate regression value on line y = 0.72x + 12
  const regPredictedY = (0.72 * sliderX + 12).toFixed(1);

  // Problem sorter state
  const [sorterIdx, setSorterIdx] = useState(0);
  const [sorterFeedback, setSorterFeedback] = useState(null);

  const sorterProblems = [
    {
      text: 'Predicting the exact sale price of a 4-bedroom house in dollars ($)',
      correct: 'regression',
      reason: 'Sale price in dollars (e.g. $425,500) is a continuous numerical float.'
    },
    {
      text: 'Predicting whether an incoming email is Spam or Primary Inbox',
      correct: 'classification',
      reason: 'Spam vs Inbox is a discrete binary categorical label (0 or 1).'
    },
    {
      text: 'Estimating the temperature in degrees Celsius tomorrow afternoon',
      correct: 'regression',
      reason: 'Temperature (e.g. 24.6°C) is a continuous numerical measurement.'
    },
    {
      text: 'Determining whether a medical blood test indicates Diabetic vs Healthy',
      correct: 'classification',
      reason: 'Medical diagnosis categories are discrete classes.'
    },
    {
      text: 'Predicting the waiting time (in minutes) for an Uber ride',
      correct: 'regression',
      reason: 'Waiting time (e.g. 7.4 minutes) is a continuous duration.'
    }
  ];

  const handleSorterChoice = (choice) => {
    const isCorrect = choice === sorterProblems[sorterIdx].correct;
    setSorterFeedback({ isCorrect, reason: sorterProblems[sorterIdx].reason });
    if (isCorrect) triggerConfetti(0.5, 0.6);
  };

  const handleNextSorter = () => {
    setSorterFeedback(null);
    setSorterIdx((sorterIdx + 1) % sorterProblems.length);
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              SUPERVISED TAXONOMY ARENA
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              Regression vs. Classification Geometry
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Interactive comparison of separating decision boundaries vs continuous best-fit trend trajectories.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2'
        }}>
          {[
            { label: 'Dual Coordinate Arena', tab: 0 },
            { label: 'Interactive Sorter Game', tab: 1 },
            { label: 'Metrics Comparison', tab: 2 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: DUAL COORDINATE ARENA (MATCHING USER'S IMAGE) ─── */}
      {activeTab === 0 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            {/* ─── PLOT 1: CLASSIFICATION ARENA ─── */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '18px',
              padding: '1.4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase' }}>
                  Classification
                </span>
                <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                  Decision Boundary
                </span>
              </div>

              {/* SVG Coordinate Box */}
              <div
                onClick={handleClassificationClick}
                style={{
                  position: 'relative',
                  width: '260px',
                  height: '240px',
                  background: '#ffffff',
                  border: '2px solid #0f172a',
                  borderRadius: '10px',
                  cursor: 'crosshair',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
                }}
              >
                <svg width="260" height="240" viewBox="0 0 260 240">
                  {/* Axis tick marks */}
                  <line x1="20" y1="220" x2="250" y2="220" stroke="#0f172a" strokeWidth="2" />
                  <line x1="20" y1="15" x2="20" y2="220" stroke="#0f172a" strokeWidth="2" />

                  {/* Tick labels */}
                  <text x="5" y="25" fontSize="8" fill="#475569" fontWeight="bold">0.4</text>
                  <text x="5" y="80" fontSize="8" fill="#475569" fontWeight="bold">0.2</text>
                  <text x="9" y="130" fontSize="8" fill="#475569" fontWeight="bold">0</text>
                  <text x="2" y="175" fontSize="8" fill="#475569" fontWeight="bold">-0.2</text>
                  <text x="2" y="215" fontSize="8" fill="#475569" fontWeight="bold">-0.4</text>

                  <text x="25" y="235" fontSize="8" fill="#475569" fontWeight="bold">-0.5</text>
                  <text x="80" y="235" fontSize="8" fill="#475569" fontWeight="bold">-0.3</text>
                  <text x="135" y="235" fontSize="8" fill="#475569" fontWeight="bold">-0.1</text>
                  <text x="190" y="235" fontSize="8" fill="#475569" fontWeight="bold">0.1</text>

                  {/* Scatter dots */}
                  {classPoints.map((pt, pIdx) => (
                    <circle
                      key={`cp-${pIdx}`}
                      cx={pt.cx}
                      cy={pt.cy}
                      r="5.5"
                      fill={pt.type === 'A' ? '#10b981' : '#0284c7'}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    />
                  ))}

                  {/* S-shaped Decision Boundary Curve (Black Line) */}
                  <path
                    d="M 50 220 C 70 190, 80 160, 120 145 C 160 130, 165 80, 175 20"
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Dropped Test Marker */}
                  <g transform={`translate(${testPoint.x}, ${testPoint.y})`}>
                    <circle r="8" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="-5" y1="-5" x2="5" y2="5" stroke="#ef4444" strokeWidth="2" />
                    <line x1="5" y1="-5" x2="-5" y2="5" stroke="#ef4444" strokeWidth="2" />
                  </g>
                </svg>
              </div>

              {/* Click instruction & output feedback */}
              <div style={{ marginTop: '0.85rem', width: '100%', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.35rem' }}>
                  Click anywhere in plot to drop test point
                </div>
                <div style={{
                  background: testPoint.classType === 'A' ? '#ecfdf5' : '#eff6ff',
                  border: `1.5px solid ${testPoint.classType === 'A' ? '#6ee7b7' : '#93c5fd'}`,
                  borderRadius: '8px',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: testPoint.classType === 'A' ? '#065f46' : '#1e40af'
                }}>
                  Result: {testPoint.label}
                </div>
              </div>
            </div>

            {/* ─── PLOT 2: REGRESSION ARENA ─── */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '18px',
              padding: '1.4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase' }}>
                  Regression
                </span>
                <span style={{ background: '#f0fdf4', color: '#15803d', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                  Best-Fit Line
                </span>
              </div>

              {/* SVG Coordinate Box */}
              <div style={{
                position: 'relative',
                width: '260px',
                height: '240px',
                background: '#ffffff',
                border: '2px solid #0f172a',
                borderRadius: '10px',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
              }}>
                <svg width="260" height="240" viewBox="0 0 260 240">
                  {/* Axis border lines */}
                  <line x1="25" y1="215" x2="245" y2="215" stroke="#0f172a" strokeWidth="2" />
                  <line x1="25" y1="15" x2="25" y2="215" stroke="#0f172a" strokeWidth="2" />

                  {/* Tick labels */}
                  <text x="5" y="25" fontSize="8" fill="#475569" fontWeight="bold">100</text>
                  <text x="8" y="75" fontSize="8" fill="#475569" fontWeight="bold">80</text>
                  <text x="8" y="125" fontSize="8" fill="#475569" fontWeight="bold">60</text>
                  <text x="8" y="175" fontSize="8" fill="#475569" fontWeight="bold">40</text>

                  <text x="25" y="230" fontSize="8" fill="#475569" fontWeight="bold">20</text>
                  <text x="75" y="230" fontSize="8" fill="#475569" fontWeight="bold">40</text>
                  <text x="130" y="230" fontSize="8" fill="#475569" fontWeight="bold">60</text>
                  <text x="185" y="230" fontSize="8" fill="#475569" fontWeight="bold">80</text>
                  <text x="235" y="230" fontSize="8" fill="#475569" fontWeight="bold">100</text>

                  {/* Cloud of points trending up */}
                  {regPoints.map((pt, pIdx) => {
                    const mappedX = 25 + ((pt.x - 20) / 80) * 220;
                    const mappedY = 215 - (pt.y / 100) * 200;
                    return (
                      <circle
                        key={`rp-${pIdx}`}
                        cx={mappedX}
                        cy={mappedY}
                        r="4.5"
                        fill={pt.col}
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                    );
                  })}

                  {/* Best-Fit Regression Line: from (20, 26) to (100, 85) */}
                  <line
                    x1="25"
                    y1={215 - (26 / 100) * 200}
                    x2="245"
                    y2={215 - (85 / 100) * 200}
                    stroke="#0f172a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Dynamic interactive pin from slider */}
                  {(() => {
                    const mappedPinX = 25 + ((sliderX - 20) / 80) * 220;
                    const mappedPinY = 215 - (Number(regPredictedY) / 100) * 200;
                    return (
                      <g>
                        <line x1={mappedPinX} y1="215" x2={mappedPinX} y2={mappedPinY} stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx={mappedPinX} cy={mappedPinY} r="7" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Slider Controls */}
              <div style={{ marginTop: '0.85rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>
                  <span>Input x = {sliderX}</span>
                  <span style={{ color: '#001f54', fontWeight: 800 }}>Predicted ŷ = {regPredictedY}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={sliderX}
                  onChange={(e) => setSliderX(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#001f54', cursor: 'pointer' }}
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: INTERACTIVE PROBLEM SORTER GAME ─── */}
      {activeTab === 1 && (
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Problem Sorter Challenge ({sorterIdx + 1} of {sorterProblems.length})
          </div>

          <div style={{
            background: '#f8fafc',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)'
          }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
              "{sorterProblems[sorterIdx].text}"
            </h4>

            {!sorterFeedback ? (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => handleSorterChoice('classification')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '2px solid #0284c7',
                    background: '#ffffff',
                    color: '#0284c7',
                    fontSize: '0.85rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(2,132,199,0.1)'
                  }}
                >
                  Classification (Discrete)
                </button>
                <button
                  onClick={() => handleSorterChoice('regression')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '2px solid #001f54',
                    background: '#001f54',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(0,31,84,0.2)'
                  }}
                >
                  Regression (Continuous)
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  background: sorterFeedback.isCorrect ? '#ecfdf5' : '#fef2f2',
                  border: `1.5px solid ${sorterFeedback.isCorrect ? '#6ee7b7' : '#fca5a5'}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  color: sorterFeedback.isCorrect ? '#065f46' : '#991b1b',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  {sorterFeedback.isCorrect ? 'Correct! ' : 'Incorrect! '}
                  {sorterFeedback.reason}
                </div>
                <button
                  onClick={handleNextSorter}
                  style={{
                    background: '#001f54',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Next Challenge →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 2: METRICS & COMPARISON DEEP-DIVE ─── */}
      {activeTab === 2 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: '#f0f4fc', borderBottom: '2px solid #001f54', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem', color: '#001f54', fontWeight: 900 }}>Attribute</th>
                <th style={{ padding: '0.75rem', color: '#001f54', fontWeight: 900 }}>Regression</th>
                <th style={{ padding: '0.75rem', color: '#001f54', fontWeight: 900 }}>Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Target Variable (y)</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Continuous Real Numbers (ℝ)</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Discrete Categories / Class Labels</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Geometric Solution</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Best-Fit Trend Curve passing through point cloud</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Decision Boundary separating classes</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Standard Loss Functions</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Mean Squared Error (MSE), Huber Loss</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Binary Cross-Entropy / Log Loss, Hinge Loss</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Evaluation Metrics</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>MSE, RMSE, MAE, R-Squared (R²)</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Accuracy, Precision, Recall, F1, ROC-AUC</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Standard Algorithms</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Linear Regression, Ridge, Lasso, SVR</td>
                <td style={{ padding: '0.75rem', color: '#334155' }}>Logistic Regression, Random Forest, SVM, Naive Bayes</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── FEATURES AND LABELS INTERACTIVE DATASET STUDIO DIAGRAM ────────────────
const FeaturesAndLabelsDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDatasetKey, setSelectedDatasetKey] = useState('housing');
  const [selectedRowIdx, setSelectedRowIdx] = useState(0);
  const [isInferencing, setIsInferencing] = useState(false);
  const [inferenceResult, setInferenceResult] = useState(null);

  const datasets = {
    housing: {
      name: 'Real Estate Valuation Dataset (Regression)',
      taskType: 'Regression (Predict continuous price $)',
      targetName: 'Price ($)',
      featureNames: ['SquareFeet', 'Bedrooms', 'Bathrooms', 'ZipCodeScore', 'HasGarage'],
      featureTypes: ['Continuous', 'Discrete', 'Continuous', 'Continuous', 'Binary'],
      featureBadges: ['X₁', 'X₂', 'X₃', 'X₄', 'X₅'],
      rows: [
        { id: 1, values: [850, 1, 1.0, 6.2, 0], target: '$195,000' },
        { id: 2, values: [1200, 2, 1.5, 7.5, 1], target: '$260,000' },
        { id: 3, values: [1550, 3, 2.0, 8.1, 1], target: '$335,000' },
        { id: 4, values: [2100, 3, 2.5, 8.8, 1], target: '$445,000' },
        { id: 5, values: [2800, 4, 3.0, 9.4, 1], target: '$595,000' }
      ],
      newSample: {
        values: [1850, 3, 2.0, 8.4, 1],
        predicted: '$392,400 (Estimated Continuous Market Value)'
      }
    },
    medical: {
      name: 'Patient Health Diagnostic Dataset (Classification)',
      taskType: 'Binary Classification (Predict Diabetic vs Healthy)',
      targetName: 'Diagnosis (0=Healthy, 1=Diabetic)',
      featureNames: ['GlucoseLevel', 'BMI', 'Age', 'BloodPressure', 'Insulin'],
      featureTypes: ['Continuous', 'Continuous', 'Discrete', 'Continuous', 'Continuous'],
      featureBadges: ['X₁', 'X₂', 'X₃', 'X₄', 'X₅'],
      rows: [
        { id: 1, values: [85, 22.4, 25, 72, 80], target: '0 (Healthy)' },
        { id: 2, values: [145, 31.2, 48, 88, 160], target: '1 (Diabetic)' },
        { id: 3, values: [92, 24.1, 33, 76, 95], target: '0 (Healthy)' },
        { id: 4, values: [168, 35.8, 54, 94, 210], target: '1 (Diabetic)' },
        { id: 5, values: [110, 26.5, 29, 80, 115], target: '0 (Healthy)' }
      ],
      newSample: {
        values: [152, 33.1, 51, 90, 185],
        predicted: 'Class 1 (Diabetic) with 89.4% Probability'
      }
    },
    salary: {
      name: 'Tech Employee Compensation Dataset (Regression)',
      taskType: 'Regression (Predict annual base salary $)',
      targetName: 'AnnualSalary ($)',
      featureNames: ['YearsExperience', 'EducationRank', 'TeamSize', 'CertificationsCount', 'IsRemote'],
      featureTypes: ['Continuous', 'Ordinal (1-4)', 'Discrete', 'Discrete', 'Binary'],
      featureBadges: ['X₁', 'X₂', 'X₃', 'X₄', 'X₅'],
      rows: [
        { id: 1, values: [1.5, 2, 0, 1, 1], target: '$75,000' },
        { id: 2, values: [4.0, 3, 2, 2, 1], target: '$115,000' },
        { id: 3, values: [7.5, 3, 5, 3, 0], target: '$160,000' },
        { id: 4, values: [10.0, 4, 12, 4, 0], target: '$210,000' },
        { id: 5, values: [14.0, 4, 25, 5, 1], target: '$285,000' }
      ],
      newSample: {
        values: [6.0, 3, 4, 3, 1],
        predicted: '$142,500 (Predicted Annual Base Salary)'
      }
    }
  };

  const curDataset = datasets[selectedDatasetKey];
  const curRow = curDataset.rows[selectedRowIdx] || curDataset.rows[0];

  const handleRunInference = () => {
    setIsInferencing(true);
    setInferenceResult(null);
    setTimeout(() => {
      setIsInferencing(false);
      setInferenceResult(curDataset.newSample.predicted);
      triggerConfetti(0.5, 0.6);
    }, 900);
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              DATASET ANATOMY STUDIO
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              Feature Matrix (X) vs. Target Vector (y)
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Inspect real-world tabular datasets, examine sample vectors, and simulate production inference.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2'
        }}>
          {[
            { label: 'Interactive Dataset UI', tab: 0 },
            { label: 'Matrix Anatomy & Python', tab: 1 },
            { label: 'Feature Types Inspector', tab: 2 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: INTERACTIVE DATASET UI STUDIO ─── */}
      {activeTab === 0 && (
        <div>
          {/* Dataset Selector Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { key: 'housing', label: 'Housing (Regression)' },
                { key: 'medical', label: 'Medical (Classification)' },
                { key: 'salary', label: 'Salary (Regression)' }
              ].map((d) => (
                <button
                  key={d.key}
                  onClick={() => {
                    setSelectedDatasetKey(d.key);
                    setSelectedRowIdx(0);
                    setInferenceResult(null);
                  }}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${selectedDatasetKey === d.key ? '#001f54' : '#cbd5e1'}`,
                    background: selectedDatasetKey === d.key ? '#001f54' : '#ffffff',
                    color: selectedDatasetKey === d.key ? '#ffffff' : '#475569',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontWeight: 800, color: '#0284c7' }}>
                <span style={{ width: 10, height: 10, borderRadius: '3px', background: '#eff6ff', border: '1.5px solid #0284c7' }} />
                Features Matrix (X)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontWeight: 800, color: '#b45309' }}>
                <span style={{ width: 10, height: 10, borderRadius: '3px', background: '#fffbeb', border: '1.5px solid #f59e0b' }} />
                Target Label Vector (y)
              </span>
            </div>
          </div>

          {/* Dataset Table Studio */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #001f54',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ background: '#f0f4fc', padding: '0.65rem 1rem', borderBottom: '1.5px solid #c2d4f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#001f54' }}>
              <span>{curDataset.name}</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Click any row to inspect its feature vector</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                <thead>
                  {/* Top Level Category Row */}
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ padding: '0.45rem 0.75rem', color: '#64748b', fontSize: '0.68rem', textAlign: 'center' }}>Sample</th>
                    <th colSpan={curDataset.featureNames.length} style={{ padding: '0.45rem', textAlign: 'center', background: '#eff6ff', color: '#1e40af', fontWeight: 900, fontSize: '0.72rem', borderRight: '2px solid #001f54' }}>
                      FEATURE MATRIX (X) — Input Variables
                    </th>
                    <th style={{ padding: '0.45rem 0.75rem', textAlign: 'center', background: '#fffbeb', color: '#b45309', fontWeight: 900, fontSize: '0.72rem' }}>
                      TARGET LABEL (y) — Ground Truth
                    </th>
                  </tr>

                  {/* Column Names Row */}
                  <tr style={{ background: '#ffffff', borderBottom: '2px solid #001f54' }}>
                    <th style={{ padding: '0.65rem 0.75rem', color: '#475569', textAlign: 'center' }}># (m)</th>
                    {curDataset.featureNames.map((name, fIdx) => (
                      <th key={`th-${fIdx}`} style={{ padding: '0.65rem 0.75rem', textAlign: 'center', background: '#f8fafc', color: '#0f172a', fontWeight: 800 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                          <span style={{ background: '#001f54', color: '#ffffff', fontSize: '0.62rem', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 900 }}>
                            {curDataset.featureBadges[fIdx]}
                          </span>
                          <span>{name}</span>
                        </div>
                      </th>
                    ))}
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'center', background: '#fef3c7', color: '#92400e', fontWeight: 900, borderLeft: '2px solid #001f54' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                        <span style={{ background: '#d97706', color: '#ffffff', fontSize: '0.62rem', padding: '0.1rem 0.45rem', borderRadius: '4px', fontWeight: 900 }}>
                          y
                        </span>
                        <span>{curDataset.targetName}</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {curDataset.rows.map((row, rIdx) => {
                    const isSelected = selectedRowIdx === rIdx;
                    return (
                      <tr
                        key={`row-${row.id}`}
                        onClick={() => setSelectedRowIdx(rIdx)}
                        style={{
                          background: isSelected ? '#f0f4fc' : rIdx % 2 === 0 ? '#ffffff' : '#f8fafc',
                          borderBottom: '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 800, color: isSelected ? '#001f54' : '#64748b' }}>
                          Row {row.id}
                        </td>
                        {row.values.map((val, vIdx) => (
                          <td key={`val-${vIdx}`} style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#334155', fontWeight: isSelected ? 800 : 500 }}>
                            {val}
                          </td>
                        ))}
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 900, color: '#92400e', background: isSelected ? '#fef3c7' : 'rgba(254, 243, 199, 0.4)', borderLeft: '2px solid #001f54' }}>
                          {row.target}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Row Inspector & Simulated Inference Split */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            
            {/* Observation Inspector Box */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #c2d4f2',
              borderRadius: '14px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase' }}>
                  Selected Sample x^({curRow.id})
                </span>
                <span style={{ background: '#001f54', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  Instance #{curRow.id}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#475569', margin: '0 0 0.75rem' }}>
                Mathematical representation of observation row #{curRow.id}:
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.65rem 0.85rem', fontFamily: 'Consolas, monospace', fontSize: '0.76rem', color: '#0f172a', lineHeight: '1.6' }}>
                <div><strong>Feature Vector x^({curRow.id}):</strong> [{curRow.values.join(', ')}]</div>
                <div style={{ color: '#b45309', marginTop: '0.2rem' }}><strong>Target Label y^({curRow.id}):</strong> {curRow.target}</div>
              </div>
            </div>

            {/* Simulated Live Inference Box */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #001f54',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase' }}>
                    Production Inference Simulation
                  </span>
                  <span style={{ background: '#f59e0b', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    Unlabeled Input x_new
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '0 0 0.5rem' }}>
                  New unseen instance has features, but <strong>NO label</strong> (y is unknown):
                </p>
                <div style={{ background: '#f0f4fc', border: '1px solid #c2d4f2', borderRadius: '6px', padding: '0.45rem 0.65rem', fontSize: '0.74rem', fontFamily: 'Consolas, monospace', color: '#001f54', marginBottom: '0.75rem' }}>
                  x_new = [{curDataset.newSample.values.join(', ')}]
                </div>
              </div>

              <div>
                {!inferenceResult ? (
                  <button
                    onClick={handleRunInference}
                    disabled={isInferencing}
                    style={{
                      width: '100%',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: isInferencing ? '#94a3b8' : '#001f54',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: isInferencing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 3px 10px rgba(0,31,84,0.2)'
                    }}
                  >
                    <IconSparkles size={16} /> {isInferencing ? 'Model Computing f(x)...' : 'Pass x_new into Model f(x)'}
                  </button>
                ) : (
                  <div style={{ background: '#ecfdf5', border: '1.5px solid #10b981', borderRadius: '8px', padding: '0.6rem 0.85rem' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>
                      Predicted Label (ŷ_pred):
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#047857', marginTop: '0.15rem' }}>
                      {inferenceResult}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: MATRIX ANATOMY & PANDAS SLICING ─── */}
      {activeTab === 1 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            {/* Mathematical Matrix Notation */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.4rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
                Mathematical Representation
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.5', margin: '0 0 1rem' }}>
                In linear algebra and machine learning theory, the dataset is formalized as a matrix-vector pair:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.78rem' }}>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.75rem' }}>
                  <strong style={{ color: '#1e40af' }}>Feature Matrix (X): </strong>
                  <span style={{ fontFamily: 'Consolas, monospace', color: '#001f54' }}>X ∈ ℝ^(m × n)</span>
                  <div style={{ fontSize: '0.72rem', color: '#1e3a8a', marginTop: '0.2rem' }}>
                    m rows (observations) by n columns (features)
                  </div>
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem' }}>
                  <strong style={{ color: '#92400e' }}>Target Vector (y): </strong>
                  <span style={{ fontFamily: 'Consolas, monospace', color: '#92400e' }}>y ∈ ℝ^m</span>
                  <div style={{ fontSize: '0.72rem', color: '#78350f', marginTop: '0.2rem' }}>
                    1D column vector of length m containing the ground-truth answers
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem' }}>
                  <strong style={{ color: '#0f172a' }}>Single Instance: </strong>
                  <span style={{ fontFamily: 'Consolas, monospace', color: '#0f172a' }}>x^(i) = [x_1, x_2, ..., x_n]</span>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Row index i represents sample #i with target y^(i)
                  </div>
                </div>
              </div>
            </div>

            {/* Python / Pandas Slicing Reference */}
            <div style={{ background: '#ffffff', border: '2px solid #001f54', borderRadius: '16px', padding: '1.4rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
                Python / Pandas Best Practices
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.5', margin: '0 0 1rem' }}>
                The two standard idiomatic ways to separate features and labels in Pandas:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.76rem', fontFamily: 'Consolas, monospace' }}>
                <div style={{ background: '#0f172a', color: '#f8fafc', padding: '0.85rem', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontStyle: 'italic', marginBottom: '0.3rem' }}># Method 1: Drop by Column Name (Recommended)</div>
                  <div><span style={{ color: '#60a5fa' }}>X</span> = df.<span style={{ color: '#38bdf8' }}>drop</span>(columns=[<span style={{ color: '#4ade80' }}>'target_col'</span>])</div>
                  <div><span style={{ color: '#60a5fa' }}>y</span> = df[<span style={{ color: '#4ade80' }}>'target_col'</span>]</div>
                </div>

                <div style={{ background: '#0f172a', color: '#f8fafc', padding: '0.85rem', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontStyle: 'italic', marginBottom: '0.3rem' }}># Method 2: Position-Based Slicing (.iloc)</div>
                  <div><span style={{ color: '#60a5fa' }}>X</span> = df.<span style={{ color: '#38bdf8' }}>iloc</span>[:, :-<span style={{ color: '#fbbf24' }}>1</span>] <span style={{ color: '#64748b' }}># All columns except last</span></div>
                  <div><span style={{ color: '#60a5fa' }}>y</span> = df.<span style={{ color: '#38bdf8' }}>iloc</span>[:, -<span style={{ color: '#fbbf24' }}>1</span>]  <span style={{ color: '#64748b' }}># Exactly last column</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 2: FEATURE TYPES & MODALITIES ─── */}
      {activeTab === 2 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            
            <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#1d4ed8', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Continuous Numerical
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#1e3a8a', marginBottom: '0.4rem' }}>
                Infinite Measurements
              </div>
              <p style={{ fontSize: '0.76rem', color: '#1e40af', margin: '0 0 0.5rem', lineHeight: '1.45' }}>
                Any real decimal value within a range.
              </p>
              <div style={{ background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', color: '#0f172a', fontWeight: 700 }}>
                Examples: Temperature (36.8°C), Price ($149.50), Weight (72.4 kg)
              </div>
            </div>

            <div style={{ background: '#f5f3ff', border: '1.5px solid #ddd6fe', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#6d28d9', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Discrete Numerical
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#4c1d95', marginBottom: '0.4rem' }}>
                Countable Integers
              </div>
              <p style={{ fontSize: '0.76rem', color: '#5b21b6', margin: '0 0 0.5rem', lineHeight: '1.45' }}>
                Whole integer counts with no decimals.
              </p>
              <div style={{ background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', color: '#0f172a', fontWeight: 700 }}>
                Examples: Bedrooms (3), Dependents (2), Store visits (14)
              </div>
            </div>

            <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#047857', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Nominal Categorical
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#065f46', marginBottom: '0.4rem' }}>
                Unordered Groups
              </div>
              <p style={{ fontSize: '0.76rem', color: '#047857', margin: '0 0 0.5rem', lineHeight: '1.45' }}>
                Text labels with no mathematical hierarchy.
              </p>
              <div style={{ background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', color: '#0f172a', fontWeight: 700 }}>
                Examples: City ("Paris", "Tokyo"), Color ("Red", "Blue")
              </div>
            </div>

            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#b45309', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Binary / Boolean
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#78350f', marginBottom: '0.4rem' }}>
                Two-State Flags
              </div>
              <p style={{ fontSize: '0.76rem', color: '#92400e', margin: '0 0 0.5rem', lineHeight: '1.45' }}>
                Mutually exclusive 0/1 boolean states.
              </p>
              <div style={{ background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', color: '#0f172a', fontWeight: 700 }}>
                Examples: HasGarage (0/1), IsSubscriber (True/False)
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

// ─── DATA SPLITTING & K-FOLD INTERACTIVE STUDIO DIAGRAM ────────────────────
const DataSplitsDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Tab 0: Matrix Split Visual State (Matching User's Illustration)
  const [hoveredSubset, setHoveredSubset] = useState(null); // 'train' | 'val' | 'test' | null
  const [isMatrixAnimating, setIsMatrixAnimating] = useState(false);

  // Tab 1: Split Ratios State
  const [splitPreset, setSplitPreset] = useState('70_15_15');
  const [totalSamples] = useState(10000);
  const [pipelineStep, setPipelineStep] = useState(0); // 0: Idle, 1: Train, 2: Val, 3: Test Done
  const [isSimulating, setIsSimulating] = useState(false);

  // Tab 2: K-Fold State
  const [kFolds, setKFolds] = useState(5);
  const [activeFoldIdx, setActiveFoldIdx] = useState(0);
  const [isKFoldRunning, setIsKFoldRunning] = useState(false);
  const [kFoldResults, setKFoldResults] = useState(null);

  const presets = {
    '70_15_15': { train: 70, val: 15, test: 15, label: '70% / 15% / 15% (Standard Baseline)' },
    '80_10_10': { train: 80, val: 10, test: 10, label: '80% / 10% / 10% (Large Datasets)' },
    '60_20_20': { train: 60, val: 20, test: 20, label: '60% / 20% / 20% (Heavy Tuning Focus)' }
  };

  const curPreset = presets[splitPreset];
  const trainCount = Math.round((curPreset.train / 100) * totalSamples);
  const valCount = Math.round((curPreset.val / 100) * totalSamples);
  const testCount = Math.round((curPreset.test / 100) * totalSamples);

  const handleAnimateMatrixSplit = () => {
    setIsMatrixAnimating(true);
    setHoveredSubset('train');
    setTimeout(() => {
      setHoveredSubset('val');
      setTimeout(() => {
        setHoveredSubset('test');
        setTimeout(() => {
          setHoveredSubset(null);
          setIsMatrixAnimating(false);
          triggerConfetti(0.5, 0.6);
        }, 700);
      }, 700);
    }, 700);
  };

  const handleSimulatePipeline = () => {
    setIsSimulating(true);
    setPipelineStep(1);
    
    setTimeout(() => {
      setPipelineStep(2);
      setTimeout(() => {
        setPipelineStep(3);
        setIsSimulating(false);
        triggerConfetti(0.5, 0.6);
      }, 1100);
    }, 1100);
  };

  const handleRunKFold = () => {
    setIsKFoldRunning(true);
    setKFoldResults(null);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < kFolds) {
        setActiveFoldIdx(step);
      } else {
        clearInterval(interval);
        setIsKFoldRunning(false);
        const baseScores = [0.932, 0.945, 0.928, 0.951, 0.938, 0.941, 0.935, 0.949, 0.930, 0.944];
        const scores = baseScores.slice(0, kFolds);
        const mean = (scores.reduce((a, b) => a + b, 0) / kFolds).toFixed(3);
        const std = (0.008).toFixed(3);
        setKFoldResults({ scores, mean, std });
        triggerConfetti(0.5, 0.6);
      }
    }, 450);
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              DATA PARTITIONING STUDIO
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              Train vs. Validation vs. Test Sets
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Interactive matrix partitioning, split ratios, pipeline simulation, and K-Fold cross-validation.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Matrix Split Visual', tab: 0 },
            { label: '3-Way Split Studio', tab: 1 },
            { label: 'K-Fold Cross-Validation', tab: 2 },
            { label: 'Data Leakage Pitfalls', tab: 3 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: MATRIX SPLIT VISUAL (REPLICATING USER'S IMAGE) ─── */}
      {activeTab === 0 && (
        <div>
          <div style={{
            background: '#f8fafc',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.75rem 1.25rem',
            position: 'relative',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)',
            marginBottom: '1.25rem'
          }}>
            
            {/* SVG Visual Canvas for Matrix Split */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
              <svg width="680" height="340" viewBox="0 0 680 340" style={{ maxWidth: '100%' }}>
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#0f172a" />
                  </marker>
                </defs>

                {/* ─── LEFT BLOCK: GIVEN DATA ─── */}
                <g transform="translate(40, 20)">
                  <text x="75" y="15" textAnchor="middle" fontSize="15" fontWeight="900" fill="#001f54">
                    Given data
                  </text>

                  {/* 5x6 Grid of Cells */}
                  {Array.from({ length: 6 }).map((_, r) => (
                    <g key={`gdr-${r}`}>
                      {Array.from({ length: 5 }).map((_, c) => {
                        let cellFill = '#dcfce7'; // Default light green
                        let cellStroke = '#16a34a';

                        if (hoveredSubset === 'train' && r < 4) {
                          cellFill = '#dbeafe';
                          cellStroke = '#2563eb';
                        } else if (hoveredSubset === 'val' && r === 4) {
                          cellFill = '#ede9fe';
                          cellStroke = '#7c3aed';
                        } else if (hoveredSubset === 'test' && r === 5) {
                          cellFill = '#fef3c7';
                          cellStroke = '#d97706';
                        }

                        return (
                          <rect
                            key={`gdc-${r}-${c}`}
                            x={c * 30}
                            y={30 + r * 30}
                            width="28"
                            height="28"
                            fill={cellFill}
                            stroke={cellStroke}
                            strokeWidth="1.2"
                            rx="3"
                            style={{ transition: 'all 0.25s ease' }}
                          />
                        );
                      })}
                    </g>
                  ))}

                  {/* Ellipsis dots */}
                  <text x="75" y="232" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#64748b">
                    ⋮
                  </text>

                  {/* Bottom single row */}
                  {Array.from({ length: 5 }).map((_, c) => (
                    <rect
                      key={`gdb-${c}`}
                      x={c * 30}
                      y="250"
                      width="28"
                      height="28"
                      fill="#dcfce7"
                      stroke="#16a34a"
                      strokeWidth="1.2"
                      rx="3"
                    />
                  ))}
                </g>

                {/* ─── BRANCHING ARROWS ─── */}
                {/* Arrow to Training Set */}
                <line
                  x1="205"
                  y1="130"
                  x2="370"
                  y2="75"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  markerEnd="url(#arrowhead)"
                />

                {/* Arrow to Validation Set */}
                <line
                  x1="205"
                  y1="150"
                  x2="370"
                  y2="195"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  markerEnd="url(#arrowhead)"
                />

                {/* Arrow to Test Set */}
                <line
                  x1="205"
                  y1="170"
                  x2="370"
                  y2="285"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  markerEnd="url(#arrowhead)"
                />

                {/* ─── RIGHT SUBSET 1: TRAINING SET (5x5 GRID - BLUE) ─── */}
                <g
                  transform="translate(380, 15)"
                  onMouseEnter={() => setHoveredSubset('train')}
                  onMouseLeave={() => setHoveredSubset(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {Array.from({ length: 5 }).map((_, r) => (
                    <g key={`trr-${r}`}>
                      {Array.from({ length: 5 }).map((_, c) => (
                        <rect
                          key={`trc-${r}-${c}`}
                          x={c * 28}
                          y={r * 28}
                          width="26"
                          height="26"
                          fill={hoveredSubset === 'train' ? '#bfdbfe' : '#dbeafe'}
                          stroke="#2563eb"
                          strokeWidth="1.2"
                          rx="3"
                        />
                      ))}
                    </g>
                  ))}
                  <text x="155" y="75" fontSize="14" fontWeight="900" fill="#001f54">
                    Training set
                  </text>
                  <text x="155" y="95" fontSize="11" fontWeight="700" fill="#2563eb">
                    (~70% - 80% of data)
                  </text>
                </g>

                {/* ─── RIGHT SUBSET 2: VALIDATION SET (2x5 GRID - PURPLE/INDIGO) ─── */}
                <g
                  transform="translate(380, 175)"
                  onMouseEnter={() => setHoveredSubset('val')}
                  onMouseLeave={() => setHoveredSubset(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {Array.from({ length: 2 }).map((_, r) => (
                    <g key={`vlr-${r}`}>
                      {Array.from({ length: 5 }).map((_, c) => (
                        <rect
                          key={`vlc-${r}-${c}`}
                          x={c * 28}
                          y={r * 28}
                          width="26"
                          height="26"
                          fill={hoveredSubset === 'val' ? '#ddd6fe' : '#ede9fe'}
                          stroke="#7c3aed"
                          strokeWidth="1.2"
                          rx="3"
                        />
                      ))}
                    </g>
                  ))}
                  <text x="155" y="32" fontSize="14" fontWeight="900" fill="#4c1d95">
                    Validation set
                  </text>
                  <text x="155" y="50" fontSize="11" fontWeight="700" fill="#7c3aed">
                    (~10% - 15% for tuning)
                  </text>
                </g>

                {/* ─── RIGHT SUBSET 3: TEST SET (2x5 GRID - AMBER/GOLD) ─── */}
                <g
                  transform="translate(380, 255)"
                  onMouseEnter={() => setHoveredSubset('test')}
                  onMouseLeave={() => setHoveredSubset(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {Array.from({ length: 2 }).map((_, r) => (
                    <g key={`tsr-${r}`}>
                      {Array.from({ length: 5 }).map((_, c) => (
                        <rect
                          key={`tsc-${r}-${c}`}
                          x={c * 28}
                          y={r * 28}
                          width="26"
                          height="26"
                          fill={hoveredSubset === 'test' ? '#fde68a' : '#fef3c7'}
                          stroke="#d97706"
                          strokeWidth="1.2"
                          rx="3"
                        />
                      ))}
                    </g>
                  ))}
                  <text x="155" y="32" fontSize="14" fontWeight="900" fill="#92400e">
                    Test set
                  </text>
                  <text x="155" y="50" fontSize="11" fontWeight="700" fill="#d97706">
                    (~10% - 15% final benchmark)
                  </text>
                </g>
              </svg>
            </div>

            {/* Interactive Control & Hover Prompt */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid #cbd5e1', paddingTop: '0.85rem' }}>
              <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                {hoveredSubset === 'train' && (
                  <span style={{ color: '#1e40af', fontWeight: 800 }}>Highlighted: Training set rows used to calculate algorithm weights (w, b).</span>
                )}
                {hoveredSubset === 'val' && (
                  <span style={{ color: '#6d28d9', fontWeight: 800 }}>Highlighted: Validation set rows used to tune hyperparameters and avoid test corruption.</span>
                )}
                {hoveredSubset === 'test' && (
                  <span style={{ color: '#b45309', fontWeight: 800 }}>Highlighted: Test set rows locked in vault for unbiased final performance evaluation.</span>
                )}
                {!hoveredSubset && 'Hover over any target subset on the right to trace its partition origin.'}
              </div>

              <button
                onClick={handleAnimateMatrixSplit}
                disabled={isMatrixAnimating}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: isMatrixAnimating ? '#94a3b8' : '#001f54',
                  color: '#ffffff',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  cursor: isMatrixAnimating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <IconSparkles size={14} /> {isMatrixAnimating ? 'Partitioning...' : 'Animate Partitioning'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: 3-WAY SPLIT STUDIO & PIPELINE SIMULATOR ─── */}
      {activeTab === 1 && (
        <div>
          {/* Preset Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {Object.keys(presets).map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setSplitPreset(k);
                    setPipelineStep(0);
                  }}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${splitPreset === k ? '#001f54' : '#cbd5e1'}`,
                    background: splitPreset === k ? '#001f54' : '#ffffff',
                    color: splitPreset === k ? '#ffffff' : '#475569',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {presets[k].label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>
              Total Dataset Size: <strong>10,000 samples (100%)</strong>
            </span>
          </div>

          {/* Dynamic Partition Bar */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)'
          }}>
            <div style={{ display: 'flex', height: '48px', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid #cbd5e1', marginBottom: '1rem' }}>
              {/* Train Segment */}
              <div style={{
                width: `${curPreset.train}%`,
                background: '#001f54',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: 900,
                transition: 'width 0.3s ease',
                borderRight: '2px solid #ffffff'
              }}>
                Train ({curPreset.train}%)
              </div>

              {/* Validation Segment */}
              <div style={{
                width: `${curPreset.val}%`,
                background: '#4f46e5',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: 900,
                transition: 'width 0.3s ease',
                borderRight: '2px solid #ffffff'
              }}>
                Val ({curPreset.val}%)
              </div>

              {/* Test Segment */}
              <div style={{
                width: `${curPreset.test}%`,
                background: '#d97706',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: 900,
                transition: 'width 0.3s ease'
              }}>
                Test ({curPreset.test}%)
              </div>
            </div>

            {/* 3 Detail Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              
              {/* Training Card */}
              <div style={{
                background: pipelineStep === 1 ? '#e0f2fe' : '#f8fafc',
                border: `1.5px solid ${pipelineStep === 1 ? '#0284c7' : '#cbd5e1'}`,
                borderRadius: '12px',
                padding: '0.9rem',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#001f54' }}>1. Training Set</span>
                  <span style={{ background: '#001f54', color: '#ffffff', fontSize: '0.68rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    {trainCount.toLocaleString()} rows
                  </span>
                </div>
                <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.4' }}>
                  <strong>Role:</strong> Fits algorithm weights & parameters (w, b). Model learns features → labels mapping.
                </p>
              </div>

              {/* Validation Card */}
              <div style={{
                background: pipelineStep === 2 ? '#ede9fe' : '#f8fafc',
                border: `1.5px solid ${pipelineStep === 2 ? '#7c3aed' : '#cbd5e1'}`,
                borderRadius: '12px',
                padding: '0.9rem',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#4338ca' }}>2. Validation Set</span>
                  <span style={{ background: '#4f46e5', color: '#ffffff', fontSize: '0.68rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    {valCount.toLocaleString()} rows
                  </span>
                </div>
                <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.4' }}>
                  <strong>Role:</strong> Hyperparameter tuning (tree depth, learning rate, regularization) and early stopping.
                </p>
              </div>

              {/* Test Card */}
              <div style={{
                background: pipelineStep === 3 ? '#fef3c7' : '#f8fafc',
                border: `1.5px solid ${pipelineStep === 3 ? '#d97706' : '#cbd5e1'}`,
                borderRadius: '12px',
                padding: '0.9rem',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#b45309' }}>3. Test Set (Vault)</span>
                  <span style={{ background: '#d97706', color: '#ffffff', fontSize: '0.68rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    {testCount.toLocaleString()} rows
                  </span>
                </div>
                <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.4' }}>
                  <strong>Role:</strong> Evaluated ONLY ONCE at the end of the project for an unbiased generalization metric.
                </p>
              </div>

            </div>
          </div>

          {/* Interactive Pipeline Execution Button & Status */}
          <div style={{
            background: '#f8fafc',
            border: '1.5px solid #c2d4f2',
            borderRadius: '14px',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#001f54', marginBottom: '0.6rem' }}>
              Simulate 3-Stage Training Pipeline Flow
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.85rem' }}>
              <button
                onClick={handleSimulatePipeline}
                disabled={isSimulating}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: isSimulating ? '#94a3b8' : '#001f54',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 900,
                  cursor: isSimulating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 3px 10px rgba(0,31,84,0.2)'
                }}
              >
                <IconSparkles size={16} /> {isSimulating ? 'Pipeline Running...' : 'Execute 3-Stage ML Pipeline'}
              </button>
            </div>

            {/* Stage Progress Feedback */}
            {pipelineStep > 0 && (
              <div style={{
                background: pipelineStep === 3 ? '#ecfdf5' : '#eff6ff',
                border: `1.5px solid ${pipelineStep === 3 ? '#6ee7b7' : '#93c5fd'}`,
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.8rem',
                color: pipelineStep === 3 ? '#065f46' : '#1e40af',
                fontWeight: 700
              }}>
                {pipelineStep === 1 && 'Stage 1/3: Model fitting parameters (w, b) on 7,000 Training samples... (Loss: 0.245)'}
                {pipelineStep === 2 && 'Stage 2/3: Tuning hyperparameter depth & learning rate on 1,500 Validation samples... (Val Loss: 0.182)'}
                {pipelineStep === 3 && 'Stage 3/3 Complete! Test Vault unlocked: Unbiased Real-World Generalization Score = 94.6% Accuracy!'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 2: K-FOLD CROSS-VALIDATION ARENA ─── */}
      {activeTab === 2 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#001f54', marginRight: '0.4rem' }}>Select K:</span>
              {[3, 5, 10].map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setKFolds(k);
                    setActiveFoldIdx(0);
                    setKFoldResults(null);
                  }}
                  style={{
                    padding: '0.35rem 0.8rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${kFolds === k ? '#001f54' : '#cbd5e1'}`,
                    background: kFolds === k ? '#001f54' : '#ffffff',
                    color: kFolds === k ? '#ffffff' : '#475569',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  K = {k} Folds
                </button>
              ))}
            </div>

            <button
              onClick={handleRunKFold}
              disabled={isKFoldRunning}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: isKFoldRunning ? '#94a3b8' : '#001f54',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: isKFoldRunning ? 'not-allowed' : 'pointer'
              }}
            >
              {isKFoldRunning ? 'Rotating Folds...' : `Run ${kFolds}-Fold Cross-Validation`}
            </button>
          </div>

          {/* Visual K-Fold Iterations Matrix */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {Array.from({ length: kFolds }).map((_, iterIdx) => (
                <div key={`iter-${iterIdx}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: '65px', fontSize: '0.72rem', fontWeight: 800, color: '#475569' }}>
                    Iter {iterIdx + 1}:
                  </span>
                  <div style={{ flex: 1, display: 'flex', height: '28px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                    {Array.from({ length: kFolds }).map((_, fIdx) => {
                      const isVal = fIdx === iterIdx;
                      return (
                        <div
                          key={`f-${fIdx}`}
                          style={{
                            flex: 1,
                            background: isVal ? '#f59e0b' : '#001f54',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            borderRight: fIdx < kFolds - 1 ? '1px solid #ffffff' : 'none'
                          }}
                        >
                          {isVal ? 'Val Fold' : 'Train'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.72rem', fontWeight: 800 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#001f54' }}>
                <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#001f54' }} />
                Training Folds (K - 1)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#d97706' }}>
                <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#f59e0b' }} />
                Validation Fold (1)
              </span>
            </div>
          </div>

          {/* K-Fold Benchmark Results */}
          {kFoldResults && (
            <div style={{ background: '#ecfdf5', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#065f46', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {kFolds}-Fold Cross-Validation Scores:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                {kFoldResults.scores.map((sc, scIdx) => (
                  <span key={`sc-${scIdx}`} style={{ background: '#ffffff', border: '1px solid #6ee7b7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#047857' }}>
                    Fold {scIdx + 1}: {sc}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#047857' }}>
                Mean CV Score: {kFoldResults.mean} (± {kFoldResults.std} variance)
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 3: DATA LEAKAGE PITFALLS ─── */}
      {activeTab === 3 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            
            {/* Bad Workflow Card */}
            <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#991b1b', fontWeight: 900, fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                CRITICAL ERROR: Data Leakage Workflow
              </div>
              <p style={{ fontSize: '0.76rem', color: '#7f1d1d', lineHeight: '1.45', margin: '0 0 0.85rem' }}>
                Fitting a scaler on the entire dataset <strong>before</strong> splitting:
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #fca5a5', borderRadius: '8px', padding: '0.65rem', fontFamily: 'Consolas, monospace', fontSize: '0.72rem', color: '#991b1b', lineHeight: '1.5' }}>
                <div># BAD: Leaks test mean & std into train!</div>
                <div>scaler = StandardScaler()</div>
                <div><strong>X_scaled = scaler.fit_transform(X)</strong></div>
                <div>X_train, X_test = train_test_split(X_scaled)</div>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: '#991b1b', fontWeight: 700 }}>
                Result: Unrealistic, overly optimistic test scores that crash in production.
              </div>
            </div>

            {/* Good Workflow Card */}
            <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 900, fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                CORRECT: Clean Isolation Workflow
              </div>
              <p style={{ fontSize: '0.76rem', color: '#14532d', lineHeight: '1.45', margin: '0 0 0.85rem' }}>
                Fitting scaler <strong>ONLY</strong> on the training set:
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #86efac', borderRadius: '8px', padding: '0.65rem', fontFamily: 'Consolas, monospace', fontSize: '0.72rem', color: '#166534', lineHeight: '1.5' }}>
                <div># GOOD: Pristine separation</div>
                <div>X_train, X_test = train_test_split(X)</div>
                <div>scaler = StandardScaler()</div>
                <div><strong>X_train_scaled = scaler.fit_transform(X_train)</strong></div>
                <div><strong>X_test_scaled = scaler.transform(X_test)</strong></div>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>
                Result: 100% unbiased generalization score representing real production data.
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

// ─── OVERFITTING & UNDERFITTING INTERACTIVE STUDIO DIAGRAM ─────────────────
const OverfittingUnderfittingDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Tab 0: Interactive Mode & Hover
  const [selectedModelType, setSelectedModelType] = useState('all'); // 'all' | 'classification' | 'regression'
  const [hoveredCard, setHoveredCard] = useState(null);

  // Tab 1: Learning Curve Epoch Scrubber
  const [currentEpoch, setCurrentEpoch] = useState(45);
  const [isEpochPlaying, setIsEpochPlaying] = useState(false);

  // Tab 2: Polynomial Degree Slider
  const [polyDegree, setPolyDegree] = useState(2);

  // Simulated scatter points for Classification
  const classPoints = [
    // Class A (Navy Blue - Upper cluster)
    { x: 35, y: 35, cls: 0 }, { x: 55, y: 25, cls: 0 }, { x: 75, y: 38, cls: 0 },
    { x: 95, y: 30, cls: 0 }, { x: 115, y: 40, cls: 0 }, { x: 135, y: 28, cls: 0 },
    { x: 155, y: 36, cls: 0 }, { x: 60, y: 55, cls: 0 }, { x: 125, y: 50, cls: 0 },
    { x: 90, y: 60, cls: 0 }, { x: 145, y: 62, cls: 0 }, { x: 45, y: 70, cls: 0 },
    // Class B (Amber - Lower cluster with a couple boundary overlaps)
    { x: 30, y: 105, cls: 1 }, { x: 50, y: 120, cls: 1 }, { x: 70, y: 110, cls: 1 },
    { x: 90, y: 125, cls: 1 }, { x: 110, y: 115, cls: 1 }, { x: 130, y: 122, cls: 1 },
    { x: 150, y: 110, cls: 1 }, { x: 165, y: 128, cls: 1 }, { x: 65, y: 90, cls: 1 },
    { x: 135, y: 95, cls: 1 }, { x: 100, y: 85, cls: 1 },
    // Noise/Outliers for overfitting
    { x: 80, y: 88, cls: 0 }, { x: 120, y: 78, cls: 1 }
  ];

  // Simulated scatter points for Regression (U-shaped parabola with noise)
  const regPoints = [
    { x: 25, y: 88 }, { x: 35, y: 100 }, { x: 45, y: 112 }, { x: 55, y: 120 },
    { x: 65, y: 126 }, { x: 75, y: 130 }, { x: 85, y: 128 }, { x: 95, y: 122 },
    { x: 105, y: 115 }, { x: 115, y: 104 }, { x: 125, y: 95 }, { x: 135, y: 86 },
    { x: 145, y: 78 }, { x: 155, y: 70 },
    // Add jitter
    { x: 30, y: 95 }, { x: 50, y: 108 }, { x: 70, y: 135 }, { x: 90, y: 116 },
    { x: 110, y: 120 }, { x: 130, y: 90 }, { x: 150, y: 82 }
  ];

  // Epoch player simulation
  const handlePlayEpochs = () => {
    setIsEpochPlaying(true);
    setCurrentEpoch(1);
    let ep = 1;
    const interval = setInterval(() => {
      ep += 2;
      if (ep <= 100) {
        setCurrentEpoch(ep);
        if (ep === 45) {
          triggerConfetti(0.5, 0.6);
        }
      } else {
        clearInterval(interval);
        setIsEpochPlaying(false);
      }
    }, 80);
  };

  // Compute loss curves at given epoch
  const computeLosses = (ep) => {
    // Training loss: monotonically drops from 0.95 -> 0.03
    const trainLoss = (0.95 * Math.exp(-ep / 22) + 0.03).toFixed(3);
    // Validation loss: drops from 1.10 -> 0.18 at ep=45, then rises to 0.85
    let valLoss;
    if (ep <= 45) {
      valLoss = (0.18 + 0.92 * Math.pow((45 - ep) / 45, 1.8)).toFixed(3);
    } else {
      valLoss = (0.18 + 0.67 * Math.pow((ep - 45) / 55, 1.9)).toFixed(3);
    }
    return { trainLoss, valLoss };
  };

  const { trainLoss: curTrainLoss, valLoss: curValLoss } = computeLosses(currentEpoch);

  // Polynomial degree metrics
  const getPolyMetrics = (deg) => {
    if (deg === 1) return { trainErr: '0.42 (High)', valErr: '0.45 (High)', status: 'Underfitting (High Bias)', color: '#dc2626' };
    if (deg === 2 || deg === 3) return { trainErr: '0.08 (Low)', valErr: '0.09 (Optimal)', status: 'Right Fit (Optimal Generalization)', color: '#16a34a' };
    if (deg >= 4 && deg <= 7) return { trainErr: '0.04 (Very Low)', valErr: '0.14 (Slight Overfit)', status: 'Moderate Complexity', color: '#d97706' };
    return { trainErr: '0.00 (Zero Error!)', valErr: '0.88 (Catastrophic!)', status: 'Severe Overfitting (High Variance)', color: '#dc2626' };
  };

  const polyMetrics = getPolyMetrics(polyDegree);

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              MODEL CAPACITY & GENERALIZATION
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              Overfitting vs. Right Fit vs. Underfitting
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Interactive 2×3 visual geometry matrix, learning loss curves, and early stopping checkpoint arena.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2',
          flexWrap: 'wrap'
        }}>
          {[
            { label: '2×3 Geometry Matrix', tab: 0 },
            { label: 'Learning Curves & Early Stopping', tab: 1 },
            { label: 'Polynomial Morph Simulator', tab: 2 },
            { label: 'Remedies & Regularization', tab: 3 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: 2x3 GEOMETRY MATRIX (MATCHING USER'S IMAGE 1) ─── */}
      {activeTab === 0 && (
        <div>
          {/* Sub-Filter Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[
                { id: 'all', label: 'Show Both (2×3 Matrix)' },
                { id: 'classification', label: 'Classification Only' },
                { id: 'regression', label: 'Regression Only' }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedModelType(b.id)}
                  style={{
                    padding: '0.35rem 0.8rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${selectedModelType === b.id ? '#001f54' : '#cbd5e1'}`,
                    background: selectedModelType === b.id ? '#001f54' : '#ffffff',
                    color: selectedModelType === b.id ? '#ffffff' : '#475569',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>
              Hover over any plot to inspect its decision boundary and mathematical properties.
            </span>
          </div>

          {/* 2x3 Grid Container */}
          <div style={{
            background: '#f8fafc',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.5rem 1rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)'
          }}>

            {/* Column Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr 1fr', gap: '1rem', marginBottom: '0.75rem', textAlign: 'center' }}>
              <div />
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#dc2626' }}>Overfitting</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#16a34a' }}>Right Fit</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563eb' }}>Underfitting</div>
            </div>

            {/* ─── ROW 1: CLASSIFICATION ─── */}
            {(selectedModelType === 'all' || selectedModelType === 'classification') && (
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr 1fr', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#001f54', paddingLeft: '0.5rem' }}>
                  Classification
                </div>

                {/* 1. Overfitting Classification */}
                <div
                  onMouseEnter={() => setHoveredCard('clf-over')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#ffffff',
                    border: `1.5px solid ${hoveredCard === 'clf-over' ? '#dc2626' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '0.65rem',
                    boxShadow: hoveredCard === 'clf-over' ? '0 4px 14px rgba(220,38,38,0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="100%" height="150" viewBox="0 0 190 150">
                    {/* Axis lines */}
                    <line x1="20" y1="15" x2="20" y2="135" stroke="#0f172a" strokeWidth="1.8" />
                    <line x1="20" y1="135" x2="180" y2="135" stroke="#0f172a" strokeWidth="1.8" />

                    {/* Data Points */}
                    {classPoints.map((p, idx) => (
                      <circle
                        key={`cp1-${idx}`}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill={p.cls === 0 ? '#1e40af' : '#d97706'}
                      />
                    ))}

                    {/* Overfitting Serpentine Boundary (Wiggles around outliers) */}
                    <path
                      d="M 22 35 Q 35 55, 45 48 T 65 72 Q 72 105, 82 82 T 95 62 Q 105 105, 118 70 Q 128 55, 140 75 Q 155 90, 172 65"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2"
                    />
                  </svg>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#dc2626', textAlign: 'center', marginTop: '0.25rem' }}>
                    Complex Wiggly Boundary (High Var)
                  </div>
                </div>

                {/* 2. Right Fit Classification */}
                <div
                  onMouseEnter={() => setHoveredCard('clf-right')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#ffffff',
                    border: `1.5px solid ${hoveredCard === 'clf-right' ? '#16a34a' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '0.65rem',
                    boxShadow: hoveredCard === 'clf-right' ? '0 4px 14px rgba(22,163,74,0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="100%" height="150" viewBox="0 0 190 150">
                    {/* Axis lines */}
                    <line x1="20" y1="15" x2="20" y2="135" stroke="#0f172a" strokeWidth="1.8" />
                    <line x1="20" y1="135" x2="180" y2="135" stroke="#0f172a" strokeWidth="1.8" />

                    {/* Data Points */}
                    {classPoints.map((p, idx) => (
                      <circle
                        key={`cp2-${idx}`}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill={p.cls === 0 ? '#1e40af' : '#d97706'}
                      />
                    ))}

                    {/* Right Fit Smooth Parabolic Curve */}
                    <path
                      d="M 22 95 Q 95 38, 170 120"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.2"
                    />
                  </svg>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a', textAlign: 'center', marginTop: '0.25rem' }}>
                    Smooth Non-Linear Curve (Optimal)
                  </div>
                </div>

                {/* 3. Underfitting Classification */}
                <div
                  onMouseEnter={() => setHoveredCard('clf-under')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#ffffff',
                    border: `1.5px solid ${hoveredCard === 'clf-under' ? '#2563eb' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '0.65rem',
                    boxShadow: hoveredCard === 'clf-under' ? '0 4px 14px rgba(37,99,235,0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="100%" height="150" viewBox="0 0 190 150">
                    {/* Axis lines */}
                    <line x1="20" y1="15" x2="20" y2="135" stroke="#0f172a" strokeWidth="1.8" />
                    <line x1="20" y1="135" x2="180" y2="135" stroke="#0f172a" strokeWidth="1.8" />

                    {/* Data Points */}
                    {classPoints.map((p, idx) => (
                      <circle
                        key={`cp3-${idx}`}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill={p.cls === 0 ? '#1e40af' : '#d97706'}
                      />
                    ))}

                    {/* Underfitting Straight Line */}
                    <line
                      x1="24"
                      y1="55"
                      x2="175"
                      y2="105"
                      stroke="#0f172a"
                      strokeWidth="2.2"
                    />
                  </svg>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb', textAlign: 'center', marginTop: '0.25rem' }}>
                    Rigid Straight Line (High Bias)
                  </div>
                </div>
              </div>
            )}

            {/* ─── ROW 2: REGRESSION ─── */}
            {(selectedModelType === 'all' || selectedModelType === 'regression') && (
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#001f54', paddingLeft: '0.5rem' }}>
                  Regression
                </div>

                {/* 1. Overfitting Regression */}
                <div
                  onMouseEnter={() => setHoveredCard('reg-over')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#ffffff',
                    border: `1.5px solid ${hoveredCard === 'reg-over' ? '#dc2626' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '0.65rem',
                    boxShadow: hoveredCard === 'reg-over' ? '0 4px 14px rgba(220,38,38,0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="100%" height="150" viewBox="0 0 190 150">
                    {/* Axis lines */}
                    <line x1="20" y1="15" x2="20" y2="135" stroke="#0f172a" strokeWidth="1.8" />
                    <line x1="20" y1="135" x2="180" y2="135" stroke="#0f172a" strokeWidth="1.8" />

                    {/* Data Points */}
                    {regPoints.map((p, idx) => (
                      <circle
                        key={`rp1-${idx}`}
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        fill="#d97706"
                      />
                    ))}

                    {/* Overfitting Oscillating Polynomial */}
                    <path
                      d="M 28 85 Q 35 110, 42 98 T 58 122 T 74 132 T 90 114 T 106 124 T 122 92 T 138 90 T 154 62 L 160 80"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.2"
                    />
                  </svg>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#dc2626', textAlign: 'center', marginTop: '0.25rem' }}>
                    Wild Oscillations (Memorizes Noise)
                  </div>
                </div>

                {/* 2. Right Fit Regression */}
                <div
                  onMouseEnter={() => setHoveredCard('reg-right')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#ffffff',
                    border: `1.5px solid ${hoveredCard === 'reg-right' ? '#16a34a' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '0.65rem',
                    boxShadow: hoveredCard === 'reg-right' ? '0 4px 14px rgba(22,163,74,0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="100%" height="150" viewBox="0 0 190 150">
                    {/* Axis lines */}
                    <line x1="20" y1="15" x2="20" y2="135" stroke="#0f172a" strokeWidth="1.8" />
                    <line x1="20" y1="135" x2="180" y2="135" stroke="#0f172a" strokeWidth="1.8" />

                    {/* Data Points */}
                    {regPoints.map((p, idx) => (
                      <circle
                        key={`rp2-${idx}`}
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        fill="#d97706"
                      />
                    ))}

                    {/* Right Fit Clean Parabola */}
                    <path
                      d="M 28 92 Q 80 135, 160 68"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.4"
                    />
                  </svg>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a', textAlign: 'center', marginTop: '0.25rem' }}>
                    Quadratic Parabola (Captures Signal)
                  </div>
                </div>

                {/* 3. Underfitting Regression */}
                <div
                  onMouseEnter={() => setHoveredCard('reg-under')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#ffffff',
                    border: `1.5px solid ${hoveredCard === 'reg-under' ? '#2563eb' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '0.65rem',
                    boxShadow: hoveredCard === 'reg-under' ? '0 4px 14px rgba(37,99,235,0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="100%" height="150" viewBox="0 0 190 150">
                    {/* Axis lines */}
                    <line x1="20" y1="15" x2="20" y2="135" stroke="#0f172a" strokeWidth="1.8" />
                    <line x1="20" y1="135" x2="180" y2="135" stroke="#0f172a" strokeWidth="1.8" />

                    {/* Data Points */}
                    {regPoints.map((p, idx) => (
                      <circle
                        key={`rp3-${idx}`}
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        fill="#d97706"
                      />
                    ))}

                    {/* Underfitting Straight Line */}
                    <line
                      x1="28"
                      y1="115"
                      x2="165"
                      y2="92"
                      stroke="#0284c7"
                      strokeWidth="2.2"
                    />
                  </svg>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb', textAlign: 'center', marginTop: '0.25rem' }}>
                    Straight Linear Fit (Misses Curve)
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostic Footer Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '1.25rem', borderTop: '1px solid #cbd5e1', paddingTop: '1rem' }}>
              <div style={{ background: '#fef2f2', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #fecaca', fontSize: '0.74rem', color: '#991b1b' }}>
                <strong>Overfitting Diagnosis:</strong> Low Train Loss + High Val Loss. Fix: Add L1/L2 regularization, dropout, collect more data.
              </div>
              <div style={{ background: '#f0fdf4', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #bbf7d0', fontSize: '0.74rem', color: '#166534' }}>
                <strong>Right Fit Diagnosis:</strong> Low Train Loss + Low Val Loss. Optimal generalization to new unseen production inputs.
              </div>
              <div style={{ background: '#eff6ff', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #bfdbfe', fontSize: '0.74rem', color: '#1e40af' }}>
                <strong>Underfitting Diagnosis:</strong> High Train Loss + High Val Loss. Fix: Increase capacity, add polynomial features, reduce regularization.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: LEARNING CURVES & EARLY STOPPING (MATCHING USER'S IMAGE 2) ─── */}
      {activeTab === 1 && (
        <div>
          {/* Controls & Epoch Scrubber */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#001f54' }}>
                Epoch: <span style={{ color: '#2563eb' }}>{currentEpoch} / 100</span>
              </span>
              <input
                type="range"
                min="1"
                max="100"
                value={currentEpoch}
                onChange={(e) => setCurrentEpoch(Number(e.target.value))}
                style={{ flex: 1, accentColor: '#001f54', cursor: 'pointer' }}
              />
            </div>

            <button
              onClick={handlePlayEpochs}
              disabled={isEpochPlaying}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                background: isEpochPlaying ? '#94a3b8' : '#001f54',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 900,
                cursor: isEpochPlaying ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <IconSparkles size={14} /> {isEpochPlaying ? 'Training Epochs...' : 'Simulate Training Run'}
            </button>
          </div>

          {/* SVG Learning Curve Canvas */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.5rem 1.25rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
              <svg width="640" height="320" viewBox="0 0 640 320" style={{ maxWidth: '100%' }}>
                {/* ─── AXES ─── */}
                <line x1="70" y1="30" x2="70" y2="260" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="70" y1="260" x2="580" y2="260" stroke="#0f172a" strokeWidth="2.5" />

                {/* Axis Labels */}
                <text x="25" y="145" fontSize="16" fontWeight="900" fill="#0f172a" textAnchor="middle">
                  Loss
                </text>
                <text x="325" y="295" fontSize="15" fontWeight="900" fill="#0f172a" textAnchor="middle">
                  Epochs
                </text>

                {/* ─── REGION LABELS AT TOP ─── */}
                <text x="175" y="25" fontSize="16" fontWeight="900" fill="#001f54" textAnchor="middle">
                  Underfitting
                </text>
                <text x="430" y="25" fontSize="16" fontWeight="900" fill="#dc2626" textAnchor="middle">
                  Overfitting
                </text>

                {/* ─── VERTICAL DASHED DIVIDING LINE AT EPOCH 45 ─── */}
                <line
                  x1="300"
                  y1="35"
                  x2="300"
                  y2="260"
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Early Stopping Pointer & Curved Arrow */}
                <path
                  d="M 215 295 Q 260 305, 296 272"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text x="135" y="295" fontSize="14" fontWeight="900" fill="#0f172a">
                  early stopping
                </text>

                {/* ─── BLUE TRAINING LOSS CURVE ─── */}
                <path
                  d="M 90 70 Q 150 170, 260 215 T 560 240"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                />
                <text x="575" y="244" fontSize="14" fontWeight="900" fill="#0284c7">
                  training
                </text>

                {/* ─── ORANGE VALIDATION LOSS CURVE ─── */}
                <path
                  d="M 90 55 Q 180 150, 300 160 Q 430 165, 560 95"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="3.5"
                />
                <text x="575" y="98" fontSize="14" fontWeight="900" fill="#ea580c">
                  validation
                </text>

                {/* ─── CURRENT SCRUBBER POSITION LINE & DOTS ─── */}
                {(() => {
                  const scrubX = 90 + ((currentEpoch - 1) / 99) * 470;
                  return (
                    <g>
                      <line
                        x1={scrubX}
                        y1="35"
                        x2={scrubX}
                        y2="260"
                        stroke="#4f46e5"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <circle cx={scrubX} cy={260} r="5" fill="#4f46e5" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Live Metrics at Current Epoch */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginTop: '1rem',
              borderTop: '1px solid #cbd5e1',
              paddingTop: '1rem'
            }}>
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase' }}>Training Loss</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0284c7' }}>{curTrainLoss}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Continues dropping asymptotically</div>
              </div>

              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#c2410c', textTransform: 'uppercase' }}>Validation Loss</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ea580c' }}>{curValLoss}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Minimum achieved at Epoch 45</div>
              </div>

              <div style={{
                background: currentEpoch < 40 ? '#eff6ff' : currentEpoch <= 50 ? '#ecfdf5' : '#fef2f2',
                border: `1.5px solid ${currentEpoch < 40 ? '#93c5fd' : currentEpoch <= 50 ? '#6ee7b7' : '#fca5a5'}`,
                borderRadius: '10px',
                padding: '0.75rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, color: currentEpoch < 40 ? '#1e40af' : currentEpoch <= 50 ? '#065f46' : '#991b1b', textTransform: 'uppercase' }}>
                  Current Zone Status
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 900, color: currentEpoch < 40 ? '#1e40af' : currentEpoch <= 50 ? '#047857' : '#dc2626', marginTop: '0.2rem' }}>
                  {currentEpoch < 40 && 'Underfitting (Keep Training)'}
                  {currentEpoch >= 40 && currentEpoch <= 50 && 'Optimal Early Stopping Point!'}
                  {currentEpoch > 50 && 'Overfitting! (Learning Noise)'}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem' }}>
                  {currentEpoch < 40 && 'Model is still improving on validation data.'}
                  {currentEpoch >= 40 && currentEpoch <= 50 && 'Validation loss is at its lowest global point.'}
                  {currentEpoch > 50 && 'Generalization is degrading as model memorizes noise.'}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 2: POLYNOMIAL DEGREE MORPH SIMULATOR ─── */}
      {activeTab === 2 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#001f54' }}>
                Polynomial Degree: <span style={{ color: polyMetrics.color }}>d = {polyDegree}</span>
              </span>
              <input
                type="range"
                min="1"
                max="12"
                value={polyDegree}
                onChange={(e) => setPolyDegree(Number(e.target.value))}
                style={{ flex: 1, accentColor: '#001f54', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[
                { deg: 1, label: 'Deg 1 (Underfit)' },
                { deg: 2, label: 'Deg 2 (Right Fit)' },
                { deg: 12, label: 'Deg 12 (Overfit)' }
              ].map((b) => (
                <button
                  key={b.deg}
                  onClick={() => setPolyDegree(b.deg)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${polyDegree === b.deg ? '#001f54' : '#cbd5e1'}`,
                    background: polyDegree === b.deg ? '#001f54' : '#ffffff',
                    color: polyDegree === b.deg ? '#ffffff' : '#475569',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Morph Canvas */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)',
            marginBottom: '1.25rem'
          }}>
            <svg width="100%" height="220" viewBox="0 0 600 220">
              {/* Axes */}
              <line x1="40" y1="20" x2="40" y2="190" stroke="#0f172a" strokeWidth="2" />
              <line x1="40" y1="190" x2="570" y2="190" stroke="#0f172a" strokeWidth="2" />

              {/* Data points */}
              {regPoints.map((p, idx) => (
                <circle
                  key={`morp-${idx}`}
                  cx={p.x * 3.4}
                  cy={p.y * 1.2}
                  r="4"
                  fill="#d97706"
                />
              ))}

              {/* Dynamic Polynomial Curve */}
              {polyDegree === 1 && (
                <line x1="80" y1="145" x2="540" y2="105" stroke="#0284c7" strokeWidth="3" />
              )}
              {polyDegree === 2 && (
                <path d="M 80 115 Q 260 170, 540 85" fill="none" stroke="#16a34a" strokeWidth="3.5" />
              )}
              {polyDegree === 3 && (
                <path d="M 80 118 Q 230 168, 380 145 T 540 82" fill="none" stroke="#16a34a" strokeWidth="3.2" />
              )}
              {polyDegree >= 4 && polyDegree <= 7 && (
                <path d="M 80 112 Q 150 140, 220 160 Q 300 130, 380 155 Q 460 110, 540 75" fill="none" stroke="#d97706" strokeWidth="3" />
              )}
              {polyDegree > 7 && (
                <path d="M 75 95 Q 110 165, 140 120 T 210 170 T 280 130 T 350 165 T 420 100 T 480 160 T 545 60" fill="none" stroke="#dc2626" strokeWidth="3" />
              )}
            </svg>

            {/* Live Diagnosis Bar */}
            <div style={{
              background: '#f8fafc',
              border: `1.5px solid ${polyMetrics.color}`,
              borderRadius: '12px',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '0.75rem'
            }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 800 }}>DIAGNOSIS:</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 900, color: polyMetrics.color, marginLeft: '0.4rem' }}>
                  {polyMetrics.status}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.78rem', fontWeight: 800 }}>
                <span style={{ color: '#001f54' }}>Train MSE: <strong>{polyMetrics.trainErr}</strong></span>
                <span style={{ color: polyMetrics.color }}>Test MSE: <strong>{polyMetrics.valErr}</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 3: REMEDIES & REGULARIZATION MATRIX ─── */}
      {activeTab === 3 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            
            {/* Fixing Underfitting Card */}
            <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1e40af', fontWeight: 900, fontSize: '0.88rem', marginBottom: '0.6rem' }}>
                How to Fix UNDERFITTING (High Bias)
              </div>
              <ul style={{ fontSize: '0.76rem', color: '#1e3a8a', lineHeight: '1.6', margin: '0 0 0.85rem', paddingLeft: '1.2rem' }}>
                <li><strong>Increase Model Complexity:</strong> Switch to a non-linear algorithm (e.g. Random Forest, Neural Network, higher polynomial degree).</li>
                <li><strong>Feature Engineering:</strong> Add interaction features (x1 * x2), polynomial terms (x^2), or domain-specific indicators.</li>
                <li><strong>Reduce Regularization:</strong> Decrease alpha/lambda penalties so the model is free to fit the underlying curvature.</li>
              </ul>
              <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.65rem', fontFamily: 'Consolas, monospace', fontSize: '0.72rem', color: '#1e40af', lineHeight: '1.4' }}>
                <div># Fix: Increase capacity & add features</div>
                <div>model = RandomForestRegressor(n_estimators=100)</div>
              </div>
            </div>

            {/* Fixing Overfitting Card */}
            <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#991b1b', fontWeight: 900, fontSize: '0.88rem', marginBottom: '0.6rem' }}>
                How to Fix OVERFITTING (High Variance)
              </div>
              <ul style={{ fontSize: '0.76rem', color: '#7f1d1d', lineHeight: '1.6', margin: '0 0 0.85rem', paddingLeft: '1.2rem' }}>
                <li><strong>L1 / L2 Regularization:</strong> Apply Ridge (L2 penalty) to shrink weights or Lasso (L1 penalty) to zero out useless features.</li>
                <li><strong>Collect More Training Data:</strong> More data dilutes sample noise and exposes the true underlying distribution.</li>
                <li><strong>Early Stopping & Pruning:</strong> Halt training when validation loss stops improving; limit decision tree max_depth.</li>
              </ul>
              <div style={{ background: '#ffffff', border: '1px solid #fca5a5', borderRadius: '8px', padding: '0.65rem', fontFamily: 'Consolas, monospace', fontSize: '0.72rem', color: '#991b1b', lineHeight: '1.4' }}>
                <div># Fix: Add L2 Ridge penalty</div>
                <div>model = Ridge(alpha=1.0) # Shrinks w → 0</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
// ─── BIAS VS VARIANCE INTERACTIVE STUDIO DIAGRAM ───────────────────────────
const BiasVsVarianceDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Tab 0: Complexity Slider (1 to 100)
  const [complexity, setComplexity] = useState(50);
  const [isFindingOptimum, setIsFindingOptimum] = useState(false);

  // Tab 1: Dartboard Throw State
  const [dartThrows, setDartThrows] = useState(1);
  const [isThrowing, setIsThrowing] = useState(false);

  // Mathematical error calculations as a function of complexity c in [1, 100]
  const calculateErrors = (c) => {
    // Bias^2: starts high at 0.85 and drops smoothly
    const biasSq = (0.85 * Math.exp(-c / 25) + 0.04).toFixed(3);
    // Variance: starts near 0.02 and grows exponentially
    const variance = (0.02 + 0.82 * Math.pow(c / 100, 2.4)).toFixed(3);
    // Irreducible noise
    const noise = (0.08).toFixed(3);
    // Total Error = Bias^2 + Variance + noise
    const totalError = (parseFloat(biasSq) + parseFloat(variance) + parseFloat(noise)).toFixed(3);

    return { biasSq, variance, noise, totalError };
  };

  const { biasSq, variance, noise, totalError } = calculateErrors(complexity);

  const handleFindOptimum = () => {
    setIsFindingOptimum(true);
    let c = complexity;
    const target = 50; // Optimum sweet spot
    const step = c < target ? 1 : -1;

    const interval = setInterval(() => {
      if (c === target) {
        clearInterval(interval);
        setIsFindingOptimum(false);
        triggerConfetti(0.5, 0.6);
      } else {
        c += step;
        setComplexity(c);
      }
    }, 25);
  };

  const handleThrowDarts = () => {
    setIsThrowing(true);
    setTimeout(() => {
      setDartThrows((prev) => prev + 1);
      setIsThrowing(false);
      triggerConfetti(0.5, 0.6);
    }, 450);
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#f0f4fc',
              color: '#001f54',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #c2d4f2'
            }}>
              STATISTICAL LEARNING THEORY
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              Bias vs. Variance Trade-Off
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Interactive Error vs Complexity curve, bullseye dartboard matrix, and generalization error decomposition.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Trade-Off Error Curve', tab: 0 },
            { label: 'Bullseye Dartboard Matrix', tab: 1 },
            { label: 'Mathematical Decomposition', tab: 2 },
            { label: 'Remedies & Ensembling', tab: 3 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(0,31,84,0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: TRADE-OFF ERROR CURVE (MATCHING USER'S ILLUSTRATION) ─── */}
      {activeTab === 0 && (
        <div>
          {/* Complexity Slider & Preset Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#001f54' }}>
                Model Complexity: <span style={{ color: '#2563eb' }}>{complexity}%</span>
              </span>
              <input
                type="range"
                min="5"
                max="95"
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                style={{ flex: 1, accentColor: '#001f54', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setComplexity(15)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  background: complexity === 15 ? '#eff6ff' : '#ffffff',
                  color: '#1e40af',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                High Bias (Low Complexity)
              </button>
              <button
                onClick={handleFindOptimum}
                disabled={isFindingOptimum}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#001f54',
                  color: '#ffffff',
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <IconSparkles size={13} /> {isFindingOptimum ? 'Finding...' : 'Optimum Balance (50%)'}
              </button>
              <button
                onClick={() => setComplexity(85)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  background: complexity === 85 ? '#fef2f2' : '#ffffff',
                  color: '#dc2626',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                High Variance (High Complexity)
              </button>
            </div>
          </div>

          {/* SVG Vector Canvas for Bias-Variance Trade-Off Curve */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #001f54',
            borderRadius: '16px',
            padding: '1.75rem 1.25rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.04)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
              <svg width="660" height="340" viewBox="0 0 660 340" style={{ maxWidth: '100%' }}>
                <defs>
                  <marker id="axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#0f172a" />
                  </marker>
                  <marker id="pink-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                  </marker>
                  <marker id="blue-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#3b82f6" />
                  </marker>
                </defs>

                {/* ─── AXES WITH ARROWHEADS ─── */}
                {/* Vertical Axis: Error */}
                <line
                  x1="70"
                  y1="280"
                  x2="70"
                  y2="30"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  markerEnd="url(#axis-arrow)"
                />
                <text x="35" y="155" fontSize="16" fontWeight="900" fill="#0f172a" textAnchor="middle">
                  Error
                </text>

                {/* Horizontal Axis: Model Complexity */}
                <line
                  x1="70"
                  y1="280"
                  x2="600"
                  y2="280"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  markerEnd="url(#axis-arrow)"
                />
                <text x="340" y="315" fontSize="15" fontWeight="900" fill="#0f172a" textAnchor="middle">
                  Model complexity
                </text>

                {/* ─── OPTIMUM MODEL COMPLEXITY (VERTICAL DASHED LINE) ─── */}
                <line
                  x1="330"
                  y1="35"
                  x2="330"
                  y2="280"
                  stroke="#94a3b8"
                  strokeWidth="1.8"
                  strokeDasharray="5 5"
                />
                <text
                  x="322"
                  y="120"
                  fontSize="11"
                  fontWeight="800"
                  fill="#64748b"
                  transform="rotate(-90 322 120)"
                  textAnchor="middle"
                >
                  Optimum model complexity
                </text>

                {/* ─── BIAS^2 CURVE (PINK/RED #f43f5e) ─── */}
                <path
                  d="M 90 50 Q 200 210, 335 235 T 580 258"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3.2"
                  markerEnd="url(#pink-arrow)"
                />
                <text x="555" y="245" fontSize="15" fontWeight="900" fill="#f43f5e">
                  Bias²
                </text>

                {/* ─── VARIANCE CURVE (BLUE #3b82f6) ─── */}
                <path
                  d="M 90 262 Q 220 260, 335 235 T 580 50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.2"
                  markerEnd="url(#blue-arrow)"
                />
                <text x="590" y="115" fontSize="15" fontWeight="900" fill="#3b82f6">
                  Variance
                </text>

                {/* ─── TOTAL ERROR CURVE (CHARCOAL / SLATE #334155) ─── */}
                <path
                  d="M 90 40 Q 330 250, 570 50"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3.5"
                />
                {/* Dots at the ends of total error */}
                <circle cx="90" cy="40" r="4.5" fill="#334155" />
                <circle cx="570" cy="50" r="4.5" fill="#334155" />
                <text x="500" y="60" fontSize="15" fontWeight="900" fill="#334155">
                  Total error
                </text>

                {/* ─── INTERACTIVE PROBE POSITION ─── */}
                {(() => {
                  const probeX = 90 + ((complexity - 5) / 90) * 480;
                  return (
                    <g>
                      <line
                        x1={probeX}
                        y1="35"
                        x2={probeX}
                        y2="280"
                        stroke="#001f54"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <circle cx={probeX} cy={280} r="6" fill="#001f54" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Live Error Breakdown Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.85rem',
              marginTop: '1.25rem',
              borderTop: '1px solid #cbd5e1',
              paddingTop: '1rem'
            }}>
              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase' }}>Bias² (Underfit)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f43f5e' }}>{biasSq}</div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Decreases as capacity rises</div>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>Variance (Overfit)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#3b82f6' }}>{variance}</div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Increases as capacity rises</div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Noise (σ²)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#64748b' }}>{noise}</div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Irreducible data noise</div>
              </div>

              <div style={{
                background: complexity >= 42 && complexity <= 58 ? '#ecfdf5' : '#f8fafc',
                border: `2px solid ${complexity >= 42 && complexity <= 58 ? '#10b981' : '#001f54'}`,
                borderRadius: '10px',
                padding: '0.75rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: complexity >= 42 && complexity <= 58 ? '#047857' : '#001f54', textTransform: 'uppercase' }}>
                  Total Generalization Error
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: complexity >= 42 && complexity <= 58 ? '#059669' : '#001f54' }}>
                  {totalError}
                </div>
                <div style={{ fontSize: '0.66rem', fontWeight: 700, color: complexity >= 42 && complexity <= 58 ? '#047857' : '#64748b' }}>
                  {complexity >= 42 && complexity <= 58 ? 'Optimal Trade-Off Minimum!' : 'Sum: Bias² + Var + σ²'}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: BULLSEYE DARTBOARD TARGET MATRIX ─── */}
      {activeTab === 1 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 700 }}>
              The 4 Quadrants of Model Prediction Stability (Simulated Darts: {dartThrows * 6})
            </span>
            <button
              onClick={handleThrowDarts}
              disabled={isThrowing}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: '#001f54',
                color: '#ffffff',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <IconSparkles size={14} /> Throw New Volley of Darts
            </button>
          </div>

          {/* 2x2 Target Matrix Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            
            {/* 1. Low Bias & Low Variance (IDEAL) */}
            <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#166534', marginBottom: '0.35rem' }}>
                Low Bias & Low Variance (IDEAL)
              </div>
              <div style={{ fontSize: '0.72rem', color: '#15803d', marginBottom: '0.75rem' }}>
                Accurate on average and highly consistent across datasets.
              </div>
              <svg width="150" height="150" viewBox="0 0 150 150" style={{ margin: '0 auto' }}>
                <circle cx="75" cy="75" r="65" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="25" fill="#bbf7d0" stroke="#86efac" strokeWidth="2" />
                <circle cx="75" cy="75" r="10" fill="#16a34a" />
                {/* Darts tightly clustered in center */}
                <circle cx="73" cy="74" r="3.5" fill="#15803d" />
                <circle cx="77" cy="72" r="3.5" fill="#15803d" />
                <circle cx="75" cy="78" r="3.5" fill="#15803d" />
                <circle cx="71" cy="76" r="3.5" fill="#15803d" />
                <circle cx="78" cy="77" r="3.5" fill="#15803d" />
              </svg>
            </div>

            {/* 2. High Bias & Low Variance (CONSISTENTLY WRONG) */}
            <div style={{ background: '#fefce8', border: '2px solid #ca8a04', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#854d0e', marginBottom: '0.35rem' }}>
                High Bias & Low Variance (Underfitting)
              </div>
              <div style={{ fontSize: '0.72rem', color: '#a16207', marginBottom: '0.75rem' }}>
                Consistently makes the same wrong assumption (misses target).
              </div>
              <svg width="150" height="150" viewBox="0 0 150 150" style={{ margin: '0 auto' }}>
                <circle cx="75" cy="75" r="65" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="25" fill="#fef08a" stroke="#fde047" strokeWidth="2" />
                <circle cx="75" cy="75" r="10" fill="#ca8a04" />
                {/* Darts tightly clustered off-target in upper-right */}
                <circle cx="115" cy="38" r="3.5" fill="#854d0e" />
                <circle cx="118" cy="35" r="3.5" fill="#854d0e" />
                <circle cx="112" cy="42" r="3.5" fill="#854d0e" />
                <circle cx="120" cy="40" r="3.5" fill="#854d0e" />
                <circle cx="116" cy="44" r="3.5" fill="#854d0e" />
              </svg>
            </div>

            {/* 3. Low Bias & High Variance (UNSTABLE / OVERFITTING) */}
            <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e40af', marginBottom: '0.35rem' }}>
                Low Bias & High Variance (Overfitting)
              </div>
              <div style={{ fontSize: '0.72rem', color: '#2563eb', marginBottom: '0.75rem' }}>
                Centered around bullseye on average, but wildly scattered.
              </div>
              <svg width="150" height="150" viewBox="0 0 150 150" style={{ margin: '0 auto' }}>
                <circle cx="75" cy="75" r="65" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="25" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="2" />
                <circle cx="75" cy="75" r="10" fill="#2563eb" />
                {/* Darts scattered in all directions around center */}
                <circle cx="70" cy="40" r="3.5" fill="#1d4ed8" />
                <circle cx="110" cy="80" r="3.5" fill="#1d4ed8" />
                <circle cx="45" cy="95" r="3.5" fill="#1d4ed8" />
                <circle cx="85" cy="115" r="3.5" fill="#1d4ed8" />
                <circle cx="50" cy="55" r="3.5" fill="#1d4ed8" />
              </svg>
            </div>

            {/* 4. High Bias & High Variance (WORST CASE) */}
            <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#991b1b', marginBottom: '0.35rem' }}>
                High Bias & High Variance (WORST CASE)
              </div>
              <div style={{ fontSize: '0.72rem', color: '#dc2626', marginBottom: '0.75rem' }}>
                Both systematically inaccurate and wildly erratic.
              </div>
              <svg width="150" height="150" viewBox="0 0 150 150" style={{ margin: '0 auto' }}>
                <circle cx="75" cy="75" r="65" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="75" r="25" fill="#fecaca" stroke="#fca5a5" strokeWidth="2" />
                <circle cx="75" cy="75" r="10" fill="#ef4444" />
                {/* Darts scattered far away in bottom right quadrant */}
                <circle cx="110" cy="110" r="3.5" fill="#b91c1c" />
                <circle cx="125" cy="90" r="3.5" fill="#b91c1c" />
                <circle cx="95" cy="130" r="3.5" fill="#b91c1c" />
                <circle cx="130" cy="125" r="3.5" fill="#b91c1c" />
                <circle cx="105" cy="95" r="3.5" fill="#b91c1c" />
              </svg>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 2: MATHEMATICAL DECOMPOSITION BREAKDOWN ─── */}
      {activeTab === 2 && (
        <div>
          {/* Formula Display Box */}
          <div style={{
            background: '#001f54',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
            boxShadow: '0 8px 24px rgba(0,31,84,0.2)'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#93c5fd', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Generalization Expected Prediction Error Decomposition
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '0.03em' }}>
              Expected Error(x) = <span style={{ color: '#f43f5e' }}>Bias²[f̂(x)]</span> + <span style={{ color: '#60a5fa' }}>Var[f̂(x)]</span> + <span style={{ color: '#fbbf24' }}>σ²</span>
            </div>
          </div>

          {/* 3 Component Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#fff1f2', border: '1.5px solid #f43f5e', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#be123c', marginBottom: '0.4rem' }}>
                1. Bias² [f̂(x)] = (E[f̂(x)] - f(x))²
              </div>
              <p style={{ fontSize: '0.74rem', color: '#881337', margin: 0, lineHeight: '1.5' }}>
                The systematic error arising from incorrect algorithmic assumptions (e.g. enforcing linearity on non-linear physics).
              </p>
            </div>

            <div style={{ background: '#eff6ff', border: '1.5px solid #3b82f6', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e40af', marginBottom: '0.4rem' }}>
                2. Var [f̂(x)] = E[(f̂(x) - E[f̂(x)])²]
              </div>
              <p style={{ fontSize: '0.74rem', color: '#1e3a8a', margin: 0, lineHeight: '1.5' }}>
                The variance across training samples. Measures how violently model predictions fluctuate when trained on different dataset splits.
              </p>
            </div>

            <div style={{ background: '#fefce8', border: '1.5px solid #eab308', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#854d0e', marginBottom: '0.4rem' }}>
                3. Irreducible Noise (σ²)
              </div>
              <p style={{ fontSize: '0.74rem', color: '#713f12', margin: 0, lineHeight: '1.5' }}>
                Random measurement noise in sensor readings, human labeling noise, or unobserved hidden variables. Cannot be reduced by any ML model.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: REMEDIES & ENSEMBLING ─── */}
      {activeTab === 3 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            
            {/* Bagging Card */}
            <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#166534', marginBottom: '0.5rem' }}>
                Bagging (Bootstrap Aggregation) → Reduces VARIANCE
              </div>
              <p style={{ fontSize: '0.75rem', color: '#14532d', lineHeight: '1.5', margin: '0 0 0.75rem' }}>
                Trains multiple high-capacity, deep decision trees independently in parallel on bootstrap sample subsets and averages their outputs.
              </p>
              <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 800 }}>
                Example: <strong>Random Forest Regressor / Classifier</strong>
              </div>
            </div>

            {/* Boosting Card */}
            <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#1e40af', marginBottom: '0.5rem' }}>
                Boosting (Sequential Error Fitting) → Reduces BIAS
              </div>
              <p style={{ fontSize: '0.75rem', color: '#1e3a8a', lineHeight: '1.5', margin: '0 0 0.75rem' }}>
                Trains a sequence of weak, shallow trees sequentially where each successive tree explicitly fits the residual errors of prior trees.
              </p>
              <div style={{ fontSize: '0.72rem', color: '#1e40af', fontWeight: 800 }}>
                Example: <strong>Gradient Boosting, XGBoost, LightGBM</strong>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

// ─── CAPSTONE MINI PROJECT: HOUSE PRICE PIPELINE STUDIO (SCRATCH-STYLE) ────
const HousePricePipelineStudio = () => {
  // Selected Blocks for 5 Pipeline Stages
  const [pipeline, setPipeline] = useState({
    data: 'ca_housing', // 'ca_housing' | 'tiny_sample'
    split: 'split_80_10_10', // 'split_80_10_10' | 'split_no_test'
    preprocess: 'scale_train_only', // 'scale_train_only' | 'scale_data_leak' | 'scale_none'
    model: 'model_poly2', // 'model_poly2' | 'model_linear' | 'model_poly15'
    safeguards: 'reg_ridge_l2' // 'reg_ridge_l2' | 'reg_none'
  });

  const [activeTab, setActiveTab] = useState(0); // 0: Visual Builder, 1: Live House Tester, 2: Python Code
  const [isRunning, setIsRunning] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [hasExecuted, setHasExecuted] = useState(true);

  // House Tester Sliders
  const [testSqft, setTestSqft] = useState(2400);
  const [testBeds, setTestBeds] = useState(3);
  const [testIncome, setTestIncome] = useState(6.5);

  // Block definitions catalog
  const blockCatalog = {
    data: [
      { id: 'ca_housing', label: 'California Housing (20,000 Houses, 5 Features)', tag: 'Recommended', color: '#10b981', shadow: '#059669', bg: '#ecfdf5', desc: 'Representative full dataset with sqft, beds, income, and prices.' },
      { id: 'tiny_sample', label: 'Tiny Sample (15 Houses Only)', tag: 'High Variance Risk', color: '#059669', shadow: '#047857', bg: '#f0fdf4', desc: 'Too small dataset leading to volatile generalization.' }
    ],
    split: [
      { id: 'split_80_10_10', label: '80% Train / 10% Val / 10% Test Split', tag: 'Clean Isolation', color: '#001f54', shadow: '#00122e', bg: '#f0f4fc', desc: 'Standard 3-way partition with test vault preservation.' },
      { id: 'split_no_test', label: '100% Train / 0% Test (No Partition)', tag: 'Fatal Memorization', color: '#1e3a8a', shadow: '#0f172a', bg: '#eff6ff', desc: 'Evaluates on training data; no unseen benchmark.' }
    ],
    preprocess: [
      { id: 'scale_train_only', label: 'StandardScaler on X_train ONLY', tag: 'Zero Leakage', color: '#6366f1', shadow: '#4f46e5', bg: '#ede9fe', desc: 'Fits scaler strictly on train; transforms test set.' },
      { id: 'scale_data_leak', label: 'Scaler on Entire Dataset Before Split', tag: 'Data Leakage Alert', color: '#4f46e5', shadow: '#3730a3', bg: '#e0e7ff', desc: 'Leaks test statistics into training phase.' },
      { id: 'scale_none', label: 'No Scaling (Raw Numerical Inputs)', tag: 'Unnormalized', color: '#4338ca', shadow: '#312e81', bg: '#f5f3ff', desc: 'Features have unbalanced numerical scales.' }
    ],
    model: [
      { id: 'model_poly2', label: 'Polynomial Degree 2 (Quadratic Parabola)', tag: 'Optimal Curve', color: '#f59e0b', shadow: '#d97706', bg: '#fef3c7', desc: 'Captures non-linear price growth cleanly.' },
      { id: 'model_linear', label: 'Linear Regression (Degree 1 Straight Line)', tag: 'High Bias Underfit', color: '#d97706', shadow: '#b45309', bg: '#fffbeb', desc: 'Too rigid to capture housing valuation curvature.' },
      { id: 'model_poly15', label: 'Polynomial Degree 15 (Complex Squiggle)', tag: 'High Variance Overfit', color: '#b45309', shadow: '#78350f', bg: '#fefce8', desc: 'Oscillates wildly through training noise.' }
    ],
    safeguards: [
      { id: 'reg_ridge_l2', label: 'L2 Ridge Regularization (α = 1.0) + Early Stopping', tag: 'Optimal Safeguard', color: '#8b5cf6', shadow: '#6d28d9', bg: '#f5f3ff', desc: 'Penalizes large weights and halts at min val loss.' },
      { id: 'reg_none', label: 'No Regularization (Unconstrained Capacity)', tag: 'Unbounded Weights', color: '#7c3aed', shadow: '#5b21b6', bg: '#faf5ff', desc: 'No penalty on complex weight explosions.' }
    ]
  };

  // Evaluate pipeline diagnostics
  const evaluatePipeline = () => {
    // 1. Data Leakage
    if (pipeline.preprocess === 'scale_data_leak') {
      return {
        status: 'leakage',
        badge: 'CRITICAL ERROR: DATA LEAKAGE',
        color: '#dc2626',
        bg: '#fef2f2',
        border: '#ef4444',
        shadow: '#b91c1c',
        trainR2: 0.96,
        valR2: 0.95,
        testR2: 0.61,
        diagnosis: 'Scaler was fit on the full dataset before splitting! Test distribution statistics leaked into training, giving false high validation scores that collapse on unseen production houses.'
      };
    }

    // 2. No Split
    if (pipeline.split === 'split_no_test') {
      return {
        status: 'no_split',
        badge: 'FATAL FLAW: TRAINING MEMORIZATION',
        color: '#dc2626',
        bg: '#fef2f2',
        border: '#ef4444',
        shadow: '#b91c1c',
        trainR2: 0.99,
        valR2: 'N/A',
        testR2: 0.18,
        diagnosis: '100% of data was used for training with 0% held-out test data! You are measuring pure memorization rather than real-world generalization.'
      };
    }

    // 3. Tiny Dataset + High Poly (Extreme Overfit)
    if (pipeline.data === 'tiny_sample' && pipeline.model === 'model_poly15') {
      return {
        status: 'extreme_overfit',
        badge: 'SEVERE OVERFITTING: HIGH VARIANCE',
        color: '#dc2626',
        bg: '#fef2f2',
        border: '#ef4444',
        shadow: '#b91c1c',
        trainR2: 1.00,
        valR2: 0.12,
        testR2: 0.05,
        diagnosis: 'A 15th-degree polynomial fitted to only 15 houses completely memorizes the points. Predictions oscillate by millions of dollars between data points!'
      };
    }

    // 4. High Poly without Regularization
    if (pipeline.model === 'model_poly15' && pipeline.safeguards === 'reg_none') {
      return {
        status: 'overfit',
        badge: 'OVERFITTING ALERT (HIGH VARIANCE)',
        color: '#d97706',
        bg: '#fffbeb',
        border: '#f59e0b',
        shadow: '#b45309',
        trainR2: 0.99,
        valR2: 0.68,
        testR2: 0.42,
        diagnosis: 'Degree 15 polynomial has excessive capacity without L2 Ridge regularization. The model learned random noise fluctuations in the California housing prices.'
      };
    }

    // 5. Linear Regression (Underfitting)
    if (pipeline.model === 'model_linear') {
      return {
        status: 'underfit',
        badge: 'UNDERFITTING ALERT (HIGH BIAS)',
        color: '#2563eb',
        bg: '#eff6ff',
        border: '#3b82f6',
        shadow: '#1d4ed8',
        trainR2: 0.62,
        valR2: 0.61,
        testR2: 0.60,
        diagnosis: 'Linear model is too rigid to capture non-linear real estate price compounding (e.g. square footage exponential value in coastal zip codes).'
      };
    }

    // 6. High Poly with Ridge (Decent regularization)
    if (pipeline.model === 'model_poly15' && pipeline.safeguards === 'reg_ridge_l2') {
      return {
        status: 'good',
        badge: 'REGULARIZED COMPLEX MODEL',
        color: '#059669',
        bg: '#ecfdf5',
        border: '#10b981',
        shadow: '#047857',
        trainR2: 0.93,
        valR2: 0.91,
        testR2: 0.90,
        diagnosis: 'L2 Ridge penalty successfully shrank the 15th-degree polynomial weights, preventing runaway oscillations and salvaging test performance!'
      };
    }

    // 7. Optimal Champion Pipeline (Poly 2 + Clean Split + Ridge)
    return {
      status: 'champion',
      badge: 'CHAMPION ML PIPELINE (OPTIMAL GENERALIZATION)',
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#22c55e',
      shadow: '#15803d',
      trainR2: 0.94,
      valR2: 0.93,
      testR2: 0.93,
      diagnosis: 'Perfection! Balanced capacity (Degree 2 quadratic), clean 3-way split, zero data leakage, and L2 Ridge regularization achieve 93.4% real-world test generalization!'
    };
  };

  const results = evaluatePipeline();

  // Run pipeline execution animation
  const handleExecutePipeline = () => {
    setIsRunning(true);
    setExecutionStep(1);

    const interval = setInterval(() => {
      setExecutionStep((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsRunning(false);
          setHasExecuted(true);
          if (results.status === 'champion') {
            triggerConfetti(0.5, 0.6);
          }
          return 5;
        }
        return prev + 1;
      });
    }, 450);
  };

  // Calculate live predicted house price based on pipeline configuration and sliders
  const calculatePredictedPrice = () => {
    // Base formula: 150k + 130*sqft + 20k*beds + 35k*income + 0.015*(sqft^1.8)
    const basePrice = 150000 + 130 * testSqft + 20000 * testBeds + 35000 * testIncome + 0.015 * Math.pow(testSqft, 1.8);

    if (results.status === 'underfit') {
      // Linear model underestimates large homes and overestimates small homes
      return Math.round(180000 + 95 * testSqft + 15000 * testBeds);
    }
    if (results.status === 'overfit' || results.status === 'extreme_overfit') {
      // Overfitted model oscillates wildly based on sqft parity
      const wobble = Math.sin(testSqft / 70) * 220000;
      return Math.max(120000, Math.round(basePrice + wobble));
    }
    return Math.round(basePrice);
  };

  const predictedPrice = calculatePredictedPrice();

  return (
    <div style={{
      background: '#ffffff',
      border: '2px solid #001f54',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 31, 84, 0.08)',
      overflow: 'hidden'
    }}>
      {/* ─── TOP CAPSTONE BANNER ───────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '2px solid #f0f4fc',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#10b981',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              borderBottom: '2px solid #059669',
              textTransform: 'uppercase'
            }}>
              CAPSTONE MINI PROJECT
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#001f54', margin: 0 }}>
              Visual ML Pipeline Builder: Predict House Prices
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0' }}>
            Snap modular blocks together to assemble a full Machine Learning regression pipeline.
          </p>
        </div>

        {/* 2D Tactile Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          background: '#f0f4fc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #c2d4f2',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Pipeline Builder Canvas', tab: 0 },
            { label: 'Live Property Valuation Tester', tab: 1 },
            { label: 'Generated Python Code', tab: 2 }
          ].map((t) => (
            <button
              key={t.tab}
              onClick={() => setActiveTab(t.tab)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === t.tab ? '#001f54' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#001f54',
                fontSize: '0.78rem',
                fontWeight: 900,
                cursor: 'pointer',
                borderBottom: activeTab === t.tab ? '3px solid #00122e' : 'none',
                boxShadow: activeTab === t.tab ? '0 2px 8px rgba(0,31,84,0.2)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 0: VISUAL PIPELINE BUILDER CANVAS ─────────────────── */}
      {activeTab === 0 && (
        <div>
          {/* Main 2-Column Studio Grid: Left Toolbox, Right Canvas & Results */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            
            {/* LEFT: BLOCK TOOLBOX PALETTE */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #001f54',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: '0 4px 0 #001f54'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <IconSparkles size={16} /> Block Toolbox (Click to Snap)
              </div>

              {/* Stage 1: Data Ingestion Blocks */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  1. Data Ingestion Blocks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {blockCatalog.data.map((blk) => (
                    <button
                      key={blk.id}
                      onClick={() => setPipeline((prev) => ({ ...prev, data: blk.id }))}
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '10px',
                        border: `2px solid ${pipeline.data === blk.id ? blk.color : '#cbd5e1'}`,
                        background: pipeline.data === blk.id ? blk.bg : '#ffffff',
                        borderBottom: `4px solid ${pipeline.data === blk.id ? blk.shadow : '#94a3b8'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</span>
                        <span style={{ fontSize: '0.64rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {blk.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{blk.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage 2: Splitting Strategy Blocks */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  2. Partitioning Strategy Blocks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {blockCatalog.split.map((blk) => (
                    <button
                      key={blk.id}
                      onClick={() => setPipeline((prev) => ({ ...prev, split: blk.id }))}
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '10px',
                        border: `2px solid ${pipeline.split === blk.id ? blk.color : '#cbd5e1'}`,
                        background: pipeline.split === blk.id ? blk.bg : '#ffffff',
                        borderBottom: `4px solid ${pipeline.split === blk.id ? blk.shadow : '#94a3b8'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</span>
                        <span style={{ fontSize: '0.64rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {blk.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{blk.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage 3: Preprocessing Blocks */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6366f1', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  3. Preprocessing & Scaling Blocks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {blockCatalog.preprocess.map((blk) => (
                    <button
                      key={blk.id}
                      onClick={() => setPipeline((prev) => ({ ...prev, preprocess: blk.id }))}
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '10px',
                        border: `2px solid ${pipeline.preprocess === blk.id ? blk.color : '#cbd5e1'}`,
                        background: pipeline.preprocess === blk.id ? blk.bg : '#ffffff',
                        borderBottom: `4px solid ${pipeline.preprocess === blk.id ? blk.shadow : '#94a3b8'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</span>
                        <span style={{ fontSize: '0.64rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {blk.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{blk.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage 4: Model Architecture Blocks */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  4. Model Architecture Blocks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {blockCatalog.model.map((blk) => (
                    <button
                      key={blk.id}
                      onClick={() => setPipeline((prev) => ({ ...prev, model: blk.id }))}
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '10px',
                        border: `2px solid ${pipeline.model === blk.id ? blk.color : '#cbd5e1'}`,
                        background: pipeline.model === blk.id ? blk.bg : '#ffffff',
                        borderBottom: `4px solid ${pipeline.model === blk.id ? blk.shadow : '#94a3b8'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</span>
                        <span style={{ fontSize: '0.64rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {blk.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{blk.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage 5: Regularization & Safeguards Blocks */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8b5cf6', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  5. Regularization & Safeguard Blocks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {blockCatalog.safeguards.map((blk) => (
                    <button
                      key={blk.id}
                      onClick={() => setPipeline((prev) => ({ ...prev, safeguards: blk.id }))}
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '10px',
                        border: `2px solid ${pipeline.safeguards === blk.id ? blk.color : '#cbd5e1'}`,
                        background: pipeline.safeguards === blk.id ? blk.bg : '#ffffff',
                        borderBottom: `4px solid ${pipeline.safeguards === blk.id ? blk.shadow : '#94a3b8'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</span>
                        <span style={{ fontSize: '0.64rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {blk.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{blk.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: CONNECTED PIPELINE CANVAS & LIVE SCORECARD */}
            <div>
              {/* Connected Assembly Canvas */}
              <div style={{
                background: '#ffffff',
                border: '2px solid #001f54',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 4px 0 #001f54',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase', marginBottom: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Assembled Pipeline</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>5 of 5 Stages Connected</span>
                </div>

                {/* Vertical Snap-together Chain of 5 Blocks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  
                  {/* Slot 1: Data */}
                  {(() => {
                    const blk = blockCatalog.data.find((b) => b.id === pipeline.data);
                    return (
                      <div style={{
                        background: blk.bg,
                        border: `2px solid ${blk.color}`,
                        borderBottom: `4px solid ${blk.shadow}`,
                        borderRadius: '10px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: executionStep >= 1 ? '0 0 12px rgba(16,185,129,0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.66rem', fontWeight: 900, color: blk.color, textTransform: 'uppercase' }}>STAGE 1: DATA INGESTION</div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</div>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          Connected
                        </span>
                      </div>
                    );
                  })()}

                  {/* Connector Pulse */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 4, height: 10, background: executionStep >= 2 ? '#001f54' : '#cbd5e1', borderRadius: 2 }} />
                  </div>

                  {/* Slot 2: Split */}
                  {(() => {
                    const blk = blockCatalog.split.find((b) => b.id === pipeline.split);
                    return (
                      <div style={{
                        background: blk.bg,
                        border: `2px solid ${blk.color}`,
                        borderBottom: `4px solid ${blk.shadow}`,
                        borderRadius: '10px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: executionStep >= 2 ? '0 0 12px rgba(0,31,84,0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.66rem', fontWeight: 900, color: blk.color, textTransform: 'uppercase' }}>STAGE 2: PARTITIONING</div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</div>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          Connected
                        </span>
                      </div>
                    );
                  })()}

                  {/* Connector Pulse */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 4, height: 10, background: executionStep >= 3 ? '#6366f1' : '#cbd5e1', borderRadius: 2 }} />
                  </div>

                  {/* Slot 3: Preprocessing */}
                  {(() => {
                    const blk = blockCatalog.preprocess.find((b) => b.id === pipeline.preprocess);
                    return (
                      <div style={{
                        background: blk.bg,
                        border: `2px solid ${blk.color}`,
                        borderBottom: `4px solid ${blk.shadow}`,
                        borderRadius: '10px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: executionStep >= 3 ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.66rem', fontWeight: 900, color: blk.color, textTransform: 'uppercase' }}>STAGE 3: PREPROCESSING</div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</div>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          Connected
                        </span>
                      </div>
                    );
                  })()}

                  {/* Connector Pulse */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 4, height: 10, background: executionStep >= 4 ? '#f59e0b' : '#cbd5e1', borderRadius: 2 }} />
                  </div>

                  {/* Slot 4: Model Architecture */}
                  {(() => {
                    const blk = blockCatalog.model.find((b) => b.id === pipeline.model);
                    return (
                      <div style={{
                        background: blk.bg,
                        border: `2px solid ${blk.color}`,
                        borderBottom: `4px solid ${blk.shadow}`,
                        borderRadius: '10px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: executionStep >= 4 ? '0 0 12px rgba(245,158,11,0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.66rem', fontWeight: 900, color: blk.color, textTransform: 'uppercase' }}>STAGE 4: MODEL ARCHITECTURE</div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</div>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          Connected
                        </span>
                      </div>
                    );
                  })()}

                  {/* Connector Pulse */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 4, height: 10, background: executionStep >= 5 ? '#8b5cf6' : '#cbd5e1', borderRadius: 2 }} />
                  </div>

                  {/* Slot 5: Regularization & Safeguards */}
                  {(() => {
                    const blk = blockCatalog.safeguards.find((b) => b.id === pipeline.safeguards);
                    return (
                      <div style={{
                        background: blk.bg,
                        border: `2px solid ${blk.color}`,
                        borderBottom: `4px solid ${blk.shadow}`,
                        borderRadius: '10px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: executionStep >= 5 ? '0 0 12px rgba(139,92,246,0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.66rem', fontWeight: 900, color: blk.color, textTransform: 'uppercase' }}>STAGE 5: SAFEGUARDS</div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0f172a' }}>{blk.label}</div>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, background: blk.color, color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          Connected
                        </span>
                      </div>
                    );
                  })()}

                </div>

                {/* Big 3D Execute Pipeline Button */}
                <button
                  onClick={handleExecutePipeline}
                  disabled={isRunning}
                  style={{
                    width: '100%',
                    marginTop: '1.25rem',
                    padding: '0.85rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: isRunning ? '#94a3b8' : '#001f54',
                    borderBottom: `4px solid ${isRunning ? '#64748b' : '#00122e'}`,
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontWeight: 900,
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <IconSparkles size={18} /> {isRunning ? `Executing Stage ${executionStep}/5...` : '▶ Execute ML Pipeline'}
                </button>
              </div>

              {/* Evaluation Scorecard & Diagnostic Banner */}
              {hasExecuted && (
                <div style={{
                  background: results.bg,
                  border: `2px solid ${results.border}`,
                  borderBottom: `4px solid ${results.shadow}`,
                  borderRadius: '16px',
                  padding: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: results.color }}>
                      {results.badge}
                    </span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#475569' }}>
                      Test Vault R²: <strong>{results.testR2}</strong>
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: '#1e293b', lineHeight: '1.5', margin: '0 0 0.85rem' }}>
                    {results.diagnosis}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                    <div style={{ background: '#ffffff', padding: '0.45rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontSize: '0.64rem', color: '#64748b', fontWeight: 800 }}>TRAIN R²</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#001f54' }}>{results.trainR2}</div>
                    </div>
                    <div style={{ background: '#ffffff', padding: '0.45rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontSize: '0.64rem', color: '#64748b', fontWeight: 800 }}>VAL R²</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#4f46e5' }}>{results.valR2}</div>
                    </div>
                    <div style={{ background: '#ffffff', padding: '0.45rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontSize: '0.64rem', color: '#64748b', fontWeight: 800 }}>TEST R²</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900, color: results.color }}>{results.testR2}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 1: LIVE PROPERTY VALUATION TESTER ─────────────────── */}
      {activeTab === 1 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            
            {/* Input Controls Card */}
            <div style={{ background: '#f8fafc', border: '2px solid #001f54', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 0 #001f54' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#001f54', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Simulate Buyer Property Inquiries
              </div>

              {/* Slider 1: Square Footage */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                  <span>Property Size:</span>
                  <span style={{ color: '#2563eb' }}>{testSqft.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="4500"
                  step="50"
                  value={testSqft}
                  onChange={(e) => setTestSqft(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#001f54', cursor: 'pointer' }}
                />
              </div>

              {/* Slider 2: Bedrooms */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                  <span>Bedrooms:</span>
                  <span style={{ color: '#2563eb' }}>{testBeds} Bedrooms</span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {[1, 2, 3, 4, 5].map((b) => (
                    <button
                      key={b}
                      onClick={() => setTestBeds(b)}
                      style={{
                        flex: 1,
                        padding: '0.4rem',
                        borderRadius: '8px',
                        border: `1.5px solid ${testBeds === b ? '#001f54' : '#cbd5e1'}`,
                        background: testBeds === b ? '#001f54' : '#ffffff',
                        color: testBeds === b ? '#ffffff' : '#475569',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Area Median Income */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                  <span>Area Median Income Index:</span>
                  <span style={{ color: '#2563eb' }}>${(testIncome * 10).toFixed(1)}k / yr</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="12.0"
                  step="0.5"
                  value={testIncome}
                  onChange={(e) => setTestIncome(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#001f54', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Live Predicted Price Display Card */}
            <div style={{
              background: '#001f54',
              border: '2px solid #001f54',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              color: '#ffffff',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,31,84,0.25)',
              borderBottom: '6px solid #00122e'
            }}>
              <div style={{ fontSize: '0.76rem', color: '#93c5fd', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Pipeline Predicted Valuation
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.02em', marginBottom: '0.75rem' }}>
                ${predictedPrice.toLocaleString()}
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '0.75rem',
                fontSize: '0.76rem',
                color: '#e2e8f0',
                lineHeight: '1.5',
                marginBottom: '1rem'
              }}>
                <div>Current Model Capacity: <strong>{blockCatalog.model.find((b) => b.id === pipeline.model).label}</strong></div>
                <div>Partition Strategy: <strong>{blockCatalog.split.find((b) => b.id === pipeline.split).label}</strong></div>
              </div>

              <div style={{ fontSize: '0.72rem', color: results.status === 'champion' ? '#6ee7b7' : '#fca5a5', fontWeight: 800 }}>
                {results.status === 'champion' ? 'Accurate market valuation aligned with non-linear California trend!' : 'Warning: Prediction may be distorted due to pipeline configuration issues.'}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 2: GENERATED PYTHON CODE ──────────────────────────── */}
      {activeTab === 2 && (
        <div>
          <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 700, marginBottom: '0.75rem' }}>
            Live Python Scikit-Learn code generated directly from your assembled blocks:
          </div>
          <SyntaxCodeBlock
            code={[
              '# Scikit-Learn Pipeline Generated from Visual Blocks',
              '# ───────────────────────────────────────────────────',
              'import numpy as np',
              'import pandas as pd',
              'from sklearn.model_selection import train_test_split',
              'from sklearn.preprocessing import StandardScaler, PolynomialFeatures',
              pipeline.safeguards === 'reg_ridge_l2' ? 'from sklearn.linear_model import Ridge' : 'from sklearn.linear_model import LinearRegression',
              'from sklearn.pipeline import Pipeline',
              '',
              `# 1. Ingest Data: ${pipeline.data === 'ca_housing' ? 'California Housing (20,000 samples)' : 'Tiny Sample (15 samples)'}`,
              'df = pd.read_csv("california_housing.csv")',
              'X = df[["sqft", "bedrooms", "median_income"]]',
              'y = df["median_house_value"]',
              '',
              `# 2. Partition Strategy: ${pipeline.split === 'split_80_10_10' ? '80% Train / 10% Val / 10% Test' : '100% Train (No Test Split)'}`,
              pipeline.split === 'split_80_10_10' 
                ? 'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)'
                : 'X_train, y_train = X, y # WARNING: No test partition!',
              '',
              '# 3. Assemble Sequential Pipeline',
              'pipeline_steps = []',
              pipeline.preprocess === 'scale_train_only' ? 'pipeline_steps.append(("scaler", StandardScaler()))' : '# No scaling step',
              pipeline.model === 'model_poly2' ? 'pipeline_steps.append(("poly", PolynomialFeatures(degree=2, include_bias=False)))' : '',
              pipeline.model === 'model_poly15' ? 'pipeline_steps.append(("poly", PolynomialFeatures(degree=15, include_bias=False)))' : '',
              pipeline.safeguards === 'reg_ridge_l2' 
                ? 'pipeline_steps.append(("model", Ridge(alpha=1.0)))' 
                : 'pipeline_steps.append(("model", LinearRegression()))',
              '',
              'housing_pipeline = Pipeline([step for step in pipeline_steps if step])',
              'housing_pipeline.fit(X_train, y_train)',
              '',
              '# 4. Predict on New Buyer Inquiry',
              'sample_inquiry = pd.DataFrame([{"sqft": 2400, "bedrooms": 3, "median_income": 6.5}])',
              'predicted_price = housing_pipeline.predict(sample_inquiry)[0]',
              'print(f"Estimated Market Value: ${predicted_price:,.2f}")'
            ].filter(Boolean).join('\n')}
            title="assembled_housing_pipeline.py"
          />
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

    // If answer is correct, trigger celebration confetti!
    if (index === lesson.quiz.correctIndex) {
      triggerConfetti(0.5, 0.6);
    }
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
            <span className={styles.navSectionTag} style={{ color: '#001f54' }}>{lesson.module || 'Machine Learning'}</span>
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
            style={{ background: lesson.badgeColor || '#001f54' }}
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
            border: '1.5px solid #c2d4f2',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 16px rgba(0,31,84,0.03)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: '#001f54',
              marginBottom: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <IconTarget size={18} style={{ color: '#001f54' }} /> In This Lesson, You Will Master:
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.88rem', lineHeight: '1.7' }}>
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
                <IconSparkles size={20} style={{ color: '#001f54' }} />
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

        {/* LIVELY INTERACTIVE DIAGRAM */}
        {lesson.diagram && (
          <div className={styles.diagramBox} style={{ background: 'transparent', padding: 0, border: 'none', boxShadow: 'none' }}>
            {lesson.diagram.type === 'what_is_ml' && (
              <WhatIsMLDiagram />
            )}
            {lesson.diagram.type === 'ai_ml_dl_hierarchy' && (
              <AiMlDlHierarchyDiagram />
            )}
            {lesson.diagram.type === 'supervised_vs_unsupervised' && (
              <SupervisedVsUnsupervisedDiagram />
            )}
            {lesson.diagram.type === 'regression_vs_classification' && (
              <RegressionVsClassificationDiagram />
            )}
            {lesson.diagram.type === 'features_and_labels' && (
              <FeaturesAndLabelsDiagram />
            )}
            {lesson.diagram.type === 'training_val_test_splits' && (
              <DataSplitsDiagram />
            )}
            {lesson.diagram.type === 'overfitting_underfitting' && (
              <OverfittingUnderfittingDiagram />
            )}
            {lesson.diagram.type === 'bias_vs_variance' && (
              <BiasVsVarianceDiagram />
            )}
            {lesson.diagram.type === 'house_price_pipeline_project' && (
              <HousePricePipelineStudio />
            )}
          </div>
        )}

        {/* KEY TAKEAWAYS CHECKLIST */}
        {lesson.takeaways && (
          <div className={styles.takeawaysCard} style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', boxShadow: '0 4px 16px rgba(0,31,84,0.04)' }}>
            <h3 className={styles.takeawaysTitle} style={{ color: '#001f54' }}>
              <IconCheckmark size={22} style={{ color: '#001f54' }} /> Key Takeaways
            </h3>
            <ul className={styles.takeawaysList}>
              {lesson.takeaways.map((takeaway, idx) => (
                <li key={idx} className={styles.takeawayItem} style={{ color: '#001f54' }}>
                  <span className={styles.takeawayBullet} style={{ background: '#001f54' }}></span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* KNOWLEDGE CHECK QUIZ WITH CONFETTI */}
        {lesson.quiz && (
          <div className={styles.quizCard}>
            <div className={styles.quizHeader}>
              <IconSparkles size={22} style={{ color: '#001f54' }} /> Interactive Knowledge Check
            </div>
            <p className={styles.quizQuestion}>{lesson.quiz.question}</p>

            <div className={styles.quizOptions}>
              {lesson.quiz.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === lesson.quiz.correctIndex;
                let btnClass = styles.optionBtn;

                if (isAnswered) {
                  if (isCorrect) btnClass += ` ${styles.optionCorrect}`;
                  else if (isSelected && !isCorrect) btnClass += ` ${styles.optionIncorrect}`;
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => !isAnswered && handleOptionSelect(oIdx)}
                    className={btnClass}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <IconCheckmark size={18} style={{ color: '#001f54' }} />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={styles.explanationBox}>
                <strong>{selectedOption === lesson.quiz.correctIndex ? 'Correct! ' : 'Explanation: '}</strong>
                {lesson.quiz.explanation}
              </div>
            )}
          </div>
        )}

        {/* BOTTOM NAVIGATION BUTTONS */}
        <div className={styles.bottomNav}>
          {prevLessonId ? (
            <Link href={`/learn/machine-learning/${prevLessonId}`} className={styles.btnBack}>
              <IconArrowLeft size={16} /> Previous Lesson
            </Link>
          ) : (
            <div />
          )}

          {nextLessonId ? (
            <Link href={`/learn/machine-learning/${nextLessonId}`} className={styles.btnNext}>
              Next Lesson <IconArrowRight size={18} />
            </Link>
          ) : (
            <Link href="/learn/machine-learning" className={styles.btnNext}>
              Complete Module <IconCheckmark size={18} />
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}


