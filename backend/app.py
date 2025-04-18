from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.impute import SimpleImputer
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize FastAPI app
app = FastAPI(title="Seller Performance Score Predictor")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to specific domains like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load and prepare dataset
df = pd.read_excel(r"dataset/seller_performance_scored.xlsx") 

# Create the Performance Score column if not already present
df['Performance Score'] = (
    df['Hero Product 1 #ratings'] -
    (df['Max % of negative seller ratings - last 12 months'] * 10) +
    (df['Count of seller brands'] * 5)
)

# Define features and target
features = [
    'Hero Product 1 #ratings',
    'Max % of negative seller ratings - last 12 months',
    'Count of seller brands'
]
target = 'Performance Score'

# Prepare the data
X = df[features]
y = df[target]

# Handle missing values
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X_imputed, y, test_size=0.2, random_state=42
)

# Train the model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
rmse = mean_squared_error(y_test, y_pred, squared=False)
r2 = r2_score(y_test, y_pred)

logging.info(f"Model trained with RMSE: {rmse:.2f} and R² Score: {r2:.4f}")


# Define input schema using Pydantic
class SellerData(BaseModel):
    hero_product_ratings: float
    max_negative_rating_percent: float
    seller_brand_count: int

# Prediction Route
@app.post("/predict")
def predict_performance(data: SellerData):
    # Convert input data to a dataframe
    input_data = [[
        data.hero_product_ratings,
        data.max_negative_rating_percent,
        data.seller_brand_count
    ]]

    # Apply the same imputer logic
    input_data_imputed = imputer.transform(input_data)

    # Predict using the trained model
    prediction = model.predict(input_data_imputed)[0]

    return {
        "predicted_performance_score": round(prediction, 2),
        "model_info": {
            "RMSE": round(rmse, 2),
            "R2_Score": round(r2, 4)
        }
    }


# uvicorn app:app --reload
