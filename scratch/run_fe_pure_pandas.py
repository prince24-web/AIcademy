import pandas as pd
import numpy as np

# 1. Load Data
df = pd.read_csv('telco_churn.csv')
print(f"Raw shape: {df.shape}")

# 2. Clean TotalCharges whitespace trap
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce').fillna(0.0)

# 3. Target
y = df['Churn'].map({'Yes': 1, 'No': 0}).astype(int)

# 4. Feature Engineering
# A. ChargeRatio: Monthly charges relative to accumulated total charges
df['ChargeRatio'] = df['MonthlyCharges'] / (df['TotalCharges'] + 1.0)

# B. TotalServices Subscribed
service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup', 
                'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']
def count_services(row):
    return sum(1 for col in service_cols if row[col] in ['Yes', 'One line', 'Multiple lines'])
df['TotalServices'] = df.apply(count_services, axis=1)

# C. High-risk friction combo: Month-to-month + Electronic check
df['IsHighRiskCombo'] = ((df['Contract'] == 'Month-to-month') & (df['PaymentMethod'] == 'Electronic check')).astype(int)

# D. Long-term contract commitment flag
df['IsLongTermContract'] = df['Contract'].isin(['One year', 'Two year']).astype(int)

# 5. Service Count Churn Breakdown
print("\n--- CHURN BY TOTAL SERVICES SUBSCRIBED ---")
services_ct = pd.crosstab(df['TotalServices'], df['Churn'])
services_pct = pd.crosstab(df['TotalServices'], df['Churn'], normalize='index') * 100
for s in range(len(services_ct)):
    ch = services_ct.loc[s, 'Yes'] if 'Yes' in services_ct.columns else 0
    lo = services_ct.loc[s, 'No'] if 'No' in services_ct.columns else 0
    pct = services_pct.loc[s, 'Yes'] if 'Yes' in services_pct.columns else 0.0
    print(f"  Services={s}: Churn={ch:4d} ({pct:5.1f}%), Loyal={lo:4d}, Total={ch+lo:4d}")

# 6. High Risk Combo Churn Breakdown
print("\n--- CHURN BY HIGH RISK COMBO (Month-to-month + Electronic Check) ---")
hr_ct = pd.crosstab(df['IsHighRiskCombo'], df['Churn'])
hr_pct = pd.crosstab(df['IsHighRiskCombo'], df['Churn'], normalize='index') * 100
for v in [0, 1]:
    ch = hr_ct.loc[v, 'Yes']
    lo = hr_ct.loc[v, 'No']
    pct = hr_pct.loc[v, 'Yes']
    lbl = "High Risk Combo (M2M + E-Check)" if v == 1 else "Standard Billing / Contracts"
    print(f"  {lbl:35s}: Churn={ch:4d} ({pct:5.1f}%), Loyal={lo:4d}, Total={ch+lo:4d}")

# 7. Charge Ratio Quartiles Breakdown
df['ChargeRatioQuartile'] = pd.qcut(df['ChargeRatio'], q=4, labels=['Q1 (Low)', 'Q2 (Mid-Low)', 'Q3 (Mid-High)', 'Q4 (Highest)'])
cr_ct = pd.crosstab(df['ChargeRatioQuartile'], df['Churn'])
cr_pct = pd.crosstab(df['ChargeRatioQuartile'], df['Churn'], normalize='index') * 100
print("\n--- CHURN BY CHARGE RATIO QUARTILES ---")
for q in ['Q1 (Low)', 'Q2 (Mid-Low)', 'Q3 (Mid-High)', 'Q4 (Highest)']:
    ch = cr_ct.loc[q, 'Yes']
    lo = cr_ct.loc[q, 'No']
    pct = cr_pct.loc[q, 'Yes']
    print(f"  {q:15s}: Churn={ch:4d} ({pct:5.1f}%), Loyal={lo:4d}, Total={ch+lo:4d}")

# 8. Stratified Train / Test Split (80 / 20)
np.random.seed(42)
train_indices = []
test_indices = []
for label in [0, 1]:
    idx = df[y == label].index.to_numpy().copy()
    np.random.shuffle(idx)
    n_train = int(len(idx) * 0.8)
    train_indices.extend(idx[:n_train])
    test_indices.extend(idx[n_train:])

train_df = df.loc[train_indices].copy()
test_df = df.loc[test_indices].copy()
print(f"\nTrain set: {len(train_df)} rows, Churn rate: {train_df['Churn'].value_counts(normalize=True)['Yes']*100:.2f}%")
print(f"Test set : {len(test_df)} rows, Churn rate: {test_df['Churn'].value_counts(normalize=True)['Yes']*100:.2f}%")

# 9. Transformation & Dummy Encoding
num_cols = ['tenure', 'MonthlyCharges', 'TotalCharges', 'ChargeRatio', 'TotalServices']
cat_cols = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines',
            'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport',
            'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod']

# Fit scaler on train only
medians = train_df[num_cols].median()
means = train_df[num_cols].mean()
stds = train_df[num_cols].std()

train_num_scaled = (train_df[num_cols] - means) / stds
test_num_scaled = (test_df[num_cols] - means) / stds

# One-hot encode with drop_first=True
train_cat_dummies = pd.get_dummies(train_df[cat_cols], drop_first=True, dtype=int)
# Align test dummies to train dummies
test_cat_dummies = pd.get_dummies(test_df[cat_cols], drop_first=True, dtype=int).reindex(columns=train_cat_dummies.columns, fill_value=0)

binary_cols = ['IsHighRiskCombo', 'IsLongTermContract']
X_train_final = pd.concat([train_num_scaled, train_cat_dummies, train_df[binary_cols]], axis=1)
X_test_final = pd.concat([test_num_scaled, test_cat_dummies, test_df[binary_cols]], axis=1)

print(f"\nFinal Transformed Matrix Shape: {X_train_final.shape[1]} features")
print(f"Features list ({len(X_train_final.columns)}): {list(X_train_final.columns)}")

# Compute correlations with target
y_train_num = train_df['Churn'].map({'Yes': 1, 'No': 0})
corrs = X_train_final.apply(lambda col: col.corr(y_train_num)).sort_values()

print("\n--- TOP PROTECTIVE FEATURES (Negative Correlation with Churn) ---")
for f, r in corrs.head(6).items():
    print(f"  {f:35s}: r = {r:+.4f}")

print("\n--- TOP CHURN RISK FACTORS (Positive Correlation with Churn) ---")
for f, r in corrs.tail(6).items():
    print(f"  {f:35s}: r = {r:+.4f}")
