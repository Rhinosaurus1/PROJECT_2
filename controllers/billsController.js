//set package dependencies
var express = require("express");
var router = express.Router();

var bills = require("../models/bills.js");

router.get("/", function(req, res) {
  bills.selectAll(function(data) {
    var hbsObject = {
      bills: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  bills.insertOne("bills", "user_id", "bill_name", "bill_category", "due_frequency", 1, req.body.billName, req.body.billCategory, req.body.frequency, function(result) {
    res.redirect("/");
  });
});

router.put("/api/bills/:id", function(req, res) {
  bills.updateOne("bills", "bill_id", req.params.id, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } 
    else {
      res.redirect("/");
    }
  });
});


module.exports = router;