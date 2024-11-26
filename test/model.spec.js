const Model = require('../index')

test('empty initialization should be defined', () => {
  const foo = new Model()
  expect(foo).toBeDefined()
  expect(Object.keys(foo)).toEqual(['id'])
})

test('array initialization should be defined', () => {
  const foo = new Model(['a', 'b', 'c'])
  expect(foo).toBeDefined()
  expect(Object.keys(foo)).toEqual(['a', 'b', 'c', 'id'])
})

test('valid initialization and should not be able to set id', () => {
  const a = new Model({name: 'foo'})
  const the_id = a.id
  expect(a.id).toBeDefined()
  a.id = 'test1'
  expect(a.id).toEqual(the_id)
})

test('2 valid instances should have different ids', () => {
  const a = new Model({name: 'foo'})
  const b = new Model({name: 'foo'})
  expect(a.id).not.toEqual(b.id)
})

test('valid setter with a valid getter returns value', () => {
  const foo = new Model({name: ''})
  expect(foo.name).toBe('')
  foo.name = 'frank'
  expect(foo.name).toBe('frank')
})

test('valid setter with an invalid getter returns undefined', () => {
  const foo = new Model({name: ''})
  expect(foo.name).toBe('')
  expect(foo.address).toBe(undefined)
})

test('valid attributes returns valid keys', () => {
  const foo = new Model({name: 'frank', address: 'main street'})
  expect(Object.keys(foo)).toEqual(['name', 'address', 'id'])
})

test('valid callback is triggered with changed', () => {
  const foo = new Model(['name'])
  const handler = jest.fn()
  foo.on('changed', handler)
  foo.name = 'james'
  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler).toHaveBeenCalledWith({
    'name': {
      'old': '',
      'new': 'james'
    }
  })
})


