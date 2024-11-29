import os

class Config:
    POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB = os.getenv("POSTGRES_DB", "soapdatabase")
    POSTGRES_USER = os.getenv("POSTGRES_USER", "soap_user")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "password")
    REST_API_BASE_URL = os.getenv("REST_API_BASE_URL", "http://api-rest:4000")
