require('tape')('nested scuttlebuckets', function (t) {
//can I put scuttlebuckets inside scuttlebucket?
//lets see.

var Model = require('scuttlebutt/model')

var Scuttlebucket = require('..')

function create(id) {
  return new Scuttlebucket(id)
    .add('sub', new Scuttlebucket().add('model', new Model()))
}

var A = create('thing')
var B = create('thong')

A.get('sub').get('model').set('key', 'VALUE')

t.equal(A.id, 'thing')
t.equal(A.get('sub').id, A.id)
t.equal(A.get('sub').get('model').id, A.id)



var as = A.createStream()
var bs = B.createStream()

as.pipe(bs).pipe(as)

as.resume()
bs.resume()

console.log()

t.equal(
  B.get('sub').get('model').get('key'), 
  A.get('sub').get('model').get('key')
)
t.end()
})
