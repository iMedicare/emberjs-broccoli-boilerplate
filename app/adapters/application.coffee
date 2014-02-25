Adapter = DS.ActiveModelAdapter.extend
  # API End-point namespace
  namespace: 'api/v1'

FixtureAdapter = DS.FixtureAdapter.extend()

if window.ENV.development
  Adapter = FixtureAdapter

`export default Adapter`
