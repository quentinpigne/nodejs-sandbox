import dotenv from 'dotenv';
import nconf from 'nconf';
import async from 'async';

import logger from './lib/logger';
import initMongo from './config/initializers/mongo';
import initServer from './config/initializers/server';

// Load Environment variables from .env file
dotenv.config();

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
async.series(
  [
    (callback: (error?: Error | null) => void) => initMongo(callback),
    (callback: (error?: Error | null) => void) => initServer(callback),
  ],
  (error?: Error | null) => {
    if (error) {
      logger.error('[APP] Initialization failed');
    } else {
      logger.info('[APP] Initialized successfully');
    }
  },
);
