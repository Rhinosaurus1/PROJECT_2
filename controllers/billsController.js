//set package dependencies
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

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
router.get("/send/:email", function(req,res){

  var emailAddress = req.params.email;

  console.log("req:" + JSON.stringify(req.params.email));
  console.log(emailAddress);


  bills.selectAllUnpaid(function(data){
    var paymentObj = {
      payments: data
    };

   

    console.log(JSON.stringify(paymentObj.payments));

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'billstopay109@gmail.com',
          pass: 'blake150'
      }
    });

    var monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var month = monthsArray[date.getMonth()];
    var year = date.getFullYear();
    var monthYear = month+"-"+year;

    var billText = "";
    console.log("paymentObj payments length: " + paymentObj.payments.length);

    for(i=0; i<paymentObj.payments.length; i++){
      var billItem = ("<p>Bill Name:   <b>" + paymentObj.payments[i].bill_name + "</b>      Due:    <b>" + paymentObj.payments[i].month_due_formatted + "</b></p>");
      billText = billText + billItem;
    };

    console.log(billText);
    console.log(JSON.stringify(billText));

    var mailOptions = {
      from: 'billstopay109@gmail.com',
      to: emailAddress,
      subject: "Bills due in " + monthYear,
      text: "Bills due in " + monthYear,
      html: "<p><b>THE FOLLOWING BILLS ARE DUE IN " +monthYear+ "</b></p>" + billText
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
    res.send("sent");
  });
});

router.get("/", function(req, res) {
  bills.selectAllBillsPayments(function(data) {
    var hbsObject = {
      bills: data[0],
      payments: data[1]
    };
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  bills.insertOne("bills", "user_id", "bill_name", "bill_category", "due_frequency", 1, req.body.billName, req.body.billCategory, req.body.frequency, function(result) {
    var newbillID = result.insertId;
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
      if (data2.length == 0){
        hbsObjectNew.history = [{no_history: "NO HISTORY TO DISPLAY"}];
      }
      else{
        hbsObjectNew.history = data2;
      }
      res.render("index", hbsObjectNew);
    //res.redirect("/");
    });
  });
});

//table, field1, amount, field2, confirmID, field3, paymentID, cb
router.put("/api/payments/:id", function(req, res) {
  bills.updateOnePaymentNew("payments", "amount", req.body.amount, "confirmation_code", req.body.confirmID, "payment_id", req.params.id, function(result){
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
    console.log(JSON.stringify(result));
    if (result.changedRows == 0) {
      return res.status(404).end();
    } 
    else {
      res.redirect("/");
    }
  });
});


module.exports = router;