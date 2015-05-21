'use strict';

var bodyparser = require('body-parser');
var fs = require('fs');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/img/:image', function(req, res) {
    fs.readFile('./img/' + req.params.image, function(err, data) {
 			if(err) {
 				return console.log(err);
 			}

      res.write(data);
      res.end();
    });
  });
};
