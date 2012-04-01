/*
 * Grunt Task File
 * ---------------
 *
 * Task: less
 * Description: Compile LESS files to CSS and minify.
 * Dependencies: less / clean-css
 *
 */

module.exports = function(grunt) {

  grunt.registerMultiTask("less",
    "Compile LESS files to CSS and minify.", function() {

    // load libraries
    var less = require("less");
    var cleanCSS = require("clean-css");
    var data = this.data;

    // initialize LESS parser
    var parser = new(less.Parser)(data.options);

    // iterate over files to compile/compress
    Object.keys(data.files).forEach(function(dest) {
      // grab src file to compile dest to
      var src = data.files[dest];

      // run less compiler
      parser.parse(file.read(src), function (e, tree) {
        var css = tree.toCSS();

        // if config specified minify, do so with clean-css
        if(data.options.compress) {
          css = cleanCSS.process(css);
        }

        file.write(dest,css);
      });
    });

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    log.writeln("LESS compiling / minification complete.");
  });

};
