const request = require('request-promise-native');
const admin = require('firebase-admin');

const serviceAccount = require('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hackathon-justice.firebaseio.com"
});
const firestore = admin.firestore();

exports.request_help = async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        return res.status(204).send('');
    } else {
        res.set('Access-Control-Allow-Origin', '*');
        // Set CORS headers for the main request
    }

    switch (req.method) {
        case 'POST':
            handlePOST(req, res);
            break;
        default:
            res.status(405).send({statusCode: 405, message: 'Method not allowed'});
            break;
    }

};

const handlePOST = async (req, res) => {

    const db = firestore.collection('help_requests');

    const data = req.body;

    try {

        const mapOptions = {
            method: 'GET',
            uri: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=AIzaSyD2LimKZCfSz8TjQkkxUpzXiT_dXHh8XCw`,
            json: true
        };

        const mapResponse = await request(mapOptions);
        let address = '';
        if (mapResponse.results[0].formatted_address) {
            address = mapResponse.results[0].formatted_address;
        } else {
            address = `lat, lng: ${data.lat}, ${data.lng}`;
        }

        const options = {
            method: 'POST',
            uri: 'https://us-central1-road20hub.cloudfunctions.net/make_post',
            body: {
                full_name: data.name,
                location: address,
                picture: data.photoUrl
            },
            json: true
        };



        const postResponse = await request(options);

        if (postResponse.error) {
            return res.json({
                statusCode: 200,
                message: 'Request logged successfully -',
                error: postResponse
            })
        }

        let encoding = [];
        const encodeOptions = {
            method: 'GET',
            uri: `http://35.185.95.238/encode?url=${data.photoUrl}`,
            json: true
        };
        try {
            const encodeResponse = await request(encodeOptions);
            const enc = JSON.parse(encodeResponse)
            if (enc.data) {
                encoding = enc.data
            }
        } catch (e) {

        }

        await db.add({
            ...data,
            location: address,
            encoding
        });

        return res.json({
            statusCode: 200,
            message: 'Request logged successfully',
            data: encoding
        })
    } catch (e) {
        return res.json({
            statusCode: 400,
            message: 'Request failed',
            error: e.message,
            data
        })
    }
};