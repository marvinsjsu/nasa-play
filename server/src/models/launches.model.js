
const axios = require('axios');

const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const {
    SPACEX_API_URL,
    LAUNCHES_QUERY,
} = require('../constants');


const INITIAL_FLIGHT_NUMBER = 100;


async function populateDBWithLaunches () {
    try {
        const launchesApiEndpoint = `${SPACEX_API_URL}/launches/query`;
        const response = await axios.post(launchesApiEndpoint, LAUNCHES_QUERY);

        if (response.status !== 200) {
            throw new Error('Unable to fetch launches data.');
        }

        const launchDocs = response.data.docs;

        for (const launchDoc of launchDocs) {
            const payloads = launchDoc['payloads'];
            const customers = payloads.flatMap(payload => payload['customers']);
            const launch = {
                flightNumber: launchDoc['flight_number'],
                launchDate: launchDoc['date_local'],
                rocket: launchDoc['rocket']['name'],
                upcoming: launchDoc['upcoming'],
                success: launchDoc['success'],
                mission: launchDoc['name'],
                customers,
            };

            console.log({ launch });
            await saveLaunch(launch);
        }
        
    } catch (err) {
        console.error('Unable to load launches: ', err)
    }
}

async function loadLaunchData () {
    const firstLaunch = await findLaunch({
        mission: 'FalconSat',
        rocket: 'Falcon 1',
        flightNumber: 1,
    });

    if (firstLaunch) {
        console.log('Launch data is already loaded.');
    } else {
        await populateDBWithLaunches();
    }
}

async function getAllLaunches (skip, limit, sort) {
    try {
        const query = {};
        const collation = {
            locale: 'en',
             caseLevel: false,
        };
        const projection =  {
            '_id': 0,
            '__v': 0,
        };

        return await launches
            .find(query,projection)
            .collation(collation)
            .sort(sort)
            .skip(skip)
            .limit(limit);
    } catch (err) {
        console.error(`Unable to retrieve launches: ${err}`);
    }
}

async function saveLaunch (launch) {
    try {
        const query = { flightNumber: launch.flightNumber };
        const option = { upsert: true };
        await launches.findOneAndUpdate(query, launch, option);
    } catch (err) {
        console.error(`Unable to add launch: ${err}`);
    };
}

async function scheduleNewLaunch (launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('Planet not found.');
    }

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
        const latestLaunch = await launches
            .findOne()
            .sort('-flightNumber');

        return Boolean(latestLaunch)
            ? latestLaunch.flightNumber
            : INITIAL_FLIGHT_NUMBER; 

    } catch (err) {
        console.error('Unable to get latest flight number: ${err}');
    }
}

async function findLaunch (filter) {
    console.log({ filter });
    return await launches.findOne(filter);
}

async function existsLaunchWithFlightNumber (flightNumber) {
    return await findLaunch({ flightNumber });
}

async function abortLaunchByFlightNumber (flightNumber) {
    const query = { flightNumber };
    const update = {
        upcoming: false,
        success: false,
    };

    const abortedLaunch = await launches.updateOne(query, update);

    return abortedLaunch.modifiedCount === 1;
}

// Only expose the setter and getter functions
module.exports = {
    existsLaunchWithFlightNumber,
    abortLaunchByFlightNumber,
    scheduleNewLaunch,
    loadLaunchData,
    getAllLaunches,
};
