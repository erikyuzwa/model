

function Model(attributes = {}) {
  this.id = Math.random().toString(36).substr(2, 9)
  if (Array.isArray(attributes)) {
    this.attributes = Object.fromEntries(attributes.map(key => [key, '']))
  } else
    this.attributes = attributes
  
  this.changed = {}
  this.callbacks = {changed: []}
}

Model.prototype.set = function(key, value) {
  const old_value = this.attributes[key]
  this.attributes[key] = value
  this.changed[key] = {old: old_value, new: value}
  this.trigger()
}

Model.prototype.get = function(key) {
  return this.attributes[key]
}

Model.prototype.on = function(name, callback) {
  this.callbacks[name].push(callback)
}

Model.prototype.trigger = function () {
  for (let i = 0; i < this.callbacks['changed'].length; i++) {
    this.callbacks['changed'][i](this.changed)
  }
}

Model.prototype.keys = function () {
  return ['id'].concat(Object.keys(this.attributes))
}


module.exports = Model



