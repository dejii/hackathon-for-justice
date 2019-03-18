import json


# [START functions_sample_python]
def sample_python(request):
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

    # get the payload for POST requests
    request_json = request.get_json()

    res = json.dumps({
        'statusCode': 200,
        'message': 'Hello world'
    })

    return res, 200, headers


# [END functions_sample_python]

if __name__ == "__main__":
    from flask import Flask, request

    app = Flask(__name__)


    @app.route('/', methods=['GET'])
    def index():
        return sample_python(request)


    app.run('127.0.0.1', 8000, debug=True)
