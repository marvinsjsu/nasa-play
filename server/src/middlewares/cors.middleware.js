const cors = require('cors');

const CORS_WHITELIST = [
    'http://localhost:3000',
];

const corsOptions = {
    origin: function (origin, callback) {
        if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    // origin: 'http://localhost:3000',
};

module.exports = cors(corsOptions);
