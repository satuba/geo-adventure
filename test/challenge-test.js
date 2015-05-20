'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var eat = require('eat');
var bcypt = require('bcrypt-nodejs');
var expect = chai.expect;
chai.use(chaihttp);

var Challenge = require('../models/Challenge');
var User = require('../models/User');

process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require('../server');

describe('challenges', function() {
	var tokenOfTokens;

	before(function(done) {
    var challengeTest = new Challenge({challengeName: 'super mega challenge', 
    	latitude: 2.2424, longitude: 9.338, creator: 'Salazar', 
    	imageURL: 'https://image.url'});
    challengeTest.save(function(err, data) {
      if(err) { console.log(err); }
      this.challengeTest = data;
      done();
    }.bind(this));

    var userTest = new User({'username': 'mangosteeny', 'basic.email': 'mangosteeny@example.com', 'basic.password': 'lovelypassword'});
  	userTest.basic.password = userTest.generateHash(userTest.basic.password, function(err, hash) {
  		if (err) {
  			console.log(err);
  		}
  		userTest.basic.password = hash;
  		userTest.save(function(err, user) {
  			if (err) {
  				console.log(err);
  			}
  			console.log('user: ' + user);
  			user.generateToken(process.env.APP_SECRET, function(err, token) {
  				if(err) {
  					console.log(err);
  				}
  				tokenOfTokens = token;
  			});
  		});
  	});
  });

  it('should be able to make a note in a beforeEach block', function() {
    expect(this.challengeTest.challengeName).to.eql('super mega challenge');
    expect(this.challengeTest).to.have.property('_id');
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

	it('should get all challenges', function(done) {
		chai.request('localhost:3000')
		.get('/api/challenges')
		.send({ eat: + tokenOfTokens })
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			done();
		});
	});

	it('should ');

});