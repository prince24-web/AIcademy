'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function BaymaxMascot({
  action = 'idle',
  size = 300,
  followCursor = true,
  bubbleText,
  enableVoice = true,
  onActionComplete,
  className = '',
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentAction, setCurrentAction] = useState(action);
  const [speech, setSpeech] = useState(bubbleText || 'Hello. I am Baymax.');

  useEffect(() => {
    setCurrentAction(action);
    if (bubbleText !== undefined) setSpeech(bubbleText);
  }, [action, bubbleText]);

  // Cursor tracking
  useEffect(() => {
    if (!followCursor) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 3;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      setMousePos({
        x: Math.max(-1, Math.min(1, deltaX)),
        y: Math.max(-1, Math.min(1, deltaY)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followCursor]);

  // Voice synthesis
  const speakText = (text) => {
    if (!enableVoice || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Male')));
    if (preferredVoice) utterance.voice = preferredVoice;
    window.speechSynthesis.speak(utterance);
  };

  const triggerAction = (newAction, text) => {
    setCurrentAction(newAction);
    if (text) {
      setSpeech(text);
      speakText(text);
    }
    setTimeout(() => {
      if (onActionComplete) onActionComplete();
    }, 4000);
  };

  // Pupil offsets
  const maxEyeOffset = 2.4;
  const eyeX = mousePos.x * maxEyeOffset;
  const eyeY = mousePos.y * maxEyeOffset;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ width: size, minHeight: size * 1.2 }}
    >
      <style jsx>{`
        @keyframes subtleBreathe {
          0%, 100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.015, 0.985) translateY(-5px); }
        }
        @keyframes naturalBlink {
          0%, 94%, 98%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.08); }
        }
        @keyframes wavingHighArm {
          0% { transform: translate(-10px, -28px) rotate(-92deg); }
          20% { transform: translate(-18px, -36px) rotate(-118deg); }
          40% { transform: translate(-6px, -24px) rotate(-78deg); }
          60% { transform: translate(-18px, -36px) rotate(-118deg); }
          80% { transform: translate(-6px, -24px) rotate(-78deg); }
          100% { transform: translate(-10px, -28px) rotate(-92deg); }
        }
        @keyframes wavingSideArm {
          0%, 100% { transform: translate(-4px, -12px) rotate(-45deg); }
          25% { transform: translate(-12px, -22px) rotate(-72deg); }
          50% { transform: translate(0px, -8px) rotate(-32deg); }
          75% { transform: translate(-12px, -22px) rotate(-72deg); }
        }
        @keyframes bodySideSway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        @keyframes headNodding {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(12px) rotate(3deg); }
          60% { transform: translateY(-4px) rotate(-2deg); }
          80% { transform: translateY(8px) rotate(1deg); }
        }

        .animate-breathe {
          animation: subtleBreathe 4s ease-in-out infinite;
          transform-origin: 180px 280px;
        }
        .animate-blink {
          animation: naturalBlink 4.5s ease-in-out infinite;
          transform-origin: 180px 88px;
        }

        .action-wave .right-arm-group {
          animation: wavingHighArm 2.8s ease-in-out infinite;
          transform-origin: 75px 170px;
        }
        .action-sideWave .right-arm-group {
          animation: wavingSideArm 2.6s ease-in-out infinite;
          transform-origin: 75px 170px;
        }
        .action-sideWave .body-main {
          animation: bodySideSway 2.6s ease-in-out infinite;
          transform-origin: 180px 350px;
        }
        .action-nod .head-group {
          animation: headNodding 1.4s ease-in-out 2;
          transform-origin: 180px 105px;
        }
        .action-tilt .head-group {
          transform: translate(-6px, -2px) rotate(-22deg) !important;
          transform-origin: 180px 105px;
        }
      `}</style>

      {/* Speech Bubble */}
      {speech && (
        <div className="mb-3 bg-white text-slate-800 font-bold px-4 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs flex items-center gap-2 max-w-[260px] text-center relative z-20 transition-all duration-300">
          <span>{speech}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white" />
        </div>
      )}

      {/* Mascot SVG */}
      <div
        className={`relative cursor-pointer action-${currentAction}`}
        onClick={() => triggerAction('tilt', 'Are you satisfied with your care?')}
      >
        <svg
          viewBox="0 0 360 440"
          width={size}
          height={size * 1.22}
          className="overflow-visible filter drop-shadow-2xl"
        >
          <defs>
            <radialGradient id="nextBaymaxBody" cx="36%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F8FAFC" />
              <stop offset="80%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </radialGradient>

            <radialGradient id="nextBaymaxHead" cx="42%" cy="28%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F8FAFC" />
              <stop offset="85%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </radialGradient>

            <linearGradient id="nextArmLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <linearGradient id="nextArmRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <radialGradient id="nextShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0, 0, 0, 0.35)" />
              <stop offset="50%" stopColor="rgba(0, 0, 0, 0.1)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
          </defs>

          {/* Floor Shadow */}
          <ellipse cx="180" cy="420" rx="100" ry="14" fill="url(#nextShadow)" />

          {/* Body Group */}
          <g className="animate-breathe body-main">
            {/* Legs */}
            <path
              d="M 125 320 C 118 365 124 410 146 412 C 162 412 172 380 176 335 Z"
              fill="url(#nextArmLeft)"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            <path
              d="M 235 320 C 242 365 236 410 214 412 C 198 412 188 380 184 335 Z"
              fill="url(#nextArmRight)"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            <path d="M 180 338 L 180 385" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

            {/* Torso */}
            <path
              d="M 180 94
                 C 125 94 105 148 94 210
                 C 82 272 100 350 180 350
                 C 260 350 278 272 266 210
                 C 255 148 235 94 180 94 Z"
              fill="url(#nextBaymaxBody)"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* Highlight */}
            <ellipse cx="168" cy="225" rx="55" ry="75" fill="#FFFFFF" opacity="0.45" />

            {/* Healthcare Badge */}
            <g transform="translate(210, 142)">
              <circle cx="0" cy="0" r="11" fill="none" stroke="#CBD5E1" strokeWidth="2" />
              <circle cx="0" cy="0" r="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" opacity="0.8" />
              <path d="M -3.5 0 L 3.5 0" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 0 -3.5 L 0 3.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Static Arm */}
            <g>
              <path
                d="M 252 145 C 305 180 330 250 315 305 C 305 328 285 330 275 315 C 265 295 260 250 240 215 Z"
                fill="url(#nextArmRight)"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              <circle cx="288" cy="318" r="4.5" fill="#CBD5E1" />
              <circle cx="298" cy="310" r="4" fill="#CBD5E1" />
            </g>

            {/* Animatable Waving Arm */}
            <g className="right-arm-group" style={{ transition: 'transform 0.45s ease' }}>
              <path
                d="M 108 145 C 55 180 30 250 45 305 C 55 328 75 330 85 315 C 95 295 100 250 120 215 Z"
                fill="url(#nextArmLeft)"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              <circle cx="72" cy="318" r="4.5" fill="#CBD5E1" />
              <circle cx="62" cy="310" r="4" fill="#CBD5E1" />
              <circle cx="53" cy="298" r="3.5" fill="#CBD5E1" />
            </g>

            {/* Head */}
            <g
              className="head-group"
              style={{
                transform: currentAction === 'tilt' || currentAction === 'nod'
                  ? undefined
                  : `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px) rotate(${mousePos.x * 2.5}deg)`,
                transition: 'transform 0.3s ease',
              }}
            >
              <ellipse
                cx="180"
                cy="88"
                rx="47"
                ry="33"
                fill="url(#nextBaymaxHead)"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              <ellipse cx="174" cy="76" rx="28" ry="14" fill="#FFFFFF" opacity="0.8" />

              {/* Eyes */}
              <g className="animate-blink">
                <line x1="158" y1="88" x2="202" y2="88" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx={158 + eyeX} cy={88 + eyeY} r="5.5" fill="#0F172A" />
                <circle cx={156.5 + eyeX} cy={86.5 + eyeY} r="1.5" fill="#FFFFFF" opacity="0.95" />
                <circle cx={202 + eyeX} cy={88 + eyeY} r="5.5" fill="#0F172A" />
                <circle cx={200.5 + eyeX} cy={86.5 + eyeY} r="1.5" fill="#FFFFFF" opacity="0.95" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-xs">
        <button
          onClick={() => triggerAction('wave', 'Hello! I am Baymax.')}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-900 text-white hover:bg-slate-800 transition active:scale-95 shadow-sm"
        >
          ?? Wave
        </button>
        <button
          onClick={() => triggerAction('sideWave', 'Greetings from San Fransokyo!')}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition active:scale-95 shadow-sm"
        >
          ????? Side Wave
        </button>
        <button
          onClick={() => triggerAction('nod', 'I understand. Your health is my priority.')}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition active:scale-95 shadow-sm"
        >
          ?? Nod
        </button>
        <button
          onClick={() => triggerAction('tilt', 'Are you satisfied with your care?')}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-rose-600 text-white hover:bg-rose-700 transition active:scale-95 shadow-sm"
        >
          ? Care Tilt
        </button>
      </div>
    </div>
  );
}
