var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var filterCoffeeScript = require('broccoli-coffee');
var filterLess = require('broccoli-less');
var filterTemplates = require('broccoli-template');
var uglifyJavaScript = require('broccoli-uglify-js');
var compileES6 = require('broccoli-es6-concatenator');
var pickFiles = require('broccoli-static-compiler');
var concatFiles = require('broccoli-concat');

var bowerTrees = findBowerTrees();
var env = process.env.BROCCOLI_ENV || 'development';

function preprocess(tree) {
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
var publicTree = 'public';

//
// Stylesheets
//
var appCss = null;
var cssTree = 'stylesheets';
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

appCss = mergeTrees([appCss].concat(bowerTrees), {overwrite: true});
appCss = preprocess(appCss);

appCss = concatFiles(appCss, {
  inputFiles: cssFiles,
  outputFile: '/assets/app.css'
});


//
// Application
//
var appTree = 'app';
var configTree = 'config';
var vendorTree = 'vendor';
var testsTree = 'tests';
var appAndVendorTree = null;
var appJs = null;
var inputFiles = ['app/**/*.js'];
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
var testFilesToAppend = [
  'qunit/qunit/qunit.js',
  'ember-qunit/dist/globals/main.js',
  'jquery-mockjax/jquery.mockjax.js',
  'tests/test_helper.js'
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

testsTree = pickFiles(testsTree, {
  srcDir: '/',
  destDir: 'tests'
});
testsTree = preprocess(testsTree);

appAndVendorTree = [appTree, configTree, vendorTree, publicTree];

if (env === 'test') {
  appAndVendorTree.unshift(testsTree);
  inputFiles.unshift('tests/*/*.js');
  appFilesToAppend = appFilesToAppend.concat(testFilesToAppend);
}

appAndVendorTree = mergeTrees(
  appAndVendorTree.concat(bowerTrees),
  {overwrite: true}
);

appJs = compileES6(appAndVendorTree, {
  loaderFile: 'loader-js/loader.js',
  ignoredModules: [
    'ember/resolver'
  ],
  inputFiles: inputFiles,
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

module.exports = mergeTrees([publicTree, appCss, appJs]);
