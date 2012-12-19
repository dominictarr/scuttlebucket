
var RText     = require('..')
var reconnect = require('reconnect')
var reloader  = require('client-reloader')

var ta = document.getElementById('ta')
var m = M = require('./model')()
var rText = (m._redit || m).wrap(ta)
m.on('_update', function (update) {
  console.log(update)
})
reconnect(reloader(function (stream) {
  stream.pipe(m.createStream()).pipe(stream)
})).connect('/shoe')

