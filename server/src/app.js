const path = require('path');

const express = require('express');

const corsMiddleware = require('./middlewares/cors.middleware');
const logsMiddleware = require('./middlewares/logs.middleware');

const launchesRouter = require('./routes/launches.route');
const planetRouter = require('./routes/planets.route');
const rootRouter = require('./routes/root.route');

const app = express();

const ABS_PATH_PUBLIC = path.join(__dirname, '..', 'public');

// set middlewares
app.use(corsMiddleware);
app.use(logsMiddleware);

app.use(express.json());
app.use(express.static(ABS_PATH_PUBLIC));

// set route handlers
app.use('/launches', launchesRouter);
app.use('/planets', planetRouter);
app.use(rootRouter);

module.exports = app;
