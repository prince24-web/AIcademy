import pandas as pd

df = pd.read_csv('telco_churn.csv')

# Binned tenure
tbins = [0, 12, 24, 36, 48, 60, 72]
tlabels = ['0-12m', '13-24m', '25-36m', '37-48m', '49-60m', '61-72m']
df['tenure_bin'] = pd.cut(df['tenure'], bins=tbins, labels=tlabels, include_lowest=True)

print("TENURE BINS:")
ct_t = pd.crosstab(df['tenure_bin'], df['Churn'])
ct_t_pct = pd.crosstab(df['tenure_bin'], df['Churn'], normalize='index') * 100
for b in tlabels:
    ch = ct_t.loc[b, 'Yes']
    lo = ct_t.loc[b, 'No']
    pct = ct_t_pct.loc[b, 'Yes']
    print(f"  {b:8s}: Churn={ch:4d} ({pct:5.1f}%), Loyal={lo:4d}, Total={ch+lo:4d}")

# Binned MonthlyCharges
mbins = [18, 35, 55, 75, 95, 120]
mlabels = ['$18-35', '$35-55', '$55-75', '$75-95', '$95-120']
df['mc_bin'] = pd.cut(df['MonthlyCharges'], bins=mbins, labels=mlabels, include_lowest=True)

print("\nMONTHLY CHARGES BINS:")
ct_m = pd.crosstab(df['mc_bin'], df['Churn'])
ct_m_pct = pd.crosstab(df['mc_bin'], df['Churn'], normalize='index') * 100
for b in mlabels:
    ch = ct_m.loc[b, 'Yes']
    lo = ct_m.loc[b, 'No']
    pct = ct_m_pct.loc[b, 'Yes']
    print(f"  {b:8s}: Churn={ch:4d} ({pct:5.1f}%), Loyal={lo:4d}, Total={ch+lo:4d}")
