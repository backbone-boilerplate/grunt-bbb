module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ["test/**/*.js"]
    },

    jshint: {
      files: ["grunt.js", "tasks/**/*.js", "test/**/*.js"],

      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globalstrict: true,
        globals: {}
      }
    },

    watch: {
      files: "<config:lint.files>",
      tasks: "default"
    }
  });

  // Load local tasks.
  grunt.loadTasks("tasks");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");

  // Default task.
  grunt.registerTask("default", ["jshint", "nodeunit"]);

};
