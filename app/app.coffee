`import fixtures_preloader from 'app/initializers/fixtures_preloader'`
`import Resolver from 'resolver'`

App = Ember.Application.extend
  # LOG_ACTIVE_GENERATION: true
  # LOG_MODULE_RESOLVER: true
  # LOG_TRANSITIONS: true
  # LOG_TRANSITIONS_INTERNAL: true
  # LOG_VIEW_LOOKUPS: true
  modulePrefix: 'app'
  Resolver: Resolver

if window.ENV.development
  Ember.Application.initializer(fixtures_preloader)

`export default App`
