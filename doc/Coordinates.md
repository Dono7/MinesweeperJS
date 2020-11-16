# How coordinates work

**Always count from 0 !**

Coordinates `(x,y)` always means `(columnNumber, rowNumber)`, where `(0,0)` is the **top left corner**. 

When **"index is supported"** is specified for a method, this means you can use the index paraneter, as if all the grid was just a one dimensional array.

## Examples :

```
With (x,y)
(0,0) : Top left corner
(1,0) : Second cell of the first row
(0,2) : First cell of the third row
(4,4) : Fifth cell of the fifth row

When index is also supported (With a grid height of 10)
(0) : Top left Corner
(1) : Second cell of the first row
(20) : First cell of the third row
(44) : Fifth cell of the fifth row
```

## Example schema


```js
-------------------------------
| 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
-------------------------------
| 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
-------------------------------
| 0,2 | 1,2 | 2,2 | 3,2 | 4,2 |
-------------------------------
```

## Example with a grid object 

```js
var g = new Grid({width:15, height:15}).initMap()

// User clicked on the third cell of the second line :
g.reveal(2,1)
// or
g.reveal(17)

// Both syntaxes do the exact same thing
```

## Conversion :

Both (x,y) and (index) coordinates systems are equivalents. Here is how to convert from one to another, where "width" is the width of the grid :

```js
// Get x,y from index
x = index % width
y = index / width

// Get index from x,y
index = y * width + x
```