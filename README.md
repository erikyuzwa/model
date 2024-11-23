# model

Because "Entity" was taken.

This is a simple JavaScript Object wrapper.

## installation

```
npm install model
```

## using

```
const Model = require('model')

// create a Model instance
// each instance generates a unique-ish id
// can initialize with an Object of attributes
const a = new Model({'name': '', 'address': '', 'city':''})

// or can initialize with an Array of attribute names
const a = new Model(['name', 'address', 'city'])

// set an attribute
a.set('name': 'Scott Pilgrim')

// get an attribute
a.get('name') // "Scott Pilgrim"

// get a list of the attributes
a.keys() // ['id', 'name', 'address', 'city']

// get the id
a.id

// register a callback for an attribute change
const handler = function (params) {
    // do something with the params
}

// register the callback on this Model instance
a.on('change', handler)

// when you update an attribute, the handler is fired!
a.set('name', 'James Bond')
```
