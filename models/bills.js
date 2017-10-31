//require orm file
var orm = require("../config/orm.js");

//call the three different orm functions
var bills = {
  selectAll: function(cb) {
    orm.selectAll(function(res) {
      cb(res);
    });
  },

  insertOne: function(table, field1, field2, field3, field4, userID, billName, billCategory, frequency, cb) {
    console.log("table: " + table);
    console.log("field1: " + field1);
    console.log("field2: " + field2);
    console.log("field3: " + field3);
    console.log("field4: " + field4);
    console.log("userID: " + userID);
    console.log("billName: " + billName);
    console.log("billCategory: " + billCategory);
    console.log("frequency: " + frequency);
    orm.insertOne(table, field1, field2, field3, field4, userID, billName, billCategory, frequency, function(res) {
      cb(res);
    });
  },

  updateOne: function(table, field, billID, cb) {
    console.log("table: " + table);
    console.log("field: " + field);
    console.log("billID: " + billID);
    orm.updateOne(table, field, billID, function(res) {
      cb(res);
    });
  }
};


module.exports = bills;
