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

// Path setup
const jsEntry = 'index.js'
const jsSRC = './classes/'
const jsDEST = './lib/'
const jsFILES = [jsEntry]

// Gulp task : JS
function js(done) {
    jsFILES.map( function (entry) {
        return browserify({
            entries: [jsSRC + jsEntry]
        })
        .transform( babelify, { presets: ['@babel/preset-env'] } )
        .bundle()
        .pipe(source( entry) )
        .pipe( rename({ extname: '.min.js'}) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( uglify() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest( jsDEST ))
    })
    done()
}

// Export tasks
// Run it with `gulp js` or just `gulp`
task('js',js)
task('default', parallel(js))
