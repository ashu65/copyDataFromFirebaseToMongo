/**
 * Created by Mybeast on 28/03/16.
 */
var Firebase = require('firebase');
var firebaseRef = new Firebase("https://blazing-inferno-1151.firebaseio.com");
var firebaseRefUsers = new Firebase("https://blazing-inferno-1151.firebaseio.com/users");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/chatData';

function copyUsersData(userData){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertUser(db, userData, function() {
            db.close();
        });
    });
}

var insertUser = function(db, userData, callback) {
    db.collection('Users').insertOne( userData,
        function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a record into the users collection.");
        callback();
    });
};


function getUsersFromFireBase(){
    console.log("Method Invoked GetUsers");
    firebaseRefUsers.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var userData = childSnapshot.val();
            console.log(userData);
            copyUsersData(userData);
        });
    });

}

exports.getUsersFromFireBase = getUsersFromFireBase;


function insertDataToFireBase(){
    console.log("Method Invoked");
    var chatApp = new Object();
    chatApp.Users = new ArrayList();
    var user1 = new Object();
    user1.name = "Ashish";
    user1.email = "priince65@gmail.com";
    user1.number = "8123497494";

    var user2 = new Object();
    user2.name = "Ravi";
    user2.email = "ravirkbharti@gmail.com";
    user2.number = "7795373527";

    chatApp.Users[0]= user1;
    chatApp.Users[1] = user2;
    var jsonObj = JSON.stringify(chatApp);

    firebaseRef.set(jsonObj);

}
