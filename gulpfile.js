/* 
 * This file is used to concat, babelify, and minify the javascript files
 */

// Import Gulp methods
const { src, dest, task, watch, series, parallel } = require('gulp');

// Import node modules
var uglify = require('gulp-uglify')
var babelify = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var injecter = require('gulp-inject-string')

// Path setup
const jsEntry = 'index.js'
const jsSRC = './classes/'
const jsDEST = './lib/'
const jsFILES = [jsEntry]

// File Header
const { version, author, license } = require('./package.json')
const d = new Date()
const today = `${d.getFullYear()}/${d.getMonth().toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}`
const header = `MinesweeperJS v${version} | by ${author} | Under ${license} License | Date: ${today} | Find more : https://github.com/Dono7/MinesweeperJS`

// Gulp task : JS
function js(done) {
    jsFILES.map( function (entry) {
        return browserify({
            entries: [jsSRC + jsEntry]
        })
        .transform( babelify, { presets: ['@babel/preset-env'] } )
        .bundle()
        .pipe( source( entry) )
        .pipe( rename({ extname: `-${version}.min.js`}) )
        .pipe( buffer() )
        // .pipe( sourcemaps.init({ loadMaps: false }) )
        .pipe( uglify() )
        .pipe( injecter.prepend(`/* ${header} */\n`) )
        .pipe( injecter.append(`\n`) )
        // .pipe( sourcemaps.write('.') )
        .pipe( dest( jsDEST ))
    })
    done()
}


// Export tasks
// Run it with `gulp js` or just `gulp`
task('js',js)
task('default', parallel(js))
console.log(header)
