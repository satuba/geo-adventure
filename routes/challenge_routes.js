'use strict';

var Challenge = require('../models/Challenge');
var bodyparser = require('body-parser');
var uuid = require('node-uuid');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var auth = require('./auth_routes');
var User = require("../models/User");

module.exports = function(router) {
  router.use(bodyparser.json());

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
    newChallenge.challengeName = req.body.challengeName;
    newChallenge.challengeId = randomChallengeId;
    newChallenge.location.latitude = req.body.latitude;
    newChallenge.location.longitude = req.body.longitude;
    newChallenge.location.altitude = req.body.altitude;
    newChallenge.creator = req.body.creator;
    newChallenge.imageURL = req.body.imageURL;
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
  // to submit, just patch { submissionsMsg: 'submission message', eat:'token' }
  router.patch('/challenges/submit/:challengeId', eatAuth, function(req, res) {
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