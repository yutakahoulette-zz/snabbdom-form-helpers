var h = require('snabbdom/h').default
var card = require('creditcards/card') 
var uuid = require('uuid/v4')
var concat = require('ramda/src/concat')
var map = require('ramda/src/map')
var reduce = require('ramda/src/reduce')
var drop = require('ramda/src/drop')

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

var blockInput = function(target) {
  target.value = String(target.value).slice(0, -1)
}

var mask = function(ev, targetUpdate, cb) {
  var target = ev.target
  var value = removeSpace(target.value)
  // only allow numbers
  if(!Number(value + 1)) {
    blockInput(target)
    return 
  }
  cb && cb(ev) 
  targetUpdate(target, value)
}

var formatPhone = function(value) {
  var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
  return !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '')
}

var updatePhoneInput = function(target, value) {
  return target.value = formatPhone(value) 
}

var updateCardInput = function(target, value) {
  target.value = card.format(value)
  target.setAttribute('data-card-type', card.type(value, true))
}

var phoneMask = function(cb) { return function(ev) { return mask(ev, updatePhoneInput, cb) }}

var cardMask = function(cb) { return function(ev) { return mask(ev, updateCardInput, cb) }}

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
    on: {input: phoneMask(obj.cb)}
  , class: obj.classes ? classObj(obj.classes) : {}
  , props: props(obj.name, obj.placeholder, formatPhone(obj.value))
  })
}

var cardInput = function(obj) {
  return h('input', {
    on: {input: cardMask(obj.cb)}
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
      on: obj.cb ? {click: obj.cb} : {}
    , props: {
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

var radio = function(name, selected, cb, classes) {
  return function(option) {
    if(!option.label) throw new Error('Radio options objects require a label key')
    option.value = option.value ? option.value : option.label
    var id = uuid()
    return h('div', {class: classes ? classObj(classes) : {}}, [
        h('input', {
          on: cb ? {change: cb} : {}
        , props: {
            type: 'radio'
          , id: id
          , name: name
          , checked: selected && selected === option.value
          , value: option.value 
          }
        })
      , h('label', {attrs: {for: id}}, option.label)
    ])
  }
}

var radios = function(obj) {
  return h('div', map(radio(obj.name, obj.selected, obj.cb, obj.classes), obj.options))
}

var option = function(selected, disabled) {
  return function(opt) {
    var value = (typeof opt === 'object') ? opt.value : opt
    var label = (typeof opt === 'object') ? opt.label : opt
    return h('option', {
      props: {
        value: value
      , disabled: disabled ? disabled(value) : false 
      , selected: selected && selected === value 
      }
    }, label)
  }
}

var select = function(obj) {
  var placeholder = function(text) {
    return [h('option', {
      props: {
        disabled: true
      , value: undefined 
      , selected: true
      }
    }, text)]
  }

  return h('select', {
    on: obj.cb ? {change: obj.cb} : {}
  , class: obj.classes ? classObj(obj.classes) : {}
  , props: {name: obj.name}}
  , concat(obj.placeholder ? placeholder(obj.placeholder) : [], map(option(obj.selected, obj.disabled), obj.options)))
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


