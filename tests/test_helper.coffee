document.write('<link href="/assets/qunit.css" rel="stylesheet">')
document.write('<script src="/testem.js"></script>')
document.write('<div id="qunit"></div><div id="qunit-fixture"></div>')
document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>')

Ember.testing = true
$.mockjaxSettings.contentType = 'text/json'

resolver = require('ember/resolver')['default'].create()
resolver.namespace = {modulePrefix: 'app'}
emq.setResolver(resolver)
emq.globalize()

window.startApp = require('tests/helpers/start_app')['default']

Ember.keys(requirejs._eak_seen).filter((key) ->
  (/\_test/).test(key)
).forEach (moduleName) ->
  require(moduleName, null, null, true)
