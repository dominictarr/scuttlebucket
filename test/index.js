var tape = require('tape')('test', function (t) {
var Model = require('scuttlebutt/model')
var Events = require('scuttlebutt/events')

var Scuttlebucket = require('..')

function create (id) {
  return  new Scuttlebucket(id)
    .add('event',new Events())
    .add('model',new Model())
}

var A = create('AAA')
var B = create('BBB')

t.equal(A.id, 'AAA')
t.equal(B.id, 'BBB')
t.equal(A.get('event').id, A.id)
t.equal(B.get('event').id, B.id)
t.equal(A.get('model').id, A.id)
t.equal(B.get('model').id, B.id)


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

t.deepEqual(B.get('event').history(), A.get('event').history())
t.deepEqual(B.get('model').history(), A.get('model').history())

t.end()
})
