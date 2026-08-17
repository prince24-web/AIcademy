'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import { aiLessonsData } from '../aiLessonsData';

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
      '#7c3aed', '#6366f1', '#38bdf8', '#10b981',
      '#f59e0b', '#ec4899', '#f43f5e', '#a855f7',
      '#06b6d4', '#14b8a6', '#fbbf24', '#f97316', '#e11d48'
    ];

    const particleCount = 140;
    const particles = [];
    const startX = width * originX;
    const startY = height * originY;

    // Create 2 fountain arcs for high impact
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * (Math.random() * 1.5 - 1.25)); // upward fan
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

const IconPython = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M11.87 2c-4.32 0-4.04 1.88-4.04 1.88l.01 1.95h4.08v.58H6.18S2 5.92 2 10.3c0 4.37 3.65 4.22 3.65 4.22h1.09v-1.55s-.06-1.88 1.88-1.88h3.76s1.8 0 1.8-1.76V5.64s.28-3.64-4.31-3.64zm-2.12 1.18a.71.71 0 1 1 0 1.42.71.71 0 0 1 0-1.42z" fill="#38bdf8"/>
    <path d="M12.13 22c4.32 0 4.04-1.88 4.04-1.88l-.01-1.95h-4.08v-.58h5.75S22 18.08 22 13.7c0-4.37-3.65-4.22-3.65-4.22h-1.09v1.55s.06 1.88-1.88 1.88h-3.76s-1.8 0-1.8 1.76v3.67s-.28 3.64 4.31 3.64zm2.12-1.18a.71.71 0 1 1 0-1.42.71.71 0 0 1 0 1.42z" fill="#fde047"/>
  </svg>
);

const IconClock = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconList = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const IconGlobe = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconTerminal = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const IconTarget = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconLightbulb = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
  </svg>
);

const IconPlay = ({ size = 14, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const IconSpinner = ({ size = 14, className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);

const IconEye = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconBrain = ({ size = 18, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/>
  </svg>
);

const IconTrophy = ({ size = 28, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const IconImageDoc = ({ size = 18, color = '#7c3aed', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const IconFileText = ({ size = 22, color = '#f87171', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconExtract = ({ size = 22, color = '#38bdf8', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconScissors = ({ size = 22, color = '#ec4899', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);

const IconCpuApi = ({ size = 22, color = '#a78bfa', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);

const IconVectorGrid = ({ size = 22, color = '#2dd4bf', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    <circle cx="18" cy="10" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="6" cy="14" r="2"/>
  </svg>
);

const IconIndexZap = ({ size = 22, color = '#fbbf24', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <polygon points="12 6 8 13 13 13 10 18 16 11 11 11 12 6" fill={color}/>
  </svg>
);

const IconDatabaseBox = ({ size = 22, color = '#38bdf8', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const IconUserChat = ({ size = 22, color = '#4ade80', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconSearchVec = ({ size = 22, color = '#f472b6', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconBrainCog = ({ size = 22, color = '#c084fc', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/>
  </svg>
);

const IconShieldCheck = ({ size = 22, color = '#34d399', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);

// ─── COMPREHENSIVE SYNTAX HIGHLIGHTER LEXER (PYTHON / JSON / PROMPT) ────────
function highlightCode(code) {
  if (!code || typeof code !== 'string') return '';

  const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const combinedRegex = new RegExp(
    [
      '(#[^\\n]*)', // 1. Comments
      '("""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\')', // 2. Triple / Docstrings
      '((?:&quot;[\\w_ -]+&quot;|"[\\w_ -]+")\\s*:)', // 3. JSON Keys with colon
      '((?:f|F)?(?:"(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\'|`[^`]*`))', // 4. Strings
      '(\\b(?:def|class|return|if|elif|else|for|while|try|except|finally|raise|import|from|as|with|in|is|not|and|or|pass|break|continue|yield|lambda|const|let|var|function|export|default|type|interface|enum)\\b)', // 5. Keywords
      '(\\b(?:True|False|None|true|false|null|undefined)\\b)', // 6. Booleans / Constants
      '(\\b(?:BaseModel|Field|TypedDict|Enum|OpenAI|GenerativeModel|GenerationConfig|MathResponse|Step|CustomerTicketAnalysis|CustomerOrder|VerifiedDecision|ProductionTriage|NaiveTriage|SupportTicketSchema|SecurityAuditSchema|PriorityLevel|TicketCategory|Choice|Recipe|int|str|float|bool|list|dict|set|tuple|Any|Optional|Exception|LengthFinishReasonError)\\b)', // 7. Types & Classes
      '(\\b(?:print|len|range|parse|generate_content|append|split|join|get|post|match|round|input|sum|max|min|sorted|abs|type|zip|enumerate|map|filter|open)\\b(?=\\s*\\())', // 8. Functions / Methods
      '(\\b\\d+(?:\\.\\d+)?\\b)', // 9. Numbers
      '(@\\w+)', // 10. Decorators
    ].join('|'),
    'g'
  );

  let result = '';
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      result += escapeHtml(code.slice(lastIndex, match.index));
    }

    const [full, comment, tripleStr, jsonKey, str, keyword, boolConst, typeClass, funcName, number, decor] = match;

    if (comment) {
      result += `<span style="color: #64748b; font-style: italic;">${escapeHtml(comment)}</span>`;
    } else if (tripleStr) {
      result += `<span style="color: #34d399;">${escapeHtml(tripleStr)}</span>`;
    } else if (jsonKey) {
      const colonIdx = jsonKey.lastIndexOf(':');
      const k = jsonKey.slice(0, colonIdx);
      const c = jsonKey.slice(colonIdx);
      result += `<span style="color: #38bdf8; font-weight: 600;">${escapeHtml(k)}</span><span style="color: #94a3b8;">${escapeHtml(c)}</span>`;
    } else if (str) {
      result += `<span style="color: #a7f3d0;">${escapeHtml(str)}</span>`;
    } else if (keyword) {
      result += `<span style="color: #f43f5e; font-weight: 700;">${escapeHtml(keyword)}</span>`;
    } else if (boolConst) {
      result += `<span style="color: #fb923c; font-weight: 700;">${escapeHtml(boolConst)}</span>`;
    } else if (typeClass) {
      result += `<span style="color: #38bdf8; font-weight: 600;">${escapeHtml(typeClass)}</span>`;
    } else if (funcName) {
      result += `<span style="color: #818cf8; font-weight: 600;">${escapeHtml(funcName)}</span>`;
    } else if (number) {
      result += `<span style="color: #fbbf24;">${escapeHtml(number)}</span>`;
    } else if (decor) {
      result += `<span style="color: #c084fc;">${escapeHtml(decor)}</span>`;
    }

    lastIndex = combinedRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    result += escapeHtml(code.slice(lastIndex));
  }

  return result;
}

// ─── SYNTAX CODE BLOCK COMPONENT ──────────────────────────────────────────
const SyntaxCodeBlock = ({ code, title, language = 'Python / JSON' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{
      background: '#090d16',
      border: '1.5px solid #1e293b',
      borderRadius: '12px',
      marginTop: '1.1rem',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
    }}>
      {/* Code header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.6rem 1rem',
        background: '#0f172a',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Window control dots */}
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          </div>
          {title && (
            <span style={{
              color: '#38bdf8',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginLeft: '6px'
            }}>
              {title}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#64748b', fontSize: '0.68rem', fontFamily: 'monospace', fontWeight: 600 }}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? '#065f46' : '#1e293b',
              border: '1px solid #334155',
              borderRadius: '6px',
              color: copied ? '#34d399' : '#cbd5e1',
              padding: '2px 8px',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code body */}
      <pre style={{
        margin: 0,
        padding: '1rem 1.25rem',
        color: '#e2e8f0',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '0.82rem',
        lineHeight: '1.65',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        overflowX: 'auto'
      }}>
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
};

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
      icon: 'DATA',
      desc: 'LLMs are trained on massive web scrapes (Reddit, Wikipedia, forums). The internet contains sarcasm, errors, and unverified claims. When data is missing, models fill gaps with statistical guesses.',
      color: '#38bdf8'
    },
    {
      title: '2. Sampling & Generation Objectives',
      icon: 'SAMPLING',
      desc: 'Beam search and high temperature sampling introduce tradeoffs between fluency and accuracy. Pushing for high creativity forces the model to sample low-probability tokens that may be factual errors.',
      color: '#f59e0b'
    },
    {
      title: '3. Input Context Ambiguity',
      icon: 'CONTEXT',
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
                <span style={{ background: `${famousExamples[famousExampleIdx].color}25`, color: famousExamples[famousExampleIdx].color, border: `1px solid ${famousExamples[famousExampleIdx].color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>
                  {famousExamples[famousExampleIdx].badge}
                </span>
              </div>

              <div style={{ marginBottom: '0.85rem', padding: '0.75rem', background: '#3f1818', border: '1px solid #ef4444', borderRadius: '8px' }}>
                <div style={{ color: '#fca5a5', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>AI Hallucination Output:</div>
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

// ─── SYSTEM VS USER VS ASSISTANT DIAGRAM ───────────────────────────────────────
const SystemUserAssistantDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [activeStackIdx, setActiveStackIdx] = useState(0);
  const [conflictIdx, setConflictIdx] = useState(0);

  const panels = [
    { label: '3-Layer Architecture', color: '#38bdf8' },
    { label: 'JSON Chat API Payloads', color: '#34d399' },
    { label: 'Conflict Precedence', color: '#ef4444' },
    { label: 'SOP & Quality Checklist', color: '#a78bfa' },
  ];

  const stacks = [
    {
      name: 'Developer Code Reviewer',
      system: 'You are a careful security auditor and senior engineer. Accuracy > Clarity > Brevity. Safety: Never output plain text secrets or unverified exploits.',
      assistant: 'Process: 1) Executive summary, 2) Runnable refactored snippet with inline comments, 3) Performance benchmark estimates.',
      user: 'Goal: Audit this Node.js authentication middleware for memory leaks and SQL injection risks.',
      json: `[\n  { "role": "system", "content": "You are a careful security auditor..." },\n  { "role": "assistant", "content": "Format: Executive summary + Runnable refactored snippet." },\n  { "role": "user", "content": "Goal: Audit Node.js auth middleware for memory leaks." }\n]`
    },
    {
      name: 'Technical Writer / Documentation',
      system: 'You are a technical documentation specialist for developers. Priorities: Verifiability > Simplicity > Style. Safety: No unverified API specs.',
      assistant: 'Formatting Rules: Use Question-style H2s, short 2-4 sentence paragraphs, 1 runnable example per section, end with Takeaways.',
      user: 'Goal: Write a 3-paragraph developer tutorial on implementing exponential backoff retries in Python.',
      json: `[\n  { "role": "system", "content": "You are a technical doc specialist..." },\n  { "role": "assistant", "content": "Format: Question-style H2s, runnable Python code, short paragraphs." },\n  { "role": "user", "content": "Goal: Tutorial on exponential backoff in Python." }\n]`
    },
    {
      name: 'Enterprise SEO & Analytics',
      system: 'You are a cautious SEO analyst. Never fabricate traffic metrics. If data is missing, output "Data needed". Security: Protect client PII.',
      assistant: 'Structure: 1) Executive Summary (<=120 words), 2) Quick Wins table, 3) Technical SEO, 4) Strict JSON action_plan array.',
      user: 'Goal: Propose a 90-day technical SEO audit for example.com to grow non-brand organic traffic.',
      json: `[\n  { "role": "system", "content": "You are a cautious SEO analyst..." },\n  { "role": "assistant", "content": "Structure: Executive Summary + Quick Wins table + JSON action_plan." },\n  { "role": "user", "content": "Goal: 90-day technical SEO audit for example.com." }\n]`
    }
  ];

  const conflicts = [
    {
      title: 'Conflict 1: Privacy vs User Data Request',
      systemRule: 'System: "Never include personal data (PII) or credentials in output."',
      userAsk: 'User: "Summarize this customer support ticket and include customer phone & email."',
      winner: 'System Prompt Wins',
      resultColor: '#34d399',
      action: 'The AI redacts phone and email (or replaces them with [REDACTED]), fulfilling the summary while maintaining System privacy rules.'
    },
    {
      title: 'Conflict 2: Safety & Refusal vs User Exploitation',
      systemRule: 'System: "Refuse requests to generate executable malware or exploit scripts."',
      userAsk: 'User: "Write a Python script to perform a DDoS attack on my school server."',
      winner: 'System Prompt Wins',
      resultColor: '#ef4444',
      action: 'The AI declines the request and offers educational mitigation guidance on network traffic management instead.'
    },
    {
      title: 'Conflict 3: Formatting Contract vs Casual Asks',
      systemRule: 'Assistant/System: "Always format code output as clean Markdown with inline comments."',
      userAsk: 'User: "Give me the code quick."',
      winner: 'Assistant SOP Wins',
      resultColor: '#38bdf8',
      action: 'The AI provides the requested code immediately, but strictly maintains the Markdown formatting and inline comments as configured.'
    }
  ];

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

        {/* ===== PANEL 1: 3-LAYER STACK ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              The 3-layer architecture stacked in order of instruction precedence:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '1rem', background: '#2d1515', border: '2px solid #ef4444', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#f87171', fontWeight: 900, fontSize: '0.9rem' }}>1. SYSTEM PROMPT</span>
                  <span style={{ background: '#ef444430', color: '#f87171', border: '1px solid #ef4444', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>HIGHEST AUTHORITY (CONSTITUTION)</span>
                </div>
                <div style={{ color: '#fca5a5', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Defines identity, persona, safety boundaries, refusal policy, and priority ranking. Overrides all lower layers.
                </div>
              </div>

              <div style={{ padding: '1rem', background: '#1c2541', border: '2px solid #38bdf8', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 900, fontSize: '0.9rem' }}>2. ASSISTANT PROMPT</span>
                  <span style={{ background: '#38bdf830', color: '#38bdf8', border: '1px solid #38bdf8', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>MEDIUM AUTHORITY (SOP & STYLE)</span>
                </div>
                <div style={{ color: '#7dd3fc', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Enforces house style, voice, formatting contracts (tables/diagrams), process steps, and quality gates.
                </div>
              </div>

              <div style={{ padding: '1rem', background: '#0c2a1f', border: '2px solid #34d399', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 900, fontSize: '0.9rem' }}>3. USER PROMPT</span>
                  <span style={{ background: '#34d39930', color: '#34d399', border: '1px solid #34d399', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>TASK LEVEL (STEERING WHEEL)</span>
                </div>
                <div style={{ color: '#6ee7b7', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Supplies specific task intent, goal, inputs, scope, constraints, and success criteria for the current turn.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: JSON API PAYLOADS ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Select a production use-case stack to inspect its raw Chat API JSON array payload:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {stacks.map((st, i) => (
                <button key={i} onClick={() => setActiveStackIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${activeStackIdx === i ? '#34d399' : '#334155'}`,
                  background: activeStackIdx === i ? '#34d39920' : '#1e293b',
                  color: activeStackIdx === i ? '#34d399' : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{st.name}</button>
              ))}
            </div>

            <div style={{ background: '#0f172a', border: '1.5px solid #34d399', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                RAW CHAT COMPLETIONS API JSON PAYLOAD:
              </div>
              <pre style={{ background: '#090d16', padding: '0.85rem', borderRadius: '8px', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.78rem', lineHeight: '1.5', margin: 0, overflowX: 'auto' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(stacks[activeStackIdx].json) }} />
              </pre>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: CONFLICT PRECEDENCE ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              How LLM models resolve conflicting instructions across prompt layers:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {conflicts.map((cf, i) => (
                <button key={i} onClick={() => setConflictIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${conflictIdx === i ? cf.resultColor : '#334155'}`,
                  background: conflictIdx === i ? `${cf.resultColor}20` : '#1e293b',
                  color: conflictIdx === i ? cf.resultColor : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>Case {i + 1}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${conflicts[conflictIdx].resultColor}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: conflicts[conflictIdx].resultColor, fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.6rem' }}>
                {conflicts[conflictIdx].title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <div style={{ padding: '0.6rem 0.8rem', background: '#2d1515', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '0.78rem', color: '#fca5a5', fontFamily: 'monospace' }}>
                  {conflicts[conflictIdx].systemRule}
                </div>
                <div style={{ padding: '0.6rem 0.8rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '6px', fontSize: '0.78rem', color: '#a7f3d0', fontFamily: 'monospace' }}>
                  {conflicts[conflictIdx].userAsk}
                </div>
              </div>

              <div style={{ padding: '0.75rem', background: '#0f172a', borderRadius: '8px', border: `1px solid ${conflicts[conflictIdx].resultColor}` }}>
                <div style={{ color: conflicts[conflictIdx].resultColor, fontWeight: 800, fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                  {conflicts[conflictIdx].winner}
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>
                  {conflicts[conflictIdx].action}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: CHECKLIST & TROUBLESHOOTING ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Quick troubleshooting guide for model instruction drift:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { issue: 'Conflicting Rules', fix: 'Remove redundant rules or state precedence explicitly.' },
                { issue: 'Vague Goal', fix: 'Add audience, context, hard constraints, and explicit output format.' },
                { issue: 'Overloaded Prompt', fix: 'Break into step-by-step turns (outline -> draft -> review).' },
                { issue: 'Context Truncation', fix: 'Keep System/Assistant prompts short (3-8 sentences) so they survive chat truncation.' },
                { issue: 'Unsafe Data Ask', fix: 'Reframe with anonymized data or request safe alternative guidance.' }
              ].map((item, i) => (
                <div key={i} style={{ padding: '0.75rem 0.9rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#f87171', fontWeight: 700 }}>{item.issue}</span>
                  <span style={{ color: '#6ee7b7', fontWeight: 600 }}>Fix: {item.fix}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── FEW-SHOT PROMPTING DIAGRAM (GOOGLE AI ESSENTIALS) ──────────────────────────
const FewShotDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [spectrumIdx, setSpectrumIdx] = useState(2);
  const [retailMode, setRetailMode] = useState('few');
  const [activePatternIdx, setActivePatternIdx] = useState(0);
  const [densityIdx, setDensityIdx] = useState(1);

  const panels = [
    { label: 'Shot Spectrum (0 to Few)', color: '#0ea5e9' },
    { label: 'Retail Product Lab', color: '#38bdf8' },
    { label: 'Pattern & Schema Matching', color: '#34d399' },
    { label: 'Density & Token Tradeoffs', color: '#a78bfa' },
  ];

  const spectrum = [
    {
      type: 'Zero-Shot Prompting',
      shots: '0 Examples',
      color: '#ef4444',
      badge: 'DIRECT QUERY',
      desc: 'The model receives instructions or queries with zero demonstration examples. It relies entirely on pre-trained weights and general training data.',
      prompt: 'Classify the sentiment of this customer review:\n"The battery life on this laptop exceeded all my expectations!"\nSentiment:',
      output: 'Sentiment: Positive',
      strengths: 'Minimal prompt tokens, zero setup overhead, fast inference time.',
      limits: 'High variance on specific formatting rules; struggles with nuanced classifications.',
      bestFor: 'Simple factual Q&A, basic translations, general summarization.'
    },
    {
      type: 'One-Shot Prompting',
      shots: '1 Example',
      color: '#f59e0b',
      badge: 'FORMAT ANCHOR',
      desc: 'The model is provided with exactly one demonstration input-output pair before the target question. Anchors the basic output schema and delimiter style.',
      prompt: 'Classify review sentiment with category tags:\n\nInput: "Screen arrived scratched."\nOutput: [NEGATIVE] Category: Hardware\n\nInput: "The battery life on this laptop exceeded all my expectations!"\nOutput:',
      output: '[POSITIVE] Category: Battery Life',
      strengths: 'Demonstrates delimiters and basic output schema with low token overhead.',
      limits: 'Can over-bias toward the single example\'s specific wording or style.',
      bestFor: 'Basic format enforcement, delimiter matching, simple tag extraction.'
    },
    {
      type: 'Few-Shot Prompting',
      shots: '2-5 Examples',
      color: '#34d399',
      badge: 'PATTERN INDUCTION',
      desc: 'The model receives 2 or more diverse input-output exemplars. The attention mechanism induces the underlying structural rules, tone, and constraints through In-Context Learning.',
      prompt: 'Classify review sentiment with category tags and confidence score:\n\nInput: "Screen arrived scratched."\nOutput: [NEGATIVE] Category: Hardware | Confidence: 0.98\n\nInput: "Delivery was fast and polite."\nOutput: [POSITIVE] Category: Logistics | Confidence: 0.95\n\nInput: "The battery life on this laptop exceeded all my expectations!"\nOutput:',
      output: '[POSITIVE] Category: Battery Performance | Confidence: 0.96',
      strengths: 'Strict adherence to house style, high accuracy on edge cases, no fine-tuning required.',
      limits: 'Consumes additional context window tokens; slight increase in prompt cost.',
      bestFor: 'Strict JSON extraction, bespoke copywriting tone, domain classification, SQL generation.'
    }
  ];

  const retailScenarios = {
    zero: {
      label: 'Zero-Shot Mode (0 Examples)',
      color: '#ef4444',
      prompt: 'Write a one-sentence product description for a skateboard. It should contain two adjectives.',
      output: 'This high-performance skateboard features a durable deck and smooth wheels for riders of all skill levels.',
      analysis: 'Longer than requested, uses 3 adjectives instead of 2, and lacks standard branded rhythm because no stylistic model was provided.',
      compliance: 'Partial Compliance (45%)'
    },
    one: {
      label: 'One-Shot Mode (1 Example: Bicycle)',
      color: '#f59e0b',
      prompt: 'Write a one-sentence product description with two adjectives in this style:\n\nProduct: Bicycle\nDescription: A sleek and durable bicycle built for city commuting.\n\nProduct: Skateboard\nDescription:',
      output: 'A versatile and rugged skateboard built for park cruising.',
      analysis: 'Good structure matching the bicycle example. Successfully captured "A [adj] and [adj] [product] built for [activity]" format.',
      compliance: 'High Compliance (85%)'
    },
    few: {
      label: 'Few-Shot Mode (2 Examples: Bicycle + Rollerblades)',
      color: '#34d399',
      prompt: 'Write a one-sentence product description. Review the examples below and write the description in the exact same style.\n\nProduct: Bicycle\nDescription: A sleek and durable bicycle built for city commuting.\n\nProduct: Rollerblades\nDescription: Smooth and stylish rollerblades designed for effortless glide.\n\nProduct: Skateboard\nDescription:',
      output: 'A flexible and responsive skateboard engineered for street carving.',
      analysis: 'Exact style match! The model synthesized the rhythmic flow and vocabulary variety across both exemplars while strictly maintaining 1 sentence and exactly 2 adjectives.',
      compliance: 'Perfect Compliance (100%)'
    }
  };

  const patternTasks = [
    {
      title: 'Customer Support Routing',
      category: 'INTENT CLASSIFIER',
      color: '#38bdf8',
      shotsText: `Ticket: "My card was charged twice on checkout." -> Department: BILLING [Urgency: High]\nTicket: "How do I invite teammates to my workspace?" -> Department: GENERAL [Urgency: Low]\nTicket: "API returns 502 Bad Gateway during POST /v1/chat" -> Department: DEV_SUPPORT [Urgency: Critical]`,
      targetInput: 'Ticket: "I cannot login with SSO after resetting password"',
      fewShotResult: 'Department: DEV_SUPPORT [Urgency: High]'
    },
    {
      title: 'Data Extraction to Strict JSON',
      category: 'JSON SYNTAX',
      color: '#34d399',
      shotsText: `Text: "Meeting with Dr. Aris at 3pm on Friday in Room 402"\nJSON: { "attendee": "Dr. Aris", "time": "15:00", "day": "Friday", "room": "402" }\n\nText: "Lunch with Sarah at noon on Monday at Bistro 9"\nJSON: { "attendee": "Sarah", "time": "12:00", "day": "Monday", "room": "Bistro 9" }`,
      targetInput: 'Text: "Code review with Mark at 10am on Wednesday in Lab B"',
      fewShotResult: '{ "attendee": "Mark", "time": "10:00", "day": "Wednesday", "room": "Lab B" }'
    },
    {
      title: 'Natural Language to SQL',
      category: 'CODE GENERATION',
      color: '#a78bfa',
      shotsText: `Query: "Count all active users signed up this month"\nSQL: SELECT COUNT(*) FROM users WHERE status = 'active' AND created_at >= DATE_TRUNC('month', CURRENT_DATE);\n\nQuery: "Find top 5 orders by revenue"\nSQL: SELECT id, revenue FROM orders ORDER BY revenue DESC LIMIT 5;`,
      targetInput: 'Query: "List distinct customer emails from London with total spend over 1000"',
      fewShotResult: 'SELECT DISTINCT email, SUM(amount) AS total_spend FROM customers JOIN orders ON customers.id = orders.customer_id WHERE city = \'London\' GROUP BY email HAVING SUM(amount) > 1000;'
    }
  ];

  const densityOptions = [
    {
      shots: '0 Shots (Zero-Shot)',
      tokenOverhead: '+0 tokens',
      cost: 'Baseline ($)',
      accuracy: '60% - 75%',
      risk: 'High formatting variance',
      guidance: 'Use for open-ended creative tasks or standard factual lookups.'
    },
    {
      shots: '2-4 Shots (Sweet Spot)',
      tokenOverhead: '+150-300 tokens',
      cost: 'Minimal (+$0.0002/req)',
      accuracy: '92% - 98%',
      risk: 'None (optimal balance)',
      guidance: 'Recommended for 90% of production pipelines: structured outputs, tone matching, and classification.'
    },
    {
      shots: '8-12 Shots (High Density)',
      tokenOverhead: '+800-1500 tokens',
      cost: 'Moderate (+$0.001/req)',
      accuracy: '96% - 99%',
      risk: 'Diminishing returns, slight latency increase',
      guidance: 'Useful when covering complex multi-class taxonomy edge cases.'
    },
    {
      shots: '25+ Shots (Context Bloat)',
      tokenOverhead: '+3000+ tokens',
      cost: 'High ($$$)',
      accuracy: 'Plateaus (~97%)',
      risk: 'Context window crowding, model rigidity, token waste',
      guidance: 'Inefficient. If you need 25+ examples, fine-tuning or RAG vector retrieval is significantly superior.'
    }
  ];

  const currentShot = spectrum[spectrumIdx];
  const currentRetail = retailScenarios[retailMode];

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

        {/* ===== PANEL 1: SHOT SPECTRUM ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Compare how the number of demonstration examples changes the prompting paradigm:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {spectrum.map((item, i) => (
                <button key={i} onClick={() => setSpectrumIdx(i)} style={{
                  padding: '0.4rem 0.85rem', borderRadius: '8px',
                  border: `1.5px solid ${spectrumIdx === i ? item.color : '#334155'}`,
                  background: spectrumIdx === i ? `${item.color}20` : '#1e293b',
                  color: spectrumIdx === i ? item.color : '#cbd5e1',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{item.type} ({item.shots})</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentShot.color}`, borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <h4 style={{ color: currentShot.color, margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                  {currentShot.type}
                </h4>
                <span style={{ background: `${currentShot.color}25`, color: currentShot.color, border: `1px solid ${currentShot.color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                  {currentShot.badge}
                </span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.6', margin: '0 0 1rem' }}>
                {currentShot.desc}
              </p>

              {/* Code Box */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.85rem' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Prompt Payload:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.78rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentShot.prompt) }} />
                </pre>
                <div style={{ borderTop: '1px solid #334155', marginTop: '0.6rem', paddingTop: '0.5rem', color: currentShot.color, fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700 }}>
                  {currentShot.output}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
                <div style={{ padding: '0.6rem 0.8rem', background: '#0c2a1f', border: '1px solid #059669', borderRadius: '6px', fontSize: '0.75rem' }}>
                  <strong style={{ color: '#6ee7b7', display: 'block', marginBottom: '0.15rem' }}>Strengths:</strong>
                  <span style={{ color: '#a7f3d0' }}>{currentShot.strengths}</span>
                </div>
                <div style={{ padding: '0.6rem 0.8rem', background: '#2d1515', border: '1px solid #dc2626', borderRadius: '6px', fontSize: '0.75rem' }}>
                  <strong style={{ color: '#fca5a5', display: 'block', marginBottom: '0.15rem' }}>Limitations:</strong>
                  <span style={{ color: '#fecaca' }}>{currentShot.limits}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: RETAIL PRODUCT LAB ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Google AI Essentials Case Study: Generating a skateboard description (1 sentence, 2 adjectives):
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
              {Object.keys(retailScenarios).map((key) => (
                <button key={key} onClick={() => setRetailMode(key)} style={{
                  flex: 1, minWidth: '160px', padding: '0.5rem', borderRadius: '8px',
                  border: `1.5px solid ${retailScenarios[key].color}`,
                  background: retailMode === key ? retailScenarios[key].color : '#1e293b',
                  color: retailMode === key ? '#0f172a' : retailScenarios[key].color,
                  fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
                }}>{retailScenarios[key].label.split('(')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#0f172a', border: `2px solid ${currentRetail.color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ color: currentRetail.color, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  Input Prompt Payload:
                </span>
                <span style={{ background: `${currentRetail.color}20`, color: currentRetail.color, padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                  {currentRetail.compliance}
                </span>
              </div>

              <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#e2e8f0', whiteSpace: 'pre-wrap', lineHeight: '1.5', marginBottom: '0.85rem' }}>
                {currentRetail.prompt}
              </div>

              <div style={{ color: currentRetail.color, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Generated Output:
              </div>
              <div style={{ padding: '0.75rem', background: '#0c2a1f', border: `1px solid ${currentRetail.color}`, borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.82rem', color: '#a7f3d0', marginBottom: '0.75rem' }}>
                "{currentRetail.output}"
              </div>

              <div style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.5' }}>
                <strong style={{ color: '#cbd5e1' }}>Analysis:</strong> {currentRetail.analysis}
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: PATTERN MATCHING ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Inspect how 2 to 3 few-shot examples enforce strict schemas without explicit code schemas:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {patternTasks.map((t, i) => (
                <button key={i} onClick={() => setActivePatternIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${activePatternIdx === i ? t.color : '#334155'}`,
                  background: activePatternIdx === i ? `${t.color}20` : '#1e293b',
                  color: activePatternIdx === i ? t.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{t.title}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${patternTasks[activePatternIdx].color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: patternTasks[activePatternIdx].color, fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                {patternTasks[activePatternIdx].title} ({patternTasks[activePatternIdx].category})
              </div>

              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Demonstration Few-Shot Exemplars:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.76rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(patternTasks[activePatternIdx].shotsText) }} />
                </pre>
              </div>

              <div style={{ padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  New Input Turn:
                </div>
                <div style={{ color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                  {patternTasks[activePatternIdx].targetInput}
                </div>
                <div style={{ color: '#34d399', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Few-Shot Generated Output:
                </div>
                <div style={{ color: '#6ee7b7', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700 }}>
                  {patternTasks[activePatternIdx].fewShotResult}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: DENSITY & TOKEN TRADEOFFS ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Finding the optimal number of examples to avoid context bloat and rigidity:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {densityOptions.map((opt, i) => (
                <button key={i} onClick={() => setDensityIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${densityIdx === i ? '#a78bfa' : '#334155'}`,
                  background: densityIdx === i ? '#a78bfa20' : '#1e293b',
                  color: densityIdx === i ? '#c084fc' : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{opt.shots}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: '1.5px solid #a78bfa', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: '#c084fc', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.8rem' }}>
                {densityOptions[densityIdx].shots}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem', marginBottom: '0.85rem' }}>
                <div style={{ padding: '0.6rem', background: '#0f172a', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.68rem', textTransform: 'uppercase' }}>Token Overhead</div>
                  <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem', marginTop: '0.2rem' }}>{densityOptions[densityIdx].tokenOverhead}</div>
                </div>
                <div style={{ padding: '0.6rem', background: '#0f172a', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.68rem', textTransform: 'uppercase' }}>Accuracy Band</div>
                  <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.85rem', marginTop: '0.2rem' }}>{densityOptions[densityIdx].accuracy}</div>
                </div>
                <div style={{ padding: '0.6rem', background: '#0f172a', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.68rem', textTransform: 'uppercase' }}>Cost Delta</div>
                  <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem', marginTop: '0.2rem' }}>{densityOptions[densityIdx].cost}</div>
                </div>
              </div>

              <div style={{ padding: '0.75rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ color: '#fca5a5', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                  <strong style={{ color: '#f87171' }}>Risk Profile:</strong> {densityOptions[densityIdx].risk}
                </div>
                <div style={{ color: '#a7f3d0', fontSize: '0.75rem' }}>
                  <strong style={{ color: '#34d399' }}>Recommendation:</strong> {densityOptions[densityIdx].guidance}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── CHAIN-OF-THOUGHT REASONING DIAGRAM (IBM GUIDE) ──────────────────────────
const ChainOfThoughtDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [problemIdx, setProblemIdx] = useState(0);
  const [promptMode, setPromptMode] = useState('cot');
  const [variantIdx, setVariantIdx] = useState(0);
  const [chainingTab, setChainingTab] = useState('cot');
  const [diagnosticStep, setDiagnosticStep] = useState(0);

  const panels = [
    { label: 'Standard vs CoT Lab', color: '#0f62fe' },
    { label: '4 CoT Variants (IBM)', color: '#38bdf8' },
    { label: 'Prompt Chaining vs CoT', color: '#34d399' },
    { label: 'Reasoning Inspector', color: '#a78bfa' },
  ];

  const problems = [
    {
      title: 'Polynomial Roots (Math)',
      domain: 'ARITHMETIC & ALGEBRA',
      color: '#0f62fe',
      promptStandard: 'Solve the quadratic equation: x^2 - 5x + 6 = 0',
      outputStandard: 'The solution is x = 5.',
      standardAnalysis: 'Incorrect. The model attempted to predict the final token in a single forward pass without factoring, guessing an incorrect root.',
      standardAccuracy: 'Incorrect (0%)',
      
      promptCoT: 'Solve the quadratic equation: x^2 - 5x + 6 = 0. Show your step-by-step reasoning.',
      outputCoT: 'Step 1: Standard form ax^2 + bx + c = 0 where a = 1, b = -5, c = 6.\nStep 2: Find two numbers that multiply to 6 and add to -5 -> (-2) and (-3).\nStep 3: Factor the polynomial: (x - 2)(x - 3) = 0.\nStep 4: Solve roots: x - 2 = 0 => x = 2; x - 3 = 0 => x = 3.\nFinal Answer: The solutions are x = 2 and x = 3.',
      cotAnalysis: '100% Correct. Generating intermediate factoring steps kept the values active in the attention context window, guaranteeing accurate calculation.',
      cotAccuracy: 'Correct (100%)'
    },
    {
      title: 'Multi-Leg Travel Logistics',
      domain: 'LOGICAL DEDUCTION',
      color: '#38bdf8',
      promptStandard: 'A train leaves City A at 09:00 traveling at 60 mph toward City B (180 miles away). A car leaves City B at 10:00 traveling at 40 mph toward City A. What time do they cross paths?',
      outputStandard: 'They meet at 11:30 AM.',
      standardAnalysis: 'Incorrect. The model neglected the 1-hour head start of the train and estimated based on average travel speeds.',
      standardAccuracy: 'Incorrect (0%)',

      promptCoT: 'A train leaves City A at 09:00 traveling at 60 mph toward City B (180 miles away). A car leaves City B at 10:00 traveling at 40 mph toward City A. Calculate the meeting time step by step.',
      outputCoT: 'Step 1: From 09:00 to 10:00 (1 hour), the train travels 60 miles alone.\nStep 2: At 10:00, remaining distance between them = 180 - 60 = 120 miles.\nStep 3: Combined closing speed = 60 mph + 40 mph = 100 mph.\nStep 4: Time to meet = 120 miles / 100 mph = 1.2 hours (1 hour 12 minutes).\nStep 5: Add 1h 12m to 10:00 AM -> 11:12 AM.\nFinal Answer: They cross paths at exactly 11:12 AM.',
      cotAnalysis: 'Exact match. The step-by-step intermediate tokens prevented temporal calculation conflation.',
      cotAccuracy: 'Correct (100%)'
    },
    {
      title: 'Enterprise Discount Policy',
      domain: 'BUSINESS LOGIC & RULES',
      color: '#34d399',
      promptStandard: 'Customer order: 120 licenses at $50/license. Tier 1 (1-50): 0% discount. Tier 2 (51-100): 10% discount. Tier 3 (101+): 20% discount. What is the total invoice?',
      outputStandard: 'Total invoice is $4,800 ($50 x 120 with 20% discount applied to all).',
      standardAnalysis: 'Failed marginal tier calculation. Applied the Tier 3 discount flatly across all 120 units instead of calculating graduated brackets.',
      standardAccuracy: 'Flawed Logic',

      promptCoT: 'Customer order: 120 licenses at $50/license. Tier 1 (1-50): 0% discount. Tier 2 (51-100): 10% discount. Tier 3 (101+): 20% discount. Calculate the graduated tiered invoice step by step.',
      outputCoT: 'Step 1: Tier 1 (first 50 licenses @ $50) = 50 * $50 = $2,500.\nStep 2: Tier 2 (next 50 licenses 51-100 @ 10% off $50 = $45) = 50 * $45 = $2,250.\nStep 3: Tier 3 (remaining 20 licenses 101-120 @ 20% off $50 = $40) = 20 * $40 = $800.\nStep 4: Sum all tiers: $2,500 + $2,250 + $800 = $5,550.\nFinal Answer: The total invoice is $5,550.',
      cotAnalysis: 'Accurate marginal bracket computation. Every tier is bounded and evaluated separately.',
      cotAccuracy: 'Correct (100%)'
    }
  ];

  const variants = [
    {
      title: 'Zero-Shot CoT',
      author: 'Kojima et al., 2022',
      badge: '"LET\'S THINK STEP BY STEP"',
      color: '#0f62fe',
      desc: 'Appends a single trigger sentence ("Let\'s think step by step") to the end of any prompt without supplying demonstration exemplars.',
      code: `Prompt:
"A store sells packs of 6 pens for $12 and individual pens for $2.50.
What is the cheapest way to buy 15 pens?
Let's think step by step."

Model Response:
"To get 15 pens:
- Option A: Buy 3 packs (18 pens) = 3 x $12 = $36
- Option B: Buy 2 packs (12 pens) + 3 individual pens = $24 + (3 x $2.50) = $24 + $7.50 = $31.50
Option B is cheaper. Total: $31.50."`,
      bestFor: 'Rapid prototyping, zero-cost prompt enhancement, general logical queries.'
    },
    {
      title: 'Few-Shot / Manual CoT',
      author: 'Wei et al., 2022 (Google / IBM)',
      badge: 'EXEMPLAR-GUIDED',
      color: '#38bdf8',
      desc: 'Provides 2 to 4 high-quality input-reasoning-output demonstration pairs to dictate the exact depth and format of the reasoning steps.',
      code: `Prompt:
"Q: Roger has 5 tennis balls. He buys 2 cans of tennis balls. Each can has 3 balls. How many does he have?
A: Roger started with 5 balls. 2 cans of 3 balls is 2 * 3 = 6 balls. 5 + 6 = 11. The answer is 11.

Q: The cafeteria had 23 apples. If they used 20 for lunch and bought 6 more, how many do they have?
A: The cafeteria had 23 apples. They used 20, so 23 - 20 = 3. They bought 6, so 3 + 6 = 9. The answer is 9.

Q: [Target Question]
A:"`,
      bestFor: 'Domain-specific math proofs, legal analysis, structured medical diagnosis workflows.'
    },
    {
      title: 'Self-Consistency CoT',
      author: 'Wang et al., 2022',
      badge: 'MAJORITY VOTING (k=5)',
      color: '#34d399',
      desc: 'Samples multiple diverse reasoning trajectories at temperature T=0.7, then applies a majority vote across final answers to eliminate outlier reasoning errors.',
      code: `Workflow:
Input Prompt -> Sample Path 1 -> Output: $55 (Vote 1)
             -> Sample Path 2 -> Output: $55 (Vote 2)
             -> Sample Path 3 -> Output: $42 (Outlier error)
             -> Sample Path 4 -> Output: $55 (Vote 3)
             -> Sample Path 5 -> Output: $55 (Vote 4)

Majority Consensus: $55 (Selected with 80% confidence)`,
      bestFor: 'High-stakes calculations, automated grading, critical financial models.'
    },
    {
      title: 'Automatic CoT (Auto-CoT)',
      author: 'Zhang et al., 2022',
      badge: 'DATASET CLUSTERING',
      color: '#a78bfa',
      desc: 'Clusters unlabeled questions into diversity groups, automatically executes Zero-Shot CoT on representative samples, and compiles synthetic few-shot reasoning prompts automatically.',
      code: `Process:
1. Cluster 10,000 dataset queries into K semantic groups.
2. Pick representative centroid question from each cluster.
3. Run Zero-Shot CoT to auto-generate verified reasoning chains.
4. Construct Few-Shot CoT prompt automatically without human labeling.`,
      bestFor: 'Batch offline processing, enterprise automated pipelines, large benchmark evaluations.'
    }
  ];

  const comparisonData = [
    { feature: 'Execution Model', cot: 'Single LLM inference turn', chaining: 'Multiple sequential API turns' },
    { feature: 'Latency', cot: 'Fast (1 roundtrip)', chaining: 'Higher (N roundtrips + network overhead)' },
    { feature: 'State Management', cot: 'Maintained inside context window tokens', chaining: 'Handled in application code / database' },
    { feature: 'External Tool Interactivity', cot: 'Limited to in-generation tool calls', chaining: 'Full code execution, database lookups between turns' },
    { feature: 'Token Cost', cot: 'Moderate (reasoning tokens in 1 call)', chaining: 'Higher (repeated system prompts in each call)' },
    { feature: 'Best Used For', cot: 'Math, deduction, code logic, summarization', chaining: 'Multi-agent pipelines, ETL, RAG + verification' }
  ];

  const diagnosticSteps = [
    { num: 'Step 1', title: 'Premise Extraction', desc: 'Identify given facts, constraints, units, and target goal.', check: 'Verify: Are all numbers and constraints correctly captured?' },
    { num: 'Step 2', title: 'Formulate Mathematical / Logical Model', desc: 'Translate natural language into formulas or propositional logic.', check: 'Verify: Is the formula structure sound?' },
    { num: 'Step 3', title: 'Intermediate Execution', desc: 'Execute arithmetic operations step-by-step.', check: 'Verify: Did arithmetic mistakes occur in sub-calculations?' },
    { num: 'Step 4', title: 'Sanity Check & Synthesis', desc: 'Check if answer satisfies original boundary conditions.', check: 'Verify: Does the result make physical/logical sense?' }
  ];

  const currentProb = problems[problemIdx];
  const currentVar = variants[variantIdx];

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

        {/* ===== PANEL 1: STANDARD VS COT LAB ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Compare how Standard Prompting vs. Chain-of-Thought reasoning impacts multistep accuracy:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {problems.map((prob, i) => (
                <button key={i} onClick={() => setProblemIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${problemIdx === i ? prob.color : '#334155'}`,
                  background: problemIdx === i ? `${prob.color}20` : '#1e293b',
                  color: problemIdx === i ? prob.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{prob.title}</button>
              ))}
            </div>

            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setPromptMode('standard')} style={{
                flex: 1, padding: '0.5rem', borderRadius: '8px',
                border: '1.5px solid #ef4444',
                background: promptMode === 'standard' ? '#ef4444' : '#1e293b',
                color: promptMode === 'standard' ? '#fff' : '#f87171',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>Standard Prompt (Jump to Answer)</button>
              <button onClick={() => setPromptMode('cot')} style={{
                flex: 1, padding: '0.5rem', borderRadius: '8px',
                border: '1.5px solid #34d399',
                background: promptMode === 'cot' ? '#34d399' : '#1e293b',
                color: promptMode === 'cot' ? '#0f172a' : '#34d399',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>Chain-of-Thought (Step-by-Step)</button>
            </div>

            <div style={{ background: '#0f172a', border: `2px solid ${promptMode === 'cot' ? '#34d399' : '#ef4444'}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ color: promptMode === 'cot' ? '#34d399' : '#f87171', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  Input Prompt Payload:
                </span>
                <span style={{ background: promptMode === 'cot' ? '#05966930' : '#dc262630', color: promptMode === 'cot' ? '#34d399' : '#f87171', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                  {promptMode === 'cot' ? currentProb.cotAccuracy : currentProb.standardAccuracy}
                </span>
              </div>

              <div style={{ padding: '0.65rem 0.85rem', background: '#1e293b', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#e2e8f0', marginBottom: '0.85rem' }}>
                "{promptMode === 'cot' ? currentProb.promptCoT : currentProb.promptStandard}"
              </div>

              <div style={{ color: promptMode === 'cot' ? '#34d399' : '#f87171', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Generated Output:
              </div>
              <div style={{ padding: '0.75rem', background: promptMode === 'cot' ? '#0c2a1f' : '#2d1515', border: `1px solid ${promptMode === 'cot' ? '#059669' : '#991b1b'}`, borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: promptMode === 'cot' ? '#a7f3d0' : '#fca5a5', whiteSpace: 'pre-wrap', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                {promptMode === 'cot' ? currentProb.outputCoT : currentProb.outputStandard}
              </div>

              <div style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.5' }}>
                <strong style={{ color: '#cbd5e1' }}>Analysis:</strong> {promptMode === 'cot' ? currentProb.cotAnalysis : currentProb.standardAnalysis}
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: 4 COT VARIANTS ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              IBM AI taxonomy of high-performance Chain-of-Thought prompting variants:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {variants.map((v, i) => (
                <button key={i} onClick={() => setVariantIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${variantIdx === i ? v.color : '#334155'}`,
                  background: variantIdx === i ? `${v.color}20` : '#1e293b',
                  color: variantIdx === i ? v.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{v.title}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentVar.color}`, borderRadius: '12px', padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <h4 style={{ color: currentVar.color, margin: 0, fontSize: '1rem', fontWeight: 800 }}>{currentVar.title}</h4>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{currentVar.author}</span>
                </div>
                <span style={{ background: `${currentVar.color}25`, color: currentVar.color, border: `1px solid ${currentVar.color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                  {currentVar.badge}
                </span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: '1.6', margin: '0 0 0.85rem' }}>
                {currentVar.desc}
              </p>

              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem' }}>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentVar.code) }} />
                </pre>
              </div>

              <div style={{ padding: '0.6rem 0.8rem', background: '#0f172a', borderRadius: '6px', fontSize: '0.75rem' }}>
                <strong style={{ color: '#38bdf8' }}>Best Application:</strong> <span style={{ color: '#e2e8f0' }}>{currentVar.bestFor}</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: CHAINING VS COT ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Core architectural distinction between single-turn Chain-of-Thought and multi-turn Prompt Chaining:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
                    <th style={{ padding: '0.6rem 0.75rem', color: '#94a3b8', fontWeight: 800 }}>Architecture Dimension</th>
                    <th style={{ padding: '0.6rem 0.75rem', color: '#38bdf8', fontWeight: 800 }}>Chain-of-Thought (CoT)</th>
                    <th style={{ padding: '0.6rem 0.75rem', color: '#34d399', fontWeight: 800 }}>Prompt Chaining</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #1e293b', background: idx % 2 === 0 ? '#1e293b40' : 'transparent' }}>
                      <td style={{ padding: '0.6rem 0.75rem', color: '#e2e8f0', fontWeight: 600 }}>{row.feature}</td>
                      <td style={{ padding: '0.6rem 0.75rem', color: '#a7f3d0' }}>{row.cot}</td>
                      <td style={{ padding: '0.6rem 0.75rem', color: '#7dd3fc' }}>{row.chaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: REASONING INSPECTOR ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              How engineers inspect intermediate reasoning steps to diagnose hallucinations and logical errors:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {diagnosticSteps.map((step, idx) => (
                <button key={idx} onClick={() => setDiagnosticStep(idx)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${diagnosticStep === idx ? '#a78bfa' : '#334155'}`,
                  background: diagnosticStep === idx ? '#a78bfa20' : '#1e293b',
                  color: diagnosticStep === idx ? '#c084fc' : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{step.num}: {step.title}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: '1.5px solid #a78bfa', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: '#c084fc', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                {diagnosticSteps[diagnosticStep].num}: {diagnosticSteps[diagnosticStep].title}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: '1.5', margin: '0 0 0.75rem' }}>
                {diagnosticSteps[diagnosticStep].desc}
              </p>
              <div style={{ padding: '0.65rem 0.85rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#6ee7b7', fontFamily: 'monospace', fontSize: '0.78rem' }}>
                {diagnosticSteps[diagnosticStep].check}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── STRUCTURED OUTPUTS DIAGRAM (HUMANLOOP GUIDE) ──────────────────────────
const StructuredOutputsDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [eraIdx, setEraIdx] = useState(2);
  const [fsmStep, setFsmStep] = useState(0);
  const [sdkTab, setSdkTab] = useState('gemini');
  const [patternIdx, setPatternIdx] = useState(1);

  const panels = [
    { label: '3 Eras of Output Reliability', color: '#059669' },
    { label: 'FSM Constrained Decoding', color: '#0ea5e9' },
    { label: 'Pydantic & SDK Code Lab', color: '#38bdf8' },
    { label: 'Reasoning-in-Schema Pattern', color: '#a78bfa' },
  ];

  const eras = [
    {
      name: '1. Prompt-Engineered JSON (2022)',
      reliability: '~35.9% Schema Reliability',
      badge: 'UNPREDICTABLE',
      color: '#ef4444',
      prompt: 'Extract customer name and order total in JSON: "Alice bought 3 books for $45."',
      output: 'Sure! Here is the JSON you requested:\n```json\n{\n  "Customer": "Alice",\n  "Total": "$45"\n}\n```',
      flaws: 'Included conversational preamble, Markdown code block backticks, uppercase keys instead of lowercase, and string "$45" instead of float 45.0. Crashes standard JSON parsers.'
    },
    {
      name: '2. JSON Mode (2023)',
      reliability: '~82% Syntax Valid (Schema Unenforced)',
      badge: 'SYNTAX ONLY',
      color: '#f59e0b',
      prompt: 'response_format={"type": "json_object"} with schema instructions in prompt.',
      output: '{\n  "user_name": "Alice",\n  "amount_spent": 45.0\n}',
      flaws: 'Guaranteed valid JSON braces, but the model hallucinated different key names ("user_name" vs "customer_name") and omitted the required "order_id" field.'
    },
    {
      name: '3. Structured Outputs with Strict Schema (2024+)',
      reliability: '100% Guaranteed Schema Adherence',
      badge: 'CONSTRAINED DECODING',
      color: '#34d399',
      prompt: 'response_format=PydanticModel(name=CustomerOrder, strict=True)',
      output: '{\n  "customer_name": "Alice",\n  "order_id": "ORD-9912",\n  "total_usd": 45.0,\n  "item_count": 3,\n  "status": "COMPLETED"\n}',
      flaws: 'Zero syntax errors, zero missing keys, zero extra keys. Directly deserializes into typed Python / TypeScript objects without custom regex.'
    }
  ];

  const fsmSteps = [
    {
      state: 'State 0: Root Object Open',
      currentOutput: '{',
      validNextTokens: ['"name"', '"id"', '"status"'],
      maskedTokens: ['123', 'true', 'Hello', ']', '[', 'def'],
      explanation: 'At root object start, the FSM allows ONLY opening double quotes for defined schema properties. Numeric or boolean tokens are masked to -infinity.'
    },
    {
      state: 'State 1: Key "status" -> Colon -> Enum Value',
      currentOutput: '{\n  "status": "',
      validNextTokens: ['ACTIVE', 'PENDING', 'CANCELLED'],
      maskedTokens: ['OPEN', 'SUCCESS', 'true', '1', 'WAITING'],
      explanation: 'For an enum field (e.g. status in [ACTIVE, PENDING, CANCELLED]), the FSM restricts token generation exclusively to the predefined enum literals.'
    },
    {
      state: 'State 2: Key "total_usd" -> Number Literal',
      currentOutput: '{\n  "status": "ACTIVE",\n  "total_usd": ',
      validNextTokens: ['[0-9]', '.'],
      maskedTokens: ['"45"', 'true', 'null', 'USD', '$'],
      explanation: 'Because total_usd is typed as float, string quotes or currency symbols ($) are illegal. Only digits and decimals are permitted.'
    },
    {
      state: 'State 3: All Required Keys Present -> Object Close',
      currentOutput: '{\n  "status": "ACTIVE",\n  "total_usd": 45.0\n}',
      validNextTokens: ['<END_OF_GENERATION>'],
      maskedTokens: ['additional_key', ',', '}', 'more text'],
      explanation: 'With additionalProperties: false, no further properties can be generated. The model is forced to emit closing brace and end generation.'
    }
  ];

  const sdkExamples = {
    openai: {
      title: 'OpenAI Python SDK (Pydantic BaseModel)',
      code: `from pydantic import BaseModel, Field
from openai import OpenAI
import enum

class TicketCategory(str, enum.Enum):
    BILLING = "BILLING"
    TECHNICAL = "TECHNICAL"
    ACCOUNT = "ACCOUNT"

class SupportTicketSchema(BaseModel):
    summary: str = Field(description="One-sentence executive summary")
    category: TicketCategory
    urgency: int = Field(ge=1, le=5, description="Urgency scale 1-5")
    suggested_actions: list[str]

client = OpenAI()
response = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "Triage this customer ticket."},
        {"role": "user", "content": "Cannot access billing invoices after password reset."}
    ],
    response_format=SupportTicketSchema  # Enforces 100% strict JSON schema
)

# Output is immediately a typed Python object!
ticket: SupportTicketSchema = response.choices[0].message.parsed
print(ticket.category)  # Output: TicketCategory.BILLING`
    },
    gemini: {
      title: 'Google Gemini API (TypedDict & Enums)',
      code: `import google.generativeai as genai
import typing_extensions as typing
import enum

class PriorityLevel(enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    CRITICAL = "CRITICAL"

class SecurityAuditSchema(typing.TypedDict):
    vulnerability_found: bool
    cve_id: str
    severity: PriorityLevel
    affected_endpoints: list[str]

model = genai.GenerativeModel("gemini-1.5-pro-latest")
result = model.generate_content(
    "Audit this authentication snippet for security vulnerabilities.",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        response_schema=SecurityAuditSchema  # Enforces strict schema matching
    )
)

print(result.text)  # Guaranteed valid JSON matching SecurityAuditSchema`
    }
  };

  const reasoningPatterns = [
    {
      title: 'Flawed Naive Schema (Reasoning Degradation)',
      desc: 'Forcing the model to output classification flags immediately without working memory space.',
      code: `class NaiveTriage(BaseModel):
    # FLAWED: Model must choose boolean immediately in token stream!
    is_fraud: bool
    risk_score: float`,
      analysis: 'Higher error rate because the model cannot "think out loud" before predicting boolean tokens.',
      color: '#ef4444'
    },
    {
      title: 'Recommended Production Pattern (Reasoning Scaffold)',
      desc: 'Providing a chain_of_thought field before final decisions guarantees maximum reasoning depth.',
      code: `class ProductionTriage(BaseModel):
    # RECOMMENDED: Step 1 allows model to generate reasoning tokens first!
    chain_of_thought: str = Field(description="Step-by-step risk evaluation")
    supporting_evidence: list[str]
    
    # Step 2: Final verdict conditioned on the reasoning tokens above
    is_fraud: bool
    risk_score: float = Field(ge=0.0, le=1.0)`,
      analysis: 'Zero reasoning degradation while maintaining 100% strict JSON schema deserialization.',
      color: '#34d399'
    }
  ];

  const currentEra = eras[eraIdx];
  const currentFsm = fsmSteps[fsmStep];
  const currentPattern = reasoningPatterns[patternIdx];

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

        {/* ===== PANEL 1: 3 ERAS ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              The historical progression of generating machine-readable JSON from LLMs:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {eras.map((era, i) => (
                <button key={i} onClick={() => setEraIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${eraIdx === i ? era.color : '#334155'}`,
                  background: eraIdx === i ? `${era.color}20` : '#1e293b',
                  color: eraIdx === i ? era.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{era.name.split('(')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentEra.color}`, borderRadius: '12px', padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <h4 style={{ color: currentEra.color, margin: 0, fontSize: '1rem', fontWeight: 800 }}>{currentEra.name}</h4>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{currentEra.reliability}</span>
                </div>
                <span style={{ background: `${currentEra.color}25`, color: currentEra.color, border: `1px solid ${currentEra.color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                  {currentEra.badge}
                </span>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.8rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Model Output Payload:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.76rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentEra.output) }} />
                </pre>
              </div>

              <div style={{ padding: '0.65rem 0.8rem', background: '#0f172a', borderRadius: '6px', fontSize: '0.75rem' }}>
                <strong style={{ color: currentEra.color }}>Reliability Evaluation:</strong> <span style={{ color: '#cbd5e1' }}>{currentEra.flaws}</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: FSM CONSTRAINED DECODING ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Step through how Finite State Machines (FSMs) mask invalid vocabulary tokens at each generation step:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {fsmSteps.map((s, i) => (
                <button key={i} onClick={() => setFsmStep(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${fsmStep === i ? '#0ea5e9' : '#334155'}`,
                  background: fsmStep === i ? '#0ea5e920' : '#1e293b',
                  color: fsmStep === i ? '#38bdf8' : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>Step {i + 1}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: '1.5px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.6rem' }}>
                {currentFsm.state}
              </div>

              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Partial Generated JSON Stream:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentFsm.currentOutput) }} />
                </pre>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.6rem 0.8rem', background: '#0c2a1f', border: '1px solid #059669', borderRadius: '6px', fontSize: '0.75rem' }}>
                  <strong style={{ color: '#34d399', display: 'block', marginBottom: '0.2rem' }}>Permitted Next Tokens:</strong>
                  <span style={{ color: '#a7f3d0', fontFamily: 'monospace' }}>{currentFsm.validNextTokens.join(', ')}</span>
                </div>
                <div style={{ padding: '0.6rem 0.8rem', background: '#2d1515', border: '1px solid #dc2626', borderRadius: '6px', fontSize: '0.75rem' }}>
                  <strong style={{ color: '#f87171', display: 'block', marginBottom: '0.2rem' }}>Masked Tokens (Probability = -Inf):</strong>
                  <span style={{ color: '#fca5a5', fontFamily: 'monospace' }}>{currentFsm.maskedTokens.join(', ')}</span>
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.78rem', margin: 0 }}>
                {currentFsm.explanation}
              </p>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: SDK CODE LAB ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Production SDK implementation for OpenAI and Google Gemini:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setSdkTab('gemini')} style={{
                flex: 1, padding: '0.5rem', borderRadius: '8px',
                border: `1.5px solid ${sdkTab === 'gemini' ? '#34d399' : '#334155'}`,
                background: sdkTab === 'gemini' ? '#34d39920' : '#1e293b',
                color: sdkTab === 'gemini' ? '#34d399' : '#94a3b8',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>Google Gemini (response_schema)</button>
              <button onClick={() => setSdkTab('openai')} style={{
                flex: 1, padding: '0.5rem', borderRadius: '8px',
                border: `1.5px solid ${sdkTab === 'openai' ? '#38bdf8' : '#334155'}`,
                background: sdkTab === 'openai' ? '#38bdf820' : '#1e293b',
                color: sdkTab === 'openai' ? '#38bdf8' : '#94a3b8',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>OpenAI (Pydantic parse)</button>
            </div>

            <div style={{ background: '#0f172a', border: '1.5px solid #334155', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ color: sdkTab === 'openai' ? '#38bdf8' : '#34d399', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {sdkExamples[sdkTab].title}
              </div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem', lineHeight: '1.5', overflowX: 'auto' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(sdkExamples[sdkTab].code) }} />
              </pre>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: REASONING-IN-SCHEMA PATTERN ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              How to avoid reasoning degradation when constraining model outputs to JSON:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {reasoningPatterns.map((p, i) => (
                <button key={i} onClick={() => setPatternIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${patternIdx === i ? p.color : '#334155'}`,
                  background: patternIdx === i ? `${p.color}20` : '#1e293b',
                  color: patternIdx === i ? p.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{p.title.split('(')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentPattern.color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: currentPattern.color, fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.4rem' }}>
                {currentPattern.title}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: '1.5', margin: '0 0 0.75rem' }}>
                {currentPattern.desc}
              </p>

              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.75rem' }}>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: '1.5' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentPattern.code) }} />
                </pre>
              </div>

              <div style={{ padding: '0.65rem 0.85rem', background: '#0f172a', borderRadius: '6px', fontSize: '0.76rem', color: currentPattern.color }}>
                <strong>Impact:</strong> {currentPattern.analysis}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── ITERATIVE PROMPTING DIAGRAM (IBM THINK / WATSONX FRAMEWORK) ─────────────
const IterativePromptingDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [cycleStep, setCycleStep] = useState(0);
  const [iterationIdx, setIterationIdx] = useState(3);
  const [leverIdx, setLeverIdx] = useState(0);

  const panels = [
    { label: 'The 4-Phase Cycle', color: '#1d4ed8' },
    { label: 'IT Incident Case Study', color: '#0ea5e9' },
    { label: '5 Refinement Levers', color: '#38bdf8' },
    { label: 'Convergence & SLA Gate', color: '#34d399' },
  ];

  const cyclePhases = [
    {
      phase: 'Phase 1: Design (Baseline Formulation)',
      goal: 'Formulate initial instructions, define personas, context placeholders, and output specifications.',
      tasks: [
        'Establish core task objective and domain scope',
        'Define assistant persona and operational tone',
        'State required inputs, format constraints, and safety boundaries'
      ],
      color: '#38bdf8'
    },
    {
      phase: 'Phase 2: Test (Execution & Sampling)',
      goal: 'Execute prompt against a representative evaluation test suite of real-world and edge-case inputs.',
      tasks: [
        'Run happy-path benchmark inputs',
        'Test noisy, incomplete, or corrupted user inputs',
        'Sample across low and high temperature settings'
      ],
      color: '#f59e0b'
    },
    {
      phase: 'Phase 3: Evaluate (Diagnostic Analysis)',
      goal: 'Quantitatively and qualitatively inspect model outputs against target success criteria.',
      tasks: [
        'Measure task accuracy, instruction adherence, and hallucination rate',
        'Detect failure modes (e.g. schema parse failures, missing required fields)',
        'Evaluate latency, token consumption, and cost per request'
      ],
      color: '#ef4444'
    },
    {
      phase: 'Phase 4: Refine (Targeted Intervention)',
      goal: 'Apply surgical engineering modifications based on diagnostic failure modes before re-testing.',
      tasks: [
        'Inject few-shot exemplars to illustrate edge cases',
        'Tighten negative constraints ("Do NOT include...")',
        'Decompose monolithic prompts or enforce strict JSON schemas'
      ],
      color: '#34d399'
    }
  ];

  const iterations = [
    {
      version: 'Iteration 1: Vague Baseline',
      passRate: '40% Pass Rate',
      color: '#ef4444',
      badge: 'UNFOCUSED',
      prompt: 'Analyze this server error log and tell me what is wrong:\n{log_snippet}',
      output: 'There seems to be an issue with your server. You could try restarting Apache, clearing disk caches, or rebooting your database instances.',
      flaw: 'Generic, unformatted advice that recommends dangerous cluster restarts and provides no actionable triage structure.'
    },
    {
      version: 'Iteration 2: Role & Checklist',
      passRate: '68% Pass Rate',
      color: '#f59e0b',
      badge: 'STRUCTURED',
      prompt: 'You are a Senior SRE. Analyze {log_snippet}.\nProvide: 1. Root Cause 2. Severity (LOW/HIGH/CRITICAL) 3. Next Steps.',
      output: '1. Root Cause: Connection pool exhaustion on Postgres replica.\n2. Severity: HIGH\n3. Next Steps: Scale connection pool max_connections to 300.',
      flaw: 'Improved accuracy, but response format still varies across runs and lacks machine-readable JSON for automated alerts.'
    },
    {
      version: 'Iteration 3: Few-Shot & Guardrails',
      passRate: '88% Pass Rate',
      color: '#38bdf8',
      badge: 'GUARDED',
      prompt: 'You are a Senior SRE. Follow the example below.\nConstraint: Do NOT suggest master cluster restarts. Verify replica lag first.\n[Example 1] Log -> Triage Report\nInput: {log_snippet}',
      output: 'ROOT CAUSE: Postgres read replica timeout.\nSEVERITY: HIGH\nACTION: Verified replica replication lag (0.2s). Increasing connection pool capacity.',
      flaw: 'Zero dangerous restart suggestions and high domain accuracy, but parsing requires regex strings.'
    },
    {
      version: 'Iteration 4: Strict JSON Schema (watsonx)',
      passRate: '99.4% Pass Rate',
      color: '#34d399',
      badge: 'ENTERPRISE PRODUCTION',
      prompt: 'response_format=IncidentReportSchema(strict=True)\n# Automatically parses into typed PagerDuty incident payload',
      output: '{\n  "incident_id": "INC-8819",\n  "severity": "HIGH",\n  "root_cause": "Read-replica connection exhaustion",\n  "requires_failover": false,\n  "recommended_action": "Increase pgbouncer max_client_conn to 500"\n}',
      flaw: '100% deterministic schema adherence, zero hallucinations, immediately dispatchable to PagerDuty & Slack webhooks.'
    }
  ];

  const levers = [
    {
      title: '1. Specificity Lever',
      before: 'Summarize the log briefly.',
      after: 'Summarize the root cause in exactly 2 bullet points under 30 words total.',
      impact: 'Eliminates verbose fluff and forces dense factual summarization.',
      color: '#38bdf8'
    },
    {
      title: '2. Context & Grounding Lever',
      before: 'Why did the payment service fail?',
      after: 'Using the provided Stripe API error reference doc [Doc #41], diagnose error code 402.',
      impact: 'Eliminates hallucinations by constraining answers to verified source material.',
      color: '#0ea5e9'
    },
    {
      title: '3. Few-Shot Exemplar Lever',
      before: 'Format customer address into standardized format.',
      after: 'Input: "apt 4b, 100 main st, ny ny" -> Output: "100 Main St, Apt 4B, New York, NY 10001"',
      impact: 'Demonstrates non-trivial normalization rules and edge-case handling.',
      color: '#a78bfa'
    },
    {
      title: '4. Negative Constraint Lever',
      before: 'Write a migration script.',
      after: 'Write a migration script. Constraint: Do NOT use DROP TABLE or table locks.',
      impact: 'Prevents catastrophic destructive actions in production automation.',
      color: '#f43f5e'
    },
    {
      title: '5. Decomposition Lever',
      before: 'Extract customer entities, calculate credit score, and generate loan approval decision.',
      after: 'Step 1: Extract entities into JSON -> Step 2: Compute credit score -> Step 3: Issue verdict.',
      impact: 'Reduces cognitive load per prompt turn, yielding higher accuracy at each stage.',
      color: '#34d399'
    }
  ];

  const currentPhase = cyclePhases[cycleStep];
  const currentIter = iterations[iterationIdx];
  const currentLever = levers[leverIdx];

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

        {/* ===== PANEL 1: THE 4-PHASE CYCLE ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Step through the 4 recursive phases of the IBM Prompt Engineering loop:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {cyclePhases.map((phase, i) => (
                <button key={i} onClick={() => setCycleStep(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${cycleStep === i ? phase.color : '#334155'}`,
                  background: cycleStep === i ? `${phase.color}20` : '#1e293b',
                  color: cycleStep === i ? phase.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{phase.phase.split(':')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentPhase.color}`, borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: currentPhase.color, margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 800 }}>
                {currentPhase.phase}
              </h4>
              <p style={{ color: '#e2e8f0', fontSize: '0.82rem', lineHeight: '1.5', margin: '0 0 0.85rem' }}>
                <strong>Objective:</strong> {currentPhase.goal}
              </p>

              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ color: currentPhase.color, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Key Engineering Deliverables & Checks:
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.78rem', lineHeight: '1.6' }}>
                  {currentPhase.tasks.map((task, tIdx) => (
                    <li key={tIdx}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: IT INCIDENT CASE STUDY ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Compare how 4 iterations of an enterprise IT log triage prompt progressively converge to 99.4% accuracy:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {iterations.map((iter, i) => (
                <button key={i} onClick={() => setIterationIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${iterationIdx === i ? iter.color : '#334155'}`,
                  background: iterationIdx === i ? `${iter.color}20` : '#1e293b',
                  color: iterationIdx === i ? iter.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{iter.version.split(':')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentIter.color}`, borderRadius: '12px', padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ color: currentIter.color, margin: 0, fontSize: '1rem', fontWeight: 800 }}>{currentIter.version}</h4>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Measured Accuracy: {currentIter.passRate}</span>
                </div>
                <span style={{ background: `${currentIter.color}25`, color: currentIter.color, border: `1px solid ${currentIter.color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                  {currentIter.badge}
                </span>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Prompt Input Template:</div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.76rem', whiteSpace: 'pre-wrap' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentIter.prompt) }} />
                </pre>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#34d399', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Model Generated Output:</div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.76rem', whiteSpace: 'pre-wrap' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentIter.output) }} />
                </pre>
              </div>

              <div style={{ padding: '0.6rem 0.8rem', background: '#0f172a', borderRadius: '6px', fontSize: '0.75rem' }}>
                <strong style={{ color: currentIter.color }}>Diagnostic Evaluation:</strong> <span style={{ color: '#cbd5e1' }}>{currentIter.flaw}</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: 5 REFINEMENT LEVERS ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Explore the 5 core prompt refinement levers defined in IBM AI engineering methodology:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {levers.map((lever, i) => (
                <button key={i} onClick={() => setLeverIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${leverIdx === i ? lever.color : '#334155'}`,
                  background: leverIdx === i ? `${lever.color}20` : '#1e293b',
                  color: leverIdx === i ? lever.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{lever.title.split('.')[1]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentLever.color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <h4 style={{ color: currentLever.color, margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: 800 }}>
                {currentLever.title}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.75rem', background: '#3f1818', border: '1px solid #ef4444', borderRadius: '8px' }}>
                  <div style={{ color: '#fca5a5', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Before Refinement:</div>
                  <div style={{ color: '#f87171', fontSize: '0.78rem', fontFamily: 'monospace' }}>"{currentLever.before}"</div>
                </div>
                <div style={{ padding: '0.75rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '8px' }}>
                  <div style={{ color: '#6ee7b7', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>After Lever Applied:</div>
                  <div style={{ color: '#a7f3d0', fontSize: '0.78rem', fontFamily: 'monospace' }}>"{currentLever.after}"</div>
                </div>
              </div>

              <div style={{ padding: '0.6rem 0.8rem', background: '#0f172a', borderRadius: '6px', fontSize: '0.75rem', color: '#e2e8f0' }}>
                <strong style={{ color: currentLever.color }}>Impact on Output:</strong> {currentLever.impact}
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: CONVERGENCE & SLA GATE ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Objective stopping conditions for exiting the iterative refinement loop:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.9rem', background: '#1e293b', border: '1.5px solid #34d399', borderRadius: '10px' }}>
                <div style={{ color: '#34d399', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Accuracy Gate</div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>&gt;= 95.0%</div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.2rem' }}>Pass rate across 100+ evaluation cases</div>
              </div>

              <div style={{ padding: '0.9rem', background: '#1e293b', border: '1.5px solid #38bdf8', borderRadius: '10px' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Schema Gate</div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>0.0% Errors</div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.2rem' }}>100% strict JSON schema validation</div>
              </div>

              <div style={{ padding: '0.9rem', background: '#1e293b', border: '1.5px solid #f59e0b', borderRadius: '10px' }}>
                <div style={{ color: '#f59e0b', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Latency Gate</div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>&lt; 850 ms</div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.2rem' }}>P95 time-to-complete under SLA budget</div>
              </div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.9rem' }}>
              <div style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Production Deployment Rule:
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.78rem', lineHeight: '1.5', margin: 0 }}>
                Never deploy prompt changes directly to production without running the full automated evaluation suite. All prompt artifacts must be version-controlled in Git and regression-tested via CI/CD pipelines to prevent prompt degradation.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── AI API ANATOMY DIAGRAM (REST, JSON, STATELESS PROTOCOL) ─────────────────
const AIApiAnatomyDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [providerIdx, setProviderIdx] = useState(0);
  const [memoryMode, setMemoryMode] = useState('stateful_client');
  const [statusCodeIdx, setStatusCodeIdx] = useState(0);

  const panels = [
    { label: 'HTTP Request Inspector', color: '#0284c7' },
    { label: 'Stateless Memory Protocol', color: '#8b5cf6' },
    { label: 'Status Code Simulator', color: '#f59e0b' },
    { label: 'Provider Architecture Matrix', color: '#10b981' },
  ];

  const providers = [
    {
      name: 'Google Gemini (Gemini 1.5 Pro)',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
      authHeader: 'x-goog-api-key: AIzaSyD94kK2801nLq...',
      modelId: 'gemini-1.5-pro',
      sdkSample: `import google.generativeai as genai

genai.configure(api_key="AIzaSy...")
model = genai.GenerativeModel("gemini-1.5-pro")
res = model.generate_content("Explain quantum computing in 1 sentence.")`,
      color: '#38bdf8'
    },
    {
      name: 'Anthropic (Claude 3.5 Sonnet)',
      endpoint: 'https://api.anthropic.com/v1/messages',
      authHeader: 'x-api-key: sk-ant-api03-...\\nanthropic-version: 2023-06-01',
      modelId: 'claude-3-5-sonnet-20240620',
      sdkSample: `import anthropic

client = anthropic.Anthropic()
res = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain quantum computing in 1 sentence."}]
)`,
      color: '#f59e0b'
    },
    {
      name: 'OpenAI (GPT-4o)',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      authHeader: 'Authorization: Bearer sk-prod-live-9948271049281',
      modelId: 'gpt-4o',
      sdkSample: `from openai import OpenAI

client = OpenAI()
res = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Explain quantum computing in 1 sentence."}]
)`,
      color: '#10b981'
    }
  ];

  const statusCodes = [
    {
      code: '200 OK',
      meaning: 'Request Succeeded',
      color: '#10b981',
      responseBody: `{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Quantum computing harnesses quantum mechanics to process complex data exponentially faster."
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 18,
    "candidatesTokenCount": 24,
    "totalTokenCount": 42
  }
}`,
      remedy: 'Normal operation. Extract text from candidates[0].content.parts[0].text and log usageMetadata metrics.'
    },
    {
      code: '401 Unauthorized',
      meaning: 'Authentication Failed',
      color: '#ef4444',
      responseBody: `{
  "error": {
    "message": "Incorrect API key provided: sk-invalid-key...",
    "type": "invalid_request_error",
    "code": "invalid_api_key"
  }
}`,
      remedy: 'Verify that your API secret key is correctly set in environment variables and that your account billing is active.'
    },
    {
      code: '429 Rate Limit Exceeded',
      meaning: 'Too Many Requests (RPM/TPM)',
      color: '#f59e0b',
      responseBody: `{
  "error": {
    "message": "Rate limit reached for requests per min (RPM) on model gpt-4o.",
    "type": "tokens",
    "code": "rate_limit_exceeded"
  }
}`,
      remedy: 'Implement Exponential Backoff with jitter (e.g. wait 2s -> 4s -> 8s before retrying) or upgrade your quota tier.'
    },
    {
      code: '503 Service Unavailable',
      meaning: 'GPU Server Overloaded',
      color: '#a855f7',
      responseBody: `{
  "error": {
    "message": "The server is currently overloaded with other requests. Please retry in 10s.",
    "type": "server_error",
    "code": "server_overloaded"
  }
}`,
      remedy: 'Infrastructure capacity bottleneck at the AI provider. Automatically failover to a secondary model (e.g. Claude or Gemini).'
    }
  ];

  const currentProvider = providers[providerIdx];
  const currentStatus = statusCodes[statusCodeIdx];

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

        {/* ===== PANEL 1: HTTP REQUEST INSPECTOR ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Inspect how modern applications send raw HTTP POST requests vs Python SDK calls across major providers:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {providers.map((prov, i) => (
                <button key={i} onClick={() => setProviderIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${providerIdx === i ? prov.color : '#334155'}`,
                  background: providerIdx === i ? `${prov.color}20` : '#1e293b',
                  color: providerIdx === i ? prov.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{prov.name.split(' ')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentProvider.color}`, borderRadius: '12px', padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ color: currentProvider.color, margin: 0, fontSize: '1rem', fontWeight: 800 }}>{currentProvider.name}</h4>
                <span style={{ background: '#0f172a', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                  POST
                </span>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>REST Endpoint:</div>
                <div style={{ color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.76rem', wordBreak: 'break-all' }}>{currentProvider.endpoint}</div>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Authorization Header:</div>
                <div style={{ color: '#a7f3d0', fontFamily: 'monospace', fontSize: '0.76rem' }}>{currentProvider.authHeader}</div>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.75rem' }}>
                <div style={{ color: currentProvider.color, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Official Python SDK Equivalent:</div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.76rem', whiteSpace: 'pre-wrap' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentProvider.sdkSample) }} />
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: STATELESS MEMORY PROTOCOL ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Why AI APIs are strictly stateless and how client applications maintain multi-turn context:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setMemoryMode('stateless_fail')} style={{
                padding: '0.4rem 0.8rem', borderRadius: '8px',
                border: `1.5px solid ${memoryMode === 'stateless_fail' ? '#ef4444' : '#334155'}`,
                background: memoryMode === 'stateless_fail' ? '#ef444420' : '#1e293b',
                color: memoryMode === 'stateless_fail' ? '#f87171' : '#94a3b8',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Scenario A: Stateless Amnesia (Fail)</button>

              <button onClick={() => setMemoryMode('stateful_client')} style={{
                padding: '0.4rem 0.8rem', borderRadius: '8px',
                border: `1.5px solid ${memoryMode === 'stateful_client' ? '#10b981' : '#334155'}`,
                background: memoryMode === 'stateful_client' ? '#10b98120' : '#1e293b',
                color: memoryMode === 'stateful_client' ? '#34d399' : '#94a3b8',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Scenario B: Client-Side Accumulator (Correct)</button>
            </div>

            {memoryMode === 'stateless_fail' ? (
              <div style={{ background: '#1e293b', border: '1.5px solid #ef4444', borderRadius: '12px', padding: '1.1rem' }}>
                <h4 style={{ color: '#ef4444', margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 800 }}>
                  Turn 2 Sent WITHOUT History:
                </h4>
                <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                  <div style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Request 2 Payload:</div>
                  <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.76rem' }}>
                    <code dangerouslySetInnerHTML={{ __html: highlightCode('{"messages": [{"role": "user", "content": "What is my name?"}]}') }} />
                  </pre>
                </div>
                <div style={{ background: '#3f1818', border: '1px solid #ef4444', borderRadius: '8px', padding: '0.75rem', color: '#fca5a5', fontSize: '0.78rem' }}>
                  <strong>Server Response:</strong> "I am sorry, but you have not told me your name yet. How can I help you today?"
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.76rem', margin: '0.6rem 0 0' }}>
                  The server did not store Request 1 ("My name is Alex"). It processed Request 2 in complete isolation.
                </p>
              </div>
            ) : (
              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1.1rem' }}>
                <h4 style={{ color: '#10b981', margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 800 }}>
                  Turn 2 Sent WITH Accumulated Conversation Array:
                </h4>
                <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                  <div style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Request 2 Payload:</div>
                  <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(`{
  "messages": [
    {"role": "user", "content": "Hi, my name is Alex."},
    {"role": "assistant", "content": "Hello Alex! How can I assist you today?"},
    {"role": "user", "content": "What is my name?"}
  ]
}`) }} />
                  </pre>
                </div>
                <div style={{ background: '#0c2a1f', border: '1px solid #10b981', borderRadius: '8px', padding: '0.75rem', color: '#6ee7b7', fontSize: '0.78rem' }}>
                  <strong>Server Response:</strong> "Your name is Alex!"
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.76rem', margin: '0.6rem 0 0' }}>
                  The client application maintains the state array in frontend memory or database and re-transmits it on every turn.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ===== PANEL 3: STATUS CODE SIMULATOR ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Simulate server status codes and understand production error handling:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {statusCodes.map((st, i) => (
                <button key={i} onClick={() => setStatusCodeIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${statusCodeIdx === i ? st.color : '#334155'}`,
                  background: statusCodeIdx === i ? `${st.color}20` : '#1e293b',
                  color: statusCodeIdx === i ? st.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{st.code.split(' ')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentStatus.color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <h4 style={{ color: currentStatus.color, margin: 0, fontSize: '1rem', fontWeight: 800 }}>HTTP {currentStatus.code}</h4>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{currentStatus.meaning}</span>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                <div style={{ color: currentStatus.color, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Simulated Server JSON Response:</div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem', whiteSpace: 'pre-wrap' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentStatus.responseBody) }} />
                </pre>
              </div>

              <div style={{ padding: '0.6rem 0.8rem', background: '#0f172a', borderRadius: '6px', fontSize: '0.75rem' }}>
                <strong style={{ color: currentStatus.color }}>Engineering Action / Remedy:</strong> <span style={{ color: '#cbd5e1' }}>{currentStatus.remedy}</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: PROVIDER ARCHITECTURE MATRIX ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Architectural comparison across the three dominant AI API ecosystems:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '10px', padding: '0.9rem' }}>
                <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>OpenAI Ecosystem</div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.75rem', lineHeight: '1.6' }}>
                  <li><strong>Endpoint:</strong> /v1/chat/completions</li>
                  <li><strong>Auth:</strong> Bearer Token (sk-...)</li>
                  <li><strong>Key Feature:</strong> Strict JSON Schemas via response_format</li>
                  <li><strong>Ecosystem:</strong> De facto industry API standard</li>
                </ul>
              </div>

              <div style={{ background: '#1e293b', border: '1.5px solid #38bdf8', borderRadius: '10px', padding: '0.9rem' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Google Gemini</div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.75rem', lineHeight: '1.6' }}>
                  <li><strong>Endpoint:</strong> :generateContent</li>
                  <li><strong>Auth:</strong> API Key or Google Cloud ADC</li>
                  <li><strong>Key Feature:</strong> 2M+ token multimodal context window</li>
                  <li><strong>Ecosystem:</strong> Deep Vertex AI & GCP integration</li>
                </ul>
              </div>

              <div style={{ background: '#1e293b', border: '1.5px solid #f59e0b', borderRadius: '10px', padding: '0.9rem' }}>
                <div style={{ color: '#f59e0b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Anthropic Claude</div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.75rem', lineHeight: '1.6' }}>
                  <li><strong>Endpoint:</strong> /v1/messages</li>
                  <li><strong>Auth:</strong> x-api-key header</li>
                  <li><strong>Key Feature:</strong> Superior coding & reasoning precision</li>
                  <li><strong>Ecosystem:</strong> Bedrock, GCP Vertex, & Direct API</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── API KEY SECURITY & SECRETS MANAGEMENT DIAGRAM ───────────────────────────
const ApiSecurityDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [archMode, setArchMode] = useState('proxy');
  const [defenseLevel, setDefenseLevel] = useState(0);
  const [budgetMonthly, setBudgetMonthly] = useState(100);
  const [softAlert, setSoftAlert] = useState(50);
  const [runbookStep, setRunbookStep] = useState(0);

  const panels = [
    { label: 'Architecture: Proxy vs Leak', color: '#e11d48' },
    { label: '3-Layer Defense Hierarchy', color: '#38bdf8' },
    { label: 'Billing Hardening Simulator', color: '#10b981' },
    { label: 'Emergency Incident Runbook', color: '#f59e0b' },
  ];

  const defenseLayers = [
    {
      level: 'Layer 1: Local Development (.env + .gitignore)',
      scope: 'Developer Laptop / Local Machine',
      color: '#38bdf8',
      tools: 'python-dotenv / dotenv-cli, .gitignore, .env.example template',
      summary: 'Keep secret values strictly inside an uncommitted .env file. Commit only a sanitized .env.example with dummy values so teammates know what keys are needed.',
      code: `# .gitignore (MUST contain):
.env
.env.local
.env.*.local
*.pem
secrets/`
    },
    {
      level: 'Layer 2: Pre-Commit & CI/CD Secret Scanning',
      scope: 'Git Hooks & Pull Request Automation',
      color: '#8b5cf6',
      tools: 'Gitleaks, TruffleHog, GitHub Secret Scanning, git-secrets',
      summary: 'Automated pre-commit hooks scan every staged file for high-entropy strings and regex patterns matching known API key prefixes (e.g. sk-proj-...) before git push.',
      code: `# Run pre-commit scanner:
gitleaks protect --staged --verbose
# If secret detected -> BLOCKS COMMIT AUTOMATICALLY`
    },
    {
      level: 'Layer 3: Enterprise Cloud Secret Managers',
      scope: 'Production AWS / GCP / Azure Infrastructure',
      color: '#10b981',
      tools: 'AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault',
      summary: 'Zero plaintext keys stored on application virtual machines. Secrets are encrypted at rest (AES-256), access-controlled via IAM roles, and auto-rotated on a 90-day cadence.',
      code: `# Python retrieving key from GCP Secret Manager via IAM:
from google.cloud import secretmanager

client = secretmanager.SecretManagerServiceClient()
secret = client.access_secret_version(name="projects/123/secrets/ai-key/versions/latest")
api_key = secret.payload.data.decode("UTF-8")`
    }
  ];

  const runbookSteps = [
    {
      step: '1. Revoke the Compromised Key Immediately',
      urgency: 'TIME TO RESOLVE: < 60 SECONDS',
      color: '#ef4444',
      action: 'Log into the AI provider console (OpenAI / Anthropic / GCP). Click "Delete / Revoke". This invalidates all active bot connections and stops the billing hemorrhage instantly.',
      warning: 'Do NOT waste time deleting the git commit or repository first. Scrapers mirror public commits to offline datastores in sub-seconds.'
    },
    {
      step: '2. Generate & Deploy Replacement Key',
      urgency: 'TIME TO RESOLVE: < 5 MINUTES',
      color: '#f59e0b',
      action: 'Generate a new scoped key. Update the hosting platform environment variables (Vercel / AWS Parameter Store / GCP Secrets). Trigger redeploy.',
      warning: 'Never send the new key over unencrypted Slack, email, or chat messages.'
    },
    {
      step: '3. Audit Billing & Token Spike Telemetry',
      urgency: 'TIME TO RESOLVE: < 30 MINUTES',
      color: '#38bdf8',
      action: 'Inspect real-time API logs, token usage graphs, and geographic IP origins. Contact provider enterprise support to request billing waivers for verified bot attacks.',
      warning: 'Document the exact time window of the breach for security post-mortems.'
    },
    {
      step: '4. Scrub Git Commit History',
      urgency: 'POST-INCIDENT CLEANUP',
      color: '#10b981',
      action: 'Use git-filter-repo or BFG Repo-Cleaner to rewrite historical commit trees and force-push to remote with branch protections.',
      warning: 'Verify all collaborators re-clone fresh copies of the rewritten repository.'
    }
  ];

  const currentLayer = defenseLayers[defenseLevel];
  const currentStep = runbookSteps[runbookStep];

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

        {/* ===== PANEL 1: BACKEND PROXY VS LEAK SIMULATOR ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Compare how client-side Direct Calls expose credentials vs how a Backend Proxy shields keys:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setArchMode('leak')} style={{
                padding: '0.4rem 0.8rem', borderRadius: '8px',
                border: `1.5px solid ${archMode === 'leak' ? '#ef4444' : '#334155'}`,
                background: archMode === 'leak' ? '#ef444420' : '#1e293b',
                color: archMode === 'leak' ? '#f87171' : '#94a3b8',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Scenario A: Direct Client Call (CRITICAL LEAK)</button>

              <button onClick={() => setArchMode('proxy')} style={{
                padding: '0.4rem 0.8rem', borderRadius: '8px',
                border: `1.5px solid ${archMode === 'proxy' ? '#10b981' : '#334155'}`,
                background: archMode === 'proxy' ? '#10b98120' : '#1e293b',
                color: archMode === 'proxy' ? '#34d399' : '#94a3b8',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}>Scenario B: Backend Proxy Architecture (SECURE)</button>
            </div>

            {archMode === 'leak' ? (
              <div style={{ background: '#1e293b', border: '1.5px solid #ef4444', borderRadius: '12px', padding: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <h4 style={{ color: '#ef4444', margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
                    Client Browser holding NEXT_PUBLIC_GEMINI_KEY:
                  </h4>
                  <span style={{ background: '#ef444425', color: '#f87171', border: '1px solid #ef4444', padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                    SEVERITY: CRITICAL
                  </span>
                </div>

                <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                  <div style={{ color: '#ef4444', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    Browser DevTools &gt; Network Inspection (Visible to Any User):
                  </div>
                  <pre style={{ margin: 0, color: '#f87171', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                    Request URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent{'\n'}
                    Request Headers:{'\n'}
                    &gt; x-goog-api-key: AIzaSyD-LIVE-CREDIT-CARD-COMPROMISED
                  </pre>
                </div>

                <div style={{ padding: '0.6rem 0.8rem', background: '#3f1818', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '0.75rem', color: '#fca5a5' }}>
                  <strong>Vulnerability Analysis:</strong> Any visitor can right-click your website, inspect network traffic, copy your API key, and drain your account balance.
                </div>
              </div>
            ) : (
              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <h4 style={{ color: '#10b981', margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
                    Production Pattern: Browser &gt; Backend Proxy (/api/chat) &gt; AI Provider
                  </h4>
                  <span style={{ background: '#10b98125', color: '#34d399', border: '1px solid #10b981', padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                    PRODUCTION SAFE
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.7rem' }}>
                    <div style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>1. Client Browser:</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.74rem' }}>Calls <code>/api/chat</code> with session cookie. Key is NOT in browser bundle.</div>
                  </div>
                  <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.7rem' }}>
                    <div style={{ color: '#a78bfa', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>2. Node / Python Server:</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.74rem' }}>Authenticates user, checks rate limit, loads secret from <code>process.env</code>.</div>
                  </div>
                  <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.7rem' }}>
                    <div style={{ color: '#34d399', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>3. AI Provider:</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.74rem' }}>Receives secure server-to-server request over private TLS.</div>
                  </div>
                </div>

                <div style={{ padding: '0.6rem 0.8rem', background: '#0c2a1f', border: '1px solid #10b981', borderRadius: '6px', fontSize: '0.75rem', color: '#6ee7b7' }}>
                  <strong>Security Guarantee:</strong> The client never sees or handles the secret API key under any circumstance.
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== PANEL 2: 3-LAYER DEFENSE HIERARCHY ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Step through the 3 layers of defense from local workstation to enterprise cloud:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {defenseLayers.map((layer, i) => (
                <button key={i} onClick={() => setDefenseLevel(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${defenseLevel === i ? layer.color : '#334155'}`,
                  background: defenseLevel === i ? `${layer.color}20` : '#1e293b',
                  color: defenseLevel === i ? layer.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{layer.level.split(':')[0]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentLayer.color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: currentLayer.color, margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>{currentLayer.level}</h4>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{currentLayer.scope}</span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.78rem', lineHeight: '1.5', margin: '0 0 0.75rem' }}>
                {currentLayer.summary}
              </p>

              <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem' }}>
                <div style={{ color: currentLayer.color, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Configuration Sample:</div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem', whiteSpace: 'pre-wrap' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentLayer.code) }} />
                </pre>
              </div>

              <div style={{ padding: '0.55rem 0.75rem', background: '#0f172a', borderRadius: '6px', fontSize: '0.74rem', color: '#94a3b8' }}>
                <strong>Key Tooling:</strong> <span style={{ color: '#e2e8f0' }}>{currentLayer.tools}</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: BILLING HARDENING SIMULATOR ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Configure provider dashboard spending guardrails to prevent surprise runaway bills:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.85rem', background: '#1e293b', border: '1.5px solid #f59e0b', borderRadius: '10px' }}>
                <div style={{ color: '#f59e0b', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Soft Alert Threshold</div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>${softAlert}.00 / mo</div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.2rem' }}>Automated email alert sent to SRE team</div>
              </div>

              <div style={{ padding: '0.85rem', background: '#1e293b', border: '1.5px solid #ef4444', borderRadius: '10px' }}>
                <div style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Hard Monthly Cutoff</div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>${budgetMonthly}.00 / mo</div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.2rem' }}>Rejects all subsequent requests with HTTP 429</div>
              </div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.85rem' }}>
              <div style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Rule of Thumb for Development vs Production:
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.78rem', lineHeight: '1.5', margin: 0 }}>
                Always set a hard monthly cap (e.g. $50 for personal dev accounts, $500 for staging) immediately upon creating a provider account. Without hard cutoffs, an unthrottled loop or leaked key can incur thousands of dollars of debt in hours.
              </p>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: EMERGENCY INCIDENT RUNBOOK ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Emergency protocol if a secret key is accidentally pushed to a public repository:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {runbookSteps.map((s, i) => (
                <button key={i} onClick={() => setRunbookStep(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${runbookStep === i ? s.color : '#334155'}`,
                  background: runbookStep === i ? `${s.color}20` : '#1e293b',
                  color: runbookStep === i ? s.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>Step {i + 1}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentStep.color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <h4 style={{ color: currentStep.color, margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>{currentStep.step}</h4>
                <span style={{ color: currentStep.color, fontSize: '0.68rem', fontWeight: 800 }}>{currentStep.urgency}</span>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.6rem', color: '#e2e8f0', fontSize: '0.78rem', lineHeight: '1.5' }}>
                {currentStep.action}
              </div>

              <div style={{ padding: '0.6rem 0.8rem', background: '#3f1818', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '0.75rem', color: '#fca5a5' }}>
                <strong>CRITICAL WARNING:</strong> {currentStep.warning}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── FIRST AI REQUEST DIAGRAM (GOOGLE GEMINI PYTHON SDK) ─────────────────────
const FirstAiRequestDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [modelType, setModelType] = useState('flash');
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(250);
  const [selectedTask, setSelectedTask] = useState(0);
  const [finishReasonIdx, setFinishReasonIdx] = useState(0);

  const panels = [
    { label: 'Live Python SDK Workbench', color: '#2563eb' },
    { label: 'Flash vs Pro Benchmark', color: '#38bdf8' },
    { label: 'GenerationConfig Dials', color: '#10b981' },
    { label: 'Response & Finish Reasons', color: '#f59e0b' },
  ];

  const tasks = [
    {
      title: 'Technical SRE Bug Explainer',
      sys: 'You are a senior site reliability engineer (SRE). Provide concise root-cause analyses.',
      prompt: 'Why does a Linux server report "No space left on device" when df -h shows 40% free space?',
      response: 'This occurs because the filesystem has run out of INODES (file metadata pointers), even though disk blocks remain free. Run "df -i" to verify inode exhaustion and remove directories containing millions of tiny log/session files.',
      promptTokens: 28,
      candidatesTokens: 42
    },
    {
      title: 'Python API Code Generator',
      sys: 'You are a Python backend architect. Write clean, type-annotated code with docstrings.',
      prompt: 'Write a FastAPI endpoint with rate-limiting that returns server health status in JSON.',
      response: `from fastapi import FastAPI, Request
from slowapi import Limiter

app = FastAPI()
limiter = Limiter(key_func=lambda r: r.client.host)

@app.get("/health")
@limiter.limit("10/minute")
def health_check(request: Request):
    """Returns service uptime and database connectivity status."""
    return {"status": "healthy", "service": "payment-gateway"}`,
      promptTokens: 22,
      candidatesTokens: 68
    },
    {
      title: 'Creative Marketing Copywriter',
      sys: 'You are an award-winning copywriter. Craft punchy, viral brand taglines.',
      prompt: 'Create 3 brand taglines for an AI-powered code review tool.',
      response: '1. Ship Without the Fear: AI Code Reviews at Commit Speed.\n2. Less Syntax Debt, More Innovation.\n3. The Second Pair of Senior Eyes Your Pull Requests Deserve.',
      promptTokens: 18,
      candidatesTokens: 38
    }
  ];

  const finishReasons = [
    {
      reason: 'STOP',
      color: '#10b981',
      badge: 'NORMAL COMPLETION',
      desc: 'The model naturally completed its train of thought and emitted an end-of-sequence token.',
      code: `if response.candidates[0].finish_reason == "STOP":
    # Response is complete and ready to serve
    return response.text`
    },
    {
      reason: 'MAX_TOKENS',
      color: '#f59e0b',
      badge: 'TRUNCATED',
      desc: 'Generation was cut off midway because the token count hit your configured max_output_tokens limit.',
      code: `if response.candidates[0].finish_reason == "MAX_TOKENS":
    # Warning: Output was cut off! Increase max_output_tokens or prompt to be more concise
    log_warning("Response truncated by token ceiling")`
    },
    {
      reason: 'SAFETY',
      color: '#ef4444',
      badge: 'FILTERED',
      desc: 'The model stopped generation because the output triggered automated content safety guardrails.',
      code: `if response.candidates[0].finish_reason == "SAFETY":
    # Fallback to safe user-friendly rejection notice
    return "Response could not be completed due to safety policy."`
    }
  ];

  const currentTask = tasks[selectedTask];
  const currentFinish = finishReasons[finishReasonIdx];
  const currentModelName = modelType === 'flash' ? 'gemini-1.5-flash' : 'gemini-1.5-pro';

  const generatedPythonCode = `import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel(
    model_name="${currentModelName}",
    system_instruction="${currentTask.sys}"
)

config = genai.GenerationConfig(
    temperature=${temperature},
    max_output_tokens=${maxTokens}
)

response = model.generate_content(
    "${currentTask.prompt}",
    generation_config=config
)

print(response.text)`;

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

        {/* ===== PANEL 1: LIVE PYTHON WORKBENCH ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Select a task preset and model to watch the Python SDK code and response dynamically update:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              {tasks.map((t, i) => (
                <button key={i} onClick={() => setSelectedTask(i)} style={{
                  padding: '0.4rem 0.75rem', borderRadius: '8px',
                  border: `1.5px solid ${selectedTask === i ? '#2563eb' : '#334155'}`,
                  background: selectedTask === i ? '#2563eb20' : '#1e293b',
                  color: selectedTask === i ? '#60a5fa' : '#94a3b8',
                  fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer'
                }}>{t.title}</button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setModelType('flash')} style={{
                flex: 1, padding: '0.45rem', borderRadius: '8px',
                border: `1.5px solid ${modelType === 'flash' ? '#38bdf8' : '#334155'}`,
                background: modelType === 'flash' ? '#38bdf820' : '#1e293b',
                color: modelType === 'flash' ? '#38bdf8' : '#94a3b8',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>Gemini 1.5 Flash (Fast / Low Cost)</button>

              <button onClick={() => setModelType('pro')} style={{
                flex: 1, padding: '0.45rem', borderRadius: '8px',
                border: `1.5px solid ${modelType === 'pro' ? '#a78bfa' : '#334155'}`,
                background: modelType === 'pro' ? '#a78bfa20' : '#1e293b',
                color: modelType === 'pro' ? '#a78bfa' : '#94a3b8',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>Gemini 1.5 Pro (Deep Reasoning)</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: '#090d16', border: '1.5px solid #334155', borderRadius: '10px', padding: '0.85rem' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Live Generated Python Script:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: '1.45', overflowX: 'auto' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(generatedPythonCode) }} />
                </pre>
              </div>

              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '10px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    Simulated Output (response.text):
                  </span>
                  <span style={{ background: '#10b98120', color: '#34d399', border: '1px solid #10b981', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800 }}>
                    FINISH: STOP
                  </span>
                </div>
                <pre style={{ margin: '0 0 0.6rem', color: '#cbd5e1', fontFamily: 'monospace', fontSize: '0.72rem', whiteSpace: 'pre-wrap', lineHeight: '1.45', background: '#0f172a', padding: '0.6rem', borderRadius: '6px' }}>
                  {currentTask.response}
                </pre>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.68rem', color: '#94a3b8' }}>
                  <span>Prompt: <strong>{currentTask.promptTokens} tokens</strong></span>
                  <span>|</span>
                  <span>Output: <strong>{currentTask.candidatesTokens} tokens</strong></span>
                  <span>|</span>
                  <span>Total: <strong>{currentTask.promptTokens + currentTask.candidatesTokens} tokens</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: FLASH VS PRO BENCHMARK ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Architectural and cost trade-offs between Gemini 1.5 Flash and Gemini 1.5 Pro:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              <div style={{ background: '#1e293b', border: '1.5px solid #38bdf8', borderRadius: '12px', padding: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#38bdf8', margin: 0, fontSize: '1rem', fontWeight: 800 }}>Gemini 1.5 Flash</h4>
                  <span style={{ background: '#38bdf820', color: '#38bdf8', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800 }}>SPEED & EFFICIENCY</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.76rem', lineHeight: '1.6' }}>
                  <li><strong>Latency:</strong> Sub-second Time to First Token (~200ms)</li>
                  <li><strong>Context Window:</strong> 1 Million Tokens</li>
                  <li><strong>Input Price:</strong> $0.075 per 1M tokens</li>
                  <li><strong>Output Price:</strong> $0.30 per 1M tokens</li>
                  <li><strong>Best For:</strong> Chatbots, Real-time APIs, High-throughput extraction, Content classification</li>
                </ul>
              </div>

              <div style={{ background: '#1e293b', border: '1.5px solid #a78bfa', borderRadius: '12px', padding: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#a78bfa', margin: 0, fontSize: '1rem', fontWeight: 800 }}>Gemini 1.5 Pro</h4>
                  <span style={{ background: '#a78bfa20', color: '#a78bfa', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800 }}>FRONTIER REASONING</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.76rem', lineHeight: '1.6' }}>
                  <li><strong>Latency:</strong> ~600ms - 1.2s TTFT (deep multi-head attention)</li>
                  <li><strong>Context Window:</strong> Up to 2 Million Tokens (1hr video / 60k lines of code)</li>
                  <li><strong>Input Price:</strong> $1.25 per 1M tokens</li>
                  <li><strong>Output Price:</strong> $5.00 per 1M tokens</li>
                  <li><strong>Best For:</strong> Complex architecture design, Math, Code refactoring, Multi-document synthesis</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: GENERATIONCONFIG DIALS ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Interactive parameter tuning: Drag the sliders to see how temperature and token limits shape decoding:
            </p>

            <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1.1rem', marginBottom: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 800 }}>temperature: {temperature}</span>
                  <span style={{ color: temperature < 0.4 ? '#10b981' : temperature > 0.8 ? '#f59e0b' : '#38bdf8', fontSize: '0.75rem', fontWeight: 800 }}>
                    {temperature < 0.4 ? 'Deterministic & Factual (SRE / Code / SQL)' : temperature > 0.8 ? 'Creative & Unpredictable (Storytelling)' : 'Balanced (General Assistant)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.5"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 800 }}>max_output_tokens: {maxTokens} tokens</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Prevents runaway output & cost spikes</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="50"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem' }}>
              <div style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Resulting Python Config Object:</div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(`config = genai.GenerationConfig(\n    temperature=${temperature},\n    max_output_tokens=${maxTokens}\n)`) }} />
              </pre>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: RESPONSE & FINISH REASONS ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Understanding the response object structure and handling finish reasons in production:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {finishReasons.map((f, i) => (
                <button key={i} onClick={() => setFinishReasonIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${finishReasonIdx === i ? f.color : '#334155'}`,
                  background: finishReasonIdx === i ? `${f.color}20` : '#1e293b',
                  color: finishReasonIdx === i ? f.color : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{f.reason}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${currentFinish.color}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: currentFinish.color, margin: 0, fontSize: '1rem', fontWeight: 800 }}>finish_reason == "{currentFinish.reason}"</h4>
                <span style={{ background: `${currentFinish.color}25`, color: currentFinish.color, border: `1px solid ${currentFinish.color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                  {currentFinish.badge}
                </span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.78rem', margin: '0 0 0.75rem', lineHeight: '1.5' }}>
                {currentFinish.desc}
              </p>

              <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem' }}>
                <div style={{ color: currentFinish.color, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Production Verification Logic:</div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(currentFinish.code) }} />
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── CHAT COMPLETIONS & MULTI-TURN MESSAGES DIAGRAM (GOOGLE GEMINI) ───────────
const ChatCompletionsDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(2);
  const [windowSize, setWindowSize] = useState(4);
  const [dbState, setDbState] = useState('active');

  const panels = [
    { label: 'Multi-Turn Chat Simulator', color: '#8b5cf6' },
    { label: 'DB History Serializer & Rehydrate', color: '#38bdf8' },
    { label: 'Sliding Window Pruner', color: '#10b981' },
    { label: 'Token Compounding Telemetry', color: '#f59e0b' },
  ];

  const conversation = [
    {
      turn: 1,
      user: 'I am planning a 10-day trip to Tokyo in November.',
      model: 'Tokyo in November is wonderful! Autumn foliage (koyo) is at its peak with mild weather averaging 12-17°C (54-63°F). What activities are you most interested in?',
      tokens: 42
    },
    {
      turn: 2,
      user: 'What kind of jacket should I pack for this weather?',
      model: 'Pack a medium-weight jacket (like a trench coat, light wool coat, or fleece-lined windbreaker) plus lightweight layers like sweaters. Evenings get brisk near Tokyo Bay.',
      tokens: 38
    },
    {
      turn: 3,
      user: 'Can you recommend 3 day trips from our base city?',
      model: 'From Tokyo, 3 ideal day trips in November are:\n1. Nikko (1.5 hrs) — spectacular autumn foliage and historic Toshogu Shrine.\n2. Kamakura (1 hr) — coastal town with the Great Buddha.\n3. Hakone (1.5 hrs) — hot springs with Mount Fuji views.',
      tokens: 58
    }
  ];

  const allTurns = [
    { role: 'user', text: 'Trip to Tokyo in November', turn: 1 },
    { role: 'model', text: 'November weather in Tokyo is 12-17C with autumn foliage...', turn: 1 },
    { role: 'user', text: 'What jacket should I pack?', turn: 2 },
    { role: 'model', text: 'Pack medium-weight jacket with layered sweaters...', turn: 2 },
    { role: 'user', text: 'Suggest 3 day trips from base city', turn: 3 },
    { role: 'model', text: '1. Nikko (1.5 hrs), 2. Kamakura (1 hr), 3. Hakone (1.5 hrs)...', turn: 3 },
    { role: 'user', text: 'How do I purchase the JR Pass?', turn: 4 },
    { role: 'model', text: 'Purchase online before arrival or at Narita/Haneda airport...', turn: 4 },
  ];

  const totalTokens = conversation.slice(0, currentTurn + 1).reduce((acc, t) => acc + t.tokens, 0);

  const serializedJson = JSON.stringify(
    conversation.slice(0, currentTurn + 1).flatMap(c => [
      { role: 'user', parts: [c.user] },
      { role: 'model', parts: [c.model] }
    ]),
    null,
    2
  );

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

        {/* ===== PANEL 1: MULTI-TURN SIMULATOR ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Step through consecutive conversation turns to see how <code>model.start_chat()</code> accumulates state in memory:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {[0, 1, 2].map((idx) => (
                <button key={idx} onClick={() => setCurrentTurn(idx)} style={{
                  flex: 1, padding: '0.45rem', borderRadius: '8px',
                  border: `1.5px solid ${currentTurn === idx ? '#8b5cf6' : '#334155'}`,
                  background: currentTurn === idx ? '#8b5cf620' : '#1e293b',
                  color: currentTurn === idx ? '#c4b5fd' : '#94a3b8',
                  fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
                }}>Turn {idx + 1} ({idx === 0 ? 'Context' : idx === 1 ? 'Follow-up' : 'Day Trips'})</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {/* Chat bubble visualizer */}
              <div style={{ background: '#090d16', border: '1.5px solid #334155', borderRadius: '10px', padding: '0.85rem' }}>
                <div style={{ color: '#8b5cf6', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Live Chat UI (User Experience):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {conversation.slice(0, currentTurn + 1).map((turn, tIdx) => (
                    <div key={tIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div style={{ alignSelf: 'flex-end', background: '#2563eb', color: '#fff', padding: '0.45rem 0.75rem', borderRadius: '12px 12px 2px 12px', fontSize: '0.74rem', maxWidth: '85%' }}>
                        {turn.user}
                      </div>
                      <div style={{ alignSelf: 'flex-start', background: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '0.45rem 0.75rem', borderRadius: '12px 12px 12px 2px', fontSize: '0.74rem', maxWidth: '90%', whiteSpace: 'pre-line' }}>
                        {turn.model}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal SDK chat.history array */}
              <div style={{ background: '#1e293b', border: '1.5px solid #8b5cf6', borderRadius: '10px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#c4b5fd', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    Internal chat.history State:
                  </span>
                  <span style={{ background: '#8b5cf620', color: '#c4b5fd', border: '1px solid #8b5cf6', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800 }}>
                    {currentTurn + 1} TURNS ACCUMULATED
                  </span>
                </div>
                <pre style={{ margin: '0 0 0.5rem', color: '#cbd5e1', fontFamily: 'monospace', fontSize: '0.7rem', maxHeight: '220px', overflowY: 'auto', background: '#090d16', padding: '0.6rem', borderRadius: '6px' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(serializedJson) }} />
                </pre>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                  Cumulative Payload: <strong style={{ color: '#38bdf8' }}>{totalTokens * 2} tokens sent on this turn</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: DB SERIALIZATION & REHYDRATION ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              How backend architectures serialize chat history to databases and restore sessions:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setDbState('active')} style={{
                flex: 1, padding: '0.45rem', borderRadius: '8px',
                border: `1.5px solid ${dbState === 'active' ? '#38bdf8' : '#334155'}`,
                background: dbState === 'active' ? '#38bdf820' : '#1e293b',
                color: dbState === 'active' ? '#38bdf8' : '#94a3b8',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>Step 1: Serialize to PostgreSQL / Redis</button>

              <button onClick={() => setDbState('rehydrate')} style={{
                flex: 1, padding: '0.45rem', borderRadius: '8px',
                border: `1.5px solid ${dbState === 'rehydrate' ? '#10b981' : '#334155'}`,
                background: dbState === 'rehydrate' ? '#10b98120' : '#1e293b',
                color: dbState === 'rehydrate' ? '#34d399' : '#94a3b8',
                fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
              }}>Step 2: Rehydrate on New Server Session</button>
            </div>

            {dbState === 'active' ? (
              <div style={{ background: '#1e293b', border: '1.5px solid #38bdf8', borderRadius: '12px', padding: '1.1rem' }}>
                <h4 style={{ color: '#38bdf8', margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 800 }}>
                  Extracting chat.history to JSON:
                </h4>
                <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem' }}>
                  <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(`# Extract before server connection closes:
db_payload = [
    {"role": turn.role, "parts": [p.text for p in turn.parts]}
    for turn in chat.history
]

# Save into PostgreSQL (jsonb column) or Redis cache:
await db.execute(
    "UPDATE conversations SET history = $1 WHERE user_id = $2",
    json.dumps(db_payload), user_id
)`) }} />
                  </pre>
                </div>
              </div>
            ) : (
              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1.1rem' }}>
                <h4 style={{ color: '#10b981', margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 800 }}>
                  Rehydrating ChatSession from Database:
                </h4>
                <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem' }}>
                  <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(`# User logs in next day on mobile app:
saved_history = await db.fetchval("SELECT history FROM conversations WHERE user_id = $1", user_id)

# Rehydrate session instantaneously without re-running past turns:
chat = model.start_chat(history=saved_history)

# Model immediately answers with full context of Tokyo & November:
response = chat.send_message("What day trips do you suggest?")`) }} />
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== PANEL 3: SLIDING WINDOW PRUNER ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              The Sliding Context Window retains the system prompt + latest N turns, pruning older turns to cap costs:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {[2, 4, 6].map((sz) => (
                <button key={sz} onClick={() => setWindowSize(sz)} style={{
                  flex: 1, padding: '0.45rem', borderRadius: '8px',
                  border: `1.5px solid ${windowSize === sz ? '#10b981' : '#334155'}`,
                  background: windowSize === sz ? '#10b98120' : '#1e293b',
                  color: windowSize === sz ? '#34d399' : '#94a3b8',
                  fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer'
                }}>Window Size: Last {sz} Messages</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  Conversation Timeline (Total 8 Messages):
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                  Pruned: {8 - windowSize} messages | Retained: {windowSize} messages
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.75rem' }}>
                {allTurns.map((msg, i) => {
                  const isRetained = i >= 8 - windowSize;
                  return (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.4rem 0.75rem', borderRadius: '6px',
                      background: isRetained ? '#0c2a1f' : '#1a1f2c',
                      border: `1px solid ${isRetained ? '#10b981' : '#334155'}`,
                      opacity: isRetained ? 1 : 0.45
                    }}>
                      <span style={{ color: isRetained ? '#34d399' : '#64748b', fontSize: '0.74rem', fontWeight: 700 }}>
                        Turn {msg.turn} ({msg.role}): {msg.text}
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: isRetained ? '#34d399' : '#ef4444' }}>
                        {isRetained ? 'ACTIVE IN PAYLOAD' : 'PRUNED / SUMMARIZED'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: '0.6rem 0.8rem', background: '#090d16', borderRadius: '6px', fontSize: '0.74rem', color: '#cbd5e1' }}>
                <strong style={{ color: '#10b981' }}>Python Sliding Window Logic:</strong> <code>trimmed_history = chat.history[-{windowSize}:]</code>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 4: TOKEN COMPOUNDING TELEMETRY ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Why unpruned multi-turn chat exhibits quadratic token cost growth without a sliding window:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: '#1e293b', border: '1.5px solid #ef4444', borderRadius: '10px', padding: '0.9rem' }}>
                <div style={{ color: '#ef4444', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Unpruned Chat (Turn 1 to 20)
                </div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>~8,400 Tokens</div>
                <div style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '0.2rem' }}>Re-transmits entire conversation history on every single request</div>
              </div>

              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '10px', padding: '0.9rem' }}>
                <div style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Sliding Window (Last 4 Turns)
                </div>
                <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>~600 Tokens Constant</div>
                <div style={{ color: '#6ee7b7', fontSize: '0.72rem', marginTop: '0.2rem' }}>Predictable, flat cost curve with sub-200ms latency</div>
              </div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.85rem' }}>
              <div style={{ color: '#f59e0b', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Production Recommendation:
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.78rem', lineHeight: '1.5', margin: 0 }}>
                Always combine a permanent <code>system_instruction</code> (system role) with a sliding window of the last 6-10 conversation messages. For long-term user memory, use an asynchronous background task to extract user facts into a database profile rather than accumulating infinite raw transcript turns.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── STREAMING RESPONSES DIAGRAM (GOOGLE GEMINI SSE) ─────────────────────────
const StreamingResponsesDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [tokenCount, setTokenCount] = useState(0);

  const panels = [
    { label: 'Live SSE Stream Simulator', color: '#06b6d4' },
    { label: 'Blocking vs Streaming Benchmark', color: '#38bdf8' },
    { label: 'FastAPI & SSE Protocol Pipe', color: '#10b981' },
    { label: 'Stream Interruption & Recovery', color: '#f59e0b' },
  ];

  const fullSample = "To optimize database query performance: 1. Add B-Tree indexes on high-cardinality foreign keys. 2. Eliminate SELECT * in favor of explicit columns. 3. Utilize connection pooling to minimize TCP handshake overhead.";

  const startStreamSimulation = () => {
    setIsStreaming(true);
    setStreamedText('');
    setTokenCount(0);
    const words = fullSample.split(' ');
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        setStreamedText((prev) => (prev ? prev + ' ' + words[currentIdx] : words[currentIdx]));
        setTokenCount((prev) => prev + 1);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 90);
  };

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

        {/* PANEL 1: LIVE SSE STREAM SIMULATOR */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Click below to simulate real-time token chunk delivery via <code>stream=True</code> and Server-Sent Events (SSE):
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
              <button onClick={startStreamSimulation} disabled={isStreaming} style={{
                padding: '0.5rem 1.2rem', borderRadius: '8px',
                border: '1.5px solid #06b6d4',
                background: isStreaming ? '#334155' : '#06b6d420',
                color: isStreaming ? '#94a3b8' : '#22d3ee',
                fontWeight: 800, fontSize: '0.8rem', cursor: isStreaming ? 'not-allowed' : 'pointer'
              }}>
                {isStreaming ? 'Streaming Tokens in Progress...' : 'Start Real-Time Stream Simulation'}
              </button>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Tokens Arrived: <strong style={{ color: '#22d3ee' }}>{tokenCount}</strong> | TTFT: <strong style={{ color: '#10b981' }}>220ms</strong>
              </span>
            </div>

            <div style={{ background: '#090d16', border: '1.5px solid #06b6d4', borderRadius: '10px', padding: '1rem', minHeight: '110px' }}>
              <div style={{ color: '#06b6d4', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Live Stream Terminal (chunk.text):
              </div>
              <p style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.78rem', lineHeight: '1.5' }}>
                {streamedText || 'Click the button above to observe sub-second streaming tokens appearing on screen...'}
                {isStreaming && <span style={{ display: 'inline-block', width: '8px', height: '14px', background: '#06b6d4', marginLeft: '4px', verticalAlign: 'middle' }} />}
              </p>
            </div>
          </div>
        )}

        {/* PANEL 2: BENCHMARK */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Side-by-side perceived user latency comparison:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              <div style={{ background: '#1e293b', border: '1.5px solid #ef4444', borderRadius: '12px', padding: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ color: '#ef4444', margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>Blocking (stream=False)</h4>
                  <span style={{ background: '#ef444420', color: '#f87171', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800 }}>HIGH LATENCY</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.75rem', lineHeight: '1.6' }}>
                  <li><strong>Time to First Token (TTFT):</strong> 4,200ms (frozen screen)</li>
                  <li><strong>User Experience:</strong> User stares at blank screen with a loading spinner</li>
                  <li><strong>Timeout Risk:</strong> Higher risk of HTTP gateway timeouts on long outputs</li>
                </ul>
              </div>

              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ color: '#10b981', margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>Streaming (stream=True)</h4>
                  <span style={{ background: '#10b98120', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800 }}>SUB-SECOND UX</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.75rem', lineHeight: '1.6' }}>
                  <li><strong>Time to First Token (TTFT):</strong> ~220ms (immediate feedback)</li>
                  <li><strong>User Experience:</strong> Words stream continuously, perceived instant speed</li>
                  <li><strong>Network Health:</strong> Active TCP keepalive packets eliminate timeouts</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: FASTAPI SSE PIPE */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              How FastAPI translates Gemini chunk iterators into Server-Sent Events (SSE):
            </p>

            <div style={{ background: '#090d16', border: '1.5px solid #10b981', borderRadius: '10px', padding: '0.85rem' }}>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem', lineHeight: '1.45' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(`from fastapi.responses import StreamingResponse

async def event_generator():
    response = model.generate_content("Explain RAG pipelines", stream=True)
    for chunk in response:
        # Standard Server-Sent Events framing
        yield f"data: {chunk.text}\\n\\n"
    yield "data: [DONE]\\n\\n"

@app.get("/stream")
def stream():
    return StreamingResponse(event_generator(), media_type="text/event-stream")`) }} />
              </pre>
            </div>
          </div>
        )}

        {/* PANEL 4: INTERRUPTIONS */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Handling network disconnects and safety stops in streaming applications:
            </p>

            <div style={{ background: '#1e293b', border: '1.5px solid #f59e0b', borderRadius: '10px', padding: '1rem' }}>
              <h4 style={{ color: '#f59e0b', margin: '0 0 0.4rem', fontSize: '0.9rem', fontWeight: 800 }}>
                Resilient Client Consumer Pattern:
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.75rem', lineHeight: '1.5', margin: '0 0 0.6rem' }}>
                When consuming SSE streams on the frontend via <code>fetch()</code> or <code>EventSource</code>, always append tokens to a persistent state variable. If a network drops after 300 words, retain the 300 words on screen rather than resetting the UI to empty!
              </p>
              <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.65rem' }}>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(`try:
    for chunk in response:
        append_to_ui(chunk.text)
except Exception as stream_err:
    log_telemetry("Stream interrupted cleanly", stream_err)
    # UI retains existing partial text seamlessly`) }} />
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── FUNCTION CALLING DIAGRAM (GOOGLE GEMINI TOOLS) ───────────────────────────
const FunctionCallingDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedTool, setSelectedTool] = useState(0);

  const panels = [
    { label: '4-Step Tool Loop Animator', color: '#f59e0b' },
    { label: 'Tool Schema & Docstring Inspector', color: '#38bdf8' },
    { label: 'Multi-Tool Dispatcher Simulator', color: '#10b981' },
    { label: 'Automatic vs Manual Calling', color: '#a78bfa' },
  ];

  const loopSteps = [
    {
      num: 1,
      title: '1. Prompt Sent with Tools Registered',
      badge: 'CLIENT -> GEMINI',
      desc: 'Client sends user prompt ("Check weather in Tokyo") alongside Python tool definitions.',
      code: 'model = genai.GenerativeModel("gemini-1.5-flash", tools=[get_weather])\nresponse = model.generate_content("What is the weather in Tokyo?")'
    },
    {
      num: 2,
      title: '2. Model Emits function_call Request',
      badge: 'GEMINI -> CLIENT',
      desc: 'Gemini decides a tool is required and returns structured arguments instead of plain text.',
      code: '# response.candidates[0].content.parts[0].function_call:\n{\n  "name": "get_weather",\n  "args": { "city": "Tokyo" }\n}'
    },
    {
      num: 3,
      title: '3. Local Backend Executes Python Tool',
      badge: 'CLIENT EXECUTION',
      desc: 'Your Python backend executes the local get_weather("Tokyo") function and gets live API data.',
      code: 'tool_output = get_weather(city="Tokyo")\n# Returns: {"temperature": 18, "condition": "Sunny"}'
    },
    {
      num: 4,
      title: '4. Tool Response Synthesized',
      badge: 'GEMINI -> USER',
      desc: 'Backend feeds tool_output back to Gemini. The model synthesizes a natural human answer.',
      code: 'final_response = chat.send_message(tool_output)\nprint(final_response.text)\n# "The weather in Tokyo is currently 18°C and sunny."'
    }
  ];

  const tools = [
    {
      name: 'get_weather',
      doc: 'Fetches live temperature and conditions for a city.',
      args: '{"city": "Paris"}',
      result: '{"temp": 15, "unit": "C", "condition": "Cloudy"}'
    },
    {
      name: 'get_stock_price',
      doc: 'Fetches current market valuation for a ticker symbol.',
      args: '{"ticker": "GOOGL"}',
      result: '{"ticker": "GOOGL", "price": 178.50, "change": "+1.4%"}'
    },
    {
      name: 'calculate_tax',
      doc: 'Calculates sales tax based on subtotal and state code.',
      args: '{"subtotal": 250.00, "state": "CA"}',
      result: '{"tax_rate": "7.25%", "tax_amount": 18.13, "total": 268.13}'
    }
  ];

  const curTool = tools[selectedTool];

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

        {/* PANEL 1: LOOP ANIMATOR */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Step through the 4 phases of the secure client-model tool calling handshake:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {loopSteps.map((s, i) => (
                <button key={i} onClick={() => setStepIdx(i)} style={{
                  flex: 1, padding: '0.45rem', borderRadius: '8px',
                  border: `1.5px solid ${stepIdx === i ? '#f59e0b' : '#334155'}`,
                  background: stepIdx === i ? '#f59e0b20' : '#1e293b',
                  color: stepIdx === i ? '#fbbf24' : '#94a3b8',
                  fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer'
                }}>Step {s.num}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: '1.5px solid #f59e0b', borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <h4 style={{ color: '#f59e0b', margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
                  {loopSteps[stepIdx].title}
                </h4>
                <span style={{ background: '#f59e0b20', color: '#fbbf24', border: '1px solid #f59e0b', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800 }}>
                  {loopSteps[stepIdx].badge}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.78rem', margin: '0 0 0.75rem' }}>
                {loopSteps[stepIdx].desc}
              </p>
              <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem' }}>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(loopSteps[stepIdx].code) }} />
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 2: SCHEMA INSPECTOR */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              How Gemini parses Python docstrings and type annotations to build tool schemas:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  1. Your Python Function Definition:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: '1.45' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(`def get_weather(city: str) -> dict:
    """Fetches real-time weather metrics for a city."""
    return {"temp": 18, "condition": "Sunny"}`) }} />
                </pre>
              </div>

              <div style={{ background: '#090d16', border: '1px solid #10b981', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  2. Gemini Auto-Generated Tool Schema:
                </div>
                <pre style={{ margin: 0, color: '#cbd5e1', fontFamily: 'monospace', fontSize: '0.7rem', lineHeight: '1.4' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(`{\n  "name": "get_weather",\n  "description": "Fetches real-time weather metrics for a city.",\n  "parameters": {\n    "type": "OBJECT",\n    "properties": {\n      "city": { "type": "STRING" }\n    },\n    "required": ["city"]\n  }\n}`) }} />
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: MULTI-TOOL DISPATCHER */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Select a tool to observe model argument synthesis and deterministic execution:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {tools.map((t, i) => (
                <button key={i} onClick={() => setSelectedTool(i)} style={{
                  flex: 1, padding: '0.45rem', borderRadius: '8px',
                  border: `1.5px solid ${selectedTool === i ? '#10b981' : '#334155'}`,
                  background: selectedTool === i ? '#10b98120' : '#1e293b',
                  color: selectedTool === i ? '#34d399' : '#94a3b8',
                  fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer'
                }}>{t.name}()</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                <span>Tool: <strong style={{ color: '#34d399' }}>{curTool.name}</strong></span>
                <span>Role: <strong>{curTool.doc}</strong></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ background: '#090d16', padding: '0.6rem', borderRadius: '6px' }}>
                  <div style={{ color: '#f59e0b', fontSize: '0.68rem', fontWeight: 800, marginBottom: '0.2rem' }}>MODEL GENERATED ARGS:</div>
                  <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.72rem' }}>{curTool.args}</pre>
                </div>
                <div style={{ background: '#090d16', padding: '0.6rem', borderRadius: '6px' }}>
                  <div style={{ color: '#10b981', fontSize: '0.68rem', fontWeight: 800, marginBottom: '0.2rem' }}>LOCAL EXECUTION RESULT:</div>
                  <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.72rem' }}>{curTool.result}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 4: AUTO VS MANUAL */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Automatic vs Manual tool execution patterns in Python:
            </p>

            <div style={{ background: '#090d16', border: '1.5px solid #a78bfa', borderRadius: '10px', padding: '0.85rem' }}>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem', lineHeight: '1.45' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(`# OPTION A: Automatic Tool Calling (Recommended for Chatbots)
chat = model.start_chat(enable_automatic_function_calling=True)
response = chat.send_message("What is the stock price of GOOGL?")
print(response.text)  # Final synthesized output automatically!

# OPTION B: Manual Tool Calling (Recommended for Audit Logs & Human-in-the-Loop)
response = model.generate_content("What is the stock price of GOOGL?")
if response.candidates[0].content.parts[0].function_call:
    call = response.candidates[0].content.parts[0].function_call
    # Explicitly approve and log execution in enterprise systems
    result = execute_locally(call.name, call.args)`) }} />
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── JSON SCHEMA ENFORCEMENT DIAGRAM (GOOGLE GEMINI) ──────────────────────────
const JsonSchemaEnforcementDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);

  const panels = [
    { label: 'Constrained Logit Masking Engine', color: '#10b981' },
    { label: 'Prompt Heuristics vs JSON Mode Benchmark', color: '#ef4444' },
    { label: 'Python Deserialization Workbench', color: '#38bdf8' },
    { label: 'JSON Mode vs Schema Enforcement', color: '#f59e0b' },
  ];

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

        {/* PANEL 1: LOGIT MASKING */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              How Constrained Logit Decoding physically prevents invalid JSON syntax at the token sampling level:
            </p>

            <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '12px', padding: '1.1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#cbd5e1', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                Current Generation State: <code>&#123; "order_id": "ORD-100", "amount": </code>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                <div style={{ background: '#0c2a1f', border: '1px solid #10b981', padding: '0.5rem', borderRadius: '6px' }}>
                  <span style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 800 }}>PERMISSIBLE TOKENS (Valid)</span>
                  <div style={{ color: '#a7f3d0', fontSize: '0.75rem', marginTop: '0.2rem' }}>Digits (0-9), '.', whitespace</div>
                  <div style={{ color: '#6ee7b7', fontSize: '0.68rem' }}>Logit Prob: Normal (Sampled)</div>
                </div>
                <div style={{ background: '#2c1517', border: '1px solid #ef4444', padding: '0.5rem', borderRadius: '6px' }}>
                  <span style={{ color: '#f87171', fontSize: '0.72rem', fontWeight: 800 }}>MASKED TOKENS (Illegal)</span>
                  <div style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.2rem' }}>Words, backticks, unquoted keys</div>
                  <div style={{ color: '#f87171', fontSize: '0.68rem' }}>Logit Prob: -Infinity (Blocked)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 2: BENCHMARK */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Production failure rates across 10,000 automated extraction runs:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              <div style={{ background: '#1e293b', border: '1.5px solid #ef4444', borderRadius: '10px', padding: '1rem' }}>
                <h4 style={{ color: '#ef4444', margin: '0 0 0.3rem', fontSize: '0.9rem', fontWeight: 800 }}>Prompt Workaround ("Return only JSON")</h4>
                <div style={{ color: '#f87171', fontSize: '1.2rem', fontWeight: 900 }}>14.2% Failure Rate</div>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1rem', color: '#cbd5e1', fontSize: '0.74rem' }}>
                  <li>Markdown backticks included (\`\`\`json)</li>
                  <li>Trailing commas causing json.loads() crashes</li>
                  <li>Conversational preamble included</li>
                </ul>
              </div>

              <div style={{ background: '#1e293b', border: '1.5px solid #10b981', borderRadius: '10px', padding: '1rem' }}>
                <h4 style={{ color: '#10b981', margin: '0 0 0.3rem', fontSize: '0.9rem', fontWeight: 800 }}>Gemini JSON Mode (response_mime_type)</h4>
                <div style={{ color: '#34d399', fontSize: '1.2rem', fontWeight: 900 }}>0.00% Failure Rate</div>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1rem', color: '#cbd5e1', fontSize: '0.74rem' }}>
                  <li>Mathematically guaranteed valid syntax</li>
                  <li>Direct deserialization with json.loads()</li>
                  <li>Zero regex cleaning or string slicing</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: PYTHON WORKBENCH */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ background: '#090d16', border: '1.5px solid #38bdf8', borderRadius: '10px', padding: '0.85rem' }}>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem', lineHeight: '1.45' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(`config = genai.GenerationConfig(
    response_mime_type="application/json",
    temperature=0.0
)

response = model.generate_content(prompt, generation_config=config)

# Clean, guaranteed deserialization:
data = json.loads(response.text)
print("Order ID:", data["order_id"])`) }} />
              </pre>
            </div>
          </div>
        )}

        {/* PANEL 4: JSON MODE VS SCHEMA */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#cbd5e1', fontSize: '0.78rem', lineHeight: '1.5' }}>
              <strong>JSON Mode</strong> guarantees valid JSON formatting (matching braces, quoted strings), but does not constrain field names. If you require strict field names, nested models, and typed Enums, use <strong>Structured Outputs with Pydantic response_schema</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── STRUCTURED OUTPUTS PARSING DIAGRAM (PYDANTIC & GEMINI) ───────────────────
const StructuredOutputsParsingDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);

  const panels = [
    { label: 'Pydantic Schema Builder', color: '#6366f1' },
    { label: 'Type-Safe Pipeline Flow', color: '#38bdf8' },
    { label: 'IDE Autocomplete & Static Typing', color: '#10b981' },
    { label: 'Enterprise Schema Evolution', color: '#f59e0b' },
  ];

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

        {/* PANEL 1: PYDANTIC SCHEMA */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Defining strict Enums and nested data models for Gemini <code>response_schema</code>:
            </p>

            <div style={{ background: '#090d16', border: '1.5px solid #6366f1', borderRadius: '10px', padding: '0.85rem' }}>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: '1.45' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(`class PriorityLevel(str, Enum):
    LOW = "LOW"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class VulnerabilityReport(BaseModel):
    title: str = Field(description="CVE or exploit title")
    severity: PriorityLevel
    line_number: Optional[int]
    remediation: str

class AuditResult(BaseModel):
    repo_name: str
    passed: bool
    findings: List[VulnerabilityReport]`) }} />
              </pre>
            </div>
          </div>
        )}

        {/* PANEL 2: PIPELINE FLOW */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              End-to-end zero-error structured outputs pipeline flow:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.74rem', color: '#cbd5e1' }}>
                <strong>1. Python Schema Declaration:</strong> Pass <code>response_schema=AuditResult</code> to GenerationConfig.
              </div>
              <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.74rem', color: '#cbd5e1' }}>
                <strong>2. Constrained Sampling:</strong> Gemini decodes tokens matching the Pydantic JSON Schema representation.
              </div>
              <div style={{ background: '#0c2a1f', border: '1px solid #10b981', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.74rem', color: '#a7f3d0' }}>
                <strong>3. Instant Pydantic Validation:</strong> <code>AuditResult.model_validate_json(response.text)</code> produces a verified object with 0% runtime type errors!
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: AUTOCOMPLETE */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Full IDE static type checking and autocomplete in VS Code & PyCharm:
            </p>

            <div style={{ background: '#090d16', border: '1px solid #10b981', borderRadius: '8px', padding: '0.85rem' }}>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(`report: AuditResult = AuditResult.model_validate_json(response.text)

# Full dot-notation autocomplete with zero dictionary typos:
for item in report.findings:
    print(item.title, item.severity.value, item.remediation)`) }} />
              </pre>
            </div>
          </div>
        )}

        {/* PANEL 4: ENTERPRISE RULES */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#cbd5e1', fontSize: '0.78rem', lineHeight: '1.5' }}>
              Always annotate every field with <code>Field(description="...")</code>. Descriptions provide crucial semantic conditioning that steers the model toward accurate field population during constrained decoding.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── EFFECTIVE PROMPTS DIAGRAM (MIT SLOAN FRAMEWORK) ──────────────────────────
const EffectivePromptsDiagram = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [promptMode, setPromptMode] = useState('effective');
  const [activePillar, setActivePillar] = useState(0);

  const panels = [
    { label: '3 Pillars of Prompting', color: '#7c3aed' },
    { label: 'Interactive Prompt Lab', color: '#38bdf8' },
    { label: 'Problem Formulation (MIT)', color: '#f59e0b' },
    { label: 'Risk & Limitation Audit', color: '#ef4444' },
  ];

  const pillars = [
    {
      title: '1. Provide Context & Persona',
      badge: 'ROLE & AUDIENCE',
      color: '#7c3aed',
      desc: 'Assign the AI an explicit professional identity ("You are a senior systems architect...") and define the exact target audience ("Explain for a non-technical board member"). Feed writing samples to match style.',
      exampleVague: 'How do I optimize my database?',
      exampleEffective: 'You are a senior Principal Database Administrator. Our PostgreSQL cluster is experiencing high CPU load during peak hours. Explain 3 actionable indexing strategies to a junior developer using clear code snippets.'
    },
    {
      title: '2. Be Specific & Granular',
      badge: 'CONSTRAINTS & RULES',
      color: '#38bdf8',
      desc: 'The Granularity Rule: Output utility is directly proportional to input specificity. Specify precise output formats (e.g. JSON schema, bullet lists), word count limits, exact years, or geographic bounds.',
      exampleVague: 'Tell me about renewable energy.',
      exampleEffective: 'Compare solar vs. wind energy costs in Northern Europe over the 2020-2025 period. Output your response as a Markdown table with 4 columns: Energy Source, LCOE Cost, Efficiency %, and Key Drawback.'
    },
    {
      title: '3. Build on the Conversation',
      badge: 'ITERATIVE REFINEMENT',
      color: '#34d399',
      desc: 'LLMs maintain context state across turns within their context window. Refine outputs iteratively ("Make it more concise", "Add a real-world Python example") without retyping background context.',
      exampleVague: 'Re-explain everything with code.',
      exampleEffective: 'Great response! Now take strategy #2 from above and implement it as a production-ready Python decorator with error handling and docstrings.'
    }
  ];

  const scenarios = [
    {
      title: 'Explain Complex Topic (Fall Foliage)',
      vaguePrompt: 'What\'s the best time to see fall foliage in New England?',
      vagueOutput: 'Fall foliage in New England usually peaks in autumn, around late September through October. Northern areas like Vermont and New Hampshire peak earlier, while southern areas like Connecticut peak later.',
      vagueAnalysis: 'Generic, high-level, missing tailored depth and clear audience focus.',

      effectivePrompt: 'You are an experienced wildlife biologist specializing in trees. Based on recent USA weather patterns, predict the best fall foliage season for New England — and explain the science to kindergarteners.',
      effectiveOutput: 'Hey kids! Imagine trees are wearing cozy summer coats made of green leaves. When autumn gets chilly, the trees put away their green paint and show off bright hidden yellow and orange party outfits underneath! Chlorophyll (the green helper) takes a nap, letting carotenoids shine!',
      effectiveAnalysis: 'Tailored persona + explicit target audience + clear biological metaphor. Extremely high utility!'
    },
    {
      title: 'Software Development (Code Refactoring)',
      vaguePrompt: 'Fix this code to run faster.',
      vagueOutput: 'You can make code faster by using built-in functions, avoiding nested loops, and using vectorization or async functions depending on your language.',
      vagueAnalysis: 'Vague advice without language context or concrete code implementation.',

      effectivePrompt: 'You are a Principal Python Performance Engineer. Refactor the following data processing loop to process 1,000,000 records under 500ms. Use list comprehensions or NumPy, include type hints, and benchmark before vs after.',
      effectiveOutput: 'import numpy as np\n# Vectorized array calculation replacing slow Python loop\ndef process_fast(data: np.ndarray) -> np.ndarray:\n    return np.where(data > 0, data * 1.5, 0.0)\n\n# Benchmark: 1.2s -> 18ms (66x speedup)',
      effectiveAnalysis: 'Explicit role + hard performance constraints + exact library requirements + benchmark metrics.'
    },
    {
      title: 'Executive Communication (Client Memo)',
      vaguePrompt: 'Write an email about the project delay.',
      vagueOutput: 'Dear Client, I am writing to let you know that our project is experiencing some delays. We are working hard to finish it soon. Sorry for the inconvenience.',
      vagueAnalysis: 'Unprofessional, lacks accountability, timeline, and mitigation steps.',

      effectivePrompt: 'Act as a Senior Engagement Manager. Write a 3-paragraph executive email to a Fortune 500 VP explaining a 2-week delay in Sprint 4 due to API vendor downtime. Include: 1) Root cause, 2) Mitigated new delivery date (Oct 15), 3) No budget impact. Tone: confident, accountable, transparent.',
      effectiveOutput: 'Dear Sarah,\n\nI am writing to provide an updated timeline for Sprint 4. Due to an unexpected 48-hour outage with our third-party authentication vendor, we have adjusted our delivery date by two weeks to October 15.\n\nOur engineering team has implemented a failover mock system to ensure zero further downtime. This schedule adjustment carries zero budget impact, and all key security milestones remain 100% on track.\n\nBest regards,\nAlex',
      effectiveAnalysis: 'Professional tone + exact structure constraints + clear mitigations. Ready for immediate send.'
    }
  ];

  const currentScenario = scenarios[scenarioIdx];

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

        {/* ===== PANEL 1: THE 3 PILLARS ===== */}
        {activePanel === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Click through MIT Sloan's 3 core pillars of effective prompt engineering:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {pillars.map((pil, i) => (
                <button key={i} onClick={() => setActivePillar(i)} style={{
                  padding: '0.4rem 0.85rem', borderRadius: '8px',
                  border: `1.5px solid ${activePillar === i ? pil.color : '#334155'}`,
                  background: activePillar === i ? `${pil.color}20` : '#1e293b',
                  color: activePillar === i ? pil.color : '#cbd5e1',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{pil.title.split('.')[1]}</button>
              ))}
            </div>

            <div style={{ background: '#1e293b', border: `1.5px solid ${pillars[activePillar].color}`, borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ color: pillars[activePillar].color, margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                  {pillars[activePillar].title}
                </h4>
                <span style={{ background: `${pillars[activePillar].color}25`, color: pillars[activePillar].color, border: `1px solid ${pillars[activePillar].color}`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800 }}>
                  {pillars[activePillar].badge}
                </span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', margin: '0 0 1rem' }}>
                {pillars[activePillar].desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ padding: '0.75rem', background: '#3f1818', border: '1px solid #ef4444', borderRadius: '8px' }}>
                  <div style={{ color: '#fca5a5', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Vague Prompt (Low Context):</div>
                  <div style={{ color: '#f87171', fontSize: '0.82rem', fontFamily: 'monospace' }}>"{pillars[activePillar].exampleVague}"</div>
                </div>

                <div style={{ padding: '0.75rem', background: '#0c2a1f', border: '1px solid #34d399', borderRadius: '8px' }}>
                  <div style={{ color: '#6ee7b7', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Effective MIT-Style Prompt:</div>
                  <div style={{ color: '#a7f3d0', fontSize: '0.82rem', fontFamily: 'monospace' }}>"{pillars[activePillar].exampleEffective}"</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 2: INTERACTIVE PROMPT LAB ===== */}
        {activePanel === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Select a scenario and compare how a vague vs. MIT-effective prompt changes the AI's generated response:
            </p>

            {/* Scenario selectors */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {scenarios.map((sc, i) => (
                <button key={i} onClick={() => setScenarioIdx(i)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: '8px',
                  border: `1.5px solid ${scenarioIdx === i ? '#38bdf8' : '#334155'}`,
                  background: scenarioIdx === i ? '#38bdf820' : '#1e293b',
                  color: scenarioIdx === i ? '#38bdf8' : '#94a3b8',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
                }}>{sc.title}</button>
              ))}
            </div>

            {/* Prompt Mode Toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button onClick={() => setPromptMode('vague')} style={{
                flex: 1, padding: '0.5rem', borderRadius: '8px',
                border: '1.5px solid #ef4444',
                background: promptMode === 'vague' ? '#ef4444' : '#1e293b',
                color: promptMode === 'vague' ? '#fff' : '#f87171',
                fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer'
              }}>Vague Prompt Mode</button>
              <button onClick={() => setPromptMode('effective')} style={{
                flex: 1, padding: '0.5rem', borderRadius: '8px',
                border: '1.5px solid #34d399',
                background: promptMode === 'effective' ? '#34d399' : '#1e293b',
                color: promptMode === 'effective' ? '#0f172a' : '#34d399',
                fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer'
              }}>MIT Effective Prompt Mode</button>
            </div>

            {/* Live Comparison Output Box */}
            <div style={{ background: '#0f172a', border: `2px solid ${promptMode === 'effective' ? '#34d399' : '#ef4444'}`, borderRadius: '12px', padding: '1.1rem' }}>
              <div style={{ color: promptMode === 'effective' ? '#34d399' : '#f87171', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                INPUT PROMPT:
              </div>
              <div style={{ padding: '0.65rem 0.85rem', background: '#1e293b', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#e2e8f0', marginBottom: '0.85rem' }}>
                "{promptMode === 'effective' ? currentScenario.effectivePrompt : currentScenario.vaguePrompt}"
              </div>

              <div style={{ color: promptMode === 'effective' ? '#34d399' : '#f87171', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                GENERATED AI RESPONSE:
              </div>
              <div style={{ padding: '0.75rem', background: promptMode === 'effective' ? '#0c2a1f' : '#2d1515', border: `1px solid ${promptMode === 'effective' ? '#059669' : '#991b1b'}`, borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: promptMode === 'effective' ? '#a7f3d0' : '#fca5a5', whiteSpace: 'pre-wrap', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                {promptMode === 'effective' ? currentScenario.effectiveOutput : currentScenario.vagueOutput}
              </div>

              <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                <strong style={{ color: '#cbd5e1' }}>MIT Analysis:</strong> {promptMode === 'effective' ? currentScenario.effectiveAnalysis : currentScenario.vagueAnalysis}
              </div>
            </div>
          </div>
        )}

        {/* ===== PANEL 3: PROBLEM FORMULATION VS PROMPT ENG ===== */}
        {activePanel === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Dr. Oguz A. Acar (HBR / MIT Sloan) paradigm shift: Why problem definition matters more than prompt tricks.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ background: '#1c1200', border: '1.5px solid #f59e0b', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  Prompt Engineering
                </div>
                <div style={{ color: '#fcd34d', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.6rem' }}>SYNTAX & WORD CHOICE</div>
                <ul style={{ color: '#cbd5e1', fontSize: '0.78rem', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                  <li>Focuses on word selection & syntax</li>
                  <li>Uses formatting hacks & "magic words"</li>
                  <li>Requires manual tweaking per model update</li>
                  <li>Becoming automated by AI agents</li>
                </ul>
              </div>

              <div style={{ background: '#0c2a1f', border: '1.5px solid #34d399', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  Problem Formulation (MIT)
                </div>
                <div style={{ color: '#6ee7b7', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.6rem' }}>SCOPE & GOAL DEFINITION</div>
                <ul style={{ color: '#cbd5e1', fontSize: '0.78rem', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                  <li>Focuses on defining core business problem</li>
                  <li>Delineates scope, boundaries & success criteria</li>
                  <li>Identifies root user intent & ethical guardrails</li>
                  <li>Timeless human skill that AI cannot replace</li>
                </ul>
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
              <strong style={{ color: '#f59e0b' }}>Key Takeaway:</strong> As AI models automatically rewrite prompts and operate agentically, mastering <em style={{ color: '#e2e8f0' }}>Problem Formulation</em> ensures your AI systems solve the right business problems with precision.
            </div>
          </div>
        )}

        {/* ===== PANEL 4: RISK & LIMITATION AUDIT ===== */}
        {activePanel === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Critical risks and limitations to audit when crafting prompts:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                {
                  title: '1. AI Hallucinations & Factual Errors',
                  desc: 'Models generate confident, grammatically flawless text that is completely false (e.g. CNET 2023 financial article controversy). Always fact-check outputs.',
                  color: '#ef4444',
                  action: 'Add instruction: "If uncertain or if data is missing, state \'I do not have sufficient data\' instead of guessing."'
                },
                {
                  title: '2. Algorithmic Bias & Representation',
                  desc: 'Training data contains societal biases (e.g. MIT student photo editing controversy where skin tone was altered). Audit outputs for fairness.',
                  color: '#f97316',
                  action: 'Add instruction: "Ensure outputs use inclusive language and represent diverse perspectives neutrally."'
                },
                {
                  title: '3. Data Privacy & Confidentiality',
                  desc: 'Public commercial LLMs use user inputs to train future models unless opted out. Never paste PII or proprietary code.',
                  color: '#a78bfa',
                  action: 'Rule: Use anonymized mock datasets and verify enterprise data privacy compliance before sending sensitive data.'
                }
              ].map((r, i) => (
                <div key={i} style={{ padding: '0.9rem', background: '#1e293b', border: `1.5px solid ${r.color}`, borderRadius: '10px' }}>
                  <div style={{ color: r.color, fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.3rem' }}>{r.title}</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '0.5rem' }}>{r.desc}</div>
                  <div style={{ padding: '0.4rem 0.6rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', fontSize: '0.75rem', color: '#6ee7b7' }}>
                    <strong>Mitigation Prompt Rule:</strong> {r.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── CONTEXT MEMORY & RAG FOUNDATIONS DIAGRAM (ai-5-1) ──────────────────────
const ContextMemoryLimitDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Tab 0: FIFO Truncation State
  const [maxTurns, setMaxTurns] = useState(3); // 3 turns = 6 messages
  const [historyTurns, setHistoryTurns] = useState([
    { id: 1, user: "My favorite restaurant is Luigi's Italian Pasta House in Boston.", assistant: "Noted! I will remember Luigi's is your favorite Italian restaurant." },
    { id: 2, user: "What is the capital of Japan?", assistant: "The capital of Japan is Tokyo." },
    { id: 3, user: "Calculate 15 * 8 for me.", assistant: "15 * 8 = 120." }
  ]);
  const [queryResult, setQueryResult] = useState(null);

  const cannedTurns = [
    { id: 4, user: "Tell me a short science joke.", assistant: "Why do biologists look forward to cell division? Because it multiplies!" },
    { id: 5, user: "What is the boiling point of water in Celsius?", assistant: "Water boils at 100 degrees Celsius at standard atmospheric pressure." },
    { id: 6, user: "What is the weather usually like in Kyoto in October?", assistant: "Kyoto in October is pleasant with crisp autumn air and temperatures around 18-22C." }
  ];

  const handleAddTurn = () => {
    if (historyTurns.length < 6) {
      const nextTurn = cannedTurns[historyTurns.length - 3];
      if (nextTurn) {
        setHistoryTurns([...historyTurns, nextTurn]);
        setQueryResult(null);
      }
    }
  };

  const handleResetFifo = () => {
    setHistoryTurns([
      { id: 1, user: "My favorite restaurant is Luigi's Italian Pasta House in Boston.", assistant: "Noted! I will remember Luigi's is your favorite Italian restaurant." },
      { id: 2, user: "What is the capital of Japan?", assistant: "The capital of Japan is Tokyo." },
      { id: 3, user: "Calculate 15 * 8 for me.", assistant: "15 * 8 = 120." }
    ]);
    setQueryResult(null);
  };

  const handleTestRecall = () => {
    const activeSlice = historyTurns.slice(-maxTurns);
    const hasTurn1 = activeSlice.some(t => t.id === 1);
    if (hasTurn1) {
      setQueryResult({
        success: true,
        text: "Your favorite restaurant is Luigi's Italian Pasta House in Boston! (Retrieved directly from active working context)."
      });
    } else {
      setQueryResult({
        success: false,
        text: "I am sorry, you have not mentioned your favorite restaurant in our current conversation. (Turn 1 was evicted by FIFO sliding window truncation!)."
      });
    }
  };

  // Tab 1: Noise & Attention Dilution State
  const [noiseMode, setNoiseMode] = useState('bloated'); // 'bloated' | 'engineered'

  // Tab 2: Summarization State
  const [isCompressed, setIsCompressed] = useState(false);

  // Tab 3: 3-Tier Architecture Selection
  const [selectedTier, setSelectedTier] = useState(0);

  const tiers = [
    {
      title: "Tier 1: Working Context Window",
      tag: "TEMPORARY / RAM",
      color: "#38bdf8",
      scope: "Current HTTP Request Payload",
      capacity: "2K - 1M Tokens (~1.5K - 750K words)",
      latency: "< 250ms (In-Memory Attention)",
      cost: "Paid per input token on every API call",
      useCase: "Active conversation turns, immediate instructions, scratchpad reasoning."
    },
    {
      title: "Tier 2: Structured Profile Persistence",
      tag: "PERSISTENT / SESSION DISK",
      color: "#a855f7",
      scope: "User-Specific Preferences (JSON / SQL / Redis)",
      capacity: "Structured attributes (Diet, Locale, API Keys, Style)",
      latency: "10ms DB Query + Injected to System Prompt",
      cost: "Near zero database storage cost",
      useCase: "User profiles (Alice vs Bob), saved tone guidelines, authenticated session continuity."
    },
    {
      title: "Tier 3: Retrieval-Augmented Generation (RAG)",
      tag: "PERMANENT / EXTERNAL VECTOR STORE",
      color: "#10b981",
      scope: "Enterprise Knowledge Base (PDFs, Docs, Catalogs)",
      capacity: "Infinite (Millions of document chunks in Vector DB)",
      latency: "50-150ms Vector Top-K Retrieval",
      cost: "One-time embedding generation + storage",
      useCase: "Legal contracts, financial reports, company documentation portals, codebases."
    }
  ];

  return (
    <div style={{
      background: '#090d16',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
      fontFamily: 'Inter, sans-serif',
      margin: '2rem 0'
    }}>
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid #1e293b',
        background: 'linear-gradient(90deg, rgba(2,132,199,0.12) 0%, rgba(124,58,237,0.06) 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: '#0284c7', boxShadow: '0 0 12px #0284c7'
          }} />
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc', letterSpacing: '0.02em' }}>
            Interactive Context Memory &amp; RAG Architecture Lab
          </span>
        </div>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#38bdf8',
          background: 'rgba(56,189,248,0.12)',
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          border: '1px solid rgba(56,189,248,0.3)'
        }}>
          Working Memory vs Long-Term RAG
        </span>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #1e293b',
        background: '#0f172a',
        overflowX: 'auto'
      }}>
        {[
          { label: '1. FIFO Truncation Simulator', color: '#ef4444' },
          { label: '2. Attention Dilution & Noise', color: '#f59e0b' },
          { label: '3. AI Summarization Compressor', color: '#10b981' },
          { label: '4. 3-Tier Memory Architecture', color: '#38bdf8' }
        ].map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: '0.9rem 1.25rem',
              background: activeTab === idx ? '#1e293b' : 'transparent',
              color: activeTab === idx ? '#f8fafc' : '#94a3b8',
              border: 'none',
              borderBottom: activeTab === idx ? `3px solid ${tab.color}` : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT PANELS */}
      <div style={{ padding: '1.5rem' }}>

        {/* ─── TAB 0: FIFO TRUNCATION SIMULATOR ─── */}
        {activeTab === 0 && (
          <div>
            <div style={{ marginBottom: '1.25rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Experience how sliding window buffers (e.g. <code style={{ color: '#38bdf8', background: '#1e293b', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>conversation[-6:]</code>) cause <strong>catastrophic forgetting</strong> of early critical facts as new chat turns enter the queue.
            </div>

            {/* Controls Bar */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              background: '#131b2e',
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              border: '1px solid #1e293b',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Sliding Window Capacity:</span>
                <button
                  onClick={() => setMaxTurns(2)}
                  style={{
                    padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700,
                    background: maxTurns === 2 ? '#38bdf8' : '#1e293b',
                    color: maxTurns === 2 ? '#0f172a' : '#cbd5e1',
                    border: '1px solid #334155', cursor: 'pointer'
                  }}
                >
                  2 Turns (4 Msgs)
                </button>
                <button
                  onClick={() => setMaxTurns(3)}
                  style={{
                    padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700,
                    background: maxTurns === 3 ? '#38bdf8' : '#1e293b',
                    color: maxTurns === 3 ? '#0f172a' : '#cbd5e1',
                    border: '1px solid #334155', cursor: 'pointer'
                  }}
                >
                  3 Turns (6 Msgs)
                </button>
              </div>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleAddTurn}
                  disabled={historyTurns.length >= 6}
                  style={{
                    padding: '0.4rem 0.9rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700,
                    background: historyTurns.length < 6 ? '#10b981' : '#334155',
                    color: '#fff', border: 'none', cursor: historyTurns.length < 6 ? 'pointer' : 'not-allowed'
                  }}
                >
                  + Add Next Chat Turn ({historyTurns.length}/6)
                </button>
                <button
                  onClick={handleResetFifo}
                  style={{
                    padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700,
                    background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', cursor: 'pointer'
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Conversation History Visualizer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {historyTurns.map((turn, index) => {
                const distanceFromEnd = historyTurns.length - 1 - index;
                const isRetained = distanceFromEnd < maxTurns;
                const isCrucialTurn1 = turn.id === 1;

                return (
                  <div
                    key={turn.id}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      background: isRetained ? '#0f172a' : 'rgba(239,68,68,0.08)',
                      border: isRetained
                        ? (isCrucialTurn1 ? '1.5px solid #10b981' : '1px solid #334155')
                        : '1.5px dashed rgba(239,68,68,0.4)',
                      opacity: isRetained ? 1 : 0.45,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 800,
                        color: isRetained ? (isCrucialTurn1 ? '#10b981' : '#38bdf8') : '#ef4444',
                        textTransform: 'uppercase'
                      }}>
                        Turn {turn.id} {isCrucialTurn1 ? '— [KEY FACT DECLARED]' : ''}
                      </span>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 700,
                        padding: '0.15rem 0.5rem', borderRadius: '4px',
                        background: isRetained ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.2)',
                        color: isRetained ? '#34d399' : '#f87171'
                      }}>
                        {isRetained ? 'ACTIVE IN CONTEXT' : 'EVICTED BY FIFO TRUNCATION'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: isRetained ? '#e2e8f0' : '#94a3b8', textDecoration: isRetained ? 'none' : 'line-through' }}>
                      <span style={{ color: '#94a3b8' }}>User:</span> "{turn.user}"
                    </div>
                    <div style={{ fontSize: '0.8rem', color: isRetained ? '#a5f3fc' : '#64748b', marginTop: '0.25rem' }}>
                      <span style={{ color: '#64748b' }}>Assistant:</span> "{turn.assistant}"
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Test Recall Section */}
            <div style={{
              background: '#0d1527',
              border: '1px solid #1d2d50',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  Test Assistant Memory: <em style={{ color: '#38bdf8' }}>"What is my favorite restaurant?"</em>
                </span>
                <button
                  onClick={handleTestRecall}
                  style={{
                    padding: '0.45rem 1rem', borderRadius: '8px',
                    background: '#0284c7', color: '#fff', border: 'none',
                    fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
                  }}
                >
                  Send Query to Model Attention
                </button>
              </div>

              {queryResult && (
                <div style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '8px',
                  background: queryResult.success ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.12)',
                  border: queryResult.success ? '1px solid #10b981' : '1px solid #ef4444',
                  color: queryResult.success ? '#6ee7b7' : '#fca5a5',
                  fontSize: '0.85rem',
                  lineHeight: '1.5'
                }}>
                  <strong>Model Response:</strong> {queryResult.text}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 1: ATTENTION DILUTION & NOISE ─── */}
        {activeTab === 1 && (
          <div>
            <div style={{ marginBottom: '1.25rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Compare how stuffing raw unstructured noise into a prompt degrades reasoning efficiency versus <strong>Context Engineering</strong> with signal-only tokens.
            </div>

            {/* Mode Switcher */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setNoiseMode('bloated')}
                style={{
                  flex: 1, padding: '0.75rem', borderRadius: '10px',
                  background: noiseMode === 'bloated' ? '#1c1212' : '#0f172a',
                  border: noiseMode === 'bloated' ? '2px solid #ef4444' : '1px solid #334155',
                  color: noiseMode === 'bloated' ? '#f87171' : '#94a3b8',
                  fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer'
                }}
              >
                Bloated Raw Context (142 Tokens)
              </button>
              <button
                onClick={() => setNoiseMode('engineered')}
                style={{
                  flex: 1, padding: '0.75rem', borderRadius: '10px',
                  background: noiseMode === 'engineered' ? '#0c221a' : '#0f172a',
                  border: noiseMode === 'engineered' ? '2px solid #10b981' : '1px solid #334155',
                  color: noiseMode === 'engineered' ? '#34d399' : '#94a3b8',
                  fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer'
                }}
              >
                Engineered Concise Context (28 Tokens)
              </button>
            </div>

            {/* Telemetry Metrics Bar */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem', marginBottom: '1.25rem'
            }}>
              <div style={{ background: '#131b2e', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Token Consumption</div>
                <div style={{ color: noiseMode === 'bloated' ? '#f87171' : '#34d399', fontSize: '1.3rem', fontWeight: 900 }}>
                  {noiseMode === 'bloated' ? '142 Tokens' : '28 Tokens (-80%)'}
                </div>
              </div>
              <div style={{ background: '#131b2e', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Signal-To-Noise Ratio (SNR)</div>
                <div style={{ color: noiseMode === 'bloated' ? '#f59e0b' : '#38bdf8', fontSize: '1.3rem', fontWeight: 900 }}>
                  {noiseMode === 'bloated' ? '18% Signal' : '96% Signal'}
                </div>
              </div>
              <div style={{ background: '#131b2e', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Attention Risk</div>
                <div style={{ color: noiseMode === 'bloated' ? '#ef4444' : '#10b981', fontSize: '1.3rem', fontWeight: 900 }}>
                  {noiseMode === 'bloated' ? 'Lost in Middle' : 'Optimal Focus'}
                </div>
              </div>
            </div>

            {/* Prompt Token Breakdown */}
            <div style={{
              background: '#0b1120',
              border: `1.5px solid ${noiseMode === 'bloated' ? '#ef4444' : '#10b981'}`,
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {noiseMode === 'bloated' ? 'Payload with Irrelevant Distractors:' : 'Curated Clean Prompt Payload:'}
              </div>

              {noiseMode === 'bloated' ? (
                <div style={{ fontSize: '0.88rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                  Sally and Bob operate a 47-acre Vermont apple farm. <span style={{ background: 'rgba(16,185,129,0.25)', color: '#34d399', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>[SIGNAL: Sally has 14 apples.]</span> <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>[NOISE: Apples are often red and glossy.]</span> <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>[NOISE: 12 is a nice number according to Sally.]</span> <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>[NOISE: Bob has zero red apples.]</span> <span style={{ background: 'rgba(16,185,129,0.25)', color: '#34d399', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>[SIGNAL: Bob has 2 green apples.]</span> <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>[NOISE: Green apples often taste sour.]</span> How many apples do they have in total?
                </div>
              ) : (
                <div style={{ fontSize: '0.88rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>Facts:</span><br />
                  - Sally count: 14 apples<br />
                  - Bob count: 2 apples<br />
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>Question:</span> What is the total count of apples owned by Sally and Bob?
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 2: AI SUMMARIZATION COMPRESSOR ─── */}
        {activeTab === 2 && (
          <div>
            <div style={{ marginBottom: '1.25rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
              See how Google Gemini background summarization compresses 150-token conversation history down to a dense 40-token memory state, freeing up 75% of context window headroom.
            </div>

            {/* Compressor Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 700 }}>State:</span>
                <span style={{
                  padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800,
                  background: isCompressed ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                  color: isCompressed ? '#34d399' : '#fbbf24'
                }}>
                  {isCompressed ? 'COMPRESSED (40 TOKENS)' : 'RAW UNCOMPRESSED (150 TOKENS)'}
                </span>
              </div>

              <button
                onClick={() => setIsCompressed(!isCompressed)}
                style={{
                  padding: '0.5rem 1.25rem', borderRadius: '8px',
                  background: isCompressed ? '#1e293b' : '#10b981',
                  color: isCompressed ? '#38bdf8' : '#fff',
                  border: isCompressed ? '1px solid #334155' : 'none',
                  fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer'
                }}
              >
                {isCompressed ? 'Revert to Raw Chat' : 'Trigger Gemini 1.5 Flash Compression'}
              </button>
            </div>

            {/* Token Budget Meter */}
            <div style={{ background: '#131b2e', padding: '1rem', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                <span>Context Window Token Meter (200 Token Simulated Budget)</span>
                <span style={{ color: isCompressed ? '#34d399' : '#f59e0b', fontWeight: 800 }}>
                  {isCompressed ? '40 / 200 Tokens (20% Used - 160 Available)' : '150 / 200 Tokens (75% Used - 50 Available)'}
                </span>
              </div>
              <div style={{ width: '100%', height: '10px', background: '#0f172a', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  width: isCompressed ? '20%' : '75%',
                  height: '100%',
                  background: isCompressed ? '#10b981' : '#f59e0b',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>

            {/* Dual Column View */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Raw Input Turns (~150 Tokens):
                </div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontFamily: 'monospace', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                  {`User: Hi, planning a trip to Kyoto for 4 days Oct 12-16.
Assistant: Wonderful! Kyoto is gorgeous in autumn.
User: I am vegetarian and budget is $150/day.
Assistant: Got it, vegetarian under $150/day.
User: My hotel is located near Gion district.`}
                </div>
              </div>

              <div style={{ background: '#0b192c', border: '1px solid #0284c7', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Gemini Semantic Compressed Summary (~40 Tokens):
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a5f3fc', fontFamily: 'monospace', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                  {isCompressed ? (
                    `User Profile & Trip Constraints:
- Destination: Kyoto (Oct 12-16, 4 days)
- Lodging: Near Gion District
- Diet: Strict Vegetarian
- Daily Food Budget: $150/day`
                  ) : (
                    '(Click "Trigger Gemini Compression" above to generate dense state summary)'
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: 3-TIER MEMORY ARCHITECTURE ─── */}
        {activeTab === 3 && (
          <div>
            <div style={{ marginBottom: '1.25rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Production AI applications combine all three memory tiers to balance latency, cost, and unbounded long-term recall:
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {tiers.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTier(i)}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '8px',
                    border: `1.5px solid ${selectedTier === i ? t.color : '#334155'}`,
                    background: selectedTier === i ? `${t.color}20` : '#0f172a',
                    color: selectedTier === i ? t.color : '#94a3b8',
                    fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
                  }}
                >
                  {t.title}
                </button>
              ))}
            </div>

            {/* Selected Tier Card */}
            <div style={{
              background: '#0f172a',
              border: `2px solid ${tiers[selectedTier].color}`,
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ margin: 0, color: tiers[selectedTier].color, fontSize: '1.1rem', fontWeight: 800 }}>
                  {tiers[selectedTier].title}
                </h4>
                <span style={{
                  padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800,
                  background: `${tiers[selectedTier].color}25`, color: tiers[selectedTier].color
                }}>
                  {tiers[selectedTier].tag}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Scope &amp; Storage</div>
                  <div style={{ color: '#f8fafc', fontSize: '0.85rem', fontWeight: 600 }}>{tiers[selectedTier].scope}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Capacity Limit</div>
                  <div style={{ color: '#f8fafc', fontSize: '0.85rem', fontWeight: 600 }}>{tiers[selectedTier].capacity}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Access Latency</div>
                  <div style={{ color: '#f8fafc', fontSize: '0.85rem', fontWeight: 600 }}>{tiers[selectedTier].latency}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Cost Model</div>
                  <div style={{ color: '#f8fafc', fontSize: '0.85rem', fontWeight: 600 }}>{tiers[selectedTier].cost}</div>
                </div>
              </div>

              <div style={{ padding: '0.85rem 1rem', background: '#0b1120', borderRadius: '8px', border: '1px solid #1e293b' }}>
                <span style={{ color: tiers[selectedTier].color, fontWeight: 700, fontSize: '0.8rem' }}>Primary Industrial Use Case: </span>
                <span style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{tiers[selectedTier].useCase}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── KNOWLEDGE BASE INGESTION & CHUNKING SIMULATOR ────────────────────────
const KnowledgeBaseIngestionDiagram = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Tab 0: Architecture Flow Selection / Active Node Inspector
  const [selectedArchNode, setSelectedArchNode] = useState('overview');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepAnim, setActiveStepAnim] = useState(null);

  // Tab 1: Live Chunking Simulator State
  const [chunkSize, setChunkSize] = useState(250);
  const [chunkOverlap, setChunkOverlap] = useState(50);
  const [selectedPreset, setSelectedPreset] = useState('sla');
  const [customText, setCustomText] = useState('');
  const [splitMode, setSplitMode] = useState('recursive'); // recursive | fixed

  // Tab 2: Ingestion Pipeline Stage
  const [selectedStage, setSelectedStage] = useState(0);

  // Tab 3: Strategy Matrix
  const [selectedStrategy, setSelectedStrategy] = useState(0);

  // Tab 4: Metadata Query Simulator
  const [queryDept, setQueryDept] = useState('All');
  const [queryYear, setQueryYear] = useState('All');

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    const steps = ['pdf', 'extract', 'chunks', 'embed_api_ingest', 'vectors', 'index', 'kb', 'user_query', 'embed_query', 'semantic_search', 'top_k', 'llm', 'answer'];
    steps.forEach((st, idx) => {
      setTimeout(() => {
        setActiveStepAnim(st);
        setSelectedArchNode(st);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setActiveStepAnim(null);
          }, 1200);
        }
      }, idx * 600);
    });
  };

  const archNodes = {
    overview: {
      title: 'End-to-End RAG Architecture Overview',
      subtitle: 'Two distinct pipelines working together: Offline Ingestion & Online Query/Retrieval',
      color: '#7c3aed',
      description: 'Retrieval-Augmented Generation separates knowledge creation (top track) from real-time question answering (bottom track). Click on any component or hit "Simulate Full Pipeline" below to inspect how data flows through the system.'
    },
    pdf: {
      title: '1. Source Documents (PDFs, Docs, Wikis)',
      subtitle: 'Unstructured enterprise raw knowledge',
      color: '#ef4444',
      description: 'The raw inputs to your knowledge base. These include product manuals, PDFs, customer tickets, Word documents, and Markdown wikis containing proprietary domain facts.'
    },
    extract: {
      title: '2. Data Extraction & Parsing',
      subtitle: 'Converting binary formats into clean text streams',
      color: '#38bdf8',
      description: 'Parsers (like PyPDF, Docling, Unstructured, or OCR engines) extract text, preserve table layouts, and strip out non-text noise and binary artifacts.'
    },
    chunks: {
      title: '3. Text Slicing & Chunking (Chunks 1–4)',
      subtitle: 'Decomposing large documents into semantic passages',
      color: '#ec4899',
      description: 'Documents are divided into 200–500 token chunks (e.g. Chunk 1, Chunk 2, Chunk 3, Chunk 4) with 10–20% overlap so key facts and sentences are never fractured across boundaries.'
    },
    embed_api_ingest: {
      title: '4. Embedding API (Batch Conversion)',
      subtitle: 'Translating text into mathematical vectors',
      color: '#818cf8',
      description: 'Every chunk is passed to an embedding model (e.g., text-embedding-3-small) which outputs a high-dimensional vector (e.g. 1536 floating point numbers) capturing its semantic meaning.'
    },
    vectors: {
      title: '5. Vector Embeddings (Embedding 1–4)',
      subtitle: 'Dense geometric representations of meaning',
      color: '#2dd4bf',
      description: 'Each text chunk is mapped to a vector coordinate in vector space. Chunks with similar semantic meaning are placed close to each other in this multidimensional space.'
    },
    index: {
      title: '6. Build Semantic Index',
      subtitle: 'Fast approximate nearest neighbor (ANN) index',
      color: '#fbbf24',
      description: 'Constructs an optimized vector search index (HNSW, IVF, or Flat) that allows querying millions of vectors in under 15 milliseconds.'
    },
    kb: {
      title: '7. Knowledge Base (Vector Database)',
      subtitle: 'Persistent storage for chunks + embeddings + metadata',
      color: '#06b6d4',
      description: 'Systems like ChromaDB, Pinecone, FAISS, Milvus, and Azure AI Search store two essential items: (1) Vector Embeddings for similarity math, and (2) Raw text chunks + metadata for prompt injection.'
    },
    user_query: {
      title: '8. User Query Submission',
      subtitle: 'Natural language question from end user',
      color: '#22c55e',
      description: 'The user asks a question in plain English (e.g. "What is our refund claim SLA for Enterprise tier?"). At this point, the LLM has not seen the prompt yet.'
    },
    embed_query: {
      title: '9. Query Embedding Generation',
      subtitle: 'Vectorizing the user question',
      color: '#fbbf24',
      description: 'The exact same embedding model used during ingestion vectorizes the user question into a 1536-dimensional query vector.'
    },
    semantic_search: {
      title: '10. Semantic Vector Search',
      subtitle: 'Cosine similarity comparison against Knowledge Base',
      color: '#ec4899',
      description: 'The vector database compares the query vector against all indexed chunk vectors using cosine similarity or dot product math in milliseconds.'
    },
    top_k: {
      title: '11. Ranked Top-K Results',
      subtitle: 'Extracting only the 2–5 most relevant chunk passages',
      color: '#38bdf8',
      description: 'The database returns the top-K highest scoring chunks (e.g. Top 3 results). Irrelevant noise from the rest of the 500-page document is completely filtered out.'
    },
    llm: {
      title: '12. Large Language Model (LLM) Grounding',
      subtitle: 'Injecting retrieved context + query into prompt',
      color: '#c084fc',
      description: 'The LLM (GPT-4o, Claude 3.5, Gemini 1.5) receives the user query alongside the retrieved top-K context chunks. It synthesizes a grounded answer with zero hallucination.'
    },
    answer: {
      title: '13. Verified Grounded Answer',
      subtitle: 'Accurate response returned to user with citations',
      color: '#10b981',
      description: 'The user receives a precise, verified answer backed directly by the source document chunks with page/section citations.'
    }
  };

  const activeNodeData = archNodes[selectedArchNode] || archNodes.overview;

  const presets = {
    sla: `# Enterprise SLA & Billing Policy
Our cloud infrastructure guarantees 99.95% monthly uptime for all Enterprise tier accounts.
If uptime drops below 99.0%, clients receive an automatic 25% billing credit applied to next invoice.

## Refund Claim Procedure
To file a refund claim, submit an incident ticket within 30 calendar days to billing@acme-cloud.io.
Late claims submitted after 30 days will be rejected without exceptions.`,
    
    api: `# Authentication & Token Security
All REST endpoints require a Bearer token passed in the Authorization HTTP header.
Tokens expire after 3600 seconds (1 hour). Refresh tokens can be exchanged via POST /v1/auth/refresh.

## Rate Limiting Thresholds
Standard tier keys are throttled at 60 requests per minute (RPM).
Enterprise keys are provisioned with 3,000 RPM and guaranteed GPU inference priority.`,
    
    hr: `# Global Remote Work Equipment Policy
Employees in full-time engineering roles are eligible for a $1,500 home office hardware stipend.
Hardware must be purchased through approved corporate vendor portals to qualify for expense reimbursement.

## Security Compliance
All workstations must maintain active disk encryption (FileVault or BitLocker) and run company MDM software.`
  };

  const sampleText = customText || presets[selectedPreset] || presets.sla;

  // Live Recursive / Fixed Chunking Engine for Simulator
  const generateChunks = (text, size, overlap, mode) => {
    if (!text || size <= 0) return [];
    if (mode === 'fixed') {
      const step = Math.max(1, size - overlap);
      const res = [];
      for (let i = 0; i < text.length; i += step) {
        res.push(text.slice(i, i + size));
        if (i + size >= text.length) break;
      }
      return res;
    }

    // Recursive hierarchical split
    const seps = ['\n\n', '\n', '. ', ' '];
    let working = [text];
    for (let sep of seps) {
      let nextWorking = [];
      for (let piece of working) {
        if (piece.length <= size) {
          nextWorking.push(piece);
        } else {
          const parts = piece.split(sep);
          let curr = '';
          for (let part of parts) {
            const candidate = curr ? `${curr}${sep}${part}` : part;
            if (candidate.length <= size) {
              curr = candidate;
            } else {
              if (curr) nextWorking.push(curr.trim());
              const prefix = overlap > 0 && curr.length > overlap ? curr.slice(-overlap) : '';
              curr = prefix ? `${prefix}${sep}${part}` : part;
            }
          }
          if (curr) nextWorking.push(curr.trim());
        }
      }
      working = nextWorking;
    }
    return working.filter(c => c && c.trim().length > 0);
  };

  const simulatedChunks = generateChunks(sampleText, chunkSize, chunkOverlap, splitMode);

  // Ingestion Pipeline Stages
  const pipelineStages = [
    {
      stage: '1. Extraction & Parsing',
      badge: 'Step 1',
      color: '#38bdf8',
      summary: 'Extract raw text, tables, and document layout from heterogenous formats.',
      inputs: 'Raw PDF files, Markdown docs, HTML pages, Word files, Notion exports',
      process: 'PyPDF / Docling parses text; OCR scans image PDFs; AST parser converts Markdown structure.',
      output: 'Normalized UTF-8 plain text string with structural markers (# headers preserved).'
    },
    {
      stage: '2. Cleaning & Normalization',
      badge: 'Step 2',
      color: '#f59e0b',
      summary: 'Remove noise, boilerplate, repeated headers/footers, and invalid characters.',
      inputs: 'Messy extracted text containing page numbers, cookie banners, navigation links',
      process: 'Regex regex substitution: collapses duplicate whitespace (\\r\\n -> \\n), strips copyright headers.',
      output: 'Cleaned, high-density text ready for semantic slicing.'
    },
    {
      stage: '3. Intelligent Chunking',
      badge: 'Step 3',
      color: '#7c3aed',
      summary: 'Slice clean text into 200–500 token segments with 10–20% boundary overlap.',
      inputs: 'Clean continuous text stream',
      process: 'Recursive character text splitting preserves natural paragraph (\\n\\n) and sentence boundaries.',
      output: 'Array of self-contained text passages with overlapping boundary anchors.'
    },
    {
      stage: '4. Metadata Enrichment',
      badge: 'Step 4',
      color: '#10b981',
      summary: 'Inject structured JSON attributes (source, page, section, timestamps, department).',
      inputs: 'Raw text chunks + Document provenance records',
      process: 'Attach parent breadcrumb hierarchy and classification tags to each chunk object.',
      output: '{ chunk_id: "sla_001", text: "...", metadata: { doc: "sla.pdf", page: 2, dept: "Legal" } }'
    },
    {
      stage: '5. Vector Indexing',
      badge: 'Step 5',
      color: '#ec4899',
      summary: 'Generate high-dimensional vector embeddings and store in Chroma / Pinecone.',
      inputs: 'Enriched chunk objects',
      process: 'Pass chunk.text through text-embedding-3-small (1536-dim vector); insert into vector index.',
      output: 'Searchable vector database supporting Hybrid Filtering (Vector Cosine + SQL metadata).'
    }
  ];

  // Strategies Comparison Matrix
  const strategies = [
    {
      name: 'Recursive Character Text Splitting',
      badge: 'Industry Standard (Recommended)',
      color: '#7c3aed',
      howItWorks: 'Tries separators hierarchically: \\n\\n (paragraphs) -> \\n (lines) -> space (words) -> char.',
      pros: 'Preserves complete thoughts and semantic paragraphs. Extremely reliable for general QA.',
      cons: 'Slightly slower than naive slicing.',
      bestFor: 'Technical documentation, articles, legal contracts, customer support knowledge bases.'
    },
    {
      name: 'Document-Aware (Markdown Header)',
      badge: 'Best for Structured Docs',
      color: '#38bdf8',
      howItWorks: 'Splits on markdown headings (#, ##, ###) and prepends parent header path to all child chunks.',
      pros: 'Model never loses context of which section or product tier a bullet point belongs to.',
      cons: 'Requires documents with clean, consistent markdown heading structures.',
      bestFor: 'Developer API docs, product spec manuals, nested company policy wikis.'
    },
    {
      name: 'Fixed-Size Character Chunking',
      badge: 'Naive Baseline',
      color: '#ef4444',
      howItWorks: 'Cuts text blindly every N characters (e.g. exactly 500 chars) regardless of grammar.',
      pros: 'Dead simple and computationally fastest.',
      cons: 'Frequently cuts numbers ($10,000 -> $10 | ,000), URLs, and sentences in half causing hallucinations.',
      bestFor: 'Benchmarking or strictly uniform fixed-length embedding experiments.'
    },
    {
      name: 'Semantic / Sentence-Window Splitting',
      badge: 'Advanced / High Compute',
      color: '#10b981',
      howItWorks: 'Splits text into individual sentences and merges adjacent sentences based on embedding similarity.',
      pros: 'Guarantees that each chunk contains exactly one cohesive topic without topic bleed.',
      cons: 'Requires running an embedding model on every sentence during ingestion (higher cost & latency).',
      bestFor: 'Dense scientific papers, medical research, multi-topic meeting transcripts.'
    }
  ];

  // Metadata Mock Records
  const mockChunks = [
    { id: 'chunk_01', text: 'Enterprise tier receives 99.95% uptime guarantee with 25% credit on breaches.', dept: 'Legal', year: '2026', doc: 'SLA_Policy_2026.pdf', page: 1 },
    { id: 'chunk_02', text: 'Claims must be filed within 30 calendar days to billing@acme-cloud.io.', dept: 'Legal', year: '2026', doc: 'SLA_Policy_2026.pdf', page: 2 },
    { id: 'chunk_03', text: 'Bearer authentication tokens expire after 3600s. Refresh via /v1/auth/refresh.', dept: 'Engineering', year: '2026', doc: 'API_Specs_v3.md', page: 1 },
    { id: 'chunk_04', text: 'Rate limit for standard tier keys is 60 RPM; enterprise is 3,000 RPM.', dept: 'Engineering', year: '2025', doc: 'Rate_Limits_v2.md', page: 3 },
    { id: 'chunk_05', text: 'Hardware stipend is $1,500 for full-time remote engineering roles.', dept: 'HR', year: '2025', doc: 'Remote_Policy_2025.pdf', page: 1 }
  ];

  const filteredChunks = mockChunks.filter(c => {
    const matchDept = queryDept === 'All' || c.dept === queryDept;
    const matchYear = queryYear === 'All' || c.year === queryYear;
    return matchDept && matchYear;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className={styles.diagramBox} style={{ padding: 0 }}>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.4rem', padding: '1.25rem 1.5rem 0', flexWrap: 'wrap' }}>
          {[
            { label: 'End-to-End Architecture Illustration', color: '#7c3aed' },
            { label: 'Live Chunking & Overlap Simulator', color: '#38bdf8' },
            { label: '4-Stage Ingestion Pipeline', color: '#f59e0b' },
            { label: 'Chunking Strategies Compared', color: '#10b981' },
            { label: 'Metadata & Hybrid Pre-Filtering', color: '#ec4899' }
          ].map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '999px',
                border: `1.5px solid ${tab.color}`,
                background: activeTab === i ? tab.color : 'transparent',
                color: activeTab === i ? '#0f172a' : tab.color,
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {i + 1}. {tab.label}
            </button>
          ))}
        </div>

        {/* ═════════ TAB 0: END-TO-END ARCHITECTURE ILLUSTRATION ═════════ */}
        {activeTab === 0 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h4 style={{ color: '#f8fafc', margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 800 }}>
                  End-to-End Knowledge Base Ingestion &amp; RAG Architecture
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>
                  The blueprint below illustrates the two synchronized tracks: Document Ingestion (Offline) &amp; Semantic Query Retrieval (Online).
                </p>
              </div>
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: isSimulating ? '#4c1d95' : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: isSimulating ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.35)'
                }}
              >
                {isSimulating ? (
                  <>
                    <IconSpinner size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Simulating Pipeline Flow...</span>
                  </>
                ) : (
                  <>
                    <IconPlay size={12} />
                    <span>Simulate Pipeline Flow</span>
                  </>
                )}
              </button>
            </div>

            {/* ─── LITERAL ARCHITECTURE ILLUSTRATION IMAGE ─── */}
            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1rem', marginBottom: '1.5rem', border: '1.5px solid #334155', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', padding: '0 0.5rem' }}>
                <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IconImageDoc size={18} color="#7c3aed" /> Knowledge Base &amp; RAG Architecture Blueprint
                </span>
                <span style={{ background: '#7c3aed15', color: '#7c3aed', padding: '0.15rem 0.55rem', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 700 }}>
                  Complete Ingestion &amp; Query Pipeline
                </span>
              </div>
              <img 
                src="/rag-knowledge-base-architecture.png" 
                alt="End-to-End Knowledge Base Ingestion and RAG Architecture" 
                style={{ width: '100%', maxHeight: '460px', objectFit: 'contain', borderRadius: '8px', cursor: 'zoom-in', display: 'block', margin: '0 auto' }}
                onClick={() => typeof window !== 'undefined' && window.open('/rag-knowledge-base-architecture.png', '_blank')}
              />
              <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.6rem' }}>
                <em>Click the illustration to view in full resolution</em>
              </div>
            </div>

            {/* Interactive Architecture Flow Explorer */}
            <div style={{ marginBottom: '0.75rem', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}>
              Interactive Component Breakdown (Click any block to inspect):
            </div>

            {/* Architecture Canvas (Matching User Reference Diagram) */}
            <div style={{ background: '#090d16', border: '1.5px solid #1e293b', borderRadius: '16px', padding: '1.5rem', overflowX: 'auto', marginBottom: '1.25rem' }}>
              <div style={{ minWidth: '940px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                {/* ─── TRACK 1: OFFLINE DOCUMENT INGESTION & INDEXING ─── */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem 1.25rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', left: '16px', background: '#7c3aed', color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: '999px', letterSpacing: '0.5px' }}>
                    TRACK 1: OFFLINE KNOWLEDGE BASE INGESTION (BUILD TIME)
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {/* PDFs */}
                    <div
                      onClick={() => setSelectedArchNode('pdf')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'pdf' || activeStepAnim === 'pdf' ? '#ef444425' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'pdf' || activeStepAnim === 'pdf' ? '#ef4444' : '#334155'}`,
                        borderRadius: '10px',
                        width: '90px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'pdf' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconFileText size={28} color="#f87171" />
                      </div>
                      <div style={{ color: '#f87171', fontSize: '0.72rem', fontWeight: 800 }}>PDFs / Docs</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Extract Data */}
                    <div
                      onClick={() => setSelectedArchNode('extract')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'extract' || activeStepAnim === 'extract' ? '#38bdf825' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'extract' || activeStepAnim === 'extract' ? '#38bdf8' : '#334155'}`,
                        borderRadius: '10px',
                        width: '100px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'extract' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconExtract size={28} color="#38bdf8" />
                      </div>
                      <div style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800 }}>Extract Data</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Split into Chunks */}
                    <div
                      onClick={() => setSelectedArchNode('chunks')}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        padding: '0.65rem 0.85rem',
                        background: selectedArchNode === 'chunks' || activeStepAnim === 'chunks' ? '#ec489920' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'chunks' || activeStepAnim === 'chunks' ? '#ec4899' : '#334155'}`,
                        borderRadius: '10px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'chunks' ? 'scale(1.05)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', color: '#f472b6', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center' }}>
                        <IconScissors size={14} color="#f472b6" />
                        <span>Chunks of text</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                        {['Chunk 1', 'Chunk 2', 'Chunk 3', 'Chunk 4'].map((c, idx) => (
                          <div key={idx} style={{ background: '#f472b620', border: '1px solid #f472b6', color: '#f472b6', padding: '0.2rem 0.45rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, textAlign: 'center' }}>
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Embedding API */}
                    <div
                      onClick={() => setSelectedArchNode('embed_api_ingest')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'embed_api_ingest' || activeStepAnim === 'embed_api_ingest' ? '#818cf825' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'embed_api_ingest' || activeStepAnim === 'embed_api_ingest' ? '#818cf8' : '#334155'}`,
                        borderRadius: '10px',
                        width: '105px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'embed_api_ingest' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconCpuApi size={28} color="#a78bfa" />
                      </div>
                      <div style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 800 }}>Embedding API</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Vectors */}
                    <div
                      onClick={() => setSelectedArchNode('vectors')}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        padding: '0.65rem 0.85rem',
                        background: selectedArchNode === 'vectors' || activeStepAnim === 'vectors' ? '#2dd4bf20' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'vectors' || activeStepAnim === 'vectors' ? '#2dd4bf' : '#334155'}`,
                        borderRadius: '10px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'vectors' ? 'scale(1.05)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', color: '#2dd4bf', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center' }}>
                        <IconVectorGrid size={14} color="#2dd4bf" />
                        <span>Vector Embeddings</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                        {['Vector 1', 'Vector 2', 'Vector 3', 'Vector 4'].map((v, idx) => (
                          <div key={idx} style={{ background: '#2dd4bf20', border: '1px solid #2dd4bf', color: '#2dd4bf', padding: '0.2rem 0.45rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, textAlign: 'center', fontFamily: 'monospace' }}>
                            [0.12, ...]
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Build Semantic Index */}
                    <div
                      onClick={() => setSelectedArchNode('index')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'index' || activeStepAnim === 'index' ? '#fbbf2425' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'index' || activeStepAnim === 'index' ? '#fbbf24' : '#334155'}`,
                        borderRadius: '10px',
                        width: '110px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'index' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconIndexZap size={28} color="#fbbf24" />
                      </div>
                      <div style={{ color: '#fbbf24', fontSize: '0.72rem', fontWeight: 800 }}>Build Semantic Index</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Knowledge Base */}
                    <div
                      onClick={() => setSelectedArchNode('kb')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'kb' || activeStepAnim === 'kb' ? '#06b6d425' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'kb' || activeStepAnim === 'kb' ? '#06b6d4' : '#334155'}`,
                        borderRadius: '10px',
                        width: '120px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'kb' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconDatabaseBox size={28} color="#38bdf8" />
                      </div>
                      <div style={{ color: '#38bdf8', fontSize: '0.74rem', fontWeight: 800 }}>Knowledge Base</div>
                      <div style={{ color: '#64748b', fontSize: '0.62rem' }}>Chroma / Pinecone</div>
                    </div>
                  </div>
                </div>

                {/* ─── TRACK 2: ONLINE USER QUERY & RETRIEVAL (RUNTIME) ─── */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem 1.25rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', left: '16px', background: '#10b981', color: '#0f172a', fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: '999px', letterSpacing: '0.5px' }}>
                    TRACK 2: ONLINE QUERY, RETRIEVAL &amp; LLM GENERATION (RUN TIME)
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {/* User */}
                    <div
                      onClick={() => setSelectedArchNode('user_query')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'user_query' || activeStepAnim === 'user_query' ? '#22c55e25' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'user_query' || activeStepAnim === 'user_query' ? '#22c55e' : '#334155'}`,
                        borderRadius: '10px',
                        width: '90px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'user_query' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconUserChat size={28} color="#4ade80" />
                      </div>
                      <div style={{ color: '#4ade80', fontSize: '0.72rem', fontWeight: 800 }}>User Query</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Embedding API Query */}
                    <div
                      onClick={() => setSelectedArchNode('embed_query')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'embed_query' || activeStepAnim === 'embed_query' ? '#fbbf2425' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'embed_query' || activeStepAnim === 'embed_query' ? '#fbbf24' : '#334155'}`,
                        borderRadius: '10px',
                        width: '105px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'embed_query' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconVectorGrid size={28} color="#fbbf24" />
                      </div>
                      <div style={{ color: '#fbbf24', fontSize: '0.72rem', fontWeight: 800 }}>Query Vector</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Semantic Search */}
                    <div
                      onClick={() => setSelectedArchNode('semantic_search')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'semantic_search' || activeStepAnim === 'semantic_search' ? '#ec489925' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'semantic_search' || activeStepAnim === 'semantic_search' ? '#ec4899' : '#334155'}`,
                        borderRadius: '10px',
                        width: '115px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'semantic_search' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconSearchVec size={28} color="#f472b6" />
                      </div>
                      <div style={{ color: '#f472b6', fontSize: '0.72rem', fontWeight: 800 }}>Semantic Search</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Ranked Results (Top K) */}
                    <div
                      onClick={() => setSelectedArchNode('top_k')}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        padding: '0.65rem 0.85rem',
                        background: selectedArchNode === 'top_k' || activeStepAnim === 'top_k' ? '#38bdf820' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'top_k' || activeStepAnim === 'top_k' ? '#38bdf8' : '#334155'}`,
                        borderRadius: '10px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'top_k' ? 'scale(1.05)' : 'none'
                      }}
                    >
                      <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center' }}>Ranked Top-K</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ background: '#34d39925', color: '#34d399', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>
                          #1 Match: SLA 99.95% (94%)
                        </div>
                        <div style={{ background: '#38bdf825', color: '#38bdf8', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>
                          #2 Match: Refund Claim (89%)
                        </div>
                      </div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* LLM */}
                    <div
                      onClick={() => setSelectedArchNode('llm')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'llm' || activeStepAnim === 'llm' ? '#c084fc25' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'llm' || activeStepAnim === 'llm' ? '#c084fc' : '#334155'}`,
                        borderRadius: '10px',
                        width: '120px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'llm' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconBrainCog size={28} color="#c084fc" />
                      </div>
                      <div style={{ color: '#c084fc', fontSize: '0.72rem', fontWeight: 800 }}>LLM Reasoning</div>
                      <div style={{ color: '#64748b', fontSize: '0.62rem' }}>Context Grounding</div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 800 }}>➔</div>

                    {/* Verified Answer */}
                    <div
                      onClick={() => setSelectedArchNode('answer')}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: selectedArchNode === 'answer' || activeStepAnim === 'answer' ? '#10b98125' : '#1e293b',
                        border: `1.5px solid ${selectedArchNode === 'answer' || activeStepAnim === 'answer' ? '#10b981' : '#334155'}`,
                        borderRadius: '10px',
                        width: '115px',
                        transition: 'all 0.2s',
                        transform: activeStepAnim === 'answer' ? 'scale(1.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
                        <IconShieldCheck size={28} color="#34d399" />
                      </div>
                      <div style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 800 }}>Accurate Answer</div>
                      <div style={{ color: '#64748b', fontSize: '0.62rem' }}>With Citations</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Selected Node Details Inspector Box */}
            <div style={{ background: '#1e293b', border: `1.5px solid ${activeNodeData.color}`, borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <h4 style={{ color: activeNodeData.color, margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                  {activeNodeData.title}
                </h4>
                <span style={{ background: `${activeNodeData.color}25`, color: activeNodeData.color, padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>
                  {activeNodeData.subtitle}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.5', margin: 0 }}>
                {activeNodeData.description}
              </p>
            </div>
          </div>
        )}

        {/* ═════════ TAB 1: LIVE CHUNKING SIMULATOR ═════════ */}
        {activeTab === 1 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Experiment with Chunk Size and Overlap in real time to observe how documents are sliced without cutting thoughts in half:
            </p>

            {/* Presets Row */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: '#cbd5e1', fontSize: '0.75rem', fontWeight: 700 }}>Preset Document:</span>
              {[
                { key: 'sla', label: 'Cloud SLA Policy' },
                { key: 'api', label: 'API Security Specs' },
                { key: 'hr', label: 'Remote Work Policy' }
              ].map(p => (
                <button
                  key={p.key}
                  onClick={() => { setSelectedPreset(p.key); setCustomText(''); }}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${selectedPreset === p.key && !customText ? '#7c3aed' : '#334155'}`,
                    background: selectedPreset === p.key && !customText ? '#7c3aed25' : '#1e293b',
                    color: selectedPreset === p.key && !customText ? '#c084fc' : '#94a3b8',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}

              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ color: '#cbd5e1', fontSize: '0.75rem', fontWeight: 700 }}>Splitter:</span>
                <button
                  onClick={() => setSplitMode('recursive')}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    border: `1px solid ${splitMode === 'recursive' ? '#10b981' : '#334155'}`,
                    background: splitMode === 'recursive' ? '#10b98125' : '#1e293b',
                    color: splitMode === 'recursive' ? '#34d399' : '#94a3b8',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Recursive (Smart)
                </button>
                <button
                  onClick={() => setSplitMode('fixed')}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    border: `1px solid ${splitMode === 'fixed' ? '#ef4444' : '#334155'}`,
                    background: splitMode === 'fixed' ? '#ef444425' : '#1e293b',
                    color: splitMode === 'fixed' ? '#f87171' : '#94a3b8',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Fixed (Naive)
                </button>
              </div>
            </div>

            {/* Sliders Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: '#0f172a', padding: '1rem', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700 }}>Chunk Size:</span>
                  <span style={{ color: '#f8fafc', fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700 }}>{chunkSize} chars (~{Math.round(chunkSize / 4)} tokens)</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="20"
                  value={chunkSize}
                  onChange={(e) => setChunkSize(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: 700 }}>Chunk Overlap:</span>
                  <span style={{ color: '#f8fafc', fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700 }}>{chunkOverlap} chars ({chunkSize > 0 ? Math.round((chunkOverlap / chunkSize) * 100) : 0}%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.min(180, Math.floor(chunkSize * 0.45))}
                  step="10"
                  value={chunkOverlap}
                  onChange={(e) => setChunkOverlap(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#c084fc', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Live Metrics Row */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '120px', background: '#1e293b', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700 }}>Generated Chunks</div>
                <div style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: 800 }}>{simulatedChunks.length}</div>
              </div>
              <div style={{ flex: 1, minWidth: '120px', background: '#1e293b', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700 }}>Avg Chunk Length</div>
                <div style={{ color: '#a78bfa', fontSize: '1.1rem', fontWeight: 800 }}>
                  {simulatedChunks.length > 0 ? Math.round(simulatedChunks.reduce((a, b) => a + b.length, 0) / simulatedChunks.length) : 0} chars
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '120px', background: '#1e293b', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700 }}>Boundary Safety</div>
                <div style={{ color: splitMode === 'recursive' ? '#34d399' : '#f87171', fontSize: '1.1rem', fontWeight: 800 }}>
                  {splitMode === 'recursive' ? 'High (Semantic)' : 'Low (Hard Cut)'}
                </div>
              </div>
            </div>

            {/* Rendered Chunks Display */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '360px', overflowY: 'auto' }}>
              {simulatedChunks.map((chunk, idx) => {
                const borderColors = ['#7c3aed', '#38bdf8', '#10b981', '#f59e0b', '#ec4899'];
                const color = borderColors[idx % borderColors.length];
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#090d16',
                      border: `1.5px solid ${color}`,
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ background: `${color}25`, color: color, padding: '0.15rem 0.55rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'monospace' }}>
                        Chunk #{idx + 1}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.7rem', fontFamily: 'monospace' }}>
                        {chunk.length} chars · ~{Math.round(chunk.length / 4)} tokens
                      </span>
                    </div>
                    <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.78rem', fontFamily: 'Consolas, monospace', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {chunk}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═════════ TAB 2: 4-STAGE INGESTION PIPELINE ═════════ */}
        {activeTab === 2 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Click through the 5 sequential stages of the Knowledge Base ETL pipeline:
            </p>

            {/* Stages Buttons */}
            <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {pipelineStages.map((st, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedStage(i)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${selectedStage === i ? st.color : '#334155'}`,
                    background: selectedStage === i ? `${st.color}20` : '#1e293b',
                    color: selectedStage === i ? st.color : '#94a3b8',
                    fontWeight: 700,
                    fontSize: '0.76rem',
                    cursor: 'pointer'
                  }}
                >
                  {st.stage}
                </button>
              ))}
            </div>

            {/* Stage Detail Card */}
            {(() => {
              const curr = pipelineStages[selectedStage];
              return (
                <div style={{ background: '#1e293b', border: `1.5px solid ${curr.color}`, borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <h4 style={{ color: curr.color, margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>{curr.stage}</h4>
                    <span style={{ background: `${curr.color}25`, color: curr.color, padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>
                      {curr.badge}
                    </span>
                  </div>
                  <p style={{ color: '#f8fafc', fontSize: '0.85rem', margin: '0 0 0.85rem' }}>{curr.summary}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
                      <div style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Input State:</div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.76rem' }}>{curr.inputs}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
                      <div style={{ color: '#f59e0b', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Transformation Logic:</div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.76rem' }}>{curr.process}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
                      <div style={{ color: '#10b981', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Stage Output:</div>
                      <div style={{ color: '#a7f3d0', fontSize: '0.76rem', fontFamily: 'monospace' }}>{curr.output}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ═════════ TAB 3: CHUNKING STRATEGIES COMPARED ═════════ */}
        {activeTab === 3 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Compare the 4 primary text chunking strategies used across enterprise RAG deployments:
            </p>

            <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {strategies.map((strat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedStrategy(i)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${selectedStrategy === i ? strat.color : '#334155'}`,
                    background: selectedStrategy === i ? `${strat.color}20` : '#1e293b',
                    color: selectedStrategy === i ? strat.color : '#94a3b8',
                    fontWeight: 700,
                    fontSize: '0.76rem',
                    cursor: 'pointer'
                  }}
                >
                  {strat.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {(() => {
              const curr = strategies[selectedStrategy];
              return (
                <div style={{ background: '#1e293b', border: `1.5px solid ${curr.color}`, borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <h4 style={{ color: curr.color, margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>{curr.name}</h4>
                    <span style={{ background: `${curr.color}25`, color: curr.color, padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800 }}>
                      {curr.badge}
                    </span>
                  </div>

                  <div style={{ background: '#0f172a', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #334155', marginBottom: '0.85rem' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Splitting Mechanism:</div>
                    <div style={{ color: '#f8fafc', fontSize: '0.8rem' }}>{curr.howItWorks}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.85rem' }}>
                    <div style={{ background: '#092d1a', padding: '0.75rem', borderRadius: '8px', border: '1px solid #10b981' }}>
                      <div style={{ color: '#34d399', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Advantages:</div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.76rem' }}>{curr.pros}</div>
                    </div>
                    <div style={{ background: '#361515', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ef4444' }}>
                      <div style={{ color: '#f87171', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Failure Modes / Limitations:</div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.76rem' }}>{curr.cons}</div>
                    </div>
                  </div>

                  <div style={{ background: '#0b1120', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #1e293b', fontSize: '0.78rem' }}>
                    <strong style={{ color: curr.color }}>Ideal Industrial Application: </strong>
                    <span style={{ color: '#cbd5e1' }}>{curr.bestFor}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ═════════ TAB 4: METADATA & PRE-FILTERING ═════════ */}
        {activeTab === 4 && (
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              Simulate how attaching metadata (department, publication year, file path) enables instant SQL pre-filtering before running vector search:
            </p>

            {/* Filter Controls */}
            <div style={{ display: 'flex', gap: '1rem', background: '#0f172a', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700 }}>Department Filter:</span>
                {['All', 'Legal', 'Engineering', 'HR'].map(d => (
                  <button
                    key={d}
                    onClick={() => setQueryDept(d)}
                    style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      border: `1px solid ${queryDept === d ? '#38bdf8' : '#334155'}`,
                      background: queryDept === d ? '#38bdf825' : '#1e293b',
                      color: queryDept === d ? '#38bdf8' : '#94a3b8',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>Year:</span>
                {['All', '2026', '2025'].map(y => (
                  <button
                    key={y}
                    onClick={() => setQueryYear(y)}
                    style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      border: `1px solid ${queryYear === y ? '#10b981' : '#334155'}`,
                      background: queryYear === y ? '#10b98125' : '#1e293b',
                      color: queryYear === y ? '#34d399' : '#94a3b8',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>

              <div style={{ marginLeft: 'auto', color: '#a78bfa', fontSize: '0.75rem', fontWeight: 800 }}>
                {filteredChunks.length} of {mockChunks.length} chunks matched
              </div>
            </div>

            {/* Filtered Results Stream */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {filteredChunks.map((c) => (
                <div key={c.id} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'monospace' }}>{c.id}</span>
                    <span style={{ background: '#7c3aed25', color: '#c084fc', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>{c.dept}</span>
                    <span style={{ background: '#10b98125', color: '#34d399', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>{c.year}</span>
                    <span style={{ color: '#64748b', fontSize: '0.68rem', marginLeft: 'auto', fontFamily: 'monospace' }}>{c.doc} · Page {c.page}</span>
                  </div>
                  <div style={{ color: '#f8fafc', fontSize: '0.78rem' }}>"{c.text}"</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── MINI PROJECT EDITOR ───────────────────────────────────────────────────
const MiniProjectEditor = ({ lesson, prevLessonId, nextLessonId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [outputType, setOutputType] = useState('idle'); // idle | success | error
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [cmReady, setCmReady] = useState(false);

  const cmContainerRef = useRef(null); // CodeMirror mount target
  const cmInstanceRef = useRef(null);  // CodeMirror instance
  const outputPanelRef = useRef(null); // output panel DOM node for resize
  const isDraggingRef  = useRef(false); // resize drag state
  const dragStartYRef  = useRef(0);
  const dragStartHRef  = useRef(0);

  const steps = lesson.steps || [];
  const step = steps[currentStep];

  // ── Load CodeMirror 5 scripts/styles once, then load Pyodide ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const CM_CSS = [
      'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.17/codemirror.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.17/theme/dracula.min.css',
    ];
    const CM_JS = [
      'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.17/codemirror.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.17/mode/python/python.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.17/addon/edit/closebrackets.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.17/addon/edit/matchbrackets.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.17/addon/selection/active-line.min.js',
    ];

    CM_CSS.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    const loadScripts = (urls) =>
      urls.reduce(
        (chain, url) =>
          chain.then(
            () =>
              new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${url}"]`)) { resolve(); return; }
                const s = document.createElement('script');
                s.src = url;
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
              })
          ),
        Promise.resolve()
      );

    loadScripts(CM_JS).then(() => setCmReady(true)).catch(console.error);

    if (window.pyodide) {
      setPyodideReady(true);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
      script.onload = async () => {
        try {
          const py = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
          window.pyodide = py;
          setPyodideReady(true);
        } catch (e) { console.error('Pyodide load error:', e); }
      };
      document.head.appendChild(script);
    }
  }, []);

  // ── Resize handle: drag to split editor / output panel ──
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !outputPanelRef.current) return;
      const delta = dragStartYRef.current - e.clientY; // dragging up = larger output
      const newH = Math.max(80, Math.min(dragStartHRef.current + delta, window.innerHeight * 0.7));
      outputPanelRef.current.style.height = newH + 'px';
    };
    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handleResizeMouseDown = (e) => {
    if (!outputPanelRef.current) return;
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartHRef.current = outputPanelRef.current.offsetHeight;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  // ── Initialize / reinitialize CodeMirror once CM scripts are loaded ──
  useEffect(() => {
    if (!cmReady || !cmContainerRef.current) return;
    if (typeof window.CodeMirror === 'undefined') return;

    // Destroy previous instance if any (e.g. hot-reload)
    if (cmInstanceRef.current) {
      cmInstanceRef.current.toTextArea();
      cmInstanceRef.current = null;
    }

    const cm = window.CodeMirror(cmContainerRef.current, {
      value: step ? step.starterCode : '',
      mode: 'python',
      theme: 'dracula',
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      autoCloseBrackets: true,
      matchBrackets: true,
      styleActiveLine: true,
      lineWrapping: false,
      extraKeys: {
        'Ctrl-Enter': () => { runCode(); },
        Tab: (cm) => {
          if (cm.somethingSelected()) cm.indentSelection('add');
          else cm.replaceSelection('    ', 'end');
        },
      },
    });

    cm.on('change', (instance) => {
      setCode(instance.getValue());
    });

    cmInstanceRef.current = cm;
    setCode(step ? step.starterCode : '');

    // Let CM measure itself properly after mount
    setTimeout(() => cm.refresh(), 50);
  }, [cmReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync step changes into CodeMirror ──
  useEffect(() => {
    if (step) {
      const newCode = showSolution ? step.solutionCode : step.starterCode;
      setCode(newCode);
      if (cmInstanceRef.current) {
        cmInstanceRef.current.setValue(newCode);
        cmInstanceRef.current.setOption('readOnly', false);
        cmInstanceRef.current.focus();
      }
      setOutput(null);
      setOutputType('idle');
      setShowHints(false);
      setHintsRevealed(0);
      setShowSolution(false);
    }
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Toggle solution / editable in CodeMirror ──
  useEffect(() => {
    if (!cmInstanceRef.current || !step) return;
    const newCode = showSolution ? step.solutionCode : code;
    cmInstanceRef.current.setValue(showSolution ? step.solutionCode : code);
    cmInstanceRef.current.setOption('readOnly', showSolution);
  }, [showSolution]); // eslint-disable-line react-hooks/exhaustive-deps

  const runCode = async () => {
    if (!pyodideReady || isRunning) return;
    // Always read from the live CodeMirror instance
    const currentCode = cmInstanceRef.current ? cmInstanceRef.current.getValue() : code;
    setIsRunning(true);
    setOutput(null);
    setOutputType('idle');
    try {
      const py = window.pyodide;
      // Capture stdout
      await py.runPythonAsync(`
import sys, io
_stdout_capture = io.StringIO()
sys.stdout = _stdout_capture
`);
      try {
        await py.runPythonAsync(currentCode);
        const captured = await py.runPythonAsync(`_stdout_capture.getvalue()`);
        const outText = String(captured);
        setOutput(outText || '(no output)');
        setOutputType('success');
        // Mark step done if expected output found
        if (step.expectedOutputContains && outText.includes(step.expectedOutputContains)) {
          setCompletedSteps(prev => new Set([...prev, currentStep]));
          triggerConfetti();
        }
      } catch (pyErr) {
        setOutput(String(pyErr));
        setOutputType('error');
      } finally {
        await py.runPythonAsync(`sys.stdout = sys.__stdout__`);
      }
    } catch (e) {
      setOutput('Runtime error: ' + String(e));
      setOutputType('error');
    }
    setIsRunning(false);
  };

  // handleScroll and handleKeyDown are no longer needed — CodeMirror handles everything internally.

  const goToStep = (idx) => {
    if (idx < 0 || idx >= steps.length) return;
    setCurrentStep(idx);
    setCode(steps[idx].starterCode);
    setOutput(null);
    setOutputType('idle');
    setShowHints(false);
    setHintsRevealed(0);
    setShowSolution(false);
  };

  const revealNextHint = () => {
    if (!showHints) { setShowHints(true); setHintsRevealed(1); return; }
    if (hintsRevealed < (step.hints?.length || 0)) setHintsRevealed(h => h + 1);
  };

  const isLastStep = currentStep === steps.length - 1;
  const isProjectDone = isLastStep && completedSteps.has(currentStep);

  // CodeMirror handles syntax highlighting, line numbers and scrolling — no manual computation needed.

  return (
    <div className={styles.projectLayout}>
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
      </header>
      
      <main className={styles.splitPanel}>
        {/* Left Panel: Instructions */}
        <section className={styles.instructionsPanel}>
          <div className={styles.projectHeader}>
            <h1 className={styles.projectTitle}>{lesson.title}</h1>
            <p className={styles.projectSubtitle}>{lesson.subtitle}</p>
          </div>
          <div className={styles.stepProgressBar}>
            {steps.map((s, idx) => (
              <React.Fragment key={idx}>
                <button
                  className={`${styles.stepDot} ${idx === currentStep ? styles.stepDotActive : completedSteps.has(idx) ? styles.stepDotDone : ''}`}
                  onClick={() => goToStep(idx)}
                  title={`Step ${idx + 1}: ${s.title}`}
                >
                  {completedSteps.has(idx) ? '✓' : idx + 1}
                </button>
                {idx < steps.length - 1 && (
                  <div className={`${styles.stepConnector} ${completedSteps.has(idx) ? styles.stepConnectorDone : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step label */}
          {step && (
            <div className={styles.stepLabel}>
              Step {currentStep + 1} of {steps.length} — <span className={styles.stepLabelTitle}>{step.title}</span>
            </div>
          )}

          {/* Pyodide Loading */}
          {!pyodideReady && (
            <div className={styles.pyodideLoader}>
              <div className={styles.pyodideLoaderSpinner} />
              <div className={styles.pyodideLoaderText}>Loading Python Runtime...</div>
              <div className={styles.pyodideLoaderSub}>Pyodide (WebAssembly) · ~10MB · one-time download</div>
            </div>
          )}

          {pyodideReady && step && (
            <>
              {/* Concept */}
              <p className={styles.instructionsConcept}>{step.concept}</p>

              {/* Goal */}
              <div className={styles.instructionsGoalRow}>
                <span className={styles.instructionsGoalLabel}>
                  <IconTarget size={14} style={{ color: '#7c3aed', marginRight: '4px', verticalAlign: 'middle' }} /> Goal
                </span>
                <span className={styles.instructionsGoalText}>{step.goal}</span>
              </div>

              {/* Why it matters */}
              {step.whyItMatters && (
                <div className={styles.whyItMatters}>
                  <span className={styles.whyIcon}>
                    <IconLightbulb size={16} style={{ color: '#d97706' }} />
                  </span>
                  <span className={styles.whyText}><strong>Why this matters:</strong> {step.whyItMatters}</span>
                </div>
              )}

              {/* Hints */}
              {step.hints && step.hints.length > 0 && (
                <div className={styles.hintSection}>
                  <button className={styles.hintBtn} onClick={revealNextHint}>
                    <IconSparkles size={15} style={{ color: '#d97706' }} />
                    {showHints ? (hintsRevealed < step.hints.length ? 'Next Hint' : 'All Hints Shown') : 'Hint'}
                  </button>
                  {showHints && hintsRevealed > 0 && (
                    <div className={styles.hintBox}>
                      <div className={styles.hintBoxTitle}>Hints</div>
                      {step.hints.slice(0, hintsRevealed).map((hint, hIdx) => (
                        <div key={hIdx} className={styles.hintItem}>
                          <span className={styles.hintItemNum}>{hIdx + 1}.</span>
                          <span>{hint}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Concept callout after success */}
              {outputType === 'success' && step.conceptCallout && (
                <div className={styles.conceptCallout}>
                  <span className={styles.conceptCalloutIcon} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconBrain size={20} style={{ color: '#8b5cf6' }} />
                  </span>
                  <div>
                    <div className={styles.conceptCalloutLabel}>Key Insight</div>
                    <div className={styles.conceptCalloutText}>{step.conceptCallout}</div>
                  </div>
                </div>
              )}

              {/* Completion Banner on last step */}
              {isProjectDone && (
                <div className={styles.completionBanner}>
                  <span className={styles.completionEmoji} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconTrophy size={36} style={{ color: '#eab308' }} />
                  </span>
                  <div className={styles.completionTitle}>Project Complete!</div>
                  <p className={styles.completionText}>
                    You built a real Token Counter & Cost Calculator from scratch — the same tool LLM engineers use in production.
                    You can now estimate API costs, count tokens accurately, and validate context window limits for any LLM.
                  </p>
                  <div className={styles.completionSkills}>
                    {(lesson.projectMeta?.skills || []).map((skill, sIdx) => (
                      <span key={sIdx} className={styles.completionSkillChip}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Navigation */}
              <div className={styles.stepNav}>
                <button
                  className={`${styles.stepNavBtn} ${styles.stepNavBtnPrev} ${currentStep === 0 ? styles.stepNavBtnDisabled : ''}`}
                  onClick={() => goToStep(currentStep - 1)}
                  disabled={currentStep === 0}
                >
                  <IconArrowLeft size={15} /> Previous Step
                </button>

                {!isLastStep ? (
                  <button
                    className={`${styles.stepNavBtn} ${styles.stepNavBtnNext}`}
                    onClick={() => goToStep(currentStep + 1)}
                  >
                    Next Step <IconArrowRight size={15} />
                  </button>
                ) : (
                  nextLessonId ? (
                    <Link href={`/learn/ai-engineering/${nextLessonId}`} className={`${styles.stepNavBtn} ${styles.stepNavBtnNext}`}>
                      Next Lesson <IconArrowRight size={15} />
                    </Link>
                  ) : (
                    <Link href="/learn/ai-engineering" className={`${styles.stepNavBtn} ${styles.stepNavBtnNext}`}>
                      Back to Roadmap
                    </Link>
                  )
                )}
              </div>
            </>
          )}
        </section>

        {/* Right Panel: Code Editor */}
        {pyodideReady && step && (
          <section className={styles.editorPanel}>

            {/* Editor Toolbar */}
            <div className={styles.editorToolbar}>
              <div className={styles.fileTab}>
                <IconPython size={16} /> Python
              </div>
              <div className={styles.toolbarActions}>
                <button className={styles.solutionBtn} onClick={() => setShowSolution(s => !s)}>
                  {showSolution ? (
                    <><IconEyeOff size={15} /> Hide Solution</>
                  ) : (
                    <><IconEye size={15} /> Show Solution</>
                  )}
                </button>
              </div>
            </div>

            {/* Code Editor — CodeMirror 5 */}
            <div className={styles.codeWrap}>
              {/* CodeMirror mount target */}
              <div ref={cmContainerRef} className={styles.cmMount} />

              {/* Run Code + Ask AI Buttons */}
              <div className={styles.editorFloatBar}>
                <button className={styles.btnAskAI}>
                  <IconBrain size={16} /> Ask AI
                </button>
                <button
                  className={`${styles.btnRunCode} ${isRunning ? styles.btnRunCodeLoading : ''}`}
                  onClick={runCode}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <><IconSpinner size={14} className={styles.spin} /> Running...</>
                  ) : (
                    <><IconPlay size={14} /> Run Code</>
                  )}
                </button>
              </div>
            </div>

            {/* Resize handle between editor and output */}
            <div
              className={styles.resizeHandle}
              onMouseDown={handleResizeMouseDown}
              title="Drag to resize"
            />

            {/* Output Panel */}
            <div className={styles.outputPanel} ref={outputPanelRef}>
              <div className={styles.outputHeader}>
                <span className={styles.outputTabActive}>TEST CASES</span>
                <span>CONSOLE</span>
              </div>
              <div className={styles.outputSplit}>
                <div className={styles.outputBox}>
                  <div className={styles.outputBoxLabel}>Output</div>
                  <div className={`${outputType === 'error' ? styles.outputError : outputType === 'success' ? styles.outputSuccess : ''}`}>
                    {output !== null ? output : <span className={styles.outputPlaceholder}>// Press "Run Code" to execute</span>}
                  </div>
                </div>
                <div className={styles.expectedBox}>
                  <div className={styles.outputBoxLabel}>Expected Output</div>
                  <div>{step.expectedOutputContains || '(run your code to verify)'}</div>
                </div>
              </div>
            </div>

          </section>
        )}
      </main>
    </div>
  );
};

// Sequence of lesson IDs for next/prev navigation
const lessonOrder = ['ai-1-1', 'ai-1-2', 'ai-1-3', 'ai-1-4', 'ai-1-5', 'ai-2-1', 'ai-2-2', 'ai-2-3', 'ai-2-4', 'ai-2-5', 'ai-2-6', 'ai-2-7', 'ai-2-8', 'ai-2-9', 'ai-2-p1', 'ai-3-1', 'ai-3-2', 'ai-3-3', 'ai-3-4', 'ai-3-5', 'ai-3-6', 'ai-3-7', 'ai-4-1', 'ai-4-2', 'ai-4-3', 'ai-4-4', 'ai-4-5', 'ai-4-6', 'ai-4-7', 'ai-4-8', 'ai-4-9', 'ai-5-1', 'ai-5-2'];

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
    if (lesson.quiz && index === lesson.quiz.correctIndex) {
      triggerConfetti();
    }
  };

  const handleMultiSelect = (qId, optionIdx) => {
    setMultiAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    const question = lesson.multiQuiz?.find((q) => q.id === qId);
    if (question && optionIdx === question.correctIndex) {
      triggerConfetti();
    }
  };

  // Early return for project lessons — render the code editor instead
  if (lesson.isProject) {
    return <MiniProjectEditor lesson={lesson} prevLessonId={prevLessonId} nextLessonId={nextLessonId} />;
  }

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

        {/* OPTIONAL HERO ILLUSTRATION IMAGE */}
        {lesson.illustrationImage && (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', marginBottom: '2rem', border: '1.5px solid #334155', boxShadow: '0 10px 35px rgba(0,0,0,0.5)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.5rem' }}>
              <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconImageDoc size={20} color="#7c3aed" /> {lesson.illustrationImage.title || 'Architecture Blueprint'}
              </span>
              <span style={{ background: '#7c3aed15', color: '#7c3aed', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                {lesson.illustrationImage.badge || 'System Flow Diagram'}
              </span>
            </div>
            <img 
              src={lesson.illustrationImage.src} 
              alt={lesson.illustrationImage.title || 'Lesson Architecture Diagram'} 
              style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', borderRadius: '8px', cursor: 'zoom-in', display: 'block', margin: '0 auto' }}
              onClick={() => typeof window !== 'undefined' && window.open(lesson.illustrationImage.src, '_blank')}
            />
            {lesson.illustrationImage.caption && (
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.6rem' }}>
                <em>{lesson.illustrationImage.caption}</em>
              </div>
            )}
          </div>
        )}

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
              {sec.codeBlock && (
                <SyntaxCodeBlock
                  code={sec.codeBlock}
                  title={sec.codeBlockTitle}
                  language="Python / JSON"
                />
              )}
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

            {/* Effective Prompts Diagram (MIT Sloan) */}
            {lesson.diagram.type === 'effective_prompts' && (
              <EffectivePromptsDiagram />
            )}

            {/* System vs User vs Assistant Diagram */}
            {lesson.diagram.type === 'system_user_assistant' && (
              <SystemUserAssistantDiagram />
            )}

            {/* Few-Shot Prompting Diagram (Google AI Essentials) */}
            {lesson.diagram.type === 'few_shot_prompting' && (
              <FewShotDiagram />
            )}

            {/* Chain-of-Thought Reasoning Diagram (IBM Guide) */}
            {lesson.diagram.type === 'chain_of_thought' && (
              <ChainOfThoughtDiagram />
            )}

            {/* Structured Outputs Diagram (Humanloop Guide) */}
            {lesson.diagram.type === 'structured_outputs' && (
              <StructuredOutputsDiagram />
            )}

            {/* Iterative Prompting Diagram (IBM Think Guide) */}
            {lesson.diagram.type === 'iterative_prompting' && (
              <IterativePromptingDiagram />
            )}

            {/* AI API Anatomy Diagram */}
            {lesson.diagram.type === 'ai_api_anatomy' && (
              <AIApiAnatomyDiagram />
            )}

            {/* API Key Security Diagram */}
            {lesson.diagram.type === 'api_security_diagram' && (
              <ApiSecurityDiagram />
            )}

            {/* First AI Request Diagram */}
            {lesson.diagram.type === 'first_ai_request' && (
              <FirstAiRequestDiagram />
            )}

            {/* Chat Completions Diagram */}
            {lesson.diagram.type === 'chat_completions' && (
              <ChatCompletionsDiagram />
            )}

            {/* Streaming Responses Diagram */}
            {lesson.diagram.type === 'streaming_responses' && (
              <StreamingResponsesDiagram />
            )}

            {/* Function Calling Diagram */}
            {lesson.diagram.type === 'function_calling' && (
              <FunctionCallingDiagram />
            )}

            {/* JSON Schema Enforcement Diagram */}
            {lesson.diagram.type === 'json_schema_enforcement' && (
              <JsonSchemaEnforcementDiagram />
            )}

            {/* Structured Outputs Parsing Diagram */}
            {lesson.diagram.type === 'structured_outputs_parsing' && (
              <StructuredOutputsParsingDiagram />
            )}

            {/* Context Memory & RAG Limits Diagram */}
            {lesson.diagram.type === 'context_memory_limit' && (
              <ContextMemoryLimitDiagram />
            )}

            {/* Knowledge Base Ingestion & Chunking Diagram */}
            {lesson.diagram.type === 'knowledge_base_ingestion' && (
              <KnowledgeBaseIngestionDiagram />
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
