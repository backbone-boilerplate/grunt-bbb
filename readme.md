Backbone Boilerplate framework tool.

## Getting Started ##

Install this [Grunt](https://github.com/cowboy/grunt) plugin with:
`npm install -g bbb`

To test installation, run the `bbb` command.  You should see something like
this:

![screenshot](https://github.com/backbone-boilerplate/grunt-bbb/raw/assets/screenshot.png)

## Development ##

If you wish to contribute or just want to install from source, simply run the
following commands:

``` bash
# Clone the repository.
git clone git://github.com/backbone-boilerplate/grunt-bbb.git

# Change directory into it.
cd grunt-bbb

# Update all the submodules recursively.
git submodule update --init --recursive

# Allow bbb to be globally accessible.
sudo npm link
```

## Commands ##

All commands are prefixed with `bbb` in your terminal.  For example the command
`init` below would be executed like this:

``` bash
$ bbb init
```

Tasks are defined inside the grunt-bbb project, but also borrowed from other
grunt projects: [grunt-contrib](https://github.com/gruntjs/grunt-contrib) &
[grunt-jasmine-task](https://github.com/creynders/grunt-jasmine-task)

If you have problems with borrowed tasks, please file issues on the respective
projects.

### Scaffolding ###

These commands will build out files for you.

#### `init` (bbb) ####

Creates a bare boilerplate project.

#### `init:tutorial` (bbb) ####

*Run bbb init before this command*

Creates a boilerplate which contains the tutorial.

#### `init:todomvc` (bbb) ####

*Run bbb init before this command*

Creates a boilerplate which contains the TodoMVC application that utilizes
LayoutManager.

#### `init:module` (bbb) ####

*Run bbb init before this command*

Creates a new module in the `app/modules` directory.

### Maintenence ###

These commands help you maintain your project.

#### `lint` (grunt) ####

Ensures all your code conforms to JSHint.

#### `list` (bbb) ####

Shows a tree of your application's modules and dependencies.

### Build ###

These commmands help you build your application.

#### `debug` (bbb) ####

Lints all your JavaScript, compiles all your templates to JST (JavaScript
Templates), builds your application using RequireJS build tool (figures out
dependencies and concatenates all files), and then finally concatenates the
templates and application together.  This task also swaps out RequireJS for
Almond (signficantly smaller filesize AMD manager).

#### `release` (bbb) ####

Everything that debug command does, except the final tasks here are minified
CSS and minified JavaScript.

#### `clean` (grunt-contrib) ####

Removes all files inside `dist/` directory.

#### `handlebars` (grunt-contrib) ####

Compiles handlebars templates - *this requires setup*.

#### `jst` (grunt-contrib) ####

Compiles all templates as underscore template functions and outputs them to
`dist/debug/templates.js`.

#### `less` (grunt-contrib) ####

Compiles LESS stylesheets.

#### `mincss` (grunt-contrib) ####

Minifies your CSS into `dist/release/index.css`.

#### `requirejs` (bbb) ####

Builds out your application using the defaults specified into the root
`grunt.js` file.

#### `server` (bbb) ####

Will by default run with normal files perfect for development and debugging.

##### `server:debug` (bbb) #####

This command serves the same files excepts that your application is mapped to
the `dist/debug` directory. This is mostly useful for detecting issues with the
build, since files are not minified.

##### `server:release` (bbb) #####

This command will serve the same was debug except mapping to `dist/release`
instead. This setup is how your application should be deployed.

#### `styles` (bbb) ####

Parses a valid CSS file for `@imports` and concatenates them into an output
file.  Will automatically build stylus files as it encounters them.

Sample configuration:

``` javascript
styles: {
  // Output stylesheet file.
  "dist/debug/index.css": {
    // Main CSS source file, containing the @imports.
    src: "assets/css/index.css",

    // Relative path for `@imports`.
    paths: ["assets/css"],

    // Add additional stylesheets.
    additional: ["assets/css/production-fixes.css"]
  }
},
```

## License
Copyright (c) 2012 Tim Branyen (@tbranyen)  
Licensed under the MIT license.
