import Checker from './Checker.js'
import Cell from './Cell.js'
import Grid from './Grid.js'

console.log('hello je suis le package minesweeper server lol')

const sayHello = () => { console.log("Hello !") }

//export { sayHello, Checker, Cell, Grid}

// module.exports = { sayHello }

exports.Checker = Checker ;
exports.Cell = Cell ;
exports.Grid = Grid ;
exports.sayHello = sayHello ;