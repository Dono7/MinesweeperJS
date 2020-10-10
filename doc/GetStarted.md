# Get started

## Introduction

Learn how to use the MinesweeperJS library to play minesweeper in Javascript !

- [Build your first grid](#build-your-first-grid)
- [Initialize the map and display the grid in console](#initialize-the-map-and-display-the-grid-in-console)
- [Generate the bombs](#generate-the-bombs)
- [Reveal a cell](#reveal-a-cell)

Take a look at [the complete methods list](MethodsList.md) to know what it is possible to do with this library.

## Build your first grid

```js
// Build a default 9x9 grid
var g = new Grid(); 

// Build a custom 15x20 grid
var g = new Grid({
    width: 15,
    height: 20
}); 

// List of all the options
var g = new Grid({
    width: 10,              // Grid width
    height: 10,             // Grid height
    name: "An easy grid",   // Grid name
    nbbombs: 10             // Grid bombs number
}); 
```

## Initialize the map and the display grid in console

When a grid is created, it is **not usable while the map has not been initialized**. 
For the moment, you can only initialize a grid. In the futur, it will be possible to create a "custom map".

```js
// Build a default 9x9 grid
var g = new Grid(); 
g.initMap();
g.show(); // Show the grid in the console. Cool bug debugging


// All methods can be chained
var g = new Grid( {nbbombs: 12, name: "My custom name"} ).initMap().show() ;

/* Result in console :

My custom name (9x9, 12 bombs) 
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

## Generate the bombs 

The game needs to have a position X and a position Y to start spawning bombs, because we want the first click not to hit a bomb. However, if we want to spawn bombs without the coordinates of the first click, we can use the `spawnRdmBombs()` method. This will randomly choose X and Y positions and start spawning bombs.
```js
// Create an grid called 'Example', and spawn 12 bombs. The first cell (coord 0;0) cannot be a bomb because we specified that the user made the first click on this cell.
var g = new Grid( {nbbombs: 12, name: "Example"} ).initMap().spawnBombs(0,0).show();
/* Result in console :

Example (9x9, 12 bombs) 
0 0 0 0 1 x 1 1 x 
0 0 0 0 1 1 1 1 1 
0 0 0 1 1 1 1 1 1 
0 0 0 1 x 2 2 x 1 
0 0 0 2 4 x 3 2 2 
0 0 1 2 x x 2 1 x 
0 1 2 x 3 2 2 2 2 
1 2 x 2 1 0 1 x 1 
1 x 2 1 0 0 1 1 1  */


// Create an grid called 'Example', and spawn 12 random bombs. Then show it in console
var g = new Grid( {nbbombs: 12, name: "Example"} ).initMap().spawnRdmBombs().show() ;

/* Result in console :

Example (9x9, 12 bombs) 
x x 1 0 0 0 0 0 0 
2 2 2 1 1 0 0 0 0 
1 1 1 x 2 1 2 1 1 
x 3 2 1 2 x 3 x 2 
x x 1 0 1 2 x 3 x 
2 2 1 0 0 2 2 3 1 
0 0 0 0 0 1 x 1 0 
0 0 0 0 1 2 2 1 0 
0 0 0 0 1 x 1 0 0  */
```
## Reveal a cell

The 'click on a cell' action is called 'reveal' here. To reveal a cell, you can do it by 2 differents ways. 
- Specify the index as if the grid was a unique array (for example, index 14 is the cell[1][5] on a cell 9x9 )
- Specify the X and Y coordinates of the cell (for example, 1 and 5)

You can use the `reveal(x,y)` method to reveal a cell.

```js
// Use .show(true) to show the grid with indications about the revealed state
// a blank space means that the cell is not revealed yet
// a hyphen - means that the cell has been revealed
var g = new Grid( {nbbombs: 12, name: "Example"} )
    .initMap()
    .spawnRdmBombs()
    .show(true)
    .reveal(0,2) // Simulate a click on line 0 col 2 (count from 0)
    .show(true) 

/* Result in console

Example (9x9, 12 bombs) 
 0  0  0  0  0  0  1  1  1 
 0  0  0  0  0  0  1  x  1 
 0  0  1  2  2  1  1  1  1 
 0  0  1  x  x  3  2  1  0 
 1  1  1  3  4  x  x  1  0 
 x  1  0  2  x  5  4  3  1 
 1  1  1  3  x  3  x  x  2 
 0  0  1  x  2  2  3  x  2 
 0  0  1  1  1  0  1  1  1 

 Example (9x9, 12 bombs) 
-0 -0 -0 -0 -0 -0 -1  1  1 
-0 -0 -0 -0 -0 -0 -1  x  1 
-0 -0 -1 -2 -2 -1  1  1  1 
-0 -0 -1  x  x  3  2  1  0 
-1 -1  1  3  4  x  x  1  0 
 x  1  0  2  x  5  4  3  1 
 1  1  1  3  x  3  x  x  2 
 0  0  1  x  2  2  3  x  2 
 0  0  1  1  1  0  1  1  1 
```

Please note that when the click hits an empty cell, the entire empty space around gets revealed. 

