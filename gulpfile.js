"use strict";

/***************************
  Vars
***************************/
const srcFolder  = 'src',
    distFolder = 'dist';

const path = {
    src: {
        html: srcFolder + '/*.html',
        inc: srcFolder + '/**/*.html',
        sass: srcFolder + '/sass/**/*.sass',
        js: srcFolder + '/js/**/*.js',
        img: srcFolder + '/images/**/*.{jpg,png,gif,ico,webp}',
        svg: srcFolder + '/images/*.svg',
        fonts: srcFolder + '/fonts/**/*.{eot,svg,ttf,woff}'
    },
    dist: {
        html: distFolder + '/*.html',
        vue: distFolder + '/components',
        css: distFolder + '/css',
        js: distFolder + '/js',
        img: distFolder + '/images',
        fonts: distFolder + '/fonts'
    }
}

const gulp       = require('gulp'),
    //util         = require('gulp-util'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'), //For JS
    babel        = require('gulp-babel'),
    cleanCSS     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    webp         = require('gulp-webp'),
    webpHtml     = require('gulp-webp-html'),
    embedSvg     = require('gulp-embed-svg'),
    svgSprite    = require('gulp-svg-sprite'),
	svgmin       = require('gulp-svgmin'),
	cheerio      = require('gulp-cheerio'),
	replace      = require('gulp-replace'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    include      = require('gulp-file-include');

/***************************
  Browser Sync
***************************/
function browserSyncFunc() {
    browserSync.init({
        server: {
            baseDir: distFolder
        },
        port: 3000,
        //proxy: 'yourlocal.dev',
        notify: false
    });
}

/***************************
  JS
***************************/
function jsUseFunc() {
    return gulp.src(srcFolder + '/js/common.js')
    .pipe(include({
        prefix: '@',
        basepath: '@file'
    }))
    .pipe(rename({
        basename: 'scripts'
    }))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest(path.dist.js))
}

function jsLibFunc() {
    return gulp.src([
        srcFolder + '/libs/vue/dist/vue.min.js',
        srcFolder + '/libs/imagesloaded/imagesloaded.pkgd.min.js',
        srcFolder + '/libs/svgxuse/svgxuse.min.js',
        srcFolder + '/libs/inputmask/dist/inputmask.min.js',
        srcFolder + '/libs/choices/public/assets/scripts/choices.min.js',
        //srcFolder + '/libs/vue-multiselect/dist/vue-multiselect.min.js',
        //srcFolder + '/libs/vue-slide-up-down/dist/vue-slide-up-down.umd.js',
        distFolder + '/js/scripts.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.dist.js))
    // .pipe(rename({
    //     suffix: '.min'
    // }))
    // .pipe(uglify())
    // .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream());
}

let jsFunc = gulp.series(jsUseFunc, jsLibFunc);

/***************************
  Sass
***************************/
function sassFunc() {
    return gulp.src(path.src.sass)
    .pipe(sass({
        outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 21 versions']
    }))
    .pipe(gulp.dest(path.dist.css))
    // .pipe(rename({
    //     suffix: '.min'
    // }))
    // .pipe(cleanCSS())
    // .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());
}

/***************************
  Html
***************************/
function htmlFunc() {
    return gulp.src(path.src.html)
    .pipe(include({
        prefix: '@',
        basepath: '@file'
    }))
    //.pipe(webpHtml())
    .pipe(embedSvg({
        root: './src',
        selectors: 'svg[src*=".svg"]'
    }))
    .pipe(gulp.dest(distFolder + '/'))
    .pipe(browserSync.stream());
}

/***************************
  Vue
***************************/
// function vueFunc() {
//     return gulp.src(path.src.vue)
//     .pipe(include({
//         prefix: '@',
//         basepath: '@file'
//     }))
//     .pipe(embedSvg({
//         root: './src',
//         selectors: 'svg[src*=".svg"]'
//     }))
//     .pipe(gulp.dest(path.dist.vue))
//     .pipe(browserSync.stream());
// }

/***************************
  Image
***************************/
function imgFunc() {
    return gulp.src(path.src.img)
    .pipe(webp({
        quality: 70
    }))
    .pipe(gulp.dest(path.dist.img))
    .pipe(gulp.src([
        path.src.img,
        path.src.svg
    ]))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.optipng({optimizationLevel: 3})
    ]))
    .pipe(gulp.dest(path.dist.img))
    .pipe(browserSync.stream());
}

/***************************
  Sprites
***************************/
function spriteFunc() {
    return gulp.src('src/images/symbols/**/*.svg')
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: '../sprite.svg',
                render: {
                    scss: {
                        dest: '../../sass/_sprite.scss',
                        template: '_sprite_template.scss'
                    }
                }
            }
        }
    }))
    .pipe(gulp.dest(srcFolder + '/images/'));
}

/***************************
  Svg minification
***************************/
function svgFunc() {
    return gulp.src([
        srcFolder + '/images/source/**/*.svg'
    ])
    .pipe(imagemin([
        imagemin.svgo({
            plugins: [
                {removeViewBox: false}
    ]})]))
    .pipe(gulp.dest(srcFolder + '/images'))
    .pipe(browserSync.stream());
}

/***************************
  Fonts
***************************/
function fontsFunc() {
    return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts))
    .pipe(browserSync.stream());
}

/***************************
  Watch
***************************/
function watchFunc() {
    gulp.watch(path.src.inc, gulp.parallel( htmlFunc ));
    gulp.watch(path.src.sass, gulp.parallel( sassFunc ));
    gulp.watch(path.src.js, gulp.parallel( jsFunc ));
    gulp.watch(path.src.img, gulp.parallel( imgFunc ));
}

/***************************
  Clean and Clearcache
***************************/
function cleanFunc() {
    return del(distFolder);
}

function clearcacheFunc() {
    return cache.clearAll();
}

/***************************
  Commands
***************************/
exports.default = gulp.series(cleanFunc, gulp.parallel(htmlFunc, sassFunc, jsFunc, imgFunc, fontsFunc, browserSyncFunc, watchFunc));
exports.build = gulp.series(clearcacheFunc, cleanFunc, gulp.parallel(htmlFunc, sassFunc, jsFunc, imgFunc, fontsFunc));
exports.clearcache = clearcacheFunc;
exports.sprite = spriteFunc;
exports.svg = svgFunc;