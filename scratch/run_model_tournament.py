import numpy as np
import pandas as pd
import time
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    roc_auc_score, average_precision_score, accuracy_score,
    precision_score, recall_score, f1_score, log_loss,
    brier_score_loss, confusion_matrix, classification_report
)

# Contender Models
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, HistGradientBoostingClassifier

RANDOM_STATE = 42
np.random.seed(RANDOM_STATE)

# 1. Load Dataset
print("Loading dataset...")
df = pd.read_csv('telco_churn.csv')
print(f"Loaded: {df.shape[0]} rows, {df.shape[1]} columns")

# 2. Cleaning & Feature Engineering
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce').fillna(0.0)

# Domain Features
df['ChargeRatio'] = df['MonthlyCharges'] / (df['TotalCharges'] + 1.0)

service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup', 
                'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']
def count_services(row):
    return sum(1 for col in service_cols if row[col] in ['Yes', 'One line', 'Multiple lines'])
df['TotalServices'] = df.apply(count_services, axis=1)

df['IsHighRiskCombo'] = ((df['Contract'] == 'Month-to-month') & (df['PaymentMethod'] == 'Electronic check')).astype(int)
df['IsLongTermContract'] = df['Contract'].isin(['One year', 'Two year']).astype(int)

# Target & Feature Matrix
y = df['Churn'].map({'Yes': 1, 'No': 0}).astype(int)
X = df.drop(columns=['customerID', 'Churn'])

# 3. Train/Test Split (80/20 Stratified)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=RANDOM_STATE
)
print(f"X_train: {X_train.shape}, X_test: {X_test.shape}")
print(f"y_train churn rate: {y_train.mean():.4f}, y_test churn rate: {y_test.mean():.4f}")

# 4. Pipeline ColumnTransformer
num_cols = ['tenure', 'MonthlyCharges', 'TotalCharges', 'ChargeRatio', 'TotalServices']
cat_cols = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 
            'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 
            'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 
            'Contract', 'PaperlessBilling', 'PaymentMethod', 
            'IsHighRiskCombo', 'IsLongTermContract']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), num_cols),
        ('cat', OneHotEncoder(drop='first', handle_unknown='ignore', sparse_output=False), cat_cols)
    ]
)

# Inspect feature count
preprocessor.fit(X_train)
feature_names = preprocessor.get_feature_names_out()
print(f"Transformed features: {len(feature_names)}")

# 5. Define Tournament Contenders
models = {
    'Dummy (Majority)': DummyClassifier(strategy='most_frequent'),
    'Logistic Regression': LogisticRegression(C=1.0, max_iter=1000, random_state=RANDOM_STATE),
    'Logistic Regression (Balanced)': LogisticRegression(C=1.0, class_weight='balanced', max_iter=1000, random_state=RANDOM_STATE),
    'Decision Tree': DecisionTreeClassifier(max_depth=5, random_state=RANDOM_STATE),
    'Random Forest': RandomForestClassifier(n_estimators=100, max_depth=10, random_state=RANDOM_STATE, n_jobs=-1),
    'Random Forest (Balanced)': RandomForestClassifier(n_estimators=100, max_depth=10, class_weight='balanced', random_state=RANDOM_STATE, n_jobs=-1),
    'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=RANDOM_STATE),
    'HistGradientBoosting': HistGradientBoostingClassifier(max_iter=100, learning_rate=0.1, max_depth=5, random_state=RANDOM_STATE)
}

# 6. Stratified 5-Fold Cross Validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
scoring = ['roc_auc', 'average_precision', 'accuracy', 'recall', 'precision', 'f1']

print("\n=======================================================")
print("=== 5-FOLD CROSS-VALIDATION TOURNAMENT LEADERBOARD ===")
print("=======================================================")

cv_results_summary = []

for name, clf in models.items():
    pipe = Pipeline([
        ('prep', preprocessor),
        ('clf', clf)
    ])
    
    t0 = time.time()
    scores = cross_validate(pipe, X_train, y_train, cv=cv, scoring=scoring, n_jobs=-1)
    fit_time = time.time() - t0
    
    cv_results_summary.append({
        'Model': name,
        'ROC-AUC Mean': scores['test_roc_auc'].mean(),
        'ROC-AUC Std': scores['test_roc_auc'].std(),
        'PR-AUC Mean': scores['test_average_precision'].mean(),
        'PR-AUC Std': scores['test_average_precision'].std(),
        'Recall Mean': scores['test_recall'].mean(),
        'Precision Mean': scores['test_precision'].mean(),
        'F1 Mean': scores['test_f1'].mean(),
        'Fit Time (s)': fit_time
    })

cv_df = pd.DataFrame(cv_results_summary).sort_values(by='ROC-AUC Mean', ascending=False)
print(cv_df.to_string(index=False))

# 7. Evaluate on Holdout Test Set (Pristine 20%)
print("\n=======================================================")
print("=== PRISTINE HOLDOUT TEST SET PERFORMANCE (1,409) ===")
print("=======================================================")

test_summary = []

for name, clf in models.items():
    pipe = Pipeline([
        ('prep', preprocessor),
        ('clf', clf)
    ])
    
    pipe.fit(X_train, y_train)
    
    # Train ROC-AUC for overfitting check
    if hasattr(pipe, "predict_proba"):
        train_probs = pipe.predict_proba(X_train)[:, 1]
        train_roc = roc_auc_score(y_train, train_probs)
        test_probs = pipe.predict_proba(X_test)[:, 1]
        test_roc = roc_auc_score(y_test, test_probs)
        test_pr = average_precision_score(y_test, test_probs)
        test_logloss = log_loss(y_test, test_probs)
        test_brier = brier_score_loss(y_test, test_probs)
    else:
        train_roc = 0.5
        test_roc = 0.5
        test_pr = y_test.mean()
        test_logloss = 0.0
        test_brier = 0.0
        test_probs = np.zeros(len(y_test))
        
    y_pred = pipe.predict(X_test)
    
    cm = confusion_matrix(y_test, y_pred)
    tn, fp, fn, tp = cm.ravel()
    
    # Financial Cost-Utility Matrix:
    # TP: (0.50 * $1200) - $100 = +$500
    # FP: -$100
    # FN: -$1200
    # TN: $0
    net_value = (tp * 500) + (fp * -100) + (fn * -1200)
    
    # Baseline Do-Nothing cost (all churners leave: 374 * -$1200 = -$448,800)
    baseline_cost = 374 * -1200
    net_savings = net_value - baseline_cost
    
    test_summary.append({
        'Model': name,
        'Train ROC': train_roc,
        'Test ROC': test_roc,
        'Overfit Gap': train_roc - test_roc,
        'PR-AUC': test_pr,
        'Accuracy': accuracy_score(y_test, y_pred),
        'Precision': precision_score(y_test, y_pred, zero_division=0),
        'Recall': recall_score(y_test, y_pred, zero_division=0),
        'F1': f1_score(y_test, y_pred, zero_division=0),
        'TP': tp,
        'FP': fp,
        'FN': fn,
        'TN': tn,
        'Net Value ($)': net_value,
        'Net Savings ($)': net_savings
    })

test_df = pd.DataFrame(test_summary).sort_values(by='Test ROC', ascending=False)
print(test_df[['Model', 'Test ROC', 'PR-AUC', 'Recall', 'Precision', 'F1', 'TP', 'FP', 'FN', 'Net Savings ($)']].to_string(index=False))
