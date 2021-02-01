'use strict';
const nconf = require("nconf");
const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const logger = require("../../lib/logger");

module.exports = function(callback) {
  const app = express();
  const port = nconf.get("NODE_PORT");

  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(nconf.get("api:prefix"), require("../../app/routes")());

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // Error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
  });

  app.listen(port, () => {
    logger.info(`[SERVER] Listening on port ${port}`);
    callback();
  }).on('error', function (error) {
    if(error.code === 'EADDRINUSE') {
        logger.error(`[SERVER] Port ${port} is busy`);
    }
    callback(true);
  });
}
