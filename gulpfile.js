/*
 * Gulpfile
 * Tasks are registered from dev-tools module.
 */
var gulp = require('gulp')
var devTools = require('syn-dev-tools').gulp
var manager = devTools.Manager.getInstance(gulp)
manager.registerTasks()

var insert = require('gulp-insert')
gulp.task('vendor-scss-copy', function () {
  return gulp.src([
    'node_modules/bootstrap-sass/assets/**/*.scss',
    'node_modules/syn-ui/src/scss/**/*.scss',
    'node_modules/syn-grids/src/scss/**/*.scss',
    'node_modules/syn-auth/src/scss/**/*.scss',
  ], {base: "./node_modules"})
    .pipe(insert.prepend('// scss-lint:disable all\n'))
    .pipe(gulp.dest('src/scss/vendor'))
})
