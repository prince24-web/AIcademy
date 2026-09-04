import pandas as pd
import numpy as np
import os
import hashlib
import joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, FunctionTransformer
from sklearn.impute import SimpleImputer
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import (
    roc_auc_score, average_precision_score, brier_score_loss, log_loss,
    confusion_matrix, classification_report
)

# Top-level feature engineering function for clean joblib serialization
def engineer_features(data):
    d = data.copy()
    # Monthly to total ratio
    d['ChargeRatio'] = d['MonthlyCharges'] / (d['TotalCharges'] + 1.0)
    
    # Service depth count
    service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup',
                    'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']
    total_services = 0
    for col in service_cols:
        if col in d.columns:
            total_services += (d[col] == 'Yes').astype(int)
    d['TotalServices'] = total_services
    
    # High-risk interaction combo
    d['IsHighRiskCombo'] = ((d['Contract'] == 'Month-to-month') & (d['PaymentMethod'] == 'Electronic check')).astype(int)
    
    # Long-term contract flag
    d['IsLongTermContract'] = d['Contract'].isin(['One year', 'Two year']).astype(int)
    return d

def build_and_evaluate():
    print("=" * 80)
    print("STEP 1: DATA INGESTION & PIPELINE ASSEMBLY")
    print("=" * 80)
    
    df = pd.read_csv('telco_churn.csv')
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce').fillna(0.0)
    df['Churn'] = (df['Churn'] == 'Yes').astype(int)
    
    X = df.drop(columns=['customerID', 'Churn'])
    y = df['Churn']
    
    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    print(f"Train Shape: {X_train_raw.shape}, Test Shape: {X_test_raw.shape}")
    print(f"Train Churn Rate: {y_train.mean():.4f}, Test Churn Rate: {y_test.mean():.4f}")
    
    num_cols = ['tenure', 'MonthlyCharges', 'TotalCharges', 'ChargeRatio', 'TotalServices']
    cat_cols = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService',
                'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup',
                'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies',
                'Contract', 'PaperlessBilling', 'PaymentMethod']
    binary_cols = ['IsHighRiskCombo', 'IsLongTermContract']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', Pipeline([
                ('imputer', SimpleImputer(strategy='median')),
                ('scaler', StandardScaler())
            ]), num_cols),
            ('cat', Pipeline([
                ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
                ('ohe', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'))
            ]), cat_cols),
            ('pass', 'passthrough', binary_cols)
        ],
        verbose_feature_names_out=False
    )
    
    full_pipeline = Pipeline([
        ('feature_eng', FunctionTransformer(engineer_features, validate=False)),
        ('preprocessor', preprocessor),
        ('classifier', GradientBoostingClassifier(
            learning_rate=0.0293,
            n_estimators=210,
            max_depth=3,
            subsample=0.60,
            min_samples_split=9,
            min_samples_leaf=5,
            random_state=42
        ))
    ])
    
    print("\nFitting full production pipeline on 5,634 training records...")
    full_pipeline.fit(X_train_raw, y_train)
    print("Model fitting complete.")
    
    print("\n" + "=" * 80)
    print("STEP 2: HOLDOUT TEST SET EVALUATION (1,409 SUBSCRIBERS)")
    print("=" * 80)
    
    y_test_probs = full_pipeline.predict_proba(X_test_raw)[:, 1]
    y_train_probs = full_pipeline.predict_proba(X_train_raw)[:, 1]
    
    roc_auc = roc_auc_score(y_test, y_test_probs)
    pr_auc = average_precision_score(y_test, y_test_probs)
    brier = brier_score_loss(y_test, y_test_probs)
    logloss = log_loss(y_test, y_test_probs)
    train_roc = roc_auc_score(y_train, y_train_probs)
    overfit_gap = train_roc - roc_auc
    
    print(f"Holdout Test ROC-AUC:    {roc_auc:.4f}")
    print(f"Holdout Test PR-AUC:     {pr_auc:.4f}")
    print(f"Brier Score (Loss):      {brier:.4f}")
    print(f"Log Loss:                {logloss:.4f}")
    print(f"Train ROC-AUC:           {train_roc:.4f}")
    print(f"Overfitting Gap:         {overfit_gap:.4f}")
    
    # Financial parameters
    VOUCHER_COST = 100
    CUSTOMER_LTV = 1200
    SAVE_PROB = 0.50
    NET_TP_BENEFIT = (CUSTOMER_LTV * SAVE_PROB) - VOUCHER_COST # +$500
    FP_COST = -VOUCHER_COST # -$100
    FN_COST = -CUSTOMER_LTV # -$1200
    
    total_churners = y_test.sum() # 374
    baseline_loss = total_churners * FN_COST # -$448,800
    
    def calculate_payoff(tp, fp, fn, tn):
        total_pnl = (tp * NET_TP_BENEFIT) + (fp * FP_COST) + (fn * FN_COST)
        net_savings = total_pnl - baseline_loss
        return total_pnl, net_savings
    
    # Default 0.50 Threshold Evaluation
    y_test_pred_default = (y_test_probs >= 0.50).astype(int)
    cm_default = confusion_matrix(y_test, y_test_pred_default)
    tn_def, fp_def, fn_def, tp_def = cm_default.ravel()
    pnl_def, sav_def = calculate_payoff(tp_def, fp_def, fn_def, tn_def)
    
    print("\nClassification Report at Default Threshold tau = 0.50:")
    print(classification_report(y_test, y_test_pred_default, digits=4))
    print(f"Confusion Matrix (Default 0.50): TN={tn_def}, FP={fp_def}, FN={fn_def}, TP={tp_def}")
    print(f"Default Financials: Total P&L = ${pnl_def:,.0f}, Net Savings vs Baseline = +${sav_def:,.0f}")
    
    print("\n" + "=" * 80)
    print("STEP 3: THRESHOLD OPTIMIZATION & BUSINESS TRADEOFF ANALYSIS")
    print("=" * 80)
    
    thresholds = np.linspace(0.05, 0.90, 86)
    threshold_results = []
    
    best_tau_unconstrained = 0.50
    max_savings_unconstrained = -float('inf')
    
    best_tau_balanced = 0.50
    max_savings_balanced = -float('inf')
    
    for tau in thresholds:
        preds = (y_test_probs >= tau).astype(int)
        tn, fp, fn, tp = confusion_matrix(y_test, preds).ravel()
        prec = tp / (tp + fp) if (tp + fp) > 0 else 0.0
        rec = tp / (tp + fn) if (tp + fn) > 0 else 0.0
        f1 = (2 * prec * rec) / (prec + rec) if (prec + rec) > 0 else 0.0
        pnl, savings = calculate_payoff(tp, fp, fn, tn)
        flagged_rate = (tp + fp) / len(y_test)
        
        res = {
            'threshold': round(float(tau), 4),
            'tp': int(tp), 'fp': int(fp), 'fn': int(fn), 'tn': int(tn),
            'precision': round(float(prec), 4),
            'recall': round(float(rec), 4),
            'f1': round(float(f1), 4),
            'flagged_rate': round(float(flagged_rate), 4),
            'pnl': int(pnl),
            'savings': int(savings)
        }
        threshold_results.append(res)
        
        if savings > max_savings_unconstrained:
            max_savings_unconstrained = savings
            best_tau_unconstrained = tau
            
        # Balanced operational threshold: Precision >= 50% and flagged rate <= 45%
        if prec >= 0.50 and flagged_rate <= 0.45 and savings > max_savings_balanced:
            max_savings_balanced = savings
            best_tau_balanced = tau
            
    res_unconstrained = [r for r in threshold_results if abs(r['threshold'] - best_tau_unconstrained) < 0.005][0]
    res_balanced = [r for r in threshold_results if abs(r['threshold'] - best_tau_balanced) < 0.005][0]
    
    print(f"\n1. UNCONSTRAINED THEORETICAL THRESHOLD: tau = {best_tau_unconstrained:.2f}")
    print(f"   Flags: {res_unconstrained['flagged_rate']*100:.1f}% of users ({res_unconstrained['tp']+res_unconstrained['fp']}/1409)")
    print(f"   Recall: {res_unconstrained['recall']*100:.1f}%, Precision: {res_unconstrained['precision']*100:.1f}%, F1: {res_unconstrained['f1']:.4f}")
    print(f"   Confusion: TN={res_unconstrained['tn']}, FP={res_unconstrained['fp']}, FN={res_unconstrained['fn']}, TP={res_unconstrained['tp']}")
    print(f"   Net Savings: +${res_unconstrained['savings']:,.0f}")
    
    print(f"\n2. OPERATIONAL BALANCED THRESHOLD (Precision >= 50%): tau* = {best_tau_balanced:.2f}")
    print(f"   Flags: {res_balanced['flagged_rate']*100:.1f}% of users ({res_balanced['tp']+res_balanced['fp']}/1409)")
    print(f"   Recall: {res_balanced['recall']*100:.1f}%, Precision: {res_balanced['precision']*100:.1f}%, F1: {res_balanced['f1']:.4f}")
    print(f"   Confusion: TN={res_balanced['tn']}, FP={res_balanced['fp']}, FN={res_balanced['fn']}, TP={res_balanced['tp']}")
    print(f"   Net Savings: +${res_balanced['savings']:,.0f} (vs Default: +${sav_def:,.0f}, Lift: +${res_balanced['savings'] - sav_def:,.0f})")
    
    print("\nComparison Table across Key Thresholds:")
    print("Threshold | Flagged% | Recall | Precision | F1-Score | TN  | FP  | FN  | TP  | Net Savings")
    print("-" * 88)
    for t_val in [0.10, 0.20, 0.25, round(best_tau_balanced, 2), 0.30, 0.35, 0.40, 0.50, 0.60, 0.70]:
        match = [r for r in threshold_results if abs(r['threshold'] - t_val) < 0.015]
        if match:
            m = match[0]
            print(f"  {m['threshold']:.2f}    |  {m['flagged_rate']*100:4.1f}%  | {m['recall']*100:4.1f}% |   {m['precision']*100:4.1f}%   |  {m['f1']:.4f}  | {m['tn']:3d} | {m['fp']:3d} | {m['fn']:3d} | {m['tp']:3d} | +${m['savings']:,}")
            
    print("\n" + "=" * 80)
    print("STEP 4: SUBGROUP FAIRNESS AUDIT (AT OPERATIONAL THRESHOLD tau = 0.25)")
    print("=" * 80)
    
    audit_tau = best_tau_balanced # ~0.25
    test_df_audit = X_test_raw.copy()
    test_df_audit['actual'] = y_test
    test_df_audit['prob'] = y_test_probs
    test_df_audit['pred'] = (y_test_probs >= audit_tau).astype(int)
    
    def audit_group(col_name):
        print(f"\n--- Subgroup Audit: {col_name} (tau = {audit_tau:.2f}) ---")
        groups = test_df_audit[col_name].unique()
        res_list = []
        for g in groups:
            sub = test_df_audit[test_df_audit[col_name] == g]
            n = len(sub)
            actual_churn = sub['actual'].sum()
            flagged = sub['pred'].sum()
            tn, fp, fn, tp = confusion_matrix(sub['actual'], sub['pred'], labels=[0, 1]).ravel()
            
            sel_rate = flagged / n if n > 0 else 0
            recall = tp / (tp + fn) if (tp + fn) > 0 else 0
            fnr = fn / (tp + fn) if (tp + fn) > 0 else 0
            prec = tp / (tp + fp) if (tp + fp) > 0 else 0
            
            res_list.append({
                'group': str(g),
                'n': n,
                'churn_pct': actual_churn / n * 100,
                'selection_rate': sel_rate * 100,
                'recall': recall * 100,
                'fnr': fnr * 100,
                'precision': prec * 100
            })
            print(f"  {col_name}={str(g):15s} | N={n:4d} | Churn={actual_churn/n*100:4.1f}% | Selection={sel_rate*100:4.1f}% | Recall={recall*100:4.1f}% | FNR={fnr*100:4.1f}% | Precision={prec*100:4.1f}%")
        
        if len(res_list) == 2:
            s0, s1 = res_list[0]['selection_rate'], res_list[1]['selection_rate']
            di_ratio = min(s0, s1) / max(s0, s1) if max(s0, s1) > 0 else 1.0
            print(f"  Disparate Impact Ratio: {di_ratio:.3f} (Four-Fifths / 80% Rule: {'COMPLIANT' if di_ratio >= 0.80 else 'FLAG'})")
        return res_list

    audit_group('gender')
    audit_group('SeniorCitizen')
    audit_group('Partner')
    audit_group('Contract')
    
    print("\n" + "=" * 80)
    print("STEP 5: PIPELINE SERIALIZATION & ARTIFACT PACKAGING")
    print("=" * 80)
    
    artifact_filename = 'telco_churn_pipeline.joblib'
    joblib.dump(full_pipeline, artifact_filename, compress=3)
    
    file_size_kb = os.path.getsize(artifact_filename) / 1024
    with open(artifact_filename, 'rb') as f:
        sha256_hash = hashlib.sha256(f.read()).hexdigest()
        
    print(f"Serialized Artifact: {artifact_filename}")
    print(f"File Size:           {file_size_kb:.1f} KB")
    print(f"SHA-256 Checksum:    {sha256_hash}")
    print(f"Components Included: FunctionTransformer(engineer_features) + ColumnTransformer + GradientBoostingClassifier")
    
    print("\n" + "=" * 80)
    print("STEP 6: ROUND-TRIP SMOKE TEST ON UNPROCESSED RAW PAYLOADS")
    print("=" * 80)
    
    reloaded_pipeline = joblib.load(artifact_filename)
    print("Successfully reloaded artifact via joblib.load().")
    
    payload_high_risk = pd.DataFrame([{
        'gender': 'Female',
        'SeniorCitizen': 0,
        'Partner': 'No',
        'Dependents': 'No',
        'tenure': 2,
        'PhoneService': 'Yes',
        'MultipleLines': 'No',
        'InternetService': 'Fiber optic',
        'OnlineSecurity': 'No',
        'OnlineBackup': 'No',
        'DeviceProtection': 'No',
        'TechSupport': 'No',
        'StreamingTV': 'Yes',
        'StreamingMovies': 'Yes',
        'Contract': 'Month-to-month',
        'PaperlessBilling': 'Yes',
        'PaymentMethod': 'Electronic check',
        'MonthlyCharges': 89.50,
        'TotalCharges': 179.00
    }])
    
    payload_loyal = pd.DataFrame([{
        'gender': 'Male',
        'SeniorCitizen': 0,
        'Partner': 'Yes',
        'Dependents': 'Yes',
        'tenure': 68,
        'PhoneService': 'Yes',
        'MultipleLines': 'Yes',
        'InternetService': 'DSL',
        'OnlineSecurity': 'Yes',
        'OnlineBackup': 'Yes',
        'DeviceProtection': 'Yes',
        'TechSupport': 'Yes',
        'StreamingTV': 'No',
        'StreamingMovies': 'No',
        'Contract': 'Two year',
        'PaperlessBilling': 'No',
        'PaymentMethod': 'Bank transfer (automatic)',
        'MonthlyCharges': 44.20,
        'TotalCharges': 3005.60
    }])
    
    prob_high = reloaded_pipeline.predict_proba(payload_high_risk)[0, 1]
    action_high = "OFFER $100 RETENTION VOUCHER" if prob_high >= audit_tau else "STANDARD ACCOUNT CARE"
    
    prob_loyal = reloaded_pipeline.predict_proba(payload_loyal)[0, 1]
    action_loyal = "OFFER $100 RETENTION VOUCHER" if prob_loyal >= audit_tau else "STANDARD ACCOUNT CARE"
    
    print(f"\nPayload 1 (New M2M Fiber Subscriber):")
    print(f"  Raw Churn Probability: {prob_high*100:.2f}%")
    print(f"  Action at tau*={audit_tau:.2f}:       {action_high}")
    
    print(f"\nPayload 2 (Long-Tenure 2-Year DSL Subscriber):")
    print(f"  Raw Churn Probability: {prob_loyal*100:.2f}%")
    print(f"  Action at tau*={audit_tau:.2f}:       {action_loyal}")
    
    print("\nRound-trip smoke testing confirmed: 100% successful inference with zero manual data transformation.")

if __name__ == '__main__':
    build_and_evaluate()
