// 'use strict';

// var bodyparser = require('body-parser');
// var eatAuth = require('../lib/eat_auth.js');
// var Challenge = require('../models/Challenge.js');

// module.exports = function(router) {
//   router.use(bodyparser.json());

//   router.get('/search', function(req, res) {
//     Challenge.find({
//       loc: {
//         $near: {
//           $geometry: {
//             type: 'Point',
//             coordinates: [req.body.longitude, req.body.latitude]
//         //$maxDistance: req.body.maxD
//       }
//     }).exec(function(err, query) {
//       if(err) {
//         console.log(err);
//       }
//       res.send(query);
//       res.end();
//     });
//   });//end GET method
// };