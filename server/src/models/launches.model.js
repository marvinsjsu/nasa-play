
const launchesDb = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

const INITIAL_FLIGHT_NUMBER = 100;


async function getAllLaunches () {
    try {
        return await launchesDb.find({}, {
            '_id': 0,
            '__v': 0,
        });
    } catch (err) {
        console.error(`Unable to retrieve launches: ${err}`);
    }
}

async function saveLaunch (launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('Planet not found.');
    }

    try {
        const query = { flightNumber: launch.flightNumber };
        const option = { upsert: true };
        await launchesDb.findOneAndUpdate(query, launch, option);
    } catch (err) {
        console.error(`Unable to add launch: ${err}`);
    };
}

async function scheduleNewLaunch (launch) {
    const latestFlightNumber = await getLatestFlightNumber();

    const newLaunch = Object.assign(launch, {
        flightNumber: latestFlightNumber + 1,
        customers: ['NOA', 'NASA', 'ZTM'],
        upcoming: true,
        success: true,
    });

    await saveLaunch(newLaunch);
}

async function getLatestFlightNumber () {
    try {
        const latestLaunch = await launchesDb
            .findOne()
            .sort('-flightNumber');

        return Boolean(latestLaunch)
            ? latestLaunch.flightNumber
            : INITIAL_FLIGHT_NUMBER; 

    } catch (err) {
        console.error('Unable to get latest flight number: ${err}');
    }
}

async function existsLaunchWithFlightNumber (flightNumber) {
    return launchesDb.findOne({ flightNumber });
}

async function abortLaunchByFlightNumber (flightNumber) {
    const query = { flightNumber };
    const update = {
        upcoming: false,
        success: false,
    };

    const abortedLaunch = await launchesDb.updateOne(query, update);

    return abortedLaunch.modifiedCount === 1;
}

// Only expose the setter and getter functions
module.exports = {
    existsLaunchWithFlightNumber,
    abortLaunchByFlightNumber,
    getAllLaunches,
    scheduleNewLaunch,
};
