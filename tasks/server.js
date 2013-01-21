/*
 * Grunt Task File
 * ---------------
 *
 * Task: Server
 * Description: Serve the web application.
 * Dependencies: express
 *
 */

module.exports = function(grunt) {

  var _ = grunt.util._;
  var log = grunt.log;

  grunt.registerTask("server", "Run development server.", function(target) {
    if (this.args[this.args.length-1] !== "watch") {
      this.async();
    }

    var name = this.name || "server";
    //this.requiresConfig(name);

    // Build an array of files/tasks objects
    var options = grunt.config(name);

    var protocol = "http";

    _.defaults(options, {
      favicon: "./favicon.ico",
      index: "./index.html",

      ssl: process.env.SSL || false,
      port: process.env.PORT || 8000,
      host: process.env.HOST || "127.0.0.1"
    });

    options.folders = options.folders || {};

    // Ensure folders have correct defaults
    options.folders = _.defaults(options.folders, {
      app: "./app",
      assets: "./assets",
      dist: "./dist",
      vendor: "./vendor"
    });

    options.files = options.files || {};

    // Ensure files have correct defaults
    options.files = _.defaults(options.files, {
      "app/config.js": "app/config.js"
    });

    // Run the server.
    require("./lib/server").init(grunt).run(options);

    // Fail task if errors were logged
    if (grunt.errors) { return false; }

    // Change protocol to https.
    if (options.ssl) {
      protocol = "https";
    }

    log.writeln("Listening on " + protocol + "://" + options.host + ":" +
      options.port);
  });

};
