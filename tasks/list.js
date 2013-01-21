/*
 * Grunt Task File
 * ---------------
 *
 * Task: RequireJS
 * Description: Tasks for working with RequireJS.
 * Dependencies: requirejs
 *
 */

module.exports = function(grunt) {

  // Node.js modules
  var fs = require("fs");
  var path = require("path");
  // Include requirejs
  var _ = grunt.util._;
  // Shorthand Grunt functions
  var log = grunt.log;

  grunt.registerTask("list", "Show module dependencies", function(prop) {
    var options = grunt.config("requirejs") || {};
    var baseUrl = options.baseUrl || "app";
    var done = this.async();

    require("./lib/list").init(grunt).list(path.normalize(baseUrl + "/"), done);
  });


};
