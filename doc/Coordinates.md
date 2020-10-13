# How coordinates work

**Always count from 0 !**

Coordinates `(x,y)` always means `(rowNumber, columnNumber)`, where `(0,0)` is the **top left corner**. 

When **"index is supported"** is specified for a method, this means you can use the index paraneter, as if all the grid was just a one dimensional array.

## Examples :

```
With (x,y)
(0,0) : Top left corner
(0,1) : Second cell of the first row
(2,0) : First cell of the third row
(4,4) : Fifth cell of the fifth row

When index is also supported (With a grid height of 10)
(0) : Top left Corner
(1) : Second cell of the first row
(20) : First cell of the third row
(44) : Fifth cell of the fifth row
```

## Example with a grid object 

```js
var g = new Grid({width:15, height:15}).initMap()

// User clicked on the third cell of the second line :
g.reveal(1,2)
// or
g.reveal(17)

// Both syntaxes do the exact same thing
```

## Conversion :

Both (x,y) and (index) coordinates systems are equivalents. Here is how to convert from one to another :

```
(width = width of the grid)

// From index to x,y
x = index / width
y = index % width

// From x,y to index
index = x * width + y
```