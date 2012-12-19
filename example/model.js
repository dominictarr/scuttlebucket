
var Scuttlebucket = require('../')
var Model         = require('scuttlebutt/model')
var REdit         = require('r-edit')
var SBK = true
module.exports = function () {
  if(!SBK) return new REdit()
  var m = Scuttlebucket()
    .add('meta', new Model())
    .add('text', new REdit())
  m._redit = m.get('text')
  return m
}
