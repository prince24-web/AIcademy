'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// ─── SVG LOGOS & VECTOR ICONS (NO EMOJIS) ───────────────────────────────
const AILogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="url(#aiGradJ)" />
    <defs>
      <radialGradient id="aiGradJ" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(45)">
        <stop stopColor="#6435c2"/>
        <stop offset="1" stopColor="#311175"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="10" fill="#a78bfa"/>
    <circle cx="26" cy="30" r="6" fill="#c4b5fd"/>
    <circle cx="74" cy="30" r="6" fill="#c4b5fd"/>
    <circle cx="26" cy="70" r="6" fill="#c4b5fd"/>
    <circle cx="74" cy="70" r="6" fill="#c4b5fd"/>
    <line x1="50" y1="50" x2="26" y2="30" stroke="#c4b5fd" strokeWidth="2.5" opacity="0.8"/>
    <line x1="50" y1="50" x2="74" y2="30" stroke="#c4b5fd" strokeWidth="2.5" opacity="0.8"/>
    <line x1="50" y1="50" x2="26" y2="70" stroke="#c4b5fd" strokeWidth="2.5" opacity="0.8"/>
    <line x1="50" y1="50" x2="74" y2="70" stroke="#c4b5fd" strokeWidth="2.5" opacity="0.8"/>
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

// ─── AI FUNDAMENTALS / APPLIED AI ENGINEERING MODULES ───────────────────
const aiModules = [
  {
    id: 1,
    title: 'Module 1: What is AI?',
    subtitle: 'Goal: Understand core AI concepts & applications.',
    lessons: [
      { id: 'ai-1-1', name: 'What is Artificial Intelligence?', nodeType: 'lightbulb', status: 'completed' },
      { id: 'ai-1-2', name: 'AI vs Machine Learning vs Deep Learning', nodeType: 'star', status: 'active' },
      { id: 'ai-1-3', name: 'Types of AI (Narrow AI vs AGI)', nodeType: 'concept', status: 'locked' },
      { id: 'ai-1-4', name: 'Real-world AI Applications', nodeType: 'concept', status: 'active' },
      { id: 'ai-1-5', name: 'Module 1 Knowledge Check & Classifier Quiz', nodeType: 'star', status: 'active' },
    ]
  },
  {
    id: 2,
    title: 'Module 2: How Large Language Models Work',
    subtitle: 'Goal: Understand LLM inner workings & parameters.',
    lessons: [
      { id: 'ai-2-1', name: 'What is an LLM?', nodeType: 'concept', status: 'locked' },
      { id: 'ai-2-2', name: 'Training vs Inference', nodeType: 'concept', status: 'locked' },
      { id: 'ai-2-3', name: 'Transformers & Attention (High Level)', nodeType: 'star', status: 'locked' },
      { id: 'ai-2-4', name: 'Tokens & Tokenization', nodeType: 'concept', status: 'locked' },
      { id: 'ai-2-5', name: 'Context Window & Memory Limits', nodeType: 'concept', status: 'locked' },
      { id: 'ai-2-6', name: 'Embeddings & Vector Space', nodeType: 'lightbulb', status: 'locked' },
      { id: 'ai-2-7', name: 'Parameters & Model Weights', nodeType: 'concept', status: 'locked' },
      { id: 'ai-2-8', name: 'Temperature & Sampling', nodeType: 'star', status: 'locked' },
      { id: 'ai-2-9', name: 'Hallucinations & Limitations', nodeType: 'concept', status: 'locked' },
      { id: 'ai-2-p1', name: 'Mini Project: Token Counter & Cost Calc', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 3,
    title: 'Module 3: Prompt Engineering',
    subtitle: 'Goal: Master prompt design patterns.',
    lessons: [
      { id: 'ai-3-1', name: 'Writing Effective Prompts', nodeType: 'concept', status: 'active' },
      { id: 'ai-3-2', name: 'System vs User vs Assistant Prompts', nodeType: 'star', status: 'active' },
      { id: 'ai-3-3', name: 'Few-shot Prompting', nodeType: 'concept', status: 'active' },
      { id: 'ai-3-4', name: 'Chain-of-Thought Reasoning', nodeType: 'lightbulb', status: 'active' },
      { id: 'ai-3-5', name: 'Structured Outputs', nodeType: 'concept', status: 'active' },
      { id: 'ai-3-6', name: 'Iterative Prompt Refinement', nodeType: 'star', status: 'active' },
      { id: 'ai-3-7', name: 'Mini Project: Prompt Optimizer Tool', nodeType: 'project', status: 'active', isProject: true },
    ]
  },
  {
    id: 4,
    title: 'Module 4: AI APIs',
    subtitle: 'Goal: Connect to AI models via code APIs.',
    lessons: [
      { id: 'ai-4-1', name: 'What is an AI API?', nodeType: 'concept', status: 'active' },
      { id: 'ai-4-2', name: 'Managing API Keys Safely', nodeType: 'star', status: 'active' },
      { id: 'ai-4-3', name: 'Making Your First AI Request', nodeType: 'concept', status: 'active' },
      { id: 'ai-4-4', name: 'Chat Completions & Messages', nodeType: 'concept', status: 'active' },
      { id: 'ai-4-5', name: 'Streaming Responses in Real-time', nodeType: 'lightbulb', status: 'active' },
      { id: 'ai-4-6', name: 'Function Calling / Tool Use', nodeType: 'star', status: 'active' },
      { id: 'ai-4-7', name: 'JSON Mode & Schema Enforcement', nodeType: 'concept', status: 'active' },
      { id: 'ai-4-8', name: 'Structured Outputs Parsing', nodeType: 'concept', status: 'active' },
      { id: 'ai-4-9', name: 'Mini Project: Live Weather AI Assistant', nodeType: 'project', status: 'active', isProject: true },
    ]
  },
  {
    id: 5,
    title: 'Module 5: Retrieval-Augmented Generation (RAG)',
    subtitle: 'Goal: Ground LLMs on your custom data.',
    lessons: [
      { id: 'ai-5-1', name: 'Why LLMs Forget & Knowledge Cutoffs', nodeType: 'concept', status: 'active' },
      { id: 'ai-5-2', name: 'Building Custom Knowledge Bases', nodeType: 'star', status: 'active' },
      { id: 'ai-5-3', name: 'Generating Vector Embeddings', nodeType: 'concept', status: 'active' },
      { id: 'ai-5-4', name: 'Vector Databases (Chroma/Pinecone)', nodeType: 'concept', status: 'active' },
      { id: 'ai-5-5', name: 'Semantic Search vs Keyword Search', nodeType: 'lightbulb', status: 'active' },
      { id: 'ai-5-6', name: 'Complete Retrieval Pipeline', nodeType: 'star', status: 'locked' },
      { id: 'ai-5-7', name: 'Mini Project: PDF Question-Answering', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 6,
    title: 'Module 6: AI Agents',
    subtitle: 'Goal: Build autonomous multi-step agents.',
    lessons: [
      { id: 'ai-6-1', name: 'What is an AI Agent?', nodeType: 'concept', status: 'locked' },
      { id: 'ai-6-2', name: 'Equipping Agents with Tools', nodeType: 'star', status: 'locked' },
      { id: 'ai-6-3', name: 'Agentic Memory (Short & Long-term)', nodeType: 'concept', status: 'locked' },
      { id: 'ai-6-4', name: 'Agent Planning & Goal Decomposition', nodeType: 'lightbulb', status: 'locked' },
      { id: 'ai-6-5', name: 'Multi-step ReAct Reasoning Loops', nodeType: 'star', status: 'locked' },
      { id: 'ai-6-6', name: 'Multi-agent Systems', nodeType: 'concept', status: 'locked' },
      { id: 'ai-6-7', name: 'Mini Project: Autonomous Research Agent', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 7,
    title: 'Module 7: AI Safety & Limitations',
    subtitle: 'Goal: Build safe, ethical & secure AI systems.',
    lessons: [
      { id: 'ai-7-1', name: 'Mitigating Hallucinations', nodeType: 'concept', status: 'locked' },
      { id: 'ai-7-2', name: 'Identifying & Reducing AI Bias', nodeType: 'star', status: 'locked' },
      { id: 'ai-7-3', name: 'Data Privacy & Compliance', nodeType: 'concept', status: 'locked' },
      { id: 'ai-7-4', name: 'Prompt Injection Attacks', nodeType: 'concept', status: 'locked' },
      { id: 'ai-7-5', name: 'Jailbreaks & Defense Guardrails', nodeType: 'lightbulb', status: 'locked' },
      { id: 'ai-7-6', name: 'AI Ethics & Responsible AI', nodeType: 'concept', status: 'locked' },
      { id: 'ai-7-7', name: 'Human-in-the-Loop Supervision', nodeType: 'star', status: 'locked' },
      { id: 'ai-7-8', name: 'Mini Project: AI Security Filter', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 8,
    title: 'Module 8: AI Costs & Performance',
    subtitle: 'Goal: Optimize latency, throughput & API costs.',
    lessons: [
      { id: 'ai-8-1', name: 'Understanding Token Economics', nodeType: 'concept', status: 'locked' },
      { id: 'ai-8-2', name: 'Input vs Output Token Pricing', nodeType: 'star', status: 'locked' },
      { id: 'ai-8-3', name: 'Context Window Optimization', nodeType: 'concept', status: 'locked' },
      { id: 'ai-8-4', name: 'Latency vs Throughput', nodeType: 'concept', status: 'locked' },
      { id: 'ai-8-5', name: 'Managing Rate Limits & Retries', nodeType: 'lightbulb', status: 'locked' },
      { id: 'ai-8-6', name: 'Model Selection Strategy', nodeType: 'star', status: 'locked' },
      { id: 'ai-8-7', name: 'Cost Optimization Techniques', nodeType: 'concept', status: 'locked' },
      { id: 'ai-8-8', name: 'Mini Project: Token Budget Calculator', nodeType: 'project', status: 'locked', isProject: true },
    ]
  },
  {
    id: 9,
    title: 'Module 9: Building AI Applications',
    subtitle: 'Goal: Deploy production AI applications.',
    lessons: [
      { id: 'ai-9-1', name: 'Building AI Chatbots', nodeType: 'concept', status: 'locked' },
      { id: 'ai-9-2', name: 'Specialized AI Assistants', nodeType: 'star', status: 'locked' },
      { id: 'ai-9-3', name: 'Document Q&A Interfaces', nodeType: 'concept', status: 'locked' },
      { id: 'ai-9-4', name: 'AI-Powered Search Engines', nodeType: 'concept', status: 'locked' },
      { id: 'ai-9-5', name: 'AI Process Automation', nodeType: 'lightbulb', status: 'locked' },
      { id: 'ai-9-6', name: 'Enterprise AI Workflows', nodeType: 'concept', status: 'locked' },
      { id: 'ai-9-7', name: 'Final Project: Build Your Autonomous AI Assistant', nodeType: 'project', status: 'locked', isProject: true },
    ]
  }
];

export default function AIFundamentalsJourneyPage() {
  const [activeNodeId, setActiveNodeId] = useState('ai-1-2');
  const [currentSectionText, setCurrentSectionText] = useState('Section 1 · Chapter 2');
  const [currentTopicTitle, setCurrentTopicTitle] = useState('AI vs Machine Learning vs Deep Learning');
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

    aiModules.forEach((mod, modIdx) => {
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
        <Link href="/" className={styles.sidebarLogo} title="Vinci Home">
          <img src="/mascot.png" alt="Vinci Mascot" className={styles.sidebarLogoImg} />
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
                stroke="#e9d5ff"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner Dashed Accent Line */}
              <path
                d={svgPathData}
                fill="none"
                stroke="#c084fc"
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
                      <Link href={`/learn/ai-engineering/${lesson.id}`} className={styles.popoverBtn} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                        {isCompleted ? 'REVIEW' : 'START'}
                      </Link>
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
              <AILogo size={24} />
              <span>AI Fundamentals</span>
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
            <h3 className={styles.promoTitle}>AI Engineering Masterclass!</h3>
            <p className={styles.promoText}>
              Master LLMs, Prompt Engineering, RAG & Autonomous AI Agents!
            </p>
            <div className={styles.promoTimer}>Ends in: 47:52:18</div>
            <button className={styles.btnGoPro}>GO PRO</button>
            <img src="/mascot.png" alt="Mascot" className={styles.promoMascot} />
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
                Start learning AI and earning XP to join this week&apos;s leaderboard!
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
              <div style={{ color: '#7c3aed', display: 'flex' }}>
                <IconTarget size={28} />
              </div>
              <div className={styles.leaderboardText}>
                Complete 1 AI lesson today to keep your streak alive!
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
