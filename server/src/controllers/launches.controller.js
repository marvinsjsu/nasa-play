const {
    existsLaunchWithFlightNumber,
    abortLaunchByFlightNumber,
    getAllLaunches,
    addNewLaunch,
} = require('../models/launches.model');

function httpGetAllLaunches (req, res) {
    const launches = getAllLaunches();
    return res.status(200).json(launches);
}

function httpAddNewLaunch (req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing launch property.',
        });
    }
    
    launch.launchDate = new Date(launch.launchDate);

    // if (launch.launchDate.toString() === 'Invalid Date') {
    //     return res.status(400).json({
    //         error: 'Invalid launch date.',
    //     });
    // }

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date.',
        });
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch (req, res) {
    const flightNumber = Number(req.params.flightNumber);

    if (!existsLaunchWithFlightNumber(flightNumber)) {
        return res.status(404).json({
            error: 'Launch not found.',
        });
    }

    const launch = abortLaunchByFlightNumber(flightNumber);
    return res.status(200).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};
