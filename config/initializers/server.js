'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("winston");
const nconf = require("nconf");

module.exports = function(callback) {
  const app = express();
  const port = nconf.get("NODE_PORT");

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  app.post('/', (req, res) => {
    res.send(req.body);
  })

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
