
// these are reserved_keys which shouldn't be returned in Object.keys (?)
const reserved_keys = ['changed', 'callbacks', 'on', 'trigger']

// these are reserved_attributes which shouldn't be overwritten
const reserved_attributes = [
  'id',
  ...reserved_keys
]

const proxyOptions = {
  get: (obj, attribute) => {
    return Reflect.get(obj, attribute)
  },

  set: (obj, attribute, value) => {

    if (reserved_attributes.includes(attribute)) {
      // console.log(`Cannot delete '${attribute}': reserved attribute`)
      // failure to set a reserved attribute
      return false
    }
    
    const old_value = obj[attribute]
    obj[attribute] = value
    obj.changed[attribute] = {old: old_value, new: value}

    obj.trigger('changed')

    return true
  },

  deleteProperty: (obj, attribute) => {
    if (reserved_attributes.includes(attribute)) {
      // console.log(`Cannot delete '${attribute}': reserved attribute`)
      // failure
      return false

    } else if (attribute in obj) {
      delete obj[attribute]
      // console.log(`Deleting property '${attribute}'`)
      // success
      return true
    }
    // unable to find the given attribute
    console.log(`Cannot delete '${attribute}': attribute not found`)
    return false
  },

  ownKeys: (obj) => {
    // Only return keys that are not in the reserved_keys Array
    return Reflect.ownKeys(obj).filter(key => !reserved_keys.includes(key));
  },
}

// We're making use of the JavaScript Proxy pattern to generate
// a new Object given a list or Array of attributes
// each new Model generated also has a unique-ish id
class Model {
  constructor(attributes = {}) {
    let attrs
    if (Array.isArray(attributes)) {
      attrs = Object.fromEntries(attributes.map(key => [key, '']))
    } else {
      attrs = attributes
    }

    attrs = {
      ...attrs,
      id: Math.random().toString(36).substr(2, 11),
      changed: {},
      callbacks: { changed: []},
      on: function (name, callback) {
        this.callbacks[name].push(callback)
      },
      trigger: function (name) {
        for (let i = 0; i < this.callbacks[name]?.length; i++) {
          this.callbacks[name][i](this.changed)
        }
      }
    }

    return new Proxy(attrs, proxyOptions)
  }
}

module.exports = Model
