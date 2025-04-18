import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load your Excel file
df = pd.read_excel("36b4a2ee-e74a-4015-ba16-6643182eca55.xlsx", sheet_name='Sheet1')

# --- 1. Extract numeric value from 'sellerproductcount' ---
def extract_product_count(val):
    if pd.isna(val):
        return np.nan
    import re
    match = re.search(r'over ([\d,]+)|of ([\d,]+)', val)
    if match:
        number = match.group(1) if match.group(1) else match.group(2)
        return int(number.replace(',', ''))
    return np.nan

df['sellerproductcount_cleaned'] = df['sellerproductcount'].apply(extract_product_count)

# --- 2. Extract percentage from 'sellerratings' ---
def extract_rating_percentage(val):
    if pd.isna(val):
        return np.nan
    import re
    match = re.search(r'(\d+)% positive', val)
    return int(match.group(1)) if match else np.nan

df['sellerratings_percent'] = df['sellerratings'].apply(extract_rating_percentage)

# --- 3. Convert rating columns to numeric ---
rating_cols = [
    'Hero Product 1 #ratings', 'Hero Product 2 #ratings',
    'Max % of negative seller ratings - last 30 days',
    'Max % of negative seller ratings - last 90 days',
    'Max % of negative seller ratings - last 12 months'
]
df[rating_cols] = df[rating_cols].apply(pd.to_numeric, errors='coerce')

# --- 4. Fill missing numeric values with median ---
for col in ['sellerproductcount_cleaned', 'sellerratings_percent'] + rating_cols:
    df[col].fillna(df[col].median(), inplace=True)

# --- 5. Scale selected numeric columns ---
scaler = StandardScaler()
scaled_columns = ['sellerproductcount_cleaned', 'sellerratings_percent'] + rating_cols
df_scaled = df.copy()
df_scaled[scaled_columns] = scaler.fit_transform(df_scaled[scaled_columns])

# --- 6. Optional: Save to CSV or Excel ---
# df_scaled.to_csv("preprocessed_seller_data.csv", index=False)

# View processed sample
print(df_scaled[scaled_columns + ['sellerlink', 'category']].head())