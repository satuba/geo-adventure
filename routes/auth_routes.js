'use strict';

var User = require('../models/User.js');
var bodyparser = require('body-parser');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    //add layer of protection
    var newUserData = JSON.parse(JSON.stringify(req.body));
    delete newUserData.email;
    delete newUserData.password;

    var newUser = new User(newUserData);
    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password, function(err, hash) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'could not save password'});
      }

      newUser.basic.password = hash;
    });

    newUser.save(function(err, user) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'could not create user'});
      }

      user.generateToken(process.env.APP_SECRET, function(err, token) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }

        res.json({token: token});
      });
    });
  });//end POST method

  router.get('/sign_in', function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'error generating token'});
      }

      res.json({token: token});
    });
  });//end GET method
};