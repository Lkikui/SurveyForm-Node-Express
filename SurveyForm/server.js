/*---------- modules ----------*/
//express
var express = require("express");
var app = express();

//session
var session = require('express-session');
var app = express();
app.use(session({
    secret: 'codingdojorocks'}));
//ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

/*---------- routes ----------*/

//renders index page
app.get("/", function (request, response){
    response.render('index');
});

//form submit, redirects to results page
app.post("/submit", function (request, response){
    console.log("POST DATA \n\n", request.body);
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.comment = request.body.comment;
    response.redirect("/result");
});

// renders result page
app.get("/result", function (request, response){
    var name = request.session.name;
    var location = request.session.location;
    var language = request.session.language;
    var comment = request.session.comment;
    response.render('result', {name: name, location: location, language: language, comment: comment});
});

// back button
app.post("/back", function (request, response){
    response.redirect("/");
});

/*---------- port ----------*/
app.listen(8000, function() {
    console.log("Survey Form Project: listening on port 8000");
});
