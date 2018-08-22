// require express for our server, then store the router method in a variable
var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// this route is a GET request for the root path, then runs the all function (from burger.js) as a method
// ...with a callback that stores all our data into hbsObject
// then we console log hbsObject, then render it to the root path using our index.handlebars view
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// This POST request points to our database and runs the function create (from burger.js) as a method
// ... which creates a new burger name based on the req.body.name value
// ...which is pulled from our text entry field (html + jQuery)
// Then runs a callback function that sends a json response
router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name"
  ], [
    req.body.name
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// This PUT request points to our database, specifically a dynamic ID within it
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// We're not actually using this function for our burgers app
// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
