//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//placeholders for added task
var task = ["Play Hogwarts Legacy", "Create a neural network that will my make a  diploma for me"];

var complete = ["Watch a cartoon"];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;    
    task.push(newTask);
    res.redirect("/index");
});

app.post("/clearcomplete", function(req, res) {
    complete = [];
    res.redirect("/index");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;    
    if (typeof completeTask === "string") {
        complete.push(completeTask);        
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/index");
});



app.get("/", function(req, res) {    
    res.render("welcome");
});

app.get("/index", function(req, res) {    
    res.render("index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});