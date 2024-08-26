const express = require('express');
const cors = require('cors');
const path = require('path');

const planetRouter = require('./routes/planets.route');

const app = express();

// set middlewares
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());

// set route handlers
app.use(planetRouter);

module.exports = app;
