'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// ─── SVG LOGOS & VECTOR ICONS (NO EMOJIS) ───────────────────────────────
const PythonLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pyBlueJ" x1="12%" y1="12%" x2="88%" y2="88%">
        <stop offset="0%" stopColor="#387EB8"/>
        <stop offset="100%" stopColor="#366994"/>
      </linearGradient>
      <linearGradient id="pyYellowJ" x1="12%" y1="12%" x2="88%" y2="88%">
        <stop offset="0%" stopColor="#FFE052"/>
        <stop offset="100%" stopColor="#FFC331"/>
      </linearGradient>
    </defs>
    <path fill="url(#pyBlueJ)" d="M126.9 0C62.4 0 66.3 28 66.3 28l.1 29h61.8v8.7H41.6S0 61.2 0 126.3c0 65 35.9 62.7 35.9 62.7h21.4v-30.2s-1.2-35.9 35.3-35.9h60.8s34.2.5 34.2-33.1V34.3S192.1 0 126.9 0zm-33.8 19.7c6.1 0 11 4.9 11 11s-4.9 11-11 11-11-4.9-11-11 4.9-11 11-11z"/>
    <path fill="url(#pyYellowJ)" d="M128.9 255c64.5 0 60.6-28 60.6-28l-.1-29h-61.8v-8.7h86.6s41.6 4.5 41.6-60.6c0-65-35.9-62.7-35.9-62.7h-21.4v30.2s1.2 35.9-35.3 35.9H102.4s-34.2-.5-34.2 33.1v55.5S63 255 128.9 255zm33.8-19.7c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z"/>
  </svg>
);

// Node Type Icons
const IconLightbulb = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
  </svg>
);

const IconStar = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const IconHammer = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 5 4 4"/><path d="M13 7 4 16v4h4l9-9"/><path d="m14.5 12.5 2 2"/><path d="m11.5 9.5 2 2"/>
  </svg>
);

const IconFlag = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

const IconCheckmark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconLock = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// Navigation Sidebar SVGs
const NavIconMap = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const NavIconDumbbell = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 6.5h11M6.5 17.5h11M3 9.5h18v5H3z"/>
  </svg>
);

const NavIconPalette = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.5-.72 1.5-1.5 0-.4-.15-.78-.42-1.07-.27-.29-.42-.66-.42-1.07 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/>
  </svg>
);

const NavIconFlag = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

const NavIconTrophy = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const NavIconStore = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>
  </svg>
);

const NavIconProfile = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

// Top Stats SVGs
const StatIconStreak = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f97316">
    <path d="M12.432 0c1.34 8.636-5.36 11.29-5.36 11.29-.09-3.06-1.4-4.29-3.37-5.67C3.704 7.26 2.5 10.03 2.5 12.5 2.5 18.299 6.7 22 12 22s9.5-3.7 9.5-9.5c0-4.88-4.7-8.3-9.068-12.5z"/>
  </svg>
);

const StatIconGem = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b">
    <polygon points="6 3 18 3 22 9 12 22 2 9"/>
  </svg>
);

const StatIconEnergy = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#3b82f6">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconShield = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconTarget = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

// ─── 12 PYTHON MODULES ROADMAP DATA ────────────────────────────────────
const pythonModules = [
  {
    id: 1,
    title: 'Module 1: Python Basics',
    subtitle: 'Goal: Learn how to write simple programs.',
    lessons: [
      { id: '1-1', name: 'Introduction to Python', nodeType: 'lightbulb', status: 'completed' },
      { id: '1-2', name: 'Variables & Assignments', nodeType: 'concept', status: 'active' },
      { id: '1-3', name: 'Data Types (strings, numbers, booleans)', nodeType: 'concept', status: 'locked' },
      { id: '1-4', name: 'Printing Output & Formatting', nodeType: 'star', status: 'locked' },
      { id: '1-5', name: 'User Input & Comments', nodeType: 'concept', status: 'locked' },
      { id: '1-6', name: 'Basic Operators', nodeType: 'star', status: 'locked' },
      { id: '1-7', name: 'Mini Project: Simple Calculator', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 2,
    title: 'Module 2: Control Flow',
    subtitle: 'Goal: Make your programs think.',
    lessons: [
      { id: '2-1', name: 'if / elif / else Statements', nodeType: 'concept', status: 'locked' },
      { id: '2-2', name: 'Comparison Operators', nodeType: 'star', status: 'locked' },
      { id: '2-3', name: 'Logical Operators (and, or, not)', nodeType: 'concept', status: 'locked' },
      { id: '2-4', name: 'Pattern Matching (match case)', nodeType: 'lightbulb', status: 'locked' },
      { id: '2-5', name: 'Mini Project: Guess the Number Game', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 3,
    title: 'Module 3: Loops',
    subtitle: 'Goal: Repeat tasks efficiently.',
    lessons: [
      { id: '3-1', name: 'for Loops & Iteration', nodeType: 'concept', status: 'locked' },
      { id: '3-2', name: 'while Loops', nodeType: 'concept', status: 'locked' },
      { id: '3-3', name: 'break & continue Statements', nodeType: 'star', status: 'locked' },
      { id: '3-4', name: 'The range() Function', nodeType: 'lightbulb', status: 'locked' },
      { id: '3-5', name: 'Mini Project: Password Strength Checker', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 4,
    title: 'Module 4: Functions',
    subtitle: 'Goal: Write reusable code.',
    lessons: [
      { id: '4-1', name: 'Defining Functions (def)', nodeType: 'concept', status: 'locked' },
      { id: '4-2', name: 'Parameters & Arguments', nodeType: 'star', status: 'locked' },
      { id: '4-3', name: 'Return Values', nodeType: 'concept', status: 'locked' },
      { id: '4-4', name: 'Variable Scope (Local vs Global)', nodeType: 'lightbulb', status: 'locked' },
      { id: '4-5', name: 'Mini Project: Unit Converter', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 5,
    title: 'Module 5: Data Structures',
    subtitle: 'Goal: Organize data.',
    lessons: [
      { id: '5-1', name: 'Lists & List Methods', nodeType: 'concept', status: 'locked' },
      { id: '5-2', name: 'Tuples (Immutability)', nodeType: 'concept', status: 'locked' },
      { id: '5-3', name: 'Dictionaries (Key-Value Pairs)', nodeType: 'star', status: 'locked' },
      { id: '5-4', name: 'Sets & Unique Collections', nodeType: 'lightbulb', status: 'locked' },
      { id: '5-5', name: 'Mini Project: Student Grade Manager', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 6,
    title: 'Module 6: Working with Files',
    subtitle: 'Goal: Save and load data.',
    lessons: [
      { id: '6-1', name: 'Reading Files', nodeType: 'concept', status: 'locked' },
      { id: '6-2', name: 'Writing & Appending Files', nodeType: 'star', status: 'locked' },
      { id: '6-3', name: 'CSV File Basics', nodeType: 'concept', status: 'locked' },
      { id: '6-4', name: 'JSON Parsing & Serialization', nodeType: 'lightbulb', status: 'locked' },
      { id: '6-5', name: 'Mini Project: Expense Tracker', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 7,
    title: 'Module 7: Error Handling',
    subtitle: 'Goal: Build reliable programs.',
    lessons: [
      { id: '7-1', name: 'try / except Blocks', nodeType: 'concept', status: 'locked' },
      { id: '7-2', name: 'Handling Common Exceptions', nodeType: 'star', status: 'locked' },
      { id: '7-3', name: 'Raising Errors (raise)', nodeType: 'lightbulb', status: 'locked' },
      { id: '7-4', name: 'Mini Project: Safe Calculator', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 8,
    title: 'Module 8: Object-Oriented Programming',
    subtitle: 'Goal: Understand classes used in AI libraries.',
    lessons: [
      { id: '8-1', name: 'Classes & Objects', nodeType: 'concept', status: 'locked' },
      { id: '8-2', name: 'Methods & the self Keyword', nodeType: 'concept', status: 'locked' },
      { id: '8-3', name: 'Constructors (__init__)', nodeType: 'star', status: 'locked' },
      { id: '8-4', name: 'Inheritance Basics', nodeType: 'lightbulb', status: 'locked' },
      { id: '8-5', name: 'Mini Project: Bank Account System', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 9,
    title: 'Module 9: Python Modules',
    subtitle: 'Goal: Use existing code.',
    lessons: [
      { id: '9-1', name: 'Importing Standard Modules', nodeType: 'concept', status: 'locked' },
      { id: '9-2', name: 'Creating Custom Modules', nodeType: 'concept', status: 'locked' },
      { id: '9-3', name: 'Package Management with pip', nodeType: 'star', status: 'locked' },
      { id: '9-4', name: 'Virtual Environments', nodeType: 'lightbulb', status: 'locked' },
      { id: '9-5', name: 'Mini Project: Weather App (using API)', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 10,
    title: 'Module 10: NumPy',
    subtitle: 'Goal: Learn numerical computing.',
    lessons: [
      { id: '10-1', name: 'NumPy Arrays & Dimensions', nodeType: 'concept', status: 'locked' },
      { id: '10-2', name: 'Array Indexing & Slicing', nodeType: 'star', status: 'locked' },
      { id: '10-3', name: 'Broadcasting & Vectorization', nodeType: 'concept', status: 'locked' },
      { id: '10-4', name: 'Basic Linear Algebra', nodeType: 'lightbulb', status: 'locked' },
      { id: '10-5', name: 'Mini Project: Matrix Operations', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 11,
    title: 'Module 11: Pandas',
    subtitle: 'Goal: Work with datasets.',
    lessons: [
      { id: '11-1', name: 'DataFrames & Series', nodeType: 'concept', status: 'locked' },
      { id: '11-2', name: 'Reading CSV Datasets', nodeType: 'star', status: 'locked' },
      { id: '11-3', name: 'Data Cleaning & Filtering', nodeType: 'concept', status: 'locked' },
      { id: '11-4', name: 'Grouping & Aggregation', nodeType: 'lightbulb', status: 'locked' },
      { id: '11-5', name: 'Handling Missing Values', nodeType: 'star', status: 'locked' },
      { id: '11-6', name: 'Mini Project: Netflix Dataset Analysis', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 12,
    title: 'Module 12: Data Visualization',
    subtitle: 'Goal: Understand your data visually.',
    lessons: [
      { id: '12-1', name: 'Matplotlib Basics', nodeType: 'concept', status: 'locked' },
      { id: '12-2', name: 'Line Plots & Customization', nodeType: 'star', status: 'locked' },
      { id: '12-3', name: 'Histograms & Distributions', nodeType: 'concept', status: 'locked' },
      { id: '12-4', name: 'Scatter Plots & Correlations', nodeType: 'lightbulb', status: 'locked' },
      { id: '12-5', name: 'Bar Charts & Categorical Data', nodeType: 'concept', status: 'locked' },
      { id: '12-6', name: 'Mini Project: Sales Dashboard', nodeType: 'project', status: 'locked', isProject: true },
    ]
  }
];

export default function PythonJourneyPage() {
  const [activeNodeId, setActiveNodeId] = useState('1-2');
  const [currentSectionText, setCurrentSectionText] = useState('Section 1 · Chapter 2');
  const [currentTopicTitle, setCurrentTopicTitle] = useState('Variables & Assignments');
  const [activeTab, setActiveTab] = useState('map');

  // Sinusoidal offsets for winding path effect
  const getXOffset = (index) => {
    const pattern = [0, 65, 115, 65, 0, -65, -115, -65];
    return pattern[index % pattern.length];
  };

  // Mathematically unified layout calculation
  const layoutData = useMemo(() => {
    const items = [];
    const banners = [];
    let currentY = 40;

    pythonModules.forEach((mod, modIdx) => {
      banners.push({
        id: mod.id,
        title: mod.title.split(':')[1] || mod.title,
        y: currentY,
      });
      currentY += 80;

      mod.lessons.forEach((lesson, lessonIdx) => {
        const globalIdx = items.length;
        const xOffset = getXOffset(globalIdx);
        const cx = 220 + xOffset;
        const cy = currentY;

        items.push({
          lesson,
          modIdx,
          lessonIdx,
          globalIdx,
          cx,
          cy,
        });

        currentY += 94;
      });

      currentY += 40;
    });

    return { items, banners, totalHeight: currentY + 60 };
  }, []);

  // Generate smooth SVG curve connecting every node center
  const svgPathData = useMemo(() => {
    const { items } = layoutData;
    if (!items || items.length === 0) return '';

    let d = `M ${items[0].cx} ${items[0].cy}`;
    for (let i = 0; i < items.length - 1; i++) {
      const p1 = items[i];
      const p2 = items[i + 1];
      const midY = (p1.cy + p2.cy) / 2;
      d += ` C ${p1.cx} ${midY}, ${p2.cx} ${midY}, ${p2.cx} ${p2.cy}`;
    }
    return d;
  }, [layoutData]);

  const renderNodeIcon = (lesson) => {
    if (lesson.status === 'completed') {
      return <IconCheckmark size={30} />;
    }
    switch (lesson.nodeType) {
      case 'lightbulb':
        return <IconLightbulb size={26} />;
      case 'star':
        return <IconStar size={24} />;
      case 'project':
        return <IconHammer size={26} />;
      case 'flag':
        return <IconFlag size={26} />;
      case 'concept':
      default:
        return lesson.status === 'locked' ? <IconLock size={22} /> : <IconLightbulb size={26} />;
    }
  };

  const handleNodeClick = (lesson, sectionIndex, chapterIndex) => {
    setActiveNodeId(lesson.id);
    setCurrentSectionText(`Section ${sectionIndex + 1} · Chapter ${chapterIndex + 1}`);
    setCurrentTopicTitle(lesson.name);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {/* ─── LEFT SIDEBAR ────────────────────────────────────────────── */}
      <aside className={styles.leftSidebar}>
        <Link href="/" className={styles.sidebarLogo} title="AIcademy Home">
          <img src="/mascot.png" alt="Mascot" className={styles.sidebarLogoImg} />
        </Link>

        <div className={styles.navItems}>
          <button
            className={`${styles.navBtn} ${activeTab === 'map' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <NavIconMap size={24} />
            <span className={styles.navTooltip}>Journey Path</span>
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === 'practice' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            <NavIconDumbbell size={24} />
            <span className={styles.navTooltip}>Practice</span>
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === 'store' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveTab('store')}
          >
            <NavIconPalette size={24} />
            <span className={styles.navTooltip}>Customization</span>
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === 'quests' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveTab('quests')}
          >
            <NavIconFlag size={24} />
            <span className={styles.navTooltip}>Quests</span>
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === 'leaderboard' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <NavIconTrophy size={24} />
            <span className={styles.navTooltip}>Leaderboard</span>
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === 'shop' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveTab('shop')}
          >
            <NavIconStore size={24} />
            <span className={styles.navTooltip}>Shop</span>
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === 'profile' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <NavIconProfile size={24} />
            <span className={styles.navTooltip}>Profile</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN LAYOUT ─────────────────────────────────────────────── */}
      <div className={styles.mainLayout}>
        
        {/* ─── MIDDLE PATH AREA ────────────────────────────────────── */}
        <main className={styles.pathArea}>
          
          {/* Scroll to Top Button */}
          <button className={styles.scrollTopBtn} onClick={scrollToTop} title="Back to Top">
            <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>▲</span>
          </button>

          {/* Sticky Syllabus Breadcrumb Header */}
          <div className={styles.syllabusHeader}>
            <div className={styles.syllabusBreadcrumb}>
              Syllabus &gt; <span>{currentSectionText}</span>
            </div>
            <h1 className={styles.syllabusTitle}>{currentTopicTitle}</h1>
          </div>

          {/* Winding Path Canvas with Absolute Placement */}
          <div className={styles.pathCanvas} style={{ height: `${layoutData.totalHeight}px` }}>
            
            {/* BACKGROUND CONNECTED SVG LINE */}
            <svg className={styles.connectedSvg} viewBox={`0 0 440 ${layoutData.totalHeight}`}>
              {/* Outer Ribbon Track */}
              <path
                d={svgPathData}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner Dashed Accent Line */}
              <path
                d={svgPathData}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="10 8"
              />
            </svg>

            {/* SECTION BANNERS */}
            {layoutData.banners.map((banner) => (
              <div
                key={banner.id}
                className={styles.sectionBanner}
                style={{ top: `${banner.y - 20}px` }}
              >
                <div className={styles.sectionBannerLine} />
                <div className={styles.sectionBannerTag}>
                  {banner.title}
                </div>
              </div>
            ))}

            {/* 3D STEP NODES */}
            {layoutData.items.map((item) => {
              const { lesson, modIdx, lessonIdx, cx, cy } = item;
              const isActive = lesson.id === activeNodeId;
              const isCompleted = lesson.status === 'completed';
              const isProject = lesson.isProject;

              return (
                <div
                  key={lesson.id}
                  className={styles.pathNodeWrapper}
                  style={{
                    left: `${cx - 43}px`,
                    top: `${cy - 39}px`,
                  }}
                >
                  {/* Active Node Popover Card */}
                  {isActive && (
                    <div className={styles.popoverCard}>
                      <div className={styles.popoverTitle}>{lesson.name}</div>
                      <button className={styles.popoverBtn}>
                        {isCompleted ? 'REVIEW' : 'START'}
                      </button>
                    </div>
                  )}

                  {/* Jump Here Tag */}
                  {isActive && !isCompleted && (
                    <div className={styles.jumpHereTag}>JUMP HERE?</div>
                  )}

                  {/* 3D HEXAGONAL BLOCK BUTTON */}
                  <button
                    className={`
                      ${styles.nodeBtn} 
                      ${isActive ? styles.nodeActive : ''} 
                      ${isCompleted ? styles.nodeCompleted : ''} 
                      ${isProject ? styles.nodeProject : ''}
                    `}
                    onClick={() => handleNodeClick(lesson, modIdx, lessonIdx)}
                    title={lesson.name}
                  >
                    {isActive && <div className={styles.nodeActiveGlow} />}
                    
                    <div className={styles.node3dShadow} />
                    <div className={styles.node3dDepth} />
                    
                    <div className={styles.node3dTop}>
                      {renderNodeIcon(lesson)}
                    </div>

                    {isProject && <div className={styles.projectPill}>PROJECT</div>}
                  </button>
                </div>
              );
            })}

          </div>
        </main>

        {/* ─── RIGHT SIDEBAR (STATS, PROMO, LEADERBOARD) ────────────── */}
        <aside className={styles.rightSidebar}>
          
          {/* Top Header Stats */}
          <div className={styles.topStatsBar}>
            <div className={styles.langBadge}>
              <PythonLogo size={24} />
              <span>Python</span>
            </div>
            <div className={styles.statsCounters}>
              <div className={`${styles.statItem} ${styles.statItemFlame}`}>
                <StatIconStreak size={20} />
                <span>0</span>
              </div>
              <div className={`${styles.statItem} ${styles.statItemGems}`}>
                <StatIconGem size={20} />
                <span>20</span>
              </div>
              <div className={`${styles.statItem} ${styles.statItemEnergy}`}>
                <StatIconEnergy size={20} />
                <span>5</span>
              </div>
            </div>
          </div>

          {/* Special Offer Promo Card */}
          <div className={`${styles.widgetCard} ${styles.promoCard}`}>
            <h3 className={styles.promoTitle}>Your Coding Comeback!</h3>
            <p className={styles.promoText}>
              Unlock your potential! Get 40% OFF - limited time!
            </p>
            <div className={styles.promoTimer}>Ends in: 47:52:18</div>
            <button className={styles.btnGoPro}>GO PRO</button>
            <img src="/mascot.png" alt="Bell mascot" className={styles.promoMascot} />
          </div>

          {/* Leaderboard Card */}
          <div className={styles.widgetCard}>
            <div className={styles.widgetHeader}>
              <h4 className={styles.widgetTitle}>Leaderboard</h4>
              <a href="#" className={styles.widgetAction}>View</a>
            </div>
            <div className={styles.leaderboardBox}>
              <div className={styles.shieldIcon}>
                <IconShield size={24} />
              </div>
              <div className={styles.leaderboardText}>
                Start learning and earning XP to join this week&apos;s leaderboard!
              </div>
            </div>
          </div>

          {/* Daily Missions Card */}
          <div className={styles.widgetCard}>
            <div className={styles.widgetHeader}>
              <h4 className={styles.widgetTitle}>Daily Missions</h4>
              <a href="#" className={styles.widgetAction}>View</a>
            </div>
            <div className={styles.leaderboardBox}>
              <div style={{ color: '#f59e0b', display: 'flex' }}>
                <IconTarget size={28} />
              </div>
              <div className={styles.leaderboardText}>
                Complete 1 lesson today to keep your daily streak alive!
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <footer className={styles.journeyFooter}>
            <div className={styles.footerNavLinks}>
              <a href="#" className={styles.footerNavLink}>About</a>
              <a href="#" className={styles.footerNavLink}>Certifications</a>
              <a href="#" className={styles.footerNavLink}>Mobile App</a>
              <a href="#" className={styles.footerNavLink}>Affiliate</a>
              <a href="#" className={styles.footerNavLink}>Teachers</a>
              <a href="#" className={styles.footerNavLink}>Blog</a>
              <a href="#" className={styles.footerNavLink}>Contact</a>
              <a href="#" className={styles.footerNavLink}>Privacy</a>
              <a href="#" className={styles.footerNavLink}>Terms</a>
            </div>
          </footer>

        </aside>

      </div>
    </div>
  );
}
