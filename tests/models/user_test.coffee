`import User from 'app/models/user'`

moduleForModel 'user', 'User model'

test 'is valid', ->
  user = @subject({full_name: 'Full Name'})

  ok(user)
  ok(user instanceof DS.Model)
  ok(user instanceof User)
  equal(user.get('full_name'), 'Full Name')
