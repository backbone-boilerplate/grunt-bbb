/*
 * backbone-boilerplate
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt, init, done) { with(grunt) {

  var prompts = task.helper("prompt_for_obj");

  underscore.extend(prompts, {
    bbb_namespace: {
      message: 'Project namespace',
      validator: /^[\w\-\.]+$/
    }
  });

  task.helper("prompt", {}, [
    // Prompt for these values.
    task.helper("prompt_for", "bbb_namespace")
  ], function(err, props) {
    props.namespace = props["bbb_namespace"];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process). files.
    init.copyAndProcess(files, props);

    // All done!
    done();
  });

}};
