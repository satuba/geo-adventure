'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User.js');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    User.findOne({'basic.email': email}, function(err, user) {
      console.log('USER : ' + user);
      if (user === null) {
        console.log('no account with this email');
        return done('no account with this email');
      }
      if(err) {
        console.log('database error');
      }

      if(!user) {
        console.log('user does not exist');
      }

      user.checkPassword(password, function(err, result) {
        if(err) {
          console.log(err);
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
