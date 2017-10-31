
//require default connection file
var connection = require("../config/connection.js");

//define the three different mySQL queries
var orm = {
  selectAll: function(cb) {
    var queryString = "SELECT * FROM bills";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function(table, field1, field2, field3, field4, userID, billName, billCategory, frequency, cb) {
    var queryString = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?);"
    console.log(queryString);
    connection.query(queryString, [table, field1, field2, field3, field4, userID, billName, billCategory, frequency] , function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  
  updateOne: function(table, field, billID, cb) {
    var queryString = "UPDATE ?? SET active_status ='0' WHERE ?? = ?";
    console.log(queryString);
    connection.query(queryString,[table, field, billID], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

module.exports = orm;