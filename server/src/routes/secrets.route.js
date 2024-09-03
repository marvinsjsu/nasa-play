const express = require('express');

const { httpGetSecrets } = require('../controllers/secrets.controller');

const secretsRouter = express.Router();

secretsRouter.get('', httpGetSecrets);

module.exports = secretsRouter;
