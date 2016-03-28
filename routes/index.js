var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('copyData.html', { title: 'Express' });
});

express.get('/', function(req, res){
  res.sendFile("/Users/Mybeast/Desktop/CopyFromFirebaseToMongo/views/CopyData.html");
});


module.exports = router;
