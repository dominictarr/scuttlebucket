var tape = require('tape')('test', function (assert) {
var Model = require('scuttlebutt/model')
var Events = require('scuttlebutt/events')

var Scuttlebucket = require('..')

function create () {
  return  new Scuttlebucket()
    .add('event',new Events())
    .add('model',new Model())
}

var A = create()
var B = create()

var as = A.createStream()
var bs = B.createStream()

as.pipe(bs).pipe(as)
var r = Math.random()
A.get('event').emit('hello', 'MESSAGE')
A.get('model').set('key', r)

as.resume()
bs.resume()

console.log(B.get('event'))
console.log(B.get('model'))

assert.deepEqual(B.get('event').history(), A.get('event').history())
assert.deepEqual(B.get('model').history(), A.get('model').history())

assert.end()
})
