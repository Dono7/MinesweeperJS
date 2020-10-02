const Checker = require("./Checker.js")
const Cell = require("./Cell.js")


const minGirdSize = 9
const maxGirdSize = 1000


class Grid {

    // Should handle param errors
    // Every param is optional
    constructor({
        width = minGirdSize,
        height = minGirdSize,
        name = "Untitled",
        nbbombs = 10
        } = {}
    ){
        // Check parameters
        new Checker(width,'width').int().between(minGirdSize, maxGirdSize)
        new Checker(height,'width').int().between(minGirdSize, maxGirdSize)
        new Checker(name,'name').string().notEmpty()
        new Checker(nbbombs,'nbbomb').int().min(Math.max(1, Math.floor(width * height / 100)))

        this.width = width
        this.height = height
        this.name = name
        this.nbbombs = nbbombs
        this.areBombsSet = false;
    }

    initMap() {
        this.map = new Array(this.height).fill(0).map(() => new Array(this.width).fill(0).map(() => new Cell()));
        return this;
    }

    spawnBombs(clickedX, clickedY) {
        const {x, y} = indexToCoord(clickedX,clickedY)

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
        const {x, y} = indexToCoord(indexX,indexY)
        
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

    reveal(x, y) {
        const {x, y} = indexToCoord(indexX,indexY)

        if(this.map[y][x].isRevealed)
            return;

        let nb = this.map[y][x].reveal()

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