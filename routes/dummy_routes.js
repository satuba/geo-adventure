'use strict';
 var bodyparser = require('body-parser');
 var Challenge = require('../models/Challenge');

 function createFile (file, callback) {
  fs.writeFile('../img/test-image-post.jpg', file, function (err, inputFile) {
    if (err) {
      console.log(err);
    }
    if (typeof callback === 'function') {
      callback();
    }
  })
}

 module.exports = function (router) {
  router.use(bodyparser.json());

  router.post('/dummy/addphoto:image', function (req, res) {
    var imageBuffer = new Buffer(req.params.image, 'base64');
    createFile(imageBuffer, function () {
      console.log('file saved');
    })
  })
 }
