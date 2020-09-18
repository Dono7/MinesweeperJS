# MinesweeperJS

MinesweeperJS is a free 'Minesweeper' game javascript library. 
It is efficent and easy to install and use. Ideal to start a basic web game, for junior web developpers.

This is an open source library, so can you can use it for free. You can also contribute, suggest improvements, or report a bug.  If you like this project, please Star it, so that we can reach 

# Installation

## With NPM
For the moment, the package is called `play-minesweeperjs`. You can install it with the following command :
```bash
npm install play-minesweeperjs
```
Then, import it in your project (in a Javascript file)
```js
import { Grid } from 'play-minesweeperjs'

// Code ...
```

# Get started

## Build your first grid

```js
// Build a default 9x9 grid
var g = new Grid(); 

// Build a custom 15x20 grid
var g = new Grid({
    width: 15,
    height: 20
}); 

// All the options
var g = new Grid({
    width: 10,
    height: 10,
    name: "An easy grid",
    nbbombs: 10
}); 
```

## Initialize the map and display grid in console

When a grid is created, it is **not usable while the map has not been initialized**. 
For the moment, you can only initialize a grid. In the futur, it will be possible to create a "custom map".

```js
// Build a default 9x9 grid
var g = new Grid(); 
g.initMap();
g.show(); // Show the grid in the console. Cool bug debugging


// All methods can be chained
var g = new Grid( {nbbombs: 12, name: "Example"} ).initMap().show() ;

/* Result in console :

Example (9x9, 12 bombs) 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 0 
*/
```


## Learn how to play

See the complete [Get started](doc/GetStarted.md) guide to learn how to play and use this library.

# Contributing

## Want to contribute ?

You want to suggest new features ? Please [open an issue (on GitHub)](https://github.com/Dono7/MinesweeperJS/issues), using the label `enhancement`.

You are a developer ? Take a look at the [to do list](doc/TODO.md) to see if you can help me improving this repo. 
If you want to add something that is not in the To Do List, you can also make a Pull Request (with the labels `enhancement`, `good first issue`, `improvement`, or `minor fix`).

## Contributors Z

- [@Dono7](https://github.com/Dono7) (Creator)

# Found a bug / Need help ?

Please [open an issue (on GitHub)](https://github.com/Dono7/MinesweeperJS/issues) to request a change or report an issue. You can put the labels `bug` or `help wanted` on your issue.

# License

MinesweeperJS is licensed under the [MIT License](LICENSE).
