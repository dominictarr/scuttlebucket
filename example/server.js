
var shoe     = require('shoe')
var ecstatic = require('ecstatic')
var http     = require('http')
var join     = require('path').join
var reloader = require('client-reloader')
var fs       = require('fs')

var m = require('./model')()
/*
var rs = fs.createReadStream('/tmp/r-edit-scuttlebucket'), n = 0
rs.on('error', next).on('end', next).pipe(m.createWriteStream())

function next () {
  console.log('next')
  rs.removeListener('error', next)
  rs.removeListener('end', next)

  m.createReadStream()
    .pipe(fs.createWriteStream('/tmp/r-edit-scuttlebucket'))  
}
*/
var PORT = 3000

m.on('_update', function() {

  console.log(m.toJSON())
})


shoe(reloader(function (stream) {
  console.log('connection')
  //echo server
  stream.on('data', function (data) {
      console.log('>>', data)
    })
    .pipe(
      m.createStream().on('data', function (data) {
        console.log('<<', data)
      })
    ).pipe(stream)

})).install(http.createServer(
  ecstatic(join(__dirname, 'static'))
).listen(PORT, function () {
  console.log( 'listening on', PORT)
}), '/shoe')
