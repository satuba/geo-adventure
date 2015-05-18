'use strict';

var fs = require('fs');

function createFile (file, callback) {
  fs.writeFile('./img/new-image-4.jpeg', file, function (err, inputFile) {
    if (err) {
      console.log(err);
    }
    if (typeof callback === 'function') {
      callback();
    }
  })
}

function read (fileName, callback) {
  fs.readFile(fileName, callback);
}

module.exports = function (input, callback) {

  read(input, function (err, file) {
    console.log(file);

    createFile(file, callback || function () {
      console.log('file saved');
    })
  })

}

