'use strict';
 var bodyparser = require('body-parser');
 var Challenge = require('../models/Challenge');
 var fs = require('fs');

 function createFile (file, callback) {
  fs.writeFile('./img/test-image-post.jpg', file, function (err, inputFile) {
    if (err) {
      console.log(err);
    }
    if (typeof callback === 'function') {
      callback();
    }
  })
}

function escapeSlashes (string) {
  return (string + '').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

 module.exports = function (router) {
  router.use(bodyparser.json());

  router.post('/dummy/addphoto', function (req, res) {
    // var originalBuffer = req.body.image;
    // console.log(originalBuffer);
    var originalBuffer = escapeSlashes(req.body.image);
    var imageBuffer = new Buffer(originalBuffer, 'base64');
    createFile(imageBuffer, function () {
      // if (err) {
      //   console.log(err);
      // }
      console.log('file saved');
    })
    res.json({msg: 'image saved'});
  })
 }
