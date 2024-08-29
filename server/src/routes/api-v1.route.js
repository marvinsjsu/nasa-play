const express = require('express');

const launchesRouter = require('./launches.route');
const planetsRouter = require('./planets.route');

const apiVersion1 = express.Router();

apiVersion1.use('/launches', launchesRouter);
apiVersion1.use('/planets', planetsRouter)

module.exports = apiVersion1;
