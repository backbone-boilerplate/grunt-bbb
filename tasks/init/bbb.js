exports.description = "Backbone Boilerplate framework";
exports.notes = "This tool will help you install, configure, build, and "
  + "maintain your Backbone Boilerplate project.";

exports.template = function(grunt, init, done) {

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
  var _ = grunt.utils._;

  // Files to copy (and process).
  var files = init.filesToCopy({});

  // Actually copy (and process). files.
  init.copyAndProcess(files, {}, {
    noProcess: [ "assets/**", "test/**", "favicon.ico" ]
  });

  // All done!
  done();

};
