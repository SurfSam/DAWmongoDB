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
const CONNECTION_TIMEOUT_MS = 1200;

exports.CONNECTION_TIMEOUT_MS = CONNECTION_TIMEOUT_MS
exports.DATABASE_NAME = DATABASE_NAME
exports.COLLECTION_NAME = COLLECTION_NAME
exports.REPLICA_SET = REPLICA_SET