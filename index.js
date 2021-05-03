/* Express */
const express = require('express');
const path = require('path');
const app = express();
const expressPort = 3000;

/* Static HTML */ 
app.use(express.static('website'));
app.get('/', (req, res) => {
    res.sendFile('/index.html');
})

/* Use mongodb routings*/
var checkConnection = require('./routes/checkReplicaSetsStatus.js');
app.use('/checkReplicaSetsStatus', checkConnection);

var dashboard = require('./routes/dashboard.js');
app.use('/dashboard', dashboard);

app.listen(expressPort, () => {
  console.log(`Example app listening at http://localhost:${expressPort}`)
})