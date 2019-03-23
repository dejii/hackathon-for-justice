const request = require('request-promise-native');
const admin = require('firebase-admin');

const serviceAccount = require('./hackathon-justice-firebase-adminsdk-6lwls-2c7a03d672.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hackathon-justice.firebaseio.com"
});
const firestore = admin.firestore();

exports.get_full_reports = async (req, res) => {

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
        case 'GET':
            handleGET(req, res);
            break;
        default:
            res.status(405).send({statusCode: 405, message: 'Method not allowed'});
            break;
    }

};

const handleGET = async (req, res) => {

    try {

        const ref = firestore.collection('full_requests');

        const reports = await ref.get();

        if (reports.empty) {
            return res.json({statusCode: 200, data: []})
        } else {
            const data = [];
            reports.forEach(doc => {
                data.push({...doc.data(), docRef: doc.id})
            });
            return res.json({statusCode: 200, data: data})
        }


    } catch (e) {
        return res.json({
            statusCode: 400,
            message: e.message ? e.message : 'Bad request'
        })
    }
};