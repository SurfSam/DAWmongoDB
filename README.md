# Config server replica set:
```bash
docker exec -it mongoCFG1 bash -c "echo 'rs.initiate({_id: \"configServerRS\",configsvr: true, members: [{ _id : 0, host : \"mongoCFG1\" },{ _id : 1, host : \"mongoCFG2\" }, { _id : 2, host : \"mongoCFG3\" }]})' | mongo"
```

## Check status:
```bash
docker exec -it mongoCFG1 bash -c "echo 'rs.status()' | mongo"
```

# Build shard replica:
```bash
docker exec -it mongoRS1n1 bash -c "echo 'rs.initiate({_id : \"mongoRS1\", members: [{ _id : 0, host : \"mongoRS1n1\" },{ _id : 1, host : \"mongoRS1n2\" },{ _id : 2, host : \"mongoRS1n3\" }]})' | mongo"
```
```bash
docker exec -it mongoRS2n1 bash -c "echo 'rs.initiate({_id : \"mongoRS2\", members: [{ _id : 0, host : \"mongoRS2n1\" },{ _id : 1, host : \"mongoRS2n2\" },{ _id : 2, host : \"mongoRS2n3\" }]})' | mongo"
```

## Check status (primary and secondary):
```bash
docker exec -it mongoRS1n1 bash -c "echo 'rs.status()' | mongo"
```

# Introduce shards to routers:
```bash
docker exec -it router bash -c "echo 'sh.addShard(\"mongoRS1/mongoRS1n1\")' | mongo "
```
```bash
docker exec -it router bash -c "echo 'sh.addShard(\"mongoRS2/mongoRS2n1\")' | mongo "
```

## Check:
```bash
docker exec -it router bash -c "echo 'sh.status()' | mongo "
```

# Create database on replica set 1 (primary node):
`docker exec -it mongoRS1n1 bash -c "echo 'use food' | mongo"`

# Enable sharding for created database on router:
`docker exec -it router bash -c "echo 'sh.enableSharding(\"food\")' | mongo "` 

# Create collection on sharded database:
`docker exec -it mongoRS1n1 bash -c "echo 'db.createCollection(\"food.fruits\")' | mongo "`

# Enable sharding for created collection 'fruits':
`docker exec -it router bash -c "echo 'sh.shardCollection(\"food.fruits\", {\"shardKey\" : 1})' | mongo "`

# Show sharded database on shard2:
`docker exec -it mongoRS2n1 bash -c "echo 'show databases' | mongo "`
___
mongoRS1 (replica set1)
mongoRS1n1 (node 1 in replica set1)

configServerRS (config servers replica set1)
mongoCFG1 (node 1 in config servers replica set1)

router (router)