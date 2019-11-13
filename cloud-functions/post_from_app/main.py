import sys
import os
import requests
from flask import jsonify


page_id = os.environ.get('PAGE_ID', '')
token = os.environ.get('ACCESS_TOKEN', '')

def format_key(key):
    return ' '.join([*map(str.title, key.split('_'))])

def make_post(request):
    try:
        token = os.environ.get('access_token', '')
        request_json = request.get_json(silent=True)
        message = 'A missing person\'s report was filed\n\n\n'
        data = {}

        if 'picture' in request_json:
            url = 'https://graph.facebook.com/v3.2/{0}/photos?access_token={1}'.format(page_id, token)
            print(url)
            if 'full_name' in request_json:
                message+='Name: {0}\n'.format(request_json['full_name'])
            if 'location' in request_json:
                message+='Was Last Seen: {0}\n'.format(request_json['location'])

            data['url'] = request_json['picture']

            if message == 'A missing person\'s report was filed\n\n\n':
                return jsonify({'error': True, 'message':'Empty Fields'})
            other_data = 'Other Information:\n'
            for k,v in request_json.items():
                if k not in ['full_name', 'location','picture']:
                    other_data+='\t- {0}: {1}\n'.format(format_key(k), v)
            if other_data!='Other Information:\n':
                message+=other_data
            data['caption'] = message
        else:
            url = 'https://graph.facebook.com/v3.2/{0}/feed?access_token={1}'.format(page_id, token)
            if 'full_name' in request_json:
                message+='Name: {0}\n'.format(request_json['full_name'])
                
            if 'location' in request_json:
                message+='Was Last Seen: {0}\n'.format(request_json['location'])
                
            if message == 'A missing person\'s report was filed\n\n\n':
                return jsonify({'error': True, 'message':'Empty Fields'})
            other_data = 'Other Information:\n'
            for k,v in request_json.items():
                if k not in ['full_name','location']:
                    other_data+='\t- {0}: {1}\n'.format(format_key(k), v)
            if other_data!='Other Information:\n':
                message+=other_data
            data['message'] = message

        # print(data)
        response = requests.post(url, json=data)
        return response.text
        # return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({'error': True, 'message':'An error occured'})


# [END file_missing_report]

if __name__ == "__main__":
    from flask import Flask, request

    app = Flask(__name__)

    @app.route('/',methods=['POST'])
    def post_caller():
        return make_post(request)
    

    app.run('127.0.0.1', 8000)
