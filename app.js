// IMPORT ALL REQUIRED PACKAGES
var express = require("express"),
    ejs = require("ejs"),
    mongoose = require("mongoose");

// INITIALIZE EXPRESS    
var app = express();

// SET UP EXPRESS    
app.set("view-engine", "ejs");

// DEFINE BASIC ROUTES

app.get("/", function(req, res){
    res.render("home");
});

app.get("*", function(req, res){
    res.render("404");
});

// START UP SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Application server has started");
});

