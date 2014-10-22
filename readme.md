# Ember.js boilerplate using Broccoli

[![Build Status](https://travis-ci.org/iMedicare/emberjs-broccoli-boilerplate.png?branch=master)](https://travis-ci.org/iMedicare/emberjs-broccoli-boilerplate)

Read [the introductory post](http://ampersate.com/getting-started-with-broccoli-and-emberjs).

Initially used internally by us.
Feel free to fork and adapt it.
Send pull requests if something is broken or one of the features is missing.

## Development

You will need Node.js installed first.

We use `nvm` to get Node up and running.

Once set, follow the installation steps:

    $ npm install -g bower
    $ npm install -g broccoli-cli
    $ npm install -g testem
    $ npm install

Use `bower.json` to manage third-party dependencies.

### Conventions

* app - *is where the Ember app lives*
* bower.json
* Broccolifile.js - *the build tool configuration*
* config - *configuration files and environment specific settings go here*
* package.json - *node dependencies*
* public - *static files folder, put images & such here*
* readme.md - *this file*
* stylesheets - *stylesheets folder, less/css goes here*
* vendor - *external libraries, also used by bower to cache files*

Inside the `app` folder, you will find an idiomatic Ember application structure.

Use JavaScript ES6 syntax and CoffeeScript to write JavaScript.

Use Sass to write CSS. The default compiler used is the [node-sass](https://github.com/sass/node-sass) variant. If you prefer to use the latest Sass version you will need to replace `broccoli-sass` with `broccoli-ruby-sass` in the Brocfile.js and package.json.

The application has Twitter Bootstrap framework bundled. Make sure you make use
of provided widgets and UI components as much as possible.

* [Sass reference](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
* [ES6 reference](https://github.com/square/es6-module-transpiler#supported-es6-module-syntax)

## Usage

Broccoli is our build tool. To run the development server use:

    $ broccoli serve

To build a release, use:

    $ rm -rf dist
    $ BROCCOLI_ENV=production broccoli build ./dist

### Testing

We are using QUnit to write tests.
Improved Ember.js testing support is provided through [ember-qunit](https://github.com/rpflorence/ember-qunit) package.

To run the tests change the environment to `test` and run `broccoli`:

    $ BROCCOLI_ENV=test broccoli serve

Open the browser, QUnit runner should start on its own.

From command line, you can run the tests using `testem`:

    $ rm -rf ./build && BROCCOLI_ENV=test broccoli build ./build && testem ci -l phantomjs,firefox

## TODO

* Deployments
* Localization
* Improved environments support

## Thanks

* [iMedicare](http://imedicare.com) for sponsoring the initial version.
