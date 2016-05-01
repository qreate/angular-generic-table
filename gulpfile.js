var gulp        = require("gulp");
var less        = require("gulp-less");
var sourcemaps  = require('gulp-sourcemaps');
var filter      = require('gulp-filter');
var uglify      = require('gulp-uglify');
var bs          = require("browser-sync").create('Dev Server');
var bsDocs      = require("browser-sync").create('Docs Server');
var bsDist      = require("browser-sync").create('Build Server');
var bump        = require('gulp-bump');
var jshint      = require('gulp-jshint');
var gulpPrint   = require('gulp-print');
var reload      = bs.reload;
var cache       = require('gulp-cached');
var karma       = require('gulp-karma');
var jasmine     = require('gulp-jasmine');
var domSrc      = require('gulp-dom-src');
var addsrc      = require('gulp-add-src');
var path        = require('path');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix  = new LessPluginAutoPrefix({ browsers: ["last 2 versions","ie 10", "ie 11", "> 5% in SE"] });
var ngHtml2Js   = require("gulp-ng-html2js");
var minifyHtml  = require("gulp-minify-html");
var concat      = require("gulp-concat");
var runSequence = require('run-sequence');
var del         = require('del');
var ngAnnotate  = require('gulp-ng-annotate');
var cssmin      = require('gulp-cssmin');
var cheerio     = require('gulp-cheerio');
var angularProtractor = require('gulp-angular-protractor');
var rename      = require("gulp-rename");
var bowerfile   = require('./bower.json');
var tar         = require('gulp-tar');
var gzip        = require('gulp-gzip');
var artUpload   = require('gulp-artifactory-upload');
var gutil       = require('gulp-util');


var lessSources = [
    "*.less",
    "partial/**/*.less",
    "directive/**/*.less",
    "modal/**/*.less",
    "*/partial/**/*.less",
    "*/directive/**/*.less",
    "*/modal/**/*.less"
];
var jsSources = [
    "app.js",
    "partial/**/*.js",
    "directive/**/*.js",
    "modal/**/*.js",
    "service/**/*.js",
    "filter/**/*.js",
    "*/partial/**/*.js",
    "*/directive/**/*.js",
    "*/modal/**/*.js",
    "*/service/**/*.js",
    "*/filter/**/*.js"
];

var testFiles = [
    "bower_components/angular-mocks/angular-mocks.js",
    "*-spec.js",
    "partial/**/*-spec.js",
    "directive/**/*-spec.js",
    "modal/**/*-spec.js",
    "service/**/*-spec.js",
    "filter/**/*-spec.js",
    "*/partial/**/*-spec.js",
    "*/directive/**/*-spec.js",
    "*/modal/**/*-spec.js",
    "*/service/**/*-spec.js",
    "*/filter/**/*-spec.js"
];

var htmlSources = [
    "*.html",
    "partial/**/*.html",
    "directive/**/*.html",
    "modal/**/*.html",
    "*/partial/**/*.html",
    "*/directive/**/*.html",
    "*/modal/**/*.html"
];

var indexSources = [
    "bower_components/less.js/dist/less.js",
    "bower_components/jquery/jquery.js",
    "bower_components/bootstrap/dist/js/bootstrap.js",
    "bower_components/underscore/underscore.js",
    "bower_components/moment/moment.js",
    "bower_components/angular/angular.js",
    "bower_components/angular-ui-router/release/angular-ui-router.js",
    "bower_components/angular-sanitize/angular-sanitize.min.js",
    "bower_components/angular-animate/angular-animate.js",
    "bower_components/angular-resource/angular-resource.js",
    "bower_components/angular-strap/dist/angular-strap.min.js",
    "bower_components/angular-strap/dist/angular-strap.tpl.min.js",
    "bower_components/angular-filter/dist/angular-filter.js",
    "bower_components/angular-bind-notifier/dist/angular-bind-notifier.min.js",
    "bower_components/prism/prism.js",
    "bower_components/prism/plugins/line-numbers/prism-line-numbers.js",
    "bower_components/ng-csv/build/ng-csv.min.js"
];

// get sources from index.html
var sourceFiles = function() {
    return domSrc({file:'index.html',selector:'script[data-concat!="false"]',attribute:'src'});
};

// run jshint
gulp.task('jshint', function() {
    return gulp.src(jsSources)
        // cache sources and only pipe changes
        .pipe(cache('jshinting'))
        .pipe(gulpPrint(function(filepath) {
            return "jshinting: " + filepath;
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// run unit tests
gulp.task('test', function() {
    // Be sure to return the stream
    //return gulp.src(testFiles)
    return sourceFiles()
        .pipe(addsrc.append(testFiles))
        // cache sources and only pipe changes
        //.pipe(cache('testing'))
        .pipe(gulpPrint(function(filepath) {
            return "testing: " + filepath;
        }))
        .pipe(karma({
            configFile: 'config/karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            //throw err;
        });
});

// run end-2-end tests
gulp.task('test-e2e',function(){
    return gulp.src(['/e2e-tests/*-spec.js'])
        .pipe(angularProtractor({
            'configFile': 'e2e-tests/protractor.conf.js',
            'args': ['--baseUrl', 'http://localhost:3000/'],
            'autoStartStopServer': true,
            'debug': true
        }))
        .on('error', function(e) { throw e })
});

// compile less files into css
gulp.task('less', function () {
    return gulp.src(["app.less"])
        .pipe(gulpPrint(function(filepath) {
            return "compiling less: " + filepath;
        }))
        //uncomment sourcemaps and run autoprefix
        //.pipe(sourcemaps.init())
        .pipe(less({
            paths:['./'],
            plugins: [autoprefix]
        }))
        .pipe(filter('app.css'))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))// Write the CSS & Source maps
        .pipe(bs.stream())
        .pipe(filter('**/*.css')); // Filtering stream to only css files
});

// compile less files into dist css
gulp.task('build-less', function () {
    return gulp.src(["app.less"])
        .pipe(gulpPrint(function(filepath) {
            return "compiling less: " + filepath;
        }))
        //uncomment sourcemaps and run autoprefix
        //.pipe(sourcemaps.init())
        .pipe(less({
            paths:['./'],
            plugins: [autoprefix]
        }))
        .pipe(filter('app.css'))

        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))// Write the CSS & Source maps
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(cssmin()) // Minify css
        .pipe(rename("app.full.min.css"))
        .pipe(gulp.dest('./dist/'));
});

// compile less files into dist css
gulp.task('build-gt-less', function () {
    return gulp.src(["./directive/generic-table/generic-table.less"])
        .pipe(gulp.dest("./dist/less"))
        .pipe(gulpPrint(function(filepath) {
            return "compiling less: " + filepath;
        }))
        //uncomment sourcemaps and run autoprefix
        //.pipe(sourcemaps.init())
        .pipe(less({
            paths:['./'],
            plugins: [autoprefix]
        }))
        .pipe(filter('generic-table.css'))

        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))// Write the CSS & Source maps
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(cssmin()) // Minify css
        .pipe(rename("generic-table.min.css"))
        .pipe(gulp.dest('./dist/css'));
});

// compile less files into dist css
gulp.task('build-gt-less', function () {
    return gulp.src(["./directive/generic-table/generic-table.less"])
        .pipe(gulp.dest("./dist/less"))
        .pipe(gulpPrint(function(filepath) {
            return "compiling less: " + filepath;
        }))
        //uncomment sourcemaps and run autoprefix
        //.pipe(sourcemaps.init())
        .pipe(less({
            paths:['./'],
            plugins: [autoprefix]
        }))
        .pipe(filter('generic-table.css'))

        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))// Write the CSS & Source maps
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(cssmin()) // Minify css
        .pipe(rename("generic-table.min.css"))
        .pipe(gulp.dest('./dist/css'));
});

// compile less files into dist css
gulp.task('build-examples-less', function () {
    return gulp.src(["./partial/examples/examples.less"])
        .pipe(gulp.dest("./dist/less"))
        .pipe(gulpPrint(function(filepath) {
            return "compiling less: " + filepath;
        }))
        //uncomment sourcemaps and run autoprefix
        //.pipe(sourcemaps.init())
        .pipe(less({
            paths:['./'],
            plugins: [autoprefix]
        }))
        .pipe(filter('examples.css'))

        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))// Write the CSS & Source maps
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(cssmin()) // Minify css
        .pipe(rename("examples.min.css"))
        .pipe(gulp.dest('./dist/css'));
});

// start server
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        },
        ghostMode: false
    });
});

// start server and serve dist folder
gulp.task('serve-dist', ['build'], function() {
    bsDist.init({
        server: {
            baseDir: "./dist"
        },
        ghostMode: false
    });
});

// start server and serve docs folder
gulp.task('serve-docs', ['build-docs'], function() {
    bsDocs.init({
        server: {
            baseDir: "./docs"
        },
        ghostMode: false
    });
});

/* TODO: send bump type as parameter */
// Bump project version ( patch | minor | major | prerelease )
gulp.task('bump', function () {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'));
});
gulp.task('bump:minor', function () {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ type: 'minor' }))
        .pipe(gulp.dest('./'));
});
gulp.task('bump:major', function () {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ type: 'major' }))
        .pipe(gulp.dest('./'));
});
gulp.task('bump:prerelease', function () {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ type: 'prerelease' }))
        .pipe(gulp.dest('./'));
});

// put html files in template cache (js file)
gulp.task('build-gt-template',function(){
    return gulp.src('./directive/generic-table/generic-table.html',{base:'./'})
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'generic.table'
        }))
        .pipe(concat("generic.table.tpl.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/temp/"));
});

// concatenate js sources
gulp.task('concat-gt-sources',function(){
    var dotName = bowerfile.name.replace(/-/g, '.');
    return gulp.src([
            "dist/temp/*.js",
            "directive/generic-table/generic-table.js"])
        .pipe(sourcemaps.init())
        .pipe(concat(dotName+".js"))
        .pipe(gulp.dest("./dist/js/"))
        .pipe(concat(dotName+".min.js"))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/js/"));

});

// concatenate index sources
gulp.task('concat-index-sources',function(){
    return gulp.src(indexSources)
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./dist/js/"))
        .pipe(concat("vendor.min.js"))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/js/"));

});


// copy-less files into dist
gulp.task('copy-less',function(){
    return del(['dist/less/**/*']),
        gulp.src(lessSources,{
            base:'./'
        }).pipe(filter(['**/*', '!app.less', '!partial/**/*']))
            .pipe(gulp.dest("./dist/less/"));

});

// clean dist
gulp.task('build-clean',function(){
    return del(['dist/**/*']);
});
gulp.task('build-gt-clean',function(){
    return del(['dist/temp']);
});

// build task
gulp.task('build', function() {
    return runSequence('test','build-clean',
        'build-less','concat-js-sources','build-index');
});

// build task for building generic tables
gulp.task('build-gt', function() {
    return runSequence('build-clean',
        'build-gt-less','build-gt-template','concat-gt-sources','build-gt-clean');
});

// reload task
gulp.task('reload',  function(){
    bs.reload();
});

// set up html watch task
gulp.task('html-watch', bs.reload("index.html"));

// set up js watch task
gulp.task('js-watch', ['jshint', 'reload','test']);

// watch task
gulp.task('watch',['browser-sync'], function(){
    gulp.watch(lessSources, ['less']);
    gulp.watch(jsSources, ['js-watch']);
    gulp.watch(htmlSources, ['html-watch']);
});

// use default task to launch application and initiate watch, less and jshint
gulp.task('default', ['watch','less','jshint']);
