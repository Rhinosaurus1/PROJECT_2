//set package dependencies
var express = require("express");
var router = express.Router();

var bills = require("../models/bills.js");

//router.get("/", function(req, res) {
  //bills.selectAll(function(data) {
    //var hbsObject = {
      //bills: data
    //};
    //console.log(hbsObject);
    //res.render("index", hbsObject);
  //});
//});

//router.get("/", function(req, res) {
  //bills.selectAllPayments(function(data) {
    //var hbsObject = {
      //payments: data
    //};
    //console.log(hbsObject);
    //res.render("index", hbsObject);
  //});
//});

//router.put("/api/payments/:id", function(req, res) {
  //bills.updateOnePayment("payments", "payment_id", req.params.id, function(result) {
    //if (result.changedRows == 0) {
      //return res.status(404).end();
    //} 
    //else {
      //res.redirect("/");
    //}
  //});
//});

router.get("/", function(req, res) {
  bills.selectAllBillsPayments(function(data) {
    var hbsObject = {
      bills: data[0],
      payments: data[1]
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  console.log(req.body);
  bills.insertOne("bills", "user_id", "bill_name", "bill_category", "due_frequency", 1, req.body.billName, req.body.billCategory, req.body.frequency, function(result) {
    var newbillID = result.insertId;
    console.log("newbillID: " + newbillID);
    bills.insertPayment("payments", "bill_id", "month_due", newbillID, function(result){
      if (result.changedRows == 0) {
        return res.status(404).end();
      } 
      else {
        res.redirect("/");
      }
    });
  });
});


//router.get("/api/history/:id", function(req, res) {
  //bills.selectHistory("payments", req.params.id, function(data) {
    //console.log("req.body: " + JSON.stringify(req.body));
    //console.log("data: " + JSON.stringify(data));
    //var hbsObject = {
      //history: data
    //}
    //console.log(hbsObject);
    //res.render("index", hbsObject);
    //res.redirect("/");
  //});
//});


router.get("/api/history/:id", function(req, res) {
    var hbsObjectNew = {
    bills: "",
    payments: "",
    history: "",
  };
  bills.selectAllBillsPayments(function(data1) {
    hbsObjectNew.bills = data1[0];
    hbsObjectNew.payments = data1[1];
  
    bills.selectHistory("payments", req.params.id, function(data2) {
      console.log("req.body: " + JSON.stringify(req.body));
      console.log("data: " + JSON.stringify(data2));
      hbsObjectNew.history = data2;
      console.log(hbsObjectNew);
      res.render("index", hbsObjectNew);
    //res.redirect("/");
    });
  });
});

//table, field1, amount, field2, confirmID, field3, paymentID, cb
router.put("/api/payments/:id", function(req, res) {
  bills.updateOnePaymentNew("payments", "amount", req.body.amount, "confirmation_code", req.body.confirmID, "payment_id", req.params.id, function(result){
    console.log("req.body: " + req.body);
    console.log("result: " + result);
    bills.insertNextPayment("payments", "bill_id", "month_due", req.body.bill_id, function(result){
      if (result.changedRows == 0) {
        return res.status(404).end();
      } 
      else {
        res.redirect("/");
      }
    });
  });
});

router.put("/api/bills/:id", function(req, res) {
  bills.updateOneBill("bills", "bill_id", req.params.id, "payments", "bill_id",  req.params.id, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } 
    else {
      res.redirect("/");
    }
  });
});


module.exports = router;