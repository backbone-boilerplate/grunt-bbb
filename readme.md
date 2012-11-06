Boilerplate Build Buddy.

**The tool for modern web application development.**

## Getting Started ##

Install with NPM:
`npm install -g bbb`

To test installation, run the `bbb` command.  You should see something like
this:

![screenshot](https://github.com/backbone-boilerplate/grunt-bbb/raw/assets/screenshot.png)

## Development ##

If you wish to contribute or just want to install from source, run the
following commands:

``` bash
# Clone the repository.
git clone git://github.com/backbone-boilerplate/grunt-bbb.git

# Change directory into it.
cd grunt-bbb

# Update all the submodules (including the nested submodules in init).
git submodule update --init --recursive

# Allow bbb to be globally accessible.
sudo npm link
```

## Commands ##

All commands are prefixed with `bbb` in your terminal.  For example the command
`init` below would be executed like this:

``` bash
bbb init
```

Multiple commands can be chained together, except for the JamJS commands which
take a command line argument.

Tasks are defined inside the grunt-bbb project and also borrowed from other
projects, such as: [grunt-contrib](https://github.com/gruntjs/grunt-contrib),
[grunt-jasmine-task](https://github.com/creynders/grunt-jasmine-task), and
[grunt-target-html](https://github.com/changer/grunt-targethtml).

If you have problems with borrowed tasks, please file issues on the respective
projects.

### Scaffolding ###

These commands will build out files for you.

#### `init` ####

Scaffolds out a bare Boilerplate project.

#### `init:module` ####

Creates a new module file in `app/modules`, creates a respective style file
in `app/styles`, and creates a respective Layout template for the module in
`app/templates`.

#### `init:tutorial` ####

Creates a boilerplate which contains the tutorial.

#### `init:todomvc` ####

Creates a boilerplate which contains the TodoMVC application that utilizes
LayoutManager.

#### `init:githubviewer` ####

Scaffolds out a Boilerplate project which contains the GitHub Viewer
application source code.

#### `init:movietrackr` ####

Scaffolds out a Boilerplate project which contains the Movie Trackr application
source code.

### Maintenence ###

These commands help you maintain your project.

#### `lint` ####

Ensures all your code conforms to JSHint.

#### `list` ####

Shows a tree of your application's modules and dependencies.

### Build ###

These commmands help you build your application.

#### `debug` ####

Lints all your JavaScript, compiles all your templates to JST (JavaScript
Templates), builds your application using RequireJS build tool (figures out
dependencies and concatenates all files), compiles all Stylus and LESS files
and concatenates all CSS files together, and then finally concatenates the
templates and application together.  This task also swaps out RequireJS for
Almond (signficantly smaller filesize RequireJS shim).

#### `release` ####

Everything that debug command does, except the final tasks here are minified
CSS and minified JavaScript.

#### `clean` ####

Removes all files inside `dist/` directory.

#### `handlebars` ####

Compiles handlebars templates - *this requires setup*.

#### `jst` ####

Compiles all templates as underscore template functions and outputs them to
`dist/debug/templates.js`.

#### `less` ####

Compiles LESS stylesheets.

#### `mincss` ####

Minifies your CSS into `dist/release/index.css`.

#### `requirejs` ####

Builds out your application using the defaults specified into the root
`grunt.js` file.

#### `server` ####

Will by default run with normal files perfect for development and debugging.

##### `server:debug` #####

This command serves the same files excepts that your application is mapped to
the `dist/debug` directory. This is mostly useful for detecting issues with the
build, since files are not minified.

##### `server:release` #####

This command will serve the same was debug except mapping to `dist/release`
instead. This setup is how your application should be deployed.

#### `styles` ####

Parses a valid CSS file for `@imports` and concatenates them into an output
file.  Will automatically build stylus files as it encounters them.

Sample configuration that has styles placed in `assets/css`:

``` javascript
styles: {
  // Output stylesheet file.
  "dist/debug/index.css": {
    // Main CSS source file, containing the @imports.
    src: "assets/css/index.css",

    // If you are using a path other than `app/styles` ensure this is updated.
    prefix: "assets/css/",

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
