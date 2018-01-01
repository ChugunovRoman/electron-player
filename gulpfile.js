'use strict';

let gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify   = require('gulp-uglify'),
    sass     = require('gulp-sass'),
    rigger   = require('gulp-rigger'),
    cssmin   = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

let path =  {
    'build': {
        'css': `${__dirname}/public/css`,
        'img': `${__dirname}/public/img`
    },
    'src': {
        'css': `${__dirname}/public/sass`,
        'img': `${__dirname}/public/i`
    }
}

// Таск для сборки и оптимизации стилий
// Добавляет префиксы и сжимает css
gulp.task('style:build', () => {

    gulp.src(path.src.css)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

// Таск для сжатия картинок
gulp.task('img:minify', () => {
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img));
});

gulp.task('watch', () => {
    watch(path.watch.css, (event, cb) => {
        gulp.start('style:build');
    });
});
