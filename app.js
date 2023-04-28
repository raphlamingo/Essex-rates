const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://alphie:Hallelcollege1@cluster0.txttve3.mongodb.net/?retryWrites=true&w=majority');
const stallschema= new mongoose.Schema({
    Name: String,
    Service:String,
    Comfort:String,
    Quality: String
})

const stalls= mongoose.model('stall',stallschema)

app.get('/', function(req,res){
    res.render('home')
})

app.get('/table', function(req,res){
    stalls.find(function(err,stall){
        res.render('table',{entry:stall})
    })
})
app.get('/entry', function(req,res){
    res.render('form')
})
app.post('/entry', function(req,res){
    var names= req.body.Name
    var comfort= req.body.Comfort
    var service= req.body.service
    var quality= req.body.Quality
    var newstuff= new stalls({
        Name: names,
        Service:service,
        Comfort:comfort,
        Quality: quality
    })
    newstuff.save()
    res.redirect('/table')
})
app.listen(process.env.PORT||3000, function() { 
    console.log("Server started on port 3000");
  });