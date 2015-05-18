"use strict";

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: String,
  basic: {
    email: {type: String, unique: true},
    password: String
  }
});
