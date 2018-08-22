// Set up MySQL connection.
var mysql = require("mysql");

// define the details of the connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pip123",
  database: "burgers_db"
});

// Make connection active
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
// We will require this export within our orm.js file
module.exports = connection;
