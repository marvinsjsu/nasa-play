const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

function verifyCallback (accessToken, refreshToken, profile, done) {
    console.log('Google profile: ', profile);
    done(null, profile);
}

// Save the session to the cookie
function serializeUserCallback (user, done) {
    done(null, user.id);
}

// Read the session from the cookie
// This is where we can do database lookups
function deserializeUserCallback(userId, done) {
    done(null, userId);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
passport.serializeUser(serializeUserCallback);
passport.deserializeUser(deserializeUserCallback);

module.exports = passport;
