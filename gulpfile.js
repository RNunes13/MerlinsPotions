var gulp = require("gulp");
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");
var clean = require('gulp-clean');
var concat = require("gulp-concat");
var runSequence = require('run-sequence');

// Directories
const dist = './dist';
const src = './src';
const assetsSrc = './src/assets';
const assetsDist = './dist/assets';

var task = {

  clean: function () {
    return gulp.src(dist, { read: false })
      .pipe(clean())
  },

  sass: function () {
    return gulp.src(`${assetsSrc}/scss/**/*.scss`)
      .pipe(sass())
      .on('error', utils.swallowError)
      .pipe(autoprefixer({
        browsers: ['last 50 versions'],
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(gulp.dest(`${assetsDist}/css`));
  },

  pug: function () {
    return gulp.src([`${src}/views/*.pug`])
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest(dist));
  },

  js: function () {
    return gulp.src([`${assetsSrc}/js/**/*.js`, `!${assetsSrc}/js/common/**/*.js`])
      .pipe(uglify())
      .on('error', utils.swallowError)
      .pipe(gulp.dest(`${assetsDist}/js`));
  },

  jsGlobal: function () {
    return gulp.src(`${assetsSrc}/js/common/**/*.js`)
      .pipe(concat('merlins-global.js'))
      .pipe(uglify())
      .on('error', utils.swallowError)
      .pipe(gulp.dest(`${assetsDist}/js/`));
  },

  img: function () {
    return gulp.src(`${assetsSrc}/img/**/*`)
      .pipe(gulp.dest(`${assetsDist}/img`));
  }
};

var utils = {
  swallowError: function (error) {
    console.log(error.toString())
    utils.alert(error.toString())
    this.emit('end')
  },

  alert: function (msg) {
    gulp.src(src).pipe(notify(msg));
  }
};

gulp.task('clean', task.clean);
gulp.task('sass', task.sass);
gulp.task('pug', task.pug);
gulp.task('js', task.js);
gulp.task('jsGlobal', task.jsGlobal);
gulp.task('img', task.img);


gulp.task('watch', function () {
  gulp.watch([`${assetsSrc}/scss/**/*.scss`], function () {
    gulp.run('sass');
  });

  gulp.watch([`${src}/views/**/*.pug`], function () {
    gulp.run('pug');
  });

  gulp.watch([`${assetsSrc}/js/**/*.js`], function () {
    gulp.run('js');
    gulp.run('jsGlobal');
  });

  gulp.watch(`${assetsSrc}/img/**/*`, function () {
    gulp.run('img');
  });
});

gulp.task('default', function (callback) {
  runSequence('clean', ['sass', 'pug', 'jsGlobal', 'js', 'img'], callback);
});