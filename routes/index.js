var express = require('express')();
var http = require('http').Server(express);
var utils = require("../routes/pullData.js");

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


/*/!* GET home page. *!/
router.get('/', function(req, res, next) {
  res.render('copyData.html', { title: 'Express' });
});*/
express.post('/process_post', urlencodedParser, function (req, res) {

  utils.getUsersFromFireBase();

})

express.get('/', function(req, res){
  res.sendFile("/Users/Mybeast/Desktop/CopyFromFirebaseToMongo/views/CopyData.html");
});

http.listen(3000, function(){
  console.log("Listening on port 3000");
});

