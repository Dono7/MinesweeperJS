class Checker {

    constructor(paramvalue, paramname = ''){
        this.n = paramname
        this.v = paramvalue
        this.ok = true
        this.msg = ''

        return this;
    }

    required() { 
        if(this.ok && (this.v === undefined || this.v === null) ) {
            this.ok = false
            this.msg = `The parameter ${this.n} is required`
            this.fire()
        }
        return this;
    }

    notEmpty() {
        if(this.ok && (this.v.length < 1 || this.v === '') ) {
            this.ok = false
            this.msg = `The parameter ${this.n} is required`
            this.fire()
        }
        return this;
    }

    int() {
        if(this.ok && ( ! Number.isInteger(this.v) ) ) {
            this.ok = false
            this.msg = `The parameter ${this.n} must be an integer`
            this.fire()
        }
        return this;
    }

    string() {
        if(this.ok &&( ! (typeof this.v === 'string' ||  this.v instanceof String ) ) ) {
            this.ok = false
            this.msg = `The parameter ${this.n} must be a string`
            this.fire()
        }
        return this;
    }
    
    def() {
        if(this.ok && ( this.v === undefined ) ) {
            this.ok = false
            this.msg = `The parameter ${this.n} should not be undefined`
            this.fire()
        }
        return this;
    }

    undef() {
        if(this.ok && f( this.v !== undefined ) ) {
            this.ok = false
            this.msg = `The parameter ${this.n} should be undefined`
            this.fire()
        }
        return this;
    }

    min(i) {
        if(this.ok && ( this.v < i  ) ) {
            this.ok = false
            this.msg = `The parameter ${this.n} must be greater than ${i}`
            this.fire()
        }
        return this;
    }

    max(i) {
        if(this.ok && ( this.v > i  ) ) {
            this.ok = false
            this.msg = `The parameter ${this.n} must be smaller than ${i}`
            this.fire()
        }
        return this;
    }

    between(a,b) {
        return this.min(a).max(b);
    }

    fire() {
        if(! this.ok && this.msg != '') {
            throw new Error(`[MinesweeperJS] ${this.msg}`)
        }
    }

}


export default Checker ;