import Checker from './Checker.js'
import Cell from './Cell.js'
import Grid from './Grid.js'

//const Checker = require('./Checker')

var global = window || global
global.Checker = Checker
global.Cell = Cell
global.Grid = Grid



console.log('hello je suis le package minesweeper client')
