// This file can be used to add initial data to a mongodb
// Currently, we are not using it in our demonstrator
db = db.getSiblingDB("food")
db.fruits.insert({ name: 'apple', age: 2 }),
db.fruits.insert({ name: 'banana', age: 3 })