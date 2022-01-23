import nconf from 'nconf';
import mongoose from 'mongoose';

import logger from '../../lib/logger';

type MongoConfig = {
  host: string;
  port: number;
  database: string;
};

export default function (callback: (error?: Error | null) => void) {
  const config: MongoConfig = nconf.get('mongo');
  const mongooseConfig: mongoose.ConnectOptions = {};

  mongoose.connect(
    `mongodb://${config.host}:${config.port}/${config.database}`,
    mongooseConfig,
    (error: mongoose.CallbackError) => {
      if (error) {
        logger.info('[MONGO] MongoDB initialization failed');
        callback(error);
      } else {
        logger.info('[MONGO] MongoDB successfully initialized');
        callback();
      }
    },
  );
}
