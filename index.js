'use strict';
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const morgan = require("morgan");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
})

const mongoose = require("mongoose");
mongoose.connect('mongodb://mongo:27017/nodejs-sandbox', { useNewUrlParser: true, useUnifiedTopology: true });

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
  logger.info(`Example app listening at http://localhost:${port}`);
})
