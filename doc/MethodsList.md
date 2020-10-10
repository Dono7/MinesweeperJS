# Methods List

List of all the methods that can be used in this library. Cell and Checker class are not mentioned here since those classes are not necessary. They will become private (not directly usable) in the futur versions.

# Grid Class

- [constructor](#constructor)
- [initMap](#initMap)
- [spawnBombs](#spawnBombs)
- [spawnRdmBombs](#spawnRdmBombs)
- [addBomb](#addbombs)
- [reveal](#reveal)
- [show](#show)

(Every method returns the grid itself so we can use method chaining)

## constructor

### Usage / Example :

```js
new Grid()
new Grid({ width:10, height:12, name:"Standart grid", nbbombs: 10})
```

### Description :

Create a new Grid object. This is the main object to play minesweeper with MinesweeperJS.

### Optional parameters (order doesnt matter) :

| Name      | Description        | Default value | Range of value                   |
| --------- | ------------------ |:-------------:|:--------------------------------:|
|**width**  | width of the grid  | 9             | min 9, max 1000                  |
|**height** | height of the grid | 9             | min 9, max 1000                  |
|**name**   |  name of the grid  | "untitled"    | length min 3, max 32             |
|**nbbombs**| number of bombs    | 10            | min 1%, max number  of cells - 1 |

### Note :

You can store an object with the parameters you want, and then pass it as the parameter.
```js
var easyGridParameters = {
    width: 9,
    height: 9,
    name: "My Easy Grid",
    nbbombs: 10
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

Initialize the map of the Grid. **It is needed before using other methods**. The map doesnt exists in the Grid object before using this method.

*No possible parameters*

### Note :

In the futur, it will be possible to pass a map schema as parameter to create a custom grid.

## spawnBombs

### Usage / Example :

```js
var g = new Grid({width:12, height:10}).initMap()
g.spawnBombs(1,5)
```

### Description :

Create bombs in the grid at random places. The cell where the user clicked for the first time cannot contains a bomb, this is why it is needed to specify the coordonates of the first click.

### Parameters (not optional) (order matters) :

- clickedX and clickedY, coordinates of the cell the user clicked (count from 0 !)

## spawnRmdBombs

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
// Add a bomb on second row, column 3 (count from 0)
var g = new Grid({width:12}).initMap()
g.addBomb(1,3)    

// Add a bomb on first row, column 3 
var g = new Grid({width:12}).initMap()
g.addBomb(15)     
```

### Description :

Add a bomb in an empty cell. All the neighbour cells values increment. It is **not recommanded to use this method** since it is made to be used by the spawnBombs method.

### Parameters (not optional) (order matters) :

- `X` and `Y`, coordinates where you want to add a bomb
- OR `index`, index where you want to add a bomb 

### Note :

Both parameters are linked width the grid width : `index = X * width + Y`

## Reveal

### Usage / Example :

```js
var g = new Grid().initMap().spawnRdmBombs()
g.reveal(1,3)
```

### Description

Reveal a cell, the action of "clicking on a cell". If the value of the cell is 0, the 4 neighbour cells are revealed too.

### Parameters (not optional) (order matters) :

- X and Y, coordinates where the user clicked

## Show 

### Usage / Example :
```js
var g = new Grid({ width:10, height:10, name:"Standart grid", nbbombs: 10}).initMap().spawnRdmBombs()

g.show()
/* Result in console : 

Standart grid (10x10, 10 bombs) 
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

g.reveal(5,1) // User click on cell col 5 row 1
g.show(true)
/* Result in console :

Standart grid (10x10, 10 bombs) 
 2  x -1 -0 -0 -0 -0 -0 -1  1 
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

Show the grid in the console. It displays the name, size and number of bombs in the first line. Bombs are represented by 'x'. Other empty cells are a number between 0 and 8. 

### Optional parameter :

- `reveal` parameter (false by default) : If true, display a dash (-) character in front of every revealed cells. A space ( ) is displayed in front of every other cells.

## Enjoy :)
