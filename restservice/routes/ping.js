/* MongoDB */
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;

/* Express */
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * POST get online status of shard nodes
 */
router.post("/", function (req, res) {
  var replicaSetPorts = req.body.replicaSetPorts;
  var dbName = req.body.databaseName;
  checkReplicaSetsStatus(replicaSetPorts, dbName).then(function (
    replicaSetsStatus
  ) {
    res.json(replicaSetsStatus);
  });
});

/**
 * check online status of all shard nodes
 * @param {number} _ports 
 * @param {string} _dbName 
 * @returns 
 */
async function checkReplicaSetsStatus(_ports, _dbName) {
  var url;
  const status = {};

  try {
    for (const port of _ports) {
      url = "mongodb://localhost:" + port + "/" + _dbName;
      var replicaSetStatus = await checkStatus(port, url);
      status[port] = replicaSetStatus;
    }
  } catch (err) {
    console.log(err);
  }
  return status;
}

/**
 * check if it is possible to connect to mongodb at given url and port
 * @param {number} _port 
 * @param {string} _url 
 * @returns status object
 */
async function checkStatus(_port, _url) {
  var rsStatus = {};
  try {
    const client = await MongoClient.connect(_url, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });
    if (!client) {
      rsStatus.online = false;
      return rsStatus;
    } else {
      rsStatus.online = client.isConnected();
      client.close();
    }
  } catch (err) {
    console.log(err);
  }
  return rsStatus;
}

//export this router to use in our index.js
module.exports = router;
