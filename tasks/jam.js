
/*
 * Grunt Task File
 * ---------------
 *
 * Task: Jam
 * Description: Task for working with JamJS.
 * Dependencies: jam
 *
 */

module.exports = function(grunt) {
  
  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  // Node.js modules
  var fs = require("fs");
  var path = require("path");
  // Include requirejs
  var jamjs = require("jamjs");
  var _ = grunt.util._;
  // Shorthand Grunt functions
  var log = grunt.log;

  // The install package task.
  grunt.registerTask("install", "Run JamJS install.", function(prop) {
    var packages = process.argv.slice(3).join(" ");
    var done = this.async();

    jamjs.install("./", packages, function() {
      log.writeln("Successfully installed: ".red + packages);
      done();
    });

    console.log(jamjs.jamrc);
  });

};
