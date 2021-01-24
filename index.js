'use strict';
const nconf = require("nconf");
const async = require("async");
const logger = require("./config/initializers/logger");

// Load Environment variables from .env file
require('dotenv').config();

// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();
// Load config file for the environment
nconf.file(`./config/environments/${nconf.get('NODE_ENV')}.json`);

logger.info('[APP] Starting server initialization');

// Initialize Modules
async.series([
  callback => require("./config/initializers/mongo")(callback),
  callback => require("./config/initializers/server")(callback)
], error => {
  if (error) {
    logger.error('[APP] Initialization failed', error);
  } else {
    logger.info('[APP] Initialized successfully');
  }
})
