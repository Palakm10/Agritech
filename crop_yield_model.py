import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load and clean the dataset
def load_and_clean_data(file_path):
    # Read the CSV file
    df = pd.read_csv(file_path)
    
    # Print initial information about the dataset
    print("Dataset Information:")
    print(df.info())
    
    # Check for missing values
    print("\nMissing Values:")
    print(df.isnull().sum())
    
    # Remove rows with missing values
    df_cleaned = df.dropna()
    
    # Encode categorical variables
    label_encoders = {}
    categorical_columns = ['Crop', 'Season', 'State']
    
    for col in categorical_columns:
        le = LabelEncoder()
        df_cleaned[col] = le.fit_transform(df_cleaned[col])
        label_encoders[col] = le
    
    return df_cleaned, label_encoders

# Prepare features and target
def prepare_data(df):
    # Select features and target
    features = ['Crop', 'Crop_Year', 'Season', 'State', 'Area', 
                'Annual_Rainfall', 'Fertilizer', 'Pesticide']
    target = 'Yield'
    
    X = df[features]
    y = df[target]
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    return X_train_scaled, X_test_scaled, y_train, y_test, scaler, X.columns

# Train the model
def train_model(X_train, y_train):
    # Initialize and train Random Forest Regressor
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    return rf_model

# Evaluate the model
def evaluate_model(model, X_test, y_test):
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate metrics
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print("Model Evaluation:")
    print("Mean Squared Error:", mse)
    print("R-squared Score:", r2)
    
    return mse, r2

# Main execution
def main():
    # File path (update this to the actual path of your downloaded dataset)
    file_path = 'crop_yield.csv'
    
    # Load and clean data
    cleaned_df, label_encoders = load_and_clean_data(file_path)
    
    # Prepare data
    X_train, X_test, y_train, y_test, scaler, feature_names = prepare_data(cleaned_df)
    
    # Train model
    model = train_model(X_train, y_train)
    
    # Evaluate model
    evaluate_model(model, X_test, y_test)
    
    # Save the model, scaler, and label encoders
    joblib.dump(model, 'crop_yield_model.joblib')
    joblib.dump(scaler, 'crop_yield_scaler.joblib')
    joblib.dump(label_encoders, 'crop_yield_label_encoders.joblib')
    
    print("Model, scaler, and label encoders saved successfully!")
    
    # Print feature importances
    feature_importances = model.feature_importances_
    for name, importance in zip(feature_names, feature_importances):
        print(f"{name}: {importance}")

if __name__ == "__main__":
    main()