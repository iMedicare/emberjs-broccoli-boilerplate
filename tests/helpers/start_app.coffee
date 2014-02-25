`import Application from 'app/app'`
`import Router from 'app/router'`

startApp = (attrs) ->
  App = undefined
  attributes = Ember.merge(
    rootElement: "#ember-testing"
    LOG_ACTIVE_GENERATION: false
    LOG_VIEW_LOOKUPS: false
  , attrs)

  Router.reopen {location: 'none'}

  Ember.run.join ->
    App = Application.create(attributes)
    App.setupForTesting()
    App.injectTestHelpers()

  App.reset()
  App

`export default startApp`
