import Checker from "./Checker"


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
        new Checker(clickedX,'clickedX').required().int().between(0, maxGirdSize - 1)
        new Checker(clickedY,'clickedY').required().int().between(0, maxGirdSize - 1)
        new Checker(this.map,'map').def()

        if(this.areBombsSet) 
            return this;

        let possibilities = [...Array(this.width * this.height - 1).keys()] ,
            clickedIndex = clickedY  * this.width + clickedX ,
            bombsCoords = [],
            tmpBombIndex;

        // Choose bombs coords
        for(let i = 0 ; i < this.nbbombs ; i++) {
            tmpBombIndex = possibilities.splice(Math.floor(Math.random()*possibilities.length),1)[0]
            tmpBombIndex = (tmpBombIndex == clickedIndex) ? this.height * this.width : tmpBombIndex;
            bombsCoords.push(tmpBombIndex);
        }

        // Avoid bomb on the clicked cell
        tmpBombIndex = bombsCoords.indexOf(clickedIndex)
        if(tmpBombIndex > -1) {
            bombsCoords.splice(tmpBombIndex,1)
            bombsCoords.push(this.width * this.height)
        }

        // Add bombs into the map
        bombsCoords.forEach(bombIndex => this.addBomb(bombIndex));

        this.bombsSet = true;
        return this;
    }

    spawnRdmBombs(){
        new Checker(this.map,'map').def()

        let x = Math.floor(Math.random() * this.map.length)
        let y = Math.floor(Math.random() * this.map[0].length)
        return this.spawnBombs(x,y)
    }

    addBomb(bombIndex, y) {
        new Checker(this.map,'map').def()
        if(y !== undefined) {
            new Checker(bombIndex,'bombIndex').required().int().between(0, this.width - 1)
            new Checker(y,'y').required().int().min(0).max(this.height - 1)
        } else {
            new Checker(bombIndex,'bombIndex').required().int().between(0, this.height * this.width - 1)
            new Checker(y,'y').undef()
        }

        let x = y ? bombIndex : Math.floor(bombIndex / this.height);
            y = y ? y : bombIndex % this.width ;
        
        for(let i = x - 1 ; i <= x + 1 ; i++) {
            for(let j = y - 1 ; j <= y + 1 ; j++) {
                if(i >= 0 && j >= 0 && i < this.width && j < this.height && !(i == x && j == y)) {
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
        new Checker(x,'x').int().min(0).max(this.width - 1)
        new Checker(y,'y').int().min(0).max(this.height - 1)
        new Checker(this.map,'map').def()

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
}


export default Grid ;