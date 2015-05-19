'use strict';

var User = require('../models/User.js');
var bodyparser = require('body-parser');

module.exports = function(router, passport) {
  router.use(bodyparser.json({limit: '50mb'}));
  router.use(bodyparser.urlencoded({limit: '50mb', extended: true}));


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
          //could not save password
          return res.status(500).json({msg: 'no password'});
        }
      
        newUser.basic.password = hash;

        newUser.save(function(err, user) {
          if(err) {
            console.log(err);
            var grabError = JSON.parse(JSON.stringify(err));
            var cleanError = grabError.errmsg.substr(57, 15);
            //could not create user
            return res.status(500).json({msg: cleanError});
          }
                          
          user.generateToken(process.env.APP_SECRET, function(err, token) {
            if(err) {
              console.log(err);
              //error generating token
              return res.status(500).json({msg: 'no token'});
            }

          res.json({token: token});
        });//end generateToken
      });//end save
    });//end generateHash
  });//end POST method

  router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'error generating token'});
      }

      res.json({token: token});
    });
  });//end GET method
};