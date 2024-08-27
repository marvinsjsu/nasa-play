const { getHabitablePlanets } = require('../models/planets.model');

function httpGetPlanets (req, res) {
    const planets = getHabitablePlanets();
    return res.status(200).json(planets);
}

function httpGetPlanet (req, res) {
    const planetId = Number(req.params.planetId);

    if (!planetId) {
        return res.status(400).json({ message: 'Expected parameter is missing.' });
    } else {
        const planets = getHabitablePlanets();
        const planet = planets.find(planet => planet.id === planetId);

        if (planet) {
            return res.status(200).json(planet);
        } else {
            return res.status(404).json({ message: 'Record not found.' });
        }
    }
}

module.exports = {
    httpGetPlanets,
    httpGetPlanet,
};
