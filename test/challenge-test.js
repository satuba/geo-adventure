'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/user_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

describe('challenges', function() {
  var tokenOfTokens;
  var id;

  before(function(done) {
    chai.request('localhost:3000')
      .post('/api/create_user')
      .send({
        username: 'newtest', 
        email: 'newtest@example.com', 
        password: 'foobar123'
      })
      .end(function(err, res) {
        tokenOfTokens = res.body.token;
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should post', function(done) {
    chai.request('localhost:3000')
    .post('/api/challenges/newchallenge')
    .send({
      challengeName:'nice challenge', 
      creator:'newtest', 
      image: 'image', 
      eat: tokenOfTokens})
    .end(function(err, res) {
      id = res.body.challengeId;
      console.log('id: ' + id);
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('object');
      expect(res.body.imageURL).to.exist;// jshint ignore:line
      expect(res.body.challengeId).to.exist;// jshint ignore:line
      expect(res.body.submitters).to.be.empty;// jshint ignore:line
      expect(res.body.challengeName).to.eql('nice challenge');
      done();
    });
  });

  it('should get all challenges', function(done) {
    chai.request('localhost:3000')
    .get('/api/challenges')
    .send({ eat: tokenOfTokens })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should get challenge by id', function(done) {
    chai.request('localhost:3000')
    .get('/api/challenges/' + id)
    .send({ eat: tokenOfTokens })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(typeof res.body).to.eql('object');
      expect(res.body.challengeName).to.eql('nice challenge');
      done();
    });
  });

  it('should update existing donut', function(done) {
    chai.request('localhost:3000')
    .patch('/api/challenges/submit/' + id)
    .send({
      newRating: 3, 
      submissionsMsg: 'awesomeee',
      username: 'newtest', 
      image: 'image string', 
      eat: tokenOfTokens
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.have.property('imageURL');
      done();
    });
  });

});