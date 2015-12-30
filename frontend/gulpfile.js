const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('default', () => {

	return gulp.src([
    'src/js/*.js',
    'src/js/**/.js'
		])
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('../data/www/js'));
});