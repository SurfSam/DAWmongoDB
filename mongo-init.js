

db = db.getSiblingDB("food")
db.fruits.insert({ name: 'hello', age: 2 }),
db.fruits.insert({ name: 'hello2', age: 3 }),
db.fruits.insert({ name: 'hello3', age: 4 }),
db.fruits.insert({ name: 'hello3', thatagefield: 4 })

