/* MongoDB */
const connection = require('./routes/connection.js');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

/* Express */
const express = require('express');
const path = require('path');
const app = express();
const expressPort = 3000;

/* Statisches Verzeichnis */ 
app.use(express.static('website'));

/* App */
app.get('/', (req, res) => {
    res.sendFile('/index.html');
})

app.use(connection.getRouter());

app.listen(expressPort, () => {
  console.log(`Example app listening at http://localhost:${expressPort}`)
})

function _checkConnection(_ports, _dbName){
    var url;
    var status = {};
    _ports.forEach(port => {
        url = "mongodb://localhost:"+ port + "/" + _dbName;
        console.log(url);
        MongoClient.connect(url, function(err, db) {
            if (err) {
                status.port = "0";
                throw err;
            }
            status.port = "1"
            db.close();
        })
    });
    return status;
}