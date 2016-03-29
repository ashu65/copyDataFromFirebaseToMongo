var express = require('express')();
var http = require('http').Server(express);
var utils = require("../routes/pullData.js");

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

express.post('/process_post', urlencodedParser, function (req, res) {
  utils.getUsersFromFireBase();
})

express.get('/', function(req, res){
  res.sendFile("/Users/Mybeast/Desktop/CopyFromFirebaseToMongo/views/CopyData.html");
});

http.listen(3000, function(){
  console.log("Listening on port 3000");
});
