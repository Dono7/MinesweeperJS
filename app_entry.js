
console.log('hello je suis le package minesweeper app_entry lol')

import Checker from "./classes/Checker.js"
import Cell from "./classes/Cell.js"
import Grid from "./classes/Grid.js";

let c = new Checker("hey","hey")
console.log(c)

let g = new Grid().initMap().show();

export default { Checker, Cell, Grid }

// module.exports.Checker = Checker ;
// module.exports.Cell = Cell ;
// module.exports.Grid = Grid ;