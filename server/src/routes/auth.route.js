const express = require('express');

const passport = require('../services/passport.service');

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}));

authRouter.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/',
        session: false,
    }),
    (req, res) => {
        console.log('Google called us back!');
    }
);

authRouter.get('/logout', (req, res) => {});

authRouter.get('/failure', (req, res) => {
    return res.send('Failed to log in.');
});

module.exports = authRouter;
