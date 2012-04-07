/*
 * Grunt Task File
 * ---------------
 *
 * Task: templatize
 * Description: Compile javascript templates with any templating enginej
 * Dependencies: None
 *
 */

module.exports = function(grunt) {

  var log = grunt.log;
  var file = grunt.file;

  grunt.registerMultiTask("templatize",
    "Compile javascript templates with any templating enginej", function() {

    var data = this.data;
    var compiler = data.method;
    var params = data.params||[];
    var namespace = data.namespace || "JST";
    var wrapper = data.wrapper||function(text) { return text; };

    // iterate over files to compile
    Object.keys(data.files).forEach(function(dest) {

      // initialize template namespace
      var output = ["this['"+namespace+"'] = this['"+namespace+"'] || {};"];

      // add supporting library (if required)
      if(data.library) output.push(file.read(data.library));

      // grab src file to compile
      var files = file.expand(data.files[dest]);

      // iterate templates
      files.forEach(function(filepath) {
        // prepare arguments to pass to compiler
        var args = params.slice();
        args.unshift(file.read(filepath));
        // call compiler function and save to string
        output.push("this['"+namespace+"']['"+filepath+"'] = "+wrapper(compiler.apply(null,args))+";");
      });

      // write output to destination
      file.write(dest,output.join("\n"));
    });

    // fail task if errors were logged.
    if (grunt.errors) { return false; }

    // otherwise, print a success message.
    log.writeln("Javascript templatizing complete.");

  });

};
