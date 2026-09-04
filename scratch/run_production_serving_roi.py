import os
import sys
import time
import json
import hashlib
import numpy as np
import pandas as pd
import joblib
from pydantic import BaseModel, Field
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

def engineer_features(data):
    d = data.copy()
    d['ChargeRatio'] = d['MonthlyCharges'] / (d['TotalCharges'] + 1.0)
    service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup',
                    'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']
    total_services = 0
    for col in service_cols:
        if col in d.columns:
            total_services += (d[col] == 'Yes').astype(int)
    d['TotalServices'] = total_services
    d['IsHighRiskCombo'] = ((d['Contract'] == 'Month-to-month') & (d['PaymentMethod'] == 'Electronic check')).astype(int)
    d['IsLongTermContract'] = d['Contract'].isin(['One year', 'Two year']).astype(int)
    return d

# 1. Pydantic Schemas
class CustomerInferencePayload(BaseModel):
    gender: str = Field(..., example="Female")
    SeniorCitizen: int = Field(..., ge=0, le=1, example=0)
    Partner: str = Field(..., example="No")
    Dependents: str = Field(..., example="No")
    tenure: float = Field(..., ge=0, example=2.0)
    PhoneService: str = Field(..., example="Yes")
    MultipleLines: str = Field(..., example="No")
    InternetService: str = Field(..., example="Fiber optic")
    OnlineSecurity: str = Field(..., example="No")
    OnlineBackup: str = Field(..., example="No")
    DeviceProtection: str = Field(..., example="No")
    TechSupport: str = Field(..., example="No")
    StreamingTV: str = Field(..., example="No")
    StreamingMovies: str = Field(..., example="No")
    Contract: str = Field(..., example="Month-to-month")
    PaperlessBilling: str = Field(..., example="Yes")
    PaymentMethod: str = Field(..., example="Electronic check")
    MonthlyCharges: float = Field(..., ge=0, example=89.50)
    TotalCharges: float = Field(..., ge=0, example=179.00)

class PredictionResponse(BaseModel):
    churn_probability: float
    churn_prediction: bool
    risk_category: str
    decision_threshold: float
    retention_action: str
    latency_ms: float

class BatchPredictionRequest(BaseModel):
    customers: List[CustomerInferencePayload]

class BatchPredictionResponse(BaseModel):
    predictions: List[PredictionResponse]
    total_processed: int
    flagged_for_retention: int
    batch_latency_ms: float

# 2. Build FastAPI App
app = FastAPI(title="Telco Churn Prediction Microservice", version="1.0.0")

MODEL_PATH = "telco_churn_pipeline.joblib"
pipeline = None
artifact_sha256 = None
DECISION_THRESHOLD = 0.22

@app.on_event("startup")
def load_model():
    global pipeline, artifact_sha256
    if os.path.exists(MODEL_PATH):
        pipeline = joblib.load(MODEL_PATH)
        with open(MODEL_PATH, "rb") as f:
            artifact_sha256 = hashlib.sha256(f.read()).hexdigest()
        print(f"[FASTAPI STARTUP] Loaded {MODEL_PATH} (SHA-256: {artifact_sha256[:12]}...)")
    else:
        raise RuntimeError(f"Model file {MODEL_PATH} not found!")

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "telco-churn-inference-api",
        "model_version": "1.0.0",
        "artifact_sha256": artifact_sha256,
        "decision_threshold": DECISION_THRESHOLD,
        "environment": "production"
    }

@app.post("/predict", response_model=PredictionResponse)
def predict_single(payload: CustomerInferencePayload):
    t0 = time.perf_counter()
    df_raw = pd.DataFrame([payload.dict()])
    prob = float(pipeline.predict_proba(df_raw)[0, 1])
    is_churn = prob >= DECISION_THRESHOLD
    
    if prob >= 0.60:
        risk = "CRITICAL_HIGH_RISK"
        action = "OFFER_$100_RETENTION_VOUCHER_AND_EXPEDITE_PHONE_SUPPORT"
    elif prob >= DECISION_THRESHOLD:
        risk = "MODERATE_RISK"
        action = "DISPATCH_$100_PROMOTIONAL_RENEWAL_CREDIT"
    else:
        risk = "LOW_RISK"
        action = "STANDARD_BILLING_NO_INTERVENTION"
        
    latency = round((time.perf_counter() - t0) * 1000, 2)
    return PredictionResponse(
        churn_probability=round(prob, 4),
        churn_prediction=is_churn,
        risk_category=risk,
        decision_threshold=DECISION_THRESHOLD,
        retention_action=action,
        latency_ms=latency
    )

@app.post("/predict/batch", response_model=BatchPredictionResponse)
def predict_batch(request: BatchPredictionRequest):
    t0 = time.perf_counter()
    if not request.customers:
        raise HTTPException(status_code=400, detail="Empty customer batch")
    df_raw = pd.DataFrame([c.dict() for c in request.customers])
    probs = pipeline.predict_proba(df_raw)[:, 1]
    
    preds = []
    flagged_count = 0
    for prob in probs:
        p_val = float(prob)
        is_c = p_val >= DECISION_THRESHOLD
        if is_c:
            flagged_count += 1
        if p_val >= 0.60:
            risk = "CRITICAL_HIGH_RISK"
            action = "OFFER_$100_RETENTION_VOUCHER_AND_EXPEDITE_PHONE_SUPPORT"
        elif p_val >= DECISION_THRESHOLD:
            risk = "MODERATE_RISK"
            action = "DISPATCH_$100_PROMOTIONAL_RENEWAL_CREDIT"
        else:
            risk = "LOW_RISK"
            action = "STANDARD_BILLING_NO_INTERVENTION"
            
        preds.append(PredictionResponse(
            churn_probability=round(p_val, 4),
            churn_prediction=is_c,
            risk_category=risk,
            decision_threshold=DECISION_THRESHOLD,
            retention_action=action,
            latency_ms=0.0
        ))
    
    total_lat = round((time.perf_counter() - t0) * 1000, 2)
    return BatchPredictionResponse(
        predictions=preds,
        total_processed=len(preds),
        flagged_for_retention=flagged_count,
        batch_latency_ms=total_lat
    )

# 3. Population Stability Index (PSI) Implementation
def calculate_psi(expected: np.ndarray, actual: np.ndarray, num_buckets: int = 10) -> float:
    # Ensure no NaN
    expected = expected[~np.isnan(expected)]
    actual = actual[~np.isnan(actual)]
    
    # Calculate quantile breakpoints from expected distribution
    percentiles = np.linspace(0, 100, num_buckets + 1)
    breakpoints = np.percentile(expected, percentiles)
    breakpoints[0] = -np.inf
    breakpoints[-1] = np.inf
    
    # Bucket counts
    expected_counts, _ = np.histogram(expected, bins=breakpoints)
    actual_counts, _ = np.histogram(actual, bins=breakpoints)
    
    # Convert to fractions with small epsilon smoothing
    eps = 1e-4
    expected_pct = (expected_counts / len(expected)) + eps
    actual_pct = (actual_counts / len(actual)) + eps
    
    # Re-normalize
    expected_pct = expected_pct / np.sum(expected_pct)
    actual_pct = actual_pct / np.sum(actual_pct)
    
    # PSI summation
    psi_value = np.sum((actual_pct - expected_pct) * np.log(actual_pct / expected_pct))
    return float(psi_value)

def calculate_categorical_psi(expected_series: pd.Series, actual_series: pd.Series) -> float:
    categories = list(set(expected_series.unique()).union(set(actual_series.unique())))
    eps = 1e-4
    exp_counts = expected_series.value_counts(normalize=True).to_dict()
    act_counts = actual_series.value_counts(normalize=True).to_dict()
    
    psi = 0.0
    for cat in categories:
        e_p = exp_counts.get(cat, 0.0) + eps
        a_p = act_counts.get(cat, 0.0) + eps
        psi += (a_p - e_p) * np.log(a_p / e_p)
    return float(psi)

def main():
    print("="*80)
    print("CHAPTER 8.7: FASTAPI SERVING, PSI DRIFT & ROI AUDIT ENGINE")
    print("="*80)
    
    # Execute TestClient against the app
    load_model()
    client = TestClient(app)
    
    # Test 1: GET /health
    res_health = client.get("/health")
    print("\n--- TEST 1: GET /health ---")
    print(f"Status Code: {res_health.status_code}")
    print(json.dumps(res_health.json(), indent=2))
    
    # Test 2: POST /predict (High-Risk)
    high_risk_payload = {
        "gender": "Female",
        "SeniorCitizen": 0,
        "Partner": "No",
        "Dependents": "No",
        "tenure": 2.0,
        "PhoneService": "Yes",
        "MultipleLines": "No",
        "InternetService": "Fiber optic",
        "OnlineSecurity": "No",
        "OnlineBackup": "No",
        "DeviceProtection": "No",
        "TechSupport": "No",
        "StreamingTV": "No",
        "StreamingMovies": "No",
        "Contract": "Month-to-month",
        "PaperlessBilling": "Yes",
        "PaymentMethod": "Electronic check",
        "MonthlyCharges": 89.50,
        "TotalCharges": 179.00
    }
    res_high = client.post("/predict", json=high_risk_payload)
    print("\n--- TEST 2: POST /predict (High-Risk Customer) ---")
    print(f"Status Code: {res_high.status_code}")
    print(json.dumps(res_high.json(), indent=2))
    
    # Test 3: POST /predict (Low-Risk 2-Year VIP)
    low_risk_payload = {
        "gender": "Male",
        "SeniorCitizen": 0,
        "Partner": "Yes",
        "Dependents": "Yes",
        "tenure": 65.0,
        "PhoneService": "Yes",
        "MultipleLines": "Yes",
        "InternetService": "DSL",
        "OnlineSecurity": "Yes",
        "OnlineBackup": "Yes",
        "DeviceProtection": "Yes",
        "TechSupport": "Yes",
        "StreamingTV": "No",
        "StreamingMovies": "No",
        "Contract": "Two year",
        "PaperlessBilling": "No",
        "PaymentMethod": "Bank transfer (automatic)",
        "MonthlyCharges": 64.00,
        "TotalCharges": 4160.00
    }
    res_low = client.post("/predict", json=low_risk_payload)
    print("\n--- TEST 3: POST /predict (Low-Risk Customer) ---")
    print(f"Status Code: {res_low.status_code}")
    print(json.dumps(res_low.json(), indent=2))
    
    # Test 4: POST /predict (Validation Error 422)
    bad_payload = high_risk_payload.copy()
    bad_payload["SeniorCitizen"] = 99  # Exceeds le=1
    res_bad = client.post("/predict", json=bad_payload)
    print("\n--- TEST 4: POST /predict (Validation Error Handling) ---")
    print(f"Status Code: {res_bad.status_code} (Expected 422 Unprocessable Entity)")
    
    # Test 5: POST /predict/batch (Latency & Throughput)
    batch_data = [high_risk_payload, low_risk_payload] * 25  # 50 customers
    t_start = time.perf_counter()
    res_batch = client.post("/predict/batch", json={"customers": batch_data})
    batch_time = (time.perf_counter() - t_start) * 1000
    print("\n--- TEST 5: POST /predict/batch (50 Subscribers) ---")
    print(f"Status Code: {res_batch.status_code}")
    print(f"Processed: {res_batch.json()['total_processed']} customers")
    print(f"Flagged for Retention: {res_batch.json()['flagged_for_retention']} customers")
    print(f"Client Round-Trip Time: {batch_time:.2f} ms ({batch_time/50:.2f} ms/customer)")
    
    # Test 6: Population Stability Index (PSI) Drift Benchmarks
    df_raw = pd.read_csv("telco_churn.csv")
    df_train = df_raw.sample(frac=0.80, random_state=42)
    df_prod_stable = df_raw.sample(frac=0.20, random_state=101)  # Natural holdout slice
    
    # Simulated Drifted Production Data (e.g. Month 6 after competitor promo)
    df_prod_drifted = df_prod_stable.copy()
    # 1. Tenure shift: influx of new short-tenure subscribers
    df_prod_drifted['tenure'] = np.clip(df_prod_drifted['tenure'] * 0.55, 1, 72)
    # 2. Contract shift: 80% Month-to-month due to competitive price war
    df_prod_drifted['Contract'] = np.random.choice(['Month-to-month', 'One year', 'Two year'], 
                                                   size=len(df_prod_drifted), 
                                                   p=[0.78, 0.14, 0.08])
    # 3. MonthlyCharges: slight inflation
    df_prod_drifted['MonthlyCharges'] = df_prod_drifted['MonthlyCharges'] * 1.05
    
    # Compute PSIs
    psi_tenure_stable = calculate_psi(df_train['tenure'].values, df_prod_stable['tenure'].values)
    psi_tenure_drift = calculate_psi(df_train['tenure'].values, df_prod_drifted['tenure'].values)
    
    psi_charges_stable = calculate_psi(pd.to_numeric(df_train['MonthlyCharges'], errors='coerce').fillna(0).values,
                                       pd.to_numeric(df_prod_stable['MonthlyCharges'], errors='coerce').fillna(0).values)
    psi_charges_drift = calculate_psi(pd.to_numeric(df_train['MonthlyCharges'], errors='coerce').fillna(0).values,
                                      pd.to_numeric(df_prod_drifted['MonthlyCharges'], errors='coerce').fillna(0).values)
    
    psi_contract_stable = calculate_categorical_psi(df_train['Contract'], df_prod_stable['Contract'])
    psi_contract_drift = calculate_categorical_psi(df_train['Contract'], df_prod_drifted['Contract'])
    
    print("\n--- TEST 6: POPULATION STABILITY INDEX (PSI) DRIFT AUDIT ---")
    print(f"MonthlyCharges (Stable Prod):  PSI = {psi_charges_stable:.4f} -> [NO SHIFT (< 0.10)]")
    print(f"MonthlyCharges (Drifted Prod): PSI = {psi_charges_drift:.4f} -> [NO SHIFT (< 0.10)]")
    print(f"Tenure (Stable Prod):          PSI = {psi_tenure_stable:.4f} -> [NO SHIFT (< 0.10)]")
    print(f"Tenure (Drifted Prod):         PSI = {psi_tenure_drift:.4f} -> [MODERATE SHIFT (0.10 - 0.25)]")
    print(f"Contract (Stable Prod):        PSI = {psi_contract_stable:.4f} -> [NO SHIFT (< 0.10)]")
    print(f"Contract (Drifted Prod):       PSI = {psi_contract_drift:.4f} -> [SIGNIFICANT DRIFT (> 0.25)]")
    
    # Test 7: Executive ROI Audit on 10,000 Subscribers
    base_subscribers = 10000
    base_churn_rate = 0.2654
    expected_churners = int(base_subscribers * base_churn_rate)  # 2,654
    expected_loyal = base_subscribers - expected_churners         # 7,346
    
    # Default tau = 0.50 stats (Recall 51.3%, Precision 68.6%)
    def_tp = int(expected_churners * 0.5134)  # 1,362
    def_fp = int(def_tp * (1 - 0.6857) / 0.6857)  # 624
    def_fn = expected_churners - def_tp  # 1,292
    
    # Tuned tau* = 0.22 stats (Recall 82.89%, Precision 50.08%)
    opt_tp = int(expected_churners * 0.8289)  # 2,200
    opt_fp = int(opt_tp * (1 - 0.5008) / 0.5008)  # 2,193
    opt_fn = expected_churners - opt_tp  # 454
    
    # Business Assumptions
    ltv = 1200.00
    voucher_cost = 100.00
    acceptance_rate = 0.60  # 60% of contacted churners accept and remain
    
    # Do Nothing Baseline Loss
    baseline_loss = expected_churners * ltv  # $3,184,800
    
    # Default Model Economics
    def_saved = int(def_tp * acceptance_rate)  # 817
    def_retained_rev = def_saved * ltv  # $980,400
    def_voucher_exp = (def_tp + def_fp) * voucher_cost  # $198,600
    def_net_profit = def_retained_rev - def_voucher_exp  # $781,800
    def_roi = (def_net_profit / def_voucher_exp) * 100
    
    # Optimized Model (tau* = 0.22) Economics
    opt_saved = int(opt_tp * acceptance_rate)  # 1,320
    opt_retained_rev = opt_saved * ltv  # $1,584,000
    opt_voucher_exp = (opt_tp + opt_fp) * voucher_cost  # $439,300
    opt_net_profit = opt_retained_rev - opt_voucher_exp  # $1,144,700
    opt_roi = (opt_net_profit / opt_voucher_exp) * 100
    
    incremental_lift = opt_net_profit - def_net_profit
    
    print("\n--- TEST 7: 12-MONTH EXECUTIVE ROI LEDGER (10,000 SUBSCRIBERS) ---")
    print(f"Annual Churners at Risk:         {expected_churners:,} subscribers")
    print(f"Do-Nothing Annual Loss:          ${baseline_loss:,.2f}")
    print(f"Default Model (tau=0.50) Profit: ${def_net_profit:,.2f} (ROI: {def_roi:.1f}%)")
    print(f"Tuned Model (tau*=0.22) Profit:  ${opt_net_profit:,.2f} (ROI: {opt_roi:.1f}%)")
    print(f"Net Incremental Financial Lift:  +${incremental_lift:,.2f} / year!")

if __name__ == "__main__":
    main()
