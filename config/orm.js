
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

  insertPayment: function(table, field1, field2, billID, cb){
    var queryString = "INSERT INTO ?? (??,??) VALUES (?,DATE_FORMAT(NOW(),'%Y-%m-01'));"
    console.log(queryString);
    connection.query(queryString, [table, field1, field2, billID] , function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

			//	select p.bill_id
			//	,p.month_due
			//	,p.paid_status
			//	,b.bill_name
			//	from payments as p
			//	inner join bills as b on p.bill_id = b.bill_id
			//	where Month(month_due) = MONTH(Current_date()) and Year(month_due) = Year(Current_date());
  selectAllPayments: function(cb){
  	var queryString = "SELECT p.bill_id, p.month_due, p.paid_status, b.bill_name from payments as p inner join bills as b on p.bill_id = b.bill_id where Month(month_due) = MONTH(Current_date()) and Year(month_due) = Year(Current_date())"
  	console.log(queryString);
  	connection.query(queryString, function(err, result){
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