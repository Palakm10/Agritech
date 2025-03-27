import os 
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.impute import SimpleImputer
import xgboost as xgb
import joblib

class AgriculturalPricePrediction:
    def __init__(self, data_path):
        """
        Initialize the price prediction model with robust data handling
        
        :param data_path: Path to the CSV file containing agricultural commodity data
        """
        self.data = pd.read_csv(data_path)
        self.preprocessed_data = None
        self.model = None
        self.feature_importances = None
    
    def clean_data(self):
        """
        Comprehensive data cleaning method
        """
        # Convert Arrival_Date to datetime with error handling
        self.data['Arrival_Date'] = pd.to_datetime(self.data['Arrival_Date'], format='%d-%m-%Y', errors='coerce')
        
        # Remove rows with invalid dates
        self.data.dropna(subset=['Arrival_Date'], inplace=True)
        
        # Numeric columns cleaning
        numeric_columns = ['Min Price', 'Max Price', 'Modal Price']
        for col in numeric_columns:
            # Replace infinite values with NaN
            self.data[col] = self.data[col].replace([np.inf, -np.inf], np.nan)
            
            # Remove or replace extreme outliers
            Q1 = self.data[col].quantile(0.25)
            Q3 = self.data[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            self.data[col] = np.where(
                (self.data[col] >= lower_bound) & (self.data[col] <= upper_bound), 
                self.data[col], 
                np.nan
            )
        
        # Impute missing numeric values
        numeric_imputer = SimpleImputer(strategy='median')
        self.data[numeric_columns] = numeric_imputer.fit_transform(self.data[numeric_columns])
        
        return self.data
    
    def preprocess_data(self):
        """
        Preprocess the cleaned agricultural commodity dataset
        """
        # Clean data first
        self.clean_data()
        
        # Extract time-based features
        self.data['Month'] = self.data['Arrival_Date'].dt.month
        self.data['Year'] = self.data['Arrival_Date'].dt.year
        self.data['DayOfWeek'] = self.data['Arrival_Date'].dt.dayofweek
        
        # Encode categorical variables
        categorical_columns = ['State', 'District', 'Market', 'Commodity', 'Variety', 'Grade']
        label_encoders = {}
        
        for col in categorical_columns:
            le = LabelEncoder()
            self.data[f'{col}_Encoded'] = le.fit_transform(self.data[col].astype(str))
            label_encoders[col] = le
        
        # Create price trend features
        self.data['Price_Rolling_Mean'] = self.data.groupby('Commodity')['Modal Price'].transform(lambda x: x.rolling(window=3, min_periods=1).mean())
        self.data['Price_Rolling_Std'] = self.data.groupby('Commodity')['Modal Price'].transform(lambda x: x.rolling(window=3, min_periods=1).std())
        
        # Prepare features and target
        feature_columns = [
            'State_Encoded', 'District_Encoded', 'Market_Encoded', 
            'Commodity_Encoded', 'Variety_Encoded', 'Grade_Encoded',
            'Month', 'Year', 'DayOfWeek', 
            'Min Price', 'Max Price', 
            'Price_Rolling_Mean', 'Price_Rolling_Std'
        ]
        
        X = self.data[feature_columns]
        y = self.data['Modal Price']
        
        # Final check for infinite or NaN values
        X = X.replace([np.inf, -np.inf], np.nan)
        X.fillna(X.median(), inplace=True)
        
        return X, y
    
    def train_model(self, X, y, test_size=0.2, random_state=42):
        """
        Train Random Forest and XGBoost models with robust handling
        """
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)
        
        # Scale numerical features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Random Forest Model with error handling
        rf_model = RandomForestRegressor(
            n_estimators=100, 
            random_state=random_state,
            max_features='sqrt',  # Prevent overfitting
            min_samples_split=5,  # Prevent complex trees
            n_jobs=-1  # Use all available cores
        )
        rf_model.fit(X_train_scaled, y_train)
        
        # XGBoost Model with regularization
        xgb_model = xgb.XGBRegressor(
            n_estimators=100, 
            learning_rate=0.1, 
            random_state=random_state,
            reg_alpha=1,  # L1 regularization
            reg_lambda=1  # L2 regularization
        )
        xgb_model.fit(X_train_scaled, y_train)
        
        # Predictions and Evaluation
        rf_pred = rf_model.predict(X_test_scaled)
        xgb_pred = xgb_model.predict(X_test_scaled)
        
        print("Random Forest Metrics:")
        print(f"RMSE: {np.sqrt(mean_squared_error(y_test, rf_pred))}")
        print(f"R² Score: {r2_score(y_test, rf_pred)}")
        
        print("\nXGBoost Metrics:")
        print(f"RMSE: {np.sqrt(mean_squared_error(y_test, xgb_pred))}")
        print(f"R² Score: {r2_score(y_test, xgb_pred)}")
        
        # Feature Importance
        self.feature_importances = pd.DataFrame({
            'feature': X.columns,
            'rf_importance': rf_model.feature_importances_,
            'xgb_importance': xgb_model.feature_importances_
        }).sort_values('rf_importance', ascending=False)
        
        return rf_model, xgb_model
    
    def save_models(self, rf_model, xgb_model):
        """
        Save trained models to a specific directory
        """
        # Create models directory if it doesn't exist
        if not os.path.exists('models'):
            os.makedirs('models')
        
        # Save models with descriptive names
        joblib.dump(rf_model, 'models/random_forest_model.pkl')
        joblib.dump(xgb_model, 'models/xgboost_model.pkl')
        
        print("Models saved successfully!")

    def run_pipeline(self, data_path):
        """
        Run complete data processing and model training pipeline
        """
        X, y = self.preprocess_data()
        rf_model, xgb_model = self.train_model(X, y)
        
        # Save the models
        self.save_models(rf_model, xgb_model)
        
        return rf_model, xgb_model

# Example usage
predictor = AgriculturalPricePrediction('commodity_prices.csv')
rf_model, xgb_model = predictor.run_pipeline('commodity_prices.csv')