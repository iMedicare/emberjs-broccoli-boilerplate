App = undefined
module 'Users Page',
  setup: ->
    App = startApp()
    $.mockjax
      url: '/api/v1/users'
      responseText: 
        users: [
          {id: 'USR_1', full_name: 'User #1'}
          {id: 'USR_2', full_name: 'User #2'}
        ]

  teardown: ->
    $.mockjaxClear();
    Ember.run App, 'destroy'

test 'index renders available users', ->
  visit('/users/index').then ->
    listing = find('.users-list li')

    equal listing.length, 2
    equal $(listing[0]).text().trim(), 'User #1'
    equal $(listing[1]).text().trim(), 'User #2'
