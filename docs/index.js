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
  h('section', [
    h('label', 'Phone number')
  , fh.phoneInput({name: 'phone', value: '1234567890', placeholder: 'Phone number'})
  ])
, h('section', [
    h('label', 'Credit card')
  , fh.cardInput({name: 'card', value: '4242424242424242', placeholder: 'Credit card number'})
  ])
, h('section', [
    h('label', 'Check box')
  , fh.checkBox({name: 'anonymous', value: 't', label: 'Donate anonymously?'})
  ])
, h('section', [
    h('label', 'Radios')
  , fh.radios({selected: 'check', name: 'payment-method', options: ['check', 'credit card', 'cash']})
  ])
, h('section', [
    h('label', 'Select')
  , fh.select({selected: 'phone', placeholder: 'Contact preference', name: 'contact-preference', options: [
    'SMS', 'phone', 'email', 'mail']})
  ])
])

patch(container, vnode)

