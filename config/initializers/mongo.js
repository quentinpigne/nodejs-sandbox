'use strict';
const nconf = require("nconf");
const mongoose = require("mongoose");

const logger = require("../../lib/logger");

module.exports = function(callback) {
  const config = nconf.get("mongo");
  const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, mongooseConfig, error => {
    if (error) {
      callback(true);
    } else {
      logger.info('[MONGO] MongoDB successfully initialized');
      callback();
    }
  });
}
