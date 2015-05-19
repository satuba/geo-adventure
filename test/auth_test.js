'use strict';

//DB for testing only
process.env.MONGOLAB_URI = 'mongodb://localhost/user_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var eat = require('eat');

var User = require('../models/User.js');
var saveUserToken = '';

describe('User REST API test', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new user', function(done) {
    chai.request('localhost:3000')
      .post('/api/create_user')
      .send({username: 'claudiaTest', email: 'claudiaTest@example.com', password: 'soccer15'})
      .end(function(err, res) {
        saveUserToken = res.body.token;
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should sign in with an existing account', function(done) {
    chai.request('localhost:3000')
      .get('/api/sign_in')
      .auth('claudiaTest@example.com', 'soccer15')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});