var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mocha = require("gulp-mocha"),
    istanbul = require("gulp-istanbul"),
    browserSync = require('browser-sync').create();

gulp.task("lint", function () {
    return gulp.src([
        "src/**/**.ts",
        "test/**/**.test.ts"
    ])
        .pipe(tslint({}))
        .pipe(tslint.report("verbose"));
});

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("default", function () {
    var tsResult = gulp.src("src/*.ts")
        .pipe(tsc({
              noImplicitAny: true,
              out: "output.js"
        }));
    return tsResult.js.pipe(gulp.dest("built/local"));
});

gulp.task("build", function () {
    return gulp.src([
        "src/**/**.ts",
        "typings/server.d.ts/",
        "source/interfaces/interfaces.d.ts"
    ])
        .pipe(tsProject())
        .js.pipe(gulp.dest("src/"));
});
// TODO may not need because this is an API and will not be loaded in a browser
gulp.task("bundle", function() {

    var libraryName = "myapp";
    var mainTsFilePath = "source/server.js";
    var outputFolder   = "dist/";
    var outputFileName = libraryName + ".min.js";

    var bundler = browserify({
        debug: true,
        standalone : libraryName
    });

    return bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));
});

gulp.task("watch", ["default"], function () {

    browserSync.init({
        server: "."
    });

    gulp.watch([ "source/**/**.ts", "test/**/*.ts"], ["default"]);
    gulp.watch("dist/*.js").on('change', browserSync.reload); 
});

var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build", function() {
    return gulp.src([
            "test/**/*.ts",
            "src/interfaces/interfaces.d.ts"
        ])
        .pipe(tsc(tsTestProject))
        .js.pipe(gulp.dest("test/"));
});

gulp.task("istanbul:hook", function() {
    return gulp.src(['source/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["istanbul:hook"], function() {
    return gulp.src('test/**/*.test.js')
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});