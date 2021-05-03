var mongo = require("mongodb");
const express = require("express");

const DATABASE_NAME = "food";
const COLLECTION_NAME = "fruits";
const REPLICA_SET = [
  {
    name: "mongoRS1n1",
    port: "27017",
  },
  {
    name: "mongoRS1n2",
    port: "27027",
  },
  {
    name: "mongoRS1n3",
    port: "27037",
  },
  {
    name: "mongoRS2n1",
    port: "27047",
  },
  {
    name: "mongoRS2n2",
    port: "27057",
  },
  {
    name: "mongoRS2n3",
    port: "27067",
  },
];

const MongoClient = mongo.MongoClient;
const router = express.Router();

router.get("/", function (req, res) {
  collectShardInformation(DATABASE_NAME).then(function (replicaSetsStatus) {
    res.json(replicaSetsStatus);
  });
});

async function collectShardInformation(_dbName) {
  var url;
  const info = {};
  try {
    for (const node of REPLICA_SET) {
      url =
        "mongodb://localhost:" +
        node.port +
        "/" +
        _dbName +
        "?readPreference=primaryPreferred";
      info[node.name] = await readAllFromCollection(
        url,
        _dbName,
        COLLECTION_NAME
      );
    }
  } catch (err) {
    console.log(err);
  }
  return info;
}

async function readAllFromCollection(_url, _dbName, _collectionName) {
  let data = {};
  let client = null;
  try {
    client = await new MongoClient(_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).connect();
    let dbRequest = () => {
      return new Promise((resolve, reject) => {
        client
          .db(_dbName)
          .collection(_collectionName)
          .find({})
          .toArray(function (err, result) {
            err ? reject(err) : resolve(result);
          });
      });
    };
    data = await dbRequest();
    console.log(data);
  } catch (err) {
    console.log(err);
  } finally {
    if (client) {
      client.close();
    }
  }
  return data;
}

module.exports = router;
