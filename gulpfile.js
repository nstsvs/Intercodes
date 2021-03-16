"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const server = require("browser-sync").create();
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const pipeline = require("readable-stream").pipeline;

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("src/img/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
  return gulp.src("src/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});


gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  gulp.watch("src/img/**/*.svg", gulp.series("sprite", "minify-html", "refresh"));
  gulp.watch("src/**/*.html", gulp.series("minify-html", "refresh"));
  gulp.watch("src/js/*.js", gulp.series("minify-js", "refresh"));
});

gulp.task("copy", function () {
  return gulp.src([
    "src/img/logo-*.svg",
    "src/*.ico"
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("fonts", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}"
  ], {
    base: "src/fonts"
  })
    .pipe(gulp.dest("build/fonts"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("minify-html", function () {
  return gulp.src([
    "src/*.html",
    "src/**/*.html"
    ], {
      base: "src"
    })
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
  .pipe(gulp.dest("build"));
});

gulp.task("minify-js", function () {
  return pipeline(
    gulp.src("src/js/*.js"),
    uglify(),
    gulp.dest("build/js")
  );
});

gulp.task("build", gulp.series(
  "clean",
  "images",
  "css",
  "sprite",
  "copy",
  "fonts",
  "minify-js",
  "minify-html"));
gulp.task("start", gulp.series("build", "server"));
