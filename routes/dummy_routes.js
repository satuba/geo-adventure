'use strict';
 var bodyparser = require('body-parser');
 var Challenge = require('../models/Challenge');
 var fs = require('fs');

function createFile (file, callback) {
  // read the files in the ./img folder and pass it into fs.readdir as list
  fs.readdir('./img/', function (err, list) {
    if (err) {
      console.log(err);
      return;
    }
    // assign the length of the list array to count
    var count = list.length;
    // write file to file with counter in the name
    fs.writeFile('./img/test-image-post' + (count + 1) + '.jpg', file, function (err, inputFile) {
      if (err) {
        console.log(err);
      }
      // run the callback from the top function
      if (typeof callback === 'function') {
        callback();
      }
    });

  });
}

 module.exports = function (router) {
  router.use(bodyparser.json());
  // assign route to /dummy/addphoto
  router.post('/dummy/addphoto', function (req, res) {
    // create a base 64 buffer out of the value of req.body, which should be a base64 string
    var imageBuffer = new Buffer(req.body.image, 'base64');
    // run createFile function on the imageBuffer
    createFile(imageBuffer, function () {
      console.log('file saved');
    })
    // respond that image has been saved
    res.json({msg: 'image saved'});
  })
 }
