//require orm file
var orm = require("../config/orm.js");

//call the three different orm functions
var bills = {
  selectAll: function(cb) {
    orm.selectAll(function(res) {
      cb(res);
    });
  },

  insertPayment: function(table, field1, field2, billID, cb){
    orm.insertPayment(table, field1, field2, billID, function(res){
      cb(res);
    });
  },

  insertOne: function(table, field1, field2, field3, field4, userID, billName, billCategory, frequency, cb) {
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
