Route = Ember.Route.extend
  redirect: (model) ->
    @transitionTo('users')

`export default Route`
