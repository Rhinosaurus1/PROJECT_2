//require orm file
var orm = require("../config/orm.js");


var bills = {

  selectHistory: function(table, billID, cb) {
    orm.selectHistory(table, billID, function(res) {
      cb(res);
    });
  },

  selectAllUnpaid: function(cb) {
    orm.selectAllUnpaid(function(res) {
      cb(res);
    });
  },

  selectAllBillsPayments: function(cb) {
    orm.selectAllBillsPayments(function(res) {
      cb(res);
    });
  },

  insertPayment: function(table, field1, field2, billID, cb){
    orm.insertPayment(table, field1, field2, billID, function(res){
      cb(res);
    });
  },

  insertNextPayment: function(table, field1, field2, billID, cb){
    orm.insertNextPayment(table, field1, field2, billID, function(res){
      cb(res);
    });
  },

  insertOne: function(table, field1, field2, field3, field4, userID, billName, billCategory, frequency, cb) {
    orm.insertOne(table, field1, field2, field3, field4, userID, billName, billCategory, frequency, function(res) {
      cb(res);
    });
  },

  updateOnePaymentNew: function(table, field1, amount, field2, confirmID, field3, paymentID, cb) {
    orm.updateOnePaymentNew(table, field1, amount, field2, confirmID, field3, paymentID, function(res) {
      cb(res);
    });
  },

  updateOneBill: function(table1, field1, billID, table2, field2, billID, cb) {
    orm.updateOneBill(table1, field1, billID, table2, field2, billID, function(res) {
      cb(res);
    });
  }
};


module.exports = bills;
