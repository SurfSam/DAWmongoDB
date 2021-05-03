/* Client */
var databaseName = "food";
var replicaSetPorts = ["27017","27027","27037","27047","27057","27067"];
var routerPort = ["27019"];

function httpGet(theUrl){
    console.log("Sending get");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

httpGet("/checkConnection");