var snabbdom = require('snabbdom')
var patch = snabbdom.init([ 
  require('snabbdom/modules/class').default, 
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default, 
])
var h = require('snabbdom/h').default
var helpers = require('../index')

var container = document.getElementById('container')

var vnode = h('div', [ 
  helpers.input('axsdf')
])

patch(container, vnode)

