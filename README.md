Config server replica set:
docker exec -it mongoCFG1 bash -c "echo 'rs.initiate({_id: \"mongoRS1conf\",configsvr: true, members: [{ _id : 0, host : \"mongoCFG1\" },{ _id : 1, host : \"mongoCFG2\" }, { _id : 2, host : \"mongoCFG3\" }]})' | mongo"

Check status:
docker exec -it mongoCFG1 bash -c "echo 'rs.status()' | mongo"

Build shard replica:
docker exec -it mongoRS1n1 bash -c "echo 'rs.initiate({_id : \"mongoRS1\", members: [{ _id : 0, host : \"mongoRS1n1\" },{ _id : 1, host : \"mongoRS1n2\" },{ _id : 2, host : \"mongoRS1n3\" }]})' | mongo"

Check status (primary and secondardy):
docker exec -it mongoRS1n1 bash -c "echo 'rs.status()' | mongo"

Introduce shards to routers:
docker exec -it mongoS1 bash -c "echo 'sh.addShard(\"mongoRS1/mongoRS1n1\")' | mongo "

Check:
docker exec -it mongoS1 bash -c "echo 'sh.status()' | mongo "

