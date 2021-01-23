'use strict';
const async = require("async");
const logger = require("./config/initializers/logger");

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
