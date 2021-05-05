const mongo = require("mongodb");
const express = require("express");

const {
  DATABASE_NAME,
  REPLICA_SET,
  COLLECTION_NAME,
  CONNECTION_TIMEOUT_MS,
} = require("../clusterConfig");

const MongoClient = mongo.MongoClient;
const router = express.Router();

/* api routes definition */

/**
 * GET content from node
 */
router.get("/data/:name", function (req, res) {
  const nodeName = req.params.name;
  const nodeInfo = REPLICA_SET.filter((elm) => elm.name == nodeName);
  if (nodeInfo && nodeInfo.length == 1 && nodeInfo[0]) {
    _nodeData(nodeInfo[0].port, DATABASE_NAME, COLLECTION_NAME).then(function (
      nodeData
    ) {
      res.json(nodeData);
    });
  } else {
    res.status(404).send("invalid node name");
  }
});

/**
 * GET content for all nodes
 */
router.get("/data", function (req, res) {
  _collectNodeData(DATABASE_NAME, COLLECTION_NAME).then(function (
    clusterData
  ) {
    res.json(clusterData);
  });
});

/**
 * GET status information
 */
 router.get("/status/:name", function (req, res) {
  const nodeName = req.params.name;
  const nodeInfo = REPLICA_SET.filter((elm) => elm.name == nodeName);
  if (nodeInfo && nodeInfo.length == 1 && nodeInfo[0]) {
    _nodeState(nodeInfo[0].port, DATABASE_NAME).then(function ( nodeStatus ) {
      res.json(nodeStatus);
    });
  } else {
    res.status(404).send("invalid node name");
  }
});

/**
 * GET status information for all nodes
 */
router.get("/status", function (req, res) {
  _collectNodeState(DATABASE_NAME).then(function (
    clusterStatus
  ) {
    res.json(clusterStatus);
  });
});

/**
 * collect data
 * @param {string} _dbName 
 * @param {string} _collectionName 
 * @returns 
 */
async function _collectNodeData(_dbName, _collectionName) {
  var info = {};
  try {
    for (const node of REPLICA_SET) {
      info[node.name] = await _nodeData(node.port, _dbName, _collectionName);
    }
  } catch (err) {
    console.log(err);
  }
  return info;
}

/**
 * data
 * @param {number} _port
 * @param {string} _dbName
 * @param {string} _collectionName
 * @returns
 */
async function _nodeData(_port, _dbName, _collectionName) {
  var url;
  var info = {};
  try {
    url = `mongodb://localhost:${_port}/${_dbName}?readPreference=primaryPreferred`;
    info = await _readCollection(url, _dbName, _collectionName);
  } catch (err) {
    console.log(err);
  }
  return info;
}

// /**
//  * state
//  * @param {string} _dbName
//  * @param {string} _collectionName
//  * @returns
//  */
// async function _collectNodeState(_dbName, _collectionName) {
//   var url;
//   const info = {};
//   try {
//     for (const node of REPLICA_SET) {
//       url = `mongodb://localhost:${node.port}/admin?readPreference=primaryPreferred`;
//       info[node.name] = await _readState(url, _dbName);
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   return info;
// }

/**
 * state
 * @param {string} _dbName
 * @returns
 */
 async function _collectNodeState(_dbName) {
  var info = {};
  try {
    for (const node of REPLICA_SET) {
      info[node.name] = await _nodeState(node.port, _dbName)
    }
  } catch (err) {
    console.log(err);
  }
  return info;
}

/**
 * state
 * @param {string} _dbName
 * @returns
 */
 async function _nodeState(_port, _dbName) {
  var url;
  var info = {};
  try {
      url = `mongodb://localhost:${_port}/admin?readPreference=primaryPreferred`;
      info = await _readState(url, _dbName);
  } catch (err) {
    console.log(err);
  }
  return info;
}

/* mongodb CRUD */

/**
 * read data
 * @param {string} _url
 * @param {string} _dbName
 * @param {string} _collectionName
 * @returns collection content
 */
async function _readCollection(_url, _dbName, _collectionName) {
  let data = {};
  let client = null;
  try {
    client = await new MongoClient(_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: CONNECTION_TIMEOUT_MS // fast fail
    }).connect();
    // fast fail
    if (!client || client.isConnected() == false) {
      return {};
    } 
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

/**
 * read state
 * @param {string} _url
 * @param {string} _dbName
 * @returns state information
 */
async function _readState(_url, _dbName) {
  let data = {};
  let client = null;
  try {
    client = await new MongoClient(_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: CONNECTION_TIMEOUT_MS // fast fail
    }).connect();
    // fast fail
    if (!client) {
      return {};
    } 
    let dbRequest = () => {
      return new Promise((resolve, reject) => {
        client
          .db(_dbName)
          .admin()
          .replSetGetStatus(function (err, info) {
            err
              ? reject(err)
              : resolve({
                  myState: _stateStringForId(info.myState),
                  heartbeatIntervalMillis: info.heartbeatIntervalMillis,
                  votingMembersCount: info.votingMembersCount,
                  lastElectionReason: info.electionCandidateMetrics
                    ? info.electionCandidateMetrics.lastElectionReason
                    : undefined,
                  lastElectionDate: info.electionCandidateMetrics
                    ? info.electionCandidateMetrics.lastElectionDate
                    : undefined,
                  electionTimeoutMillis: info.electionCandidateMetrics
                    ? info.electionCandidateMetrics.electionTimeoutMillis
                    : undefined,
                });
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

function _stateStringForId(stateId) {
  switch (stateId) {
    case 0:
      return "Starting up (phase 1)";
    case 1:
      return "Primary";
    case 2:
      return "Secondary";
    case 3:
      return "Recovering";
    case 4:
      return "Fatal error";
    case 5:
      return "Starting up (phase 2)";
    case 6:
      return "Unknown state";
    case 7:
      return "Arbiter";
    case 8:
      return "Down";
    default:
      return "Undefined";
  }
}

module.exports = router;
