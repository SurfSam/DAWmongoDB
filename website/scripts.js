/* Client */
var databaseName = "food";
var replicaSetPorts = ["27017","27027","27037","27047","27057","27067"];
var routerPort = ["27019"];

function httpPost(theUrl){
    console.log("Sending POST");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, true ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

httpPost("/checkConnection");