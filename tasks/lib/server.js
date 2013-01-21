"use strict";

// External libs.
var fs = require("fs");
var path = require("path");
var express = require("express");
var httpProxy = require("http-proxy");
var https = require("https");

exports.init = function(grunt) {
  var exports = {};

  var _ = grunt.util._;

  // Internal libs.
  var stylus = require("grunt-contrib-stylus").init(grunt);

  exports.run = function(options) {
    // If the server is already available use it.
    var site = options.server ? options.server() : express();

    // Allow users to override the root.
    var root = _.isString(options.root) ? options.root : "/";

    // Where to find styles.
    var prefix = options.prefix || "assets/css/";

    // Process stylus stylesheets.
    site.get(/.styl$/, function(req, res) {
      var url = req.url.split(prefix)[1];
      var file = path.join(prefix, url);

      fs.readFile(file, function(err, contents) {
        if (err) {
          return console.log("Unable to read: " + file);
        }

        stylus.compile(contents.toString(), {
          paths: [prefix, require("nib").path]
        }, function(css) {
          res.header("Content-type", "text/css");
          res.send(css);
        });
      });
    });

    // Process LESS stylesheets.
    site.get(/.less$/, function(req, res) {
      var url = req.url.split(prefix)[1] || "../.." + req.url;
      var file = path.join(prefix, url);

      fs.readFile(file, function(err, contents) {
        grunt.helper("less", contents.toString(), {
          paths: [prefix]
        }, function(css) {
          res.header("Content-type", "text/css");
          res.send(css);
        });
      });
    });

    // Map static folders.
    Object.keys(options.folders).sort().reverse().forEach(function(key) {
      site.get(root + key + "/*", function(req, res, next) {
        // Find filename.
        var filename = req.url.slice((root + key).length)
        // If there are query parameters, remove them.
        filename = filename.split("?")[0];

        res.sendfile(path.join(options.folders[key] + filename));
      });
    });

    // Map static files.
    if (_.isObject(options.files)) {
      Object.keys(options.files).sort().reverse().forEach(function(key) {
        site.get(root + key, function(req, res) {
          return res.sendfile(options.files[key]);
        });
      });
    }

    // Serve favicon.ico.
    site.use(express.favicon(options.favicon));

    /*
     * Allows the server to proxy a URL to bypass Same Origin Policies for
     * easier API testing.
     *
     * Proxies everything under `/api` out to `http://local/api`.
     * server: {
     *   proxies: {
     *     "api": {
     *       host: "host_running_api.local",
     *
     *       // Both are optional.
     *       port: 80,
     *       https: false
     *     }
     *   }
     * }
     */
    if (_.isObject(options.proxies)) {
      Object.keys(options.proxies).sort().reverse().forEach(function(key) {
        var proxy = new httpProxy.HttpProxy({
          changeOrigin: true,
          target: options.proxies[key]
        });

        site.all(root + key + "/*", function(req, res) {
          if (options.passthru) {
            req.url = req.url.slice((root + key).length);
            console.log(req.url);
          }

          proxy.proxyRequest(req, res);
        });
      });
    }
    
    // Ensure all routes go home, client side app..
    site.all("*", function(req, res) {
      fs.createReadStream(options.index).pipe(res);
    });

    // Actually listen.
    if (!options.ssl) {
      return site.listen(options.port, options.host);
    }

    var key = fs.readFileSync(__dirname + "/server/server.key");
    var cert = fs.readFileSync(__dirname + "/server/server.crt");

    if (options.ssl.key) {
      key = options.ssl.key;
    }

    if (options.ssl.cert) {
      cert = options.ssl.cert;
    }

    // Listen on non secure.
    https.createServer({
      key: key,
      cert: cert
    }, site).listen(options.port, options.host);
  };

  return exports;
};
