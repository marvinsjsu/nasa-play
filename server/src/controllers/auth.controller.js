
const passport = require('../middlewares/passport.middleware');


function httpGetAuthenticate () {
    return passport.authenticate('google', {
        scope: ['email', 'profile'],
    });
}

function httpGetGoogleCallback () {
    return passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/',
        session: true,
    });
}

async function httpGetLogout (req, res, next) {
    // Removes req.user and clears session
    await req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect('/');
    });
}

function httpGetFailure (req, res) {
    return res.send('Failed to log in.');
}

module.exports = {
    httpGetGoogleCallback,
    httpGetAuthenticate,
    httpGetFailure,
    httpGetLogout,
};
