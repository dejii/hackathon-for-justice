import json
import face_recognition
import numpy as np
import uuid
import os
from PIL import Image, ImageDraw

# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import firestore
# from google.cloud import storage

# cred = credentials.Certificate('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json')
# firebase_admin.initialize_app(cred)


def encodeFaces(fileRef):
    # client = storage.Client.from_service_account_json('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json')

    # bucket = client.get_bucket('hackathon-justice.appspot.com')

    # blob = storage.Blob(fileRef, bucket)

    # temp = 'temp-{}.jpg'.format(str(uuid.uuid4()))

    # blob.download_to_filename(temp)

    image = face_recognition.load_image_file('IMG_8624 2.JPG')
    # image = face_recognition.load_image_file('_MG_2339.JPG')

    face_encodings = face_recognition.face_encodings(image)
    face_locations = face_recognition.face_locations(image)

    for face_location in face_locations:
        # Print the location of each face in this image
        top, right, bottom, left = face_location
        print("A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom,
                                                                                                    right))

        # You can access the actual face itself like this:
        face_image = image[top:bottom, left:right]
        pil_image = Image.fromarray(face_image)
        pil_image.show()

    if len(face_encodings) < 1:
        face_encodings = []
    # print(np.asarray(json.loads(json.dumps(face_encodings, cls=NumpyEncoder))))

    # os.remove(temp)
    print(face_encodings)
    return face_encodings


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


def upload_photo(request):
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
        'location',
        'photoUrl',
        'fileRef'
    ]
    for param in required:
        if param not in request_json:
            e = json.dumps({'statusCode': 400, 'text': 'missing {}'.format(param)})
            return e, 200, headers

    encodings = encodeFaces(request_json['fileRef'])

    db = firestore.client()
    try:
        doc = {
            'location': request_json['location'],
            'fileRef': request_json['fileRef'],
            'photoUrl': request_json['photoUrl'],
            'encodings': json.dumps(encodings, cls=NumpyEncoder) if len(encodings) > 0 else False
        }
        _ = db.collection(u'encodings').document().set(doc)

        r = json.dumps({"statusCode": 200, 'message': 'Photo Upload Successful'})
        return r, 200, headers
    except Exception as e:
        e = json.dumps({'statusCode': 400, 'message': str(e)})
        return e, 200, headers


def file_missing_report(request):
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
            e = json.dumps({'statusCode': 400, 'text': 'missing {}'.format(param)})
            return e, 200, headers

    encodings = encodeFaces(request_json['fileRef'])

    db = firestore.client()
    try:
        doc = {
            'name': request_json['name'],
            'age': request_json['age'],
            'description': request_json['description'],
            'photoUrl': request_json['photoUrl'],
            'encodings': json.dumps(encodings, cls=NumpyEncoder) if len(encodings) > 0 else False
        }
        _ = db.collection(u'missing_persons').document().set(doc)

        r = json.dumps({"statusCode": 200, 'message': 'Photo Upload Successful'})
        return r, 200, headers
    except Exception as e:
        print(e)
        e = json.dumps({'statusCode': 400, 'message': str(e)})
        return e, 200, headers


if __name__ == "__main__":

    encodeFaces('cs')

    # from flask import Flask, request
    #
    # app = Flask(__name__)
    #
    #
    # @app.route('/upload_photo', methods=['POST'])
    # def upload():
    #     return upload_photo(request)
    #
    #
    # @app.route('/file_report', methods=['POST'])
    # def file_report():
    #     return file_missing_report(request)
    #
    #
    # app.run('127.0.0.1', 8000, debug=True)
