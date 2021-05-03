var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/food";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database 'food' connected!");
    db.close();
})