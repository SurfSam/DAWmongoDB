/* CLIENT */
var databaseName = "food";
var replicaSetPorts = ["27017","27027","27037","27047","27057","27067"];
var routerPort = ["27019"];

/* POST WITH JSON */
var xhr = new XMLHttpRequest();
var url = "http://localhost:3000/checkReplicaSetsStatus";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
    }
};

/* DATA */
var data = {   
    "replicaSetPorts": [
        "27017", "27027","27037","27047","27057","27067"
    ],
    "databaseName" : "food"
}
var dataJSON = JSON.stringify(data);

/* SEND */
document.getElementById('btn').addEventListener("click", function(){
    xhr.send(dataJSON);
});