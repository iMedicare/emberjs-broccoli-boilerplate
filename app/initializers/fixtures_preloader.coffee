initializer =
  name: 'Fixture Pre-loader'
  after: 'store'
  initialize: (container, application) ->
    store = container.lookup('store:main')

    Ember.keys(requirejs._eak_seen).filter((key) ->
      !!key.match(/^app\/models\//) and DS.Model.detect(require(key)['default'])
    ).map (key) ->
      type = require(key)['default']
      typeKey = key.match(/^app\/models\/(.*)/)[1]

      type.FIXTURES = window.ENV.FIXTURES[typeKey]
      store.pushMany typeKey, type.FIXTURES if type.FIXTURES

`export default initializer`
