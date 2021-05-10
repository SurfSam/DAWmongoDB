# DAW Demonstrator: MongoDB Cluster
The following instructions describe how to create a MongoDB cluster with sharding and replication to store data distributed and ensure high availability. For visualization purposes, an Angular app hooked to an Express-backend was developed to display the status of the individual database nodes, as well as the data distributed onto them in real time.

This project was developed as part of a course regarding data analysis in the web.
# Live-Demo Part 1

## Config server replica set:
```bash
docker exec -it mongoCFG1 bash -c "echo 'rs.initiate({_id: \"configServerRS\",configsvr: true, members: [{ _id : 0, host : \"mongoCFG1\" },{ _id : 1, host : \"mongoCFG2\" }, { _id : 2, host : \"mongoCFG3\" }]})' | mongo"
```

### Check status:
```bash
docker exec -it mongoCFG1 bash -c "echo 'rs.status()' | mongo"
```

## Build shard replica:
```bash
docker exec -it mongoRS1n1 bash -c "echo 'rs.initiate({_id : \"mongoRS1\", members: [{ _id : 0, host : \"mongoRS1n1\" },{ _id : 1, host : \"mongoRS1n2\" },{ _id : 2, host : \"mongoRS1n3\" }]})' | mongo"

docker exec -it mongoRS2n1 bash -c "echo 'rs.initiate({_id : \"mongoRS2\", members: [{ _id : 0, host : \"mongoRS2n1\" },{ _id : 1, host : \"mongoRS2n2\" },{ _id : 2, host : \"mongoRS2n3\" }]})' | mongo"
```

### Check status (primary and secondardy):
```bash
docker exec -it mongoRS1n1 bash -c "echo 'rs.status()' | mongo"
```

## Define shard and introduces it to the router:
```bash
docker exec -it router bash -c "echo 'sh.addShard(\"mongoRS1/mongoRS1n1\")' | mongo "

docker exec -it router bash -c "echo 'sh.addShard(\"mongoRS2/mongoRS2n1\")' | mongo "
```

### Check:
```bash
docker exec -it router bash -c "echo 'sh.status()' | mongo "
```

# Live-Demo Part 2

## Create database on replica set 1 (primary node):
```bash
docker exec -it mongoRS1n1 bash -c "echo 'use food' | mongo"
```

## Enable sharding for created database on router:
```bash
docker exec -it router bash -c "echo 'sh.enableSharding(\"food\")' | mongo "
```

## Create collection on sharded database:
```bash
docker exec -it mongoRS1n1 bash -c "echo 'db.createCollection(\"food.fruits\")' | mongo "
```

## Enable sharding for created collection 'fruits':
```bash
docker exec -it router bash -c "echo 'sh.shardCollection(\"food.fruits\", {\"fruit_id\" : \"hashed\"})' | mongo "
```

## Show sharded database on shard2:
```bash
docker exec -it mongoRS2n1 bash -c "echo 'show databases' | mongo "
```

## Insert example data:
```bash
docker exec -it router bash -c "mongoimport --db food --collection fruits --file ./var/www/html/fruitExample.json"
```

## Partial data when shard failed
```bash
db.fruits.find({fruit_id:"pi1"})
# returns document from shard 2

db.fruits.find({})
# returns Error

db.fruits.find({}).allowPartialResults()
# returns partial results
```