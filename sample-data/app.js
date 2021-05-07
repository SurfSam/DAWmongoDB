const fs = require('fs');
const path = require('path');

const FRUIT_TYPES = [
    {
        type: "🍏",
        color: "green",
        price: "$0.20",
        skBase: "ap"
    },
    {
        type: "🍌",
        color: "yellow",
        price: "$0.25",
        skBase: "ba"
    },
    {
        type: "🍓",
        color: "red",
        price: "$0.40",
        skBase: "st"
    },
    {
        type: "🍑",
        color: "orange",
        price: "$0.50",
        skBase: "pe"
    },
    {
        type: "🍍",
        color: "yellow",
        price: "$2.00",
        skBase: "pi"
    }
];

var result_string = "";
var type_count = {};

initTypeCounts(type_count);

for (let i = 0; i < 1000; i++) {
    let newFruit = {...FRUIT_TYPES[getRandomInt(FRUIT_TYPES.length)]};

    newFruit.fruit_id = `${newFruit.skBase}${++type_count[newFruit.type]}`;
    delete newFruit.skBase;

    result_string += JSON.stringify(newFruit);
}

// let jsonData = JSON.stringify(result_string);

fs.writeFileSync(path.join(__dirname, '/data/fruitExample.json'), result_string);

function initTypeCounts(dict) {
    FRUIT_TYPES.forEach(fruit => dict[fruit.type] = 0);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}