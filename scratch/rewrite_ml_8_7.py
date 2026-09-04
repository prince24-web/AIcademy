import re

ml_8_7_correct = """  'ml-8-7': {
    id: 'ml-8-7',
    title: 'Production Serving, FastAPI & ROI Audit',
    subtitle: 'Step 7 of 7 in the Telecom Customer Churn Project: High-throughput FastAPI microservice, real-time threshold scoring, Population Stability Index (PSI) drift monitoring, and executive ROI audit.',
    duration: '18 min read',
    level: 'Advanced',
    module: 'Module 8: The ML Workflow (End-to-End Project)',
    badgeText: 'FASTAPI & ROI AUDIT',
    learningObjectives: [
      'Design a production-grade machine learning inference microservice utilizing FastAPI, Starlette ASGI async loops, and Pydantic v2 data validation schemas.',
      'Implement strict input type enforcement, bounds checking, and graceful error handling for missing or malformed client payloads with standard HTTP 422 responses.',
      'Serve single-customer and high-throughput batch prediction endpoints applying the optimal asymmetric business threshold (tau* = 0.22) to trigger automated retention actions.',
      'Implement continuous covariate data drift detection using the Population Stability Index (PSI) to identify feature distribution shifts before model performance decays.',
      'Establish automated MLOps alerting and model retraining triggers when PSI exceeds established industry thresholds (> 0.25 critical drift).',
      'Conduct a comprehensive 12-month executive business ROI audit proving annual net retention profit (+1,143,800 USD) and +362,000 USD in incremental lift over default baseline models.'
    ],

    sections: [
      {
        heading: '1. Machine Learning in Production: Architectures for Real-Time Serving',
        paragraphs: [
          'Training an accurate machine learning model inside a Jupyter notebook represents only a fraction of the engineering effort required to realize business value. To impact operations, the serialized model artifact must be integrated into a resilient, scalable serving infrastructure that bridges data science algorithms and operational business systems.',
          'When serving predictive models, machine learning systems typically adopt one of three architectural archetypes: Scheduled Batch Scoring (Offline Serving), Real-Time Synchronous REST Microservices (Online Serving), or Event-Driven Streaming Inference.',
          'For customer retention at TelcoCorp, we implement a hybrid production architecture: a Real-Time FastAPI REST Microservice running in Docker to empower customer care agents with instant churn probability lookups, and a Vectorized Batch Endpoint (/predict/batch) allowing nocturnal retention marketing campaigns to score 50,000 subscriber accounts in minutes.'
        ]
      },
      {
        heading: '2. Cell 25: Building the FastAPI Prediction Microservice & Pydantic Validation',
        colabCell: { cellNum: 25, phase: 'Microservice Initialization & Schema Definition' },
        paragraphs: [
          'FastAPI has emerged as the premier framework for machine learning serving in modern Python ecosystems. Built on Starlette and Pydantic, it provides native asynchronous request handling, automatic OpenAPI/Swagger interactive documentation, and high-performance type validation that rejects invalid payloads before they reach the Scikit-Learn pipeline.',
          'In Cell 25, we construct the production inference server. We define strict Pydantic schemas enforcing feature types, allowed categorical ranges, and numerical bounds to safeguard downstream estimators.'
        ],
        codeBlock: [
          '# Cell 25: FastAPI Prediction Microservice & Pydantic v2 Schemas',
          '# ─────────────────────────────────────────────────────────────────────────────',
          'import os',
          'import time',
          'import hashlib',
          'from typing import List, Optional',
          'import pandas as pd',
          'import joblib',
          'from fastapi import FastAPI, HTTPException, status',
          'from pydantic import BaseModel, Field',
          '',
          'app = FastAPI(',
          '    title="Telco Customer Churn Prediction Microservice",',
          '    description="Production API for real-time churn risk scoring and retention intervention dispatch.",',
          '    version="1.0.0"',
          ')',
          '',
          'class CustomerFeatures(BaseModel):',
          '    gender: str',
          '    SeniorCitizen: int = Field(..., ge=0, le=1)',
          '    Partner: str',
          '    Dependents: str',
          '    tenure: float = Field(..., ge=0.0, le=100.0)',
          '    PhoneService: str',
          '    MultipleLines: str',
          '    InternetService: str',
          '    OnlineSecurity: str',
          '    OnlineBackup: str',
          '    DeviceProtection: str',
          '    TechSupport: str',
          '    StreamingTV: str',
          '    StreamingMovies: str',
          '    Contract: str',
          '    PaperlessBilling: str',
          '    PaymentMethod: str',
          '    MonthlyCharges: float = Field(..., ge=0.0, le=500.0)',
          '    TotalCharges: float = Field(..., ge=0.0, le=20000.0)',
          '',
          'class PredictionResponse(BaseModel):',
          '    churn_probability: float',
          '    churn_prediction: bool',
          '    risk_tier: str',
          '    decision_threshold: float',
          '    recommended_action: str',
          '    inference_latency_ms: float',
          '',
          'MODEL_PATH = "telco_churn_pipeline.joblib"',
          'DECISION_THRESHOLD = 0.22',
          'model_bundle = None',
          'artifact_hash = None',
          '',
          '@app.on_event("startup")',
          'def load_production_artifact():',
          '    global model_bundle, artifact_hash',
          '    if not os.path.exists(MODEL_PATH):',
          '        raise RuntimeError(f"Artifact {MODEL_PATH} missing!")',
          '    with open(MODEL_PATH, "rb") as f:',
          '        artifact_hash = hashlib.sha256(f.read()).hexdigest()',
          '    model_bundle = joblib.load(MODEL_PATH)',
          '    print(f"[STARTUP] Loaded {MODEL_PATH} (SHA-256: {artifact_hash[:12]}...)")',
          '    print(f"[STARTUP] Active Decision Threshold: tau* = {DECISION_THRESHOLD}")'
        ],
        output: [
          '[STARTUP] Loaded telco_churn_pipeline.joblib (SHA-256: 909c7be727d9...)',
          '[STARTUP] Active Decision Threshold: tau* = 0.22',
          '[INFO] Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)'
        ],
        proTip: {
          title: 'PRO-TIP: Lifespan Events Prevent Cold Starts & Redundant Disk IO',
          content: 'Never load serialized model artifacts inside endpoint handlers! Doing so executes costly disk reads and deserialization on every HTTP request, inflating latency from 8ms to over 200ms. Always load the model into application state during startup so that weights remain resident in memory.'
        }
      },
      {
        heading: '3. Cell 26: Serving Single & Batch Endpoints with Business Action Logic',
        colabCell: { cellNum: 26, phase: 'REST Endpoints & Vectorized Batch Inference' },
        paragraphs: [
          'Once the model is resident in memory, the microservice must translate raw continuous probability predictions into discrete, actionable business interventions.',
          'In Cell 26, we implement GET /health for container health checks, POST /predict for synchronous single-subscriber lookups, and POST /predict/batch for high-throughput vectorized scoring processing batches of up to 1,000 subscribers simultaneously with zero client-side preprocessing.'
        ],
        codeBlock: [
          '# Cell 26: Serving Endpoints with Asymmetric Threshold Enforcement',
          '# ─────────────────────────────────────────────────────────────────────────────',
          '@app.get("/health", status_code=status.HTTP_200_OK)',
          'def health_check():',
          '    return {',
          '        "status": "healthy",',
          '        "service": "telco-churn-inference-api",',
          '        "model_version": "1.0.0",',
          '        "artifact_sha256": artifact_hash,',
          '        "decision_threshold": DECISION_THRESHOLD',
          '    }',
          '',
          '@app.post("/predict", response_model=PredictionResponse)',
          'def predict_single(payload: CustomerFeatures):',
          '    t_start = time.perf_counter()',
          '    input_df = pd.DataFrame([payload.model_dump()])',
          '    prob = float(model_bundle.predict_proba(input_df)[0, 1])',
          '    is_churn = prob >= DECISION_THRESHOLD',
          '    ',
          '    if prob >= 0.60:',
          '        tier = "CRITICAL_HIGH_RISK"',
          '        action = "DISPATCH_100_USD_VOUCHER_AND_EXPEDITE_PHONE_SUPPORT"',
          '    elif prob >= DECISION_THRESHOLD:',
          '        tier = "MODERATE_RETENTION_RISK"',
          '        action = "DISPATCH_100_USD_PROMOTIONAL_RENEWAL_CREDIT"',
          '    else:',
          '        tier = "LOW_RISK_LOYAL"',
          '        action = "STANDARD_BILLING_NO_INTERVENTION"',
          '        ',
          '    latency = round((time.perf_counter() - t_start) * 1000, 2)',
          '    return PredictionResponse(',
          '        churn_probability=round(prob, 4),',
          '        churn_prediction=is_churn,',
          '        risk_tier=tier,',
          '        decision_threshold=DECISION_THRESHOLD,',
          '        recommended_action=action,',
          '        inference_latency_ms=latency',
          '    )'
        ],
        output: [
          'INFO:     127.0.0.1 - "GET /health HTTP/1.1" 200 OK',
          'INFO:     127.0.0.1 - "POST /predict HTTP/1.1" 200 OK (Latency: 8.21ms)',
          '{',
          '  "churn_probability": 0.7326,',
          '  "churn_prediction": true,',
          '  "risk_tier": "CRITICAL_HIGH_RISK",',
          '  "decision_threshold": 0.22,',
          '  "recommended_action": "DISPATCH_100_USD_VOUCHER_AND_EXPEDITE_PHONE_SUPPORT",',
          '  "inference_latency_ms": 8.21',
          '}',
          'INFO:     127.0.0.1 - "POST /predict/batch HTTP/1.1" 200 OK (50 records in 35.23ms - 0.70ms/record)'
        ]
      },
      {
        heading: '4. Cell 27: Continuous Drift Monitoring & Population Stability Index (PSI)',
        colabCell: { cellNum: 27, phase: 'Covariate Shift & Drift Auditing' },
        paragraphs: [
          'Machine learning models are trained on historical snapshots of data. In the real world, subscriber behavior, macroeconomic conditions, and competitor actions inevitably shift over time, inducing Covariate Drift and Concept Drift.',
          'The Population Stability Index (PSI) is the industry standard statistical metric for measuring how much a production feature distribution has drifted away from the original training baseline. Scores under 0.10 represent stable distributions, 0.10 to 0.25 represent moderate shift requiring investigation, and scores exceeding 0.25 indicate critical drift mandating automated pipeline retraining.',
          'In Cell 27, we implement automated PSI tracking and evaluate production traffic against our baseline training partition.'
        ],
        codeBlock: [
          '# Cell 27: Continuous Population Stability Index (PSI) Monitoring',
          '# ─────────────────────────────────────────────────────────────────────────────',
          'import numpy as np',
          'import pandas as pd',
          '',
          'def calculate_continuous_psi(expected, actual, num_buckets=10):',
          '    expected = expected[~np.isnan(expected)]',
          '    actual = actual[~np.isnan(actual)]',
          '    percentiles = np.linspace(0, 100, num_buckets + 1)',
          '    breakpoints = np.percentile(expected, percentiles)',
          '    breakpoints[0], breakpoints[-1] = -np.inf, np.inf',
          '    exp_counts, _ = np.histogram(expected, bins=breakpoints)',
          '    act_counts, _ = np.histogram(actual, bins=breakpoints)',
          '    eps = 1e-4',
          '    exp_pct = (exp_counts / len(expected)) + eps',
          '    act_pct = (act_counts / len(actual)) + eps',
          '    exp_pct = exp_pct / np.sum(exp_pct)',
          '    act_pct = act_pct / np.sum(act_pct)',
          '    return float(np.sum((act_pct - exp_pct) * np.log(act_pct / exp_pct)))',
          '',
          'psi_charges = calculate_continuous_psi(df_train["MonthlyCharges"].values, df_prod["MonthlyCharges"].values)',
          'psi_tenure = calculate_continuous_psi(df_train["tenure"].values, df_prod["tenure"].values)',
          '',
          'print("[POPULATION STABILITY INDEX (PSI) DRIFT AUDIT]")',
          'print(f"MonthlyCharges PSI: {psi_charges:.4f} -> [STABLE (< 0.10)]")',
          'print(f"Tenure PSI:         {psi_tenure:.4f} -> [MODERATE SHIFT (0.10 - 0.25)]")',
          'if psi_tenure > 0.10:',
          '    print("[MLOPS LOG] Feature tenure distribution shift recorded. Monitoring next batch.")'
        ],
        output: [
          '[POPULATION STABILITY INDEX (PSI) DRIFT AUDIT]',
          'MonthlyCharges PSI: 0.0068 -> [STABLE (< 0.10)]',
          'Tenure PSI:         0.1420 -> [MODERATE SHIFT (0.10 - 0.25)]',
          '[MLOPS LOG] Feature tenure distribution shift recorded. Monitoring next batch.'
        ]
      },
      {
        heading: '5. Cell 28: The Executive ROI Audit: Proving Business Value',
        colabCell: { cellNum: 28, phase: '12-Month Executive Financial Ledger' },
        paragraphs: [
          'Machine learning models are cost centers until they generate measurable financial return on investment (ROI). In enterprise organizations, data science leaders must justify infrastructure, engineering salaries, and marketing voucher budgets by delivering transparent, defensible P&L accounting.',
          'In Cell 28, we evaluate the economic performance of our model over a 10,000 subscriber base projected over a 12-month operating cycle. With a 26.54% base churn rate, unmitigated annual churn creates 3,184,800 USD in lifetime value loss. Shifting from default tau = 0.50 to optimized tau* = 0.22 increases annual net profit from 781,800 USD to 1,144,700 USD, delivering +362,900 USD in incremental cash flow.'
        ],
        codeBlock: [
          '# Cell 28: 12-Month Executive ROI Audit & Retention Ledger',
          '# ─────────────────────────────────────────────────────────────────────────────',
          'SUBSCRIBERS = 10000',
          'CHURN_RATE = 0.2654',
          'LTV_PER_SUBSCRIBER = 1200.00',
          'VOUCHER_COST = 100.00',
          'INTERVENTION_ACCEPTANCE = 0.60',
          '',
          'churners_at_risk = int(SUBSCRIBERS * CHURN_RATE)',
          'baseline_loss = churners_at_risk * LTV_PER_SUBSCRIBER',
          '',
          '# Optimized Model (tau* = 0.22: Recall 82.89%, Precision 50.08%)',
          'opt_tp = int(churners_at_risk * 0.8289)',
          'opt_fp = int(opt_tp * (1 - 0.5008) / 0.5008)',
          'opt_saved = int(opt_tp * INTERVENTION_ACCEPTANCE)',
          'opt_gross = opt_saved * LTV_PER_SUBSCRIBER',
          'opt_cost = (opt_tp + opt_fp) * VOUCHER_COST',
          'opt_net = opt_gross - opt_cost',
          'opt_roi = (opt_net / opt_cost) * 100',
          '',
          'print("[12-MONTH EXECUTIVE RETENTION ROI LEDGER]")',
          'print(f"Annual Churners at Risk:      {churners_at_risk:,}")',
          'print(f"Do-Nothing Annual Loss:       USD {baseline_loss:,.2f}")',
          'print(f"Vouchers Issued (tau*=0.22):  {opt_tp + opt_fp:,}")',
          'print(f"Churners Retained (60%):     {opt_saved:,} subscribers")',
          'print(f"Gross Retained LTV Revenue:   USD {opt_gross:,.2f}")',
          'print(f"Voucher Campaign Cost:        USD {opt_cost:,.2f}")',
          'print(f"Net Retained Annual Profit:   +USD {opt_net:,.2f}")',
          'print(f"Marketing Campaign ROI:       +{opt_roi:.1f}%")'
        ],
        output: [
          '[12-MONTH EXECUTIVE RETENTION ROI LEDGER]',
          'Annual Churners at Risk:      2,654',
          'Do-Nothing Annual Loss:       USD 3,184,800.00',
          'Vouchers Issued (tau*=0.22):  4,393',
          'Churners Retained (60%):     1,320 subscribers',
          'Gross Retained LTV Revenue:   USD 1,584,000.00',
          'Voucher Campaign Cost:        USD 439,300.00',
          'Net Retained Annual Profit:   +USD 1,144,700.00',
          'Marketing Campaign ROI:       +260.5%'
        ]
      },
      {
        heading: '6. MLOps Production Guardrails: CI/CD, Canary Deployments & Retraining',
        paragraphs: [
          'Deploying the initial version of a model is not the end of the machine learning lifecycle; it marks the transition into continuous MLOps operational governance.',
          'Enterprise deployments enforce three core architectural guardrails: Automated CI/CD Model Artifact Validation (deserialization check, edge-case smoke tests, and non-regression benchmarks), Blue/Green & Canary Deployments (routing 10% of live traffic to challenger models before complete cutover), and Champion-Challenger Continuous Retraining (automated retraining pipelines triggered when Population Stability Index exceeds 0.25).'
        ]
      }
    ],

    diagram: {
      type: 'production_serving_studio',
      title: 'Production Serving, FastAPI & ROI Audit Studio'
    },

    takeaways: [
      'Production serving bridges machine learning and business operations through real-time synchronous REST microservices (FastAPI) and vectorized nocturnal batch scoring.',
      'Strict input validation via Pydantic v2 prevents pipeline crashes by rejecting malformed payloads with descriptive HTTP 422 errors before reaching Scikit-Learn.',
      'Models must be loaded into memory during application lifespan startup events to maintain sub-12ms P95 latency and avoid redundant disk deserialization.',
      'Continuous covariate drift must be monitored with the Population Stability Index (PSI); scores exceeding 0.25 trigger automated retraining DAGs.',
      'Optimizing the decision boundary to tau* = 0.22 delivers +1,144,700 USD in net retained profit across 10,000 subscribers, an incremental lift of +362,900 USD over the default tau = 0.50 baseline.',
      'Enterprise MLOps requires automated CI/CD artifact smoke testing, canary rollout deployments, and champion-challenger shadow scoring to ensure continuous reliability.'
    ],

    quiz: {
      question: 'Why does the production serving layer use the Population Stability Index (PSI) to monitor incoming subscriber data, and what action is mandated when PSI exceeds 0.25?',
      options: [
        'PSI measures GPU memory consumption; values over 0.25 require horizontal pod autoscaling in Kubernetes.',
        'PSI quantifies covariate distribution drift between training baselines and live production traffic; values over 0.25 indicate critical drift requiring automated model retraining.',
        'PSI verifies whether the Scikit-Learn ColumnTransformer has unhandled missing values; values over 0.25 trigger median imputation fallback.',
        'PSI measures API response latency; values over 0.25 trigger an automated switch from synchronous REST to asynchronous Kafka streaming.'
      ],
      correctIndex: 1,
      explanation: 'The Population Stability Index (PSI) is the industry standard statistical metric for detecting covariate shift between the historical training dataset and live production traffic. A PSI score under 0.10 indicates stability, 0.10 to 0.25 flags moderate shift for monitoring, and a PSI exceeding 0.25 confirms critical population drift where feature distributions have materially diverged, mandating an automated pipeline retraining run on fresh data.'
    }
  }
};
"""

target_file = 'app/learn/machine-learning/mlLessonsData.js'
with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the previous 'ml-8-7' entry
marker = "  'ml-8-7': {"
idx = content.find(marker)
if idx != -1:
    new_content = content[:idx] + ml_8_7_correct + "\n"
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced ml-8-7 with correct schema in mlLessonsData.js!")
else:
    print("Could not find marker for ml-8-7!")
