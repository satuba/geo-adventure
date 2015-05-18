"use strict";

var mongoose = require("mongoose");
var express = require("express");
var passport = require("passport");
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || "app wide secret, Claudia";

var challengeRoutes = express.Router();
var userRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/challenges_development");

app.use(passport.initialize());

require("./lib/passport_strategies")(passport);

require("./routes/challenge_routes")(challengeRoutes);
require("./routes/auth_routes")(userRoutes, passport);

app.use("/api", challengeRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log("server running on port: " + (process.env.PORT || 3000));
});