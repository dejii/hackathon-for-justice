const request = require('request-promise-native');
const admin = require('firebase-admin');

const serviceAccount = require('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hackathon-justice.firebaseio.com"
});
const firestore = admin.firestore();

exports.share_story = async (req, res) => {

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

    const db = firestore.collection('stories');

    const data = req.body;

    try {

        await db.add({
            ...data
        });
        const options = {
            method: 'POST',
            uri: 'https://us-central1-road20hub.cloudfunctions.net/story',
            body: data,
            json: true
        };


        const postResponse = await request(options);

        if (postResponse.error) {
            return res.json({
                statusCode: 200,
                message: 'Story shared successfully -',
                error: postResponse
            })
        }

        return res.json({
            statusCode: 200,
            message: 'Story shared successfully'
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