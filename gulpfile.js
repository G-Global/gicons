var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var util = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minigyJS = require('gulp-minify');
var browserSync = require('browser-sync').create();


//gulpConfig
var config = {
    DEV_DIR: 'dev/',
    DIST_DIR: 'dist/',
    sassFiles: 'sass/style.scss',
    jsFiles:'js/*.js',
    'htmlFiles': './**/*.html',
    production: !!util.env.production
}

//project js dependencies
var dependencies = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/bootstrap.js'
]


//gulp Sass Task
gulp.task('sass', function(){
    return gulp.src(config.DEV_DIR+'/'+config.sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(config.production ? minifyCSS() : util.noop())
        .pipe(gulp.dest(config.DIST_DIR+'css'));
    
})

//gulp js Task
gulp.task('js', function(){
    return gulp.src(config.DEV_DIR + '/' + config.jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(config.production ? uglify({mangle: false, outsourceMap:true}) : util.noop())
        .pipe(gulp.dest(config.DIST_DIR+'js'))
})

//gulp bower Task
gulp.task('bower', function(){
    return gulp.src(dependencies)
        .pipe(concat('libs.js'))
        .pipe(config.production ? uglify() : util.noop())
        .pipe(gulp.dest(config.DIST_DIR+'js'))

})


gulp.task('build', function(){
    return gulp.src(config.DEV_DIR+'/sass/gicons.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(config.production ? minifyCSS() : util.noop())
    .pipe(gulp.dest(config.DIST_DIR+'css'))
})



//gulp browserSync Task
gulp.task('serve', function(){

    browserSync.init({
        server:{
            baseDir: './'
        }
    })
    gulp.watch(config.htmlFiles).on('change', browserSync.reload);
    gulp.watch(config.DEV_DIR+'/'+ config.sassFiles, ['sass']).on('change', browserSync.reload);
    gulp.watch(config.DEV_DIR+'/'+ config.jsFiles, ['js']).on('change', browserSync.reload);
})


//gulp watch Task
gulp.task('watch', function(){
    gulp.watch(config.DEV_DIR+'/'+ config.sassFiles, ['sass']);
    gulp.watch(config.DEV_DIR+'/'+ config.jsFiles, ['js']);
})

//gulp Default
gulp.task('default', ['sass', 'js', 'bower']);
