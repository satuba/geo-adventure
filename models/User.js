'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  username: { type: String, unique: true},
  basic: {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }
});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    if(err) {
      return console.log(err);
    }

    bcrypt.hash(password, salt, null, function(err, hash) {
      if(err) {
        return console.log(err);
      }
      
      callback(null, hash);
    });
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, result) {
    if(err) {
      console.log(err);
      return console.log('could not authenticate password');
    }

    callback(null, result);
  });
};

userSchema.methods.generateToken = function(secret, callback) {
  /*not using another key outside of DB id since we are   not expiring user tokens*/
  eat.encode({id: this._id}, secret, callback);
};

module.exports = mongoose.model('User', userSchema);
