import numpy as np
import pandas as pd
import time
import optuna
from sklearn.model_selection import StratifiedKFold, cross_val_score, GridSearchCV, RandomizedSearchCV
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import roc_auc_score, average_precision_score, classification_report, confusion_matrix

# Suppress verbose optuna logging for clean stdout
optuna.logging.set_verbosity(optuna.logging.WARNING)

RANDOM_STATE = 42
np.random.seed(RANDOM_STATE)

# 1. Load Data
print("Loading telco_churn.csv...")
df = pd.read_csv('telco_churn.csv')
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce').fillna(0.0)

# Feature engineering matching Chapter 8.3 & 8.4
df['ChargeRatio'] = df['MonthlyCharges'] / (df['TotalCharges'] + 1.0)
service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup', 
                'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']
def count_services(row):
    return sum(1 for col in service_cols if row[col] in ['Yes', 'One line', 'Multiple lines'])
df['TotalServices'] = df.apply(count_services, axis=1)
df['IsHighRiskCombo'] = ((df['Contract'] == 'Month-to-month') & (df['PaymentMethod'] == 'Electronic check')).astype(int)
df['IsLongTermContract'] = df['Contract'].isin(['One year', 'Two year']).astype(int)

y = df['Churn'].map({'Yes': 1, 'No': 0}).astype(int)
X = df.drop(columns=['customerID', 'Churn'])

# 80/20 Stratified Split
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=RANDOM_STATE
)

# 2. Preprocessor
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

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)

# Fit preprocessor on X_train to transform features
X_train_trans = preprocessor.fit_transform(X_train)
X_test_trans = preprocessor.transform(X_test)
print(f"Preprocessed features shape: {X_train_trans.shape}")

# Baseline Default Gradient Boosting
default_gb = GradientBoostingClassifier(random_state=RANDOM_STATE)
default_scores = cross_val_score(default_gb, X_train_trans, y_train, cv=cv, scoring='roc_auc', n_jobs=-1)
default_mean = default_scores.mean()
print(f"Default Gradient Boosting 5-Fold CV ROC-AUC: {default_mean:.4f}")

# 3. Strategy 1: Grid Search Benchmark (18 parameter combos = 90 fits)
print("\n--- RUNNING GRID SEARCH CV (18 combinations x 5 folds = 90 fits) ---")
grid_params = {
    'learning_rate': [0.05, 0.1],
    'max_depth': [3, 4, 5],
    'n_estimators': [50, 100, 150]
}
t0 = time.time()
grid = GridSearchCV(GradientBoostingClassifier(random_state=RANDOM_STATE), grid_params, cv=cv, scoring='roc_auc', n_jobs=-1)
grid.fit(X_train_trans, y_train)
grid_time = time.time() - t0
print(f"Grid Search Best ROC-AUC: {grid.best_score_:.4f} in {grid_time:.2f}s")
print(f"Grid Best Params: {grid.best_params_}")

# 4. Strategy 2: Randomized Search Benchmark (20 iterations x 5 folds = 100 fits)
print("\n--- RUNNING RANDOMIZED SEARCH CV (20 random draws x 5 folds = 100 fits) ---")
from scipy.stats import uniform, randint
random_dist = {
    'learning_rate': uniform(0.01, 0.2),
    'max_depth': randint(2, 6),
    'n_estimators': randint(50, 200),
    'subsample': uniform(0.6, 0.4),
    'min_samples_split': randint(2, 20)
}
t0 = time.time()
rnd = RandomizedSearchCV(GradientBoostingClassifier(random_state=RANDOM_STATE), random_dist, n_iter=20, cv=cv, scoring='roc_auc', random_state=RANDOM_STATE, n_jobs=-1)
rnd.fit(X_train_trans, y_train)
rnd_time = time.time() - t0
print(f"Randomized Search Best ROC-AUC: {rnd.best_score_:.4f} in {rnd_time:.2f}s")
print(f"Random Best Params: {rnd.best_params_}")

# 5. Strategy 3: Optuna Bayesian TPE Optimization (30 trials)
print("\n--- RUNNING OPTUNA BAYESIAN OPTIMIZATION (30 Trials, TPE Sampler) ---")
trial_history = []

def objective(trial):
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 50, 250, step=10),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.25, log=True),
        'max_depth': trial.suggest_int('max_depth', 2, 6),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0, step=0.05),
        'min_samples_split': trial.suggest_int('min_samples_split', 2, 25),
        'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 15),
        'random_state': RANDOM_STATE
    }
    clf = GradientBoostingClassifier(**params)
    scores = cross_val_score(clf, X_train_trans, y_train, cv=cv, scoring='roc_auc', n_jobs=-1)
    mean_auc = scores.mean()
    
    trial_history.append({
        'trial': trial.number,
        'roc_auc': mean_auc,
        **params
    })
    return mean_auc

t0 = time.time()
sampler = optuna.samplers.TPESampler(seed=RANDOM_STATE)
study = optuna.create_study(direction='maximize', sampler=sampler)
study.optimize(objective, n_trials=30)
optuna_time = time.time() - t0

print(f"\nOptuna Complete: Best Trial #{study.best_trial.number} with ROC-AUC = {study.best_value:.4f} in {optuna_time:.2f}s")
print(f"Best Parameters: {study.best_params}")

# Top 5 Trials
trials_df = pd.DataFrame(trial_history).sort_values(by='roc_auc', ascending=False)
print("\n=== TOP 5 OPTUNA TRIALS ===")
print(trials_df[['trial', 'roc_auc', 'learning_rate', 'max_depth', 'n_estimators', 'subsample']].head(5).to_string(index=False))

# Parameter Importances
param_importances = optuna.importance.get_param_importances(study)
print("\n=== HYPERPARAMETER IMPORTANCES ===")
for p, imp in param_importances.items():
    print(f"  {p:18s}: {imp*100:5.1f}%")

# 6. Evaluate Default vs Tuned on Holdout Test Set
best_clf = GradientBoostingClassifier(**study.best_params, random_state=RANDOM_STATE)
best_clf.fit(X_train_trans, y_train)

default_clf = GradientBoostingClassifier(random_state=RANDOM_STATE)
default_clf.fit(X_train_trans, y_train)

def_probs = default_clf.predict_proba(X_test_trans)[:, 1]
def_test_roc = roc_auc_score(y_test, def_probs)
def_test_pr = average_precision_score(y_test, def_probs)

best_probs = best_clf.predict_proba(X_test_trans)[:, 1]
best_test_roc = roc_auc_score(y_test, best_probs)
best_test_pr = average_precision_score(y_test, best_probs)

print("\n=======================================================")
print("=== BEFORE VS AFTER TUNING: HOLDOUT TEST SET (1,409) ===")
print("=======================================================")
print(f"Default Gradient Boosting: Test ROC-AUC = {def_test_roc:.4f} | PR-AUC = {def_test_pr:.4f}")
print(f"Tuned Gradient Boosting:   Test ROC-AUC = {best_test_roc:.4f} | PR-AUC = {best_test_pr:.4f}")
print(f"ROC-AUC Improvement:       +{best_test_roc - def_test_roc:.4f}")
print(f"PR-AUC Improvement:        +{best_test_pr - def_test_pr:.4f}")

# Print trial history JSON-ready snippet
print("\n=== TRIAL HISTORY FOR SVG LINE CHART ===")
for row in trial_history[:15]:
    print(f"{{ trial: {row['trial']}, score: {row['roc_auc']:.4f}, lr: {row['learning_rate']:.4f}, depth: {row['max_depth']}, n_est: {row['n_estimators']}, sub: {row['subsample']:.2f} }},")
