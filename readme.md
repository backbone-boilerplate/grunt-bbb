Backbone Boilerplate framework tool.

## Getting Started ##

Install this [Grunt](https://github.com/cowboy/grunt) plugin with:
`npm install -g bbb`

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

### Scaffolding ###

These commands will build out files for you.

#### `init` ####

Creates a bare boilerplate project.

#### `init:tutorial` ####

*Run bbb init before this command*

Creates a boilerplate which contains the tutorial.

#### `init:todomvc` ####

*Run bbb init before this command*

Creates a boilerplate which contains the TodoMVC application that utilizes
LayoutManager.

#### `init:module` ####

*Run bbb init before this command*

Creates a new module in the `app/modules` directory.

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
dependencies and concatenates all files), and then finally concatenates the
templates and application together.  This task also swaps out RequireJS for
Almond (signficantly smaller filesize AMD manager).

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

## License
Copyright (c) 2012 Tim Branyen (@tbranyen)  
Licensed under the MIT license.
