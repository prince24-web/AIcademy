'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

// ─── LESSON DATABASE (12 MODULES) ───────────────────────────────────────
const lessonDatabase = {
  '1-1': {
    title: 'Introduction',
    subtitle: 'The Language',
    section: 'Section 1 · Chapter 1',
    description: "Python is one of the world's easiest and most popular programming languages.",
    challengeIntro: 'Welcome to your first Python program! The code is already written for you.',
    instructions: [
      'Look at the code: print("Hello Python!")',
      'Press the "Run Code" button to execute it',
      'You should see "Hello Python!" appear in the output'
    ],
    initialCode: 'print("Hello Python!")',
    expectedOutput: 'Hello Python!',
    solutionCode: 'print("Hello Python!")'
  },
  '1-2': {
    title: 'Variables & Assignments',
    subtitle: 'Storing Data',
    section: 'Section 1 · Chapter 2',
    description: 'Variables are used to store data in your program. Create a variable using the = sign.',
    challengeIntro: 'Create a variable named message and assign it the string "Welcome to AIcademy!".',
    instructions: [
      'Define a variable: message = "Welcome to AIcademy!"',
      'Print the variable: print(message)',
      'Click "Run Code" to verify'
    ],
    initialCode: '# Write your code below\nmessage = "Welcome to AIcademy!"\nprint(message)',
    expectedOutput: 'Welcome to AIcademy!',
    solutionCode: 'message = "Welcome to AIcademy!"\nprint(message)'
  },
  '1-3': {
    title: 'Data Types',
    subtitle: 'Strings, Numbers & Booleans',
    section: 'Section 1 · Chapter 3',
    description: 'Python has several data types: str for text, int and float for numbers, and bool for True/False.',
    challengeIntro: 'Print three different data types: text, integer, and boolean.',
    instructions: [
      'Print a string: print("Python")',
      'Print an integer: print(42)',
      'Print a boolean: print(True)'
    ],
    initialCode: 'print("Python")\nprint(42)\nprint(True)',
    expectedOutput: 'Python\n42\nTrue',
    solutionCode: 'print("Python")\nprint(42)\nprint(True)'
  }
};

export default function LessonPage() {
  const params = useParams();
  const lessonId = params?.lessonId || '1-1';
  const lessonData = lessonDatabase[lessonId] || lessonDatabase['1-1'];

  const [code, setCode] = useState(lessonData.initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [skulptLoaded, setSkulptLoaded] = useState(false);

  // Dynamically load Skulpt scripts if not already present
  useEffect(() => {
    if (window.Sk) {
      setSkulptLoaded(true);
      return;
    }

    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js';
    script2.async = true;

    script1.onload = () => {
      document.body.appendChild(script2);
    };
    script2.onload = () => {
      setSkulptLoaded(true);
    };

    document.body.appendChild(script1);

    return () => {
      // cleanup optional
    };
  }, []);

  // Update initial code when lessonId changes
  useEffect(() => {
    setCode(lessonData.initialCode);
    setOutput('');
    setIsPassed(false);
    setShowSolution(false);
  }, [lessonId]);

  // Execute code via Skulpt or Python fallback evaluator
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running...');

    let stdoutBuffer = '';

    const handleOutput = (text) => {
      stdoutBuffer += text;
    };

    if (window.Sk) {
      try {
        window.Sk.configure({
          output: handleOutput,
          read: (x) => {
            if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined) {
              throw new Error("File not found: '" + x + "'");
            }
            return window.Sk.builtinFiles["files"][x];
          },
          inputfun: (promptText) => window.prompt(promptText || "Input:") || "",
          __future__: window.Sk.python3,
        });

        const promise = window.Sk.misceval.asyncToPromise(() => {
          return window.Sk.importMainWithBody("<stdin>", false, code, true);
        });

        promise
          .then(() => {
            const cleanResult = stdoutBuffer.trim();
            setOutput(cleanResult);
            setIsRunning(false);

            // Check against expected output
            if (cleanResult === lessonData.expectedOutput.trim()) {
              setIsPassed(true);
            } else {
              setIsPassed(false);
            }
          })
          .catch((err) => {
            setOutput(`Error: ${err.toString()}`);
            setIsRunning(false);
            setIsPassed(false);
          });
      } catch (err) {
        setOutput(`Execution Error: ${err.message}`);
        setIsRunning(false);
      }
    } else {
      // Basic fallback if Skulpt loading is delayed
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

        if (simulatedOut.trim() === lessonData.expectedOutput.trim()) {
          setIsPassed(true);
        }
      }, 400);
    }
  };

  const handleResetCode = () => {
    setCode(lessonData.initialCode);
    setOutput('');
    setIsPassed(false);
  };

  return (
    <div className={styles.container}>
      {/* ─── TOP HEADER ─────────────────────────────────────────────── */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <Link href="/learn/python" className={styles.btnClose} title="Back to Journey">
            ✕
          </Link>
          <span className={styles.lessonTitle}>{lessonData.title}</span>
        </div>

        <div className={styles.headerRight}>
          <div className={`${styles.statItem} ${styles.statFlame}`}>
            <span>0</span> 💧
          </div>
          <div className={`${styles.statItem} ${styles.statGems}`}>
            <span>20</span> 🔶
          </div>
          <div className={`${styles.statItem} ${styles.statEnergy}`}>
            <span>5</span> ⚡
          </div>
          <div className={styles.userAvatar}>P</div>
        </div>
      </header>

      {/* ─── WORKSPACE SPLIT ────────────────────────────────────────── */}
      <div className={styles.workspace}>

        {/* LEFTMOST ICON SIDEBAR */}
        <aside className={styles.iconSidebar}>
          <button className={`${styles.sideIconBtn} ${styles.sideIconBtnActive}`} title="Lesson">📖</button>
          <button className={styles.sideIconBtn} title="Code">💻</button>
          <button className={styles.sideIconBtn} title="History">🕒</button>
          <button className={styles.sideIconBtn} title="Search">🔍</button>
          <button className={styles.sideIconBtn} title="Discussion">💬</button>
          <button className={styles.sideIconBtn} title="Help">❓</button>
        </aside>

        {/* LESSON CONTENT PANEL (LEFT) */}
        <section className={styles.lessonPanel}>
          <div className={styles.lessonHeader}>
            <h1 className={styles.lessonMainTitle}>{lessonData.subtitle}</h1>
            <div className={styles.tldrBadgeGroup}>
              <button className={styles.tldrBtn}>TL;DR</button>
              <button className={styles.tldrBtn}>Hide</button>
            </div>
          </div>

          <p className={styles.lessonText}>{lessonData.description}</p>

          {/* Challenge Box */}
          <div className={styles.challengeCard}>
            <div className={styles.challengeTitleRow}>
              <span style={{ fontSize: '1.4rem' }}>💡</span>
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
              <span>🤖</span> Explain challenge
            </button>
          </div>

          {/* Solution Accordion */}
          <div className={styles.solutionSection}>
            <button
              className={styles.solutionToggle}
              onClick={() => setShowSolution(!showSolution)}
            >
              <span>🎯 Solution</span>
              <span>{showSolution ? '▲' : '▼'}</span>
            </button>

            {showSolution && (
              <div className={styles.solutionBox}>
                <pre>{lessonData.solutionCode}</pre>
              </div>
            )}
          </div>
        </section>

        {/* EDITOR PANEL (RIGHT) */}
        <section className={styles.editorPanel}>
          
          {/* Toolbar */}
          <div className={styles.editorToolbar}>
            <div className={styles.fileTab}>
              <span>🐍</span> Python
            </div>
            <div className={styles.toolbarActions}>
              <button className={styles.toolBtn} title="Audio Guide">🔊</button>
              <button className={styles.toolBtn} title="Save Code">💾</button>
              <button className={styles.toolBtn} onClick={handleResetCode} title="Reset Code">🔄</button>
            </div>
          </div>

          {/* Code Mirror / Textarea Editor */}
          <div className={styles.codeWrap}>
            <textarea
              className={styles.textareaEditor}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />

            {/* Floating Action Buttons */}
            <div className={styles.editorFloatBar}>
              <button className={styles.btnAskAI}>
                <span>🤖</span> Ask AI
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
                <span>🎉 Challenge Completed! +20 XP</span>
                <Link href="/learn/python" style={{ color: 'white', textDecoration: 'underline' }}>
                  Next Lesson →
                </Link>
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
