App = undefined
module 'Homepage',
  setup: ->
    App = startApp()

  teardown: ->
    $.mockjaxClear();
    Ember.run App, 'destroy'

test 'index redirects to users page', ->
  $.mockjax
    url: '/api/v1/users'
    responseText:
      users: []

  visit('/').then ->
    title = find('a.navbar-brand')

    equal title.text(), 'Broccoli'
    equal currentURL(), '/users/index'
