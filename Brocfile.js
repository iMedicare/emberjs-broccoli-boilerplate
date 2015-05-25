var mergeTrees = require('broccoli-merge-trees')
,   findBowerTrees = require('broccoli-bower')
,   filterCoffeeScript = require('broccoli-coffee')
,   filterSass = require('broccoli-sass')
,   autoprefixer = require('broccoli-autoprefixer')
,   filterTemplates = require('broccoli-template')
,   uglifyJavaScript = require('broccoli-uglify-js')
,   compileES6 = require('broccoli-es6-concatenator')
,   pickFiles = require('broccoli-static-compiler')
,   concatFiles = require('broccoli-concat');

var bowerTrees = findBowerTrees();
var env = process.env.BROCCOLI_ENV || 'development';


//
// Stylesheets
//
var appCss = [];


var sassTrees = [
  'app/styles'
];
var appSass = filterSass(sassTrees, 'app.scss', 'assets/styles/app.css', {
  outputStyle: env === 'production' ? 'compressed' : 'expanded',
  sourceMap: env !== 'production'
});

appCss.push(appSass);



var testsCss = pickFiles('./vendor/qunit/', {
  srcDir: 'qunit',
  destDir: 'assets',
  files: ['qunit.css']
});
if (env === 'test') {
  appCss.push(testsCss);
}



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

  tree = autoprefixer(tree);

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
  outputFile: '/assets/scripts/app.js'
});

if (env === 'production') {
  appJs = uglifyJavaScript(appJs, {
    mangle: true,
    compress: true
  });
}


module.exports = mergeTrees([publicTree, appJs].concat(appCss));