#!/usr/bin/env node

var grunt = require("grunt");
var task = process.argv[2];
var jamTasks = ["install", "ls", "remove", "upgrade", "search", "rebuild"];

// Works for now...
process.exit = function() {
  process.emit("attemptedExit");
};

// Preload all custom tasks.
grunt.npmTasks([
  // Load grunt-jasmine-task used for testing Jasmine.
  "grunt-jasmine-task",
  // Load grunt-targethtml to allow seamless targeted builds.
  "grunt-targethtml",

  // Load grunt-contrib tasks.
  "grunt-contrib-clean",
  "grunt-contrib-copy",
  "grunt-contrib-jst",
  "grunt-contrib-less",
  "grunt-contrib-mincss",
  "grunt-contrib-stylus",
  "grunt-contrib-uglify",

  // Load the remaining tasks (init/server/requirejs) from bbb.
  "bbb"
]);

// Draw the help screen.
function displayHelp() {
  var pkg = require("./package.json");
  grunt.log.writeln();
  grunt.log.writeln(pkg.description);
  grunt.log.writeln((" " + pkg.name + " ").green.inverse
    + " Version - " + pkg.version);

  // Borrowed heavily from the Grunt help source.
  var col1len = 0;

  var opts = Object.keys(grunt.cli.optlist).map(function(long) {
    var o = grunt.cli.optlist[long];
    var col1 = '--' + (o.negate ? 'no-' : '') + long + (o.short ? ', -' + o.short : '');
    col1len = Math.max(col1len, col1.length);
    return [col1, o.info];
  });

  var widths = [1, col1len, 2, 76 - col1len];
  var tasksList = Object.keys(grunt.task._tasks).sort();

  if (tasksList.length) {
    displayTasks("Backbone Boilerplate ", tasksList);
  }

  function displayTasks(name, tasksList) {
    var tasks = tasksList.map(function(name) {
      col1len = Math.max(col1len, name.length);
      var info = grunt.task._tasks[name].info;

      // Ensure the message ends with a `.`.
      if (info[info.length-1] !== ".") {
        info += ".";
      }

      return [name, info.grey];
    });

    grunt.log.writeln();
    grunt.log.writeln(("Usage: bbb <task_name>").yellow);
    grunt.log.writeln();

    tasks.forEach(function(a) {
      grunt.log.writetableln(widths,
        ['', grunt.utils._.pad(a[0], col1len), '', a[1]]
      );
    });
  }

  grunt.log.writeln();
}

// Immediately display help screen if no arguments.
if (process.argv.length === 2) {
  // Initialize task system so that the tasks can be listed.
  grunt.task.init([], {help: true});

  // Do not proceed further.
  return displayHelp();
}

// If a Jam specific task is found, defer to the Jam task.
if (jamTasks.indexOf(process.argv[2]) > -1) {
  return grunt.tasks("jam");
}

// Otherwise, invoke the CLI.
grunt.cli();
