const Model = require('../index')

test('empty initialization should be defined', () => {
  const foo = new Model()
  expect(foo).toBeDefined()
  expect(foo.keys()).toEqual(['id'])
})

test('array initialization should be defined', () => {
  const foo = new Model(['a', 'b', 'c'])
  expect(foo).toBeDefined()
  expect(foo.keys()).toEqual(['id', 'a', 'b', 'c'])
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

test('valid callback is triggered with changed', () => {
  const foo = new Model(['name'])
  const handler = jest.fn()
  foo.on('changed', handler)
  foo.set('name', 'james')
  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler).toHaveBeenCalledWith({
    'name': {
      'old': '',
      'new': 'james'
    }
  })
})


