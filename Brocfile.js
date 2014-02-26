module.exports = function (broccoli) {
  var filterCoffeeScript = require('broccoli-coffee');
  var filterLess = require('broccoli-less');
  var filterTemplates = require('broccoli-template');
  var uglifyJavaScript = require('broccoli-uglify-js');
  var compileES6 = require('broccoli-es6-concatenator');
  var pickFiles = require('broccoli-static-compiler');
  var concatFiles = require('broccoli-concat');
  var env = process.env.BROCCOLI_ENV || 'development';

  function preprocess (tree) {
    tree = filterTemplates(tree, {
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    });
    tree = filterCoffeeScript(tree, {
      bare: true
    });
    tree = filterLess(tree, {
      compress: env === 'production',
      paths: ['.', './stylesheets', './vendor/bootstrap/less']
    });
    return tree;
  }

  //
  // Static
  //
  var publicTree = broccoli.makeTree('public');

  //
  // Application
  //
  var appTree = broccoli.makeTree('app');
  var configTree = broccoli.makeTree('config');
  var vendorTree = broccoli.makeTree('vendor');
  var appAndVendorTree = null;
  var appJs = null;
  var appFilesToAppend = [
    'jquery.js',
    'handlebars.js',
    'ember.js',
    'ember-data.js',
    'ember-resolver.js',
    'bootstrap.js',
    'config/environment.js',
    'config/environments/' + env + '.js'
  ];

  configTree = pickFiles(configTree, {
    srcDir: '/',
    destDir: 'config'
  });
  configTree = preprocess(configTree);

  appTree = pickFiles(appTree, {
    srcDir: '/',
    destDir: 'app'
  });
  appTree = preprocess(appTree);

  appAndVendorTree = [appTree, configTree, vendorTree].concat(
    broccoli.bowerTrees());
  appAndVendorTree = new broccoli.MergedTree(appAndVendorTree);

  appJs = compileES6(appAndVendorTree, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'app/**/*.js'
    ],
    legacyFilesToAppend: appFilesToAppend,
    wrapInEval: env !== 'production',
    outputFile: '/assets/app.js'
  });

  if (env === 'production') {
    appJs = uglifyJavaScript(appJs, {
      mangle: true,
      compress: true
    });
  }

  //
  // Stylesheets
  //
  var appCss = null;
  var cssTree = broccoli.makeTree('stylesheets');
  var cssFiles = [
    'qunit.css',
    'assets/app.css'
  ];

  appCss = pickFiles(cssTree, {
    srcDir: '/',
    files: ['app.less'],
    destDir: 'assets'
  });

  if (env !== 'test') {
    cssFiles.shift();
  }

  appCss = new broccoli.MergedTree([appCss].concat(broccoli.bowerTrees()));
  appCss = preprocess(appCss);

  appCss = concatFiles(appCss, {
    inputFiles: cssFiles,
    outputFile: '/assets/app.css'
  });

  //
  // Tests
  //
  var testsTree = broccoli.makeTree('tests');
  var testsJs = null;
  var testAppFilesToAppend = appFilesToAppend.concat([
    'qunit/qunit/qunit.js',
    'jquery-mockjax/jquery.mockjax.js',
    'tests/test_helper.js'
  ]);

  testsTree = pickFiles(testsTree, {
    srcDir: '/',
    files: ['*.coffee', '**/*.coffee'],
    destDir: 'tests'
  });
  testsTree = preprocess(testsTree);

  testsJs = new broccoli.MergedTree(
    [appAndVendorTree, testsTree].concat(broccoli.bowerTrees()));
  testsJs = compileES6(testsJs, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'app/**/*.js',
      'tests/*/*.js'
    ],
    legacyFilesToAppend: testAppFilesToAppend,
    outputFile: '/assets/app.js'
  });

  // If we are testing, return the compiled file with testing sources.
  if (env === 'test') {
    appJs = testsJs;
  }

  return [publicTree, appJs, appCss];

};
