const gulp                    = require('gulp'),
	del                       = require('del'),
	sourcemaps                = require('gulp-sourcemaps'),
	plumber                   = require('gulp-plumber'),
	sass                      = require('gulp-sass'),
	autoprefixer              = require('gulp-autoprefixer'),
	minifyCss                 = require('gulp-clean-css'),
	babel                     = require('gulp-babel'),
	webpack                   = require('webpack-stream'),
	uglify                    = require('gulp-uglify'),
	concat                    = require('gulp-concat'),
	imagemin                  = require('gulp-imagemin'),
	dependents                = require('gulp-dependents'),

	src_folder                = './src/',
	dist_folder               = './dist/',
	node_modules_folder       = './node_modules/',
	dist_node_modules_folder  = dist_folder + 'node_modules/';


gulp.task('clear', () => del([ dist_folder ]));

gulp.task('sass', () => {
	return gulp.src([
		src_folder + 'sass/**/*.sass',
		src_folder + 'scss/**/*.scss'
	], { since: gulp.lastRun('sass') })
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(dependents())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dist_folder + 'css'))
});

gulp.task('sass-prod', () => {
	return gulp.src([
		src_folder + 'sass/**/*.sass',
		src_folder + 'scss/**/*.scss'
	], { since: gulp.lastRun('sass') })
		.pipe(plumber())
		.pipe(dependents())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest(dist_folder + 'css'))
});

gulp.task('js', () => {
	return gulp.src(src_folder + 'js/**/*.js', { since: gulp.lastRun('js') })
		.pipe(plumber())
		.pipe(webpack({
			mode: 'development',
			entry : [
				src_folder+'js/main.js'
			]
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: [ '@babel/env' ]
		}))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dist_folder + 'js'))
});

gulp.task('js-prod', () => {
	return gulp.src(src_folder + 'js/**/*.js', { since: gulp.lastRun('js') })
		.pipe(plumber())
		.pipe(webpack({
			mode: 'production',
			entry : [
				src_folder+'js/main.js'
			]
		}))
		.pipe(babel({
			presets: [ '@babel/env' ]
		}))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist_folder + 'js'))
});

gulp.task('images', () => {
	return gulp.src([ src_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)' ], { since: gulp.lastRun('images') })
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest(dist_folder + 'images'))
});

gulp.task('dev', gulp.series('sass', 'js', 'images'));

gulp.task('prod', gulp.series('sass-prod', 'js-prod', 'images'));

gulp.task('watch', () => {
	const watchImages = [
		src_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)'
	];

	const watch = [
		src_folder + 'scss/**/*.scss',
		src_folder + 'js/**/*.js',
	];

	gulp.watch(watch, gulp.series('dev'));
	gulp.watch(watchImages, gulp.series('images'));
});

gulp.task('default', gulp.series('dev', gulp.parallel('watch')));