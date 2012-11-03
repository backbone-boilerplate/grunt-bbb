/*
 * Grunt Task File
 * ---------------
 *
 * Task: Styles
 * Description: Compile BBB Project Styles.
 * Dependencies: cssom
 * Tasks: stylus
 *
 */

module.exports = function(grunt) {

  var path = require("path");
  // Third-party libs.
  var cssom = require("cssom");
  var _ = grunt.utils._;
  // Shorthand Grunt functions
  var log = grunt.log;
  var file = grunt.file;
  
  // Needed for backwards compatibility with Stylus task.
  grunt.registerHelper("stylus", function(source, options, callback) {
    var s = require("stylus")(source);
    
    // load nib if available
    try {
      s.use(require("nib")());
    } catch (e) {}

    _.each(options, function(value, key) {
      s.set(key, value);
    });

    s.render(function(err, css) {
      if (err) {
        grunt.log.error(err);
        grunt.fail.warn("Stylus failed to compile.");
      } else {
        callback(css);
      }
    });
  });

  grunt.registerMultiTask("styles", "Compile project styles.", function() {
    // Output file.
    var output = "";
    // Options.
    var options = this.data;
    // Read in the contents.
    var contents = file.read(options.src);
    // Parse the stylesheet.
    var stylesheet = cssom.parse(contents);

    // If no CSS rules are defined, why are we even here?
    if (!Array.isArray(stylesheet.cssRules)) {
      return log.write("No css imports defined.");
    }

    if (!options.paths) {
      options.paths = [];
    }

    options.paths.push(require("nib").path);

    // Iterate over the CSS rules, reducing to only @imports, then apply the
    // correct prefixed path to each file.  Finally, process each file and
    // concat into the output file.
    stylesheet.cssRules.reduce(function(paths, rule) {
      // If it has a path it's relevant, so add to the paths array.
      if (rule.href) {
        paths.push(rule.href);
      }

      return paths;
    }, []).map(function(path) {
      return "assets/css/" + path;
    }).concat(options.additional || []).forEach(function(filepath) {
      var contents = file.read(filepath);

      // Parse Stylus files.
      if (path.extname(filepath).slice(1) === "styl") {
        return grunt.helper("stylus", contents, options, function(css) {
          output += css;
        });

      // Parse LESS files.
      } else if (path.extname(filepath).slice(1) === "less") {
        return grunt.helper("less", contents, options, function(css) {
          output += css;
        });
      }

      // Add vanilla CSS files.
      output += contents;
    });

    // Write out the debug file.
    file.write(this.target, output);
    
    // Success message.
    log.writeln("File " + this.target + " created.");
  });

};
