/*
 * Grunt Task File
 * ---------------
 *
 * Task: Clean
 * Description: Remove the contents of a given folder
 * Dependencies: rimraf
 *
 */

module.exports = function(grunt) {

  var rimraf = require("rimraf");
  var log = grunt.log;

  grunt.registerTask("clean",
    "Deletes out all contents in a directory", function() {

    var files = grunt.config("clean");

    files.forEach(function(file) {
      grunt.helper("clean", file);
    });

    return grunt.errors ? false : true;
  });

  grunt.registerHelper("clean", function(path) {
    log.writeln("Removing: " + path);
    rimraf.sync(path);
  });

};
