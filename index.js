/* MongoDB */
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
    res.sendFile('index.html');
})

app.get('/checkConnection'),(req, res) => {
    //var replicaSetPorts = req.body.replicaSetPorts;
    //var dbName = req.body.databaseName;
    console.log("checkConnection GET");
    res.send('checkConnection GET');
    //var status = checkConnection(replicaSetPorts, dbName);
    //res.json(status);
}

app.listen(expressPort, () => {
  console.log(`Example app listening at http://localhost:${expressPort}`)
})

function checkConnection(_ports, _dbName){
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