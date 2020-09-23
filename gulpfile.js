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
const jsCLIENT = 'client.js'
const jsSRC = './classes/'
const jsDEST = './lib/'
const jsFILES = ['server.js','client.js']
const jsWATCH = './classes/*.js'

// New javascript build path
// https://goede.site/transpile-and-minify-javascript-html-and-css-using-gulp-4
const paths = {
    source: "./classes",
    build: "./lib"
}

// File Header
const { version, author, license } = require('./package.json')
const d = new Date()
const today = `${d.getFullYear()}/${d.getMonth().toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}`
const header = `MinesweeperJS v${version} | by ${author} | Under ${license} License | Date: ${today} | Find more : https://github.com/Dono7/MinesweeperJS`

// Gulp task : JS
function client(done) {
    return browserify({ entries: [jsSRC + jsCLIENT] })
    .transform( babelify, { presets: ['@babel/preset-env'] } )
    .bundle()
    .pipe( source( jsCLIENT) )
    .pipe( rename({ extname: `-${version}.min.js`}) )
    .pipe( buffer() )
    // .pipe( sourcemaps.init({ loadMaps: false }) )
    .pipe( uglify() )
    .pipe( injecter.prepend(`/* ${header} */\n`) )
    .pipe( injecter.append(`\n`) )
    // .pipe( sourcemaps.write('.') )
    .pipe( dest( jsDEST ))
    console.log('Done : '+jsDEST)
    done()
}

function javascriptBuild() {
    // Start by calling browserify with our entry pointing to our main javascript file
    return (
        browserify({
            entries: [`${paths.source}/client.js`],
            // Pass babelify as a transform and set its preset to @babel/preset-env
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })]
        })
            // Bundle it all up!
            .bundle()
            // Source the bundle
            .pipe(source("client.js"))
            .pipe( rename({ extname: `-${version}.min.js`}) )
            // Then write the resulting files to a folder
            .pipe(dest(`${paths.build}`))
    );
}

// Watch JS
function js_watch(done) {
    watch(jsWATCH, parallel(js))
    done()
}

// Export tasks
// Run it with `gulp js` or just `gulp`
task('javascriptBuild',javascriptBuild)
task('client',client)
task('watch', js_watch)
task('default', parallel(client))
