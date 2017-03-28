var snabbdom = require('snabbdom')
var patch = snabbdom.init([ 
  require('snabbdom/modules/class').default, 
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/eventlisteners').default, 
])
var h = require('snabbdom/h').default
var fh = require('../index')

var container = document.getElementById('container')

var vnode = h('div', [ 
  h('label', 'Phone number')
, fh.phoneInput('phone', '1234567890', 'Phone number')
, h('label', 'Credit card')
, fh.cardInput('card', '4242424242424242', 'Credit card number')
])

patch(container, vnode)

