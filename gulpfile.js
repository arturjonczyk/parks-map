'use strict';

// REQUIRE - SECTION
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify'),
	concatCss = require('gulp-concat-css'),
	del = require('del'),
	htmlreplace = require('gulp-html-replace'),
	purify = require('gulp-purifycss'),
	csslint = require('gulp-csslint'),
	cssc = require('gulp-css-condense'),
	concatjs = require('gulp-concat');
// END REQUIRE - SECTION

// DIRECTORIES - SECTION
var paths = {
	app: ['src/index.html'],
	styles: ['src/styles/lib/*.css', 'src/styles/*.css'],
	scripts: [
		'src/javascripts/lib/jquery-2.1.4.min.js',
		'src/javascripts/lib/knockout-3.3.0.min.js',
		'src/javascripts/lib/oauth-signature.min.js',
		'src/javascripts/yelpHandler.js',
		'src/javascripts/mapHandler.js',
		'src/javascripts/parkConstructor.js',
		'src/javascripts/data.js',
		'src/javascripts/appViewModel.js',
		'src/javascripts/app.js'
	]
};
// END DIRECTORIES - SECTION

// WATCH -SECTION
gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: 'src/',
			index: 'index.html'
		},
		browser: 'google chrome'
	});
	gulp.watch([paths.app], reload);
	gulp.watch([paths.scripts], reload);
	gulp.watch([paths.styles], reload);
});
// END WATCH - SECTION

// CSS - SECTION //
gulp.task('concatCSS', function() {
	return gulp.src(paths.styles)
			   .pipe(concatCss('styles.css'))
			   .pipe(gulp.dest('dist/css/'));
	});

gulp.task('purify', function() {
	return gulp.src('./dist/css/styles.css')
			   .pipe(purify(['./src/index.html', './src/javascripts/appViewModel.js']))
			   .pipe(gulp.dest('./dist/css/'));
	});

gulp.task('cssc', function() {
    return gulp.src('dist/css/styles.css')
        .pipe(cssc())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('css', function () {
	return gulp.src(paths.styles)
			   .pipe(concatCss('styles.min.css'))
			   .pipe(purify(['./src/index.html', './src/javascripts/appViewModel.js']))
			   .pipe(cssc())
			   .pipe(gulp.dest('./dist/css/'));
});
// END CSS - SECTION //

// JAVASCRIPT - SECTION
gulp.task('concatjs', function () {
	return gulp.src(paths.scripts)
			   .pipe(concatjs('all.min.js'))
			   .pipe(gulp.dest('./dist/js/'));
});

gulp.task('uglify', function() {
	return gulp.src('./dist/js/all.min.js')
			   .pipe(uglify())
			   .pipe(gulp.dest('dist/js/'));
	});

gulp.task('js', function () {
	return gulp.src(paths.scripts)
			   .pipe(concatjs('all.min.js'))
			   .pipe(uglify())
			   .pipe(gulp.dest('dist/js/'));
});

// END JAVASCRIPT - SECTION

// INDEX.HTML - SECTION
gulp.task('repTags', function() {
	return gulp.src(paths.app)
			   .pipe(htmlreplace({
			   		'css': '<link href="css/styles.min.css" rel="stylesheet">',
			   		'js': '<script src="js/all.min.js"></script>'
			   	}))
			   .pipe(gulp.dest('dist/'));
	});
// END INDEX.HTML - SECTION

// OTHERS - SECTION
gulp.task('del', function () {
	del('dist/', {force: true});
});

gulp.task('move', function() {
	gulp.src(['./src/favicon.ico'], { base: './src/' })
	    .pipe(gulp.dest('./dist/'));
});
// END OTHERS - SECTION

// BUILD DISTRIBUTION FOLDER
gulp.task('build', ['del', 'css', 'js', 'repTags', 'move']);
