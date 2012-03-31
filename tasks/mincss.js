module.exports = function(grunt) {

  var log = grunt.log;
  var file = grunt.file;

  grunt.registerMultiTask("mincss",
    "Compress down CSS files cleanly.", function() {

    // Minify CSS.
    var files = file.expand(this.data);
    file.write(this.target, grunt.helper('mincss', files));

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    log.writeln("File \"" + this.target + "\" created.");
  });

  grunt.registerHelper("mincss", function(files) {
    var cleanCSS = require("clean-css");

    // Minify and combine all CSS 
    return files ? files.map(function(filepath) {
      return cleanCSS.process(file.read(filepath));
    }).join("") : "";
  });

};
