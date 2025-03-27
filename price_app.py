import os 
import streamlit as st
import pandas as pd
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler

def load_models():
    """
    Robust model loading with error handling
    """
    try:
        # Try loading from 'models' directory
        rf_model = joblib.load('models/random_forest_model.pkl')
        xgb_model = joblib.load('models/xgboost_model.pkl')
        return rf_model, xgb_model
    except FileNotFoundError:
        st.error("Models not found. Please train the models first.")
        return None, None

def preprocess_input(input_data):
    """
    Preprocess user input for prediction
    """
    # Time-based features
    input_data['Month'] = pd.to_datetime(input_data['Arrival_Date']).dt.month
    input_data['Year'] = pd.to_datetime(input_data['Arrival_Date']).dt.year
    input_data['DayOfWeek'] = pd.to_datetime(input_data['Arrival_Date']).dt.dayofweek
    
    # Encode categorical variables
    categorical_columns = ['State', 'District', 'Market', 'Commodity', 'Variety', 'Grade']
    for col in categorical_columns:
        le = LabelEncoder()
        # Combine training and input data for consistent encoding
        temp_data = pd.concat([st.session_state.training_data[col], input_data[col]])
        le.fit(temp_data.astype(str))
        input_data[f'{col}_Encoded'] = le.transform(input_data[col].astype(str))
    
    # Add rolling features (using simple estimates if full historical data not available)
    input_data['Price_Rolling_Mean'] = input_data['Min Price'] + input_data['Max Price'] / 2
    input_data['Price_Rolling_Std'] = input_data[['Min Price', 'Max Price']].std(axis=1)
    
    feature_columns = [
        'State_Encoded', 'District_Encoded', 'Market_Encoded', 
        'Commodity_Encoded', 'Variety_Encoded', 'Grade_Encoded',
        'Month', 'Year', 'DayOfWeek', 
        'Min Price', 'Max Price', 
        'Price_Rolling_Mean', 'Price_Rolling_Std'
    ]
    
    return input_data[feature_columns]

def main():
    st.title('Agricultural Commodity Price Prediction')
    
    # Check if models exist
    if not os.path.exists('models/random_forest_model.pkl') or not os.path.exists('models/xgboost_model.pkl'):
        st.warning("No trained models found. Please train the models first.")
        if st.button('Train Models'):
            # Import and run training script
            from price_prediction import AgriculturalPricePrediction
            predictor = AgriculturalPricePrediction('commodity_prices.csv')
            predictor.run_pipeline('commodity_prices.csv')
            st.success("Models trained successfully!")
    
    # Load models
    rf_model, xgb_model = load_models()
    
    if rf_model is None or xgb_model is None:
        st.stop()
    
    # Load training data for preprocessing
    df = pd.read_csv("commodity_prices.csv")
    st.session_state.training_data = pd.read_csv('commodity_prices.csv')
    
    # Sidebar for input
    st.sidebar.header('Input Features')
    
    # Input fields
    state = st.sidebar.selectbox('State',df["State"].unique().tolist())
    district = st.sidebar.selectbox('District',df["District"].unique().tolist())
    market = st.sidebar.selectbox('Market',df["Market"].unique().tolist())
    commodity = st.sidebar.selectbox('Commodity',df["Commodity"].unique().tolist())
    variety = st.sidebar.selectbox('Variety',df["Variety"].unique().tolist())
    grade = st.sidebar.selectbox('Grade',df["Grade"].unique().tolist())
    arrival_date = st.sidebar.date_input('Arrival Date')
    min_price = st.sidebar.number_input('Minimum Price', min_value=0.0)
    max_price = st.sidebar.number_input('Maximum Price', min_value=0.0)
    
    # Prepare input data
    input_data = pd.DataFrame({
        'State': [state],
        'District': [district],
        'Market': [market],
        'Commodity': [commodity],
        'Variety': [variety],
        'Grade': [grade],
        'Arrival_Date': [arrival_date],
        'Min Price': [min_price],
        'Max Price': [max_price]
    })
    
    # Prediction
    if st.sidebar.button('Predict Price'):
        try:
            # Preprocess input
            processed_input = preprocess_input(input_data)
            
            # Scale input
            scaler = StandardScaler()
            scaled_input = scaler.fit_transform(processed_input)
            
            # Predict using both models
            rf_prediction = rf_model.predict(scaled_input)[0]
            xgb_prediction = xgb_model.predict(scaled_input)[0]
            
            # Display results
            st.subheader('Prediction Results')
            st.write(f'Random Forest Predicted Modal Price: ₹{rf_prediction:.2f}')
            st.write(f'XGBoost Predicted Modal Price: ₹{xgb_prediction:.2f}')
            
            # Confidence and Interpretation
            st.subheader('Prediction Insights')
            st.write('Predictions are based on historical market trends and selected features.')
            st.write('Note: Actual market prices may vary due to real-time factors.')
        
        except Exception as e:
            st.error(f'Error in prediction: {e}')

if __name__ == '__main__':
    main()