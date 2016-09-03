var gulp = require('gulp');
var karma = require('karma').server;
var replace = require('gulp-replace');

var postprocessLCOV = function() {
    return gulp.src('reports/coverage/lcov.info')
        .pipe(replace('SF:.', 'SF:frontend-project'))
        .pipe(gulp.dest('reports/coverage'));
};