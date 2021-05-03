/* MongoDB */
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var databaseName = "food"
var url = "mongodb://localhost:27017/" + databaseName;



/* Express */
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.send('Can not connect to database ' + db.s.options.dbName);
            throw err;
        }
        res.send("Connected to database " + db.s.options.dbName);
        //console.log(db);
        db.close();
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})