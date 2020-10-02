// dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");
const { parse } = require("path");


// PORT setup
const app = express(); // this variable (app) points toward the value of the express function/ server
const PORT = process.env.PORT || 3000; // process.env listens to the environment for PORT connections

// middleware to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res){
console.log("testing this route");
    fs.readFile("./db/db.json", function(err, data){
        if(err) throw err;
        console.log(JSON.parse(data));
        let parsedData = JSON.parse(data);
        res.send(parsedData);
    })
//    return res.sendFile(path.join(__dirname, "./db/db.json"));
});
// use the POST method to handle the users request and store the users input into the db.json and page
app.post("/api/notes", function(req, res){
    console.log(req.body);
    fs.readFile("./db/db.json", "utf-8", function(err, data){
        if(err) throw err;
        const parsedData = JSON.parse(data);
        parsedData.push(req.body);

        fs.writeFile("./db/db.json", JSON.stringify(parsedData), "utf-8", (err) => {
            if (err) throw err;
        });
        res.json(parsedData);
    })   
})

app.delete("/api/notes/:id", function(req,res){
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        const parsedData = JSON.parse(data);
        parsedData.filter((data) => {
            return data.id != req.params.id
        })
        fs.writeFile("./db/db.json", JSON.stringify(parsedData), "utf-8", (err) => {
            if (err) throw err;
            res.json(parsedData);
        });
    })
})


// Starts the server to begin listening
app.listen(PORT, function(){
    console.log("App is listening on PORT " + PORT);
});