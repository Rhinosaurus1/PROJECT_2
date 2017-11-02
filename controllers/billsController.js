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

router.put("/api/payments/:id", function(req, res) {
  bills.updateOnePayment("payments", "payment_id", req.params.id, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } 
    else {
      res.redirect("/");
    }
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