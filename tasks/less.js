/*
 * Grunt Task File
 * ---------------
 *
 * Task: less
 * Description: Compile LESS files to CSS and minify.
 * Dependencies: less
 *
 */

module.exports = function(grunt) {

  var file = grunt.file;
  var log = grunt.log;

  grunt.registerMultiTask("less",
    "Compile LESS files to CSS.", function() {

    // load libraries
    var less = require("less");
    var data = this.data;

    // initialize LESS parser
    var parser = new(less.Parser)(data.options);

    // make sure task runs until parser is completely finished (imports are processed asynchronously)
    var done = this.async();

    // iterate over files to compile/compress
    Object.keys(data.files).forEach(function(dest) {
      
      // grab src file to compile dest to
      var src = data.files[dest];

      // run less compiler
      parser.parse(file.read(src), function (err, tree) {

        // record error (if any)
        if(err) {
          log.error(err);
        }

        // compile less to css
        var css = tree.toCSS();

        // write contents
        grunt.file.write(dest,css);

        // flag task as complete
        done();
      });

    });

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    log.writeln("LESS compilation complete.");
  });

};
