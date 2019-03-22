import json
import face_recognition
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json')
firebase_admin.initialize_app(cred)

from google.cloud import storage
from google.auth import credentials
from PIL import Image
import numpy as np

# [START compare_photos]
def compare_photos(request):
    client = storage.Client.from_service_account_json('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json')

    bucket = client.get_bucket('hackathon-justice.appspot.com')

    blob = storage.Blob('0013760c-b817-4a32-a81f-31c0a630273b', bucket)

    blob.download_to_filename('temp.jpg')

    image = face_recognition.load_image_file("two.jpeg")
    # face_locations = face_recognition.face_locations(image)
    # face_encodings = face_recognition.face_encodings(image)
    face_encodings = []
    if len(face_encodings) < 1:
        # no face found
        pass

    # print(face_locations)
    # print(len(face_encodings))
    # print(json.dumps(face_encodings, cls=NumpyEncoder))
    #
    # print(np.asarray(json.loads(json.dumps(face_encodings, cls=NumpyEncoder))))

    encodings = json.dumps(face_encodings, cls=NumpyEncoder) if len(face_encodings) > 0 else False

    db = firestore.client()
    try:
        doc = {
            'name': 'Deji',
            'age': 20,
            'description': 'decs',
            'photoUrl': 'photo',
            'encodings': encodings
        }
        _ = db.collection(u'encodings').document().set(doc)

        r = json.dumps({"statusCode": 200, 'message': 'Photo Upload Successful'})
        print(r)
    except Exception as e:
        e = json.dumps({'error': 400, 'message': str(e)})
        print(e)
    return

    for face_location in face_locations:
        # Print the location of each face in this image
        top, right, bottom, left = face_location
        print("A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom,
                                                                                                    right))

        # You can access the actual face itself like this:
        face_image = image[top:bottom, left:right]
        pil_image = Image.fromarray(face_image)
        pil_image.show()

    return json.dumps({
        'statusCode': 200,
        'message': 'Match found',
        'data': face_locations
    })

# [END file_missing_report]
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

if __name__ == "__main__":


    compare_photos('d')
    # from flask import Flask, request
    #
    # app = Flask(__name__)
    #
    #
    # @app.route('/', methods=['GET'])
    # def index():
    #     return compare_photos(request)
    #
    #
    # app.run('127.0.0.1', 8000)
