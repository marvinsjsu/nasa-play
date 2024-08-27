const express = require('express');

const { getRoot } = require('../controllers/root.controller');

const rootRouter = express.Router();

// Express' path matching with `/*` will work for client-side
// frameworks that use HTML5 History API for routing.  This
// will send our React app for requests like `/upcoming`
rootRouter.get('/*', getRoot);

module.exports = rootRouter;
