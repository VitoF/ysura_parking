var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] });
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    del = require('del'),
    swig = require('gulp-swig');

	
/*******************************************************************************
	SOURCES AND RESULT PATHS
*******************************************************************************/
var paths = {
    result: {
        html: 'result/views',
        css: 'result/css',
        js: 'result/js',
        root: 'result'
        },
    src: {
        html: 'src/views/*.html',
        htmlIndex: 'src/index.html',
        css: 'src/styles/**/*.less',
        js: 'src/scripts/**',
        libs: 'src/libs/**'
        },
}


/*******************************************************************************
	DEFAULT TASK
*******************************************************************************/
gulp.task('default', ['connect','clean'], function() {
    gulp.start('html');
    gulp.start('styles');
	gulp.start('scripts');
	gulp.start('libs');
	gulp.start('dataJSON');
    gulp.watch(paths.src.htmlIndex, ['html']);
    gulp.watch(paths.src.css, ['styles']);
    gulp.watch(paths.src.js, ['scripts']);
    gulp.watch(paths.src.libs, ['libs']);
    gulp.watch(paths.src.libs, ['dataJSON']);
});

gulp.task('clean', function(cb) {
    del([paths.result.root
        ], cb);
});


/*******************************************************************************
	STYLES
*******************************************************************************/
gulp.task('styles', function() {
   return gulp.src(paths.src.css)
	  .pipe(concat('style.css'))
      .pipe(less({
        plugins: [autoprefix]
      }))
      .pipe(gulp.dest(paths.result.css))
	  .pipe(minifycss())
	  .pipe(concat('style.min.css'))
	  .pipe(gulp.dest(paths.result.css));
});
    
/*******************************************************************************
	JS 
*******************************************************************************/

gulp.task('scripts', function() {
  return gulp.src(paths.src.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.result.js));
});
gulp.task('libs', function() {
  return gulp.src(paths.src.libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(paths.result.js));
});

/*******************************************************************************
	HTML
*******************************************************************************/

gulp.task('html', function() {
  return gulp.src(paths.src.htmlIndex)
    .pipe(gulp.dest(paths.result.root));
});

/*******************************************************************************
	WEB SERVER
*******************************************************************************/
gulp.task('connect', function() {
    connect.server({
        root: 'result',
        livereload: false,
        port: 2015
    });
});
gulp.task('dataJSON', function() {
  return gulp.src('src/data/**')
    .pipe(gulp.dest('result/data'));
});


