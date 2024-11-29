from wsgiref.simple_server import make_server
from app.soap_service import soap_app

if __name__ == "__main__":
    server = make_server("0.0.0.0", 5000, soap_app)
    print("SOAP API is running on http://0.0.0.0:5000")
    server.serve_forever()
