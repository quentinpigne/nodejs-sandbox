'use strict';
const mongoose = require("mongoose");
const logger = require("winston");

module.exports = function(callback) {
  const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect('mongodb://mongo:27017/nodejs-sandbox', mongoConfig, error => {
    if (error) {
      callback(true);
    } else {
      logger.info('[MONGO] MongoDB successfully initialized');
      callback();
    }
  });
}
