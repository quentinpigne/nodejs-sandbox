'use strict';
const { Router } = require("express");

module.exports = () => {
  const router = Router();

  router.route('/')
    .get((req, res) => {
      res.send('Hello World!');
    })
    .post((req, res) => {
      res.send(req.body);
    });

  return router;
}
