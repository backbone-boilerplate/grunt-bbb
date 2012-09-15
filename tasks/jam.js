/*
 * Grunt Task File
 * ---------------
 *
 * Task: Jam
 * Description: Task for working with JamJS.
 * Dependencies: jamjs
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

  // Set the log level.
  jamjs.logLevel("info");

  // Execute a JamJS task.
  grunt.registerTask("jam", "Install, ls, remove, " +
    "upgrade, search, or rebuild packages.", function(prop) {
    var taskName = process.argv[2];
    var packages = process.argv.slice(3).join(" ");
    var done = this.async();
    // Find and reference the JamJS task function.
    var task = jamjs[taskName];
    // Used to populate the command.
    var args = ["./"];

    // Add the packages argument if it exists.
    if (process.argv.length > 3) {
      args.push([packages]);
    }

    // Add the callback last.
    args.push(function(err, data) {
      // If there is data worth logging, log it.
      console.log(data);
    });

    // Execute the task with correct arguments.
    task.apply(jamjs, args);
  });

};
