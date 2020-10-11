const Checker = require("./Checker.js")
const Cell = require("./Cell.js")


const minGirdSize = 9
const maxGirdSize = 1000


class Grid {

    constructor({
        width = minGirdSize,
        height = minGirdSize,
        name = "Untitled",
        nbbombs = 10,
        lives = 0
        } = {}
    ){
        new Checker(width,'width').int().between(minGirdSize, maxGirdSize)
        new Checker(height,'width').int().between(minGirdSize, maxGirdSize)
        new Checker(name,'name').string().notEmpty()
        new Checker(nbbombs,'nbbomb').int().min(Math.max(1, Math.floor(width * height / 100)))
        new Checker(lives, 'lives').int().between(1,nbbombs - 1)

        this.width = width
        this.height = height
        this.name = name
        this.nbbombs = nbbombs
        this.lives = lives
        this.areBombsSet = false
        this.isEnded = false
        this.isWon = false
        this.revealedCells = 0
        this.flaggedCells = []
    }

    initMap() {
        this.map = new Array(this.height).fill(0).map(() => new Array(this.width).fill(0).map(() => new Cell()));
        return this;
    }

    spawnBombs(clickedX, clickedY) {
        const {x, y} = this.indexToCoord(clickedX,clickedY)

        if(this.areBombsSet) 
            return this;

        // Create an array of possible spawn coords 
        let possibilities = [...Array(this.width * this.height - 2).keys()],
            clickedIndex = y  * this.width + x ,
            bombsCoords = [],
            tmpBombIndex;

        // Choose bombs coords
        for(let i = 0 ; i < this.nbbombs ; i++) {
            tmpBombIndex = possibilities.splice(Math.floor(Math.random()*possibilities.length),1)[0]
            tmpBombIndex = (tmpBombIndex == clickedIndex) ? this.height * this.width - 1 : tmpBombIndex;
            bombsCoords.push(tmpBombIndex);
        }

        // Add bombs into the map
        bombsCoords.forEach(bombIndex => this.addBomb(bombIndex));

        this.areBombsSet = true;
        return this;
    }

    spawnRdmBombs(){
        new Checker(this.map,'map').def()

        let x = Math.floor(Math.random() * this.map.length)
        let y = Math.floor(Math.random() * this.map[0].length)
        return this.spawnBombs(x,y)
    }

    addBomb(indexX, indexY) {
        const {x, y} = this.indexToCoord(indexX,indexY)
        
        for(let i = x - 1 ; i <= x + 1 ; i++) {
            for(let j = y - 1 ; j <= y + 1 ; j++) {
                if(i >= 0 && j >= 0 && i < this.height && j < this.width && !(i == x && j == y)) {
                    this.map[i][j].inc()
                }
            }
        }

        this.map[x][y].bomb()
        return this;
    }

    show(reveal = false) {
        new Checker(reveal,'reveal').def().bool();
        new Checker(this.map,'map').def()

        let output = `${this.name} (${this.width}x${this.height}, ${this.nbbombs} bombs) \n`
        this.map.forEach( line => { 
            line.forEach(c => {
                if(reveal) {
                    output += c.isRevealed ? "-" : " "
                }
                output += c.isBomb ? "x " : c.nb + " "
            })
            output += "\n"
        })
        console.log(output)

        return this;
    }

    reveal(indexX, indexY) {
        const {x, y} = this.indexToCoord(indexX,indexY)

        if(this.map[x][y].isRevealed || this.map[x][y].isFlaged)
            return this;

        let nb = this.map[x][y].reveal()

        // Loose life if bomb
        if(this.map[x][y].isBomb) {
            if(this.lives < 1) {
                this.isWon = false
                this.isEnded = true
            } else {
                this.lives--
            }
        } else {
            this.revealedCells++
        }

        // Reveal other cells if cell exists
        if(nb == 0) {
            if(x > 0)
                this.reveal(x-1,y)
            if(y > 0)
                this.reveal(x,y-1)
            if(x < this.width - 1)
                this.reveal(x+1,y)
            if(y < this.height - 1)
                this.reveal(x,y+1)
        }

        // Check if game is won or lost
        if(this.revealedCells >= this.width * this.height - this.nbbombs) {
            this.isWon = true
            this.isEnded = true
        }

        if(this.flaggedCells.length == this.nbbombs) {
            let allFlagsAreBomb = true
            this.flaggedCells.forEach(c => { allFlagsAreBomb = allFlagsAreBomb && this.map[c.x][c.y].isBomb })
            if(allFlagsAreBomb) {
                this.isWon = true
                this.isEnded = true
            }
        }

        return this;
    }

    indexToCoord(indexX, indexY) {
        new Checker(this.map,'map').def()
        new Checker(this.width,'width').def()
        new Checker(this.height,'height').def()
        if(indexY !== undefined) {
            new Checker(indexX,'indexX').required().int().between(0, this.width - 1)
            new Checker(indexY,'indexY').required().int().between(0,this.height - 1)
        } else {
            new Checker(indexX,'indexX').required().int().between(0, this.height * this.width - 1)
            new Checker(indexY,'indexY').undef()
        }

        let x = indexY ? indexX : Math.floor(indexX / this.width),
            y = indexY ? indexY : indexX % this.width ;

        return {x,y}
    }
}

module.exports = Grid