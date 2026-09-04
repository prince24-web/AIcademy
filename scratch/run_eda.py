import pandas as pd
import numpy as np

# Load local telco dataset
df = pd.read_csv('telco_churn.csv')

print("=" * 65)
print("CELL 1: DATASET INGESTION & SCHEMA INTEGRITY AUDIT")
print("=" * 65)
print(f"Total Rows:     {df.shape[0]:,}")
print(f"Total Columns:  {df.shape[1]}")
print(f"Memory Usage:   {df.memory_usage(deep=True).sum() / (1024*1024):.2f} MB")
print("\nColumn Data Types:")
print(df.dtypes)

# Detect the hidden whitespace trap in TotalCharges
blank_mask = df['TotalCharges'].str.strip() == ''
print(f"\n[!] Data Quality Alert: Found {blank_mask.sum()} rows with whitespace in 'TotalCharges'!")
print(f"    Tenure for these records: {df.loc[blank_mask, 'tenure'].unique().tolist()} (New accounts)")

print("\n" + "=" * 65)
print("CELL 2: TARGET VARIABLE DISTRIBUTION & BASELINE IMBALANCE")
print("=" * 65)
churn_counts = df['Churn'].value_counts()
churn_pct = df['Churn'].value_counts(normalize=True) * 100
for cat, count in churn_counts.items():
    print(f"  {cat:5s} : {count:5,d} ({churn_pct[cat]:.2f}%)")
print(f"\nMajority Class Baseline Accuracy: {churn_pct['No']:.2f}%")
print(f"Imbalance Ratio (No : Yes):       1 : {churn_counts['No'] / churn_counts['Yes']:.2f}")

print("\n" + "=" * 65)
print("CELL 3: NUMERICAL FEATURE STATISTICAL PROFILING")
print("=" * 65)
df['TotalCharges_num'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce').fillna(0.0)
num_cols = ['tenure', 'MonthlyCharges', 'TotalCharges_num']
desc = df[num_cols].describe().T[['mean', 'std', 'min', '25%', '50%', '75%', 'max']]
print(desc.round(2))

print("\nMean Breakdown by Churn Status:")
for col in num_cols:
    m_loyal = df[df['Churn'] == 'No'][col].mean()
    m_churn = df[df['Churn'] == 'Yes'][col].mean()
    diff_pct = ((m_churn - m_loyal) / m_loyal) * 100
    print(f"  {col:18s} | Loyal: {m_loyal:8.2f} | Churn: {m_churn:8.2f} | Shift: {diff_pct:+6.1f}%")

print("\n" + "=" * 65)
print("CELL 4: CATEGORICAL CHURN DRIVER CROSS-TABULATION")
print("=" * 65)
key_cats = ['Contract', 'InternetService', 'PaymentMethod', 'TechSupport']
for cat in key_cats:
    ct = pd.crosstab(df[cat], df['Churn'], normalize='index') * 100
    counts = df[cat].value_counts()
    print(f"\n--- {cat} ---")
    for val in ct.index:
        print(f"  {val:28s} | N = {counts[val]:4d} | Churn Rate: {ct.loc[val, 'Yes']:5.2f}%")

print("\n" + "=" * 65)
print("CELL 5: MULTICOLLINEARITY & PEARSON CORRELATION MATRIX")
print("=" * 65)
corr_matrix = df[num_cols].corr()
print(corr_matrix.round(3))
print("\nCorrelation with Churn Binary (1 = Yes, 0 = No):")
df['Churn_bin'] = (df['Churn'] == 'Yes').astype(int)
for col in num_cols:
    r = df[col].corr(df['Churn_bin'])
    print(f"  {col:18s} : r = {r:+.3f}")
