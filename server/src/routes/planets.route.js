const express = require('express');

const {
    httpGetPlanets,
    httpGetPlanet,
} = require('../controllers/planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetPlanets);
planetsRouter.get('/:planetId', httpGetPlanet);

module.exports = planetsRouter;
