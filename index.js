

function Model(attributes = {}) {
  this.id = Math.random().toString(36).substr(2, 9)
  this.attributes = attributes
  this.changed = {}
  this.listeners = []
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

Model.prototype.on = function(func) {
  this.listeners.push(func)
}

Model.prototype.trigger = function () {
  for (let i = 0; i < this.listeners.length; i++) {
    this.listeners[i].call(this.changed)
  }
}

Model.prototype.keys = function () {
  return ['id'].concat(Object.keys(this.attributes))
}



module.exports = Model



