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
