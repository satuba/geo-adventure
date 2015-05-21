'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'changethisdamnpassword';

var challengeRoutes = express.Router();
var userRoutes = express.Router();
var imageRoutes = express.Router();
//var searchRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/challenges_development');

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/challenge_routes')(challengeRoutes);
require('./routes/auth_routes')(userRoutes, passport);
//require('./routes/search_routes')(searchRoutes);
require('./routes/image_routes')(imageRoutes);

app.use('/api', challengeRoutes);
app.use('/api', userRoutes);
//app.use('/api', searchRoutes);
app.use('/', imageRoutes);

//error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {error: err});
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port: ' + (process.env.PORT || 3000));
});
