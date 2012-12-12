require('tape')('nested scuttlebuckets', function (t) {
//can I put scuttlebuckets inside scuttlebucket?
//lets see.

var Model = require('scuttlebutt/model')

var Scuttlebucket = require('..')

function create() {
  return new Scuttlebucket()
    .add('sub', new Scuttlebucket().add('model', new Model()))
}

var A = create()
var B = create()

A.get('sub').get('model').set('key', 'VALUE')

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
