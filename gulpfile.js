var gulp = require('gulp');
var browserify= require('gulp-browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var literalify = require('literalify');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var minifyCSS = require('gulp-minify-css');

gulp.task('browserify', function () {

	// Pulls in all modules recursively
	 gulp.src('src/js/app.jsx')
	.pipe(browserify({

		transform: reactify
	}))
	.pipe(concat('app.js'))
	//.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
            
});

// Compile bootstrap-sass to css
gulp.task('boot-sass', function () {
    gulp.src('bower_components/bootstrap-sass/assets/stylesheets/bootstrap.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css/'));
});

// Compile sass to css
gulp.task('sass', function () {
    gulp.src('src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Run the linter
gulp.task('sass-lint', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(scsslint());
});

// Build mocha browser tests
gulp.task('build-tests', function(){
	gulp.src('tests/master.js')
	.pipe(browserify({transform: literalify.configure({
	    // map module names with global objects
	    'jquery': 'window.$'
	 })}))
	.pipe(concat('tests.js'))
	.pipe(gulp.dest('browser_tests/'));
});

// Run browserify and build sass by default wih "gulp"
gulp.task('default', ['browserify', 'sass']);

// Watch for changes in the src dictory and run the default task
gulp.task('watch', function(){

	// Watch all files in src for changes
	gulp.watch('src/**/*.*', ['default']);
});