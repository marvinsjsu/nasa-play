const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse');

const planets = require('./planets.mongo');


function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async (data) => {
            if (isHabitablePlanet(data)) {
                await addPlanet(data);
            }
        })
        .on('error', (err) => {
            console.log('error: ', err);
            reject(err);
        })
        .on('end', async () => {
            const habitablePlanets = await getHabitablePlanets();
            console.log(`There are ${habitablePlanets.length} habitable planets.`);
            resolve();
        });
    });
};

async function getHabitablePlanets () {
    try {
        return await planets.find({}, {
            '_id': 0,
            '__v': 0,
        });
    } catch (err) {
        console.error(`Unable to get planets: ${err}`)
    }
}

async function addPlanet (planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, { 
            upsert: true, 
        });
    } catch (err) {
        console.error(`Unable to add planet: ${err}`);
    }
}

module.exports = {
    getHabitablePlanets,
    loadPlanetsData,
};
