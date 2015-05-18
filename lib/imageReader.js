'use strict';

var fs = require('fs');

function createFile (file, callback) {
  fs.writeFile('new-image.txt', file, function (err, inputFile) {
    if (err) {
      console.log(err);
      if (typeof callback === 'function') {
        callback();
      }
    }
  })
}

module.exports = function (input, callback) {
  write(input, callback || function () {
    console.log('file saved');
  })
  // fs.readFile(input, function (err, data) {
  // var inputBuffer;

  //   if (err) {
  //     console.log(err);
  //   }
  //   inputBuffer = new Buffer(data);
  //   fs.writeFile('saved-image.jpg', file, function (err, inputFile) {
  //     if (err) {
  //       console.log(err);
  //     }
  //   })
  // })
}

