

exports.sample_nodejs = async (req, res) => {

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

    return {
        statusCode: 200,
        message: 'Hello nodejs!'
    }
};