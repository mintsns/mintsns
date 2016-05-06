const gulp = require('gulp');
const babel = require('gulp-babel');

import gutil, { PluginError } from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

import assign from 'object-assign';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import watch from 'gulp-watch';

import del from 'del';

 
// gulp.task('build', () => {
// 
// 	return gulp.src([
//     'src/js/*.js',
//     'src/js/**/.js'
// 		])
// 		.pipe(babel({
// 			presets: ['es2015']
// 		}))
// 		.pipe(gulp.dest('../data/www/html/js'));
// });

gulp.task('copy', () => {
  return gulp.src('src/view/*')
    .pipe(gulp.dest('../data/www/html/'));
});

gulp.task('build', ['copy'], () => {
  const b = browserify('src/js/index.js', { debug: true })
    .transform(babelify);
  return bundle(b);
});

gulp.task('watch', () => {

  // watch view
  gulp.watch("src/view/index.html", ['copy']);


  // watchify
  const b = browserify('src/js/index.js', assign({ debug: true }, watchify.args))
    .transform(babelify);
  const w = watchify(b)
    .on('update', () => bundle(w))
    .on('log', gutil.log);
  return bundle(w)

});

gulp.task('clean', () => {
  return del('../data/www/html/*', {force: true});
});

gulp.task('default', ['copy', 'watch']);

function bundle(b) {
  return b.bundle()
    .on('error', (e) => {
      console.error(e.stack);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('../data/www/html/js'));
}