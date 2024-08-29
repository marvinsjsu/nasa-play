const {
    existsLaunchWithFlightNumber,
    abortLaunchByFlightNumber,
    scheduleNewLaunch,
    getAllLaunches,
} = require('../models/launches.model');

async function httpGetAllLaunches (req, res) {
    const launches = await getAllLaunches();
    return res.status(200).json(launches);
}

async function httpAddNewLaunch (req, res) {
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

    try {
        await scheduleNewLaunch(launch);
        return res.status(201).json(launch);        
    } catch (err) {
        console.error(`Unable to add launch: ${err}`);
        res.status(500).json({
            error: 'Unable to add launch.',
        });
    }
}

async function httpAbortLaunch (req, res) {
    const flightNumber = Number(req.params.flightNumber);
    const existsLaunch = await existsLaunchWithFlightNumber(flightNumber);
    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found.',
        });
    }

    const abortedLaunch = await abortLaunchByFlightNumber(flightNumber);

    if (!abortedLaunch) {
        return res.status(400).json({
            error: 'Unable to abort launch.',
        });
    }

    return res.status(200).json({
        message: 'Launch has been aborted.',
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};
