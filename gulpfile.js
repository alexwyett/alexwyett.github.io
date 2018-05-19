var gulp        = require('gulp');
var browserSync = require('browser-sync');
var browserify  = require('gulp-browserify');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cp          = require('child_process');

var messages = {
    jekyllDev: '<span style="color: grey">Running:</span> $ jekyll build for dev',
    jekyllProd: '<span style="color: grey">Running:</span> $ jekyll build for prod'
};

/**
 * Build the Jekyll Site in development mode
 */
gulp.task('jekyll-dev', ['js'], function (done) {
  browserSync.notify(messages.jekyllDev);
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--drafts', '--future', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-dev'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-dev, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-dev'], function() {
  browserSync.init({
    server: "_site",
    port: 2610
  });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
  return gulp.src(['assets/sass/styles.scss'])
    .pipe(sass({
      includePaths: ['scss', 'node_modules', 'bower_components', 'assets'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(gulp.dest('_site/assets/build/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/build/css'));
});

// Basic usage 
gulp.task('js', function() {
    gulp.src('assets/js/app.js')
      .pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
      }))
      .pipe(gulp.dest('./assets/build/js'))
      .pipe(gulp.dest('./_site/assets/build/js'))
      .pipe(browserSync.reload({stream:true}))
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['assets/sass/**/*.scss','assets/sass/*.scss'], ['sass']);
  gulp.watch(['assets/js/**/*.js','assets/js/*.js'], ['js']);
  gulp.watch(['index.html', '_data/*', '_layouts/*.html', '_drafts/*', '_posts/*', '_pages/*', '_includes/*.html', '_includes/*.json', '*.md'], ['jekyll-rebuild']);
});


/**
 * Build the Jekyll Site in production mode
 */
gulp.task('jekyll-prod', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['sass', 'jekyll-prod']);