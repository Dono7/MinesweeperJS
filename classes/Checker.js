class Checker {

    constructor(paramname, paramvalue){
        this.n = paramname
        this.v = paramvalue
        this.ok = true
        this.msg = ''
    }

    required() { 
        if(! this.ok) return ;

        if(this.v === undefined || this.v === null) {
            this.ok = false;
            this.msg = `The parameter ${this.n} is required`
        }

        return this;
    }

    notEmpty() {
        if(! this.ok) return ;

        if(this.v.length < 1 || this.v === '') {
            this.ok = false;
            this.msg = `The parameter ${this.n} is required`
        }

        return this;
    }

    int() {
        if(! this.ok) return ;

        if( ! Number.isInteger(this.v) ) {
            this.ok = false;
            this.msg = `The parameter ${this.n} must be an integer`
        }

        return this;
    }

    string() {
        if(! this.ok) return ;

        if( ! (typeof this.v === 'string' ||  this.v instanceof String ) ) {
            this.ok = false;
            this.msg = `The parameter ${this.n} must be a string`
        }

        return this;
    }

    min(i) {
        if(! this.ok) return ;

        if( this.v < i  ) {
            this.ok = false;
            this.msg = `The parameter ${this.n} must be greater than ${i}`
        }

        return this;
    }

    max(i) {
        if(! this.ok) return ;

        if( this.v > i  ) {
            this.ok = false;
            this.msg = `The parameter ${this.n} must be smaller than ${i}`
        }

        return this;
    }

}


export default Checker ;