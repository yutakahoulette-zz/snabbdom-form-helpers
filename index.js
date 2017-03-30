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

var updatePhoneInput = function(target, value) {
  if(value.length > 10) {
    blockInput(target)
    return 
  }
  target.value = formatPhone(value)
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
  , props: props(obj.name, obj.placeholder, obj.value && Number(obj.value) ? formatPhone(obj.value) : '')
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
      on: obj.cb ? {change: obj.cb} : {}
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

var radio = function(name, selected, cb) {
  return function(option) {
    var id = uuid()
    return h('div', [
        h('input', {
          on: cb ? {change: cb} : {}
        , props: {
            type: 'radio'
          , id: id
          , name: name
          , checked: selected && selected === option 
          , value: option 
          }
        })
      , h('label', {attrs: {for: id}}, option)
    ])
  }
}

var radios = function(obj) {
  return h('div', {class: obj.classes ? classObj(obj.classes) : {}}
  , map(radio(obj.name, obj.selected, obj.cb), obj.options))
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
  var placeholder = text => [h('option', {
    props: {
      disabled: true
    , value: undefined 
    , selected: true
    }
  }, text)]

  return h('select', {
    on: obj.cb ? {change: obj.cb} : {}
  , class: obj.classes ? classObj(obj.classes) : {}
  , props: {name: obj.name}}
  , concat(obj.placeholder ? placeholder(obj.placeholder) : [], map(option(obj.selected), obj.options)))
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


