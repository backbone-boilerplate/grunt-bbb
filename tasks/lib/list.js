"use strict";

// External libs.
var requirejs = require("requirejs");
var fs = require("fs");
var path = require("path");

exports.init = function(grunt) {
  var exports = {};
  var _ = grunt.util._;

  exports.list = function(appDir, done) {
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

        // Start with the app directory e.g. app/
        recurse(appDir);

        files.forEach(function(name) {
          var contents = fs.readFileSync(name, "utf8");
          var shortname = name.slice(name.indexOf(appDir));
          var dep;

          try {
            dep = parse.findDependencies(name, contents)
          } catch (ex) {
            
          }

          if (dep && dep.length) {
            deps[shortname] = parse.findDependencies(name, contents);
          }
        });
        
        console.log(exports.tree(deps));
        done();
      });
    });
  };

  exports.tree = function(obj) {
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
                tree.push("\u2502 " + spaces(depth+1, "\u2500", "\u2514") + " "
                  + val);
              } else {
                tree.push("\u2502 " + spaces(depth+1, "\u2500", "\u251c") + " "
                  + val);
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
  };

  return exports;
};

