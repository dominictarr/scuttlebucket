
//combine multiple scuttlebutt objects into a single object
//(and replicate them via a single stream)

var Scuttlebutt = require('scuttlebutt')
var inherits    = require('util').inherits

module.exports = Scuttlebucket

inherits(Scuttlebucket, Scuttlebutt)

function Scuttlebucket (id) {
  if(!(this instanceof Scuttlebucket)) return new Scuttlebucket(id)
  Scuttlebutt.call(this, id)
}

var S = Scuttlebucket.prototype

S.get = function (name) {
  return this.parts[name]
}

S.add = function (name, obj) {
  this.parts = this.parts || {}
  this.parts[name] = obj
  var self = this
  obj.on('_update', function (update) {
    self.emit('_update', self._wrap(name, update))
  })
  //all sub components are from the same machine and will share the same timestamps.
  //that is, the timestamps should be strictly monotonically increasing.
  obj.id = this.id

  return this
}

S._wrap = function (name, update) {
  var value = update[0]
  update = update.slice()
  update[0] = [name, value]
  return update
}

S.applyUpdate = function (update) {
  update = update.slice()
  var value = update.shift()
  var name = value.shift()
  value = value.shift()
  update.unshift(value)
  this.parts[name].applyUpdate(update)
}

S.history = function (sources) {
  var h = []
  var self = this
  for(var name in this.parts) {
    this.parts[name].history(sources).forEach(function (update) {
      h.push(self._wrap(name, update))
    })
  }
  return h.sort(function (a, b) {
    return a
  })
}

