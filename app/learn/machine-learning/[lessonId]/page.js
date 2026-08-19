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

