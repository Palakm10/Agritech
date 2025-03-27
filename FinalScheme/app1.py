import streamlit as st
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API key
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Streamlit UI
st.set_page_config(page_title="Govt Schemes for Agriculture", layout="wide")

st.title("🌾 Government Agricultural Schemes")
st.markdown("This app shows government schemes for agriculture using **Gemini 1.5 Flash** model.")

# Prompt to fetch schemes
query = """
Give me a list of Indian government schemes related to agriculture. 
For each scheme include:
- Name
- Short description
- Number of beneficiaries (approx)
- States where it's active (if available)
- Official website URL for more info

Return it in markdown table format.
"""

@st.cache_data(ttl=3600)
def fetch_schemes():
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(query)
        return response.text
    except Exception as e:
        st.error(f"❌ Failed to fetch schemes: {e}")
        return None

markdown_data = fetch_schemes()

if markdown_data:
    st.markdown("### 🗂️ Available Schemes")
    st.markdown(markdown_data, unsafe_allow_html=True)
else:
    st.warning("⚠️ No scheme data available at the moment.")
