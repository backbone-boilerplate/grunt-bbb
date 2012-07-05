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

  var _ = grunt.utils._;
  // Shorthand Grunt functions
  var log = grunt.log;

  grunt.registerTask("server", "Run development server.", function(prop) {
    var options;
    var props = ["server"];

    // Keep alive
    var done = this.async();

    // If a prop was passed as the argument, use that sub-property of server.
    if (prop) { props.push(prop); }

    // Defaults set for server values
    options = _.defaults(grunt.config(props) || {}, {
      favicon: "./favicon.ico",
      index: "./index.html",

      port: process.env.PORT || 8000,
      host: process.env.HOST || "127.0.0.1"
    });

    options.folders = options.folders || {};

    // Ensure folders have correct defaults
    options.folders = _.defaults(options.folders, {
      app: "./app",
      assets: "./assets",
      dist: "./dist"
    });

    options.files = options.files || {};

    // Ensure files have correct defaults
    options.files = _.defaults(options.files, {
      "app/config.js": "app/config.js"
    });

    // Run the server
    grunt.helper("server", options);

    // Fail task if errors were logged
    if (grunt.errors) { return false; }

    log.writeln("Listening on http://" + options.host + ":" + options.port);
  });

  grunt.registerHelper("server", function(options) {
    // Require libraries
    var fs = require("fs");
    var express = require("express");
    var site = express.createServer();

    // Map static folders
    Object.keys(options.folders).sort().reverse().forEach(function(key) {
      site.use("/" + key, function(req, res, next){
        express.static.send(req, res, next, {
          root: options.folders[key],
          path: req.url,
          getOnly: true,

          callback: function(err) {
            res.send(404);
          }
        });
      });
    });

    // Map static files
    if (_.isObject(options.files)) {
      Object.keys(options.files).sort().reverse().forEach(function(key) {
        site.get("/" + key, function(req, res) {
          return res.sendfile(options.files[key]);
        });
      });
    }

    // Serve favicon.ico
    site.use(express.favicon(options.favicon));

    // Ensure all routes go home, client side app..
    site.get("*", function(req, res) {
      fs.createReadStream(options.index).pipe(res);
    });

    // Actually listen
    site.listen(options.port, options.host);
  });

};
