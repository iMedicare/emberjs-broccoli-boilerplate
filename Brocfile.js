
var mergeTrees              = require('broccoli-merge-trees');
var findBowerTrees          = require('broccoli-bower');
var filterCoffeeScript      = require('broccoli-coffee');
var filterSass              = require('broccoli-sass');
var filterTemplates         = require('broccoli-template');
var uglifyJavaScript        = require('broccoli-uglify-js');
var compileES6              = require('broccoli-es6-concatenator');
var pickFiles               = require('broccoli-static-compiler');
var concatFiles             = require('broccoli-concat');


var bowerTrees = findBowerTrees();
var env = process.env.BROCCOLI_ENV || 'development';


//
// Stylesheets
//
var appCss = [];


var sassTrees = [
  'stylesheets'
];

var appSass = filterSass(sassTrees, 'app.scss', '/assets/app.css', {
  outputStyle: env === 'production' ? 'compressed' : 'expanded',
  sourceMap: env !== 'production'
});

appCss.push(appSass);



//
// Static
//
var publicTree = 'public';



//
// Application
//
function preprocess(tree) {
  tree = filterTemplates(tree, {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  });
  tree = filterCoffeeScript(tree, {
    bare: true
  });
  return tree;
}

var appTree = pickFiles('app', {
  srcDir: '/',
  destDir: 'app'
});
appTree = preprocess(appTree);

var configTree = pickFiles('config', {
  srcDir: '/',
  destDir: 'config'
});
configTree = preprocess(configTree);

var testsTree = pickFiles('tests', {
  srcDir: '/',
  destDir: 'tests'
});
testsTree = preprocess(testsTree);

var vendorTree = 'vendor';

var appAndVendorTree = [appTree, configTree, vendorTree, publicTree];



// Legacy files

var appFilesToAppend = [
  'config/environment.js',
  'config/environments/' + env + '.js',
  'jquery/dist/jquery.js',
  'handlebars/handlebars.js',
  'ember/ember.js',
  'ember-data/ember-data.js',
  'ember-cli-shims/app-shims.js',
  'ember-resolver/dist/modules/ember-resolver.js'
];

var testFilesToAppend = [
  'qunit/qunit/qunit.js',
  'ember-qunit/dist/globals/main.js',
  'jquery-mockjax/jquery.mockjax.js',
  'faker/dist/faker.js',
  'tests/test_helper.js'
];

var inputFiles = ['app/**/*.js'];

if (env === 'test') {
  appAndVendorTree.unshift(testsTree);
  inputFiles.unshift('tests/**/*.js');
  appFilesToAppend = appFilesToAppend.concat(testFilesToAppend);
}

appAndVendorTree = mergeTrees(
  appAndVendorTree.concat(bowerTrees),
  {overwrite: true}
);


var appJs = null;

appJs = compileES6(appAndVendorTree, {
  loaderFile: 'loader-js/loader.js',
  ignoredModules: [
    'ember',
    'ember/resolver',
    'ember/load-initializers'
  ],
  inputFiles: inputFiles,
  legacyFilesToAppend: appFilesToAppend,
  wrapInEval: false,
  outputFile: '/assets/app.js'
});

if (env === 'production') {
  appJs = uglifyJavaScript(appJs, {
    mangle: true,
    compress: true
  });
}


module.exports = mergeTrees([publicTree, appJs].concat(appCss));