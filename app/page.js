'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconTerminal = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const IconBrain = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z" />
  </svg>
);
const IconDatabase = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const IconFlame = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#f97316" stroke="none">
    <path d="M12.432 0c1.34 8.636-5.36 11.29-5.36 11.29-.09-3.06-1.4-4.29-3.37-5.67C3.704 7.26 2.5 10.03 2.5 12.5 2.5 18.299 6.7 22 12 22s9.5-3.7 9.5-9.5c0-4.88-4.7-8.3-9.068-12.5z" />
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconTarget = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconZap = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconGem = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#60a5fa" stroke="none">
    <polygon points="6 3 18 3 22 9 12 22 2 9" />
  </svg>
);
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ─── REAL LOGOS ──────────────────────────────────────────────────────────
const PythonLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pyBlue" x1="12%" y1="12%" x2="88%" y2="88%">
        <stop offset="0%" stopColor="#387EB8"/>
        <stop offset="100%" stopColor="#366994"/>
      </linearGradient>
      <linearGradient id="pyYellow" x1="12%" y1="12%" x2="88%" y2="88%">
        <stop offset="0%" stopColor="#FFE052"/>
        <stop offset="100%" stopColor="#FFC331"/>
      </linearGradient>
    </defs>
    <path fill="url(#pyBlue)" d="M126.9 0C62.4 0 66.3 28 66.3 28l.1 29h61.8v8.7H41.6S0 61.2 0 126.3c0 65 35.9 62.7 35.9 62.7h21.4v-30.2s-1.2-35.9 35.3-35.9h60.8s34.2.5 34.2-33.1V34.3S192.1 0 126.9 0zm-33.8 19.7c6.1 0 11 4.9 11 11s-4.9 11-11 11-11-4.9-11-11 4.9-11 11-11z"/>
    <path fill="url(#pyYellow)" d="M128.9 255c64.5 0 60.6-28 60.6-28l-.1-29h-61.8v-8.7h86.6s41.6 4.5 41.6-60.6c0-65-35.9-62.7-35.9-62.7h-21.4v30.2s1.2 35.9-35.3 35.9H102.4s-34.2-.5-34.2 33.1v55.5S63 255 128.9 255zm33.8-19.7c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z"/>
  </svg>
);

const AILogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#6435c2"/>
    <circle cx="50" cy="50" r="18" stroke="white" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="50" r="6" fill="white"/>
    <line x1="50" y1="12" x2="50" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="50" y1="68" x2="50" y2="88" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="12" y1="50" x2="32" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="68" y1="50" x2="88" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="24" y1="24" x2="38" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="62" y1="62" x2="76" y2="76" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="76" y1="24" x2="62" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="38" y1="62" x2="24" y2="76" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const MLLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#16a34a"/>
    {/* nodes */}
    <circle cx="20" cy="30" r="6" fill="white" opacity="0.9"/>
    <circle cx="20" cy="50" r="6" fill="white" opacity="0.9"/>
    <circle cx="20" cy="70" r="6" fill="white" opacity="0.9"/>
    <circle cx="50" cy="20" r="6" fill="white"/>
    <circle cx="50" cy="42" r="6" fill="white"/>
    <circle cx="50" cy="62" r="6" fill="white"/>
    <circle cx="50" cy="82" r="6" fill="white"/>
    <circle cx="80" cy="35" r="6" fill="#bbf7d0"/>
    <circle cx="80" cy="65" r="6" fill="#bbf7d0"/>
    {/* connections */}
    <line x1="26" y1="30" x2="44" y2="22" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <line x1="26" y1="30" x2="44" y2="42" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <line x1="26" y1="50" x2="44" y2="42" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <line x1="26" y1="50" x2="44" y2="62" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <line x1="26" y1="70" x2="44" y2="62" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <line x1="26" y1="70" x2="44" y2="82" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <line x1="56" y1="22" x2="74" y2="35" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.7"/>
    <line x1="56" y1="42" x2="74" y2="35" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.7"/>
    <line x1="56" y1="62" x2="74" y2="65" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.7"/>
    <line x1="56" y1="82" x2="74" y2="65" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.7"/>
  </svg>
);

// ─── DATA ────────────────────────────────────────────────────────────────
const courses = [
  { id: 1, logo: <PythonLogo size={44} />, name: 'Python for Beginners', level: 'Beginner', exercises: 140, desc: 'Start your coding journey with Python — the most beginner-friendly language in AI & data science.', href: '/learn/python' },
  { id: 2, logo: <AILogo size={44} />, name: 'Applied AI Engineering', level: 'Intermediate', exercises: 95, desc: 'Build real AI apps: API calls, context management, prompting and autonomous agents.', href: '/learn/ai-engineering' },
  { id: 3, logo: <MLLogo size={44} />, name: 'Machine Learning', level: 'Advanced', exercises: 110, desc: 'Train ML models, understand algorithms, and apply them to real-world datasets.', href: '/learn/machine-learning' },
];

const features = [
  {
    title: 'Interactive Code Editor',
    desc: 'Write, run, and test your code directly in the browser. No complex setup required — start learning in seconds.',
    icon: <IconCode />,
    color: '#dbeafe',
    iconColor: '#2563eb',
  },
  {
    title: 'Instant AI Feedback',
    desc: 'Our automated tests check your code immediately and give you helpful hints when you get stuck.',
    icon: <IconBrain />,
    color: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    title: 'Track Your Progress',
    desc: 'Earn XP, complete daily streaks, and track your learning journey from zero to AI engineer.',
    icon: <IconFlame />,
    color: '#ffedd5',
    iconColor: '#f97316',
  },
];

const catalogLanguages = [
  { name: 'Python', logo: <PythonLogo size={32} />, color: '#3776ab', bg: '#eef4fc' },
  { name: 'Applied AI', logo: <AILogo size={32} />, color: '#6435c2', bg: '#f5f3ff' },
  { name: 'Machine Learning', logo: <MLLogo size={32} />, color: '#16a34a', bg: '#dcfce7' },
];

const techStrip = [
  { name: 'Python', logo: <PythonLogo size={20} />, color: '#3776ab', bg: '#eef4fc' },
  { name: 'Applied AI', logo: <AILogo size={20} />, color: '#6435c2', bg: '#f5f3ff' },
  { name: 'Machine Learning', logo: <MLLogo size={20} />, color: '#16a34a', bg: '#dcfce7' },
];

const testimonials = [
  { name: 'Alex M.', role: 'Software Engineer', text: 'I went from zero coding knowledge to landing my first dev job in 8 months. The interactive exercises and instant feedback made all the difference.', rating: 5 },
  { name: 'Sarah K.', role: 'Data Scientist', text: 'The AI Engineering track completely changed my career. I can now build production-ready AI apps and understand the tech deeply.', rating: 5 },
  { name: 'James T.', role: 'ML Engineer', text: 'Best platform for hands-on learning. The bite-sized lessons make it easy to study during lunch breaks or commutes. Highly recommend!', rating: 5 },
  { name: 'Priya S.', role: 'Backend Developer', text: 'The code editor runs instantly in the browser — no setup needed. Perfect for beginners who want to start immediately without friction.', rating: 5 },
];

const faqs = [
  {
    q: 'Is Vinci free?',
    a: 'Yes. Vinci is completely free to start. You can take dozens of interactive courses, build coding streaks, and earn XP without paying anything. We also offer an optional premium plan with extra features for learners who want more.'
  },
  {
    q: 'How long does it take to learn AI engineering?',
    a: "Most beginners can write useful AI-powered code within 1–2 months of consistent daily practice. Reaching a job-ready level for AI engineering usually takes 6–12 months. With Vinci's gamified streaks and bite-sized lessons, you can make steady progress with as little as 15 minutes a day."
  },
  {
    q: 'What programming language should I learn first?',
    a: 'For most beginners, Python is the easiest language to start with — it reads almost like English and is the #1 language in AI, data science, and machine learning. Our Python for Beginners course is designed for complete beginners and takes you from zero to writing real AI code.'
  },
  {
    q: 'Where can I learn AI and coding for free?',
    a: 'Right here on Vinci! We offer free interactive courses across Python, AI Engineering, Machine Learning, JavaScript, SQL, and more — taught through hands-on lessons with an in-browser code editor and instant AI feedback when you get stuck.'
  },
  {
    q: 'How hard is it to learn to code?',
    a: "Coding is a learnable skill, not a talent. Most beginners feel lost in the first few weeks — that's completely normal. The trick is short daily practice instead of long weekend sessions. Vinci's bite-sized lessons and gamified streaks are built specifically to make sticking with it easy."
  },
  {
    q: 'Can I get a certificate from Vinci?',
    a: "Yes! Every course you complete on Vinci comes with a verifiable certificate of completion. You can download it as a PDF and add it to your LinkedIn profile or résumé to showcase the AI and coding skills you've earned."
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.navInner}>
        <a href="/" className={styles.logo}>
          <img src="/mascot.png" alt="Vinci" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <span className={styles.logoText}>Vinci</span>
          <span className={styles.logoTechBadge}>AI</span>
        </a>

        <div className={styles.navLinks}>
          {/* Catalog mega-menu */}
          <div className={styles.dropdownWrapper} onMouseEnter={() => setCatalogOpen(true)} onMouseLeave={() => setCatalogOpen(false)}>
            <button className={styles.navLink}>Catalog <IconChevronDown /></button>
            {catalogOpen && (
              <div className={styles.megaDropdown}>
                <div className={styles.megaDropdownGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {catalogLanguages.map((lang) => (
                    <a key={lang.name} href="#courses" className={styles.langCard} style={{ '--lang-bg': lang.bg, '--lang-color': lang.color }}>
                      <span className={styles.langCardIcon}>{lang.logo}</span>
                      <span className={styles.langCardName}>{lang.name}</span>
                    </a>
                  ))}
                </div>
                <div className={styles.megaDropdownFooter}>
                  See <a href="#courses"><strong>all courses</strong></a> or pick a track above to start learning.
                </div>
              </div>
            )}
          </div>

          <div className={styles.dropdownWrapper} onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
            <button className={styles.navLink}>Resources <IconChevronDown /></button>
            {resourcesOpen && (
              <div className={styles.dropdown}>
                <a href="#" className={styles.dropdownItemRich}>
                  <span className={styles.dropdownItemIconWrap} style={{ background: '#fef3c7', color: '#d97706' }}><IconCode size={18} /></span>
                  <div><strong>Blog</strong><small>Tutorials and guides from our team</small></div>
                </a>
                <a href="#" className={styles.dropdownItemRich}>
                  <span className={styles.dropdownItemIconWrap} style={{ background: '#dbeafe', color: '#2563eb' }}><IconBook size={18} /></span>
                  <div><strong>Docs</strong><small>Reference docs for every language</small></div>
                </a>
                <a href="#" className={styles.dropdownItemRich}>
                  <span className={styles.dropdownItemIconWrap} style={{ background: '#ede9fe', color: '#7c3aed' }}><IconRobot size={18} /></span>
                  <div><strong>AI Assistant</strong><small>Personal AI tutor for coding help</small></div>
                </a>
                <a href="#" className={styles.dropdownItemRich}>
                  <span className={styles.dropdownItemIconWrap} style={{ background: '#dcfce7', color: '#16a34a' }}><IconTerminal size={18} /></span>
                  <div><strong>Playground</strong><small>Run code in browser, no setup</small></div>
                </a>
              </div>
            )}
          </div>

          <div className={styles.dropdownWrapper} onMouseEnter={() => setCompanyOpen(true)} onMouseLeave={() => setCompanyOpen(false)}>
            <button className={styles.navLink}>Company <IconChevronDown /></button>
            {companyOpen && (
              <div className={styles.dropdown}>
                <a href="#" className={styles.dropdownItemRich}>
                  <span className={styles.dropdownItemIconWrap} style={{ background: '#f0f4ff', color: '#3b82f6' }}><IconTarget size={18} /></span>
                  <div><strong>About Us</strong><small>Our mission and story</small></div>
                </a>
                <a href="#" className={styles.dropdownItemRich}>
                  <span className={styles.dropdownItemIconWrap} style={{ background: '#fef9ec', color: '#d97706' }}><IconSparkles size={18} /></span>
                  <div><strong>Careers</strong><small>Join our team</small></div>
                </a>
                <a href="#" className={styles.dropdownItemRich}>
                  <span className={styles.dropdownItemIconWrap} style={{ background: '#f0fdf4', color: '#16a34a' }}><IconCheck size={18} /></span>
                  <div><strong>Contact</strong><small>Get in touch with us</small></div>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={styles.navActions}>
          <button className={styles.themeBtn} aria-label="Toggle theme"><IconMoon /></button>
          <button className={styles.btnStartLearning} id="nav-get-started">GET STARTED</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [count, setCount] = useState(0);
  const target = 1247834;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroMascot}>
          <div className={styles.mascotWrapper}>
            <img src="/mascot.png" alt="Vinci mascot" className={styles.mascotImg} />
          </div>
        </div>

        <div className={styles.heroContent}>
          <p className={styles.heroSubBadge}>
            Join over <strong>{count.toLocaleString()}</strong> AI learners
          </p>
          <h1 className={styles.heroTitle}>
            The free, fun, and effective way<br />to learn <span className={styles.heroAccent}>AI &amp; coding!</span>
          </h1>
          <p className={styles.heroDesc}>
            Start with Python basics and grow into a full AI engineer — build real apps, train ML models, and master prompting through hands-on interactive courses.
          </p>

          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} id="hero-get-started">GET STARTED — IT&apos;S FREE</button>
            <button className={styles.btnSecondary} id="hero-login">I ALREADY HAVE AN ACCOUNT</button>
          </div>

          <div className={styles.heroRatings}>
            <div className={styles.ratingBadge}>
              <IconStar /><span><strong>4.9</strong> App Store <span className={styles.ratingCount}>(1K+)</span></span>
            </div>
            <div className={styles.ratingBadge}>
              <IconStar /><span><strong>4.8</strong> Google Play <span className={styles.ratingCount}>(5K+)</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStrip() {
  return (
    <div className={styles.techStrip}>
      <div className={styles.techStripTrack}>
        {[...techStrip, ...techStrip, ...techStrip].map((t, i) => (
          <div key={i} className={styles.techPill} style={{ background: t.bg, color: t.color }}>
            <span className={styles.techPillLogo}>{t.logo}</span>
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogBanner() {
  return (
    <section className={styles.catalogBanner}>
      <div className={styles.catalogBannerInner}>
        <div>
          <h2 className={styles.catalogBannerTitle}>Browse the full catalog</h2>
          <p className={styles.catalogBannerDesc}>Every Vinci course in one place — interactive lessons across Python, AI Engineering, Machine Learning, and more, runnable in your browser.</p>
        </div>
        <button className={styles.btnCatalog}>See all courses →</button>
      </div>
    </section>
  );
}

function LearnByDoingSection() {
  const [activeTab, setActiveTab] = useState('AI Chat');
  const tabs = ['Code', 'SQL', 'Web', 'AI Chat', 'Terminal'];

  const editorContent = {
    'Code': {
      lang: 'Python',
      lines: [
        { num: 1, tokens: [{ t: 'def ', c: 'kw' }, { t: 'greet', c: 'fn' }, { t: '(name):', c: 'txt' }] },
        { num: 2, tokens: [{ t: '    return ', c: 'kw' }, { t: 'f"Hello, {name}!"', c: 'str' }] },
        { num: 3, tokens: [] },
        { num: 4, tokens: [{ t: 'print', c: 'fn' }, { t: '(greet(', c: 'txt' }, { t: '"World"', c: 'str' }, { t: '))', c: 'txt' }] },
      ],
    },
    'AI Chat': {
      lang: 'AI',
      lines: [
        { num: 1, tokens: [{ t: 'import ', c: 'kw' }, { t: 'openai', c: 'module' }] },
        { num: 2, tokens: [] },
        { num: 3, tokens: [{ t: 'client ', c: 'txt' }, { t: '= ', c: 'op' }, { t: 'openai.OpenAI()', c: 'fn' }] },
        { num: 4, tokens: [{ t: 'response ', c: 'txt' }, { t: '= ', c: 'op' }, { t: 'client.chat.completions.create(', c: 'fn' }] },
        { num: 5, tokens: [{ t: '    model', c: 'txt' }, { t: '=', c: 'op' }, { t: '"gpt-4o"', c: 'str' }, { t: ',', c: 'txt' }] },
        { num: 6, tokens: [{ t: '    messages', c: 'txt' }, { t: '=[{"role":', c: 'op' }, { t: '"user"', c: 'str' }, { t: ', "content":', c: 'op' }, { t: '"Hello!"', c: 'str' }, { t: '}]', c: 'txt' }] },
        { num: 7, tokens: [{ t: ')', c: 'txt' }] },
      ],
    },
    'SQL': {
      lang: 'SQL',
      lines: [
        { num: 1, tokens: [{ t: 'SELECT ', c: 'kw' }, { t: 'name, score', c: 'txt' }] },
        { num: 2, tokens: [{ t: 'FROM ', c: 'kw' }, { t: 'students', c: 'txt' }] },
        { num: 3, tokens: [{ t: 'WHERE ', c: 'kw' }, { t: 'score ', c: 'txt' }, { t: '> ', c: 'op' }, { t: '80', c: 'num' }] },
        { num: 4, tokens: [{ t: 'ORDER BY ', c: 'kw' }, { t: 'score ', c: 'txt' }, { t: 'DESC', c: 'kw' }, { t: ';', c: 'txt' }] },
      ],
    },
    'Web': {
      lang: 'HTML',
      lines: [
        { num: 1, tokens: [{ t: '<', c: 'tag' }, { t: 'div', c: 'tagname' }, { t: ' class=', c: 'tag' }, { t: '"card"', c: 'str' }, { t: '>', c: 'tag' }] },
        { num: 2, tokens: [{ t: '  <', c: 'tag' }, { t: 'h1', c: 'tagname' }, { t: '>', c: 'tag' }, { t: 'Hello AI!', c: 'txt' }, { t: '</', c: 'tag' }, { t: 'h1', c: 'tagname' }, { t: '>', c: 'tag' }] },
        { num: 3, tokens: [{ t: '  <', c: 'tag' }, { t: 'p', c: 'tagname' }, { t: '>', c: 'tag' }, { t: 'Learn by doing', c: 'txt' }, { t: '</', c: 'tag' }, { t: 'p', c: 'tagname' }, { t: '>', c: 'tag' }] },
        { num: 4, tokens: [{ t: '</', c: 'tag' }, { t: 'div', c: 'tagname' }, { t: '>', c: 'tag' }] },
      ],
    },
    'Terminal': {
      lang: 'BASH',
      lines: [
        { num: 1, tokens: [{ t: '$ ', c: 'prompt' }, { t: 'python', c: 'cmd' }, { t: ' train.py', c: 'txt' }] },
        { num: 2, tokens: [{ t: 'Epoch 1/10: loss=0.834', c: 'output' }] },
        { num: 3, tokens: [{ t: 'Epoch 5/10: loss=0.421', c: 'output' }] },
        { num: 4, tokens: [{ t: 'Epoch 10/10: loss=0.187', c: 'output' }] },
        { num: 5, tokens: [{ t: '✓ Model saved!', c: 'success' }] },
      ],
    },
  };

  const colorMap = { kw: '#60a5fa', fn: '#f9a8d4', str: '#86efac', txt: '#e2e8f0', op: '#e2e8f0', module: '#c4b5fd', num: '#fbbf24', tag: '#94a3b8', tagname: '#60a5fa', prompt: '#86efac', cmd: '#f9a8d4', output: '#94a3b8', success: '#4ade80' };
  const content = editorContent[activeTab] || editorContent['Code'];

  return (
    <section className={styles.learnByDoing}>
      <div className={styles.learnByDoingInner}>
        <div className={styles.learnLeft}>
          <h2 className={styles.sectionTitle}>Learn by Doing</h2>
          <p className={styles.learnDesc}>
            Write real code, query databases, build websites, and master AI prompts. Our interactive lessons cover every skill modern AI engineers need.
          </p>
          <div className={styles.tabsRow}>
            {tabs.map(tab => (
              <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`} onClick={() => setActiveTab(tab)}>
                {tab === 'Code' && <IconCode />}
                {tab === 'SQL' && <IconDatabase />}
                {tab === 'Web' && <IconGlobe />}
                {tab === 'AI Chat' && <IconBrain />}
                {tab === 'Terminal' && <IconTerminal />}
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.learnRight}>
          <div className={styles.codeEditor}>
            <div className={styles.editorHeader}>
              <div className={styles.editorDots}>
                <span className={styles.dot} style={{ background: '#ff5f57' }} />
                <span className={styles.dot} style={{ background: '#ffbd2e' }} />
                <span className={styles.dot} style={{ background: '#28c840' }} />
              </div>
              <span className={styles.editorFilename}>
                {activeTab === 'AI Chat' ? 'ai_chat.py' : activeTab === 'SQL' ? 'query.sql' : activeTab === 'Web' ? 'index.html' : activeTab === 'Terminal' ? 'terminal' : 'main.py'}
              </span>
              <span className={styles.editorLang}>{content.lang}</span>
            </div>
            <div className={styles.editorBody}>
              {content.lines.map((line) => (
                <div key={line.num} className={styles.codeLine}>
                  <span className={styles.lineNum}>{line.num}</span>
                  <span className={styles.lineCode}>
                    {line.tokens.map((tok, i) => (
                      <span key={i} style={{ color: colorMap[tok.c] || '#e2e8f0' }}>{tok.t}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.editorResults}>
              <div className={styles.resultsHeader}>
                <button className={styles.resultsTab}>RESULTS ✓</button>
                <button className={styles.resultsTab}>CONSOLE</button>
              </div>
              <div className={styles.resultsBody}>
                <div className={styles.resultsRow}>
                  <span className={styles.resultsLabel}>Output</span>
                  <span className={styles.resultsValue} style={{ color: '#22c55e' }}>✓ Correct!</span>
                </div>
                <div className={styles.resultsRow}>
                  <span className={styles.resultsLabel}>Tests</span>
                  <span className={styles.resultsValue}>3/3 passed</span>
                </div>
                <div className={styles.resultsRow}>
                  <span className={styles.resultsLabel}>XP Earned</span>
                  <span className={styles.resultsValue} style={{ color: '#f59e0b' }}>+25 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  const levelColors = { Beginner: '#dcfce7', Intermediate: '#dbeafe', Advanced: '#fce7f3' };
  const levelText = { Beginner: '#16a34a', Intermediate: '#2563eb', Advanced: '#9333ea' };

  return (
    <section className={styles.courses} id="courses">
      <div className={styles.coursesInner}>
        <p className={styles.sectionEyebrow}>Start learning today</p>
        <h2 className={styles.sectionTitleCenter}>Choose your learning track</h2>
        <p className={styles.sectionDescCenter}>From Python basics to advanced AI Engineering and Machine Learning — everything you need to build AI-powered applications.</p>

        <div className={styles.coursesGrid}>
          {courses.map(course => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseCardHeader}>
                <div className={styles.courseLogoWrap}>{course.logo}</div>
                <span className={styles.courseBadge} style={{ background: levelColors[course.level], color: levelText[course.level] }}>
                  {course.level}
                </span>
              </div>
              <h3 className={styles.courseName}>{course.name}</h3>
              <p className={styles.courseExercises}>{course.exercises} Exercises</p>
              <p className={styles.courseDesc}>{course.desc}</p>
              <Link href={course.href} className={styles.btnStartCourse} style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Start Course →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StreakSection() {
  const [currentMonth] = useState({ name: 'January 2026', days: 31, streak: 12 });
  const completedDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const today = 12;

  return (
    <section className={styles.streakSection}>
      <div className={styles.streakInner}>
        <div className={styles.streakLeft}>
          <div className={styles.streakCard}>
            <div className={styles.streakCardHeader}>
              <div>
                <h3 className={styles.streakDays}>{currentMonth.streak} days streak</h3>
                <p className={styles.streakSubtitle}>Return tomorrow to keep your streak!</p>
              </div>
              <IconFlame />
            </div>
            <div className={styles.calendarNav}>
              <button className={styles.calNavBtn}><IconChevronLeft /></button>
              <span className={styles.calMonthName}>{currentMonth.name}</span>
              <button className={styles.calNavBtn}><IconChevronRight /></button>
            </div>
            <div className={styles.calGrid}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className={styles.calDayHeader}>{d}</div>
              ))}
              {[0, 1, 2, 3].map(i => <div key={`e${i}`} />)}
              {Array.from({ length: currentMonth.days }, (_, i) => i + 1).map(day => (
                <div key={day} className={`${styles.calDay} ${completedDays.includes(day) ? styles.calDayDone : ''} ${day === today ? styles.calDayToday : ''} ${day > today ? styles.calDayFuture : ''}`}>
                  {day}
                </div>
              ))}
            </div>
            <div className={styles.streakBadges}>
              <div className={styles.streakBadge}>
                <span className={styles.streakBadgeIcon}>Target</span>
                <div><strong>Double or Nothing</strong><small>Day 5 of 7</small></div>
              </div>
              <div className={styles.streakBadge}>
                <span className={styles.streakBadgeIcon}>Flame</span>
                <div><strong>Streak Freeze</strong><span className={styles.streakFreezeBadge}>2 left</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.streakRight}>
          <h2 className={styles.sectionTitle}>Build Your Learning Streak</h2>
          <p className={styles.learnDesc}>Stay consistent and watch your AI skills grow! Track your daily learning habit, protect your streak with freeze days, and earn rewards for showing up every day.</p>
          <div className={styles.streakFeatures}>
            <div className={styles.streakFeature}><IconCheck /> <span>Daily XP goals to keep you motivated</span></div>
            <div className={styles.streakFeature}><IconCheck /> <span>Streak freeze to protect your progress</span></div>
            <div className={styles.streakFeature}><IconCheck /> <span>Weekly challenges with bonus rewards</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresInner}>
        <p className={styles.sectionEyebrow}>Why Vinci?</p>
        <h2 className={styles.sectionTitleCenter}>Everything you need to succeed</h2>
        <p className={styles.sectionDescCenter}>We built the learning experience we wished we had when learning AI and coding.</p>

        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIconWrap} style={{ background: f.color }}>
                <span style={{ color: f.iconColor }}>{f.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileSection() {
  return (
    <section className={styles.mobileSection}>
      <div className={styles.mobileSectionInner}>
        <div className={styles.mobileLeft}>
          <h2 className={styles.sectionTitle}>Code Anywhere, Anytime</h2>
          <p className={styles.learnDesc}>
            Take your AI learning on the go. Our mobile app gives you full access to all courses, exercises, and your streak — perfectly optimized for learning on your phone.
          </p>
          <div className={styles.streakFeatures}>
            <div className={styles.streakFeature}><IconCheck /> <span>Full course access on mobile</span></div>
            <div className={styles.streakFeature}><IconCheck /> <span>Offline mode for lessons</span></div>
            <div className={styles.streakFeature}><IconCheck /> <span>Push notifications for your streak</span></div>
          </div>
          <div className={styles.appStoreRow}>
            <button className={styles.appStoreBtn}>
              <span className={styles.appStoreBtnIcon}>iOS</span>
              <div><small>Download on the</small><strong>App Store</strong></div>
            </button>
            <button className={styles.appStoreBtn}>
              <span className={styles.appStoreBtnIcon}>▶</span>
              <div><small>Get it on</small><strong>Google Play</strong></div>
            </button>
          </div>
        </div>
        <div className={styles.mobileRight}>
          <div className={styles.phoneMockup}>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneTopBar}>
                <span className={styles.phoneIcon}><PythonLogo size={18} /></span>
                <div className={styles.phoneStats}>
                  <span><IconFlame /> 7</span>
                  <span style={{ color: '#f59e0b' }}><IconZap /> 250</span>
                  <span style={{ color: '#60a5fa' }}><IconGem /> 5</span>
                </div>
              </div>
              <div className={styles.phoneProgress}>
                <div className={styles.phoneProgressLabel}>Variables</div>
                <div className={styles.phoneProgressBar}><div className={styles.phoneProgressFill} /></div>
              </div>
              <div className={styles.phoneQuestion}>
                <p>Which is the correct way to declare a variable in Python?</p>
                <div className={styles.phoneOptions}>
                  <div className={styles.phoneOption}>var x = 5</div>
                  <div className={`${styles.phoneOption} ${styles.phoneOptionCorrect}`}>x = 5 ✓</div>
                  <div className={styles.phoneOption}>int x = 5</div>
                </div>
                <button className={styles.phoneContinue}>CONTINUE</button>
              </div>
            </div>
            <div className={styles.phoneRating}>
              <div className={styles.ratingNum}>4.9</div>
              <div className={styles.ratingStars}>{'★★★★★'}</div>
              <div className={styles.ratingLabel}>RATING</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsInner}>
        <p className={styles.sectionEyebrow}>Loved by learners</p>
        <h2 className={styles.sectionTitleCenter}>What our students say</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                {Array.from({ length: t.rating }).map((_, s) => <IconStar key={s} />)}
              </div>
              <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.name[0]}</div>
                <div>
                  <strong className={styles.testimonialName}>{t.name}</strong>
                  <span className={styles.testimonialRole}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqInner}>
        <p className={styles.sectionEyebrow}>Got Questions?</p>
        <h2 className={styles.sectionTitleCenter}>Frequently Asked Questions</h2>
        <p className={styles.sectionDescCenter}>Everything you need to know about Vinci and learning AI &amp; coding.</p>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${openIndex === i ? styles.faqItemOpen : ''}`}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                id={`faq-btn-${i}`}
              >
                <span>{faq.q}</span>
                <span className={styles.faqIcon}>
                  {openIndex === i ? <IconChevronUp /> : <IconChevronDown />}
                </span>
              </button>
              {openIndex === i && (
                <div className={styles.faqAnswer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <h2 className={styles.ctaTitle}>Ready to start your AI journey?</h2>
        <p className={styles.ctaDesc}>Join thousands of students learning Python, AI Engineering, and Machine Learning on Vinci.</p>
        <button className={styles.ctaBtn} id="cta-start">
          Start Learning — It&apos;s Free
        </button>
        <p className={styles.ctaNote}>No credit card required. Free access to core courses.</p>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    Product: ['Courses', 'Catalog', 'Pricing', 'For Teams'],
    Resources: ['Blog', 'FAQ', 'Support', 'Discord'],
    Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.logo}>
              <img src="/mascot.png" alt="Vinci" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
              <span className={styles.logoText} style={{ color: '#ffffff' }}>Vinci</span>
            </a>
            <p className={styles.footerBrandDesc}>The most effective way to learn AI &amp; coding through hands-on interactive courses.</p>
            <div className={styles.socialRow}>
              {['X', 'in', 'YT', 'GH'].map((s, i) => (
                <a key={i} href="#" className={styles.socialBtn}>{s}</a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col} className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>{col}</h4>
              {links.map(link => (
                <a key={link} href="#" className={styles.footerLink}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Vinci. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TechStrip />
      <CatalogBanner />
      <LearnByDoingSection />
      <CoursesSection />
      <StreakSection />
      <FeaturesSection />
      <MobileSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
