[![npm](https://img.shields.io/npm/v/minesweeperjs?style=flat)](https://www.npmjs.com/package/minesweeperjs)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Dono7/MinesweeperJS?style=flat)](https://github.com/Dono7/MinesweeperJS)
[![GitHub issues](https://img.shields.io/github/issues/Dono7/MinesweeperJS?style=flat)](https://github.com/Dono7/MinesweeperJS/issues)

# MinesweeperJS

MinesweeperJS is a free 'Minesweeper' game javascript library. 
It is efficent and easy to install and use. Ideal to start a basic web game, for junior web developpers.

This is an open source library, so can you can use it for free. You can also contribute, suggest improvements, or report a bug.  If you like this project, please Star it, so that we can reach 

# Installation

## Client-side : In the browser (in HTML page)

### CDN (jsdelivr)

We can use a link to the NPM package lib file to import the script in the client-side (where you can set whatever version you want in the file name, since v0.6.0). Import it in your web page :

```html
<script src="https://cdn.jsdelivr.net/npm/minesweeperjs@1.0.1/lib/client.min.js"></script>
```

Now you can play with the library in the console or in a script.

### Download and use as local file

You can also download the last version in the [lib](lib/) folder, and then import it in your project. Then, link it as a script in the head of your HTML file.
 
## Server-side: With NPM
For the moment, the package is called `minesweeperjs`. You can install it in a Node project with the following command :
```bash
npm install minesweeperjs
```
Then, import it in your project (in a Javascript file)
```js
// Just what you need
const { Grid } = require('minesweeperjs')

// Or all fonctions and classes
const { Grid, Cell, Checker, MsInstalled } = require('minesweeperjs')
```
Now, you can use Grid as a class in Node.

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

## Learn how to play

See the [Get started](doc/GetStarted.md) guide to learn how to play and use this library.
See the [Methods list available and optional parameters](doc/MethodsList.md) to see the complete guide.


# Contributing

## Want to contribute ?

You want to suggest new features ? Please [open an issue (on GitHub)](https://github.com/Dono7/MinesweeperJS/issues).

You are a developer ? Take a look at the [to do list](https://trello.com/b/tyBP7IQ0/minesweeperjs-todo-list) to see if you can help me improving this repo. 
If you want to add something that is not in the To Do List, you can also make a Pull Request.

## Contributors Z

- [@Dono7](https://github.com/Dono7) (Creator)

# Found a bug / Need help ?

Please [open an issue (on GitHub)](https://github.com/Dono7/MinesweeperJS/issues) to request a change or report an issue.

# License

MinesweeperJS is licensed under the [MIT License](LICENSE).
