/* Express */
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const expressPort = 3000;

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

/* Static HTML */
app.use(express.static("website"));
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

/* Use mongodb routings*/
var checkConnection = require("./routes/ping.js");
app.use("/ping", checkConnection);

var node = require("./routes/node.js");
app.use("/node", node);

app.listen(expressPort, () => {
  console.log(`Example app listening at http://localhost:${expressPort}`);
});
