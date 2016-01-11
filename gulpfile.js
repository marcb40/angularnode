var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')


gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    })
})

gulp.task('browserify', function() {
    // Grabs the app.js file
    console.log('app compile');
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
})

gulp.task('sass', function() {
	console.log('sass compile');
    return sass('./app/sass/style.sass')
        .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', function() {

    gulp.watch('app/**/*.js', ['browserify'])
    gulp.watch('app/sass/style.sass', ['sass'])
})

gulp.task('default', ['connect', 'watch'])

