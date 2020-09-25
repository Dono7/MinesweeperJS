
const Checker = require('./Checker')
const Cell = require('./Cell')
const Grid = require('./Grid') 

const MsInstalled = () => console.log('MinesweeperJS is currently installed')

var global = window || global
global.Checker = Checker
global.Cell = Cell
global.Grid = Grid
global.MsInstalled = MsInstalled
