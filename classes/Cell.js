const Checker = require("./Checker.js")


class Cell {

    constructor(){
        this.isRevealed = false
        this.isBomb = false
        this.isFlagged = false
        this.nb = 0
    }

    inc() { this.nb++ }
    dec() { this.nb-- }
    bomb() { this.isBomb = true }
    unbomb() { this.isBomb = false }
    reveal() { this.isRevealed = true ; return this.nb }
    toggleFlag() { this.isFlagged = !this.isFlagged }

}


module.exports = Cell
