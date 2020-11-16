# Methods List

List of all the methods that can be used in this library, on the Grid class.

# Grid Class

- [constructor](#constructor)
- [initMap](#initMap)
- [spawnBombs](#spawnBombs)
- [spawnRdmBombs](#spawnRdmBombs)
- [addBomb](#addBomb)
- [reveal](#reveal)
- [flag](#flag)
- [show](#show)

(Every method returns the grid itself so we can use method chaining)

## constructor

### Usage / Example :

```js
new Grid() // create default grid
new Grid({ width:10, height:12, name:"Standart grid", nbbombs: 10}) // create custom grid
```

### Description :

Create a new Grid object. This is the main object to play minesweeper with MinesweeperJS.

### Optional parameters (order doesnt matter) :

| Name      | Description        | Default value | Range of value                  |
| --------- | ------------------ |:-------------:|:-------------------------------:|
|**width**  | width of the grid  | 9             | min 9, max 1000                 |
|**height** | height of the grid | 9             | min 9, max 1000                 |
|**name**   |  name of the grid  | "untitled"    | length min 3, max 32            |
|**nbbombs**| number of bombs    | 10            | min 1%, max number of cells - 1 |
|**lives**  | extra lives        | 0             | min 0, max number of bombs - 1  |

### Note :

You can store an object with the parameters you want, and then pass it as the parameter.
```js
var easyGridParameters = {
    width: 9,
    height: 9,
    name: "My Easy Grid",
    nbbombs: 10,
    lives: 2
}
new Grid(easyGridParameters)
```

## initMap

### Usage / Example :
```js
var g = new Grid()
g.initMap()
```

### Description :

Initialize the map of the Grid. **It is required before using other methods**. The map doesnt exists in the Grid object before using this method.

*No possible parameters*

### Note :

In the futur, it will be possible to pass a map schema as parameter to create a custom map, and not just a rectangular grid.

## spawnBombs

### Usage / Example :

```js
var g = new Grid({width:12, height:10}).initMap()
g.spawnBombs(1,5) 
```

### Description :

Create bombs in the grid at random places. The cell where the user clicked for the first time cannot contains a bomb, this is why it is needed to specify the coordonates of the first click. If you want to randomly spawn bombs without specific coordinates, see the [spawnRdmBombs](#spawnRdmBombs) method below.

### Parameters *(required)* :

- `clickedX` and `clickedY`, coordinates of the cell the user clicked. *index is supported*

If you do not know how to use coordinates, please take a look at the [How coordinates work](Coordinates.md) guide.

## spawnRdmBombs

### Usage / Example :

```js
var g = new Grid().initMap()
g.spawnRdmBombs()
```

### Description :

Create bombs in the grid, same as the spawnBombs method, except that this method does not require clicked coordinates. 

*No possible parameters*

## addBomb

### Usage / Example :

```js
var g = new Grid({width:12}).initMap()
g.addBomb(1,3)
```

### Description :

Add a bomb in an empty cell. All the neighbour cells values increment. It is **not recommanded to use this method** since it is made to be used by the spawnBombs method only.

### Parameters *(required)* :

- `X` and `Y`, coordinates where you want to add a bomb. *index is supported*

If you do not know how to use coordinates, please take a look at the [How coordinates work](Coordinates.md) guide.

## Reveal

### Usage / Example :

```js
var g = new Grid().initMap().spawnRdmBombs()
g.reveal(1,3)
```

### Description

Reveal a cell, the action of "clicking on a cell". If the value of the cell is 0, the 4 neighbour cells are revealed too. This will reveal an entire empty zone if the user click in the middle of it.

### Parameters *(required)* :

- `clickedX` and `clickedY`, coordinates of the cell the user clicked. *index is supported*

If you do not know how to use coordinates, please take a look at the [How coordinates work](Coordinates.md) guide.

## Flag a cell

### Usage / Example :

```js
var g = new Grid().initMap().spawnRdmBombs()
g.flag(1,3)
```

### Description

Flagging a cell means that the user is sure that the cell is a bomb. Flags are used to easily see where are the already found bombs, and avoid accidental clicks. A flagged cell cannot be revealed, as well as a revealed cell cannot be flagged. You can use as many flags as there are bombs is the grid, but not more.

If all the bombs are flagged, the game is won, even if all the other cells are not revealed.

### Parameters *(required)* :

- `clickedX` and `clickedY`, coordinates of the cell the user want to flag. *index is supported*

If you do not know how to use coordinates, please take a look at the [How coordinates work](Coordinates.md) guide.

## Show 

### Usage / Example :
```js
var g = new Grid({ width:10, height:10, name:"Standart grid", nbbombs: 10}).initMap().spawnRdmBombs()

g.show()
/* Result in console : 

Standart grid (10x10, 10 bombs) 
Lives left : 0 , Flags : 0 
2 x 1 0 0 0 0 0 1 1 
x 2 1 0 0 0 0 0 1 x 
1 1 0 1 1 1 0 0 1 1 
0 0 0 1 x 2 1 1 0 0 
1 1 0 2 2 3 x 1 0 0 
x 1 0 1 x 2 1 1 0 0 
1 2 1 2 1 1 0 0 0 0 
0 2 x 2 0 0 0 0 0 0 
0 2 x 2 0 0 0 0 1 1 
0 1 1 1 0 0 0 0 1 x 
*/

g.show(true)
/* Result in console :

Standart grid (10x10, 10 bombs) 
Lives left : 0 , Flags : 0 
 2  x  1  0  0  0  0  0  1  1 
 x  2  1  0  0  0  0  0  1  x 
 1  1  0  1  1  1  0  0  1  1 
 0  0  0  1  x  2  1  1  0  0 
 1  1  0  2  2  3  x  1  0  0 
 x  1  0  1  x  2  1  1  0  0 
 1  2  1  2  1  1  0  0  0  0 
 0  2  x  2  0  0  0  0  0  0 
 0  2  x  2  0  0  0  0  1  1 
 0  1  1  1  0  0  0  0  1  x 
*/

g.reveal(5,1) // User click on the fifth cell of the second row
g.flag(1,0) // User flag second cell of first row

g.show(true)
/* Result in console :

Standart grid (10x10, 10 bombs) 
Lives left : 0 , Flags : 0 
 2 *x -1 -0 -0 -0 -0 -0 -1  1 
 x  2 -1 -0 -0 -0 -0 -0 -1  x 
 1  1  0 -1 -1 -1 -0 -0 -1  1 
 0  0  0  1  x  2 -1 -1  0  0 
 1  1  0  2  2  3  x  1  0  0 
 x -1  0  1  x  2  1  1  0  0 
 1  2  1  2  1  1  0  0  0  0 
 0  2  x  2  0  0  0  0  0  0 
 0  2  x  2  0  0  0  0  1  1 
 0  1  1  1  0  0  0  0  1  x 
*/
```

### Description

Show the grid in the console. It displays the name, size and number of bombs in the first line, and the extra lives left and number of flagged cells in the second line.

Bombs are represented by 'x'. Other empty cells are a number between 0 and 8. 

### Optional parameter :

- `isRevealed` boolean parameter (false by default) : 

If `isRevealed` is true, it will display :
- a dash (-) character in front of every revealed cells
- a star (*) character in front of every flagged cells
- a space ( ) character in front of every other cells.

## Enjoy :)
