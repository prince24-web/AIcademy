import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler, RobustScaler
from sklearn.impute import SimpleImputer

# 1. Load Data
df = pd.read_csv('telco_churn.csv')
print(f"Raw shape: {df.shape}")

# 2. Clean TotalCharges whitespace trap
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce').fillna(0.0)

# 3. Target Encoding
y = df['Churn'].map({'Yes': 1, 'No': 0}).astype(int)

# 4. Feature Engineering
# A. Charge Ratio (Monthly charges relative to accumulated total charges)
df['ChargeRatio'] = df['MonthlyCharges'] / (df['TotalCharges'] + 1.0)

# B. Total Services Subscribed (Service Depth)
service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup', 
                'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']
def count_services(row):
    count = 0
    for col in service_cols:
        if row[col] in ['Yes', 'One line', 'Multiple lines']:
            count += 1
    return count
df['TotalServices'] = df.apply(count_services, axis=1)

# C. High Risk Friction Combo: Month-to-month contract + Electronic check
df['IsHighRiskCombo'] = ((df['Contract'] == 'Month-to-month') & (df['PaymentMethod'] == 'Electronic check')).astype(int)

# D. Long-term Commitment Flag (1 or 2 year contract)
df['IsLongTermContract'] = df['Contract'].isin(['One year', 'Two year']).astype(int)

# 5. Drop identifiers and target
drop_cols = ['customerID', 'Churn']
X = df.drop(columns=drop_cols)

print(f"Engineered feature set shape: {X.shape}")

# 6. Separate Numerical and Categorical
num_cols = ['tenure', 'MonthlyCharges', 'TotalCharges', 'ChargeRatio', 'TotalServices']
cat_cols = [c for c in X.columns if c not in num_cols and c not in ['IsHighRiskCombo', 'IsLongTermContract']]
binary_passthrough = ['IsHighRiskCombo', 'IsLongTermContract']

print(f"Numerical columns ({len(num_cols)}): {num_cols}")
print(f"Categorical columns ({len(cat_cols)}): {cat_cols}")
print(f"Binary passthrough ({len(binary_passthrough)}): {binary_passthrough}")

# 7. Train / Test Split (Stratified 80/20) - BEFORE preprocessing to prevent data leakage!
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)
print(f"Train split: {X_train.shape[0]} rows (Churn rate: {y_train.mean():.4f})")
print(f"Test split : {X_test.shape[0]} rows (Churn rate: {y_test.mean():.4f})")

# 8. Construct Scikit-Learn ColumnTransformer Pipeline
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
        ('pass', 'passthrough', binary_passthrough)
    ],
    verbose_feature_names_out=False
)

# Fit on train only, transform both
preprocessor.fit(X_train)
X_train_proc = preprocessor.transform(X_train)
X_test_proc = preprocessor.transform(X_test)
feature_names = preprocessor.get_feature_names_out()

print(f"\nProcessed Feature Matrix:")
print(f"  X_train shape: {X_train_proc.shape}")
print(f"  X_test shape : {X_test_proc.shape}")
print(f"  Total Transformed Features: {len(feature_names)}")
print(f"  Transformed feature list: {list(feature_names)}")

# Correlations of transformed features with target y_train
train_proc_df = pd.DataFrame(X_train_proc, columns=feature_names)
train_proc_df['TARGET'] = y_train.values
corrs = train_proc_df.corr()['TARGET'].drop('TARGET').sort_values()

print("\nTop 5 Protective Features (Negative correlation with Churn):")
for feat, val in corrs.head(5).items():
    print(f"  {feat:35s}: r = {val:+.4f}")

print("\nTop 5 Risk Factors (Positive correlation with Churn):")
for feat, val in corrs.tail(5).items():
    print(f"  {feat:35s}: r = {val:+.4f}")
