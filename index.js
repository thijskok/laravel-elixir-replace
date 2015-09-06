var gulp = require('gulp'),
    Elixir = require('laravel-elixir'),
    replace = require('gulp-batch-replace');

/*
 |----------------------------------------------------------------
 | Rename Ingredient for Laravel Elixir
 |----------------------------------------------------------------
 |
 | This task will replace occurrences of a specified text search 
 | pattern into a new text string, just like a "replace all"
 | function. For example:
 | 
 | mix.replace('public/css/app.css', ['images/', '../images/']);
 |
 | Effectively, this would prefix every image path with "../".
 |
 */

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
