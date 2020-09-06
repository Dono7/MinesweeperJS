'use strict';

class Cell {

    constructor(){
        this.isRevealed = false
        this.isBomb = false
        this.isFlaged = false
        this.nb = 0
    }

    inc() { this.nb++ }
    dec() { this.nb-- }
    bomb() { this.isBomb = true }
    unbomb() { this.isBomb = false }
    reveal() { this.isRevealed = true ; return this.nb }
    toggleReveal() { this.isRevealed = !this.isRevealed }
    toggleFlag() { this.isRevealed = !this.isRevealed }

}

exports.Cell = Cell ;
