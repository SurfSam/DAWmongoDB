function getRouter() {
    const router = require('express')();

    router.post('/checkConnection'),(req, res) => {
        //var replicaSetPorts = req.body.replicaSetPorts;
        //var dbName = req.body.databaseName;
        console.log("checkConnection POST");
        res.send('checkConnection POST');
        //var status = _checkConnection(replicaSetPorts, dbName);
        //res.json(status);
    }

    return router;
}

exports.getRouter = getRouter;