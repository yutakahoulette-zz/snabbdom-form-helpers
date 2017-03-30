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

var cb = function(ev) { console.log(ev.target.value) }

var disabled = function(option) {
  return option === 'mail'
}

var vnode = h('div', [ 
  h('section', [
    h('label', 'Phone number')
  , fh.phoneInput({cb: cb, name: 'phone', value: '1234567890', placeholder: 'Phone number'})
  ])
, h('section', [
    h('label', 'Credit card')
  , fh.cardInput({cb: cb, name: 'card', value: '4242424242424242', placeholder: 'Credit card number'})
  ])
, h('section', [
    h('label', 'Check box')
  , fh.checkBox({cb: cb, name: 'anonymous', value: 't', label: 'Donate anonymously?'})
  ])
, h('section', [
    h('label', 'Radios')
  , fh.radios({cb: cb, selected: 'check', name: 'payment-method', options: ['check', 'credit card', 'cash']})
  ])
, h('section', [
    h('label', 'Select')
  , fh.select({cb: cb, disabled: disabled, selected: 'phone', placeholder: 'Contact preference', name: 'contact-preference', options: [
    'SMS', 'phone', 'email', 'mail']})
  ])
])

patch(container, vnode)

