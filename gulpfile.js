/*
  github.com/mystrdat/gonzo-stack
  2016 | MIT
  ============================== */

// Dependencies
const gulp         = require('gulp');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const postCSS      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const sourcemaps   = require('gulp-sourcemaps');

// Paths
const srcPath   = './';
const buildPath = './';
const buildName = 'style';

// Compile with inline map for dev
gulp.task('build-dev', () => {
  return gulp.src(srcPath + 'main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename(buildName + '.css'))
    .pipe(gulp.dest(buildPath));
});

// Compile minified and optimized for prod
gulp.task('build-prod', () => {
  return gulp.src(srcPath + 'main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(postCSS([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(cleanCSS({ keepSpecialComments: 0, mergeMediaQueries: true }))
    .pipe(rename(buildName + '.min.css'))
    .pipe(gulp.dest(buildPath));
});

// Watchers
gulp.task('watch-dev', () => {
  gulp.watch([srcPath + '**/*.sass', srcPath + '**/*.scss'], ['build-dev']);
});
gulp.task('watch-prod', () => {
  gulp.watch([srcPath + '**/*.sass', srcPath + '**/*.scss'], ['build-prod']);
});

// Tasks
gulp.task('default', ['build-dev', 'watch-dev']);
gulp.task('dev', ['build-dev', 'watch-dev']);
gulp.task('prod', ['build-prod', 'watch-prod']);
