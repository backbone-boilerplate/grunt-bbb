/*
 * grunt-bbb
 * https://github.com/timbranyen/bbb
 *
 * Copyright (c) 2012 Tim branyen (tbranyen)
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  // Grunt utilities.
  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('bbb', 'Your task description goes here.', function() {
    log.write(grunt.helper('bbb'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('bbb', function() {
    return 'bbb!!!';
  });

};
