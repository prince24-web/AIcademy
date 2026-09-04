'use client';

import React, { useState } from 'react';
import BaymaxMascot from '../components/BaymaxMascot';

export default function MascotPage() {
  const [action, setAction] = useState('idle');
  const [bubble, setBubble] = useState('Hello! I am Baymax, your personal web app companion.');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900/90 rounded-3xl p-8 shadow-2xl border border-slate-800 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold mb-1">Baymax Web Mascot</h1>
        <p className="text-xs text-slate-400 mb-6">Interactive Next.js Component Demo</p>

        <BaymaxMascot
          action={action}
          bubbleText={bubble}
          size={320}
          followCursor={true}
          onActionComplete={() => setAction('idle')}
        />
      </div>
    </div>
  );
}
