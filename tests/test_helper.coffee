document.write('<script src="/testem.js"></script>')
document.write('<div id="qunit"></div><div id="qunit-fixture"></div>')
document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>')

Ember.testing = true
$.mockjaxSettings.contentType = 'text/json'

window.startApp = require('tests/helpers/start_app')['default']

Ember.keys(requirejs._eak_seen).filter((key) ->
  (/\_test/).test(key)
).forEach (moduleName) ->
  require(moduleName, null, null, true)
