const path = require('path');

const express = require('express');
const helmet = require('helmet');

const corsMiddleware = require('./middlewares/cors.middleware');
const logsMiddleware = require('./middlewares/logs.middleware');
const authMiddleware = require('./middlewares/auth.middleware');
const {
    cookieSession,
    addRegenAndSaveMiddleware,
} = require('./middlewares/cookies.middleware');

const secretsRouter = require('./routes/secrets.route');
const apiV1Router = require('./routes/api-v1.route');
const rootRouter = require('./routes/root.route');
const authRouter = require('./routes/auth.route');

const passport = require('./middlewares/passport.middleware');

const ABS_PATH_PUBLIC = path.join(__dirname, '..', 'public');

const app = express();

// set middlewares
app.use(helmet());
app.use(cookieSession);
app.use(addRegenAndSaveMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(corsMiddleware);
app.use(logsMiddleware);

app.use(express.json());
app.use(express.static(ABS_PATH_PUBLIC));

// set route handlers
app.use('/v1', apiV1Router);
app.use('/auth', authRouter);
app.use('/secrets', authMiddleware, secretsRouter);
app.use(secretsRouter);
app.use(rootRouter);

module.exports = app;
