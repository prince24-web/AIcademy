'use client';

import React, { useState, useMemo } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// VECTOR ICONS (SVG)
// ─────────────────────────────────────────────────────────────────────────────
const IconTerminal = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const IconDollar = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconScale = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const IconTarget = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROBLEM FRAMING & COST-UTILITY INTERACTIVE STUDIO (ml-8-1) - LIGHT MODE
// ─────────────────────────────────────────────────────────────────────────────
export function ProblemFramingInteractiveStudio() {
  const [activeTab, setActiveTab] = useState('payoff_calculator'); // 'payoff_calculator' | 'task_classifier' | 'baseline_arena'
  
  // Tab 1: Payoff Calculator state
  const [ltv, setLtv] = useState(1200);             // Customer Lifetime Value ($)
  const [offerCost, setOfferCost] = useState(100);     // Cost of Retention Voucher ($)
  const [saveRate, setSaveRate] = useState(50);        // Probability churner stays when offered (%)
  const [modelThreshold, setModelThreshold] = useState(0.40); // Decision threshold (0.1 to 0.9)
  
  // Total Population constants from Telco Dataset (7,043 rows)
  const totalChurn = 1869;
  const totalLoyal = 5174;
  
  // Simulated model performance as threshold changes
  const simMetrics = useMemo(() => {
    const t = modelThreshold;
    const recall = Math.max(0.05, Math.min(0.98, 1 / (1 + Math.exp(5 * (t - 0.45)))));
    const fpr = Math.max(0.01, Math.min(0.95, 1 / (1 + Math.exp(6 * (t - 0.30)))));
    
    const tp = Math.round(totalChurn * recall);
    const fn = totalChurn - tp;
    const fp = Math.round(totalLoyal * fpr);
    const tn = totalLoyal - fp;
    
    const precision = tp / (tp + fp);
    const f1 = (2 * precision * recall) / (precision + recall);
    
    const valueTP = ((saveRate / 100) * ltv) - offerCost;
    const valueFP = -offerCost;
    const valueFN = -ltv;
    const valueTN = 0;
    
    const totalDollarValue = (tp * valueTP) + (fp * valueFP) + (fn * valueFN) + (tn * valueTN);
    const statusQuoValue = (totalChurn * -ltv);
    const netSavings = totalDollarValue - statusQuoValue;
    
    return {
      tp, fp, fn, tn,
      recall: (recall * 100).toFixed(1),
      precision: (precision * 100).toFixed(1),
      f1: f1.toFixed(3),
      valueTP, valueFP, valueFN,
      totalDollarValue,
      statusQuoValue,
      netSavings
    };
  }, [ltv, offerCost, saveRate, modelThreshold]);

  // Tab 2: Task Classifier state
  const [selectedCase, setSelectedCase] = useState('telco_churn');
  const businessCases = {
    telco_churn: {
      title: 'Telecom Customer Churn',
      problemStatement: 'Subscribers switch to competitors unexpectedly, bleeding $2.2M annually in recurring revenue.',
      framing: 'Supervised Binary Classification',
      target: 'Churn ∈ {0, 1}',
      leadTime: 'Predict 30 days before contract expiry / cancellation request',
      primaryMetric: 'PR-AUC, Recall & Net Business Value ($)',
      wrongApproach: 'Treating it as generic clustering or waiting until cancellation request is already submitted.'
    },
    ecommerce_ltv: {
      title: 'E-Commerce Spend Forecasting',
      problemStatement: 'Marketing needs to know which shoppers will spend over $500 next quarter to allocate VIP ad spend.',
      framing: 'Supervised Regression (or 2-Stage Hurdle Model: Propensity + Spend)',
      target: 'NextQuarterSpend (Continuous float $)',
      leadTime: 'Compute at the end of each billing cycle',
      primaryMetric: 'RMSE, MAE & Top-Decile Lift',
      wrongApproach: 'Predicting exact purchase timestamps rather than monetary volume.'
    },
    fraud_detection: {
      title: 'Credit Card Fraud Prevention',
      problemStatement: 'Unauthorized transactions cost millions and trigger banking penalties; latency must be under 50ms.',
      framing: 'Extreme Imbalanced Supervised Classification / Anomaly Detection',
      target: 'IsFraudulent ∈ {0, 1} (Prevalence ~0.1%)',
      leadTime: 'Real-time during transaction authorization gateway (sub-50ms)',
      primaryMetric: 'Precision at 95% Recall (PR-AUC), False Alarm Rate',
      wrongApproach: 'Optimizing for 99.9% accuracy (a dummy model that approves all transactions gets 99.9% accuracy while missing 100% of fraud!).'
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      border: '1.5px solid #c2d4f2',
      padding: '2rem',
      color: '#0f172a',
      margin: '2rem 0',
      boxShadow: '0 8px 32px rgba(0, 31, 84, 0.06)'
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0edff', border: '1px solid #93c5fd', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', marginBottom: '0.5rem' }}>
            <IconTarget size={14} />
            Interactive Studio · Chapter 8.1
          </div>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#001f54', letterSpacing: '-0.02em' }}>
            Problem Framing & Cost-Utility Matrix Simulator
          </h3>
          <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Connect machine learning probabilities directly to enterprise dollar ROI. See how decision thresholds shift when a False Negative costs 12× more than a False Positive.
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div style={{ display: 'flex', background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'payoff_calculator', label: 'Cost-Utility Payoff', icon: <IconDollar size={15} /> },
            { id: 'task_classifier', label: 'Problem Formulation', icon: <IconScale size={15} /> },
            { id: 'baseline_arena', label: 'Baseline Floor', icon: <IconTerminal size={15} /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: isActive ? '#001f54' : 'transparent',
                  color: isActive ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 31, 84, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: COST-UTILITY PAYOFF CALCULATOR */}
      {activeTab === 'payoff_calculator' && (
        <div>
          {/* CONTROL BAR */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '14px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#334155', fontWeight: 700 }}>
                <span>Customer LTV:</span>
                <span style={{ color: '#0284c7', fontWeight: 800 }}>${ltv.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="600"
                max="2500"
                step="100"
                value={ltv}
                onChange={e => setLtv(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0284c7' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Loss incurred on False Negative</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#334155', fontWeight: 700 }}>
                <span>Retention Offer Cost:</span>
                <span style={{ color: '#d97706', fontWeight: 800 }}>${offerCost}</span>
              </div>
              <input
                type="range"
                min="25"
                max="300"
                step="25"
                value={offerCost}
                onChange={e => setOfferCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#d97706' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Wasted spend on False Positive</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#334155', fontWeight: 700 }}>
                <span>Offer Success Rate:</span>
                <span style={{ color: '#059669', fontWeight: 800 }}>{saveRate}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={saveRate}
                onChange={e => setSaveRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>% of churners saved by offer</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#334155', fontWeight: 700 }}>
                <span>Decision Threshold (p*):</span>
                <span style={{ color: '#7c3aed', fontWeight: 800 }}>{modelThreshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.80"
                step="0.02"
                value={modelThreshold}
                onChange={e => setModelThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#7c3aed' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Default is 0.50; lower catches more churn</span>
            </div>
          </div>

          {/* SIMULATION SUMMARY CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#065f46', textTransform: 'uppercase', fontWeight: 800 }}>Net Financial Savings</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669', marginTop: '0.25rem' }}>
                +${simMetrics.netSavings.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#047857' }}>vs doing nothing (-${Math.abs(simMetrics.statusQuoValue).toLocaleString()})</span>
            </div>

            <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#1e40af', textTransform: 'uppercase', fontWeight: 800 }}>Recall (Churn Caught)</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb', marginTop: '0.25rem' }}>
                {simMetrics.recall}%
              </div>
              <span style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>{simMetrics.tp.toLocaleString()} of 1,869 churners caught</span>
            </div>

            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#92400e', textTransform: 'uppercase', fontWeight: 800 }}>Precision (Offer Accuracy)</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706', marginTop: '0.25rem' }}>
                {simMetrics.precision}%
              </div>
              <span style={{ fontSize: '0.75rem', color: '#b45309' }}>{simMetrics.fp.toLocaleString()} loyal customers offered</span>
            </div>

            <div style={{ background: '#faf5ff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#6b21a8', textTransform: 'uppercase', fontWeight: 800 }}>Cost Asymmetry Ratio</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#9333ea', marginTop: '0.25rem' }}>
                {(ltv / offerCost).toFixed(0)} : 1
              </div>
              <span style={{ fontSize: '0.75rem', color: '#7e22ce' }}>1 False Negative = {(ltv / offerCost).toFixed(0)} False Positives</span>
            </div>
          </div>

          {/* CONFUSION MATRIX WITH DOLLAR PAYOFFS */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
            overflowX: 'auto'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#001f54', fontWeight: 800 }}>
              Live Confusion Matrix & Quadrant Financial Valuation (Threshold = {modelThreshold.toFixed(2)})
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: '0.75rem', minWidth: '580px' }}>
              <div></div>
              <div style={{ textAlign: 'center', fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                Predicted: Loyal (0)
              </div>
              <div style={{ textAlign: 'center', fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                Predicted: Churn (1)
              </div>

              {/* Actual Loyal Row */}
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                Actual: Loyal (5,174)
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#475569', display: 'block', fontWeight: 700 }}>True Negative (TN)</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>{simMetrics.tn.toLocaleString()}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.2rem' }}>$0 (Neutral Status Quo)</span>
              </div>
              <div style={{ background: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#c2410c', display: 'block', fontWeight: 700 }}>False Positive (FP)</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ea580c' }}>{simMetrics.fp.toLocaleString()}</span>
                <span style={{ fontSize: '0.75rem', color: '#9a3412', display: 'block', marginTop: '0.2rem' }}>
                  -${offerCost} each = -${(simMetrics.fp * offerCost).toLocaleString()} wasted
                </span>
              </div>

              {/* Actual Churn Row */}
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                Actual: Churn (1,869)
              </div>
              <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#b91c1c', display: 'block', fontWeight: 700 }}>False Negative (FN) · Critical Bleed</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#dc2626' }}>{simMetrics.fn.toLocaleString()}</span>
                <span style={{ fontSize: '0.75rem', color: '#991b1b', display: 'block', marginTop: '0.2rem' }}>
                  -${ltv} each = -${(simMetrics.fn * ltv).toLocaleString()} lost LTV
                </span>
              </div>
              <div style={{ background: '#ecfdf5', border: '1.5px solid #86efac', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#047857', display: 'block', fontWeight: 700 }}>True Positive (TP) · Value Saved</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669' }}>{simMetrics.tp.toLocaleString()}</span>
                <span style={{ fontSize: '0.75rem', color: '#065f46', display: 'block', marginTop: '0.2rem' }}>
                  +${simMetrics.valueTP} each = +${(simMetrics.tp * simMetrics.valueTP).toLocaleString()} net saved
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROBLEM FORMULATION CLASSIFIER */}
      {activeTab === 'task_classifier' && (
        <div>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {Object.keys(businessCases).map(key => {
              const isSelected = selectedCase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCase(key)}
                  style={{
                    background: isSelected ? '#001f54' : '#ffffff',
                    border: isSelected ? '1.5px solid #001f54' : '1.5px solid #cbd5e1',
                    color: isSelected ? '#ffffff' : '#334155',
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 31, 84, 0.15)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {businessCases[key].title}
                </button>
              );
            })}
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0, 31, 84, 0.03)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>1. Vague Business Need</span>
                <p style={{ margin: '0.4rem 0 0 0', color: '#0f172a', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.5 }}>
                  "{businessCases[selectedCase].problemStatement}"
                </p>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>2. Rigorous ML Formulation</span>
                <p style={{ margin: '0.4rem 0 0 0', color: '#0284c7', fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.5 }}>
                  {businessCases[selectedCase].framing}
                </p>
              </div>

              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>3. Target Variable ($y$)</span>
                <p style={{ margin: '0.4rem 0 0 0', color: '#059669', fontSize: '0.92rem', fontWeight: 700, fontFamily: 'monospace' }}>
                  {businessCases[selectedCase].target}
                </p>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>4. Actionable Lead Time</span>
                <p style={{ margin: '0.4rem 0 0 0', color: '#d97706', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.5 }}>
                  {businessCases[selectedCase].leadTime}
                </p>
              </div>

              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase' }}>5. Primary Evaluation Metric</span>
                <p style={{ margin: '0.4rem 0 0 0', color: '#7c3aed', fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.5 }}>
                  {businessCases[selectedCase].primaryMetric}
                </p>
              </div>

              <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b91c1c', textTransform: 'uppercase' }}>Common Trap: Unaligned Objective</span>
                <p style={{ margin: '0.4rem 0 0 0', color: '#dc2626', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 500 }}>
                  {businessCases[selectedCase].wrongApproach}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BASELINE ARENA */}
      {activeTab === 'baseline_arena' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0, 31, 84, 0.03)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#001f54', fontSize: '1.1rem', fontWeight: 800 }}>
            The Minimal Baseline Hierarchy: Never Build ML Without a Benchmark Floor
          </h4>
          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Before fitting gradient boosted trees, verify the performance of naive baselines. A 73.46% accuracy model can be completely useless in practice!
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: '#fff8f8', border: '1.5px solid #fca5a5', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, color: '#b91c1c', fontSize: '0.95rem' }}>
                  Baseline 0: Majority Class Dummy Classifier (`strategy='most_frequent'`)
                </span>
                <span style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                  Catches 0 Churners
                </span>
              </div>
              <p style={{ margin: '0 0 0.75rem 0', color: '#334155', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Always predicts "Loyal" (0) for every customer. Achieves a deceptively high <strong>73.46% Accuracy</strong> because 73.5% of the dataset is loyal. But Recall is <strong>0.00%</strong>, resulting in the maximum catastrophic net loss of <strong>-$2,242,800</strong>.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span>Accuracy: <strong style={{ color: '#0f172a' }}>73.46%</strong></span>
                <span>Recall: <strong style={{ color: '#dc2626' }}>0.00%</strong></span>
                <span>Net Value: <strong style={{ color: '#dc2626' }}>-$2,242,800</strong></span>
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, color: '#15803d', fontSize: '0.95rem' }}>
                  Baseline 1: Simple Domain Heuristic Rule (`tenure &lt;= 12` &amp; `Contract == 'Month-to-month'`)
                </span>
                <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                  Saves +$1,643,800
                </span>
              </div>
              <p style={{ margin: '0 0 0.75rem 0', color: '#334155', fontSize: '0.85rem', lineHeight: 1.5 }}>
                A simple business rule based on industry intuition: new subscribers on month-to-month contracts have the highest churn propensity. Catches <strong>1,024 true churners</strong> (54.79% Recall), recovering <strong>$1.64 Million</strong> in value before running any machine learning!
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span>Accuracy: <strong style={{ color: '#0f172a' }}>74.23%</strong></span>
                <span>Recall: <strong style={{ color: '#059669' }}>54.79%</strong></span>
                <span>Precision: <strong style={{ color: '#d97706' }}>51.35%</strong></span>
                <span>Net Value: <strong style={{ color: '#059669' }}>-$599,000</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. DATA INGESTION & EDA INTERACTIVE STUDIO (ml-8-2) - LIGHT MODE (PROPER CHARTS)
// ─────────────────────────────────────────────────────────────────────────────
export function DataIngestionEDAStudio() {
  const [activeTab, setActiveTab] = useState('bivariate_explorer'); // 'bivariate_explorer' | 'distribution_profiler' | 'collinearity_matrix' | 'whitespace_detector'

  // Tab 1: Bivariate Categorical Data with authentic counts
  const [selectedFeature, setSelectedFeature] = useState('Contract');
  const [chartViewMode, setChartViewMode] = useState('rate'); // 'rate' | 'grouped_volume'
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const categoricalData = {
    Contract: {
      title: 'Contract Commitment Term',
      desc: 'The single strongest predictor of customer churn in telecommunications.',
      categories: [
        { label: 'Month-to-month', count: 3875, churnPct: 42.71, loyalCount: 2220, churnCount: 1655, riskColor: '#dc2626' },
        { label: 'One year', count: 1473, churnPct: 11.27, loyalCount: 1307, churnCount: 166, riskColor: '#f59e0b' },
        { label: 'Two year', count: 1695, churnPct: 2.83, loyalCount: 1647, churnCount: 48, riskColor: '#10b981' }
      ],
      insight: 'Subscribers on month-to-month contracts have a 42.71% churn rate—over 15x higher than subscribers on two-year commitments (2.83%). Low switching friction is the primary operational cause of defection.'
    },
    InternetService: {
      title: 'Internet Service Modality',
      desc: 'High billing rates and service unbundling drive divergence across access tiers.',
      categories: [
        { label: 'Fiber optic', count: 3096, churnPct: 41.89, loyalCount: 1799, churnCount: 1297, riskColor: '#dc2626' },
        { label: 'DSL', count: 2421, churnPct: 18.96, loyalCount: 1962, churnCount: 459, riskColor: '#3b82f6' },
        { label: 'No Internet', count: 1526, churnPct: 7.40, loyalCount: 1413, churnCount: 113, riskColor: '#10b981' }
      ],
      insight: 'Fiber optic customers churn at 41.89% despite paying premium monthly fees. Feature correlation shows high monthly fees combined with lack of bundled tech support causes sharp customer dissatisfaction.'
    },
    PaymentMethod: {
      title: 'Payment & Billing Method',
      desc: 'Automated recurring billing methods demonstrate starkly lower friction and customer churn.',
      categories: [
        { label: 'Electronic check', count: 2365, churnPct: 45.29, loyalCount: 1294, churnCount: 1071, riskColor: '#dc2626' },
        { label: 'Mailed check', count: 1612, churnPct: 19.11, loyalCount: 1304, churnCount: 308, riskColor: '#f59e0b' },
        { label: 'Bank transfer', count: 1544, churnPct: 16.71, loyalCount: 1286, churnCount: 258, riskColor: '#3b82f6' },
        { label: 'Credit card', count: 1522, churnPct: 15.24, loyalCount: 1290, churnCount: 232, riskColor: '#10b981' }
      ],
      insight: 'Electronic check customers show an alarming 45.29% churn rate. Manual monthly action forces 12 opportunities every year where the customer actively re-evaluates competitors.'
    },
    TechSupport: {
      title: 'Tech Support Add-On',
      desc: 'Assistance services act as a massive retention anchor.',
      categories: [
        { label: 'No Support', count: 3473, churnPct: 41.64, loyalCount: 2027, churnCount: 1446, riskColor: '#dc2626' },
        { label: 'Tech Support', count: 2044, churnPct: 15.17, loyalCount: 1734, churnCount: 310, riskColor: '#10b981' },
        { label: 'No Internet', count: 1526, churnPct: 7.40, loyalCount: 1413, churnCount: 113, riskColor: '#64748b' }
      ],
      insight: 'Customers with active Tech Support churn at only 15.17%, compared to 41.64% for unassisted users. Subsidizing onboarding support yields immediate enterprise retention ROI.'
    }
  };

  // Tab 2: Numerical Histogram Bins (Authentic Telco distribution from python run)
  const [selectedNumFeature, setSelectedNumFeature] = useState('tenure');
  const [hoveredBinIndex, setHoveredBinIndex] = useState(null);

  const numericalHistograms = {
    tenure: {
      title: 'Tenure Distribution & The Onboarding Churn Cliff',
      subtitle: 'Churn risk drops monotonically as account age increases. 55% of all churn occurs in months 0–12.',
      unit: 'months',
      bins: [
        { label: '0–12m', churnPct: 47.4, total: 2186, churn: 1037, loyal: 1149, color: '#dc2626' },
        { label: '13–24m', churnPct: 28.7, total: 1024, churn: 294, loyal: 730, color: '#ea580c' },
        { label: '25–36m', churnPct: 21.6, total: 832, churn: 180, loyal: 652, color: '#f59e0b' },
        { label: '37–48m', churnPct: 19.0, total: 762, churn: 145, loyal: 617, color: '#3b82f6' },
        { label: '49–60m', churnPct: 14.4, total: 832, churn: 120, loyal: 712, color: '#0284c7' },
        { label: '61–72m', churnPct: 6.6, total: 1407, churn: 93, loyal: 1314, color: '#10b981' }
      ],
      meanLoyal: '37.6 months',
      meanChurn: '18.0 months',
      shift: '-52.1%'
    },
    MonthlyCharges: {
      title: 'Monthly Charges Distribution & Fee Shock Thresholds',
      subtitle: 'High recurring invoices create acute vulnerability when not paired with bundled features.',
      unit: 'USD',
      bins: [
        { label: '$18–$35', churnPct: 10.9, total: 1735, churn: 189, loyal: 1546, color: '#10b981' },
        { label: '$35–$55', churnPct: 28.0, total: 897, churn: 251, loyal: 646, color: '#f59e0b' },
        { label: '$55–$75', churnPct: 27.0, total: 1291, churn: 348, loyal: 943, color: '#f59e0b' },
        { label: '$75–$95', churnPct: 36.3, total: 1825, churn: 663, loyal: 1162, color: '#dc2626' },
        { label: '$95–$120', churnPct: 32.3, total: 1295, churn: 418, loyal: 877, color: '#ea580c' }
      ],
      meanLoyal: '$61.27/mo',
      meanChurn: '$74.44/mo',
      shift: '+21.5%'
    }
  };

  const curCat = categoricalData[selectedFeature];
  const curHist = numericalHistograms[selectedNumFeature];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      border: '1.5px solid #c2d4f2',
      padding: '2rem',
      color: '#0f172a',
      margin: '2rem 0',
      boxShadow: '0 8px 32px rgba(0, 31, 84, 0.06)'
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0edff', border: '1px solid #93c5fd', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', marginBottom: '0.5rem' }}>
            Interactive Studio - Chapter 8.2
          </div>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#001f54', letterSpacing: '-0.02em' }}>
            Exploratory Data Analysis & Statistical Chart Suite
          </h3>
          <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.9rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Production-grade vertical column charts and distribution histograms grounded in the authentic 7,043-record Telco dataset.
          </p>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '0.25rem', gap: '0.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'bivariate_explorer', label: 'Bivariate Bar Chart' },
            { id: 'distribution_profiler', label: 'Distribution Histogram' },
            { id: 'collinearity_matrix', label: 'Multicollinearity (r=0.83)' },
            { id: 'whitespace_detector', label: 'Whitespace Trap (11 Rows)' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#001f54' : 'transparent',
                  color: isActive ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 31, 84, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: BIVARIATE CATEGORICAL RISK COLUMN BAR CHART
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'bivariate_explorer' && (
        <div>
          {/* TOP CONTROLS: CATEGORY PICKER & VIEW MODE TOGGLE */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {Object.keys(categoricalData).map(key => {
                const isSelected = selectedFeature === key;
                return (
                  <button
                    key={key}
                    onClick={() => { setSelectedFeature(key); setHoveredBarIndex(null); }}
                    style={{
                      background: isSelected ? '#001f54' : '#ffffff',
                      border: isSelected ? '1.5px solid #001f54' : '1.5px solid #cbd5e1',
                      color: isSelected ? '#ffffff' : '#334155',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,31,84,0.15)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher without emojis */}
            <div style={{ display: 'flex', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.2rem' }}>
              <button
                onClick={() => setChartViewMode('rate')}
                style={{
                  background: chartViewMode === 'rate' ? '#001f54' : 'transparent',
                  color: chartViewMode === 'rate' ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Churn Rate (%)
              </button>
              <button
                onClick={() => setChartViewMode('grouped_volume')}
                style={{
                  background: chartViewMode === 'grouped_volume' ? '#001f54' : 'transparent',
                  color: chartViewMode === 'grouped_volume' ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Grouped Volume (N)
              </button>
            </div>
          </div>

          {/* CHART CONTAINER CARD */}
          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {curCat.title} Analysis - {chartViewMode === 'rate' ? 'Churn Probability (%)' : 'Subscribers Count (Loyal vs Churned)'}
                </span>
                <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                  {chartViewMode === 'rate' ? `Comparative Churn Rate by ${selectedFeature}` : `Account Retention Volume by ${selectedFeature}`}
                </h4>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ background: '#e0edff', color: '#001f54', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                  N = 7,043 Total
                </span>
                {chartViewMode === 'rate' && (
                  <span style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                    Avg Churn: 26.54%
                  </span>
                )}
              </div>
            </div>

            {/* SVG VERTICAL COLUMN CHART - CLEAN LABELS */}
            <div style={{ width: '100%', overflowX: 'auto', margin: '0.5rem 0 1rem 0' }}>
              {chartViewMode === 'rate' ? (
                <svg width="100%" height="280" viewBox="0 0 740 280" style={{ display: 'block', minWidth: '600px', fontFeatureSettings: '"tnum"' }}>
                  <rect x="70" y="25" width="640" height="190" fill="#f8fafc" rx="8" />

                  {/* Horizontal Gridlines & Y-Axis Labels (0% to 50%) */}
                  {[0, 10, 20, 30, 40, 50].map((tick) => {
                    const y = 25 + 190 - (tick / 50) * 190;
                    return (
                      <g key={tick}>
                        <line x1="70" y1={y} x2="710" y2={y} stroke={tick === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={tick === 0 ? '1.5' : '1'} />
                        <text x="60" y={y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#64748b">
                          {tick}%
                        </text>
                      </g>
                    );
                  })}

                  <text x="25" y="120" textAnchor="middle" transform="rotate(-90 25 120)" fontSize="11" fontWeight="800" fill="#475569" letterSpacing="0.05em">
                    CHURN RATE (%)
                  </text>

                  {/* 26.54% Baseline Reference Line */}
                  {(() => {
                    const yBase = 25 + 190 - (26.54 / 50) * 190;
                    return (
                      <g>
                        <line x1="70" y1={yBase} x2="710" y2={yBase} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" opacity="0.85" />
                        <rect x="575" y={yBase - 18} width="130" height="18" rx="4" fill="#fef3c7" stroke="#fde68a" />
                        <text x="640" y={yBase - 5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#b45309">
                          Dataset Avg (26.54%)
                        </text>
                      </g>
                    );
                  })()}

                  {/* Vertical Column Bars with non-overlapping clean labels */}
                  {curCat.categories.map((cat, idx) => {
                    const nCats = curCat.categories.length;
                    const slotWidth = 640 / nCats;
                    const barWidth = Math.min(84, slotWidth * 0.55);
                    const xCenter = 70 + (idx + 0.5) * slotWidth;
                    const x = xCenter - barWidth / 2;

                    const barHeight = (cat.churnPct / 50) * 190;
                    const y = 25 + 190 - barHeight;
                    const isHovered = hoveredBarIndex === idx;

                    return (
                      <g
                        key={idx}
                        onMouseEnter={() => setHoveredBarIndex(idx)}
                        onMouseLeave={() => setHoveredBarIndex(null)}
                        style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                      >
                        {isHovered && (
                          <rect x={x - 8} y="25" width={barWidth + 16} height="190" fill="rgba(0, 31, 84, 0.04)" rx="8" />
                        )}

                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx="8"
                          ry="8"
                          fill={cat.riskColor}
                          filter={isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'}
                          style={{ transition: 'all 0.3s ease' }}
                        />

                        {/* Exact Value Badge on Top */}
                        <rect
                          x={xCenter - 28}
                          y={y - 26}
                          width="56"
                          height="20"
                          rx="5"
                          fill="#001f54"
                        />
                        <text
                          x={xCenter}
                          y={y - 12}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="900"
                          fill="#ffffff"
                        >
                          {cat.churnPct.toFixed(1)}%
                        </text>

                        {/* Clean Label (Line 1) */}
                        <text
                          x={xCenter}
                          y="240"
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="800"
                          fill="#0f172a"
                        >
                          {cat.label}
                        </text>

                        {/* Clean Sample Size (Line 2) */}
                        <text
                          x={xCenter}
                          y="258"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="600"
                          fill="#64748b"
                        >
                          N = {cat.count.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <svg width="100%" height="280" viewBox="0 0 740 280" style={{ display: 'block', minWidth: '600px' }}>
                  <rect x="70" y="25" width="640" height="190" fill="#f8fafc" rx="8" />

                  {[0, 500, 1000, 1500, 2000, 2500].map((tick) => {
                    const y = 25 + 190 - (tick / 2500) * 190;
                    return (
                      <g key={tick}>
                        <line x1="70" y1={y} x2="710" y2={y} stroke={tick === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={tick === 0 ? '1.5' : '1'} />
                        <text x="60" y={y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#64748b">
                          {tick.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}

                  <text x="25" y="120" textAnchor="middle" transform="rotate(-90 25 120)" fontSize="11" fontWeight="800" fill="#475569">
                    SUBSCRIBERS (N)
                  </text>

                  <g transform="translate(480, 8)">
                    <rect x="0" y="0" width="12" height="12" rx="3" fill="#10b981" />
                    <text x="18" y="10" fontSize="11" fontWeight="700" fill="#15803d">Retained</text>
                    <rect x="110" y="0" width="12" height="12" rx="3" fill="#dc2626" />
                    <text x="128" y="10" fontSize="11" fontWeight="700" fill="#b91c1c">Churned</text>
                  </g>

                  {curCat.categories.map((cat, idx) => {
                    const nCats = curCat.categories.length;
                    const slotWidth = 640 / nCats;
                    const groupWidth = slotWidth * 0.70;
                    const barW = groupWidth / 2 - 4;
                    const xCenter = 70 + (idx + 0.5) * slotWidth;

                    const hLoyal = (cat.loyalCount / 2500) * 190;
                    const yLoyal = 25 + 190 - hLoyal;

                    const hChurn = (cat.churnCount / 2500) * 190;
                    const yChurn = 25 + 190 - hChurn;

                    const xLoyal = xCenter - barW - 2;
                    const xChurn = xCenter + 2;

                    return (
                      <g key={idx}>
                        <rect x={xLoyal} y={yLoyal} width={barW} height={hLoyal} rx="5" fill="#10b981" />
                        <text x={xLoyal + barW / 2} y={yLoyal - 5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#15803d">
                          {cat.loyalCount}
                        </text>

                        <rect x={xChurn} y={yChurn} width={barW} height={hChurn} rx="5" fill="#dc2626" />
                        <text x={xChurn + barW / 2} y={yChurn - 5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#b91c1c">
                          {cat.churnCount}
                        </text>

                        <text x={xCenter} y="240" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                          {cat.label}
                        </text>
                        <text x={xCenter} y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                          Total: {cat.count.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* STRUCTURED BREAKDOWN CARDS (Zero overlapping text, clean spacing) */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(160px, 1fr))`, gap: '0.75rem', marginTop: '0.75rem' }}>
              {curCat.categories.map((cat, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem', borderLeft: `4px solid ${cat.riskColor}` }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                    {cat.label}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: cat.riskColor, marginBottom: '0.25rem' }}>
                    {cat.churnPct.toFixed(1)}% Churn
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <span>Lost: <strong style={{ color: '#b91c1c' }}>{cat.churnCount.toLocaleString()}</strong></span>
                    <span>Retained: <strong style={{ color: '#15803d' }}>{cat.loyalCount.toLocaleString()}</strong></span>
                    <span>Total: <strong>{cat.count.toLocaleString()}</strong> ({((cat.count / 7043) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Finding Banner */}
            <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '1rem', marginTop: '1rem' }}>
              <strong style={{ color: '#1d4ed8', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>
                Statistical Inference:
              </strong>
              <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.55 }}>
                {curCat.insight}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: PROPER DISTRIBUTION HISTOGRAM COLUMN CHART (ZERO OVERLAPPING TEXT)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'distribution_profiler' && (
        <div>
          {/* FEATURE SWITCHER WITHOUT EMOJIS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'tenure', label: 'Tenure (Months)' },
                { id: 'MonthlyCharges', label: 'Monthly Charges (USD)' }
              ].map(feat => {
                const isSelected = selectedNumFeature === feat.id;
                return (
                  <button
                    key={feat.id}
                    onClick={() => { setSelectedNumFeature(feat.id); setHoveredBinIndex(null); }}
                    style={{
                      background: isSelected ? '#001f54' : '#ffffff',
                      border: isSelected ? '1.5px solid #001f54' : '1.5px solid #cbd5e1',
                      color: isSelected ? '#ffffff' : '#334155',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,31,84,0.15)' : 'none'
                    }}
                  >
                    {feat.label}
                  </button>
                );
              })}
            </div>

            {/* Mean Shift Highlight Badge */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.3rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#15803d' }}>
                Loyal Mean: {curHist.meanLoyal}
              </div>
              <div style={{ background: '#fff8f8', border: '1px solid #fca5a5', padding: '0.3rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#b91c1c' }}>
                Churn Mean: {curHist.meanChurn} ({curHist.shift})
              </div>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Empirical Distribution - Binned Histogram
              </span>
              <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                {curHist.title}
              </h4>
              <p style={{ margin: '0.25rem 0 0.75rem 0', color: '#475569', fontSize: '0.88rem' }}>
                {curHist.subtitle}
              </p>
            </div>

            {/* VERTICAL HISTOGRAM BINNED CHART - CLEAN, NON-OVERLAPPING LABELS */}
            <div style={{ width: '100%', overflowX: 'auto', margin: '0.5rem 0 1rem 0' }}>
              <svg width="100%" height="280" viewBox="0 0 740 280" style={{ display: 'block', minWidth: '600px' }}>
                <rect x="70" y="25" width="640" height="190" fill="#f8fafc" rx="8" />

                {/* Y-Axis Gridlines & Ticks (0% to 50%) */}
                {[0, 10, 20, 30, 40, 50].map(tick => {
                  const y = 25 + 190 - (tick / 50) * 190;
                  return (
                    <g key={tick}>
                      <line x1="70" y1={y} x2="710" y2={y} stroke={tick === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={tick === 0 ? '1.5' : '1'} />
                      <text x="60" y={y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#64748b">
                        {tick}%
                      </text>
                    </g>
                  );
                })}

                <text x="25" y="120" textAnchor="middle" transform="rotate(-90 25 120)" fontSize="11" fontWeight="800" fill="#475569">
                  CHURN PROPORTION (%)
                </text>

                {/* Dashed baseline */}
                {(() => {
                  const yBase = 25 + 190 - (26.54 / 50) * 190;
                  return (
                    <line x1="70" y1={yBase} x2="710" y2={yBase} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
                  );
                })()}

                {/* Connecting Trendline */}
                {(() => {
                  const nBins = curHist.bins.length;
                  const slotWidth = 640 / nBins;
                  const points = curHist.bins.map((b, i) => {
                    const cx = 70 + (i + 0.5) * slotWidth;
                    const cy = 25 + 190 - (b.churnPct / 50) * 190;
                    return `${cx},${cy}`;
                  }).join(' ');

                  return (
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#001f54"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      opacity="0.6"
                    />
                  );
                })()}

                {/* Vertical Histogram Bars with clean 2-line labels */}
                {curHist.bins.map((bin, idx) => {
                  const nBins = curHist.bins.length;
                  const slotWidth = 640 / nBins;
                  const barW = Math.min(74, slotWidth * 0.65);
                  const xCenter = 70 + (idx + 0.5) * slotWidth;
                  const x = xCenter - barW / 2;

                  const barH = (bin.churnPct / 50) * 190;
                  const y = 25 + 190 - barH;
                  const isHovered = hoveredBinIndex === idx;

                  return (
                    <g
                      key={idx}
                      onMouseEnter={() => setHoveredBinIndex(idx)}
                      onMouseLeave={() => setHoveredBinIndex(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {isHovered && (
                        <rect x={x - 6} y="25" width={barW + 12} height="190" fill="rgba(0, 31, 84, 0.05)" rx="6" />
                      )}

                      <rect
                        x={x}
                        y={y}
                        width={barW}
                        height={barH}
                        rx="8"
                        ry="8"
                        fill={bin.color}
                        filter={isHovered ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))'}
                      />

                      {/* Exact Percentage Badge */}
                      <rect
                        x={xCenter - 25}
                        y={y - 25}
                        width="50"
                        height="20"
                        rx="5"
                        fill="#001f54"
                      />
                      <text
                        x={xCenter}
                        y={y - 11}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#ffffff"
                      >
                        {bin.churnPct.toFixed(1)}%
                      </text>

                      {/* Connecting Point */}
                      <circle cx={xCenter} cy={y} r="3.5" fill="#001f54" stroke="#ffffff" strokeWidth="1.5" />

                      {/* Clean Bin Label (Line 1 - Never Overlaps) */}
                      <text
                        x={xCenter}
                        y="238"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="800"
                        fill="#0f172a"
                      >
                        {bin.label}
                      </text>

                      {/* Clean Bin Sample Size (Line 2 - Never Overlaps) */}
                      <text
                        x={xCenter}
                        y="256"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill="#64748b"
                      >
                        N = {bin.total.toLocaleString()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* STRUCTURED BREAKDOWN CARDS STRIP (Shows Churned vs Loyal clearly for every bin) */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`, gap: '0.65rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
              {curHist.bins.map((bin, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem', borderLeft: `3px solid ${bin.color}` }}>
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', marginBottom: '0.2rem' }}>
                    {bin.label}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: bin.color, marginBottom: '0.2rem' }}>
                    {bin.churnPct.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <span>Lost: <strong style={{ color: '#b91c1c' }}>{bin.churn.toLocaleString()}</strong></span>
                    <span>Retained: <strong style={{ color: '#15803d' }}>{bin.loyal.toLocaleString()}</strong></span>
                    <span>Total: <strong>{bin.total.toLocaleString()}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Insight Note */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
              <strong style={{ color: '#001f54', fontSize: '0.85rem' }}>Analytical Finding: </strong>
              <span style={{ color: '#334155', fontSize: '0.85rem', lineHeight: 1.55 }}>
                {selectedNumFeature === 'tenure'
                  ? 'Notice the extreme step function: Customers in their first year (0–12m) experience a 47.4% churn rate. Once accounts cross the 24-month mark, churn stabilizes near ~20%, and after 5 years (61–72m) drops to only 6.6%. Onboarding retention interventions in months 1–6 will deliver the highest business ROI.'
                  : 'Customers paying between $75 and $95/month experience the highest churn rate (36.3%). Conversely, entry-tier subscribers ($18–$35) have an extraordinarily low 10.9% churn rate. Price sensitivity escalates dramatically when bills exceed $70 without corresponding premium bundle features.'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: MULTICOLLINEARITY CORRELATION MATRIX (ZERO EMOJIS)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'collinearity_matrix' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Collinearity Alert - r = 0.826
              </span>
              <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                Pearson Correlation Heatmap & The Redundancy Trap
              </h4>
            </div>
            <span style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '0.3rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800 }}>
              Severe Collinearity: tenure vs TotalCharges
            </span>
          </div>

          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.55 }}>
            Multicollinearity occurs when two predictor features are nearly identical linear combinations of each other. In telecom, <code>TotalCharges ≈ tenure × MonthlyCharges</code>. Passing both creates unstable regression weights.
          </p>

          {/* VISUAL HEATMAP TILES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* 3x3 Heatmap */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                Pearson Correlation Grid
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 1fr', gap: '6px', textAlign: 'center', fontSize: '0.8rem' }}>
                <div></div>
                <div style={{ fontWeight: 800, color: '#475569' }}>tenure</div>
                <div style={{ fontWeight: 800, color: '#475569' }}>Monthly</div>
                <div style={{ fontWeight: 800, color: '#475569' }}>Total</div>

                <div style={{ fontWeight: 800, color: '#475569', textAlign: 'left', alignSelf: 'center' }}>tenure</div>
                <div style={{ background: '#dbeafe', color: '#1e40af', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 900 }}>1.000</div>
                <div style={{ background: '#f1f5f9', color: '#334155', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 700 }}>0.248</div>
                <div style={{ background: '#fee2e2', color: '#b91c1c', border: '2px solid #ef4444', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 900 }}>0.826 [High]</div>

                <div style={{ fontWeight: 800, color: '#475569', textAlign: 'left', alignSelf: 'center' }}>Monthly</div>
                <div style={{ background: '#f1f5f9', color: '#334155', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 700 }}>0.248</div>
                <div style={{ background: '#dbeafe', color: '#1e40af', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 900 }}>1.000</div>
                <div style={{ background: '#fef3c7', color: '#b45309', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 800 }}>0.651</div>

                <div style={{ fontWeight: 800, color: '#475569', textAlign: 'left', alignSelf: 'center' }}>Total</div>
                <div style={{ background: '#fee2e2', color: '#b91c1c', border: '2px solid #ef4444', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 900 }}>0.826 [High]</div>
                <div style={{ background: '#fef3c7', color: '#b45309', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 800 }}>0.651</div>
                <div style={{ background: '#dbeafe', color: '#1e40af', padding: '0.65rem 0', borderRadius: '6px', fontWeight: 900 }}>1.000</div>
              </div>
            </div>

            {/* Target Correlation Bar View */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                Linear Correlation with Churn (r)
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>tenure (Protective Factor)</span>
                    <span style={{ color: '#2563eb', fontWeight: 900 }}>r = -0.352</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: '70.4%', background: '#2563eb', height: '100%', borderRadius: '5px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>MonthlyCharges (Risk Factor)</span>
                    <span style={{ color: '#dc2626', fontWeight: 900 }}>r = +0.193</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: '38.6%', background: '#dc2626', height: '100%', borderRadius: '5px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>TotalCharges (Confounded)</span>
                    <span style={{ color: '#64748b', fontWeight: 900 }}>r = -0.198</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: '39.6%', background: '#64748b', height: '100%', borderRadius: '5px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1rem' }}>
            <strong style={{ color: '#b45309', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
              Why This Matters in Machine Learning:
            </strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#78350f', lineHeight: 1.55 }}>
              In linear models (Logistic Regression), high multicollinearity explodes the Variance Inflation Factor (VIF &gt; 10), causing unstable beta coefficients and erratic p-values. Tree models (Random Forest, XGBoost) are inherently robust to collinearity because decision splits evaluate one variable at a time. In Chapter 8.3, we will engineer interaction ratios to resolve this gracefully.
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: WHITESPACE TRAP FORENSICS CHART (ZERO EMOJIS)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'whitespace_detector' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Data Quality Forensics
              </span>
              <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                The 11-Row Whitespace Trap in TotalCharges
              </h4>
            </div>
            <span style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '0.3rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800 }}>
              11 Records with tenure == 0
            </span>
          </div>

          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.55 }}>
            When reading the raw CSV, pandas silently downgraded <code>TotalCharges</code> to <code>object</code> (string) instead of <code>float64</code> because 11 rows contain empty space characters (<code>" "</code>).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#fff8f8', border: '1.5px solid #fca5a5', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, color: '#b91c1c', fontSize: '0.9rem' }}>
                  Anti-Pattern: Blind dropna()
                </span>
              </div>
              <p style={{ margin: 0, color: '#7f1d1d', fontSize: '0.85rem', lineHeight: 1.55 }}>
                Running <code>df.dropna()</code> leaves all 11 rows intact because whitespace strings are not recognized as <code>NaN</code>! The pipeline crashes hours later during Scikit-Learn fitting with string conversion errors.
              </p>
            </div>

            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, color: '#15803d', fontSize: '0.9rem' }}>
                  Best Practice: Domain Imputation (0.0)
                </span>
              </div>
              <p style={{ margin: 0, color: '#14532d', fontSize: '0.85rem', lineHeight: 1.55 }}>
                All 11 records have <code>tenure == 0</code>! These are brand-new accounts who signed up within the current cycle and have accrued exactly $0.00. Imputing with 0.00 is domain-accurate and preserves newly onboarded user patterns.
              </p>
            </div>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                Production-Grade Defensive Ingestion Fix
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>Python - pandas</span>
            </div>
            <pre style={{ margin: 0, color: '#7dd3fc', fontSize: '0.82rem', lineHeight: 1.55, fontFamily: 'Consolas, Monaco, monospace', overflowX: 'auto' }}>
{`# 1. Coerce blank whitespace strings to NaN
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce')

# 2. Impute 0.0 for new subscribers (tenure == 0)
df['TotalCharges'] = df['TotalCharges'].fillna(0.0)

# 3. Assert zero nulls and float64 type
assert df['TotalCharges'].isnull().sum() == 0
assert df['TotalCharges'].dtype == np.float64`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. FEATURE ENGINEERING & PIPELINE STUDIO (ml-8-3) - LIGHT MODE (ZERO EMOJIS)
// ─────────────────────────────────────────────────────────────────────────────
export function FeatureEngineeringPipelineStudio() {
  const [activeTab, setActiveTab] = useState('pipeline_dag'); // 'pipeline_dag' | 'interaction_lab' | 'collinearity_vif' | 'leakage_guardrails'
  const [activeBranch, setActiveBranch] = useState('all'); // 'all' | 'num' | 'cat' | 'binary'
  const [interactionView, setInteractionView] = useState('charge_ratio'); // 'charge_ratio' | 'service_depth' | 'friction_combo'
  const [hoveredBar, setHoveredBar] = useState(null);

  // Tab 2: Authentic Data from Local Telco Run
  const chargeRatioData = [
    { label: 'Q1 (Low)', churnPct: 7.7, total: 1761, churn: 136, loyal: 1625, color: '#10b981', desc: 'Long-tenure subscribers with low relative monthly burden' },
    { label: 'Q2 (Mid-Low)', churnPct: 19.1, total: 1761, churn: 336, loyal: 1425, color: '#3b82f6', desc: 'Established accounts past initial commitment period' },
    { label: 'Q3 (Mid-High)', churnPct: 29.1, total: 1760, churn: 512, loyal: 1248, color: '#f59e0b', desc: 'Moderate tenure accounts with rising plan additions' },
    { label: 'Q4 (Highest)', churnPct: 50.3, total: 1761, churn: 885, loyal: 876, color: '#dc2626', desc: 'Brand-new accounts facing immediate initial invoice burden' }
  ];

  const serviceDepthData = [
    { label: '0 Services', churnPct: 43.8, total: 80, churn: 35, loyal: 45, color: '#dc2626' },
    { label: '1 Service', churnPct: 21.1, total: 1701, churn: 359, loyal: 1342, color: '#f59e0b' },
    { label: '2 Services', churnPct: 32.8, total: 1188, churn: 390, loyal: 798, color: '#ea580c' },
    { label: '3 Services', churnPct: 36.5, total: 965, churn: 352, loyal: 613, color: '#dc2626' },
    { label: '4 Services', churnPct: 31.3, total: 922, churn: 289, loyal: 633, color: '#ea580c' },
    { label: '5 Services', churnPct: 25.6, total: 908, churn: 232, loyal: 676, color: '#3b82f6' },
    { label: '6 Services', churnPct: 22.5, total: 676, churn: 152, loyal: 524, color: '#0284c7' },
    { label: '7 Services', churnPct: 12.4, total: 395, churn: 49, loyal: 346, color: '#10b981' },
    { label: '8 Services', churnPct: 5.3, total: 208, churn: 11, loyal: 197, color: '#059669' }
  ];

  const frictionComboData = [
    { label: 'Standard Billing', churnPct: 16.8, total: 5193, churn: 875, loyal: 4318, color: '#10b981', desc: 'Card/bank auto-pay or term commitments' },
    { label: 'High Risk Combo', churnPct: 53.7, total: 1850, churn: 994, loyal: 856, color: '#dc2626', desc: 'Month-to-month contract AND electronic check' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      border: '1.5px solid #c2d4f2',
      padding: '2rem',
      color: '#0f172a',
      margin: '2rem 0',
      boxShadow: '0 8px 32px rgba(0, 31, 84, 0.06)'
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0edff', border: '1px solid #93c5fd', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', marginBottom: '0.5rem' }}>
            Interactive Studio - Chapter 8.3
          </div>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#001f54', letterSpacing: '-0.02em' }}>
            Data Cleaning & Feature Engineering Pipeline Studio
          </h3>
          <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.9rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Design leak-proof Scikit-Learn ColumnTransformer pipelines, resolve multicollinearity through interaction engineering, and construct a 34-feature production matrix.
          </p>
        </div>

        {/* TABS WITHOUT EMOJIS */}
        <div style={{ display: 'flex', background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '0.25rem', gap: '0.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'pipeline_dag', label: 'Pipeline DAG Flow' },
            { id: 'interaction_lab', label: 'Interaction Feature Lab' },
            { id: 'collinearity_vif', label: 'Multicollinearity & VIF' },
            { id: 'leakage_guardrails', label: 'Leakage Guardrails' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#001f54' : 'transparent',
                  color: isActive ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 31, 84, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: PIPELINE DAG FLOW (Interactive ColumnTransformer Architecture)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'pipeline_dag' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Architecture Schema - Scikit-Learn ColumnTransformer
              </span>
              <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                End-to-End Pipeline DAG: Raw Data to 34-Feature Dense Matrix
              </h4>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ background: '#e0edff', color: '#001f54', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                Train: 5,634 x 34
              </span>
              <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                Test: 1,409 x 34
              </span>
            </div>
          </div>

          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.55 }}>
            The <code>ColumnTransformer</code> routes raw input columns through specialized transformation branches in parallel, preventing leakage by fitting parameters strictly on training folds before executing matrix concatenation.
          </p>

          {/* BRANCH SELECTOR */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'View All Branches' },
              { id: 'num', label: 'Numerical Branch (5 Features)' },
              { id: 'cat', label: 'Categorical Branch (27 Dummies)' },
              { id: 'binary', label: 'Engineered Binary Branch (2 Features)' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setActiveBranch(b.id)}
                style={{
                  background: activeBranch === b.id ? '#001f54' : '#ffffff',
                  border: activeBranch === b.id ? '1.5px solid #001f54' : '1.5px solid #cbd5e1',
                  color: activeBranch === b.id ? '#ffffff' : '#334155',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* DAG VISUALIZER CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Input Node */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Stage 1 - Raw Ingestion
              </span>
              <div style={{ fontWeight: 900, color: '#001f54', fontSize: '1rem', marginBottom: '0.4rem' }}>
                Input DataFrame (X)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#334155', lineHeight: 1.6 }}>
                <li>Drop <code>customerID</code></li>
                <li>Clean 11 whitespace rows</li>
                <li>7,043 rows x 20 features</li>
                <li>Stratified 80/20 train/test split</li>
              </ul>
            </div>

            {/* Branch 1: Numerical */}
            {(activeBranch === 'all' || activeBranch === 'num') && (
              <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Branch 1 - Numerical Pipeline
                </span>
                <div style={{ fontWeight: 900, color: '#1e3a8a', fontSize: '1rem', marginBottom: '0.4rem' }}>
                  Median Imputer + StandardScaler
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#1e40af', lineHeight: 1.6 }}>
                  <li><code>tenure</code> (months)</li>
                  <li><code>MonthlyCharges</code> (USD)</li>
                  <li><code>TotalCharges</code> (USD)</li>
                  <li><code>ChargeRatio</code> (engineered)</li>
                  <li><code>TotalServices</code> (count 0-8)</li>
                </ul>
                <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', fontWeight: 800, color: '#1d4ed8' }}>
                  Output: 5 z-scored features
                </div>
              </div>
            )}

            {/* Branch 2: Categorical */}
            {(activeBranch === 'all' || activeBranch === 'cat') && (
              <div style={{ background: '#fdf4ff', border: '1.5px solid #f0abfc', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#86198f', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Branch 2 - Categorical Pipeline
                </span>
                <div style={{ fontWeight: 900, color: '#701a75', fontSize: '1rem', marginBottom: '0.4rem' }}>
                  Constant Imputer + OneHotEncoder
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#581c87', lineHeight: 1.6 }}>
                  <li><code>drop='first'</code> (prevents dummy trap)</li>
                  <li><code>handle_unknown='ignore'</code></li>
                  <li>16 raw categorical columns</li>
                  <li>Preserves multi-class service tiers</li>
                </ul>
                <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', fontWeight: 800, color: '#86198f' }}>
                  Output: 27 binary dummy features
                </div>
              </div>
            )}

            {/* Branch 3: Binary Interactions */}
            {(activeBranch === 'all' || activeBranch === 'binary') && (
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Branch 3 - Domain Interactions
                </span>
                <div style={{ fontWeight: 900, color: '#14532d', fontSize: '1rem', marginBottom: '0.4rem' }}>
                  Passthrough Binary Flags
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#166534', lineHeight: 1.6 }}>
                  <li><code>IsHighRiskCombo</code> (M2M + E-Check)</li>
                  <li><code>IsLongTermContract</code> (1-2 Year)</li>
                  <li>Zero scaling required</li>
                  <li>Directly captures non-linear risk</li>
                </ul>
                <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', fontWeight: 800, color: '#15803d' }}>
                  Output: 2 binary flags
                </div>
              </div>
            )}

            {/* Output Node */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Stage 3 - Feature Matrix
              </span>
              <div style={{ fontWeight: 900, color: '#001f54', fontSize: '1rem', marginBottom: '0.4rem' }}>
                Output Dense Array (X_train, X_test)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#334155', lineHeight: 1.6 }}>
                <li>5 numerical + 27 dummy + 2 flags</li>
                <li><strong>Total: 34 Transformed Features</strong></li>
                <li>Zero missing values verified</li>
                <li>Certified ready for model training</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
              Production Scikit-Learn Code Construction:
            </span>
            <pre style={{ margin: 0, background: '#0f172a', color: '#7dd3fc', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'Consolas, monospace', overflowX: 'auto', lineHeight: 1.5 }}>
{`from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

preprocessor = ColumnTransformer(
    transformers=[
        ('num', Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ]), ['tenure', 'MonthlyCharges', 'TotalCharges', 'ChargeRatio', 'TotalServices']),
        ('cat', Pipeline([
            ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
            ('ohe', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'))
        ]), cat_cols),
        ('pass', 'passthrough', ['IsHighRiskCombo', 'IsLongTermContract'])
    ],
    verbose_feature_names_out=False
)

# Crucial Guardrail: fit strictly on training split to eliminate data leakage!
preprocessor.fit(X_train)
X_train_proc = preprocessor.transform(X_train)  # Shape: (5634, 34)
X_test_proc  = preprocessor.transform(X_test)   # Shape: (1409, 34)`}
            </pre>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: INTERACTION FEATURE LAB (PROPER COLUMN BAR CHARTS)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'interaction_lab' && (
        <div>
          {/* SUB-VIEW PICKER WITHOUT EMOJIS */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { id: 'charge_ratio', label: 'Charge Ratio Quartiles (Monthly / Total)' },
              { id: 'service_depth', label: 'Service Depth (Total Services 0-8)' },
              { id: 'friction_combo', label: 'Friction Combo (M2M + E-Check)' }
            ].map(v => (
              <button
                key={v.id}
                onClick={() => { setInteractionView(v.id); setHoveredBar(null); }}
                style={{
                  background: interactionView === v.id ? '#001f54' : '#ffffff',
                  border: interactionView === v.id ? '1.5px solid #001f54' : '1.5px solid #cbd5e1',
                  color: interactionView === v.id ? '#ffffff' : '#334155',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: interactionView === v.id ? '0 2px 8px rgba(0,31,84,0.15)' : 'none'
                }}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
            {/* View 1: Charge Ratio */}
            {interactionView === 'charge_ratio' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Domain Interaction 1 - Relative Bill Shock Ratio
                    </span>
                    <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                      Charge Ratio vs Churn Rate: A 6.5x Risk Disparity Across Quartiles
                    </h4>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.85rem' }}>
                      Formula: <code>ChargeRatio = MonthlyCharges / (TotalCharges + 1.0)</code>. Accounts with high monthly fees relative to cumulative tenure churn at 50.3%.
                    </p>
                  </div>
                  <span style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                    Q1 (7.7%) to Q4 (50.3%)
                  </span>
                </div>

                {/* SVG COLUMN CHART FOR CHARGE RATIO */}
                <div style={{ width: '100%', overflowX: 'auto', margin: '0.5rem 0 1rem 0' }}>
                  <svg width="100%" height="280" viewBox="0 0 740 280" style={{ display: 'block', minWidth: '600px', fontFeatureSettings: '"tnum"' }}>
                    <rect x="70" y="25" width="640" height="190" fill="#f8fafc" rx="8" />

                    {[0, 10, 20, 30, 40, 50, 60].map(tick => {
                      const y = 25 + 190 - (tick / 60) * 190;
                      return (
                        <g key={tick}>
                          <line x1="70" y1={y} x2="710" y2={y} stroke={tick === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={tick === 0 ? '1.5' : '1'} />
                          <text x="60" y={y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#64748b">
                            {tick}%
                          </text>
                        </g>
                      );
                    })}

                    <text x="25" y="120" textAnchor="middle" transform="rotate(-90 25 120)" fontSize="11" fontWeight="800" fill="#475569">
                      CHURN RATE (%)
                    </text>

                    {/* Baseline Line */}
                    {(() => {
                      const yBase = 25 + 190 - (26.54 / 60) * 190;
                      return (
                        <g>
                          <line x1="70" y1={yBase} x2="710" y2={yBase} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" opacity="0.85" />
                          <rect x="575" y={yBase - 18} width="130" height="18" rx="4" fill="#fef3c7" stroke="#fde68a" />
                          <text x="640" y={yBase - 5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#b45309">
                            Dataset Avg (26.54%)
                          </text>
                        </g>
                      );
                    })()}

                    {/* Columns */}
                    {chargeRatioData.map((d, idx) => {
                      const slotWidth = 640 / 4;
                      const barWidth = 84;
                      const xCenter = 70 + (idx + 0.5) * slotWidth;
                      const x = xCenter - barWidth / 2;

                      const barH = (d.churnPct / 60) * 190;
                      const y = 25 + 190 - barH;
                      const isHov = hoveredBar === idx;

                      return (
                        <g key={idx} onMouseEnter={() => setHoveredBar(idx)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: 'pointer' }}>
                          {isHov && <rect x={x - 8} y="25" width={barWidth + 16} height="190" fill="rgba(0,31,84,0.04)" rx="8" />}
                          <rect x={x} y={y} width={barWidth} height={barH} rx="8" ry="8" fill={d.color} />

                          {/* Value on Top */}
                          <rect x={xCenter - 26} y={y - 26} width="52" height="20" rx="5" fill="#001f54" />
                          <text x={xCenter} y={y - 12} textAnchor="middle" fontSize="11" fontWeight="900" fill="#ffffff">
                            {d.churnPct.toFixed(1)}%
                          </text>

                          {/* Clean Labels (Line 1 & Line 2) */}
                          <text x={xCenter} y="240" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                            {d.label}
                          </text>
                          <text x={xCenter} y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                            N = {d.total.toLocaleString()}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Structured Cards Strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
                  {chargeRatioData.map((d, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem', borderLeft: `4px solid ${d.color}` }}>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.2rem' }}>
                        {d.label}
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: d.color, marginBottom: '0.2rem' }}>
                        {d.churnPct.toFixed(1)}% Churn
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                        <span>Lost: <strong style={{ color: '#b91c1c' }}>{d.churn.toLocaleString()}</strong></span>
                        <span>Retained: <strong style={{ color: '#15803d' }}>{d.loyal.toLocaleString()}</strong></span>
                        <span style={{ color: '#475569', marginTop: '0.2rem' }}>{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 2: Service Depth */}
            {interactionView === 'service_depth' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Domain Interaction 2 - Service Stickiness Multiplier
                    </span>
                    <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                      Service Depth vs Churn Rate: Retention Monotonically Rises with Bundling
                    </h4>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.85rem' }}>
                      Sum of 8 add-on services. Customers subscribed to 8 services churn at only 5.3%, compared to 43.8% for unbundled users.
                    </p>
                  </div>
                  <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #86efac', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                    8 Services: 5.3% Churn
                  </span>
                </div>

                {/* SVG COLUMN CHART FOR SERVICE DEPTH */}
                <div style={{ width: '100%', overflowX: 'auto', margin: '0.5rem 0 1rem 0' }}>
                  <svg width="100%" height="280" viewBox="0 0 740 280" style={{ display: 'block', minWidth: '600px' }}>
                    <rect x="70" y="25" width="640" height="190" fill="#f8fafc" rx="8" />

                    {[0, 10, 20, 30, 40, 50].map(tick => {
                      const y = 25 + 190 - (tick / 50) * 190;
                      return (
                        <g key={tick}>
                          <line x1="70" y1={y} x2="710" y2={y} stroke={tick === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={tick === 0 ? '1.5' : '1'} />
                          <text x="60" y={y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#64748b">
                            {tick}%
                          </text>
                        </g>
                      );
                    })}

                    <text x="25" y="120" textAnchor="middle" transform="rotate(-90 25 120)" fontSize="11" fontWeight="800" fill="#475569">
                      CHURN RATE (%)
                    </text>

                    {serviceDepthData.map((d, idx) => {
                      const slotWidth = 640 / 9;
                      const barWidth = Math.min(48, slotWidth * 0.65);
                      const xCenter = 70 + (idx + 0.5) * slotWidth;
                      const x = xCenter - barWidth / 2;

                      const barH = (d.churnPct / 50) * 190;
                      const y = 25 + 190 - barH;
                      const isHov = hoveredBar === idx;

                      return (
                        <g key={idx} onMouseEnter={() => setHoveredBar(idx)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: 'pointer' }}>
                          {isHov && <rect x={x - 4} y="25" width={barWidth + 8} height="190" fill="rgba(0,31,84,0.04)" rx="6" />}
                          <rect x={x} y={y} width={barWidth} height={barH} rx="6" ry="6" fill={d.color} />

                          {/* Value */}
                          <rect x={xCenter - 22} y={y - 24} width="44" height="18" rx="4" fill="#001f54" />
                          <text x={xCenter} y={y - 11} textAnchor="middle" fontSize="10" fontWeight="900" fill="#ffffff">
                            {d.churnPct.toFixed(1)}%
                          </text>

                          {/* Clean 2-Line Labels */}
                          <text x={xCenter} y="240" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">
                            {idx} Serv
                          </text>
                          <text x={xCenter} y="256" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">
                            N={d.total}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Structured Breakdown Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {serviceDepthData.map((d, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem', borderLeft: `3px solid ${d.color}` }}>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>{d.label}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 900, color: d.color, margin: '0.15rem 0' }}>{d.churnPct.toFixed(1)}%</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        Lost: <strong style={{ color: '#b91c1c' }}>{d.churn}</strong> · Ret: <strong style={{ color: '#15803d' }}>{d.loyal}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Friction Combo */}
            {interactionView === 'friction_combo' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Domain Interaction 3 - Friction Multiplier Interaction
                    </span>
                    <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                      High Risk Friction Combo (Month-to-month + Electronic check)
                    </h4>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.85rem' }}>
                      Over 53.7% of users with this dual vulnerability churn. Captures acute billing friction and low switching barriers simultaneously.
                    </p>
                  </div>
                  <span style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                    53.7% vs 16.8% Churn
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
                  {frictionComboData.map((d, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: `2px solid ${d.color}`, borderRadius: '12px', padding: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: d.color, textTransform: 'uppercase', display: 'block' }}>
                        Cohort {idx + 1}
                      </span>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', margin: '0.3rem 0' }}>
                        {d.label}
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: d.color, marginBottom: '0.4rem' }}>
                        {d.churnPct.toFixed(1)}% Churn
                      </div>
                      <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.82rem', color: '#475569' }}>
                        {d.desc}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                        <span>Lost: <strong style={{ color: '#b91c1c' }}>{d.churn.toLocaleString()}</strong></span>
                        <span>Retained: <strong style={{ color: '#15803d' }}>{d.loyal.toLocaleString()}</strong></span>
                        <span>Total: <strong>{d.total.toLocaleString()}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: MULTICOLLINEARITY RESOLUTION & VIF AUDIT
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'collinearity_vif' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Diagnostic Audit - Variance Inflation Factor (VIF)
          </span>
          <h4 style={{ margin: '0.25rem 0 0.75rem 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
            Taming the r = 0.826 Collinearity Trap via Interaction Ratios
          </h4>
          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.55 }}>
            In raw data, <code>TotalCharges</code> exhibits an alarming VIF of 10.84 due to high linear dependency with <code>tenure</code>. By creating <code>ChargeRatio</code> and dropping redundant terms in linear pipelines, VIF drops safely below the critical 5.0 threshold.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'center', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#001f54' }}>Feature</th>
                  <th style={{ padding: '0.75rem', color: '#001f54' }}>Raw VIF</th>
                  <th style={{ padding: '0.75rem', color: '#001f54' }}>Post-Engineering VIF</th>
                  <th style={{ padding: '0.75rem', color: '#001f54' }}>Status</th>
                  <th style={{ padding: '0.75rem', color: '#001f54' }}>Linear Model Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800, color: '#001f54' }}>TotalCharges</td>
                  <td style={{ padding: '0.75rem', background: '#fee2e2', color: '#b91c1c', fontWeight: 900 }}>10.84</td>
                  <td style={{ padding: '0.75rem', background: '#f0fdf4', color: '#15803d', fontWeight: 900 }}>2.15</td>
                  <td style={{ padding: '0.75rem', color: '#15803d', fontWeight: 800 }}>Resolved</td>
                  <td style={{ padding: '0.75rem', color: '#475569' }}>Eliminates coefficient sign flips</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800, color: '#001f54' }}>tenure</td>
                  <td style={{ padding: '0.75rem', background: '#fee2e2', color: '#b91c1c', fontWeight: 900 }}>7.41</td>
                  <td style={{ padding: '0.75rem', background: '#f0fdf4', color: '#15803d', fontWeight: 900 }}>2.82</td>
                  <td style={{ padding: '0.75rem', color: '#15803d', fontWeight: 800 }}>Resolved</td>
                  <td style={{ padding: '0.75rem', color: '#475569' }}>Stabilizes standard errors</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800, color: '#001f54' }}>MonthlyCharges</td>
                  <td style={{ padding: '0.75rem', color: '#475569' }}>4.89</td>
                  <td style={{ padding: '0.75rem', background: '#f0fdf4', color: '#15803d', fontWeight: 900 }}>3.12</td>
                  <td style={{ padding: '0.75rem', color: '#15803d', fontWeight: 800 }}>Optimal</td>
                  <td style={{ padding: '0.75rem', color: '#475569' }}>Clean linear coefficient</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800, color: '#001f54' }}>ChargeRatio</td>
                  <td style={{ padding: '0.75rem', color: '#94a3b8' }}>N/A (New)</td>
                  <td style={{ padding: '0.75rem', background: '#f0fdf4', color: '#15803d', fontWeight: 900 }}>1.94</td>
                  <td style={{ padding: '0.75rem', color: '#15803d', fontWeight: 800 }}>Optimal</td>
                  <td style={{ padding: '0.75rem', color: '#475569' }}>High predictive leverage (r = +0.38)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TOP PREDICTORS CORRELATION LIST */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Top Linear Correlations with Churn in Final 34-Feature Matrix:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase' }}>Top Protective Feature</span>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem', marginTop: '0.2rem' }}>IsLongTermContract</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#16a34a' }}>r = -0.4064</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#b91c1c', fontWeight: 800, textTransform: 'uppercase' }}>Top Risk Feature</span>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem', marginTop: '0.2rem' }}>IsHighRiskCombo</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#dc2626' }}>r = +0.3753</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase' }}>Retention Anchor</span>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem', marginTop: '0.2rem' }}>tenure</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#16a34a' }}>r = -0.3456</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#b91c1c', fontWeight: 800, textTransform: 'uppercase' }}>Tech Tier Vulnerability</span>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem', marginTop: '0.2rem' }}>InternetService_Fiber optic</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#dc2626' }}>r = +0.3127</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: DATA LEAKAGE GUARDRAIL CHECKLIST (ZERO EMOJIS)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'leakage_guardrails' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Production Certification Checklist
          </span>
          <h4 style={{ margin: '0.25rem 0 0.75rem 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
            5 Essential Pre-Flight Guardrails to Prevent Data Leakage
          </h4>
          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.55 }}>
            Data leakage occurs when test set or future information contaminates training features. Verify these 5 strict protocols before running any baseline models.
          </p>

          <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {[
              {
                id: 'rule_1',
                title: 'Rule 1: Split Before Fit (Strict Fit on Train Only)',
                desc: 'Never call fit_transform() on the entire dataset! Always run train_test_split first, fit the ColumnTransformer exclusively on X_train, then call transform() on X_test.',
                code: 'preprocessor.fit(X_train); X_test_proc = preprocessor.transform(X_test)',
                status: 'PASSED'
              },
              {
                id: 'rule_2',
                title: 'Rule 2: Drop Arbitrary Primary Key Identifiers',
                desc: 'Columns like customerID must be discarded prior to encoding. High-cardinality hash strings cause tree models to memorize row identities, generating illusory 99% training accuracy that collapses on unseen test data.',
                code: 'df = df.drop(columns=[\'customerID\'])',
                status: 'PASSED'
              },
              {
                id: 'rule_3',
                title: 'Rule 3: Imputer Parameter Isolation',
                desc: 'The median tenure of 32.4 months was calculated strictly from X_train (5,634 rows). The test set must inherit this median rather than recalculating its own distribution.',
                code: 'SimpleImputer(strategy=\'median\') -> fits on X_train only',
                status: 'PASSED'
              },
              {
                id: 'rule_4',
                title: 'Rule 4: Defensive One-Hot Encoding for Unseen Levels',
                desc: 'Production requests can contain unexpected category values. Setting handle_unknown=\'ignore\' ensures that unseen categories are assigned an all-zero dummy vector rather than throwing an exception.',
                code: 'OneHotEncoder(drop=\'first\', handle_unknown=\'ignore\')',
                status: 'PASSED'
              },
              {
                id: 'rule_5',
                title: 'Rule 5: Avoid the Dummy Variable Trap (Multicollinearity)',
                desc: 'Dropping the first category (drop=\'first\') removes perfect linear dependency among dummy columns, maintaining an invertible covariance matrix for regularized regression.',
                code: 'k categories -> k-1 binary dummy columns',
                status: 'PASSED'
              }
            ].map(rule => (
              <div key={rule.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: '1 1 340px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900 }}>
                      [CERTIFIED]
                    </span>
                    <strong style={{ color: '#001f54', fontSize: '0.9rem' }}>{rule.title}</strong>
                  </div>
                  <p style={{ margin: '0.2rem 0 0.5rem 0', color: '#475569', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    {rule.desc}
                  </p>
                  <code style={{ background: '#0f172a', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'Consolas, monospace', display: 'inline-block' }}>
                    {rule.code}
                  </code>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
              Pre-Flight Certification Passed
            </span>
            <p style={{ margin: 0, color: '#14532d', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Feature matrix is strictly segregated, fully normalized, free of collinear traps, and certified for Chapter 8.4 Model Training & Baseline Tournament.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MODEL TRAINING & BASELINE TOURNAMENT STUDIO (ml-8-4) - LIGHT MODE (ZERO EMOJIS)
// ─────────────────────────────────────────────────────────────────────────────
export function ModelTournamentStudio() {
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'tradeoff_lab' | 'cost_audit' | 'champion_selection'
  const [selectedContender, setSelectedContender] = useState('gradient_boosting');
  const [selectedCostModel, setSelectedCostModel] = useState('gradient_boosting');
  const [hoveredBar, setHoveredBar] = useState(null);

  // Authentic 5-Fold CV and Holdout Test Results from Local Execution
  const contenders = [
    {
      id: 'dummy_majority',
      name: 'Dummy (Majority)',
      shortName: 'Dummy',
      family: 'Trivial Baseline',
      cvRocMean: 50.0,
      cvRocStd: 0.0,
      cvPrMean: 26.5,
      cvPrStd: 0.0,
      testRoc: 50.0,
      testPr: 26.5,
      recall: 0.0,
      precision: 0.0,
      f1: 0.0,
      accuracy: 73.5,
      fitTime: 0.05,
      tp: 0,
      fp: 0,
      fn: 374,
      tn: 1035,
      netValue: -448800,
      netSavings: 0,
      tag: '[BASELINE FLOOR]',
      tagColor: '#64748b',
      tagBg: '#f1f5f9',
      notes: 'Predicts Class 0 (Loyal) for every user. Fails to identify a single churner.'
    },
    {
      id: 'decision_tree',
      name: 'Decision Tree (Depth 5)',
      shortName: 'Decision Tree',
      family: 'Single Tree (Rule-Based)',
      cvRocMean: 82.5,
      cvRocStd: 1.0,
      cvPrMean: 61.0,
      cvPrStd: 2.0,
      testRoc: 83.6,
      testPr: 62.8,
      recall: 58.8,
      precision: 63.4,
      f1: 61.0,
      accuracy: 79.8,
      fitTime: 0.60,
      tp: 220,
      fp: 127,
      fn: 154,
      tn: 908,
      netValue: -87500,
      netSavings: 361300,
      tag: '[CONTENDER]',
      tagColor: '#0369a1',
      tagBg: '#e0f2fe',
      notes: 'Pruned orthogonal split rules. High interpretability, moderate discriminative power.'
    },
    {
      id: 'logistic_regression',
      name: 'Logistic Regression (L2)',
      shortName: 'Logistic Reg',
      family: 'Regularized Linear',
      cvRocMean: 84.6,
      cvRocStd: 1.2,
      cvPrMean: 66.2,
      cvPrStd: 1.9,
      testRoc: 84.2,
      testPr: 63.5,
      recall: 56.1,
      precision: 65.6,
      f1: 60.5,
      accuracy: 80.6,
      fitTime: 0.77,
      tp: 210,
      fp: 110,
      fn: 164,
      tn: 925,
      netValue: -102800,
      netSavings: 346000,
      tag: '[STRONG LINEAR]',
      tagColor: '#4338ca',
      tagBg: '#e0e7ff',
      notes: 'L2 ridge penalty on 34 features. Well-calibrated log-odds probabilities.'
    },
    {
      id: 'logistic_balanced',
      name: 'Logistic Regression (Balanced)',
      shortName: 'LogReg (Balanced)',
      family: 'Cost-Sensitive Linear',
      cvRocMean: 84.6,
      cvRocStd: 1.2,
      cvPrMean: 66.0,
      cvPrStd: 2.0,
      testRoc: 84.2,
      testPr: 63.4,
      recall: 78.9,
      precision: 50.1,
      f1: 61.3,
      accuracy: 73.5,
      fitTime: 0.78,
      tp: 295,
      fp: 294,
      fn: 79,
      tn: 741,
      netValue: 23300,
      netSavings: 472100,
      tag: '[MAX RECALL]',
      tagColor: '#15803d',
      tagBg: '#dcfce7',
      notes: 'Inverse class weighting (w1=1.88, w0=0.68). Catches 78.9% of all churners.'
    },
    {
      id: 'random_forest',
      name: 'Random Forest (100 Trees)',
      shortName: 'Random Forest',
      family: 'Bagged Ensembles',
      cvRocMean: 84.1,
      cvRocStd: 1.2,
      cvPrMean: 65.6,
      cvPrStd: 2.5,
      testRoc: 84.2,
      testPr: 65.0,
      recall: 53.7,
      precision: 66.3,
      f1: 59.4,
      accuracy: 80.5,
      fitTime: 2.15,
      tp: 201,
      fp: 102,
      fn: 173,
      tn: 933,
      netValue: -117300,
      netSavings: 331500,
      tag: '[BAGGING]',
      tagColor: '#0284c7',
      tagBg: '#f0f9ff',
      notes: 'Bootstrap aggregating reduces variance across 100 decorrelated subtrees.'
    },
    {
      id: 'gradient_boosting',
      name: 'Gradient Boosting (100 Trees)',
      shortName: 'Gradient Boosting',
      family: 'Sequential Boosting',
      cvRocMean: 84.7,
      cvRocStd: 1.2,
      cvPrMean: 66.6,
      cvPrStd: 2.1,
      testRoc: 84.3,
      testPr: 65.6,
      recall: 50.5,
      precision: 64.3,
      f1: 56.6,
      accuracy: 79.4,
      fitTime: 3.79,
      tp: 189,
      fp: 105,
      fn: 185,
      tn: 930,
      netValue: -138000,
      netSavings: 310800,
      tag: '[CHAMPION]',
      tagColor: '#1e3a8a',
      tagBg: '#dbeafe',
      notes: 'Iterative pseudo-residual minimization. Highest CV ROC-AUC (0.8473) and PR-AUC (0.6662).'
    }
  ];

  // Selected contender lookup
  const activeContender = contenders.find(c => c.id === selectedContender) || contenders[5];
  const activeCostModelData = contenders.find(c => c.id === selectedCostModel) || contenders[5];

  // SVG Chart Dimensions for Leaderboard
  const chartWidth = 720;
  const chartHeight = 240;
  const margin = { top: 30, right: 20, bottom: 45, left: 45 };
  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;

  // 5 primary contenders for chart
  const chartContenders = contenders.filter(c => c.id !== 'logistic_balanced');
  const barGroupWidth = innerWidth / chartContenders.length;
  const singleBarWidth = 26;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      border: '1.5px solid #c2d4f2',
      padding: '2rem',
      color: '#0f172a',
      margin: '2rem 0',
      boxShadow: '0 8px 32px rgba(0, 31, 84, 0.06)'
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0edff', border: '1px solid #93c5fd', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', marginBottom: '0.5rem' }}>
            Interactive Studio - Chapter 8.4
          </div>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#001f54', letterSpacing: '-0.02em' }}>
            Model Training & Baseline Tournament Studio
          </h3>
          <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.9rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Empirical benchmarking across 5 distinct model families using Stratified 5-Fold Cross-Validation, asymmetric cost-utility audits, and champion selection.
          </p>
        </div>

        {/* TABS WITHOUT EMOJIS */}
        <div style={{ display: 'flex', background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '0.25rem', gap: '0.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'leaderboard', label: 'Tournament Leaderboard' },
            { id: 'tradeoff_lab', label: 'Metric Trade-Off Lab' },
            { id: 'cost_audit', label: 'Confusion Matrix & Cost Audit' },
            { id: 'champion_selection', label: 'Champion Selection' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#001f54' : 'transparent',
                  color: isActive ? '#ffffff' : '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 31, 84, 0.2)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: TOURNAMENT LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div>
          {/* CHART HEADER & LEGEND */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#001f54' }}>
                5-Fold Cross-Validation: ROC-AUC vs PR-AUC
              </h4>
              <p style={{ margin: '0.2rem 0 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                Evaluated across 5,634 training records (mean percentage +/- 1 std deviation).
              </p>
            </div>

            {/* LEGEND */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.35rem 0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#001f54', borderRadius: '3px', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54' }}>ROC-AUC (Discrimination)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#2563eb', borderRadius: '3px', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>PR-AUC (Imbalance Focus)</span>
              </div>
            </div>
          </div>

          {/* PUBLICATION-GRADE SVG COLUMN CHART */}
          <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Y-AXIS GRID LINES & LABELS */}
              {[0, 25, 50, 75, 100].map(pct => {
                const y = margin.top + innerHeight - (pct / 100) * innerHeight;
                return (
                  <g key={pct}>
                    <line
                      x1={margin.left}
                      y1={y}
                      x2={margin.left + innerWidth}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray={pct === 0 ? 'none' : '3 3'}
                      strokeWidth={pct === 0 ? '1.5' : '1'}
                    />
                    <text
                      x={margin.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#64748b"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {pct}%
                    </text>
                  </g>
                );
              })}

              {/* CONTENDER BAR GROUPS */}
              {chartContenders.map((contender, idx) => {
                const groupCenterX = margin.left + idx * barGroupWidth + barGroupWidth / 2;
                const rocX = groupCenterX - singleBarWidth - 2;
                const prX = groupCenterX + 2;

                const rocHeight = (contender.cvRocMean / 100) * innerHeight;
                const rocY = margin.top + innerHeight - rocHeight;

                const prHeight = (contender.cvPrMean / 100) * innerHeight;
                const prY = margin.top + innerHeight - prHeight;

                const isSelected = selectedContender === contender.id;

                return (
                  <g key={contender.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedContender(contender.id)}>
                    {/* HIGHLIGHT BACKGROUND FOR SELECTED CONTENDER */}
                    {isSelected && (
                      <rect
                        x={groupCenterX - barGroupWidth / 2 + 6}
                        y={margin.top - 10}
                        width={barGroupWidth - 12}
                        height={innerHeight + 20}
                        fill="#eff6ff"
                        rx="8"
                        stroke="#bfdbfe"
                        strokeWidth="1"
                      />
                    )}

                    {/* ROC-AUC BAR */}
                    <rect
                      x={rocX}
                      y={rocY}
                      width={singleBarWidth}
                      height={rocHeight}
                      fill="#001f54"
                      rx="3"
                      opacity={isSelected ? 1 : 0.85}
                    />
                    {/* ROC-AUC VALUE LABEL */}
                    <text
                      x={rocX + singleBarWidth / 2}
                      y={rocY - 6}
                      textAnchor="middle"
                      fill="#001f54"
                      fontSize="10"
                      fontWeight="800"
                    >
                      {contender.cvRocMean.toFixed(1)}%
                    </text>

                    {/* PR-AUC BAR */}
                    <rect
                      x={prX}
                      y={prY}
                      width={singleBarWidth}
                      height={prHeight}
                      fill="#2563eb"
                      rx="3"
                      opacity={isSelected ? 1 : 0.85}
                    />
                    {/* PR-AUC VALUE LABEL */}
                    <text
                      x={prX + singleBarWidth / 2}
                      y={prY - 6}
                      textAnchor="middle"
                      fill="#2563eb"
                      fontSize="10"
                      fontWeight="800"
                    >
                      {contender.cvPrMean.toFixed(1)}%
                    </text>

                    {/* MODEL NAME LABEL BELOW X-AXIS */}
                    <text
                      x={groupCenterX}
                      y={margin.top + innerHeight + 18}
                      textAnchor="middle"
                      fill={isSelected ? '#001f54' : '#334155'}
                      fontSize="11"
                      fontWeight={isSelected ? '800' : '600'}
                    >
                      {contender.name.split(' (')[0]}
                    </text>
                    <text
                      x={groupCenterX}
                      y={margin.top + innerHeight + 30}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontWeight="500"
                    >
                      {contender.family.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* CONTENDER CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            {contenders.map(c => {
              const isSelected = selectedContender === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedContender(c.id)}
                  style={{
                    background: isSelected ? '#f0f7ff' : '#ffffff',
                    border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.08)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <span style={{ background: c.tagBg, color: c.tagColor, fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      {c.tag}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                      {c.fitTime}s fit
                    </span>
                  </div>
                  <strong style={{ display: 'block', color: '#001f54', fontSize: '0.88rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {c.name}
                  </strong>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ background: '#f8fafc', padding: '0.4rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>ROC-AUC (CV)</span>
                      <strong style={{ fontSize: '0.88rem', color: '#001f54' }}>{c.cvRocMean.toFixed(1)}%</strong>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block' }}>+/- {c.cvRocStd.toFixed(1)}%</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '0.4rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>PR-AUC (CV)</span>
                      <strong style={{ fontSize: '0.88rem', color: '#2563eb' }}>{c.cvPrMean.toFixed(1)}%</strong>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block' }}>+/- {c.cvPrStd.toFixed(1)}%</span>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#475569', lineHeight: 1.4 }}>
                    {c.notes}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: METRIC TRADE-OFF LAB */}
      {activeTab === 'tradeoff_lab' && (
        <div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
              The Accuracy Paradox on Imbalanced Telco Data (26.5% Churn Rate)
            </span>
            <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Standard models trained with uniform class loss prioritize the 73.5% majority class, catching only ~50% to 56% of churners at threshold 0.5. By configuring cost-sensitive inverse class weights (<code style={{ background: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>class_weight='balanced'</code>), we force the optimization loss to penalize missed churners 2.77x more severely, elevating Recall from 56.1% to 78.9%.
            </p>
          </div>

          {/* TRADE-OFF COMPARISON TABLE / CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* STANDARD VS BALANCED LOGISTIC REGRESSION */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#001f54', fontSize: '0.95rem' }}>Logistic Regression: Standard vs Balanced</strong>
                <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  LINEAR SHOWDOWN
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Standard (Uniform)
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                    <div>Recall: <strong style={{ color: '#0f172a' }}>56.1%</strong></div>
                    <div>Precision: <strong style={{ color: '#0f172a' }}>65.6%</strong></div>
                    <div>F1-Score: <strong style={{ color: '#0f172a' }}>60.5%</strong></div>
                    <div style={{ marginTop: '0.4rem', color: '#dc2626', fontWeight: 700 }}>
                      Caught: 210 / 374
                    </div>
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Balanced Weights
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#14532d', lineHeight: 1.6 }}>
                    <div>Recall: <strong style={{ color: '#15803d' }}>78.9%</strong> (+22.8%)</div>
                    <div>Precision: <strong style={{ color: '#b45309' }}>50.1%</strong> (-15.5%)</div>
                    <div>F1-Score: <strong style={{ color: '#15803d' }}>61.3%</strong> (+0.8%)</div>
                    <div style={{ marginTop: '0.4rem', color: '#15803d', fontWeight: 800 }}>
                      Caught: 295 / 374 (+85!)
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ margin: 0, color: '#475569', fontSize: '0.8rem', lineHeight: 1.45 }}>
                In customer retention, catching 85 additional departing subscribers prevents <strong>$102,000</strong> in lost Lifetime Value ($1,200 LTV each), easily justifying the marketing cost of sending retention offers to false positives.
              </p>
            </div>

            {/* STANDARD VS BALANCED RANDOM FOREST */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#001f54', fontSize: '0.95rem' }}>Random Forest: Standard vs Balanced</strong>
                <span style={{ background: '#f0f9ff', color: '#0369a1', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  ENSEMBLE SHOWDOWN
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Standard (Uniform)
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                    <div>Recall: <strong style={{ color: '#0f172a' }}>53.7%</strong></div>
                    <div>Precision: <strong style={{ color: '#0f172a' }}>66.3%</strong></div>
                    <div>F1-Score: <strong style={{ color: '#0f172a' }}>59.4%</strong></div>
                    <div style={{ marginTop: '0.4rem', color: '#dc2626', fontWeight: 700 }}>
                      Caught: 201 / 374
                    </div>
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Balanced Weights
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#14532d', lineHeight: 1.6 }}>
                    <div>Recall: <strong style={{ color: '#15803d' }}>76.5%</strong> (+22.8%)</div>
                    <div>Precision: <strong style={{ color: '#b45309' }}>53.2%</strong> (-13.1%)</div>
                    <div>F1-Score: <strong style={{ color: '#15803d' }}>62.7%</strong> (+3.3%)</div>
                    <div style={{ marginTop: '0.4rem', color: '#15803d', fontWeight: 800 }}>
                      Caught: 286 / 374 (+85!)
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ margin: 0, color: '#475569', fontSize: '0.8rem', lineHeight: 1.45 }}>
                Random Forest with balanced sub-sampling creates decision trees on stratified bootstrap draws, elevating positive class sensitivity without requiring ad-hoc SMOTE synthesis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONFUSION MATRIX & COST AUDIT */}
      {activeTab === 'cost_audit' && (
        <div>
          {/* MODEL SELECTOR BUTTONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', marginRight: '0.25rem' }}>
              Select Model for Audit:
            </span>
            {contenders.map(m => {
              const isSelected = selectedCostModel === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedCostModel(m.id)}
                  style={{
                    background: isSelected ? '#001f54' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    border: isSelected ? '1.5px solid #001f54' : '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {m.shortName || m.name.split(' (')[0]}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* 2X2 CONFUSION MATRIX VISUAL */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 800, color: '#001f54' }}>
                Holdout Confusion Matrix: {activeCostModelData.name}
              </h4>
              <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.8rem' }}>
                Evaluated on 1,409 holdout subscribers (1,035 Loyal, 374 Churned).
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '0.5rem', alignItems: 'center' }}>
                <div></div>
                <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>
                  PREDICTED LOYAL (0)
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>
                  PREDICTED CHURN (1)
                </div>

                {/* ACTUAL LOYAL (0) */}
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>
                  ACTUAL LOYAL (0)
                </div>
                {/* TRUE NEGATIVE */}
                <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', display: 'block', textTransform: 'uppercase' }}>
                    True Negative (TN)
                  </span>
                  <strong style={{ fontSize: '1.4rem', color: '#0f172a', display: 'block' }}>
                    {activeCostModelData.tn}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 700 }}>
                    Payoff: $0 (Retained)
                  </span>
                </div>
                {/* FALSE POSITIVE */}
                <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '8px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#b45309', display: 'block', textTransform: 'uppercase' }}>
                    False Positive (FP)
                  </span>
                  <strong style={{ fontSize: '1.4rem', color: '#b45309', display: 'block' }}>
                    {activeCostModelData.fp}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700 }}>
                    Cost: -${(activeCostModelData.fp * 100).toLocaleString()} ($100 ea)
                  </span>
                </div>

                {/* ACTUAL CHURN (1) */}
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>
                  ACTUAL CHURN (1)
                </div>
                {/* FALSE NEGATIVE */}
                <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '8px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#dc2626', display: 'block', textTransform: 'uppercase' }}>
                    False Negative (FN)
                  </span>
                  <strong style={{ fontSize: '1.4rem', color: '#dc2626', display: 'block' }}>
                    {activeCostModelData.fn}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700 }}>
                    Cost: -${(activeCostModelData.fn * 1200).toLocaleString()} ($1,200 ea)
                  </span>
                </div>
                {/* TRUE POSITIVE */}
                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '8px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#15803d', display: 'block', textTransform: 'uppercase' }}>
                    True Positive (TP)
                  </span>
                  <strong style={{ fontSize: '1.4rem', color: '#15803d', display: 'block' }}>
                    {activeCostModelData.tp}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 700 }}>
                    Payoff: +${(activeCostModelData.tp * 500).toLocaleString()} (+$500 ea)
                  </span>
                </div>
              </div>
            </div>

            {/* FINANCIAL PAYOFF AUDIT BREAKDOWN */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 800, color: '#001f54' }}>
                Enterprise Financial ROI Audit
              </h4>
              <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.8rem' }}>
                Calculation: <code style={{ background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>TP * $500 + FP * -$100 + FN * -$1,200</code>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                  <span style={{ color: '#475569' }}>Value from Caught Churners ({activeCostModelData.tp} TP x +$500):</span>
                  <strong style={{ color: '#15803d' }}>+${(activeCostModelData.tp * 500).toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                  <span style={{ color: '#475569' }}>Wasted Promotion Vouchers ({activeCostModelData.fp} FP x -$100):</span>
                  <strong style={{ color: '#dc2626' }}>-${(activeCostModelData.fp * 100).toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                  <span style={{ color: '#475569' }}>Unmitigated Churn Damage ({activeCostModelData.fn} FN x -$1,200):</span>
                  <strong style={{ color: '#dc2626' }}>-${(activeCostModelData.fn * 1200).toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 800, paddingTop: '0.4rem', borderTop: '1.5px solid #e2e8f0' }}>
                  <span style={{ color: '#001f54' }}>Net Campaign Financial Outcome:</span>
                  <strong style={{ color: activeCostModelData.netValue >= 0 ? '#15803d' : '#dc2626' }}>
                    {activeCostModelData.netValue >= 0 ? '+' : ''}${activeCostModelData.netValue.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* NET SAVINGS VS BASELINE CALLOUT */}
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Net Dollars Saved vs Do-Nothing Baseline (-$448,800)
                </span>
                <strong style={{ fontSize: '1.5rem', color: '#14532d', display: 'block' }}>
                  +${activeCostModelData.netSavings.toLocaleString()}
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#166534', marginTop: '0.25rem', display: 'block' }}>
                  {activeCostModelData.id === 'logistic_balanced'
                    ? 'Max Financial Savings! High recall (78.9%) prevents 295 accounts from leaving unnoticed.'
                    : 'Significant savings over passive inaction, but further gains possible via threshold optimization.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHAMPION SELECTION */}
      {activeTab === 'champion_selection' && (
        <div>
          {/* CHAMPION BANNER */}
          <div style={{ background: 'linear-gradient(135deg, #001f54 0%, #0a2540 100%)', color: '#ffffff', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 8px 24px rgba(0,31,84,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  TOURNAMENT CHAMPION DESIGNATION
                </span>
                <h4 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                  Gradient Boosting Classifier (100 Estimators)
                </h4>
                <p style={{ margin: 0, color: '#93c5fd', fontSize: '0.88rem', maxWidth: '620px', lineHeight: 1.5 }}>
                  Emerged victorious across 5-fold CV with <strong>0.8473 ROC-AUC</strong> and <strong>0.6662 PR-AUC</strong>, demonstrating ideal capacity to capture complex non-linear feature interactions without catastrophic variance.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '0.75rem 1.25rem', textAlign: 'right' }}>
                <span style={{ fontSize: '0.7rem', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                  Advancing to Chapter 8.5
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#38bdf8' }}>
                  Optuna Tuning Ready
                </strong>
              </div>
            </div>
          </div>

          {/* OVERFITTING AUDIT TABLE */}
          <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 800, color: '#001f54' }}>
              Overfitting Diagnostics: Train ROC vs Holdout Test ROC
            </h4>
            <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.82rem' }}>
              A massive gap between training and test performance indicates memorization (high variance). A tight gap verifies true generalization.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #cbd5e1' }}>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: '#001f54', fontWeight: 800 }}>Model Contender</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#001f54', fontWeight: 800 }}>Train ROC</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#001f54', fontWeight: 800 }}>Test ROC</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#001f54', fontWeight: 800 }}>Overfit Gap</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: '#001f54', fontWeight: 800 }}>Diagnostic Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Dummy (Majority)', train: '0.5000', test: '0.5000', gap: '+0.0000', status: '[UNDERFITTING BASELINE]', statusBg: '#f1f5f9', statusColor: '#64748b' },
                    { name: 'Decision Tree (Depth 5)', train: '0.8540', test: '0.8365', gap: '+0.0175', status: '[TIGHT GENERALIZATION]', statusBg: '#f0fdf4', statusColor: '#15803d' },
                    { name: 'Logistic Regression (L2)', train: '0.8495', test: '0.8422', gap: '+0.0073', status: '[EXEMPLARY GENERALIZATION]', statusBg: '#f0fdf4', statusColor: '#15803d' },
                    { name: 'Random Forest (100 Trees)', train: '0.9410', test: '0.8415', gap: '+0.0995', status: '[MODERATE OVERFITTING]', statusBg: '#fffbeb', statusColor: '#b45309' },
                    { name: 'Gradient Boosting (100 Trees)', train: '0.8710', test: '0.8426', gap: '+0.0284', status: '[BALANCED GENERALIZATION]', statusBg: '#eff6ff', statusColor: '#1e40af' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '0.6rem 0.75rem', fontWeight: 700, color: '#0f172a' }}>{row.name}</td>
                      <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontFamily: 'Consolas, monospace' }}>{row.train}</td>
                      <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontFamily: 'Consolas, monospace', fontWeight: 700 }}>{row.test}</td>
                      <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontFamily: 'Consolas, monospace', color: row.gap.startsWith('+0.09') ? '#dc2626' : '#15803d' }}>{row.gap}</td>
                      <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                        <span style={{ background: row.statusBg, color: row.statusColor, fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* NEXT STEP CALLOUT */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block' }}>
                Tournament Outcome & Handoff
              </span>
              <p style={{ margin: '0.2rem 0 0 0', color: '#475569', fontSize: '0.82rem' }}>
                Gradient Boosting moves forward into <strong>Chapter 8.5: Hyperparameter Optimization</strong>, where Bayesian optimization via Optuna will systematically tune <code style={{ background: '#ffffff', padding: '0.1rem 0.3rem', borderRadius: '3px', border: '1px solid #cbd5e1' }}>learning_rate</code>, <code style={{ background: '#ffffff', padding: '0.1rem 0.3rem', borderRadius: '3px', border: '1px solid #cbd5e1' }}>n_estimators</code>, and <code style={{ background: '#ffffff', padding: '0.1rem 0.3rem', borderRadius: '3px', border: '1px solid #cbd5e1' }}>subsample</code>.
              </p>
            </div>
            <span style={{ background: '#001f54', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
              NEXT: OPTUNA TUNING
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. HYPERPARAMETER OPTIMIZATION & OPTUNA STUDIO (ml-8-5) - LIGHT MODE (ZERO EMOJIS)
// ─────────────────────────────────────────────────────────────────────────────
export function HyperparameterTuningStudio() {
  const [activeTab, setActiveTab] = useState('strategies'); // 'strategies' | 'convergence' | 'importance' | 'sandbox'
  
  // Interactive Sandbox State
  const [learningRate, setLearningRate] = useState(0.03);
  const [nEstimators, setNEstimators] = useState(210);
  const [maxDepth, setMaxDepth] = useState(3);
  const [subsample, setSubsample] = useState(0.60);

  // Authentic Strategy Comparison from Local Run
  const strategies = [
    {
      id: 'manual',
      name: 'Manual / Ad-Hoc Tuning',
      mechanism: 'Intuition-guided trial & error',
      fits: 6,
      time: '12.4s',
      bestCvRoc: 0.8465,
      efficiency: 'Poor (High Human Bias)',
      tag: '[PRONE TO BIAS]',
      tagBg: '#f1f5f9',
      tagColor: '#64748b',
      desc: 'Engineers manually tweak 1 parameter at a time. Misses multi-parameter non-linear interactions.'
    },
    {
      id: 'grid_search',
      name: 'GridSearchCV (Exhaustive)',
      mechanism: 'Full Cartesian product of discrete points',
      fits: 90,
      time: '86.1s',
      bestCvRoc: 0.8486,
      efficiency: 'Low (Curse of Dimensionality)',
      tag: '[EXPONENTIALLY EXPENSIVE]',
      tagBg: '#fee2e2',
      tagColor: '#b91c1c',
      desc: 'Evaluates 18 parameter combinations across 5 folds. Wastes 85% of compute on uninformative sub-grids.'
    },
    {
      id: 'random_search',
      name: 'RandomizedSearchCV',
      mechanism: 'Uniform random sampling from distributions',
      fits: 100,
      time: '75.5s',
      bestCvRoc: 0.8487,
      efficiency: 'Moderate (Independent Draws)',
      tag: '[PROBABILISTIC EXPLORER]',
      tagBg: '#fef3c7',
      tagColor: '#b45309',
      desc: 'Samples 20 random continuous distributions across 5 folds. Effectively covers high-dimensional spaces.'
    },
    {
      id: 'optuna_tpe',
      name: 'Optuna (Bayesian TPE)',
      mechanism: 'Tree-structured Parzen Estimator surrogate',
      fits: 150,
      time: '181.2s',
      bestCvRoc: 0.8492,
      efficiency: 'Peak (Adaptive Exploitation)',
      tag: '[OPTIMAL PEAK PERFORMANCE]',
      tagBg: '#dbeafe',
      tagColor: '#1e3a8a',
      desc: 'Constructs two Gaussian mixture densities to model the ratio p(x|y). Actively balances exploration and exploitation.'
    }
  ];

  // Authentic 30 Trials History from Local Optuna Run
  const optunaTrials = [
    { trial: 0, score: 0.8232, bestSoFar: 0.8232, lr: 0.2133, depth: 5, n_est: 120, sub: 0.85 },
    { trial: 1, score: 0.8406, bestSoFar: 0.8406, lr: 0.1625, depth: 5, n_est: 60, sub: 0.90 },
    { trial: 2, score: 0.8462, bestSoFar: 0.8462, lr: 0.0198, depth: 2, n_est: 220, sub: 0.65 },
    { trial: 3, score: 0.8471, bestSoFar: 0.8471, lr: 0.0255, depth: 5, n_est: 140, sub: 0.65 },
    { trial: 4, score: 0.8488, bestSoFar: 0.8488, lr: 0.1252, depth: 2, n_est: 140, sub: 0.80 },
    { trial: 5, score: 0.8421, bestSoFar: 0.8488, lr: 0.0173, depth: 2, n_est: 170, sub: 1.00 },
    { trial: 6, score: 0.8460, bestSoFar: 0.8488, lr: 0.0137, depth: 5, n_est: 110, sub: 0.75 },
    { trial: 7, score: 0.8461, bestSoFar: 0.8488, lr: 0.1867, depth: 3, n_est: 50, sub: 0.85 },
    { trial: 8, score: 0.8443, bestSoFar: 0.8488, lr: 0.0181, depth: 6, n_est: 160, sub: 0.90 },
    { trial: 9, score: 0.8416, bestSoFar: 0.8488, lr: 0.1944, depth: 2, n_est: 170, sub: 0.65 },
    { trial: 10, score: 0.8462, bestSoFar: 0.8488, lr: 0.0604, depth: 3, n_est: 250, sub: 0.75 },
    { trial: 11, score: 0.8471, bestSoFar: 0.8488, lr: 0.0525, depth: 4, n_est: 120, sub: 0.60 },
    { trial: 12, score: 0.8412, bestSoFar: 0.8488, lr: 0.0482, depth: 6, n_est: 140, sub: 0.75 },
    { trial: 13, score: 0.8453, bestSoFar: 0.8488, lr: 0.0868, depth: 4, n_est: 90, sub: 0.70 },
    { trial: 14, score: 0.8492, bestSoFar: 0.8492, lr: 0.0293, depth: 3, n_est: 210, sub: 0.60, isBest: true },
    { trial: 15, score: 0.8476, bestSoFar: 0.8492, lr: 0.0351, depth: 3, n_est: 180, sub: 0.65 },
    { trial: 16, score: 0.8482, bestSoFar: 0.8492, lr: 0.0289, depth: 3, n_est: 230, sub: 0.60 },
    { trial: 17, score: 0.8490, bestSoFar: 0.8492, lr: 0.0317, depth: 2, n_est: 250, sub: 0.60 },
    { trial: 18, score: 0.8479, bestSoFar: 0.8492, lr: 0.0322, depth: 4, n_est: 200, sub: 0.65 },
    { trial: 19, score: 0.8481, bestSoFar: 0.8492, lr: 0.0267, depth: 3, n_est: 240, sub: 0.60 },
    { trial: 20, score: 0.8475, bestSoFar: 0.8492, lr: 0.0384, depth: 3, n_est: 160, sub: 0.70 },
    { trial: 21, score: 0.8484, bestSoFar: 0.8492, lr: 0.0341, depth: 2, n_est: 220, sub: 0.60 },
    { trial: 22, score: 0.8481, bestSoFar: 0.8492, lr: 0.0305, depth: 3, n_est: 200, sub: 0.65 },
    { trial: 23, score: 0.8486, bestSoFar: 0.8492, lr: 0.0377, depth: 3, n_est: 220, sub: 0.95 },
    { trial: 24, score: 0.8477, bestSoFar: 0.8492, lr: 0.0312, depth: 4, n_est: 190, sub: 0.60 },
    { trial: 25, score: 0.8480, bestSoFar: 0.8492, lr: 0.0298, depth: 3, n_est: 210, sub: 0.65 },
    { trial: 26, score: 0.8486, bestSoFar: 0.8492, lr: 0.0405, depth: 2, n_est: 190, sub: 0.70 },
    { trial: 27, score: 0.8479, bestSoFar: 0.8492, lr: 0.0333, depth: 3, n_est: 230, sub: 0.60 },
    { trial: 28, score: 0.8483, bestSoFar: 0.8492, lr: 0.0281, depth: 3, n_est: 210, sub: 0.65 },
    { trial: 29, score: 0.8485, bestSoFar: 0.8492, lr: 0.0359, depth: 2, n_est: 240, sub: 0.60 }
  ];

  // Authentic Parameter Importances from Optuna fANOVA
  const paramImportances = [
    { name: 'learning_rate', pct: 68.2, color: '#001f54', desc: 'Dominant governor of step size shrinkage. Smaller values (~0.03) prevent premature convergence.' },
    { name: 'min_samples_split', pct: 12.1, color: '#1e40af', desc: 'Threshold requirement for branch splitting, controlling tree granular complexity.' },
    { name: 'n_estimators', pct: 8.7, color: '#2563eb', desc: 'Total sequential trees. Balances learning capacity against computational throughput.' },
    { name: 'min_samples_leaf', pct: 5.0, color: '#3b82f6', desc: 'Terminal node regularization preventing single-sample leaf memorization.' },
    { name: 'subsample', pct: 3.6, color: '#60a5fa', desc: 'Stochastic row subsampling fraction (0.60), introducing bagging-style variance reduction.' },
    { name: 'max_depth', pct: 2.4, color: '#93c5fd', desc: 'Tree depth ceiling. Shallow trees (depth 2-3) prove ideal for tabular signals.' }
  ];

  // Dynamic Estimation Formula for Sandbox
  const computeSandboxMetrics = () => {
    // Base reference: learning_rate=0.03, n_est=210, depth=3, sub=0.60 -> 0.8492
    let estRoc = 0.8492;
    
    // Penalty if learning rate is too high or too low
    if (learningRate > 0.15) estRoc -= (learningRate - 0.15) * 0.06;
    if (learningRate < 0.02) estRoc -= (0.02 - learningRate) * 0.08;

    // Penalty if depth is too high (overfitting)
    if (maxDepth >= 5) estRoc -= (maxDepth - 4) * 0.0035;

    // Subsample impact: 0.6 to 0.8 is sweet spot
    if (subsample > 0.85) estRoc -= (subsample - 0.85) * 0.005;

    // Estimators: under 100 loses capacity, over 220 plateaus
    if (nEstimators < 100) estRoc -= (100 - nEstimators) * 0.00004;

    const risk = (maxDepth >= 5 && learningRate >= 0.12) ? 'HIGH OVERFITTING RISK'
      : (maxDepth >= 4 || subsample >= 0.90) ? 'MODERATE VARIANCE'
      : 'OPTIMAL BALANCED';

    const riskColor = risk === 'HIGH OVERFITTING RISK' ? '#dc2626'
      : risk === 'MODERATE VARIANCE' ? '#b45309'
      : '#15803d';

    const riskBg = risk === 'HIGH OVERFITTING RISK' ? '#fef2f2'
      : risk === 'MODERATE VARIANCE' ? '#fffbeb'
      : '#f0fdf4';

    const estTime = ((nEstimators / 100) * (maxDepth / 3) * 1.8).toFixed(1);

    return {
      roc: Math.max(0.82, Math.min(0.8495, estRoc)),
      risk,
      riskColor,
      riskBg,
      estTime
    };
  };

  const sandboxMetrics = computeSandboxMetrics();

  // SVG Line Chart Dimensions
  const chartW = 720;
  const chartH = 220;
  const pad = { top: 25, right: 30, bottom: 40, left: 55 };
  const innerW = chartW - pad.left - pad.right;
  const innerH = chartH - pad.top - pad.bottom;

  const minScore = 0.820;
  const maxScore = 0.852;

  const scaleX = (trial) => pad.left + (trial / 29) * innerW;
  const scaleY = (score) => pad.top + innerH - ((score - minScore) / (maxScore - minScore)) * innerH;

  // Build stepped path for Best Value So Far
  let bestPathD = `M ${scaleX(0)} ${scaleY(optunaTrials[0].bestSoFar)}`;
  optunaTrials.forEach((pt, i) => {
    if (i > 0) {
      const prevX = scaleX(pt.trial);
      const prevY = scaleY(optunaTrials[i - 1].bestSoFar);
      const currY = scaleY(pt.bestSoFar);
      bestPathD += ` L ${prevX} ${prevY} L ${prevX} ${currY}`;
    }
  });

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      border: '1.5px solid #c2d4f2',
      padding: '2rem',
      color: '#0f172a',
      margin: '2.5rem 0 2rem 0',
      boxShadow: '0 8px 32px rgba(0, 31, 84, 0.06)'
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0edff', border: '1px solid #93c5fd', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', marginBottom: '0.5rem' }}>
            Interactive Studio - Chapter 8.5
          </div>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#001f54', letterSpacing: '-0.02em' }}>
            Hyperparameter Optimization (Optuna Tuning) Studio
          </h3>
          <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.9rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Analyze search strategy paradigms, inspect the 30-trial Bayesian TPE convergence trajectory, audit hyperparameter importance, and explore parameter interactions.
          </p>
        </div>

        {/* TABS WITHOUT EMOJIS */}
        <div style={{ display: 'flex', background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '0.25rem', gap: '0.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'strategies', label: 'Search Strategies' },
            { id: 'convergence', label: 'Optuna Convergence' },
            { id: 'importance', label: 'Parameter Importance' },
            { id: 'sandbox', label: 'Parameter Sandbox' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#001f54' : 'transparent',
                  color: isActive ? '#ffffff' : '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 31, 84, 0.2)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: SEARCH STRATEGIES */}
      {activeTab === 'strategies' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {strategies.map(s => (
              <div
                key={s.id}
                style={{
                  background: s.id === 'optuna_tpe' ? '#f0f7ff' : '#ffffff',
                  border: s.id === 'optuna_tpe' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  boxShadow: s.id === 'optuna_tpe' ? '0 4px 16px rgba(37,99,235,0.08)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ background: s.tagBg, color: s.tagColor, fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    {s.tag}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                    {s.time}
                  </span>
                </div>

                <strong style={{ display: 'block', color: '#001f54', fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                  {s.name}
                </strong>
                <p style={{ margin: '0 0 0.8rem 0', color: '#475569', fontSize: '0.8rem', lineHeight: 1.45 }}>
                  {s.desc}
                </p>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Best 5-Fold ROC</span>
                    <strong style={{ fontSize: '1rem', color: s.id === 'optuna_tpe' ? '#1e3a8a' : '#0f172a' }}>
                      {s.bestCvRoc.toFixed(4)}
                    </strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Evaluations</span>
                    <strong style={{ fontSize: '1rem', color: '#001f54' }}>
                      {s.fits} fits
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ maxWidth: '650px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block' }}>
                Key Takeaway: The Bergstra & Bengio Randomization Theorem
              </span>
              <p style={{ margin: '0.2rem 0 0 0', color: '#475569', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Grid search wastes exponential compute evaluating uninfluential hyperparameters across identical coordinate planes. Randomized search and Bayesian TPE explore unique coordinates on every single trial, finding superior solutions 3x faster.
              </p>
            </div>
            <div style={{ background: '#e0edff', border: '1px solid #93c5fd', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, color: '#001f54' }}>
              Optuna TPE: +0.0019 ROC-AUC over default
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OPTUNA CONVERGENCE LINE CHART */}
      {activeTab === 'convergence' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#001f54' }}>
                Optuna Optimization History: 30 Bayesian TPE Trials
              </h4>
              <p style={{ margin: '0.2rem 0 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                Tracking progressive ROC-AUC maximization across 30 sequential trials on the 5-fold cross-validation partition.
              </p>
            </div>

            {/* LEGEND */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.35rem 0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#93c5fd', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Trial Evaluation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '16px', height: '3px', background: '#001f54', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54' }}>Best Frontier So Far</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#15803d', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d' }}>Best Trial (#14)</span>
              </div>
            </div>
          </div>

          {/* PUBLICATION-GRADE SVG LINE CHART */}
          <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Y-AXIS GRID LINES & TICKS */}
              {[0.820, 0.825, 0.830, 0.835, 0.840, 0.845, 0.850].map(val => {
                const y = scaleY(val);
                return (
                  <g key={val}>
                    <line x1={pad.left} y1={y} x2={pad.left + innerW} y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                    <text x={pad.left - 8} y={y + 3} textAnchor="end" fill="#64748b" fontSize="10" fontFamily="Consolas, monospace">
                      {val.toFixed(3)}
                    </text>
                  </g>
                );
              })}

              {/* X-AXIS TICKS */}
              {[0, 5, 10, 14, 20, 25, 29].map(t => {
                const x = scaleX(t);
                return (
                  <g key={t}>
                    <line x1={x} y1={pad.top + innerH} x2={x} y2={pad.top + innerH + 4} stroke="#cbd5e1" />
                    <text x={x} y={pad.top + innerH + 16} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">
                      #{t}
                    </text>
                  </g>
                );
              })}

              {/* STEPPED BEST-VALUE-SO-FAR LINE */}
              <path d={bestPathD} fill="none" stroke="#001f54" strokeWidth="2.5" />

              {/* SCATTER POINTS FOR INDIVIDUAL TRIALS */}
              {optunaTrials.map(pt => {
                const cx = scaleX(pt.trial);
                const cy = scaleY(pt.score);
                const isBest = pt.isBest;

                return (
                  <g key={pt.trial}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isBest ? 6 : 3.5}
                      fill={isBest ? '#15803d' : '#93c5fd'}
                      stroke={isBest ? '#ffffff' : '#1e40af'}
                      strokeWidth={isBest ? 2 : 1}
                    />
                    {isBest && (
                      <g>
                        <rect x={cx - 36} y={cy - 24} width="72" height="18" fill="#15803d" rx="4" />
                        <text x={cx} y={cy - 12} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
                          BEST: 0.8492
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* BEST TRIAL PARAMETERS DISPLAY */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', display: 'block' }}>
                Optuna Optimal Configuration (Trial #14)
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.82rem', fontFamily: 'Consolas, monospace', color: '#14532d' }}>
                <span>learning_rate: <strong>0.0293</strong></span>
                <span>n_estimators: <strong>210</strong></span>
                <span>max_depth: <strong>3</strong></span>
                <span>subsample: <strong>0.60</strong></span>
                <span>min_samples_split: <strong>9</strong></span>
                <span>min_samples_leaf: <strong>5</strong></span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.7rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Holdout Test Score</span>
              <strong style={{ fontSize: '1.25rem', color: '#15803d' }}>0.8488 ROC-AUC</strong>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PARAMETER IMPORTANCE */}
      {activeTab === 'importance' && (
        <div>
          <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#001f54' }}>
            Hyperparameter Importance (fANOVA Decomposition)
          </h4>
          <p style={{ margin: '0 0 1.25rem 0', color: '#64748b', fontSize: '0.82rem' }}>
            Measures the percentage of objective variance explained by each hyperparameter across all 30 Optuna trials.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {paramImportances.map(p => (
              <div key={p.name} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <code style={{ background: '#f1f5f9', color: '#001f54', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 800 }}>
                      {p.name}
                    </code>
                  </div>
                  <strong style={{ fontSize: '0.9rem', color: '#001f54' }}>
                    {p.pct.toFixed(1)}%
                  </strong>
                </div>

                {/* HORIZONTAL SVG BAR */}
                <div style={{ background: '#f1f5f9', borderRadius: '6px', height: '10px', width: '100%', overflow: 'hidden', marginBottom: '0.4rem' }}>
                  <div style={{ background: p.color, width: `${p.pct}%`, height: '100%', borderRadius: '6px' }}></div>
                </div>

                <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
              Why Learning Rate Explains 68.2% of Performance
            </span>
            <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.82rem', lineHeight: 1.45 }}>
              In gradient boosting, setting an aggressive learning rate (e.g. 0.20+) causes the additive ensemble to take excessive step sizes along the pseudo-residual gradient, overshooting the loss minimum. Shrinking the learning rate to 0.0293 forces the algorithm to take conservative steps, relying on 210 cooperative shallow trees to reach a globally superior minimum.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: PARAMETER SANDBOX */}
      {activeTab === 'sandbox' && (
        <div>
          <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#001f54' }}>
            Interactive Hyperparameter Sandbox & Generalization Risk Estimator
          </h4>
          <p style={{ margin: '0 0 1.25rem 0', color: '#64748b', fontSize: '0.82rem' }}>
            Adjust the key hyperparameters to observe how shrinkage, tree depth, and stochastic subsampling govern generalization.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* SLIDERS PANEL */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
              {/* LEARNING RATE */}
              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <strong style={{ color: '#001f54' }}>learning_rate (Shrinkage)</strong>
                  <span style={{ fontFamily: 'Consolas, monospace', fontWeight: 800, color: '#2563eb' }}>{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.25"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#001f54' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Optimal range: 0.02 to 0.05</span>
              </div>

              {/* N ESTIMATORS */}
              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <strong style={{ color: '#001f54' }}>n_estimators (Boosting Trees)</strong>
                  <span style={{ fontFamily: 'Consolas, monospace', fontWeight: 800, color: '#2563eb' }}>{nEstimators}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="250"
                  step="10"
                  value={nEstimators}
                  onChange={(e) => setNEstimators(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#001f54' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Optimal range: 180 to 220</span>
              </div>

              {/* MAX DEPTH */}
              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <strong style={{ color: '#001f54' }}>max_depth (Tree Depth Ceiling)</strong>
                  <span style={{ fontFamily: 'Consolas, monospace', fontWeight: 800, color: '#2563eb' }}>{maxDepth}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="1"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#001f54' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Optimal depth: 2 to 3</span>
              </div>

              {/* SUBSAMPLE */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <strong style={{ color: '#001f54' }}>subsample (Row Fraction)</strong>
                  <span style={{ fontFamily: 'Consolas, monospace', fontWeight: 800, color: '#2563eb' }}>{subsample}</span>
                </div>
                <input
                  type="range"
                  min="0.60"
                  max="1.00"
                  step="0.05"
                  value={subsample}
                  onChange={(e) => setSubsample(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#001f54' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Optimal subsample: 0.60 to 0.70</span>
              </div>
            </div>

            {/* LIVE PREDICTION & AUDIT PANEL */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Estimated Model Performance
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '2rem', color: '#001f54', fontWeight: 900 }}>
                    {sandboxMetrics.roc.toFixed(4)}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>5-Fold CV ROC-AUC</span>
                </div>

                <div style={{ background: sandboxMetrics.riskBg, border: `1px solid ${sandboxMetrics.riskColor}`, borderRadius: '8px', padding: '0.5rem 0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', color: sandboxMetrics.riskColor, fontWeight: 800, display: 'block' }}>
                    GENERALIZATION STATUS
                  </span>
                  <strong style={{ fontSize: '0.85rem', color: sandboxMetrics.riskColor }}>
                    {sandboxMetrics.risk}
                  </strong>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>
                  <div>Estimated Training Time: <strong>{sandboxMetrics.estTime}s</strong></div>
                  <div>Base Learners: <strong>{nEstimators} decision stumps</strong></div>
                  <div>Effective Step Size: <strong>{learningRate} x residual</strong></div>
                </div>
              </div>

              {/* BEFORE VS AFTER CARD */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#001f54', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  Empirical Holdout Test Impact
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: '#64748b' }}>Default (0.8426) → Tuned:</span>
                  <strong style={{ color: '#15803d' }}>0.8488 (+0.0061)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  <span style={{ color: '#64748b' }}>PR-AUC (0.6561) → Tuned:</span>
                  <strong style={{ color: '#15803d' }}>0.6691 (+0.0130)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. MODEL EVALUATION, PACKAGING & MODEL CARD STUDIO (ml-8-6) - STRICT LIGHT MODE (ZERO EMOJIS)
// ─────────────────────────────────────────────────────────────────────────────
export function ModelEvaluationPackagingStudio() {
  const [activeTab, setActiveTab] = useState('threshold_lab'); // 'threshold_lab' | 'model_card' | 'packaging' | 'inference_sim'
  
  // Tab 1: Interactive Threshold State (default at optimal balanced tau* = 0.22)
  const [threshold, setThreshold] = useState(0.22);
  
  // Tab 2: Model Card Sub-Section
  const [cardSection, setCardSection] = useState('details'); // 'details' | 'performance' | 'fairness' | 'limitations'
  
  // Tab 4: Live Inference State
  const [selectedProfile, setSelectedProfile] = useState('high_risk');
  const [simTenure, setSimTenure] = useState(2);
  const [simMonthly, setSimMonthly] = useState(89.5);
  const [simContract, setSimContract] = useState('Month-to-month');
  const [simPayment, setSimPayment] = useState('Electronic check');

  // Authentic Threshold Interpolation Table from Empirical Local Run (1,409 Test Subscribers)
  const thresholdPoints = [
    { t: 0.08, recall: 0.965, precision: 0.382, f1: 0.547, tn: 448, fp: 587, fn: 13, tp: 361, savings: 554200, flagged: 0.673 },
    { t: 0.12, recall: 0.925, precision: 0.421, f1: 0.578, tn: 561, fp: 474, fn: 28, tp: 346, savings: 541800, flagged: 0.582 },
    { t: 0.16, recall: 0.880, precision: 0.455, f1: 0.600, tn: 641, fp: 394, fn: 45, tp: 329, savings: 520200, flagged: 0.513 },
    { t: 0.20, recall: 0.842, precision: 0.485, f1: 0.615, tn: 700, fp: 335, fn: 59, tp: 315, savings: 502500, flagged: 0.461 },
    { t: 0.22, recall: 0.829, precision: 0.501, f1: 0.624, tn: 726, fp: 309, fn: 64, tp: 310, savings: 496100, flagged: 0.439, isOptimalBalanced: true },
    { t: 0.26, recall: 0.791, precision: 0.519, f1: 0.626, tn: 761, fp: 274, fn: 78, tp: 296, savings: 477400, flagged: 0.405 },
    { t: 0.30, recall: 0.754, precision: 0.542, f1: 0.631, tn: 797, fp: 238, fn: 92, tp: 282, savings: 456600, flagged: 0.369 },
    { t: 0.35, recall: 0.701, precision: 0.571, f1: 0.629, tn: 838, fp: 197, fn: 112, tp: 262, savings: 424700, flagged: 0.326 },
    { t: 0.40, recall: 0.647, precision: 0.614, f1: 0.630, tn: 883, fp: 152, fn: 132, tp: 242, savings: 397000, flagged: 0.280 },
    { t: 0.45, recall: 0.583, precision: 0.647, f1: 0.613, tn: 916, fp: 119, fn: 156, tp: 218, savings: 356900, flagged: 0.239 },
    { t: 0.50, recall: 0.513, precision: 0.678, f1: 0.585, tn: 944, fp: 91, fn: 182, tp: 192, savings: 317300, flagged: 0.201, isDefault: true },
    { t: 0.55, recall: 0.439, precision: 0.707, f1: 0.541, tn: 967, fp: 68, fn: 210, tp: 164, savings: 271400, flagged: 0.165 },
    { t: 0.60, recall: 0.366, precision: 0.737, f1: 0.489, tn: 986, fp: 49, fn: 237, tp: 137, savings: 227600, flagged: 0.132 },
    { t: 0.65, recall: 0.294, precision: 0.769, f1: 0.426, tn: 1002, fp: 33, fn: 264, tp: 110, savings: 184500, flagged: 0.102 },
    { t: 0.70, recall: 0.230, precision: 0.811, f1: 0.358, tn: 1015, fp: 20, fn: 288, tp: 86, savings: 144200, flagged: 0.075 }
  ];

  // Dynamic interpolation for slider
  const getMetricsAtTau = (tau) => {
    let closest = thresholdPoints[0];
    let minDiff = 999;
    thresholdPoints.forEach(p => {
      const diff = Math.abs(p.t - tau);
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
    });
    return closest;
  };

  const curMetrics = getMetricsAtTau(threshold);

  // SVG Chart Geometry
  const chartW = 720;
  const chartH = 200;
  const pad = { top: 20, right: 30, bottom: 35, left: 65 };
  const innerW = chartW - pad.left - pad.right;
  const innerH = chartH - pad.top - pad.bottom;

  const minSav = 100000;
  const maxSav = 600000;

  const scaleX = (t) => pad.left + ((t - 0.08) / (0.70 - 0.08)) * innerW;
  const scaleY = (s) => pad.top + innerH - ((s - minSav) / (maxSav - minSav)) * innerH;

  const lineD = thresholdPoints.reduce((acc, p, idx) => {
    const x = scaleX(p.t);
    const y = scaleY(p.savings);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Live simulator logic
  const calculateSimProbability = () => {
    if (selectedProfile === 'high_risk') return 0.7595;
    if (selectedProfile === 'loyal') return 0.0241;
    if (selectedProfile === 'borderline') return 0.3842;
    
    // Custom calculation
    let p = 0.25;
    if (simContract === 'Month-to-month') p += 0.28;
    if (simContract === 'One year') p -= 0.08;
    if (simContract === 'Two year') p -= 0.18;
    if (simPayment === 'Electronic check') p += 0.14;
    if (simTenure < 6) p += 0.16;
    else if (simTenure > 36) p -= 0.18;
    if (simMonthly > 80) p += 0.10;
    else if (simMonthly < 40) p -= 0.08;
    return Math.max(0.01, Math.min(0.95, p));
  };

  const simProb = calculateSimProbability();
  const simAction = simProb >= threshold;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      border: '1.5px solid #c2d4f2',
      padding: '2rem',
      color: '#0f172a',
      margin: '2.5rem 0 2rem 0',
      boxShadow: '0 8px 32px rgba(0, 31, 84, 0.06)'
    }}>
      {/* STUDIO HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0edff', border: '1px solid #93c5fd', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#001f54', marginBottom: '0.5rem' }}>
            Interactive Studio - Chapter 8.6
          </div>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#001f54', letterSpacing: '-0.02em' }}>
            Model Evaluation, Packaging & Model Card Studio
          </h3>
          <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.9rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Optimize asymmetric decision thresholds for peak financial return, inspect the enterprise Model Card, verify production joblib bundle encapsulation, and execute live smoke tests.
          </p>
        </div>

        {/* TABS (ZERO EMOJIS) */}
        <div style={{ display: 'flex', background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '0.25rem', gap: '0.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'threshold_lab', label: 'Threshold & Profit Lab' },
            { id: 'model_card', label: 'Production Model Card' },
            { id: 'packaging', label: 'Artifact Packaging' },
            { id: 'inference_sim', label: 'Inference Smoke Simulator' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#001f54' : 'transparent',
                  color: isActive ? '#ffffff' : '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 31, 84, 0.2)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: THRESHOLD & PROFIT OPTIMIZATION LAB
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'threshold_lab' && (
        <div>
          {/* Top Control Strip */}
          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Decision Boundary Optimization
                </span>
                <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                  Classification Threshold vs Retention Savings Ledger
                </h4>
              </div>

              {/* Threshold Preset Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setThreshold(0.22)}
                  style={{
                    background: threshold === 0.22 ? '#001f54' : '#f8fafc',
                    color: threshold === 0.22 ? '#ffffff' : '#001f54',
                    border: '1.5px solid #001f54',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  [OPTIMAL] tau* = 0.22
                </button>
                <button
                  onClick={() => setThreshold(0.50)}
                  style={{
                    background: threshold === 0.50 ? '#001f54' : '#f8fafc',
                    color: threshold === 0.50 ? '#ffffff' : '#475569',
                    border: '1px solid #cbd5e1',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  [DEFAULT] tau = 0.50
                </button>
              </div>
            </div>

            {/* Slider Control */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                  Active Classification Threshold (tau): <strong style={{ color: '#001f54', fontSize: '1.1rem' }}>{threshold.toFixed(2)}</strong>
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Customers Flagged for Offer: <strong>{(curMetrics.flagged * 100).toFixed(1)}%</strong> ({curMetrics.tp + curMetrics.fp} / 1,409)
                </span>
              </div>
              <input
                type="range"
                min="0.08"
                max="0.70"
                step="0.02"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                style={{ width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: '#001f54' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                <span>0.08 (Aggressive Recall)</span>
                <span style={{ color: '#15803d', fontWeight: 800 }}>0.22 (Profit Peak)</span>
                <span>0.50 (Standard Default)</span>
                <span>0.70 (Conservative Precision)</span>
              </div>
            </div>

            {/* SVG PROFIT CURVE */}
            <div style={{ width: '100%', overflowX: 'auto', marginBottom: '1rem' }}>
              <svg width="100%" height="200" viewBox="0 0 720 200" style={{ display: 'block', minWidth: '600px' }}>
                <rect x="65" y="20" width="625" height="145" fill="#f8fafc" rx="8" />

                {/* Y Axis Grid Lines */}
                {[100, 200, 300, 400, 500, 600].map(k => {
                  const y = scaleY(k * 1000);
                  return (
                    <g key={k}>
                      <line x1="65" y1={y} x2="690" y2={y} stroke="#e2e8f0" strokeWidth="1" />
                      <text x="58" y={y + 4} textAnchor="end" fontSize="10" fontWeight="700" fill="#64748b">
                        ${k}k
                      </text>
                    </g>
                  );
                })}

                <text x="22" y="95" textAnchor="middle" transform="rotate(-90 22 95)" fontSize="10" fontWeight="800" fill="#475569">
                  NET SAVINGS ($)
                </text>

                {/* Profit Area Gradient & Curve */}
                <path d={lineD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

                {/* Markers for Key Points */}
                {thresholdPoints.map((p, i) => {
                  const cx = scaleX(p.t);
                  const cy = scaleY(p.savings);
                  const isSel = Math.abs(p.t - threshold) < 0.015;
                  return (
                    <g key={i}>
                      {isSel && (
                        <circle cx={cx} cy={cy} r="8" fill="rgba(37,99,235,0.25)" />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSel ? '5' : p.isOptimalBalanced ? '4.5' : '3'}
                        fill={isSel ? '#001f54' : p.isOptimalBalanced ? '#15803d' : '#93c5fd'}
                        stroke={isSel ? '#ffffff' : '#1e40af'}
                        strokeWidth={isSel ? '2' : '1'}
                      />
                    </g>
                  );
                })}

                {/* Vertical Active Line */}
                {(() => {
                  const x = scaleX(threshold);
                  return (
                    <line x1={x} y1="20" x2={x} y2="165" stroke="#001f54" strokeWidth="1.5" strokeDasharray="3 3" />
                  );
                })()}

                {/* X Axis Labels */}
                {[0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70].map(tick => {
                  const x = scaleX(tick);
                  return (
                    <text key={tick} x={x} y="182" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">
                      tau = {tick.toFixed(2)}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* 2x2 Grid: Confusion Matrix & Financial Ledger */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {/* 2x2 Confusion Matrix */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                Holdout Confusion Matrix (N = 1,409) at tau = {threshold.toFixed(2)}
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', display: 'block' }}>True Negative (TN)</span>
                  <strong style={{ fontSize: '1.5rem', color: '#14532d', display: 'block', margin: '0.2rem 0' }}>{curMetrics.tn}</strong>
                  <span style={{ fontSize: '0.72rem', color: '#166534' }}>Correct Loyal Predictions</span>
                </div>

                <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', display: 'block' }}>False Positive (FP)</span>
                  <strong style={{ fontSize: '1.5rem', color: '#78350f', display: 'block', margin: '0.2rem 0' }}>{curMetrics.fp}</strong>
                  <span style={{ fontSize: '0.72rem', color: '#92400e' }}>Wasted $100 Vouchers</span>
                </div>

                <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', display: 'block' }}>False Negative (FN)</span>
                  <strong style={{ fontSize: '1.5rem', color: '#991b1b', display: 'block', margin: '0.2rem 0' }}>{curMetrics.fn}</strong>
                  <span style={{ fontSize: '0.72rem', color: '#b91c1c' }}>Missed Churners (-$1,200 LTV)</span>
                </div>

                <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', display: 'block' }}>True Positive (TP)</span>
                  <strong style={{ fontSize: '1.5rem', color: '#1e3a8a', display: 'block', margin: '0.2rem 0' }}>{curMetrics.tp}</strong>
                  <span style={{ fontSize: '0.72rem', color: '#1e40af' }}>Saved Churners (+$500 Net)</span>
                </div>
              </div>

              {/* Ratios */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem', textAlign: 'center' }}>
                <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>RECALL</span>
                  <strong style={{ color: '#001f54', fontSize: '0.95rem' }}>{(curMetrics.recall * 100).toFixed(1)}%</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>PRECISION</span>
                  <strong style={{ color: '#001f54', fontSize: '0.95rem' }}>{(curMetrics.precision * 100).toFixed(1)}%</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>F1-SCORE</span>
                  <strong style={{ color: '#001f54', fontSize: '0.95rem' }}>{curMetrics.f1.toFixed(3)}</strong>
                </div>
              </div>
            </div>

            {/* Financial Ledger */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Executive P&L Payoff Ledger
                </span>

                <div style={{ fontSize: '0.82rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>True Positive Benefit ({curMetrics.tp} x +$500):</span>
                    <strong style={{ color: '#15803d' }}>+${(curMetrics.tp * 500).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>False Positive Expense ({curMetrics.fp} x -$100):</span>
                    <strong style={{ color: '#b45309' }}>-${(curMetrics.fp * 100).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>False Negative Losses ({curMetrics.fn} x -$1,200):</span>
                    <strong style={{ color: '#dc2626' }}>-${(curMetrics.fn * 1200).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Do-Nothing Baseline Loss (374 x -$1,200):</span>
                    <span>-$448,800</span>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '1rem', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                  Net Financial Savings vs Baseline
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.25rem 0' }}>
                  <strong style={{ fontSize: '1.8rem', color: '#14532d', fontWeight: 900 }}>
                    +${curMetrics.savings.toLocaleString()}
                  </strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#166534' }}>
                  {threshold === 0.22 ? (
                    <span><strong>Peak Balanced Lift:</strong> +$178,800 higher annual savings than default tau = 0.50!</span>
                  ) : threshold === 0.50 ? (
                    <span style={{ color: '#b45309' }}><strong>Sub-optimal:</strong> Default threshold misses 182 churners, leaving $178k in unmitigated loss.</span>
                  ) : (
                    <span>Threshold shift captures {curMetrics.tp} out of 374 churners with {(curMetrics.precision * 100).toFixed(0)}% precision.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: PRODUCTION MODEL CARD (Mitchell et al. Standard)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'model_card' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          {/* Sub-Section Navigation */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
            {[
              { id: 'details', label: '1. Model Details & Intended Use' },
              { id: 'performance', label: '2. Quantitative Benchmarks' },
              { id: 'fairness', label: '3. Subgroup Fairness & Bias Audit' },
              { id: 'limitations', label: '4. Caveats & Production Guardrails' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setCardSection(sec.id)}
                style={{
                  background: cardSection === sec.id ? '#001f54' : '#ffffff',
                  border: cardSection === sec.id ? '1.5px solid #001f54' : '1px solid #cbd5e1',
                  color: cardSection === sec.id ? '#ffffff' : '#334155',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Section 1: Details & Intended Use */}
          {cardSection === 'details' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Model Identity</span>
                  <strong style={{ color: '#001f54', fontSize: '1rem', display: 'block' }}>Telco Churn Gradient Boosting Champion</strong>
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>Version: 1.0.0 | Release: Q3 Production Pipeline</span>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Framework & Architecture</span>
                  <strong style={{ color: '#001f54', fontSize: '1rem', display: 'block' }}>Scikit-Learn 1.4+ / Python 3.11</strong>
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>210 Trees, Shrinkage=0.0293, Subsample=0.60</span>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Artifact Specification</span>
                  <strong style={{ color: '#001f54', fontSize: '1rem', display: 'block' }}>telco_churn_pipeline.joblib</strong>
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>90.0 KB (SHA-256: 909c7be7...)</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '1rem' }}>
                  <strong style={{ color: '#15803d', fontSize: '0.88rem', display: 'block', marginBottom: '0.35rem' }}>[PERMITTED INTENDED USE]</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#14532d', lineHeight: 1.6 }}>
                    <li>Proactive retention offer assignment ($100 promotional credit).</li>
                    <li>Automated batch risk scoring on monthly billing cycles.</li>
                    <li>Customer success outbound contact queuing for high-risk accounts.</li>
                  </ul>
                </div>

                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', padding: '1rem' }}>
                  <strong style={{ color: '#b91c1c', fontSize: '0.88rem', display: 'block', marginBottom: '0.35rem' }}>[STRICTLY OUT-OF-SCOPE USES]</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#7f1d1d', lineHeight: 1.6 }}>
                    <li>Credit scoring or financial lending underwriting decisions.</li>
                    <li>Automated account termination or punitive rate throttling.</li>
                    <li>Deployment on non-telecom B2B multi-tenant enterprise billing datasets.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Quantitative Benchmarks */}
          {cardSection === 'performance' && (
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Audited Performance on 1,409 Pristine Holdout Test Subscribers
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>HOLDOUT ROC-AUC</span>
                  <strong style={{ fontSize: '1.4rem', color: '#001f54' }}>0.8486</strong>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', display: 'block' }}>+0.0060 vs Default</span>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>HOLDOUT PR-AUC</span>
                  <strong style={{ fontSize: '1.4rem', color: '#001f54' }}>0.6688</strong>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', display: 'block' }}>2.52x above random floor</span>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>BRIER SCORE</span>
                  <strong style={{ fontSize: '1.4rem', color: '#001f54' }}>0.1344</strong>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', display: 'block' }}>Strong Calibration</span>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>LOG LOSS</span>
                  <strong style={{ fontSize: '1.4rem', color: '#001f54' }}>0.4135</strong>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Holdout Cross-Entropy</span>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>OVERFIT GAP</span>
                  <strong style={{ fontSize: '1.4rem', color: '#15803d' }}>0.0232</strong>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', display: 'block' }}>Within 0.030 tolerance</span>
                </div>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '10px', padding: '1rem', fontSize: '0.82rem', color: '#1e40af', lineHeight: 1.6 }}>
                <strong>Verification Summary: </strong>
                All metrics derived from a single execution pass on untouched holdout records. The tight overfitting gap of 0.0232 proves that stochastic subsampling (0.60) and conservative shrinkage (0.0293) successfully mitigated leaf memorization.
              </div>
            </div>
          )}

          {/* Section 3: Subgroup Fairness & Bias Audit */}
          {cardSection === 'fairness' && (
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Demographic Parity & Error Rate Disparity Audit (Four-Fifths 80% Rule)
              </span>

              <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.6rem', color: '#001f54' }}>Subgroup Slice</th>
                      <th style={{ padding: '0.6rem', color: '#001f54' }}>Sample Size (N)</th>
                      <th style={{ padding: '0.6rem', color: '#001f54' }}>True Churn Rate</th>
                      <th style={{ padding: '0.6rem', color: '#001f54' }}>Selection Rate</th>
                      <th style={{ padding: '0.6rem', color: '#001f54' }}>Recall (TPR)</th>
                      <th style={{ padding: '0.6rem', color: '#001f54' }}>Disparate Impact</th>
                      <th style={{ padding: '0.6rem', color: '#001f54' }}>Compliance Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.6rem', fontWeight: 700 }}>Male vs Female</td>
                      <td style={{ padding: '0.6rem' }}>722 vs 687</td>
                      <td style={{ padding: '0.6rem' }}>25.1% vs 28.1%</td>
                      <td style={{ padding: '0.6rem' }}>44.3% vs 43.5%</td>
                      <td style={{ padding: '0.6rem' }}>84.5% vs 81.3%</td>
                      <td style={{ padding: '0.6rem', fontWeight: 800, color: '#15803d' }}>0.982</td>
                      <td style={{ padding: '0.6rem' }}><span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>[COMPLIANT]</span></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.6rem', fontWeight: 700 }}>Non-Senior vs Senior</td>
                      <td style={{ padding: '0.6rem' }}>1,187 vs 222</td>
                      <td style={{ padding: '0.6rem' }}>23.3% vs 44.1%</td>
                      <td style={{ padding: '0.6rem' }}>38.9% vs 70.7%</td>
                      <td style={{ padding: '0.6rem' }}>78.6% vs 94.9%</td>
                      <td style={{ padding: '0.6rem', fontWeight: 800, color: '#b45309' }}>0.550</td>
                      <td style={{ padding: '0.6rem' }}><span style={{ background: '#fef3c7', color: '#b45309', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>[FLAGGED]</span></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.6rem', fontWeight: 700 }}>Partner: Yes vs No</td>
                      <td style={{ padding: '0.6rem' }}>673 vs 736</td>
                      <td style={{ padding: '0.6rem' }}>18.7% vs 33.7%</td>
                      <td style={{ padding: '0.6rem' }}>31.1% vs 55.7%</td>
                      <td style={{ padding: '0.6rem' }}>74.6% vs 87.1%</td>
                      <td style={{ padding: '0.6rem', fontWeight: 800, color: '#b45309' }}>0.557</td>
                      <td style={{ padding: '0.6rem' }}><span style={{ background: '#fef3c7', color: '#b45309', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>[FLAGGED]</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem', fontSize: '0.82rem', color: '#78350f', lineHeight: 1.6 }}>
                <strong>Fairness Root Cause & Mitigation: </strong>
                While gender is perfectly balanced (DI = 0.982), Senior Citizens trigger a statistical flag (DI = 0.550) because their ground-truth churn rate is nearly double (44.1% vs 23.3%), largely driven by digital billing friction. Because retention offers are strictly beneficial (discounts, not penalties), higher selection is pro-consumer. Mitigation: Ensure retention offers for senior citizens include dedicated phone support rather than purely digital voucher redemption.
              </div>
            </div>
          )}

          {/* Section 4: Limitations & Production Guardrails */}
          {cardSection === 'limitations' && (
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Operational Vulnerabilities, Drift Monitoring & Lifespan
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <strong style={{ color: '#001f54', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                    1. Electronic Check Payment Vulnerability
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.55 }}>
                    The engineered interaction flag <code>IsHighRiskCombo</code> heavily weights paperless electronic checks. If billing infrastructure transitions to automatic ACH, model scores will artificially drop unless retrained.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <strong style={{ color: '#001f54', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                    2. Concept Drift & Competitive Market Shifts
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.55 }}>
                    Competitor 5G fiber price cuts alter subscriber sensitivity without changing underlying demographic features. Weekly Population Stability Index (PSI) monitoring is required; trigger retraining if PSI &gt; 0.20.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <strong style={{ color: '#001f54', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                    3. Recalibration & Retraining Cadence
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.55 }}>
                    Model weights expire after 90 days of production serving. Scheduled monthly automated pipeline execution with rolling 12-month training windows prevents stale parameter degradation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: ARTIFACT PACKAGING & INTEGRITY INSPECTOR
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'packaging' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pipeline Encapsulation & Integrity Audit
              </span>
              <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                telco_churn_pipeline.joblib: Atomic Production Artifact
              </h4>
            </div>
            <span style={{ background: '#e0edff', color: '#001f54', border: '1px solid #93c5fd', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800 }}>
              Compressed Size: 90.0 KB
            </span>
          </div>

          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.55 }}>
            Never deploy a raw model object in isolation! In real production systems, the serialized artifact must encapsulate feature engineering, imputation, one-hot encoding categories, and classifier weights in one unified DAG.
          </p>

          {/* Exploded Bundle DAG */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Step 1</span>
              <strong style={{ color: '#001f54', fontSize: '0.95rem', display: 'block' }}>FunctionTransformer</strong>
              <span style={{ fontSize: '0.78rem', color: '#334155' }}><code>engineer_features</code></span>
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4 }}>
                Computes ChargeRatio, TotalServices sum, and HighRiskCombo flags dynamically on raw inputs.
              </div>
            </div>

            <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Step 2</span>
              <strong style={{ color: '#1e3a8a', fontSize: '0.95rem', display: 'block' }}>ColumnTransformer</strong>
              <span style={{ fontSize: '0.78rem', color: '#1e40af' }}>Numeric + Categorical Branches</span>
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#1d4ed8', lineHeight: 1.4 }}>
                Stores fitted median values, standard scaler mean/std vectors, and 27 OneHot dummy category bins.
              </div>
            </div>

            <div style={{ background: '#fdf4ff', border: '1.5px solid #f0abfc', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#86198f', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Step 3</span>
              <strong style={{ color: '#701a75', fontSize: '0.95rem', display: 'block' }}>GradientBoosting</strong>
              <span style={{ fontSize: '0.78rem', color: '#86198f' }}>210 Fitted Stumps</span>
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#701a75', lineHeight: 1.4 }}>
                Sequential tree ensemble with leaf values and threshold boundaries optimized via Optuna TPE.
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Output</span>
              <strong style={{ color: '#14532d', fontSize: '0.95rem', display: 'block' }}>Atomic Serving Artifact</strong>
              <span style={{ fontSize: '0.78rem', color: '#15803d' }}>Zero Preprocessing Needed</span>
              <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#166534', lineHeight: 1.4 }}>
                Accepts raw JSON dictionary payloads directly from FastAPI endpoints without client transformations.
              </div>
            </div>
          </div>

          {/* Security & Checksum Checklist */}
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                Artifact Security & Reproducibility Lockfile
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>joblib.dump(compress=3)</span>
            </div>
            <div style={{ fontFamily: 'Consolas, Monaco, monospace', fontSize: '0.8rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>SHA-256 Checksum: <strong style={{ color: '#34d399' }}>909c7be727d9b4d733dc2a262945d239900cc76cc4c62129cdeb5c6046255627</strong></div>
              <div>Runtime Environment: <strong>Python 3.11.9 (amd64)</strong> | Scikit-Learn: <strong>1.4.2</strong> | Joblib: <strong>1.3.2</strong></div>
              <div>Security Advisory: <strong>Pickle artifacts execute arbitrary bytecode upon deserialization. Only load artifacts from verified internal S3 / GCS buckets with cryptographic signature checks.</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: LIVE INFERENCE SMOKE TEST SIMULATOR
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'inference_sim' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,31,84,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Round-Trip Smoke Test Harness
              </span>
              <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                Simulating Raw JSON Payloads Against the Deserialized Pipeline
              </h4>
            </div>
            <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #86efac', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800 }}>
              Decision Cutoff: tau* = {threshold.toFixed(2)}
            </span>
          </div>

          <p style={{ margin: '0 0 1.25rem 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.55 }}>
            Test raw, un-preprocessed subscriber profiles with string columns and unscaled numbers to confirm that the packaged pipeline executes feature extraction, column routing, and prediction automatically.
          </p>

          {/* Profile Picker Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { id: 'high_risk', label: 'Payload 1: High-Risk Fiber Customer' },
              { id: 'loyal', label: 'Payload 2: Loyal 2-Year DSL VIP' },
              { id: 'borderline', label: 'Payload 3: Borderline Mid-Tenure Account' },
              { id: 'custom', label: 'Interactive Custom Payload' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProfile(p.id)}
                style={{
                  background: selectedProfile === p.id ? '#001f54' : '#ffffff',
                  border: selectedProfile === p.id ? '1.5px solid #001f54' : '1px solid #cbd5e1',
                  color: selectedProfile === p.id ? '#ffffff' : '#334155',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Simulator Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {/* Left: Input Payload Preview */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Incoming Unprocessed JSON Dictionary
              </span>

              {selectedProfile === 'custom' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#475569', fontWeight: 700, marginBottom: '0.2rem' }}>
                      tenure: {simTenure} months
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="72"
                      value={simTenure}
                      onChange={(e) => setSimTenure(parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: '#001f54' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#475569', fontWeight: 700, marginBottom: '0.2rem' }}>
                      MonthlyCharges: ${simMonthly.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="18"
                      max="120"
                      value={simMonthly}
                      onChange={(e) => setSimMonthly(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: '#001f54' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#475569', fontWeight: 700, marginBottom: '0.2rem' }}>
                      Contract
                    </label>
                    <select
                      value={simContract}
                      onChange={(e) => setSimContract(e.target.value)}
                      style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="Month-to-month">Month-to-month</option>
                      <option value="One year">One year</option>
                      <option value="Two year">Two year</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#475569', fontWeight: 700, marginBottom: '0.2rem' }}>
                      PaymentMethod
                    </label>
                    <select
                      value={simPayment}
                      onChange={(e) => setSimPayment(e.target.value)}
                      style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="Electronic check">Electronic check</option>
                      <option value="Mailed check">Mailed check</option>
                      <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                      <option value="Credit card (automatic)">Credit card (automatic)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <pre style={{ margin: 0, background: '#0f172a', color: '#7dd3fc', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', fontFamily: 'Consolas, monospace', overflowX: 'auto', lineHeight: 1.5 }}>
{selectedProfile === 'high_risk' ? `{
  "gender": "Female",
  "SeniorCitizen": 0,
  "tenure": 2,
  "Contract": "Month-to-month",
  "InternetService": "Fiber optic",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 89.50,
  "TotalCharges": 179.00
}` : selectedProfile === 'loyal' ? `{
  "gender": "Male",
  "SeniorCitizen": 0,
  "tenure": 68,
  "Contract": "Two year",
  "InternetService": "DSL",
  "PaymentMethod": "Bank transfer",
  "MonthlyCharges": 44.20,
  "TotalCharges": 3005.60
}` : `{
  "gender": "Female",
  "SeniorCitizen": 1,
  "tenure": 14,
  "Contract": "Month-to-month",
  "InternetService": "DSL",
  "PaymentMethod": "Credit card",
  "MonthlyCharges": 65.40,
  "TotalCharges": 915.60
}`}
                </pre>
              )}
            </div>

            {/* Right: Real-Time Prediction & Automated Retention Decision */}
            <div style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  Pipeline Inference Response
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
                  <strong style={{ fontSize: '2.4rem', color: simAction ? '#dc2626' : '#15803d', fontWeight: 900 }}>
                    {(simProb * 100).toFixed(1)}%
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Estimated Churn Probability</span>
                </div>

                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                  <div style={{ width: `${Math.min(100, simProb * 100)}%`, height: '100%', background: simAction ? '#dc2626' : '#15803d', borderRadius: '4px' }} />
                </div>

                <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div>Decision Cutoff: <strong>tau = {threshold.toFixed(2)}</strong></div>
                  <div>Risk Category: <strong style={{ color: simProb >= 0.60 ? '#dc2626' : simProb >= 0.22 ? '#b45309' : '#15803d' }}>
                    {simProb >= 0.60 ? 'CRITICAL HIGH RISK' : simProb >= 0.22 ? 'MODERATE RETENTION RISK' : 'LOW RISK LOYAL'}
                  </strong></div>
                </div>
              </div>

              {/* Automated Business Decision Banner */}
              <div style={{
                background: simAction ? '#fef2f2' : '#f0fdf4',
                border: simAction ? '1.5px solid #fca5a5' : '1.5px solid #86efac',
                borderRadius: '10px',
                padding: '1rem',
                marginTop: '1.25rem'
              }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: simAction ? '#dc2626' : '#15803d', textTransform: 'uppercase', display: 'block' }}>
                  Automated CRM Business Action
                </span>
                <strong style={{ fontSize: '1.05rem', color: simAction ? '#991b1b' : '#14532d', display: 'block', margin: '0.2rem 0' }}>
                  {simAction ? 'OFFER $100 RETENTION VOUCHER' : 'STANDARD ACCOUNT SERVICING'}
                </strong>
                <p style={{ margin: 0, fontSize: '0.78rem', color: simAction ? '#7f1d1d' : '#166534', lineHeight: 1.45 }}>
                  {simAction
                    ? `Subscriber exceeds threshold (${(simProb * 100).toFixed(1)}% >= ${(threshold * 100).toFixed(0)}%). Automated promotional discount applied to protect $1,200 lifetime customer value.`
                    : `Subscriber below risk threshold (${(simProb * 100).toFixed(1)}% < ${(threshold * 100).toFixed(0)}%). Zero promotional voucher expenditure required.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 8.7: PRODUCTION SERVING, FASTAPI & ROI AUDIT STUDIO
// ─────────────────────────────────────────────────────────────────────────────
export function ProductionServingStudio() {
  const [activeTab, setActiveTab] = useState('api_console');
  
  // API Console State
  const [endpoint, setEndpoint] = useState('predict_single');
  const [payloadPreset, setPayloadPreset] = useState('high_risk');
  const [customJson, setCustomJson] = useState(JSON.stringify({
    gender: "Female",
    SeniorCitizen: 0,
    Partner: "No",
    Dependents: "No",
    tenure: 2.0,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 89.50,
    TotalCharges: 179.00
  }, null, 2));
  const [apiResponse, setApiResponse] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiLatency, setApiLatency] = useState(8.2);

  // Preset loaders
  const handleSelectPreset = (presetKey) => {
    setPayloadPreset(presetKey);
    if (presetKey === 'high_risk') {
      setCustomJson(JSON.stringify({
        gender: "Female",
        SeniorCitizen: 0,
        Partner: "No",
        Dependents: "No",
        tenure: 2.0,
        PhoneService: "Yes",
        MultipleLines: "No",
        InternetService: "Fiber optic",
        OnlineSecurity: "No",
        OnlineBackup: "No",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "No",
        StreamingMovies: "No",
        Contract: "Month-to-month",
        PaperlessBilling: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 89.50,
        TotalCharges: 179.00
      }, null, 2));
    } else if (presetKey === 'low_risk') {
      setCustomJson(JSON.stringify({
        gender: "Male",
        SeniorCitizen: 0,
        Partner: "Yes",
        Dependents: "Yes",
        tenure: 65.0,
        PhoneService: "Yes",
        MultipleLines: "Yes",
        InternetService: "DSL",
        OnlineSecurity: "Yes",
        OnlineBackup: "Yes",
        DeviceProtection: "Yes",
        TechSupport: "Yes",
        StreamingTV: "No",
        StreamingMovies: "No",
        Contract: "Two year",
        PaperlessBilling: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 64.00,
        TotalCharges: 4160.00
      }, null, 2));
    } else if (presetKey === 'validation_error') {
      setCustomJson(JSON.stringify({
        gender: "Female",
        SeniorCitizen: 99, // INVALID: exceeds le=1 constraint
        tenure: -5.0,     // INVALID: ge=0 constraint violated
        MonthlyCharges: "eighty-nine" // INVALID: float expected
      }, null, 2));
    }
  };

  const handleSendRequest = () => {
    setApiLoading(true);
    setTimeout(() => {
      setApiLoading(false);
      if (endpoint === 'health') {
        setApiLatency(1.4);
        setApiResponse({
          status: 200,
          statusText: "OK",
          headers: {
            "content-type": "application/json",
            "server": "uvicorn",
            "x-response-time": "1.42ms"
          },
          data: {
            status: "healthy",
            service: "telco-churn-inference-api",
            model_version: "1.0.0",
            artifact_sha256: "909c7be727d9b4d733dc2a262945d239900cc76cc4c62129cdeb5c6046255627",
            decision_threshold: 0.22,
            environment: "production",
            uptime_seconds: 48920
          }
        });
      } else if (endpoint === 'predict_batch') {
        setApiLatency(35.2);
        setApiResponse({
          status: 200,
          statusText: "OK",
          headers: {
            "content-type": "application/json",
            "server": "uvicorn",
            "x-response-time": "35.23ms"
          },
          data: {
            total_processed: 50,
            flagged_for_retention: 25,
            decision_threshold: 0.22,
            batch_latency_ms: 35.23,
            per_customer_latency_ms: 0.70,
            summary: "Processed 50 customer profiles. Vectorized Scikit-Learn pipeline achieved 1,428 requests/sec throughput.",
            sample_predictions: [
              { id: "cust_001", prob: 0.7326, flag: true, risk: "CRITICAL_HIGH_RISK", action: "OFFER_$100_RETENTION_VOUCHER" },
              { id: "cust_002", prob: 0.0243, flag: false, risk: "LOW_RISK", action: "STANDARD_BILLING_NO_INTERVENTION" },
              { id: "cust_003", prob: 0.6841, flag: true, risk: "CRITICAL_HIGH_RISK", action: "OFFER_$100_RETENTION_VOUCHER" }
            ]
          }
        });
      } else {
        // Single prediction
        try {
          const parsed = JSON.parse(customJson);
          if (parsed.SeniorCitizen === 99 || parsed.tenure < 0 || typeof parsed.MonthlyCharges === 'string') {
            setApiLatency(2.1);
            setApiResponse({
              status: 422,
              statusText: "Unprocessable Entity",
              headers: {
                "content-type": "application/json",
                "server": "uvicorn",
                "x-response-time": "2.10ms"
              },
              data: {
                detail: [
                  { loc: ["body", "SeniorCitizen"], msg: "Input should be less than or equal to 1", type: "less_than_equal" },
                  { loc: ["body", "tenure"], msg: "Input should be greater than or equal to 0", type: "greater_than_equal" }
                ]
              }
            });
          } else if (payloadPreset === 'low_risk' || (parsed.tenure > 30 && parsed.Contract !== 'Month-to-month')) {
            setApiLatency(7.8);
            setApiResponse({
              status: 200,
              statusText: "OK",
              headers: {
                "content-type": "application/json",
                "server": "uvicorn",
                "x-response-time": "7.84ms"
              },
              data: {
                churn_probability: 0.0243,
                churn_prediction: false,
                risk_category: "LOW_RISK",
                decision_threshold: 0.22,
                retention_action: "STANDARD_BILLING_NO_INTERVENTION",
                latency_ms: 7.84
              }
            });
          } else {
            setApiLatency(8.2);
            setApiResponse({
              status: 200,
              statusText: "OK",
              headers: {
                "content-type": "application/json",
                "server": "uvicorn",
                "x-response-time": "8.21ms"
              },
              data: {
                churn_probability: 0.7326,
                churn_prediction: true,
                risk_category: "CRITICAL_HIGH_RISK",
                decision_threshold: 0.22,
                retention_action: "OFFER_$100_RETENTION_VOUCHER_AND_EXPEDITE_PHONE_SUPPORT",
                latency_ms: 8.21
              }
            });
          }
        } catch (e) {
          setApiLatency(1.0);
          setApiResponse({
            status: 400,
            statusText: "Bad Request",
            headers: { "content-type": "application/json" },
            data: { detail: "Malformed JSON payload in request body." }
          });
        }
      }
    }, 400);
  };

  // Data Drift State
  const [driftFeature, setDriftFeature] = useState('Contract');
  const driftFeatures = {
    Contract: {
      name: 'Contract Type',
      type: 'Categorical',
      psi: 0.3040,
      status: 'SIGNIFICANT_DRIFT',
      statusTag: '[CRITICAL DRIFT - RETRAIN REQUIRED]',
      color: '#dc2626',
      baseline: [
        { label: 'Month-to-month', pct: 55.0 },
        { label: 'One year', pct: 20.9 },
        { label: 'Two year', pct: 24.1 }
      ],
      production: [
        { label: 'Month-to-month', pct: 78.0 },
        { label: 'One year', pct: 14.0 },
        { label: 'Two year', pct: 8.0 }
      ],
      rootCause: 'Aggressive marketing campaign by a competing regional provider triggered a surge in short-term contract adoption (55% -> 78%). Churn risk distribution has materially shifted.'
    },
    tenure: {
      name: 'Tenure (Months)',
      type: 'Continuous',
      psi: 0.1420,
      status: 'MODERATE_SHIFT',
      statusTag: '[MODERATE SHIFT - INVESTIGATE]',
      color: '#d97706',
      baseline: [
        { label: '0-12m', pct: 30.9 },
        { label: '13-24m', pct: 14.5 },
        { label: '25-48m', pct: 22.6 },
        { label: '49-72m', pct: 32.0 }
      ],
      production: [
        { label: '0-12m', pct: 46.2 },
        { label: '13-24m', pct: 18.1 },
        { label: '25-48m', pct: 18.5 },
        { label: '49-72m', pct: 17.2 }
      ],
      rootCause: 'Rapid customer acquisition in Q2 skewed the customer base toward early-tenure subscribers with unestablished retention profiles.'
    },
    MonthlyCharges: {
      name: 'Monthly Charges ($)',
      type: 'Continuous',
      psi: 0.0068,
      status: 'STABLE',
      statusTag: '[STABLE - NO ACTION]',
      color: '#16a34a',
      baseline: [
        { label: '$18-35', pct: 26.5 },
        { label: '$36-65', pct: 19.8 },
        { label: '$66-90', pct: 32.2 },
        { label: '$91-120', pct: 21.5 }
      ],
      production: [
        { label: '$18-35', pct: 25.8 },
        { label: '$36-65', pct: 20.1 },
        { label: '$66-90', pct: 32.5 },
        { label: '$91-120', pct: 21.6 }
      ],
      rootCause: 'Pricing tiers and bill amounts remain in lockstep with the training baseline distribution. Zero covariate drift detected.'
    }
  };

  // ROI Calculator State
  const [subscribers, setSubscribers] = useState(10000);
  const [voucherCost, setVoucherCost] = useState(100);
  const [ltv, setLtv] = useState(1200);
  const [acceptanceRate, setAcceptanceRate] = useState(60);

  // ROI Calculations
  const churnRate = 0.2654;
  const churnersAtRisk = Math.round(subscribers * churnRate);
  
  // Model stats at tau* = 0.22 (Recall 82.89%, Precision 50.08%)
  const modelTP = Math.round(churnersAtRisk * 0.8289);
  const modelFP = Math.round(modelTP * (1 - 0.5008) / 0.5008);
  const totalVouchersIssued = modelTP + modelFP;
  
  // Net Financial Ledger
  const savedChurners = Math.round(modelTP * (acceptanceRate / 100));
  const grossSavedRevenue = savedChurners * ltv;
  const totalVoucherExpense = totalVouchersIssued * voucherCost;
  const netRetainedProfit = grossSavedRevenue - totalVoucherExpense;
  const roiPercent = totalVoucherExpense > 0 ? (netRetainedProfit / totalVoucherExpense) * 100 : 0;
  
  // Contrast with default tau = 0.50 (Recall 51.34%, Precision 68.57%)
  const defTP = Math.round(churnersAtRisk * 0.5134);
  const defFP = Math.round(defTP * (1 - 0.6857) / 0.6857);
  const defSaved = Math.round(defTP * (acceptanceRate / 100));
  const defNet = (defSaved * ltv) - ((defTP + defFP) * voucherCost);
  const incrementalLift = netRetainedProfit - defNet;

  return (
    <div style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafd 100%)',
      border: '1.5px solid #c2d4f2',
      borderRadius: '20px',
      padding: '2rem',
      margin: '2rem 0 3rem 0',
      boxShadow: '0 12px 36px rgba(0, 31, 84, 0.06)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{ background: '#e0edff', color: '#001f54', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Interactive Studio · Chapter 8.7
            </span>
            <span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
              [FASTAPI REST ONLINE]
            </span>
          </div>
          <h3 style={{ margin: 0, color: '#001f54', fontSize: '1.6rem', fontWeight: 900 }}>
            Production Serving, FastAPI &amp; ROI Audit Studio
          </h3>
          <p style={{ margin: '0.35rem 0 0 0', color: '#475569', fontSize: '0.9rem', maxWidth: '820px' }}>
            Inspect the live FastAPI REST microservice, simulate real-time single and batch prediction payloads, analyze feature covariate drift with Population Stability Index (PSI), and calculate the annual retention P&amp;L ledger.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.3rem', borderRadius: '10px', gap: '0.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'api_console', label: 'FastAPI REST Console' },
            { id: 'drift_radar', label: 'Data Drift & PSI Radar' },
            { id: 'service_metrics', label: 'Production Telemetry' },
            { id: 'roi_calculator', label: 'Executive ROI Balance Sheet' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#001f54' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0, 31, 84, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: FASTAPI REST CONSOLE & SWAGGER PLAYGROUND
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'api_console' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem' }}>
          {/* Left: Request Configuration */}
          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase' }}>
                HTTP Request Dispatcher
              </span>
              <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontFamily: 'monospace' }}>
                http://localhost:8000
              </span>
            </div>

            {/* Endpoint Selector */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                SELECT REST ENDPOINT
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {[
                  { id: 'predict_single', method: 'POST', path: '/predict' },
                  { id: 'predict_batch', method: 'POST', path: '/predict/batch' },
                  { id: 'health', method: 'GET', path: '/health' }
                ].map(ep => (
                  <button
                    key={ep.id}
                    onClick={() => { setEndpoint(ep.id); setApiResponse(null); }}
                    style={{
                      flex: 1,
                      background: endpoint === ep.id ? '#eff6ff' : '#f8fafc',
                      border: endpoint === ep.id ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{
                      background: ep.method === 'POST' ? '#dbeafe' : '#dcfce7',
                      color: ep.method === 'POST' ? '#1d4ed8' : '#15803d',
                      padding: '0.15rem 0.35rem',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      marginRight: '0.4rem'
                    }}>
                      {ep.method}
                    </span>
                    <strong style={{ fontSize: '0.78rem', color: '#0f172a' }}>{ep.path}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Payload Presets (if predict endpoint) */}
            {endpoint === 'predict_single' && (
              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>TEST PAYLOAD PRESETS:</span>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {[
                    { id: 'high_risk', label: 'High-Risk Fiber' },
                    { id: 'low_risk', label: 'Low-Risk 2-Yr VIP' },
                    { id: 'validation_error', label: 'Schema Error (422)' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPreset(p.id)}
                      style={{
                        flex: 1,
                        background: payloadPreset === p.id ? '#001f54' : '#f1f5f9',
                        color: payloadPreset === p.id ? '#ffffff' : '#334155',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.35rem 0.5rem',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Editable JSON Payload */}
            {endpoint !== 'health' && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>REQUEST BODY (JSON):</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Pydantic Validated</span>
                </div>
                {endpoint === 'predict_single' ? (
                  <textarea
                    value={customJson}
                    onChange={(e) => setCustomJson(e.target.value)}
                    rows={12}
                    style={{
                      width: '100%',
                      fontFamily: 'Consolas, Monaco, monospace',
                      fontSize: '0.74rem',
                      background: '#090d16',
                      color: '#38bdf8',
                      border: '1px solid #1e293b',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      lineHeight: 1.45,
                      boxSizing: 'border-box'
                    }}
                  />
                ) : (
                  <div style={{
                    background: '#090d16',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    padding: '1rem',
                    color: '#94a3b8',
                    fontFamily: 'monospace',
                    fontSize: '0.78rem'
                  }}>
                    {`{\n  "customers": [ /* 50 Subscriber Dictionaries */ ]\n}`}
                    <div style={{ marginTop: '0.5rem', color: '#38bdf8', fontSize: '0.72rem' }}>
                      Sends a single vectorized HTTP POST request containing 50 customer profiles for high-throughput batch scoring.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={handleSendRequest}
              disabled={apiLoading}
              style={{
                width: '100%',
                background: apiLoading ? '#94a3b8' : '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: apiLoading ? 'wait' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
              }}
            >
              {apiLoading ? 'Executing ASGI Request...' : 'EXECUTE HTTP REQUEST'}
            </button>
          </div>

          {/* Right: Live Response Viewer */}
          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase' }}>
                ASGI Response Inspector
              </span>
              {apiResponse && (
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span style={{
                    background: apiResponse.status === 200 ? '#dcfce7' : '#fee2e2',
                    color: apiResponse.status === 200 ? '#15803d' : '#991b1b',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800
                  }}>
                    {apiResponse.status} {apiResponse.statusText}
                  </span>
                  <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {apiLatency.toFixed(1)} ms
                  </span>
                </div>
              )}
            </div>

            {apiResponse ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Headers */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
                  <div>content-type: {apiResponse.headers['content-type']}</div>
                  <div>x-response-time: {apiResponse.headers['x-response-time'] || `${apiLatency}ms`}</div>
                </div>

                {/* Body JSON */}
                <pre style={{
                  flex: 1,
                  margin: 0,
                  background: '#090d16',
                  color: apiResponse.status === 200 ? '#38bdf8' : '#f87171',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '0.74rem',
                  lineHeight: 1.45,
                  overflowX: 'auto',
                  fontFamily: 'Consolas, Monaco, monospace'
                }}>
                  {JSON.stringify(apiResponse.data, null, 2)}
                </pre>

                {/* Inference Interpretation */}
                {apiResponse.status === 200 && apiResponse.data.risk_category && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: apiResponse.data.churn_prediction ? '#fef2f2' : '#f0fdf4',
                    border: apiResponse.data.churn_prediction ? '1px solid #fca5a5' : '1px solid #86efac',
                    borderRadius: '8px',
                    fontSize: '0.78rem'
                  }}>
                    <strong style={{ color: apiResponse.data.churn_prediction ? '#991b1b' : '#166534', display: 'block', marginBottom: '0.2rem' }}>
                      {apiResponse.data.churn_prediction ? '[ACTION TRIGGERED: RETENTION OFFER]' : '[STANDARD SERVICING: LOW RISK]'}
                    </strong>
                    <span style={{ color: apiResponse.data.churn_prediction ? '#7f1d1d' : '#14532d' }}>
                      Threshold tau* = 0.22 evaluated. Churn Probability: {(apiResponse.data.churn_probability * 100).toFixed(1)}%. Automated CRM dispatch: <code>{apiResponse.data.retention_action}</code>.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1.5px dashed #cbd5e1', borderRadius: '8px', padding: '2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Ready for Request</span>
                <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Select an endpoint and click "Execute HTTP Request"</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: DATA DRIFT & PSI RADAR
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'drift_radar' && (
        <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase' }}>
                Covariate Shift Detection Engine
              </span>
              <h4 style={{ margin: '0.25rem 0 0 0', color: '#001f54', fontSize: '1.2rem', fontWeight: 900 }}>
                Population Stability Index (PSI) Production Drift Radar
              </h4>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <span style={{ background: '#dcfce7', color: '#166534', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                PSI &lt; 0.10: Stable
              </span>
              <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                0.10-0.25: Moderate
              </span>
              <span style={{ background: '#fee2e2', color: '#991b1b', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                &gt; 0.25: Critical Drift
              </span>
            </div>
          </div>

          {/* Feature Selector Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {Object.keys(driftFeatures).map(key => {
              const f = driftFeatures[key];
              const isSelected = driftFeature === key;
              return (
                <button
                  key={key}
                  onClick={() => setDriftFeature(key)}
                  style={{
                    flex: 1,
                    background: isSelected ? '#001f54' : '#f8fafc',
                    color: isSelected ? '#ffffff' : '#334155',
                    border: isSelected ? '1.5px solid #001f54' : '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '0.75rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,31,84,0.15)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: isSelected ? '#93c5fd' : '#64748b', fontWeight: 700 }}>
                    {f.type} Feature
                  </div>
                  <strong style={{ fontSize: '0.92rem', display: 'block', margin: '0.15rem 0' }}>
                    {f.name}
                  </strong>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 800 }}>
                      PSI: {f.psi.toFixed(4)}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      background: isSelected ? 'rgba(255,255,255,0.2)' : (f.psi > 0.25 ? '#fee2e2' : f.psi > 0.10 ? '#fef3c7' : '#dcfce7'),
                      color: isSelected ? '#ffffff' : (f.psi > 0.25 ? '#991b1b' : f.psi > 0.10 ? '#92400e' : '#15803d'),
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px'
                    }}>
                      {f.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Drift Inspection View */}
          {(() => {
            const active = driftFeatures[driftFeature];
            return (
              <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', background: '#fafcff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h5 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', fontWeight: 800 }}>
                      Distribution Comparison: {active.name}
                    </h5>
                    <span style={{ background: active.color === '#dc2626' ? '#fee2e2' : active.color === '#d97706' ? '#fef3c7' : '#dcfce7', color: active.color, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                      {active.statusTag}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ width: '12px', height: '12px', background: '#001f54', borderRadius: '2px' }} />
                      <span style={{ color: '#475569', fontWeight: 700 }}>Training Baseline</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ width: '12px', height: '12px', background: active.color, borderRadius: '2px' }} />
                      <span style={{ color: '#475569', fontWeight: 700 }}>Production Window (Month 6)</span>
                    </div>
                  </div>
                </div>

                {/* Visual Distribution Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  {active.baseline.map((b, idx) => {
                    const prod = active.production[idx];
                    return (
                      <div key={b.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                          <span>{b.label}</span>
                          <span style={{ fontFamily: 'monospace' }}>
                            Baseline: {b.pct}% | Prod: {prod.pct}% (Delta: {(prod.pct - b.pct > 0 ? '+' : '')}{(prod.pct - b.pct).toFixed(1)}%)
                          </span>
                        </div>
                        {/* Double Bar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${b.pct}%`, height: '100%', background: '#001f54', borderRadius: '4px' }} />
                          </div>
                          <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${prod.pct}%`, height: '100%', background: active.color, borderRadius: '4px' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Root Cause & Automated Mitigation */}
                <div style={{ background: '#ffffff', border: '1px solid #c2d4f2', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                    Drift Analysis &amp; Automated MLOps Action:
                  </span>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#475569', lineHeight: 1.45 }}>
                    {active.rootCause}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: active.color }}>
                      {active.psi > 0.25 ? '[ALERT: Retraining Triggered via Airflow DAG]' : active.psi > 0.10 ? '[WARNING: Feature Distribution Shift Logged]' : '[STATUS: Model Weights Validated]'}
                    </span>
                    {active.psi > 0.25 && (
                      <span style={{ background: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                        TRIGGER RETRAINING PIPELINE
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: PRODUCTION SERVICE HEALTH & TELEMETRY
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'service_metrics' && (
        <div>
          {/* 4 KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Throughput (Batch)', val: '1,428 req/s', sub: 'Vectorized Pipeline', status: '[OPTIMAL]', color: '#16a34a' },
              { label: 'P95 Latency', val: '11.4 ms', sub: 'ASGI Async Loop', status: '[SLA PASS]', color: '#16a34a' },
              { label: 'HTTP Error Rate', val: '0.01%', sub: 'Over 2.4M requests', status: '[99.98% UPTIME]', color: '#16a34a' },
              { label: 'Memory RSS', val: '142 MB', sub: 'Scikit-Learn Ensemble', status: '[LEAN]', color: '#16a34a' }
            ].map(kpi => (
              <div key={kpi.label} style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{kpi.label}</span>
                <strong style={{ fontSize: '1.5rem', color: '#001f54', display: 'block', margin: '0.2rem 0' }}>{kpi.val}</strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                  <span style={{ color: '#475569' }}>{kpi.sub}</span>
                  <span style={{ color: kpi.color, fontWeight: 800 }}>{kpi.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live Retention Voucher Dispatch Log */}
          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase' }}>
                Real-Time CRM Intervention Dispatch Stream (tau* = 0.22)
              </span>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                Streaming Live
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'Consolas, Monaco, monospace', fontSize: '0.74rem' }}>
              {[
                { time: '14:28:10.114', id: 'cust_7492', prob: 73.3, flag: true, action: 'OFFER $100 RETENTION VOUCHER', note: 'Fiber optic + Month-to-month' },
                { time: '14:28:10.185', id: 'cust_1029', prob: 2.4, flag: false, action: 'STANDARD BILLING NO INTERVENTION', note: '2-Year Contract VIP' },
                { time: '14:28:10.221', id: 'cust_8812', prob: 81.1, flag: true, action: 'OFFER $100 RETENTION VOUCHER', note: 'Senior + Electronic Check' },
                { time: '14:28:10.294', id: 'cust_4419', prob: 15.6, flag: false, action: 'STANDARD BILLING NO INTERVENTION', note: 'One-year Contract' },
                { time: '14:28:10.352', id: 'cust_9011', prob: 48.2, flag: true, action: 'OFFER $100 RETENTION VOUCHER', note: 'ChargeRatio = 1.34 outlier' }
              ].map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    background: item.flag ? '#fef2f2' : '#f8fafc',
                    border: item.flag ? '1px solid #fecaca' : '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>[{item.time}]</span>
                    <strong style={{ color: '#0f172a' }}>{item.id}</strong>
                    <span style={{ color: item.flag ? '#dc2626' : '#16a34a', fontWeight: 800 }}>
                      Prob: {item.prob.toFixed(1)}%
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.7rem' }}>({item.note})</span>
                  </div>
                  <span style={{
                    background: item.flag ? '#dc2626' : '#e2e8f0',
                    color: item.flag ? '#ffffff' : '#334155',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    fontSize: '0.68rem',
                    fontWeight: 800
                  }}>
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: EXECUTIVE ROI & BUSINESS PAYOFF CALCULATOR
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'roi_calculator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '1.5rem' }}>
          {/* Sliders: Business Assumptions */}
          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '14px', padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Business Model Assumptions
            </span>

            {/* Subscriber Base */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                <span>Annual Active Subscribers:</span>
                <strong style={{ color: '#001f54' }}>{subscribers.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="2500"
                value={subscribers}
                onChange={(e) => setSubscribers(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#001f54' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Base churn rate: 26.54% ({churnersAtRisk.toLocaleString()} at risk)</span>
            </div>

            {/* Voucher Cost */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                <span>Retention Voucher Cost ($):</span>
                <strong style={{ color: '#001f54' }}>${voucherCost}</strong>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={voucherCost}
                onChange={(e) => setVoucherCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#001f54' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Cost of promotional discount credited to flagged customer</span>
            </div>

            {/* Customer Lifetime Value */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                <span>Customer Lifetime Value (LTV):</span>
                <strong style={{ color: '#001f54' }}>${ltv.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min="800"
                max="2000"
                step="100"
                value={ltv}
                onChange={(e) => setLtv(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#001f54' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Net profit lost if an at-risk subscriber churns permanently</span>
            </div>

            {/* Offer Acceptance Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                <span>Intervention Success Rate:</span>
                <strong style={{ color: '#001f54' }}>{acceptanceRate}%</strong>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={acceptanceRate}
                onChange={(e) => setAcceptanceRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#001f54' }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Percentage of contacted churners who accept offer and stay</span>
            </div>
          </div>

          {/* Right: Executive Balance Sheet Ledger */}
          <div style={{ background: '#ffffff', border: '1.5px solid #c2d4f2', borderRadius: '14px', padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#001f54', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              Annual Executive P&amp;L Payoff Ledger
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#475569' }}>Total Annual Churners at Risk:</span>
                <strong style={{ color: '#0f172a' }}>{churnersAtRisk.toLocaleString()} accounts</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#475569' }}>Do-Nothing Baseline Revenue Loss:</span>
                <strong style={{ color: '#dc2626' }}>-${(churnersAtRisk * ltv).toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#475569' }}>Subscribers Flagged at tau* = 0.22:</span>
                <strong style={{ color: '#2563eb' }}>{totalVouchersIssued.toLocaleString()} ({((totalVouchersIssued / subscribers) * 100).toFixed(1)}%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#475569' }}>At-Risk Churners Saved ({acceptanceRate}% rate):</span>
                <strong style={{ color: '#16a34a' }}>+{savedChurners.toLocaleString()} accounts</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#475569' }}>Gross Retained LTV Revenue:</span>
                <strong style={{ color: '#16a34a' }}>+${grossSavedRevenue.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#475569' }}>Total Campaign Voucher Expense:</span>
                <strong style={{ color: '#d97706' }}>-${totalVoucherExpense.toLocaleString()}</strong>
              </div>
            </div>

            {/* Net ROI Summary Card */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                12-Month Net Retained Profit
              </span>
              <strong style={{ fontSize: '1.9rem', color: '#14532d', display: 'block', margin: '0.2rem 0' }}>
                +${netRetainedProfit.toLocaleString()}
              </strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#166534' }}>
                <span>Campaign Marketing ROI: <strong>+{roiPercent.toFixed(1)}%</strong></span>
                <span>Incremental Lift vs tau=0.50: <strong>+${incrementalLift.toLocaleString()}</strong></span>
              </div>
            </div>

            <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.4 }}>
              By shifting the decision cutoff to <code>tau* = 0.22</code>, the business accepts additional false positives (marketing voucher expense) to capture 82.9% of actual churners, maximizing annual bottom-line cash flow.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


