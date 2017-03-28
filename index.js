var h = require('snabbdom/h').default
var card = require('creditcards/card') 
var uuid = require('uuid/v4')
var map = require('ramda/src/map')
var concat = require('ramda/src/concat')
var reduce = require('ramda/src/reduce')
var drop = require('ramda/src/drop')
var trim = require('ramda/src/trim')
var join = require('ramda/src/join')
var splitAt = require('ramda/src/splitAt')
var compose = require('ramda/src/compose')

var classObj = function(classes) { 
  return reduce(
    function(a, b) {a[b] = true; return a}
    , {}
    , drop(1, classes.split('.'))
  )
}

var removeSpace = function(st) {
  if(!st) return ''
  return String(st).trim().replace(/\s/g, '')
}

var formatPhone = function(num) {
  return compose(
    trim()
  , join(' ')
  , splitAt(7)
  , join(' ')
  , splitAt(3)
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
  return h('div', {class: obj.classes ? classObj(obj.classes) : {}}, [
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

var radio = function(name) {
  return function(label) {
    var id = uuid()
    return h('div', [
        h('input', {
          props: {
            type: 'radio'
          , id: id
          , name: name
          , value: label.name
          , checked: label.checked
          }
        })
      , h('label', {attrs: {for: id}}, label.name)
    ])
  }
}

var radios = function(obj) {
  return h('div', {class: obj.classes ? classObj(obj.classes) : {}}
  , map(radio(obj.name), obj.labels))
}

var option = function(selected) {
  return function(option) {
    return h('option', {
      props: {
        value: option
      , selected: selected && selected === option
      }
    }, option)
  }
}

var select = function(obj) {
  var placeholder = [h('option', {
    props: {
      disabled: 'true'
    , value: ' '
    , selected: 'true'
    }
  }, obj.placeholder || 'Select One')]

  return h('select', {props: {name: obj.name}}
  , concat(placeholder, map(option(obj.selected), obj.options)))
}

module.exports = {
  phoneInput: phoneInput 
, cardInput:  cardInput 
, checkBox: checkBox
, formatPhone: formatPhone
, formatCard: card.format
, radios: radios
, select: select
}


