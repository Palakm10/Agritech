# main.py

import streamlit as st
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyAL6WQJe-AwJA9Fxe4kZDc2FgRxKleSSSc")  # Replace with your key

# Load the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

# Streamlit UI
st.title("🌾 Intelligent Crop Recommender")

st.markdown("Get the best crop suggestion based on your location and conditions.")

# Input form
with st.form("crop_form"):
    state = st.selectbox("Select your state", ["Gujarat", "Maharashtra", "Punjab", "Tamil Nadu", "Karnataka", "Other"])
    water = st.selectbox("Water Availability", ["Low", "Medium", "High"])
    area = st.number_input("Farm area (in acres)", min_value=0.1, step=0.1)
    submit = st.form_submit_button("Get Recommendation")

if submit:
    # Dynamic prompt creation
    prompt = (
    f"Suggest the most profitable and suitable crop to grow in {state}, "
    f"considering {water.lower()} water availability and {area} acre of land. "
    f"Also take into account the current agricultural market trends and recent news about crops, "
    f"such as demand, government policies, or climate conditions. "
    f"Provide the result in a clear and structured bullet-point format with the following fields:\n"
    f"- Recommended Crop\n"
    f"- Yield Estimate (in kg or tons per acre)\n"
    f"- Market Price (average or range)\n"
    f"- Estimated Profit per Acre\n"
    f"- Planting Time\n"
    f"- Duration to Harvest\n"
    f"- Climate Suitability\n"
    f"- Risk Factors\n"
    f"- Recent News Insight (if any)\n"
    f"- Key Recommendations (1-2 lines max)\n"
    f"Keep it short and scannable, avoid long paragraphs."
)

    # Send to Gemini
    with st.spinner("Generating recommendation..."):
        try:
            response = model.generate_content(prompt)
            st.success("✅ Recommendation:")
            st.markdown(response.text)
        except Exception as e:
            st.error("❌ Failed to get recommendation from Gemini.")
            st.exception(e)
