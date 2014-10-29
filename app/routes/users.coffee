`import Ember from 'ember'`

Route = Ember.Route.extend
  model: (model) ->
    @store.find('user')

`export default Route`
