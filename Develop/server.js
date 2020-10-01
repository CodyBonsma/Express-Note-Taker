// dependencies 
const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");



// PORT setup
const app = express(); // this variable (app) points toward the value of the express function/ server
const PORT = process.env.PORT || 3000; // process.env listens to the environment for PORT connections


// Routes
app.get("/", function(req, res){
    res.send("This sends over something!");
});


// Starts the server to begin listening
app.listen(PORT, function(){
    console.log("App is listening on PORT " + PORT);
});