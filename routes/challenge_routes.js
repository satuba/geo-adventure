'use strict';

var Challenge = require('../models/Challenge');
var bodyparser = require('body-parser');
var uuid = require('node-uuid');

module.exports = function(router) {
  router.use(bodyparser.json());

  //GET request to get all challenges
  router.get('/challenges', function(req, res) {
    Challenge.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  //GET request to get a challenge by challenge id
  router.get('/challenges/:challengeId', function(req, res) {
    Challenge.findOne({'challengeId': req.params.challengeId}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  //POST request creates a new challenge
  router.post('/challenges/newchallenge', function(req, res) {
    var randomChallengeId = uuid.v1();
    var newChallengeData = JSON.parse(JSON.stringify(req.body));
    var newChallenge = new Challenge(newChallengeData);
    newChallenge.challengeName = req.body.challengeName;
    newChallenge.challengeId = randomChallengeId;
    newChallenge.location.latitude = req.body.latitude;
    newChallenge.location.longitude = req.body.longitude;
    newChallenge.location.altitude = req.body.altitude;
    newChallenge.creator = req.body.creator;
    newChallenge.image = req.body.image;
    newChallenge.timestamp = req.body.timestamp;
    newChallenge.submissionsCount = 0;
    console.log('challengeId for this challenge: ' + newChallenge.challengeId);
    newChallenge.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg:'internal server error'});
      }
      res.json(data);
    });
  });

  // PATCH request to submit completed challenge
  router.patch('/challenges/submit/:challengeId', function(req, res) {
    Challenge.findOne({'challengeId': req.params.challengeId}, function(err, challenge) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      challenge.submissionsMsg = req.body.submissionsMsg;
      challenge.submissionsCount = challenge.submissionsCount + 1;

      // CHANGE CREATOR INTO THE USER THAT SUBMITS THE CHALLENGE!!
      (challenge.submitters).push(challenge.creator); 
      
      res.json(challenge);
      challenge.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg:'internal server error'});
      }
      console.log('challenge ' + challenge.challengeName + ' completed!');
      });
    });
  });

};