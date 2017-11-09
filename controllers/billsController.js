//set package dependencies
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

//require models
var bills = require("../models/bills.js");


//email route
router.get("/send/:email", function(req,res){
  
  //set email address as entered email
  var emailAddress = req.params.email;

  //get all unpaid bills
  bills.selectAllUnpaid(function(data){
    var paymentObj = {
      payments: data
    };

    //set up node mailer default sender
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'billstopay109@gmail.com',
          pass: 'blake150'
      }
    });

    //get month and year for email
    var monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var month = monthsArray[date.getMonth()];
    var year = date.getFullYear();
    var monthYear = month+"-"+year;

    var billText = "";

    //loop through payments due and html-ify for email, adding to total text
    for(i=0; i<paymentObj.payments.length; i++){
      var billItem = ("<p>Bill Name:   <b>" + paymentObj.payments[i].bill_name + "</b>      Due:    <b>" + paymentObj.payments[i].month_due_formatted + "</b></p>");
      billText = billText + billItem;
    };

    //set up email to send, to , from, subject, text
    var mailOptions = {
      from: 'billstopay109@gmail.com',
      to: emailAddress,
      subject: "Bills due in " + monthYear,
      text: "Bills due in " + monthYear,
      html: "<p><b>THE FOLLOWING BILLS ARE DUE IN " +monthYear+ "</b></p>" + billText
    };

    //send email, log error if any, return "sent" if no error
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
    res.send("sent");
  });
});

//route to get all bills active and inactive as well as all payments due for current month
router.get("/", function(req, res) {
  bills.selectAllBillsPayments(function(data) {
    var hbsObject = {
      bills: data[0],
      payments: data[1]
    };
    res.render("index", hbsObject);
  });
});

//route to add a new bill account and a new payment due for current month
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

//route to retrieve payment history of selected bill
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
    });
  });
});

//route to log payment of a bill and add new payment due for following month
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

//route to inactivate a bill and all pending payments
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

//export router
module.exports = router;