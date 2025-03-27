import streamlit as st
import joblib
import numpy as np
import pandas as pd

# Load the saved model, scaler, and label encoders
def load_model():
    try:
        model = joblib.load('crop_yield_model.joblib')
        scaler = joblib.load('crop_yield_scaler.joblib')
        label_encoders = joblib.load('crop_yield_label_encoders.joblib')
        return model, scaler, label_encoders
    except FileNotFoundError:
        st.error("Model files not found. Please train the model first.")
        return None, None, None

# Prediction function
def predict_yield(model, scaler, input_features):
    # Scale the input features
    input_scaled = scaler.transform([input_features])
    
    # Make prediction
    prediction = model.predict(input_scaled)
    return prediction[0]

# Streamlit app
def main():
    st.title('Crop Yield Prediction in Indian States')
    
    # Load the model
    model, scaler, label_encoders = load_model()
    
    if model is None or scaler is None or label_encoders is None:
        return
    
    # Create input fields
    st.header('Enter Crop Details')
    
    # Crop Selection
    crops = ['Select a Crop'] + sorted(list(label_encoders['Crop'].classes_))
    crop_selection = st.selectbox('Crop', crops)
    
    # State Selection
    states = ['Select a State'] + sorted(list(label_encoders['State'].classes_))
    state_selection = st.selectbox('State', states)
    
    # Season Selection
    seasons = ['Select a Season'] + sorted(list(label_encoders['Season'].classes_))
    season_selection = st.selectbox('Season', seasons)
    
    # Numerical inputs
    crop_year = st.number_input('Crop Year', min_value=1990, max_value=2025, value=2020)
    area = st.number_input('Area (in hectares)', min_value=0.0, step=0.1)
    annual_rainfall = st.number_input('Annual Rainfall', min_value=0.0, step=0.1)
    fertilizer = st.number_input('Fertilizer Usage', min_value=0.0, step=0.1)
    pesticide = st.number_input('Pesticide Usage', min_value=0.0, step=0.1)
    
    # Prediction button
    if st.button('Predict Crop Yield'):
        # Validate inputs
        if (crop_selection == 'Select a Crop' or 
            state_selection == 'Select a State' or 
            season_selection == 'Select a Season'):
            st.error("Please select all categorical fields.")
            return
        
        try:
            # Encode categorical variables
            crop_encoded = label_encoders['Crop'].transform([crop_selection])[0]
            state_encoded = label_encoders['State'].transform([state_selection])[0]
            season_encoded = label_encoders['Season'].transform([season_selection])[0]
            
            # Prepare input features
            input_features = [
                crop_encoded, 
                crop_year, 
                season_encoded, 
                state_encoded, 
                area, 
                annual_rainfall, 
                fertilizer, 
                pesticide
            ]
            
            # Make prediction
            prediction = predict_yield(model, scaler, input_features)
            
            # Display prediction
            st.success(f'Predicted Crop Yield: {prediction:.2f} tonnes per hectare')
            
            # Provide some context
            st.info('''
            Note:
            - This prediction is based on the specific Crop, Year, Season, State, and other agricultural factors.
            - Actual yields may vary due to complex environmental conditions.
            ''')
        
        except Exception as e:
            st.error(f"An error occurred during prediction: {e}")

# Run the app
if __name__ == "__main__":
    main()