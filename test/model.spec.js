const Model = require('../index')

test('default initialization should be defined', () => {
  const foo = new Model()
  expect(foo).toBeDefined()
})

test('2 valid instances should have different ids', () => {
  const a = new Model({name: 'foo'})
  const b = new Model({name: 'foo'})
  expect(a.id).not.toEqual(b.id)
})

test('valid setter with a valid getter returns value', () => {
  const foo = new Model({name: ''})
  expect(foo.get('name')).toBe('')
  foo.set('name', 'frank')
  expect(foo.get('name')).toBe('frank')
})

test('valid setter with an invalid getter returns undefined', () => {
  const foo = new Model({name: ''})
  expect(foo.get('name')).toBe('')
  expect(foo.get('address')).toBe(undefined)
})

test('valid attributes returns valid keys', () => {
  const foo = new Model({name: 'frank', address: 'main street'})
  expect(foo.keys()).toEqual(['id', 'name', 'address'])

})




