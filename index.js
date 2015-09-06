var gulp = require('gulp'),
    Elixir = require('laravel-elixir'),
    replace = require('gulp-batch-replace');

Elixir.extend('replace', function (src, replacements, output) {
    var paths = prepGulpPaths(src, output);

    new Elixir.Task('replace', function () {
        this.log(paths.src, paths.output);

        return (
            gulp.src(paths.src.path)
                .pipe(replace(replacements))
                .pipe(gulp.dest(paths.output.baseDir))
        );
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param {string|array} src
 * @param {string|null}  output
 */
var prepGulpPaths = function (src, output) {
    return new Elixir.GulpPaths()
        .src(src)
        .output(output || src);
};
