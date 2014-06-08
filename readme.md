# Ember.js boilerplate using Broccoli

[![Build Status](https://travis-ci.org/iMedicare/emberjs-broccoli-boilerplate.png?branch=master)](https://travis-ci.org/iMedicare/emberjs-broccoli-boilerplate)

Read [the introductory post](http://ampersate.com/getting-started-with-broccoli-and-emberjs).

Initially used internally by us at [iMedicare](http://imedicare.com).
Feel free to fork and adapt it.
Send pull requests if something is broken or something is missing.

## Development

You will need Node.js installed first.

You can use `nvm` to get Node up and running.

Once set, install `ember-cli` globally and the rest of the dependencies.

    $ npm install -g ember-cli
    $ npm install -g bower
    $ npm install
    $ bower install -F

Use `bower.json` to manage third-party dependencies.

### Conventions

Inside the `app` folder, you will find an idiomatic Ember application structure.

You can use JavaScript ES6 syntax and CoffeeScript to write JavaScript.

You can use Less to write CSS.
The application has Bootstrap CSS framework bundled. Feel free to use it.

* [Less reference](http://lesscss.org/functions/)
* [ES6 reference](https://github.com/square/es6-module-transpiler#supported-es6-module-syntax)

## Usage

[Ember CLI](https://github.com/stefanpenner/ember-cli) is our build tool
(which still uses Broccoli). To run the development server use:

    $ ember serve

To build a release, use:

    $ BROCCOLI_ENV=production ember build

This will create a build in the `./dist` folder.

### Testing

We are using QUnit to write tests.
Improved Ember.js testing support is provided through the
[ember-qunit](https://github.com/rpflorence/ember-qunit) package.

To run the tests change the environment to `test` and run:

    $ BROCCOLI_ENV=test ember serve

Open the browser, QUnit runner should start on its own.

From command line, you can run the:

    $ BROCCOLI_ENV=test ember test

## TODO

* Deployments
* Localization
* Improved environments support

## Thanks

* [iMedicare](http://imedicare.com) for sponsoring the initial version.
