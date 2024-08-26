const express = require('express');

const {
    getPlanets,
    getPlanet,
} = require('../controllers/planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getPlanets);
planetsRouter.get('/planets/:planetId', getPlanet);

module.exports = planetsRouter;
