const gulp = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const pug = require('gulp-pug');
 
gulp.task("default", defaultTask);

function defaultTask(done) {
  console.log("gulp is running...");
  done();
}

gulp.task('pugHtml', function buildHTML() {
  return gulp.src('src/**/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'));
});

// gulp.task('copyHtml', () => {
//   return gulp.src('src/*.html')
//     .pipe(gulp.dest('dist'));
// });

gulp.task('sass', () => {
  return gulp.src('src/css/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('imageMin', () =>
  gulp.src('src/img/*')
    .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
    .pipe(gulp.dest('dist/img'))
);

gulp.task('watch', function () {
  gulp.watch("src/*.pug", gulp.series("pugHtml"));
  gulp.watch("src/js/*.js", gulp.series("scripts"));
  gulp.watch("src/img/*", gulp.series("imageMin"));
  gulp.watch("src/css/*.sass", gulp.series("sass"));
});