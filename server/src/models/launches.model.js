
const launches = new Map();

let latestFlightNumber = 1;

const launch = {
    flightNumber: 1,
    launchDate: new Date('October 1, 2024'),
    mission: 'Kepler 1A',
    rocket: 'SpaceX Dragon',
    customers: ['NOA', 'NASA'],
    target: 'Kepler-1652 b',
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches () {
    return Array.from(launches.values());
}

function addNewLaunch (launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customers: ['NOA', 'NASA'],
            upcoming: true,
            success: true,
        })
    );
}

function existsLaunchWithFlightNumber (flightNumber) {
    return launches.has(flightNumber);
}

function abortLaunchByFlightNumber (flightNumber) {
    const abortedLaunch = launches.get(flightNumber);
    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;
    return abortedLaunch;
}

// Only expose the setter and getter functions
module.exports = {
    existsLaunchWithFlightNumber,
    abortLaunchByFlightNumber,
    getAllLaunches,
    addNewLaunch,
};
