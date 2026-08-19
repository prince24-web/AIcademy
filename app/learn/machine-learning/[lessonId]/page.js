'use client';

import React, { useState, useEffect } from 'react';
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
      '#10b981', '#059669', '#0284c7', '#38bdf8',
      '#6366f1', '#8b5cf6', '#f59e0b', '#ec4899',
      '#14b8a6', '#06b6d4', '#fbbf24', '#f97316'
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

const IconRefresh = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/>
  </svg>
);

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
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ─── LIVELY & COLORFUL WHAT IS MACHINE LEARNING DIAGRAM ─────────────────────
const WhatIsMLDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('spam');
  const [learningStep, setLearningStep] = useState(0);
  const [simActive, setSimActive] = useState(false);

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
      badgeColor: '#059669',
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
      lossColor: '#10b981'
    }
  ];

  const curStep = learningStepsData[learningStep];

  // Coordinates mapping for 280x180 SVG canvas
  const mapX = (x) => 35 + (x / 5) * 210;
  const mapY = (y) => 155 - (y / 11) * 135;

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '20px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1.5px solid #f1f5f9',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#ecfdf5',
              color: '#059669',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid #a7f3d0'
            }}>
              INTERACTIVE PARADIGM ARENA
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
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
          background: '#f8fafc',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1.5px solid #e2e8f0'
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
                background: activeTab === t.tab ? '#059669' : 'transparent',
                color: activeTab === t.tab ? '#ffffff' : '#475569',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: activeTab === t.tab ? '0 3px 10px rgba(5,150,105,0.25)' : 'none',
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

                <div style={{ background: '#ecfdf5', border: '2px solid #34d399', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>Output</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#065f46', marginTop: '0.2rem' }}>Answers / Results (y)</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', fontSize: '0.78rem', color: '#475569', lineHeight: '1.5' }}>
                <strong style={{ color: '#0f172a' }}>Limitation: </strong>
                Human must know the exact logic in advance. If edge cases or real-world noise are not anticipated, the software crashes or yields wrong answers.
              </div>
            </div>

            {/* MACHINE LEARNING CARD */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #10b981',
              borderRadius: '16px',
              padding: '1.4rem',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(16,185,129,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Machine Learning
                </span>
                <span style={{ background: '#059669', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
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
                  <div style={{ flex: 1, background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>Ground Truth</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>Answers (y)</div>
                  </div>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #10b981',
                  borderRadius: '10px',
                  padding: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#047857',
                  fontSize: '0.8rem',
                  fontWeight: 800
                }}>
                  <IconSparkles size={16} /> ML Optimizer minimizes error across data
                </div>

                <div style={{ background: '#f5f3ff', border: '2px solid #8b5cf6', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6d28d9', textTransform: 'uppercase' }}>Synthesized Output</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#4c1d95', marginTop: '0.2rem' }}>Rules / Model Function f(x)</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '0.85rem', fontSize: '0.78rem', color: '#065f46', lineHeight: '1.5' }}>
                <strong style={{ color: '#0f172a' }}>Superpower: </strong>
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
                  border: `2px solid ${selectedScenario === s.id ? s.badgeColor : '#e2e8f0'}`,
                  background: selectedScenario === s.id ? '#ffffff' : '#f8fafc',
                  color: selectedScenario === s.id ? '#0f172a' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: selectedScenario === s.id ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
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
              background: '#ecfdf5',
              border: '1.5px solid #a7f3d0',
              borderRadius: '14px',
              padding: '1.25rem',
              boxShadow: '0 4px 12px rgba(16,185,129,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#059669', color: '#ffffff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>
                  P
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#047857', textTransform: 'uppercase' }}>
                  Performance Metric
                </span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#064e3b', marginBottom: '0.4rem' }}>
                How is improvement mathematically proven?
              </div>
              <p style={{ fontSize: '0.78rem', color: '#065f46', lineHeight: '1.5', margin: 0 }}>
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
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#64748b', marginBottom: '0.5rem' }}>
                <span>Coordinate Plane: Actual vs Predicted</span>
                <span style={{ color: '#059669' }}>Target: y = 2x + 1</span>
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
                      border: `1.5px solid ${learningStep === idx ? '#059669' : '#e2e8f0'}`,
                      background: learningStep === idx ? '#ecfdf5' : '#ffffff',
                      color: learningStep === idx ? '#065f46' : '#64748b',
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

              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
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
                  <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Consolas, monospace' }}>
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
            style={{ background: lesson.badgeColor || '#059669' }}
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
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <IconTarget size={18} style={{ color: '#059669' }} /> In This Lesson, You Will Master:
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
                <IconSparkles size={20} style={{ color: '#059669' }} />
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
          </div>
        )}

        {/* KEY TAKEAWAYS CHECKLIST */}
        {lesson.takeaways && (
          <div className={styles.takeawaysCard} style={{ background: '#ffffff', border: '1.5px solid #a7f3d0', boxShadow: '0 4px 16px rgba(5,150,105,0.04)' }}>
            <h3 className={styles.takeawaysTitle} style={{ color: '#065f46' }}>
              <IconCheckmark size={22} style={{ color: '#10b981' }} /> Key Takeaways
            </h3>
            <ul className={styles.takeawaysList}>
              {lesson.takeaways.map((takeaway, idx) => (
                <li key={idx} className={styles.takeawayItem} style={{ color: '#064e3b' }}>
                  <span className={styles.takeawayBullet} style={{ background: '#059669' }}></span>
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
              <IconSparkles size={22} style={{ color: '#059669' }} /> Interactive Knowledge Check
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
                    {isAnswered && isCorrect && <IconCheckmark size={18} style={{ color: '#059669' }} />}
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
