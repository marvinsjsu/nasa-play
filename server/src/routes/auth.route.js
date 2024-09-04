const express = require('express');

const {
    httpGetLogout,
    httpGetFailure,
    httpGetAuthenticate,
    httpGetGoogleCallback,
} = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.get('/google/callback', httpGetGoogleCallback());
authRouter.get('/google', httpGetAuthenticate());
authRouter.get('/failure', httpGetFailure);
authRouter.get('/logout', httpGetLogout);

module.exports = authRouter;
