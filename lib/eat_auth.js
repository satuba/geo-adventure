'use strict';

var eat = require('eat');
var User = require('../models/User.js');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;

    if(!token) {
      console.log('unauthorized, no token in request');
      res.status(401).json({msg: 'not authorized'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if(err) {
        console.log(err);
        res.status(401).json({msg: 'not authorized'});
      }

      User.findOne({_id: decoded.id}, function(err, user) {
        if(err) {
          console.log(err);
          res.status(401).json({msg: 'not authorized'});
        }

        if(!user) {
          console.log('no user found for that token');
          res.status(401).json({msg: 'not authorized'});
        }

        req.user = user;
        next();
      });
    });
  };
};