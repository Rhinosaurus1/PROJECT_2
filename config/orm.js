
//require default connection file
var connection = require("../config/connection.js");

//define the different mySQL queries
var orm = {

  selectHistory: function(table, billID, cb) {
    var queryString = "select b.bill_name,p.bill_id, date_format((p.date_paid), '%m-%d-%Y') as 'date_paid_formatted',p.amount,p.confirmation_code from ?? as p inner join bills as b on p.bill_id = b.bill_id where p.paid_status != 0 and p.bill_id = ?";
    connection.query(queryString, [table, billID], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  selectAllUnpaid: function(cb){
    var queryString = "SELECT p.bill_id, date_format((p.month_due), '%b-%Y') as 'month_due_formatted', p.paid_status, b.bill_name from payments as p inner join bills as b on p.bill_id = b.bill_id where Month(month_due) = MONTH(Current_date()) and Year(month_due) = Year(Current_date()) and p.paid_status = 0;";
    connection.query(queryString, function(err, result){
      if (err) {
          throw err;
      }
        cb(result);
    }); 
  },

  selectAllBillsPayments: function(cb){
    var queryString1 = "SELECT * FROM bills";
    var queryString2 = "SELECT p.payment_id, p.bill_id, date_format((p.date_paid), '%m-%d-%Y') as 'date_paid_formatted', p.confirmation_code, p.amount, date_format((p.month_due), '%b-%Y') as 'month_due_formatted', p.paid_status, b.bill_name, p.active_status from payments as p inner join bills as b on p.bill_id = b.bill_id where Month(month_due) = MONTH(Current_date()) and Year(month_due) = Year(Current_date())";
    var queryString = queryString1 + ";" + queryString2;
    connection.query(queryString, function(err, result){
      if (err) {
          throw err;
      }
        cb(result);
    }); 
  },

  insertPayment: function(table, field1, field2, billID, cb){
    var queryString = "INSERT INTO ?? (??,??) VALUES (?,DATE_FORMAT(NOW(),'%Y-%m-01'));"
    connection.query(queryString, [table, field1, field2, billID] , function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertNextPayment: function(table, field1, field2, billID, cb){
    var queryString = "INSERT INTO ?? (??,??) VALUES (?,DATE_FORMAT((NOW()+ INTERVAL 1 MONTH),'%Y-%m-01'));"
    connection.query(queryString, [table, field1, field2, billID] , function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  
  insertOne: function(table, field1, field2, field3, field4, userID, billName, billCategory, frequency, cb) {
    var queryString = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?);"
    connection.query(queryString, [table, field1, field2, field3, field4, userID, billName, billCategory, frequency] , function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  updateOnePaymentNew: function(table, field1, amount, field2, confirmID, field3, paymentID, cb) {
    var queryString = "UPDATE ?? SET paid_status ='1', date_paid = DATE_FORMAT(NOW(),'%Y-%m-%d'), ?? = ?, ?? = ? WHERE ?? = ?";
    connection.query(queryString,[table, field1, amount, field2, confirmID, field3, paymentID], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  updateOneBill: function(table1, field1, billID, table2, field2, billID, cb) {
    var queryString1 = "UPDATE ?? SET active_status ='0' WHERE ?? = ?";
    var queryString2 = "UPDATE ?? SET active_status ='0' WHERE ?? = ?";
    var queryString = queryString1 + ";" + queryString2;
    connection.query(queryString,[table1, field1, billID, table2, field2, billID], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

module.exports = orm;