# model

Because "Entity" was taken.

This is a simple JavaScript Object wrapper. 

## using

```
const Model = require('model')

// create a Model instance
// each instance has a unique-ish id
const a = new Model({'name': '', 'address': '', 'city':''})

// set an attribute
a.set('name': 'Scott Pilgrim')

// get an attribute
a.get('name') // "Scott Pilgrim"

// get the id
a.id

// register a callback for an attribute change
const handler = function (params) {
    // do something with the params
}

// register the callback on this Model instance
a.on('change', handler)

// somewhere else in your app...
a.set('name', 'James Bond')
```
