'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { lessonsData } from '../lessonsData';

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

    const colors = ['#387EB8', '#FFE052', '#10b981', '#f59e0b', '#38bdf8', '#a855f7', '#ec4899'];
    const particleCount = 130;
    const particles = [];
    const startX = width * originX;
    const startY = height * originY;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * (Math.random() * 1.5 - 1.25));
      const speed = Math.random() * 20 + 10;
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
        p.vy += 0.48;
        p.vx *= 0.985;
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

// Helper for syntax highlighting Python code
const highlightPython = (rawCode) => {
  if (!rawCode) return '';

  const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = rawCode.split('\n');

  const highlightedLines = lines.map((line) => {
    let escaped = escapeHtml(line);

    // Comments check
    let commentPart = '';
    const commentIdx = escaped.indexOf('#');
    if (commentIdx !== -1) {
      commentPart = `<span class="${styles.tokComment}">${escaped.slice(commentIdx)}</span>`;
      escaped = escaped.slice(0, commentIdx);
    }

    // Tokenizer regex
    const tokenRegex = /(f?&quot;[\s\S]*?&quot;|f?&#39;[\s\S]*?&#39;|f?"[^"]*"|f?'[^']*')|(\b(?:def|return|if|elif|else|for|while|import|from|as|in|try|except|class|raise|pass|break|continue|not|and|or|is|lambda|with|yield|global)\b)|(\b(?:print|len|range|int|str|float|bool|list|dict|set|tuple|sum|max|min|sorted|type|round|input)\b)|(\b(?:True|False|None)\b)|(\b\d+(?:\.\d+)?\b)/g;

    escaped = escaped.replace(tokenRegex, (match, str, kw, fn, bool, num) => {
      if (str) return `<span class="${styles.tokString}">${str}</span>`;
      if (kw) return `<span class="${styles.tokKeyword}">${kw}</span>`;
      if (fn) return `<span class="${styles.tokFunction}">${fn}</span>`;
      if (bool) return `<span class="${styles.tokBoolean}">${bool}</span>`;
      if (num) return `<span class="${styles.tokNumber}">${num}</span>`;
      return match;
    });

    return escaped + commentPart;
  });

  return highlightedLines.join('\n');
};

// ─── SVG LOGOS & VECTOR ICONS (NO EMOJIS) ───────────────────────────────
const PythonLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pyBlueL" x1="12%" y1="12%" x2="88%" y2="88%">
        <stop offset="0%" stopColor="#387EB8"/>
        <stop offset="100%" stopColor="#366994"/>
      </linearGradient>
      <linearGradient id="pyYellowL" x1="12%" y1="12%" x2="88%" y2="88%">
        <stop offset="0%" stopColor="#FFE052"/>
        <stop offset="100%" stopColor="#FFC331"/>
      </linearGradient>
    </defs>
    <path fill="url(#pyBlueL)" d="M126.9 0C62.4 0 66.3 28 66.3 28l.1 29h61.8v8.7H41.6S0 61.2 0 126.3c0 65 35.9 62.7 35.9 62.7h21.4v-30.2s-1.2-35.9 35.3-35.9h60.8s34.2.5 34.2-33.1V34.3S192.1 0 126.9 0zm-33.8 19.7c6.1 0 11 4.9 11 11s-4.9 11-11 11-11-4.9-11-11 4.9-11 11-11z"/>
    <path fill="url(#pyYellowL)" d="M128.9 255c64.5 0 60.6-28 60.6-28l-.1-29h-61.8v-8.7h86.6s41.6 4.5 41.6-60.6c0-65-35.9-62.7-35.9-62.7h-21.4v30.2s1.2 35.9-35.3 35.9H102.4s-34.2-.5-34.2 33.1v55.5S63 255 128.9 255zm33.8-19.7c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z"/>
  </svg>
);

const StatIconStreak = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f97316">
    <path d="M12.432 0c1.34 8.636-5.36 11.29-5.36 11.29-.09-3.06-1.4-4.29-3.37-5.67C3.704 7.26 2.5 10.03 2.5 12.5 2.5 18.299 6.7 22 12 22s9.5-3.7 9.5-9.5c0-4.88-4.7-8.3-9.068-12.5z"/>
  </svg>
);

const StatIconGem = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b">
    <polygon points="6 3 18 3 22 9 12 22 2 9"/>
  </svg>
);

const StatIconEnergy = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#3b82f6">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconLightbulb = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
  </svg>
);

const IconRobot = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const IconTarget = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconBook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const IconCode = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconHistory = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>
  </svg>
);

const IconSearch = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconChat = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconHelp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconSpeaker = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const IconSave = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

const IconReset = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
  </svg>
);

const IconCheckmark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function LessonPage() {
  const params = useParams();
  const lessonId = params?.lessonId || '1-1';
  const lessonData = lessonsData[lessonId] || lessonsData['1-1'];

  const allLessonIds = Object.keys(lessonsData);
  const currentIndex = allLessonIds.indexOf(lessonId);
  const prevLessonId = currentIndex > 0 ? allLessonIds[currentIndex - 1] : null;
  const nextLessonId = currentIndex < allLessonIds.length - 1 ? allLessonIds[currentIndex + 1] : null;

  const [code, setCode] = useState(lessonData.initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const backdropRef = useRef(null);
  const gutterRef = useRef(null);

  // Dynamically load Pyodide WebAssembly runtime (retains identical UI)
  useEffect(() => {
    if (window.pyodide) return;

    if (!document.getElementById('pyodide-script')) {
      const script = document.createElement('script');
      script.id = 'pyodide-script';
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
      script.async = true;
      script.onload = async () => {
        try {
          if (!window.pyodide && window.loadPyodide) {
            const py = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
            });
            window.pyodide = py;
          }
        } catch (err) {
          console.error('Pyodide initialization error:', err);
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    setCode(lessonData.initialCode);
    setOutput('');
    setIsPassed(false);
    setShowSolution(false);
  }, [lessonId]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');

    try {
      // Ensure Pyodide is ready
      let py = window.pyodide;
      if (!py && window.loadPyodide) {
        py = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
        });
        window.pyodide = py;
      }

      if (py) {
        // Auto-load packages from imports (e.g. numpy, pandas, scipy, sklearn)
        if (py.loadPackagesFromImports) {
          try {
            await py.loadPackagesFromImports(code);
          } catch (pkgErr) {
            console.warn('Package auto-load warning:', pkgErr);
          }
        }

        // Capture standard output and error in Pyodide
        await py.runPythonAsync(`
import sys, io
_py_stdout_capture = io.StringIO()
_py_stderr_capture = io.StringIO()
sys.stdout = _py_stdout_capture
sys.stderr = _py_stderr_capture
`);

        try {
          await py.runPythonAsync(code);
          const stdoutText = await py.runPythonAsync(`_py_stdout_capture.getvalue()`);
          const stderrText = await py.runPythonAsync(`_py_stderr_capture.getvalue()`);
          
          const combinedOutput = (String(stdoutText) + (stderrText ? '\n' + String(stderrText) : '')).trim();
          const finalOutput = combinedOutput || '(Program executed successfully with no output)';

          setOutput(finalOutput);
          setIsRunning(false);

          if (lessonData.expectedOutput && combinedOutput === lessonData.expectedOutput.trim()) {
            setIsPassed(true);
            triggerConfetti();
          } else if (!lessonData.expectedOutput) {
            setIsPassed(true);
          } else {
            setIsPassed(false);
          }
        } catch (pyExecErr) {
          const errStr = String(pyExecErr);
          setOutput(`Error:\n${errStr}`);
          setIsRunning(false);
          setIsPassed(false);
        } finally {
          await py.runPythonAsync(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
        }
      } else {
        // Fallback simulation if offline or loading
        setTimeout(() => {
          let simulatedOut = '';
          if (code.includes('print("Hello Python!")') || code.includes("print('Hello Python!')")) {
            simulatedOut = 'Hello Python!';
          } else if (code.includes('print(')) {
            const match = code.match(/print\s*\(\s*["']?(.*?)["']?\s*\)/);
            simulatedOut = match ? match[1] : 'Output generated';
          } else {
            simulatedOut = 'Code executed successfully.';
          }

          setOutput(simulatedOut);
          setIsRunning(false);

          if (lessonData.expectedOutput && simulatedOut.trim() === lessonData.expectedOutput.trim()) {
            setIsPassed(true);
            triggerConfetti();
          }
        }, 400);
      }
    } catch (err) {
      setOutput(`Execution Error: ${err.message || String(err)}`);
      setIsRunning(false);
      setIsPassed(false);
    }
  };

  const handleResetCode = () => {
    setCode(lessonData.initialCode);
    setOutput('');
    setIsPassed(false);
  };

  // Smart Python Auto-Indentation & Tab Key Handler
  const handleKeyDown = (e) => {
    const textarea = e.target;
    const { selectionStart, selectionEnd, value } = textarea;

    // 1. TAB KEY: Insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const newValue = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);
      setCode(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
      }, 0);
      return;
    }

    // 2. ENTER KEY: Smart auto-indentation (add 4 spaces if line ends with :)
    if (e.key === 'Enter') {
      e.preventDefault();

      // Find current line up to cursor
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = value.substring(lineStart, selectionStart);

      // Get existing indentation of current line
      const matchIndent = currentLine.match(/^(\s*)/);
      let currentIndent = matchIndent ? matchIndent[1] : '';

      // Check if current line ends with a colon : (ignoring trailing whitespace)
      const trimmedLine = currentLine.trimEnd();
      if (trimmedLine.endsWith(':')) {
        currentIndent += '    '; // Add 4 spaces for Python block indentation
      }

      const newLineInsert = '\n' + currentIndent;
      const newValue = value.substring(0, selectionStart) + newLineInsert + value.substring(selectionEnd);

      setCode(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + newLineInsert.length;
      }, 0);
    }
  };

  return (
    <div className={styles.container}>
      {/* ─── TOP HEADER ─────────────────────────────────────────────── */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <Link href="/learn/python" className={styles.btnClose} title="Back to Journey">
            ✕
          </Link>
          <div className={styles.navGroup}>
            {prevLessonId ? (
              <Link href={`/learn/python/${prevLessonId}`} className={styles.navBtnHeader} title="Previous Lesson">
                ‹ Prev
              </Link>
            ) : (
              <button className={styles.navBtnHeaderDisabled} disabled>‹ Prev</button>
            )}
            {nextLessonId ? (
              <Link href={`/learn/python/${nextLessonId}`} className={styles.navBtnHeader} title="Next Lesson">
                Next ›
              </Link>
            ) : (
              <button className={styles.navBtnHeaderDisabled} disabled>Next ›</button>
            )}
          </div>
          <span className={styles.lessonTitle}>{lessonData.title}</span>
        </div>

        <div className={styles.headerRight}>
          <div className={`${styles.statItem} ${styles.statFlame}`}>
            <StatIconStreak size={18} />
            <span>0</span>
          </div>
          <div className={`${styles.statItem} ${styles.statGems}`}>
            <StatIconGem size={18} />
            <span>20</span>
          </div>
          <div className={`${styles.statItem} ${styles.statEnergy}`}>
            <StatIconEnergy size={18} />
            <span>5</span>
          </div>
          <div className={styles.userAvatar}>P</div>
        </div>
      </header>

      {/* ─── WORKSPACE SPLIT ────────────────────────────────────────── */}
      <div className={styles.workspace}>

        {/* LEFTMOST ICON SIDEBAR */}
        <aside className={styles.iconSidebar}>
          <button className={`${styles.sideIconBtn} ${styles.sideIconBtnActive}`} title="Lesson">
            <IconBook size={20} />
          </button>
          <button className={styles.sideIconBtn} title="Code">
            <IconCode size={20} />
          </button>
          <button className={styles.sideIconBtn} title="History">
            <IconHistory size={20} />
          </button>
          <button className={styles.sideIconBtn} title="Search">
            <IconSearch size={20} />
          </button>
          <button className={styles.sideIconBtn} title="Discussion">
            <IconChat size={20} />
          </button>
          <button className={styles.sideIconBtn} title="Help">
            <IconHelp size={20} />
          </button>
        </aside>

        {/* LESSON CONTENT PANEL (LEFT) */}
        <section className={styles.lessonPanel}>
          <div className={styles.lessonHeader}>
            <div>
              <h1 className={styles.lessonMainTitle}>{lessonData.subtitle}</h1>
              {lessonData.gfgUrl && (
                <a href={lessonData.gfgUrl} target="_blank" rel="noopener noreferrer" className={styles.gfgRefLink}>
                  <span>Reference Articles ↗</span>
                </a>
              )}
            </div>
            <div className={styles.tldrBadgeGroup}>
              <button className={styles.tldrBtn}>TL;DR</button>
              <button className={styles.tldrBtn}>Hide</button>
            </div>
          </div>

          {/* Paragraph Explanations */}
          {lessonData.paragraphs ? (
            lessonData.paragraphs.map((p, idx) => (
              <p key={idx} className={styles.lessonParagraph}>{p}</p>
            ))
          ) : (
            <p className={styles.lessonText}>{lessonData.description}</p>
          )}

          {/* Real-World Analogy Card */}
          {lessonData.analogy && (
            <div className={styles.analogyCard}>
              <div className={styles.analogyTitle}>
                <IconLightbulb size={20} />
                <span>Real-World Analogy</span>
              </div>
              <p className={styles.analogyText}>{lessonData.analogy}</p>
            </div>
          )}

          {/* Embedded Code Example Block */}
          {lessonData.codeExample && (
            <div className={styles.exampleBlock}>
              <div className={styles.exampleHeader}>
                <span>Code Example</span>
                <span>Python 3</span>
              </div>
              <pre
                className={styles.exampleCode}
                dangerouslySetInnerHTML={{ __html: highlightPython(lessonData.codeExample) }}
              />
            </div>
          )}

          {/* Key Takeaways Box */}
          {lessonData.takeaways && lessonData.takeaways.length > 0 && (
            <div className={styles.takeawaysBox}>
              <div className={styles.takeawaysTitle}>Key Rules &amp; Concepts</div>
              <ul className={styles.takeawaysList}>
                {lessonData.takeaways.map((take, idx) => (
                  <li key={idx}>{take}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge Box */}
          <div className={styles.challengeCard}>
            <div className={styles.challengeTitleRow}>
              <div style={{ color: '#0284c7', display: 'flex' }}>
                <IconLightbulb size={24} />
              </div>
              <h2 className={styles.challengeTitle}>Challenge</h2>
              <span className={styles.levelTag}>Beginner</span>
            </div>

            <p className={styles.challengeIntro}>{lessonData.challengeIntro}</p>

            <h3 className={styles.instructionsTitle}>What to do:</h3>
            <ol className={styles.instructionsList}>
              {lessonData.instructions.map((inst, idx) => (
                <li key={idx}>
                  {inst.includes(':') ? (
                    <>
                      {inst.split(':')[0]}:{' '}
                      <code className={styles.inlineCode}>{inst.split(':')[1]}</code>
                    </>
                  ) : (
                    inst
                  )}
                </li>
              ))}
            </ol>

            <button className={styles.btnExplain}>
              <IconRobot size={18} /> Explain challenge
            </button>
          </div>

          {/* Solution Accordion */}
          <div className={styles.solutionSection}>
            <button
              className={styles.solutionToggle}
              onClick={() => setShowSolution(!showSolution)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconTarget size={20} /> Solution
              </span>
              <span>{showSolution ? '▲' : '▼'}</span>
            </button>

            {showSolution && (
              <div className={styles.solutionBox}>
                <pre>{lessonData.solutionCode}</pre>
              </div>
            )}
          </div>

          {/* Bottom Lesson Navigation Bar */}
          <div className={styles.lessonNavFooter}>
            {prevLessonId ? (
              <Link href={`/learn/python/${prevLessonId}`} className={styles.btnLessonNavPrev}>
                ‹ Previous Lesson
              </Link>
            ) : <div />}

            {nextLessonId ? (
              <Link href={`/learn/python/${nextLessonId}`} className={styles.btnLessonNavNext}>
                Next Lesson ›
              </Link>
            ) : (
              <Link href="/learn/python" className={styles.btnLessonNavNext}>
                Finish Python Course
              </Link>
            )}
          </div>
        </section>

        {/* EDITOR PANEL (RIGHT) */}
        <section className={styles.editorPanel}>
          
          {/* Toolbar */}
          <div className={styles.editorToolbar}>
            <div className={styles.fileTab}>
              <PythonLogo size={18} /> Python
            </div>
            <div className={styles.toolbarActions}>
              <button className={styles.toolBtn} title="Audio Guide">
                <IconSpeaker size={18} />
              </button>
              <button className={styles.toolBtn} title="Save Code">
                <IconSave size={18} />
              </button>
              <button className={styles.toolBtn} onClick={handleResetCode} title="Reset Code">
                <IconReset size={18} />
              </button>
            </div>
          </div>

          {/* Code Mirror / Textarea Editor with Real Python Syntax Highlighting */}
          <div className={styles.codeWrap}>
            {/* Line Numbers Gutter */}
            <div className={styles.lineNumbersGutter} ref={gutterRef}>
              {code.split('\n').map((_, i) => (
                <div key={i} className={styles.lineNumberItem}>{i + 1}</div>
              ))}
            </div>

            {/* Syntax Highlighted Editor Container */}
            <div className={styles.editorContainer}>
              <pre
                ref={backdropRef}
                className={styles.highlightBackdrop}
                dangerouslySetInnerHTML={{ __html: highlightPython(code) + '\n' }}
              />
              <textarea
                className={styles.textareaEditor}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                onScroll={(e) => {
                  if (backdropRef.current) {
                    backdropRef.current.scrollTop = e.target.scrollTop;
                    backdropRef.current.scrollLeft = e.target.scrollLeft;
                  }
                  if (gutterRef.current) {
                    gutterRef.current.scrollTop = e.target.scrollTop;
                  }
                }}
                spellCheck="false"
              />
            </div>

            {/* Floating Action Buttons */}
            <div className={styles.editorFloatBar}>
              <button className={styles.btnAskAI}>
                <IconRobot size={18} /> Ask AI
              </button>
              <button
                className={styles.btnRunCode}
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? '⏳ Running...' : '▶ Run Code'}
              </button>
            </div>
          </div>

          {/* Output & Verification Panel */}
          <div className={styles.outputPanel}>
            {isPassed && (
              <div className={styles.successBanner}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconCheckmark size={20} /> Challenge Completed! +20 XP
                </span>
                {nextLessonId ? (
                  <Link href={`/learn/python/${nextLessonId}`} className={styles.btnContinueNext}>
                    Continue to Next Lesson →
                  </Link>
                ) : (
                  <Link href="/learn/python" className={styles.btnContinueNext}>
                    Course Completed
                  </Link>
                )}
              </div>
            )}

            <div className={styles.outputHeader}>
              <span className={styles.outputTabActive}>TEST CASES</span>
              <span>CONSOLE</span>
            </div>

            <div className={styles.outputSplit}>
              <div className={styles.outputBox}>
                <div className={styles.outputBoxLabel}>Output</div>
                <div>{output || '// Press "Run Code" to execute'}</div>
              </div>
              <div className={styles.expectedBox}>
                <div className={styles.outputBoxLabel}>Expected Output</div>
                <div>{lessonData.expectedOutput}</div>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
