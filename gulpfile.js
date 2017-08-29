'use strict';
const config = require('./config');

let gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify   = require('gulp-uglify'),
    sass     = require('gulp-sass'),
    rigger   = require('gulp-rigger'),
    cssmin   = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

// Таск для сборки и оптимизации стилий
// Добавляет префиксы и сжимает css
gulp.task('style:build', () => {

    gulp.src(config.gulp.src.css)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(config.gulp.build.css));
});

// Таск для сжатия картинок
gulp.task('img:minify', () => {
    gulp.src(config.gulp.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(config.gulp.build.img));
});

gulp.task('watch', () => {
    watch(config.gulp.watch.css, (event, cb) => {
        gulp.start('style:build');
    });
});
