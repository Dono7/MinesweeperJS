
const Checker = require('./Checker')
const Cell = require('./Cell')
const Grid = require('./Grid')

console.log("Hello from play-minesweeperjs client v2")

var global = window || global
global.Checker = Checker
global.Cell = Cell
global.Grid = Grid



let g2 = new Grid({name:"exemple"}).initMap().show();






// let g = new Checker("me","me");

// console.log(g)

// let g2 = new Grid({name:"exemple"}).initMap().show();

// module.exports = { Checker , Cell, Grid }