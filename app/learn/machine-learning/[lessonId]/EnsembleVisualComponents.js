'use client';

import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// 1. CONDORCET BALLOT VISUAL (ml-7-1)
// Replaces the complex binomial sum with an intuitive 8-branch probability tree
// and an interactive committee consensus tracker.
// ─────────────────────────────────────────────────────────────────────────────
export function CondorcetBallotVisual() {
  const [committeeSize, setCommitteeSize] = useState(3);
  const voterAccuracy = 0.70;

  // Exact binomial majority calculations
  const calculateMajorityProb = (n, p) => {
    const kMin = Math.floor(n / 2) + 1;
    let totalProb = 0;
    const factorial = (num) => (num <= 1 ? 1 : num * factorial(num - 1));
    const comb = (nVal, kVal) => factorial(nVal) / (factorial(kVal) * factorial(nVal - kVal));
    for (let k = kMin; k <= n; k++) {
      totalProb += comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }
    return totalProb;
  };

  const majorityProb = committeeSize === 1 ? 0.70 : calculateMajorityProb(committeeSize, voterAccuracy);

  const branches = [
    { voters: ['Correct', 'Correct', 'Correct'], isMaj: true, prob: '34.3%', math: '0.70 × 0.70 × 0.70' },
    { voters: ['Correct', 'Correct', 'Wrong'], isMaj: true, prob: '14.7%', math: '0.70 × 0.70 × 0.30' },
    { voters: ['Correct', 'Wrong', 'Correct'], isMaj: true, prob: '14.7%', math: '0.70 × 0.30 × 0.70' },
    { voters: ['Wrong', 'Correct', 'Correct'], isMaj: true, prob: '14.7%', math: '0.30 × 0.70 × 0.70' },
    { voters: ['Correct', 'Wrong', 'Wrong'], isMaj: false, prob: '6.3%', math: '0.70 × 0.30 × 0.30' },
    { voters: ['Wrong', 'Correct', 'Wrong'], isMaj: false, prob: '6.3%', math: '0.30 × 0.70 × 0.30' },
    { voters: ['Wrong', 'Wrong', 'Correct'], isMaj: false, prob: '6.3%', math: '0.30 × 0.30 × 0.70' },
    { voters: ['Wrong', 'Wrong', 'Wrong'], isMaj: false, prob: '2.7%', math: '0.30 × 0.30 × 0.30' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 8px 24px rgba(0,31,84,0.06)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Visual Mental Model
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            How 3 Imperfect Voters (70% Accuracy) Create a 78.4% Consensus Champion
          </h4>
        </div>
        <div style={{ background: '#ecfdf5', border: '1px solid #10b981', padding: '0.4rem 0.8rem', borderRadius: '8px', textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', display: 'block' }}>Majority Accuracy Lift</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#065f46' }}>+8.40% Boost</span>
        </div>
      </div>

      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
        Instead of getting tangled in binomial summation notation, look at the 8 possible outcomes when 3 independent models vote. The 4 green cards show every scenario where at least 2 models agree on the truth. Adding their simple chances together gives <strong style={{ color: '#001f54' }}>78.4% total accuracy</strong>!
      </p>

      {/* 8-BRANCH OUTCOME GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        {branches.map((b, idx) => (
          <div key={idx} style={{
            background: b.isMaj ? '#f0fdf4' : '#f8fafc',
            border: b.isMaj ? '1.5px solid #86efac' : '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: b.isMaj ? '#15803d' : '#64748b' }}>
                {b.isMaj ? 'Winning Majority (2+ Correct)' : 'Minority Failure'}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: b.isMaj ? '#166534' : '#94a3b8' }}>
                {b.prob}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.3rem', margin: '0.2rem 0' }}>
              {b.voters.map((v, vIdx) => (
                <span key={vIdx} style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  fontWeight: 700,
                  background: v === 'Correct' ? '#dcfce7' : '#fee2e2',
                  color: v === 'Correct' ? '#166534' : '#991b1b',
                  flex: 1,
                  textAlign: 'center'
                }}>
                  M{vIdx + 1}: {v === 'Correct' ? 'Hit' : 'Miss'}
                </span>
              ))}
            </div>
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
              {b.math}
            </span>
          </div>
        ))}
      </div>

      {/* INTERACTIVE JURY SCALER */}
      <div style={{
        background: '#f1f5f9',
        borderRadius: '12px',
        padding: '1rem 1.2rem',
        border: '1px solid #cbd5e1'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#001f54' }}>
            Scale Committee Size: <span style={{ color: '#0284c7' }}>{committeeSize} Models</span>
          </label>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f766e' }}>
            Consensus Accuracy: {(majorityProb * 100).toFixed(2)}%
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[1, 3, 5, 11, 25, 51].map((size) => (
            <button
              key={size}
              onClick={() => setCommitteeSize(size)}
              style={{
                flex: '1 1 60px',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: committeeSize === size ? '2px solid #001f54' : '1px solid #cbd5e1',
                background: committeeSize === size ? '#001f54' : '#ffffff',
                color: committeeSize === size ? '#ffffff' : '#334155',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {size} {size === 1 ? 'Model' : 'Models'}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '0.75rem', background: '#ffffff', borderRadius: '8px', padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>
          <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              width: `${majorityProb * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0284c7 0%, #10b981 100%)',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            <span>Single Model Base: 70.0%</span>
            <span>Current Consensus: {(majorityProb * 100).toFixed(2)}%</span>
            <span>Limit as N &rarr; &infin;: 100.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. BIAS-VARIANCE ERROR CARDS (ml-7-1)
// Visual 3-compartment target cards replacing the expectation equation
// ─────────────────────────────────────────────────────────────────────────────
export function BiasVarianceErrorCards() {
  const [activeStrategy, setActiveStrategy] = useState('none');

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Visual Error Decomposition
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            The 3 Pieces of Machine Learning Error
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setActiveStrategy(activeStrategy === 'bagging' ? 'none' : 'bagging')}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              border: activeStrategy === 'bagging' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
              background: activeStrategy === 'bagging' ? '#7c3aed' : '#f8fafc',
              color: activeStrategy === 'bagging' ? '#ffffff' : '#334155',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Apply Bagging (Crush Variance)
          </button>
          <button
            onClick={() => setActiveStrategy(activeStrategy === 'boosting' ? 'none' : 'boosting')}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              border: activeStrategy === 'boosting' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              background: activeStrategy === 'boosting' ? '#0284c7' : '#f8fafc',
              color: activeStrategy === 'boosting' ? '#ffffff' : '#334155',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Apply Boosting (Crush Bias)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        {/* CARD 1: BIAS */}
        <div style={{
          background: activeStrategy === 'boosting' ? '#ecfdf5' : '#f8fafc',
          border: activeStrategy === 'boosting' ? '2px solid #10b981' : '1.5px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1rem',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0369a1' }}>Piece 1: Bias (Underfitting)</span>
            {activeStrategy === 'boosting' && (
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#047857', background: '#dcfce7', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                Eliminated by Boosting!
              </span>
            )}
          </div>
          <div style={{ height: '80px', margin: '0.75rem 0', background: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Target Circle */}
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f1f5f9', border: '1px solid #cbd5e1' }} />
            </div>
            {/* Shot Cluster */}
            <div style={{
              position: 'absolute',
              top: activeStrategy === 'boosting' ? '28px' : '15px',
              left: activeStrategy === 'boosting' ? '45%' : '70%',
              display: 'flex',
              gap: '3px',
              transition: 'all 0.4s ease'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7' }} />
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
            {activeStrategy === 'boosting'
              ? 'Boosting builds corrective trees that iteratively pull this off-center cluster straight into the true bullseye!'
              : 'Rigid, oversimplified models consistently miss the true center target in a systematic off-center direction.'}
          </p>
        </div>

        {/* CARD 2: VARIANCE */}
        <div style={{
          background: activeStrategy === 'bagging' ? '#f5f3ff' : '#f8fafc',
          border: activeStrategy === 'bagging' ? '2px solid #7c3aed' : '1.5px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1rem',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7c3aed' }}>Piece 2: Variance (Overfitting)</span>
            {activeStrategy === 'bagging' && (
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6d28d9', background: '#ede9fe', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                Crushed by Bagging!
              </span>
            )}
          </div>
          <div style={{ height: '80px', margin: '0.75rem 0', background: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f1f5f9', border: '1px solid #cbd5e1' }} />
            </div>
            {/* Scattered dots */}
            <div style={{
              position: 'absolute',
              width: activeStrategy === 'bagging' ? '16px' : '65px',
              height: activeStrategy === 'bagging' ? '16px' : '65px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignItems: 'center',
              transition: 'all 0.4s ease'
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7c3aed' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7c3aed' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7c3aed' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7c3aed' }} />
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
            {activeStrategy === 'bagging'
              ? 'Bagging averages 100 unstable trees, causing the scattered wild dots to cancel each other out into a tight cluster!'
              : 'Complex, unconstrained models overreact to random noise, scattering their predictions wildly across test points.'}
          </p>
        </div>

        {/* CARD 3: NOISE */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>Piece 3: Irreducible Noise</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', background: '#e2e8f0', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
              Permanent Static
            </span>
          </div>
          <div style={{ height: '80px', margin: '0.75rem 0', background: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textAlign: 'center', padding: '0 0.5rem' }}>
              Sensor Errors, Missing Data & Natural Randomness
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
            Inherent noise in the physical world that no algorithm (or ensemble) can ever mathematically eliminate.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. VOTING COMPARISON VISUAL (ml-7-2)
// Ballot boxes vs Fluid Cylinder beakers
// ─────────────────────────────────────────────────────────────────────────────
export function VotingComparisonVisual() {
  const [model1Prob, setModel1Prob] = useState(0.95);
  const p1 = model1Prob;
  const p2 = 0.48;
  const p3 = 0.49;

  const softProbClass1 = (p1 + p2 + p3) / 3;
  const hardVote1 = p1 >= 0.5 ? 1 : 0;
  const hardVote2 = p2 >= 0.5 ? 1 : 0;
  const hardVote3 = p3 >= 0.5 ? 1 : 0;
  const hardVoteTotal = hardVote1 + hardVote2 + hardVote3;
  const hardPrediction = hardVoteTotal >= 2 ? 1 : 0;
  const softPrediction = softProbClass1 >= 0.5 ? 1 : 0;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 8px 24px rgba(0,31,84,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Visual Clash
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            Discrete Ballot Tokens vs Continuous Fluid Confidence
          </h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
            Specialist M1 Confidence: <strong style={{ color: '#001f54' }}>{(p1 * 100).toFixed(0)}%</strong>
          </label>
          <input
            type="range"
            min="0.50"
            max="0.99"
            step="0.01"
            value={model1Prob}
            onChange={(e) => setModel1Prob(parseFloat(e.target.value))}
            style={{ width: '110px', accentColor: '#001f54' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        {/* HARD VOTING BOX */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #fca5a5',
          borderRadius: '12px',
          padding: '1.2rem',
          boxShadow: '0 4px 12px rgba(239,68,68,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#991b1b' }}>Mechanism A: Hard Voting (Chips)</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#fee2e2', color: '#991b1b', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Treats 51% = 99%
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1rem 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: hardVote1 === 1 ? '#001f54' : '#94a3b8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, margin: '0 auto 0.3rem auto' }}>
                {hardVote1}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>M1: {(p1 * 100).toFixed(0)}%</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: hardVote2 === 1 ? '#001f54' : '#94a3b8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, margin: '0 auto 0.3rem auto' }}>
                {hardVote2}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>M2: 48%</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: hardVote3 === 1 ? '#001f54' : '#94a3b8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, margin: '0 auto 0.3rem auto' }}>
                {hardVote3}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>M3: 49%</span>
            </div>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#7f1d1d', display: 'block', fontWeight: 700 }}>Hard Outcome (Majority Mode)</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#991b1b' }}>
              Class {hardPrediction} (Votes: {hardVoteTotal} vs {3 - hardVoteTotal})
            </span>
            <span style={{ fontSize: '0.75rem', color: '#b91c1c', display: 'block', marginTop: '0.2rem' }}>
              Dangerous Miss! Two uncertain 48%/49% coin-flips outvoted a 95% certainty.
            </span>
          </div>
        </div>

        {/* SOFT VOTING BEAKER */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #86efac',
          borderRadius: '12px',
          padding: '1.2rem',
          boxShadow: '0 4px 12px rgba(16,185,129,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534' }}>Mechanism B: Soft Voting (Fluid Beakers)</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Confidence Aware
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '65px', margin: '0.75rem 0' }}>
            <div style={{ width: '32px', height: '100%', background: '#e2e8f0', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${p1 * 100}%`, background: '#0284c7' }} />
            </div>
            <div style={{ width: '32px', height: '100%', background: '#e2e8f0', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '48%', background: '#64748b' }} />
            </div>
            <div style={{ width: '32px', height: '100%', background: '#e2e8f0', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '49%', background: '#64748b' }} />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#001f54', paddingBottom: '10px' }}>&rarr;</div>
            <div style={{ width: '42px', height: '100%', background: '#e2e8f0', borderRadius: '6px', border: '2px solid #10b981', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${softProbClass1 * 100}%`, background: '#10b981' }} />
            </div>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#14532d', display: 'block', fontWeight: 700 }}>Soft Outcome (Average Probability)</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#15803d' }}>
              Class {softPrediction} (Consensus: {(softProbClass1 * 100).toFixed(1)}%)
            </span>
            <span style={{ fontSize: '0.75rem', color: '#16a34a', display: 'block', marginTop: '0.2rem' }}>
              Correct Diagnosis! Soft voting captured the specialist&apos;s strong conviction.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. REGRESSION AVERAGING BALANCE BEAM (ml-7-2)
// Visual real estate price tag balance scale showing Mean vs Median vs Weighted
// ─────────────────────────────────────────────────────────────────────────────
export function RegressionAveragingVisual() {
  const models = [
    { name: 'Ridge Regressor', price: 300000, weight: 0.35, isOutlier: false },
    { name: 'Support Vector Regressor', price: 310000, weight: 0.35, isOutlier: false },
    { name: 'Decision Tree (Overfitted)', price: 450000, weight: 0.10, isOutlier: true },
    { name: 'K-Nearest Neighbors', price: 305000, weight: 0.20, isOutlier: false }
  ];

  const simpleMean = (300000 + 310000 + 450000 + 305000) / 4; // 341,250
  const median = (305000 + 310000) / 2; // 307,500
  const weightedMean = (300000 * 0.35) + (310000 * 0.35) + (450000 * 0.10) + (305000 * 0.20); // 306,400

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
          Visual Mental Model
        </span>
        <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
          Real Estate Price Estimator: Mean vs Median vs Weighted Averaging
        </h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem', marginBottom: '1.2rem' }}>
        {models.map((m, idx) => (
          <div key={idx} style={{
            background: m.isOutlier ? '#fef2f2' : '#f8fafc',
            border: m.isOutlier ? '1.5px solid #f87171' : '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '0.75rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: m.isOutlier ? '#991b1b' : '#334155', display: 'block' }}>
              {m.name}
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 900, color: m.isOutlier ? '#dc2626' : '#001f54', display: 'block', margin: '0.2rem 0' }}>
              ${m.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
              Trust Weight: {(m.weight * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9f1239', display: 'block' }}>1. Simple Mean (Vulnerable)</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#be123c', display: 'block' }}>${simpleMean.toLocaleString()}</span>
          <span style={{ fontSize: '0.72rem', color: '#881337' }}>Poisoned by the single $450k decision tree outlier error.</span>
        </div>

        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#065f46', display: 'block' }}>2. Median (Outlier Proof)</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#047857', display: 'block' }}>${median.toLocaleString()}</span>
          <span style={{ fontSize: '0.72rem', color: '#064e3b' }}>Completely ignores the rogue outlier, anchoring on the two middle models.</span>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', display: 'block' }}>3. Weighted Mean (Optimal)</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1d4ed8', display: 'block' }}>${weightedMean.toLocaleString()}</span>
          <span style={{ fontSize: '0.72rem', color: '#1e3a8a' }}>Allocates influence by inverse error (1/MSE), maximizing accuracy.</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. BOOTSTRAP URN & 63.2% SORTER (ml-7-3)
// Visual 10-marble lottery wheel explaining Out-of-Bag (OOB) without calculus
// ─────────────────────────────────────────────────────────────────────────────
export function BootstrapUrnVisual() {
  const [sampleCounts, setSampleCounts] = useState([1, 2, 0, 1, 3, 0, 1, 0, 2, 0]);
  const [drawsCount, setDrawsCount] = useState(1);

  const rollNewBootstrap = () => {
    const counts = new Array(10).fill(0);
    for (let i = 0; i < 10; i++) {
      const drawnIndex = Math.floor(Math.random() * 10);
      counts[drawnIndex]++;
    }
    setSampleCounts(counts);
    setDrawsCount(drawsCount + 1);
  };

  const inBagCount = sampleCounts.filter((c) => c > 0).length;
  const oobCount = 10 - inBagCount;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 8px 24px rgba(0,31,84,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Interactive Urn Simulator
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            Sampling with Replacement & The 63.2% / 36.8% Rule
          </h4>
        </div>
        <button
          onClick={rollNewBootstrap}
          style={{
            padding: '0.5rem 1rem',
            background: '#001f54',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,31,84,0.2)'
          }}
        >
          Spin New Bootstrap Sample
        </button>
      </div>

      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
        Imagine an urn with 10 data points. When we draw 10 times <em>with replacement</em> (putting each marble back before the next draw), some points get drawn multiple times, while approximately <strong>3 to 4 points are never drawn at all</strong>!
      </p>

      {/* 10 MARBLE GRID */}
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        {sampleCounts.map((count, idx) => {
          const inBag = count > 0;
          return (
            <div key={idx} style={{
              width: '60px',
              padding: '0.5rem 0.2rem',
              borderRadius: '10px',
              background: inBag ? '#e0f2fe' : '#fee2e2',
              border: inBag ? '2px solid #0284c7' : '2px dashed #ef4444',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: inBag ? '#0369a1' : '#b91c1c' }}>
                Row #{idx + 1}
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                background: inBag ? '#0284c7' : '#ef4444',
                color: '#ffffff'
              }}>
                {count}x drawn
              </span>
              <span style={{ fontSize: '0.65rem', color: inBag ? '#0369a1' : '#991b1b', fontWeight: 700 }}>
                {inBag ? 'In-Bag' : 'OOB'}
              </span>
            </div>
          );
        })}
      </div>

      {/* RESULT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '10px', padding: '0.8rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0369a1', display: 'block' }}>In-Bag Training Rows ({inBagCount} of 10)</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0284c7' }}>{(inBagCount * 10).toFixed(0)}%</span>
          <span style={{ fontSize: '0.72rem', color: '#075985', display: 'block' }}>Mathematical Average: ~63.2%</span>
        </div>
        <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '10px', padding: '0.8rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#991b1b', display: 'block' }}>Out-of-Bag (OOB) Free Test Rows ({oobCount} of 10)</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#dc2626' }}>{(oobCount * 10).toFixed(0)}%</span>
          <span style={{ fontSize: '0.72rem', color: '#991b1b', display: 'block' }}>Mathematical Average: ~36.8% (1/e)</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. FEATURE SUB-SAMPLING MYSTERY CARD DRAW (ml-7-4)
// Shows how hiding features forces trees to discover diverse latent clues
// ─────────────────────────────────────────────────────────────────────────────
export function FeatureSubsampleVisual() {
  const allFeatures = [
    { name: 'Tumor Radius (Dominant)', isDominant: true },
    { name: 'Cell Perimeter', isDominant: false },
    { name: 'Cell Texture', isDominant: false },
    { name: 'Smoothness', isDominant: false },
    { name: 'Compactness', isDominant: false },
    { name: 'Concavity', isDominant: false },
    { name: 'Symmetry', isDominant: false },
    { name: 'Fractal Dimension', isDominant: false }
  ];

  const [activeCandidates, setActiveCandidates] = useState([allFeatures[2], allFeatures[3], allFeatures[6]]);
  const [splitCount, setSplitCount] = useState(1);

  const drawNewSubsample = () => {
    const shuffled = [...allFeatures].sort(() => 0.5 - Math.random());
    setActiveCandidates(shuffled.slice(0, 3));
    setSplitCount(splitCount + 1);
  };

  const dominantIsVisible = activeCandidates.some((f) => f.isDominant);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 8px 24px rgba(0,31,84,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Random Subspace Mechanism
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            Feature Sub-sampling (m = &radic;p): Breaking the Monarchy of Dominant Features
          </h4>
        </div>
        <button
          onClick={drawNewSubsample}
          style={{
            padding: '0.5rem 1rem',
            background: '#001f54',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Draw Node Split Subspace
        </button>
      </div>

      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
        In standard Bagging, all trees greedily split on the same dominant feature (e.g. <em>Tumor Radius</em>), making them identical and correlated. In Random Forests, each node split is restricted to only <strong>m = &radic;8 &approx; 3 candidate features</strong> drawn at random.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', margin: '1rem 0' }}>
        {activeCandidates.map((f, idx) => (
          <div key={idx} style={{
            background: f.isDominant ? '#fee2e2' : '#f0fdf4',
            border: f.isDominant ? '2px solid #ef4444' : '2px solid #10b981',
            borderRadius: '10px',
            padding: '0.8rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: f.isDominant ? '#991b1b' : '#166534' }}>
              Candidate #{idx + 1}
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#001f54', display: 'block', margin: '0.3rem 0' }}>
              {f.name}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {f.isDominant ? 'Dominant Feature' : 'Latent Secondary Feature'}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        background: dominantIsVisible ? '#fef2f2' : '#ecfdf5',
        border: dominantIsVisible ? '1px solid #fecaca' : '1px solid #a7f3d0',
        borderRadius: '10px',
        padding: '0.8rem',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: dominantIsVisible ? '#991b1b' : '#065f46' }}>
          {dominantIsVisible
            ? 'Dominant feature is visible: Tree splits on Tumor Radius.'
            : 'Dominant feature is HIDDEN! Tree is forced to explore Cell Texture, uncovering a brand new decision pathway!'}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. ADABOOST MAGNIFIER VISUAL (ml-7-5)
// Shows how misclassified samples expand in size to force the next stump
// ─────────────────────────────────────────────────────────────────────────────
export function AdaBoostMagnifierVisual() {
  const [step, setStep] = useState(1);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 8px 24px rgba(0,31,84,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Sequential Instance Weighting
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            AdaBoost in Action: Missed Questions Inflate in Weight
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                border: step === s ? '2px solid #001f54' : '1px solid #cbd5e1',
                background: step === s ? '#001f54' : '#ffffff',
                color: step === s ? '#ffffff' : '#334155',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Iteration {s}
            </button>
          ))}
        </div>
      </div>

      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
        {step === 1 && 'Iteration 1: All 5 training instances start with equal weight (1.0x). Stump 1 draws a vertical split but misclassifies Point #3.'}
        {step === 2 && 'Iteration 2: Point #3 expands to 4.0x giant weight! Stump 2 is forced to place its split specifically to isolate Point #3.'}
        {step === 3 && 'Iteration 3: Both stumps combine their accuracy weights (alpha) to create a perfect composite decision boundary!'}
      </p>

      {/* SAMPLE VISUAL BOX */}
      <div style={{
        height: '110px',
        background: '#ffffff',
        border: '1.5px solid #cbd5e1',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 1rem',
        position: 'relative'
      }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>1</div>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>2</div>
        {/* POINT 3 (EXPANDS) */}
        <div style={{
          width: step >= 2 ? '62px' : '28px',
          height: step >= 2 ? '62px' : '28px',
          borderRadius: '50%',
          background: step >= 2 ? '#dc2626' : '#0284c7',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: step >= 2 ? '1rem' : '0.75rem',
          boxShadow: step >= 2 ? '0 0 20px rgba(220,38,38,0.5)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {step >= 2 ? '3 (4x)' : '3'}
        </div>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>4</div>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>5</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. RESIDUAL ARROWS VISUAL (ml-7-5)
// Shows how Gradient Boosting fits trees directly to error arrows (residuals)
// ─────────────────────────────────────────────────────────────────────────────
export function ResidualArrowVisual() {
  const [stage, setStage] = useState(0);

  const houseData = [
    { actual: 400, baseline: 300, tree1Pred: 80, tree2Pred: 15 },
    { actual: 250, baseline: 300, tree1Pred: -40, tree2Pred: -8 },
    { actual: 320, baseline: 300, tree1Pred: 15, tree2Pred: 4 }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 8px 24px rgba(0,31,84,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Functional Gradient Descent
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            Gradient Boosting: Training Trees on Residual Error Arrows
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['Step 0: Baseline Average', 'Step 1: Fit Tree 1', 'Step 2: Fit Tree 2'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setStage(idx)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                border: stage === idx ? '2px solid #001f54' : '1px solid #cbd5e1',
                background: stage === idx ? '#001f54' : '#ffffff',
                color: stage === idx ? '#ffffff' : '#334155',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
        {houseData.map((h, idx) => {
          let currentPred = h.baseline;
          if (stage >= 1) currentPred += h.tree1Pred;
          if (stage >= 2) currentPred += h.tree2Pred;
          const currentResidual = h.actual - currentPred;

          return (
            <div key={idx} style={{
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              padding: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#001f54' }}>House #{idx + 1}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#166534' }}>Actual: ${h.actual}k</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569' }}>
                <span>Ensemble Prediction:</span>
                <strong style={{ color: '#001f54' }}>${currentPred}k</strong>
              </div>
              <div style={{
                background: Math.abs(currentResidual) <= 10 ? '#ecfdf5' : '#fff1f2',
                border: Math.abs(currentResidual) <= 10 ? '1px solid #a7f3d0' : '1px solid #fecdd3',
                borderRadius: '6px',
                padding: '0.35rem 0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: Math.abs(currentResidual) <= 10 ? '#065f46' : '#be123c'
              }}>
                <span>Remaining Residual Arrow:</span>
                <span>{currentResidual >= 0 ? `+$${currentResidual}k` : `-$${Math.abs(currentResidual)}k`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. XGBOOST TOLL GATE BALANCE VISUAL (ml-7-5)
// Shows split gain vs complexity penalty gamma
// ─────────────────────────────────────────────────────────────────────────────
export function XGBoostTollGateVisual() {
  const [splitGain, setSplitGain] = useState(3.5);
  const [gammaPenalty, setGammaPenalty] = useState(2.0);

  const netBenefit = splitGain - gammaPenalty;
  const isSplitAccepted = netBenefit > 0;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 8px 24px rgba(0,31,84,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', background: '#e0edff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Built-in Tree Regularization
          </span>
          <h4 style={{ margin: '0.4rem 0 0 0', color: '#001f54', fontSize: '1.15rem', fontWeight: 800 }}>
            XGBoost Split Gain vs Minimum Toll Fee (&gamma;)
          </h4>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
            <span>Proposed Split Gain:</span>
            <strong style={{ color: '#0284c7' }}>{splitGain.toFixed(1)} pts</strong>
          </label>
          <input
            type="range"
            min="0.5"
            max="6.0"
            step="0.1"
            value={splitGain}
            onChange={(e) => setSplitGain(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#0284c7' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
            <span>Complexity Penalty (&gamma;):</span>
            <strong style={{ color: '#7c3aed' }}>{gammaPenalty.toFixed(1)} pts</strong>
          </label>
          <input
            type="range"
            min="0.5"
            max="6.0"
            step="0.1"
            value={gammaPenalty}
            onChange={(e) => setGammaPenalty(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#7c3aed' }}
          />
        </div>
      </div>

      <div style={{
        background: isSplitAccepted ? '#ecfdf5' : '#fef2f2',
        border: isSplitAccepted ? '1.5px solid #10b981' : '1.5px solid #ef4444',
        borderRadius: '10px',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isSplitAccepted ? '#065f46' : '#991b1b', display: 'block' }}>
          {isSplitAccepted
            ? `Toll Gate OPEN! (Net Gain: +${netBenefit.toFixed(1)} pts) -> Split created successfully.`
            : `Toll Gate LOCKED! (Net Deficit: ${netBenefit.toFixed(1)} pts) -> Node is pruned to stop overfitting.`}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// 10. STACKING TWO-LEVEL ARCHITECTURE PYRAMID (ml-7-6)
// ============================================================================
export function StackingArchitecturePyramid() {
  const [activeModel, setActiveModel] = useState('meta');

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Interactive Architecture Visual
          </span>
          <h4 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>
            Two-Level Stacking Generalization Hierarchy
          </h4>
        </div>
        <span style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#475569'
        }}>
          Click a tier to inspect data flow
        </span>
      </div>

      {/* Level 2: Meta-Learner Tier */}
      <div
        onClick={() => setActiveModel('meta')}
        style={{
          background: activeModel === 'meta' ? 'linear-gradient(135deg, #001f54 0%, #034078 100%)' : '#f8fafc',
          color: activeModel === 'meta' ? '#ffffff' : '#001f54',
          border: '2px solid #001f54',
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: activeModel === 'meta' ? '0 6px 18px rgba(0, 31, 84, 0.25)' : 'none',
          marginBottom: '1rem'
        }}
      >
        <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: activeModel === 'meta' ? 0.9 : 0.7 }}>
          Level 2: Meta-Learner (Blender Model)
        </div>
        <div style={{ fontSize: '1.05rem', fontWeight: 900, marginTop: '2px' }}>
          Logistic Regression / Ridge / ElasticNet (L2 Regularized)
        </div>
        <div style={{ fontSize: '0.78rem', marginTop: '4px', opacity: activeModel === 'meta' ? 0.95 : 0.8 }}>
          Input: Out-of-Fold predictions matrix Z = [y_hat_RF, y_hat_SVM, y_hat_KNN, y_hat_GBM] &rarr; Output: Final Ensemble Prediction
        </div>
      </div>

      {/* Connecting Flow Arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', margin: '-0.5rem 0 0.5rem 0' }}>
        <div style={{ color: '#0284c7', fontSize: '1.2rem', fontWeight: 900 }}>^</div>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 10px', borderRadius: '20px' }}>
          Out-of-Fold (OOF) Prediction Matrix Z (N x M)
        </div>
        <div style={{ color: '#0284c7', fontSize: '1.2rem', fontWeight: 900 }}>^</div>
      </div>

      {/* Level 1: Heterogeneous Base Estimators Tier */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        {[
          { id: 'rf', name: 'Random Forest', desc: 'Tree Orthogonal Splits', color: '#16a34a', bg: '#f0fdf4', border: '#86efac' },
          { id: 'svm', name: 'RBF Support Vector', desc: 'Margin Non-linear Shell', color: '#0284c7', bg: '#f0f9ff', border: '#7dd3fc' },
          { id: 'knn', name: 'K-Nearest Neighbors', desc: 'Local Distance Geometry', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
          { id: 'gbm', name: 'Gradient Boosting', desc: 'Sequential Residuals', color: '#7c3aed', bg: '#faf5ff', border: '#d8b4fe' }
        ].map((m) => (
          <div
            key={m.id}
            onClick={() => setActiveModel(m.id)}
            style={{
              background: activeModel === m.id ? m.bg : '#ffffff',
              border: `1.5px solid ${activeModel === m.id ? m.color : '#e2e8f0'}`,
              borderRadius: '12px',
              padding: '0.85rem 0.75rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeModel === m.id ? `0 4px 12px ${m.bg}` : 'none'
            }}
          >
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: m.color, textTransform: 'uppercase' }}>
              Base Estimator
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#001f54', margin: '2px 0' }}>
              {m.name}
            </div>
            <div style={{ fontSize: '0.70rem', color: '#64748b' }}>
              {m.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Connecting Flow Arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', margin: '-0.5rem 0 0.5rem 0' }}>
        <div style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 900 }}>^</div>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2px 10px', borderRadius: '20px' }}>
          Original Feature Matrix X (N Samples x P Features)
        </div>
        <div style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 900 }}>^</div>
      </div>

      {/* Explanatory Footer Card */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '0.85rem 1.1rem',
        fontSize: '0.78rem',
        color: '#334155',
        lineHeight: 1.6
      }}>
        {activeModel === 'meta' && (
          <div>
            <strong style={{ color: '#001f54' }}>Level-2 Meta-Learner Role:</strong> Instead of trusting an unweighted vote, the Meta-Learner fits a learned linear/logistic combination function y_pred = sigmoid(w_0 + w_1*y_RF + w_2*y_SVM + w_3*y_KNN). It automatically penalizes redundant models with near-zero coefficients and gives maximal influence to complementary specialists.
          </div>
        )}
        {activeModel === 'rf' && (
          <div>
            <strong style={{ color: '#16a34a' }}>Random Forest Specialist:</strong> Excels at capturing sharp, axis-aligned categorical splits and complex hierarchical rule interactions without scaling dependencies.
          </div>
        )}
        {activeModel === 'svm' && (
          <div>
            <strong style={{ color: '#0284c7' }}>RBF SVM Specialist:</strong> Excels at discovering smooth, continuous curved decision margins in high-dimensional feature projections.
          </div>
        )}
        {activeModel === 'knn' && (
          <div>
            <strong style={{ color: '#d97706' }}>KNN Specialist:</strong> Excels at memorizing local geometric cluster neighborhoods and dense topological pockets.
          </div>
        )}
        {activeModel === 'gbm' && (
          <div>
            <strong style={{ color: '#7c3aed' }}>Gradient Boosting Specialist:</strong> Excels at sequentially chipping away at subtle non-linear residual errors.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 11. OUT-OF-FOLD (OOF) MATRIX STEPPER (ml-7-6)
// ============================================================================
export function OutOfFoldMatrixStepper() {
  const [activeFold, setActiveFold] = useState(1);
  const [showLeakageWarning, setShowLeakageWarning] = useState(false);

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Validation Safety Visual
          </span>
          <h4 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>
            K-Fold Out-of-Fold (OOF) Meta-Matrix Generation
          </h4>
        </div>
        <button
          onClick={() => setShowLeakageWarning(!showLeakageWarning)}
          style={{
            background: showLeakageWarning ? '#fee2e2' : '#f8fafc',
            border: `1.5px solid ${showLeakageWarning ? '#ef4444' : '#cbd5e1'}`,
            color: showLeakageWarning ? '#991b1b' : '#475569',
            padding: '5px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          {showLeakageWarning ? 'Target Leakage Trap: ON' : 'Target Leakage Trap: OFF'}
        </button>
      </div>

      {/* Fold Selection Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {[1, 2, 3, 4, 5].map((foldNum) => (
          <button
            key={foldNum}
            onClick={() => setActiveFold(foldNum)}
            style={{
              flex: 1,
              minWidth: '90px',
              padding: '8px 10px',
              borderRadius: '10px',
              border: `1.5px solid ${activeFold === foldNum ? '#001f54' : '#e2e8f0'}`,
              background: activeFold === foldNum ? '#001f54' : '#f8fafc',
              color: activeFold === foldNum ? '#ffffff' : '#475569',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Fold #{foldNum} Step
          </button>
        ))}
      </div>

      {/* 5-Fold Partition Grid Visual */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '1.25rem' }}>
        {[1, 2, 3, 4, 5].map((f) => {
          const isHoldout = f === activeFold;
          return (
            <div
              key={f}
              style={{
                background: showLeakageWarning ? '#fef2f2' : isHoldout ? '#ecfdf5' : '#eff6ff',
                border: `2px solid ${showLeakageWarning ? '#ef4444' : isHoldout ? '#10b981' : '#93c5fd'}`,
                borderRadius: '10px',
                padding: '12px 8px',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.70rem', fontWeight: 800, color: showLeakageWarning ? '#991b1b' : isHoldout ? '#065f46' : '#1e40af' }}>
                Fold {f} (20%)
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#001f54', marginTop: '2px' }}>
                {showLeakageWarning ? 'Trained & Predicted!' : isHoldout ? 'OOF Test Set' : 'Training Fold'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>
                {showLeakageWarning ? 'Severe Leakage!' : isHoldout ? 'P(Unseen) -> Matrix Z' : 'Fits Base Learners'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation Banner */}
      <div style={{
        background: showLeakageWarning ? '#fef2f2' : '#f0fdf4',
        border: `1.5px solid ${showLeakageWarning ? '#fca5a5' : '#86efac'}`,
        borderRadius: '12px',
        padding: '1rem',
        fontSize: '0.78rem',
        color: showLeakageWarning ? '#991b1b' : '#166534',
        lineHeight: 1.6
      }}>
        {showLeakageWarning ? (
          <div>
            <strong>Catastrophic Target Leakage:</strong> If base models are allowed to predict on the exact samples they trained on, complex models (like Decision Trees or Random Forests) will output memorized 100% confidence scores. The Level-2 Meta-Learner will see this fake 100% accuracy, give all weight to the overfitted base learner, and suffer catastrophic test set failure!
          </div>
        ) : (
          <div>
            <strong>Fold #{activeFold} Out-of-Fold Execution:</strong> Base estimators are fitted strictly on the other 4 folds (80% of data). Then, they predict strictly on Fold #{activeFold} (20% unseen data). By repeating this for all 5 folds, we construct a 100% pristine Meta-Feature Matrix Z (of dimension N &times; M) where every single row was predicted by a model that never saw that sample during training!
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 12. BLENDING VS STACKING PARTITION DIAGRAM (ml-7-6)
// ============================================================================
export function BlendingVsStackingVisual() {
  const [selectedArch, setSelectedArch] = useState('stacking');

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Architectural Comparison
          </span>
          <h4 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>
            Blending (Hold-Out Set) vs. Stacking (K-Fold OOF)
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setSelectedArch('blending')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: `1.5px solid ${selectedArch === 'blending' ? '#001f54' : '#cbd5e1'}`,
              background: selectedArch === 'blending' ? '#001f54' : '#ffffff',
              color: selectedArch === 'blending' ? '#ffffff' : '#475569',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Blending
          </button>
          <button
            onClick={() => setSelectedArch('stacking')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: `1.5px solid ${selectedArch === 'stacking' ? '#001f54' : '#cbd5e1'}`,
              background: selectedArch === 'stacking' ? '#001f54' : '#ffffff',
              color: selectedArch === 'stacking' ? '#ffffff' : '#475569',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Stacking (K-Fold)
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{
          background: selectedArch === 'blending' ? '#f0f9ff' : '#f8fafc',
          border: `1.5px solid ${selectedArch === 'blending' ? '#0284c7' : '#e2e8f0'}`,
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
            Blending Architecture
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: '#001f54', margin: '4px 0' }}>
            Fixed Hold-Out Validation Set
          </div>
          <div style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.6 }}>
            Dataset is partitioned once into Train (60%), Blend Validation (20%), and Test (20%). Base models train on 60% and predict on 20% to train Meta-Learner.
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.72rem' }}>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>+ Fast: Requires only 1 training pass per model</span>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>- Data Inefficient: 20% validation data wasted</span>
            <span style={{ color: '#d97706', fontWeight: 700 }}>- Higher Variance: Sensitive to the hold-out split</span>
          </div>
        </div>

        <div style={{
          background: selectedArch === 'stacking' ? '#f0fdf4' : '#f8fafc',
          border: `1.5px solid ${selectedArch === 'stacking' ? '#16a34a' : '#e2e8f0'}`,
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
            Stacking Architecture
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: '#001f54', margin: '4px 0' }}>
            Full K-Fold Out-of-Fold Matrix
          </div>
          <div style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.6 }}>
            K-Fold cross-validation generates out-of-fold predictions for 100% of the training dataset. Meta-Learner trains on full N samples.
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.72rem' }}>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>+ Maximum Accuracy: 100% data utilized</span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>+ Stable & Robust: Zero hold-out split variance</span>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>- Slower: Requires K x M base training passes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 13. ENSEMBLE DECISION FLOWCHART VISUAL (ml-7-7)
// ============================================================================
export function EnsembleDecisionFlowchart() {
  const [selectedGoal, setSelectedGoal] = useState('high_acc');

  const scenarios = {
    high_acc: {
      title: 'Top Generalization Accuracy (Tabular/Kaggle)',
      recommendation: 'Stacking Ensemble or XGBoost / LightGBM',
      rationale: 'When latency is secondary and every 0.1% accuracy matters, Stacking heterogeneous models (Trees + SVM + Linear) or tuning a deep Gradient Boosting pipeline dominates.',
      color: '#7c3aed',
      bg: '#faf5ff',
      border: '#d8b4fe'
    },
    low_latency: {
      title: 'Sub-5ms Real-Time Production SLA (Fraud / Ads)',
      recommendation: 'HistGradientBoosting / Pruned Random Forest',
      rationale: 'Avoid complex multi-level Stacking. Use histogram-binned gradient boosting (LightGBM/HistGBM) with shallow depth (<=4) or simple Soft Voting across 2 lightweight models.',
      color: '#0284c7',
      bg: '#f0f9ff',
      border: '#7dd3fc'
    },
    noisy_data: {
      title: 'Noisy Data & Extreme Outlier Contamination',
      recommendation: 'Bagging / Random Forest (Avoid Deep Boosting!)',
      rationale: 'Boosting tries aggressively to correct mislabeled outliers, leading to severe overfitting. Bagging averages out independent noise with complete mathematical stability.',
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#86efac'
    },
    edge_device: {
      title: 'Resource-Constrained IoT / Mobile Edge (RAM < 32MB)',
      recommendation: 'Simple Soft Voting of 3 Linear / Naive Bayes Models',
      rationale: 'Ensembles of large forests exceed memory limits. Combine a logistic regression, a linear SVM, and a decision stump with pre-computed weighted voting.',
      color: '#d97706',
      bg: '#fffbeb',
      border: '#fde68a'
    }
  };

  const current = scenarios[selectedGoal];

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Production Engineering Flowchart
          </span>
          <h4 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>
            The Master Ensemble Decision Matrix
          </h4>
        </div>
      </div>

      {/* Scenario Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: '1.25rem' }}>
        {[
          { id: 'high_acc', label: 'Max Accuracy (Kaggle)' },
          { id: 'low_latency', label: 'Real-Time (<5ms SLA)' },
          { id: 'noisy_data', label: 'Noisy / Outlier Data' },
          { id: 'edge_device', label: 'Embedded / Edge IoT' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedGoal(item.id)}
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: `1.5px solid ${selectedGoal === item.id ? '#001f54' : '#e2e8f0'}`,
              background: selectedGoal === item.id ? '#001f54' : '#f8fafc',
              color: selectedGoal === item.id ? '#ffffff' : '#334155',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Decision Outcome Card */}
      <div style={{
        background: current.bg,
        border: `2px solid ${current.border}`,
        borderRadius: '14px',
        padding: '1.25rem'
      }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: current.color, textTransform: 'uppercase' }}>
          Recommended Production Architecture
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#001f54', margin: '4px 0' }}>
          {current.recommendation}
        </div>
        <div style={{ fontSize: '0.80rem', color: '#334155', lineHeight: 1.6, marginTop: '6px' }}>
          {current.rationale}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 14. INFERENCE LATENCY VS ACCURACY RADAR (ml-7-7)
// ============================================================================
export function LatencyVsAccuracyRadar() {
  const [activeEnsemble, setActiveEnsemble] = useState('random_forest');

  const models = {
    single_tree: { name: 'Single Decision Tree', acc: 92.3, trainTime: '0.01s', infLatency: '0.2ms', ram: '2 MB', score: 65, color: '#64748b' },
    voting: { name: 'Soft Voting (3 Models)', acc: 96.5, trainTime: '0.12s', infLatency: '1.1ms', ram: '8 MB', score: 82, color: '#0284c7' },
    bagging: { name: 'Bagging (50 Trees)', acc: 95.8, trainTime: '0.45s', infLatency: '3.2ms', ram: '24 MB', score: 85, color: '#16a34a' },
    random_forest: { name: 'Random Forest (100 Trees)', acc: 96.5, trainTime: '0.55s', infLatency: '4.1ms', ram: '32 MB', score: 92, color: '#059669' },
    xgboost: { name: 'XGBoost / HistGBM', acc: 97.2, trainTime: '0.80s', infLatency: '1.8ms', ram: '14 MB', score: 96, color: '#7c3aed' },
    stacking: { name: '2-Level Stacking (4 Models)', acc: 98.6, trainTime: '3.80s', infLatency: '8.5ms', ram: '64 MB', score: 98, color: '#dc2626' }
  };

  const m = models[activeEnsemble];

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Empirical Benchmark Trade-Off
          </span>
          <h4 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>
            Accuracy vs. Inference Latency & Hardware Profile
          </h4>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '1.25rem' }}>
        {Object.keys(models).map((key) => (
          <button
            key={key}
            onClick={() => setActiveEnsemble(key)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: `1.5px solid ${activeEnsemble === key ? '#001f54' : '#e2e8f0'}`,
              background: activeEnsemble === key ? '#001f54' : '#f8fafc',
              color: activeEnsemble === key ? '#ffffff' : '#475569',
              fontSize: '0.74rem',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {models[key].name}
          </button>
        ))}
      </div>

      {/* Live Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>Test Accuracy</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#001f54', marginTop: '2px' }}>{m.acc}%</div>
        </div>
        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>Inference Latency</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>{m.infLatency}</div>
        </div>
        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>Training Time</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#16a34a', marginTop: '2px' }}>{m.trainTime}</div>
        </div>
        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>RAM Footprint</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#d97706', marginTop: '2px' }}>{m.ram}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 15. NESTED CROSS-VALIDATION LEAKAGE SHIELD (ml-7-7)
// ============================================================================
export function NestedCVShieldVisual() {
  const [nestedMode, setNestedMode] = useState(true);

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Leakage Shield Architecture
          </span>
          <h4 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>
            Nested Cross-Validation (5x3 Loop)
          </h4>
        </div>
        <button
          onClick={() => setNestedMode(!nestedMode)}
          style={{
            background: nestedMode ? '#001f54' : '#f8fafc',
            border: '1.5px solid #001f54',
            color: nestedMode ? '#ffffff' : '#001f54',
            padding: '5px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          {nestedMode ? 'Nested CV: ENABLED (Zero Bias)' : 'Flat CV: ENABLED (Optimistic Bias)'}
        </button>
      </div>

      <div style={{
        background: nestedMode ? '#f0fdf4' : '#fffbeb',
        border: `1.5px solid ${nestedMode ? '#86efac' : '#fde68a'}`,
        borderRadius: '12px',
        padding: '1rem',
        fontSize: '0.78rem',
        color: nestedMode ? '#166534' : '#b45309',
        lineHeight: 1.6
      }}>
        {nestedMode ? (
          <div>
            <strong>Outer Loop (Generalization Estimate) & Inner Loop (Hyperparameter Tuning):</strong> The outer 5 folds assess performance on completely unseen test data. Inside each outer fold, an inner 3-fold CV tunes model hyperparameters and Level-2 Stacking weights. This mathematically eliminates information leakage between parameter optimization and generalization error.
          </div>
        ) : (
          <div>
            <strong>Flat Cross-Validation Risk:</strong> When hyperparameter selection or meta-learning is tuned on the same cross-validation loop used to report test error, the reported accuracy is optimistically biased by 1.5% to 4.0%, leading to unexpected performance degradation when deployed to real production traffic.
          </div>
        )}
      </div>
    </div>
  );
}
