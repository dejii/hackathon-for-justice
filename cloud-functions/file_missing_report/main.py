import json

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json')
firebase_admin.initialize_app(cred)


# [START file_missing_report]
def file_missing_report(request):
    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return '', 204, headers

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    request_json = request.get_json()
    if not request_json:
        e = json.dumps({'statusCode': 400, 'message': 'missing payload'})
        return e, 200, headers
    
    # validate the required fields 
    required = [
        'name',
        'age',
        'photoUrl'
    ]
    for param in required:
        if param not in request_json:
            e = json.dumps({'error': 400, 'text': 'missing {}'.format(param) })
            return e, 200, headers

    # connect to firestore
    db = firestore.client()
    
    # create the document
    try:
        doc = {
            'name': request_json['name'],
            'age': request_json['age'],
            'description': request_json['description'],
            'photoUrl': request_json['photoUrl']
        }
        _ = db.collection(u'missing_persons').document().set(doc)
        
        r = json.dumps({"statusCode": 200, 'message': 'Photo Upload Successful'})
        return r, 200, headers
    except Exception as e:
        e = json.dumps({'error': 400, 'message': str(e)})
        return e, 200, headers

# [END file_missing_report]

if __name__ == "__main__":
    from flask import Flask, request

    app = Flask(__name__)


    @app.route('/', methods=['POST'])
    def index():
        return file_missing_report(request)


    app.run('127.0.0.1', 8000)
