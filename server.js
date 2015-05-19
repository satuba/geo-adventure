"use strict";

var mongoose = require("mongoose");
var express = require("express");
var passport = require("passport");
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || "changethisdamnpassword";

var challengeRoutes = express.Router();
var userRoutes = express.Router();
var dummyRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/challenges_development");

app.use(passport.initialize());

require("./lib/passport_strat")(passport);

require("./routes/challenge_routes")(challengeRoutes);
require("./routes/auth_routes")(userRoutes, passport);
require('./routes/dummy_routes')(dummyRoutes);

app.use("/api", challengeRoutes);
app.use("/api", userRoutes);
app.use('/api', dummyRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log("server running on port: " + (process.env.PORT || 3000));
});
