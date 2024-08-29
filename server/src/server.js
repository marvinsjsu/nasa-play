const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { connectMongoDB } = require('./services/mongo.service');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


async function startServer () {
    await connectMongoDB();
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}.`);
    });
}

startServer();
