'use strict';

// var mongoose = require('mongoose');
// var express = require('express');
// var passport = require('passport');
// var app = express();
// var

// app.listen(process.env.PORT || 3000, function() {
//   console.log('server running on port: ' + (process.env.PORT || 3000));
// });


// request.get({url: 'https://someurl/somefile.torrent', encoding: 'binary'}, function (err, response, body) {
//   fs.writeFile("/tmp/test.torrent", body, 'binary', function(err) {
//     if(err)
//       console.log(err);
//     else
//       console.log("The file was saved!");
//   });
// });

var write = require('./lib/imageWriter.js');

write('./img/sunflower.jpeg', function () {
  console.log('file saved');
})
