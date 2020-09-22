
const Checker = require('./Checker')
const Cell = require('./Cell')
const Grid = require('./Grid')

console.log("Hello from play-minesweeperjs server v2")

let g = new Checker("me","me");

console.log(g)

let g2 = new Grid({name:"exemple"}).initMap().show();

module.exports = { Checker , Cell, Grid }