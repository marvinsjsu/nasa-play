const { planets } = require('../models/planets.model');

function getPlanets (req, res) {
    return res.status(200).json(planets);
}

function getPlanet (req, res) {
    const planetId = Number(req.params.planetId);

    if (!planetId) {
        return res.status(400).json({ message: 'Expected parameter is missing.' });
    } else {
        const planet = planets.find(planet => planet.id === planetId);

        if (planet) {
            return res.status(200).json(planet);
        } else {
            return res.status(404).json({ message: 'Record not found.' });
        }
    }
}

module.exports = {
    getPlanets,
    getPlanet,
};
