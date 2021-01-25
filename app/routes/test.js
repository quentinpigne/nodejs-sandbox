'use strict';
module.exports = app => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  app.post('/', (req, res) => {
    res.send(req.body);
  })
}
