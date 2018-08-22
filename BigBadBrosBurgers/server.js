var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8088;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json -- allows our requests to return a clean json
app.use(bodyParser.json());

// Set Handlebars -- defining the engine used, the default layout
// then defining a view engine and pointing to handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// this takes the module.exports variable created from burgersController.js
// the routes are used by the listener and remain active once they run
var routes = require("./controllers/burgersController.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
// this has to be running for the
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
