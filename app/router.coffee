Router = Ember.Router.extend()

Router.map ->
  @resource 'users', ->
    @route 'index'

`export default Router`
