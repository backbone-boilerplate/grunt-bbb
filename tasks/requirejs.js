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
  var requirejs = require("requirejs");
  var _ = grunt.utils._;
  // Shorthand Grunt functions
  var log = grunt.log;

  grunt.registerTask("requirejs", "Build a RequireJS project.", function(prop) {
    var options = grunt.config("requirejs") || {};

    // Merge passed options into defaults
    options = _.extend({}, {
      // Do not optimize
      optimize: "none",

      // Show warnings
      logLevel: 2,

      // Ensure modules are inserted
      skipModuleInsertion: false,
    }, options);

    // Run the r.js helper
    grunt.helper("r.js", options, function(response) {
      // Print out response
      log.writeln(response);
    });
  });

  grunt.registerTask("list", "Show module dependencies", function(prop) {
    grunt.helper("list");
  });

  grunt.registerHelper("r.js", function(options, done) {
    requirejs.optimize(options, done);
  });

  grunt.registerHelper("list", function() {
    var jsRegExp = /\.js$/;

    requirejs.tools.useLib(function(require) {
      require(["parse"], function(parse) {
        var deps = {};
        var files = [];

        // Recursively find all files inside the application directory
        function recurse(dir) {
          fs.readdirSync(dir).forEach(function(name) {
            var subdir = path.resolve(dir, name);
            var stats = fs.statSync(subdir);
            
            if (stats.isDirectory()) {
              recurse(subdir);
            } else if (jsRegExp.test(name)) {
              files.push(subdir);
            }
          });
        }

        // Start with the app directory
        recurse("app/");

        files.forEach(function(name) {
          var contents = fs.readFileSync(name, "utf8");
          var shortname = name.slice(name.indexOf("app/"));

          deps[shortname] = parse.findDependencies(name,
            contents);
        });
        
        //console.log({ deps: deps });
        console.log(grunt.helper("tree", deps));
      });
    });
  });

  grunt.registerHelper("tree", function(obj) {
    var tree = [""];

    function spaces(len, end, start) {
      start = start || " ";
      end = end || " ";

      if (!start) {
        return Array(len+1).join(Array(3).join(end));
      } else {
        return Array(len+1).join(start + Array(2).join(end));
      }
    }

    function traverse(obj, depth) {
      _.each(obj, function(val, key) {
        var len;

        if (_.isArray(val)) {
          tree.push("\u251c" + spaces(depth) + " " + key);

          len = val.length;

          _.each(val, function(val, i) {
            if (_.isString(val)) {
              if (i == len-1) {
                tree.push("\u2502 " + spaces(depth+1, "\u2500", "\u2514") + " " + val);
              } else {
                tree.push("\u2502 " + spaces(depth+1, "\u2500", "\u251c") + " " + val);
              }
            } else if (_.isObject(val)) {
              traverse(obj, depth+1);
            }
          });

          tree.push("\u2502");

        } else if (_.isObject(val)) {
          tree.push(spaces(depth) + key);
          traverse(val, depth+1);
        } else {
          tree.push(spaces(depth) + key);
        }

      });
    }

    traverse(obj, 0);

    tree.pop();

    return tree.join("\n");
  });

};
