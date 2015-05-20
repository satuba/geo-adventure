'use strict';

var Challenge = require('../models/Challenge');
var bodyparser = require('body-parser');
var uuid = require('node-uuid');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var auth = require('./auth_routes');
var User = require('../models/User');
var uploadPhoto = require('../lib/uploadPhoto');

module.exports = function(router) {
  router.use(bodyparser.json({limit: '50mb'}));
  router.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

  //GET request to get all challenges
  router.get('/challenges', eatAuth, function(req, res) {
    Challenge.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  //GET request to get a challenge by challenge id
  router.get('/challenges/:challengeId', eatAuth, function(req, res) {
    Challenge.findOne({'challengeId': req.params.challengeId}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  //POST request creates a new challenge
  router.post('/challenges/newchallenge', eatAuth, function(req, res) {
    var randomChallengeId = uuid.v1();
    var newChallengeData = JSON.parse(JSON.stringify(req.body));
    var newChallenge = new Challenge(newChallengeData);
    //CLAUDIA ADD
    console.log('req.body.image ' + req.body.image);
    var imageBuffer = new Buffer(req.body.image, 'base64');

    newChallenge.challengeName = req.body.challengeName;
    newChallenge.challengeId = randomChallengeId;
    newChallenge.location.latitude = req.body.location.latitude;
    newChallenge.location.longitude = req.body.location.longitude;
    newChallenge.location.altitude = req.body.location.altitude;
    newChallenge.location.timestamp = req.body.location.timestamp;
    newChallenge.creator = req.body.creator;
    newChallenge.submissionsCount = 0;
    console.log('challengeId for this challenge: ' + newChallenge.challengeId);

    uploadPhoto(imageBuffer, function (fileLocation) {
      newChallenge.imageURL = fileLocation;
      newChallenge.save(function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg:'internal server error'});
        }
        //CLAUDIA ADD
        console.log('data from challenge_route ' + data);
        res.json(data);
      });
    });
  });

  // PATCH request to submit completed challenge
  router.patch('/challenges/submit/:challengeId', eatAuth, function(req, res) {
    Challenge.findOne({'challengeId': req.params.challengeId}, function(err, challenge) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      var ratings = challenge.rating.allRatings;
      (ratings).push(req.body.newRating);
      (function average() {
        var sum = 0;
        for (var i = 0; i < ratings.length; i++) {
          ratings[i] = new Number(ratings[i]);
          sum = sum + ratings[i];
        };
        challenge.rating.averageRating = (sum / ratings.length);
        return challenge.rating.averageRating;
      })();

      challenge.rating.newRating = req.body.newRating;
      challenge.rating.averageRating = challenge.rating.averageRating.toFixed(2);

      challenge.submissionsMsg = req.body.submissionsMsg;
      challenge.submissionsCount = challenge.submissionsCount + 1;
      // CHANGE CREATOR INTO THE USER THAT SUBMITS THE CHALLENGE!!
      (challenge.submitters).push(challenge.creator);

      challenge.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg:'internal server error'});
      }
      res.json(challenge);
      console.log('challenge ' + challenge.challengeName + ' completed!');
      });
    });
  });

};
