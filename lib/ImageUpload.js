'use strict';

var fs = require('fs');
exports.uploadImage = uploadImage;

function uploadImage(image) {
  fs.readFile(image, function(err, data) {

  	if (err) {
      console.log('Error reading ' + image);
      return;
    }

    var baseEncodedImage = data.toString('base64');

    var decodedImage = new Buffer(baseEncodedImage, 'base64');

    fs.writeFile('./../img/decodedImage.jpg', decodedImage, function(err) {
    	if (err) {
        console.log('Error writing ' + image);
        return;
    }
    });
  });
}

