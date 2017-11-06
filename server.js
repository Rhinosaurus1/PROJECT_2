//require all packages
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var routes = require("./controllers/billsController.js");
var exphbs = require("express-handlebars");
var PORT = (process.env.PORT || 3000);
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);

var nodemailer = require("nodemailer");

app.listen(PORT);
