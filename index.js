var h = require('snabbdom/h').default
var R = require('ramda')

var input = function(name){
  return h('input', {
    props: {
      type: 'text'
    , name: name
    }
  })
}

module.exports = {
  input: input
}

