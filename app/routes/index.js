'use strict';
const { Router } = require("express");

module.exports = () => {
  const router = Router();

  router.use('/test', require("./test")());

  return router;
}
