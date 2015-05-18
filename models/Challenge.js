'use strict';

var mongoose = require('mongoose');

var challengeSchema = mongoose.Schema({
  challengeName: { type: String, required: true},
  challengeId: String,
  location: {
  	latitude: Number,
  	longitude: Number,
  	altitude: Number,
  	timestamp: String
  },
  creator: String,
  imageURL: String,
  submissionsMsg: String, // only for submitting a challenge, not for creation.
  submitters: Array,
  submissionsCount: Number
});

module.exports = mongoose.model('Challenge', challengeSchema);