'use strict';

 var fs = require('fs');

module.exports = function (file, callback) {
  // read the files in the ./img folder and pass it into fs.readdir as list
  fs.readdir('./img/', function (err, list) {
    if (err) {
      console.log(err);
      return;
    }
    // assign the length of the list array to count
    var count = list.length;
    var fileLocation = 'https://shrouded-plateau-6281.herokuapp.com/img/challenge' + (count + 1) + '.jpg';
    // write file to file with counter in the name
    fs.writeFile('./img/challenge' + (count + 1) + '.jpg', file, function (err, inputFile) {
      if (err) {
        console.log(err);
      }
      // run the callback from the top function
      if (typeof callback === 'function') {
        callback(fileLocation);
      }
    });
  });
};
