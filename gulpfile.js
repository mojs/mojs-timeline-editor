var gulp          = require('gulp');
var livereload    = require('gulp-livereload');

gulp.task('default', function(){
  livereload.listen();
  gulp.watch('./app/build/mojs-timeline-editor.js', function (e) {
    gulp
      .src(e.path)
      .pipe(livereload());
  });
});








