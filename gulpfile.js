const gulp = require('gulp');
const requireDir = require('require-dir');

//Require all gulp task files
requireDir('./config/gulp', {recurse: true});

//gracefully exit
process.once('SIGINT', function() {
    process.exit(o)
});