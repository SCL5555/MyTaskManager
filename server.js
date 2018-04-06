// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// Requiring our models for syncing
var db = require("./models");
// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));
// Routes
// =============================================================
require("./routes/user-api-routes.js")(app);
require("./routes/task-api-routes.js")(app);
require("./routes/note-api-routes.js")(app);
require("./routes/html-routes.js")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

// require("dotenv").config();
// var twilio = require('twilio'); //download the twilio npm package
// var keys = require("./keys.js");
//
// var client = new twilio(keys.twilio.accountSid, keys.twilio.authToken);
//
// client.messages.create({
//     body: 'INSERT THE TASK HERE FROM THE DATA BASE',
//     to: '+12072515500',  // Text this number
//     from: '+16036643221' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));
