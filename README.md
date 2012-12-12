# scuttlebucket

Nested scuttlebutts

[![server-tests](https://travis-ci.org/dominictarr/scuttlebucket)
](https://secure.travis-ci.org/dominictarr/scuttlebucket.png?branch=master)

[![browser-support](https://ci.testling.com/dominictarr/scuttlebucket.png)
](https://ci.testling.com/dominictarr/scuttlebucket)

## Example

``` js

var Scuttlebucket = require('scuttlebucket')
var Model         = require('scuttlebutt/model')
var Chat          = require('scuttlebutt/model')
var Text          = require('r-edit')

function create() {
  return new Scuttlebucket()
    .add('meta', new Model())
    .add('chat', new Chat())
    .add('text', new Text())
}

//create two instances, and pipe them together!

var A = create(), B = create()

var as = A.createStream()
var bs = B.createStream()

as.pipe(bs).pipe(as)
```
and everything just works like magic!

## License

MIT
