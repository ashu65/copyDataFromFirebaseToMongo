/**
 * Created by Mybeast on 28/03/16.
 */

var firebaseRefUsers = new Firebase("https://blazing-inferno-1151.firebaseio.com/chatApp/Users");
var firebaseRefMessages = new Firebase("https://blazing-inferno-1151.firebaseio.com/chatApp/Messages");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/chatData';

function copyUsersData(userData){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertUser(db, userData, function() {
            db.close();
        });
    });
}

function copyMessagesData(messageData){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertMessages(db, messageData, function() {
            db.close();
        });
    });
}

var insertUser = function(db, userData, callback) {
    db.collection('Users').insertOne( userData

    , function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a record into the users collection.");
        callback();
    });
};

var insertMessages = function(db, messageData, callback) {
    db.collection('Messages').insertOne( messageData),
        function(err, result){
            assert.equal(err, null);
            console.log("Inserted a new record to messages collection");
        }
}

function getUsersFromFireBase(){

    firebaseRefUsers.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key();
            var userData = childSnapshot.val();
            var pairData = "{" + key + ": { " + userData + "}} "
            copyUsersData(pairData);
        });
    });

}


function getMessagesFromFireBase(){

    firebaseRefMessages.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key();
            var Messages = childSnapshot.val();
            var pairData = "{" + key + ": { " + Messages + "}} "
            copyMessagesData(pairData);
        });
    });

}
