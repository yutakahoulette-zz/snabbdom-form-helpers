var h = require('snabbdom/h').default
var R = require('ramda')
var card = require('creditcards/card') 

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

var textInput = function(name, value, placeholder, classes){
  return h('input', {
    class: classes ? classObj(classes) : {}
  , props: {
      type: 'text'
    , name: name
    , placeholder: placeholder
    , value: value || ''
    }
  })
}

var phoneInput = function(name, value, placeholder, classes) {
  return h('input', {
    on: {input: phoneMask}
  , class: classes ? classObj(classes) : {}
  , props: {
      type: 'text'
    , name: name
    , placeholder: placeholder
    , value: value ? formatPhone(value) : ''
    }
  })
}

var cardInput = function(name, value, placeholder, classes) {
  return h('input', {
    on: {input: cardMask}
  , class: classes ? classObj(classes) : {}
  , props: {
      type: 'text'
    , name: name
    , placeholder: placeholder
    , value: value ? card.format(value) : '' 
    }
  , attrs: {
      'data-card-type': value ? card.type(value, true) : ''
    }
  })
}

module.exports = {
  textInput:  textInput
, phoneInput: phoneInput 
, cardInput:  cardInput 
}

