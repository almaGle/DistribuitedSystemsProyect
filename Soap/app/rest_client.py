import requests
from app.config import Config

def fetch_employees():
    url = f"{Config.REST_API_BASE_URL}/employees"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
