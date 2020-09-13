class Grid {

    // Should handle param errors
    // Every param is optional
    constructor({
        width = 9,
        height = 9,
        name = "Untitled",
        nbbombs = "10",
        map} = {}
    ){
        this.width = width
        this.height = height
        this.name = name
        this.nbbombs = nbbombs
        this.map = map;
        this.areBombsSet = false;
    }

    initMap() {
        this.map = new Array(this.height).fill(0).map(() => new Array(this.width).fill(0).map(() => new Cell()));
        return this;
    }

    // Assume that nbbombs is a valid nb
    setBombs(clickedX, clickedY) {
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

    addBomb(bombIndex, y) {
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

    show() {
        let output = `${this.name} (${this.width}x${this.height}, ${this.nbbombs} bombs) \n`
        this.map.forEach( line => { 
            line.forEach(c => {
                output += c.isRevealed ? "_" : "-"
                output += c.isBomb ? "x " : c.nb + " "
            })
            output += "\n"
        })
        console.log(output)

        return this;
    }

    reveal(x, y) {
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
    }
}


export default Grid ;