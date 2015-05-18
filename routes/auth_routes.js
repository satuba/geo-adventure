'use strict';

var User = require('../models/User.js');
var bodyparser = require('body-parser');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    // console.log(req.body);
    //add layer of protection
    var newUserData = JSON.parse(JSON.stringify(req.body));
    delete newUserData.email;
    delete newUserData.password;

    var newUser = new User(newUserData);
    newUser.basic.email = req.body.email;
    //newUser.basic.password = req.body.password;
    newUser.basic.password = newUser.generateHash(req.body.password, function(err, hash) {
        console.log('line 20 ' + req.body.password);
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'could not save password'});
        }
      
        newUser.basic.password = hash;

        newUser.save(function(err, user) {
          console.log('line 31 in auth route ' + user);
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
        });//end generateToken
      });//end save
    });//end generateHash
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