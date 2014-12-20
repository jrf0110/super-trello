var gulp      = require('gulp');
var transform = require('vinyl-transform');
var pkg       = require('./package.json');

var config = {
  scripts:    ['src/*.js', 'src/**/*.js']
, lint:       ['src/*.js', 'src/**/*.js', '*.js']
, jshint:     { "laxcomma": true
              , "sub": true
              , "globals": {
                  "console": true
                , "module": true
                }
              }
, brwoserify: { debug: true }
};

gulp.task( 'scripts', function(){
  return gulp.src('./src/super-trello.js')
  .pipe( transform( function( filename ){
    return require('browserify')( config.browserify )
    .add( filename )
    .bundle();
  }))
  .pipe( gulp.dest('./dist') );
});

gulp.task( 'lint', function(){
  return gulp.src( config.lint )
    .pipe( require('gulp-jshint')( config.jshint ) )
    .pipe( require('gulp-jshint').reporter('default') );
});

gulp.task( 'watch', function(){
  gulp.watch( config.lint, ['lint'] );
  gulp.watch( config.scripts, ['scripts'] );
});

gulp.task( 'default', [ 'lint', 'scripts', 'watch'] );