//Packages//
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util'); // environmental variable for specifying production of development
var buildProduction = utilities.env.production; //tells what kind of environment we are using. part of gulp-util
var del = require('del'); // clean tasks
var jshint = require('gulp-jshint');//Js hint
var lib = require('bower-files')({ //required for bootstrap
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
var browserSync = require('browser-sync').create();

//FRONT-END TASKS//
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});
gulp.task('bower', ['bowerJS', 'bowerCSS']);//causes bower to run js and css above at the same time.

//server
gulp.task('serve', function() { //auto server sync
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  //watching from the moment the server is launched
  gulp.watch(['js/*.js'], ['jsBuild']);// 2 arguments we want gulp to watch
  gulp.watch(['bower.json'], ['bowerBuild']);// 2 arguments we are watching
  gulp.watch(['*.html'], ['htmlBuild']);
});
// array of tasks to run whenever any of the files above change // assumes we are working on dev server so we don't need minifyScripts
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

//when bower manifest file changes our files will be rebuilt and the browser is reloaded with bowelBuild
gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});





gulp.task("clean", function() {
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'], function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
    gulp.start('bower');
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function() {
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task('jshint', function() {
  return gulp.src(['js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});
