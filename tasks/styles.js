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

  grunt.registerTask("styles", "Compile project styles.", function() {
    var contents, stylesheet;
    // Styles configuration settings.
    var styles = grunt.config("styles");
    // Output file.
    var output = "";

    if (!styles || !styles.index) {
      return log.error("Missing styles Grunt configuration setting.");
    }

    // Read in the contents.
    contents = file.read(styles.index);

    // Parse the stylesheet.
    stylesheet = cssom.parse(contents);

    // If no CSS rules are defined, why are we even here?
    if (!Array.isArray(stylesheet.cssRules)) {
      return log.write("No css imports defined.");
    }

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
    }).forEach(function(filepath) {
      var contents = file.read(filepath);

      // Parse Stylus files.
      if (path.extname(filepath).slice(1) === "styl") {
        return grunt.helper("stylus", contents, {
          // TODO Make this configurable.
          paths: ["assets/css"]
        }, function(css) {
          output += css;
        });
      }

      // Add vanilla CSS files.
      output += contents;
    });

    // TODO Make this configurable.
    // Write out the debug file.
    file.write("dist/debug/index.css", output);
    
    // Success message.
    log.writeln("File \"dist/debug/index.css\" created.");
  });

};
