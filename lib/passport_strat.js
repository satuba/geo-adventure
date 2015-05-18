'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User.js');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    User.findOne({'basic.email': email}, function(err, user) {
      if(err) {
        return console.log('database error');
      }

      if(!user) {
        return console.log('user does not exist');
      }

      user.checkPassword(password, function(err, result) {
        if(err) {
          return console.log(err);
        }

        if(result) {
          return done(null, user);
        } else {
          return done('wrong password!');
        }
      });
    });
  }));
};