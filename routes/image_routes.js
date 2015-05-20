'use strict';

var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var auth = require('../lib/eat_auth');
var fs = require('fs');

module.exports = function (router) {
  router.use(bodyparser.json());

  router.get('/image/:image', eatAuth, function (req, res) {
    fs.readFile('./img/' + req.params.image, function (err, data) {
      res.write(data);
      res.end();
    });
  });
};