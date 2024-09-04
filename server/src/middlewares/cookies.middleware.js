const cookieSession = require('cookie-session');

const config = {
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [ process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2 ],
};

function addRegenAndSaveMiddleware (req, res, next) {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => cb();
    }

    if (req.session && !req.session.save) {
        req.session.save = (cb) => cb();
    }

    next();
}

module.exports = {
    cookieSession: cookieSession(config),
    addRegenAndSaveMiddleware,
};
