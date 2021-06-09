const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();
const pug = require('gulp-pug');


// Sass Task
function scssTask() {
    return src(['app/scss/style.scss'],{sourcemaps:true})
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('app', {sourcemaps:'.'}))
}


// Browsersync Tasks
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: 'app'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('app/*.html', browsersyncReload);
    watch(['app/scss/style.scss'], series(scssTask,  browsersyncReload));
}

// Pug Task
function pugTask(){
    return src('./app/pages/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(dest('app/'));
  };
  

// Default Gulp task
exports.default = series(
    pugTask,
    scssTask,
    browsersyncServe,
    watchTask
);