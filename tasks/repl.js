/*
 * REPL Task File
 * ---------------
 *
 * Task: REPL
 * Description: Run the application through a REPL.
 * Dependencies: requirejs
 *
 */

module.exports = function(grunt) {

  // Node.js modules
  var readline = require("readline");
  var fs = require("fs");
  var path = require("path");
  var exec = require("child_process").exec;
  // Include cdir.
  var cdir = require("cdir");
  // Include phantom.
  var phantom = require("phantom");
  // Shorthand Grunt functions
  var _ = grunt.utils._;
  var log = grunt.log;

  grunt.registerTask("repl", "Run app through REPL.", function(prop) {
    var options = grunt.helper("options", this, { url: null });
    var done = this.async();

    if (options.url == null) {
      options.url = "http://localhost:8000";
    }

    _.defaults(options, {
      prefix: "bbb"
    });
    
    // Run the bbb server, if its not already running.
    var child = exec("bbb server");

    // Ensure the child process dies with the master.
    process.on("exit", function() {
      child.kill("SIGKILL");
    });

    // Run the bbb repl.
    grunt.helper("bbb:repl", options.url, options.prefix);
  });

  grunt.registerHelper("bbb:repl", function(url, name) {
    // Set up the prompt.
    var fragment;
    var prefix = function() { return name + " (" + (fragment || "/") + ") ~ " };
    var read = readline.createInterface(process.stdin, process.stdout);

    // Create a new PhantomJS instance.
    phantom.create(function(ph) {
      // Create a new Page.
      ph.createPage(function(page) {
        // Set a normal viewport size.
        page.viewportSize = { width: 1024, height: 768 };

        // Open the local BBB instance.
        page.open("http://127.0.0.1:8000", function(status) {
        // Set a normal viewport size.
        page.viewportSize = { width: 1024, height: 768 };
          // Inject the helper JS.
          page.injectJs(__dirname + "/repl/helper.js");

          // Indicate this page is ready to be used.
          setTimeout(function() {
            ready(page, status, ph);
        // Set a normal viewport size.
        page.viewportSize = { width: 1024, height: 768 };
          }, 100);
        });
      });
    });

    function show() {
      read.setPrompt(prefix(), prefix().length);
      read.prompt();
    }

    function fixFunctions(obj) {
      function next(key, val) {
        if (val && typeof val === "object" && val.__type__ === "function") {
          obj[key] = transformFunction(val.__src__);
        } else if (val && typeof val === "object") {
          fixFunctions(val);
        }
      }

      if (Array.isArray(obj)) {
        obj.forEach(function(val, key) {
          next(key, val);
        });
      } else if (obj && typeof obj === "object") {
        for (var key in obj) {
          next(key, obj[key]);
        }
      }

      return obj;
    }

    function transformFunction(str) {
      return new Function("return " + str)();
    }

    function ready(page, status, ph) {
      // Wait for data.
      read.on("line", function(line) {
        var command = line.trim();
        var fn;

        // This is an actual command.
        if (command) {
          if (command === "print") {
            page.render("./screenshot.png");
            return show();
          }

          command = [
            "try {",
              // Evaluate.
              "var retVal = eval('" + command.replace(/(\\|\')/g, "\\$1") + "');",

              // Normalize.
              "retVal = normalize(retVal);",

              // Return.
              "return retVal;",
            "} catch (ex) {",
              "return ex.toString();",
            "}"
          ].join("\n");

          // Create a new phantom function.
          fn = new Function(command); 

          // Run the command inside the application.
          page.evaluate(fn, function(result) {
            if (result && typeof result === "object") {
              // Transform a single function.
              if (result.__type__ === "function") {
                result = transformFunction(result.__src__);

                // Display the result.
                console.log(result);

                // Show prompt.
                show();
              } else {
                cdir(fixFunctions(result));
              }
            } else {
              // Display the result.
              console.log(result);

              page.evaluate(function() {
                return Backbone.history.fragment;
              }, function(frag) {
                fragment = frag;

                // Show prompt.
                show();
              });
            }
          });
        } else {
          // Show prompt.
          show();
        }
      });

      // Cleanup on close.
      read.on("close", function() {
        process.exit(0);
      });

      // Show prompt.
      show();
    }
  });

};

