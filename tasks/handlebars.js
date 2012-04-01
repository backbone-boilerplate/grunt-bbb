/*
 * Grunt Task File
 * ---------------
 *
 * Task: Handlebars 
 * Description: Compile handlebars templates to JST file
 * Dependencies: None
 *
 */

module.exports = function(grunt) {

  var config = grunt.config;
  var file = grunt.file;
  var log = grunt.log;

  grunt.registerMultiTask("handlebars",
    "Compile underscore templates to JST file", function() {

    // If namespace is specified use that, otherwise fallback
    var namespace = config("meta.handlebars.namespace") || "JST";

    // Create JST file.
    var files = file.expand(this.data);
    file.write(this.target, grunt.helper("handlebars", files, namespace));

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    log.writeln("File \"" + this.target + "\" created.");
  });

  grunt.registerHelper("handlebars", function(files, namespace) {
    namespace = "this['" + namespace + "']";

    // Comes out looking like this["JST"] = this["JST"] || {};
    var contents = namespace + " = " + namespace + " || {};\n\n";

    // Compile the template and get the function source
    contents += files ? files.map(function(filepath) {
      var templateFunction =
        require("handlebars").precompile(file.read(filepath));

      return namespace + "['" + filepath + "'] = " + templateFunction;
    }).join("\n\n") : "";

    return contents;
  });

};
