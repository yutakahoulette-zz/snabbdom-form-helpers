var h = require('snabbdom/h').default
var R = require('ramda')
var card = require('creditcards/card') 
var uuid = require('uuid/v4')

// helper functions

var classObj = function(classes) { 
  return R.reduce(
    function(a, b) {a[b] = true; return a}
    , {}
    , R.drop(1, classes.split('.'))
  )
}

var removeSpace = function(st) {
  if(!st) return ''
  return String(st).trim().replace(/\s/g, '')
}

var formatPhone = function(num) {
  return R.compose(
    R.trim()
  , R.join(' ')
  , R.splitAt(7)
  , R.join(' ')
  , R.splitAt(3)
  )(num)
}

var blockNonNumeric = function(target) {
  target.value = String(target.value).slice(0, -1)
}

var mask = function(ev, targetUpdate) {
  var target = ev.target
  var value = removeSpace(target.value)
  // only allow numbers
  if(!Number(value)) {
    blockNonNumeric(target)
    return 
  }
  targetUpdate(target, value)
}

var updatePhoneInput = function(target, value) {
  target.value = formatPhone(value)
}

var updateCardInput = function(target, value) {
  target.value = card.format(value)
  target.setAttribute('data-card-type', card.type(value, true))
}

var phoneMask = function(ev) { return mask(ev, updatePhoneInput) }

var cardMask = function(ev) { return mask(ev, updateCardInput) }

// input functions

var props = function(name, placeholder, value) {
  return { 
    type: 'text'
  , name: name
  , placeholder: placeholder
  , value: value || ''
  }
}

var phoneInput = function(obj) {
  return h('input', {
    on: {input: phoneMask}
  , class: obj.classes ? classObj(obj.classes) : {}
  , props: props(obj.name, obj.placeholder, obj.value ? formatPhone(obj.value) : '')
  })
}

var cardInput = function(obj) {
  return h('input', {
    on: {input: cardMask}
  , class: obj.classes ? classObj(obj.classes) : {}
  , props: props(obj.name, obj.placeholder, obj.value ? card.format(obj.value) : '')
  , attrs: {
      'data-card-type': obj.value ? card.type(obj.value, true) : ''
    }
  })
}


var checkBox = function(obj){
  var id = uuid()
  return h('div' , [ 
    h('input', {
      props: {
        type: 'checkbox'
      , id: id
      , value: obj.value
      , name: obj.name
      , checked: obj.checked
      }
    })
  , h('label', { attrs: {for: id}}, obj.label ? obj.label : obj.value)
  ])
}

module.exports = {
  phoneInput: phoneInput 
, cardInput:  cardInput 
, checkBox: checkBox
}

