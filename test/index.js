var test = require("tape")
var fh = require('../index')

test('phoneInput', function(t)  {
  t.plan(6)
  var phone = fh.phoneInput({name: 'phone', classes: '.red.h1', value: '1234567890', placeholder: 'Phone number'})
  var data = phone.data
  var props = data.props
  t.ok(data.class.red)
  t.ok(data.class.h1)
  t.equal(props.name, 'phone')
  t.equal(props.value, '123 456 7890')
  t.equal(props.placeholder, 'Phone number')
  var invalidPhone = fh.phoneInput({value: 'asdf'})
  t.equal(invalidPhone.data.props.value, '')
  t.end()
})

test('cardInput', function(t)  {
  var card = fh.cardInput({name: 'card', classes: '.red.h1', value: '4242424242424242', placeholder: 'Credit card number'})
  var data = card.data
  var props = data.props
  t.ok(data.class.red)
  t.ok(data.class.h1)
  t.equal(props.name, 'card')
  t.equal(props.value, '4242 4242 4242 4242')
  t.equal(props.placeholder, 'Credit card number')
  t.equal(data.attrs['data-card-type'], 'Visa')
  t.end()
})

test('checkBox', function(t)  {
  var check = fh.checkBox({name: 'anonymous', checked: true, classes: '.red.h1', value: 't', label: 'Donate anonymously?'})
  var input = check.children[0]
  var label = check.children[1]
  t.ok(check.data.class.red)
  t.ok(check.data.class.h1)
  t.equal(input.data.props.name, 'anonymous')
  t.equal(input.data.props.value, 't')
  t.equal(input.data.props.id, label.data.attrs.for)
  t.ok(input.data.props.checked)
  t.equal(label.text, 'Donate anonymously?')
  t.end()
})

test('radios', function(t)  {
  var radios = fh.radios({selected: 'cash', classes: '.red.h1', name: 'payment-method', options: ['check', 'credit card', 'cash']})
  var cash = radios.children[2] 
  var input = cash.children[0]
  var label = cash.children[1]
  t.ok(cash.data.class.red)
  t.ok(cash.data.class.h1)
  t.equal(radios.children.length, 3)
  t.equal(label.text, 'cash')
  t.equal(label.data.attrs.for, input.data.props.id)
  t.equal(input.data.props.name, 'payment-method')
  t.equal(input.data.props.value, 'cash')
  t.ok(input.data.props.checked)
  t.end()
})

test('select', function(t)  {
  var select = fh.select({selected: 'phone', classes: '.red.h1', placeholder: 'Contact preference', name: 'contact-preference', options: ['SMS', 'phone', 'email', 'mail']})
  var placeholder = select.children[0] 
  var phone = select.children[2] 
  t.equal(select.children.length, 5)
  t.ok(select.data.class.red)
  t.ok(select.data.class.h1)
  t.ok(phone.data.props.selected)
  t.equal(phone.data.props.value, 'phone')
  t.equal(phone.text, 'phone')
  t.ok(placeholder.data.props.disabled)
  t.equal(placeholder.text, 'Contact preference')
  var noPlaceholder = fh.select({options: ['SMS', 'phone', 'email', 'mail']})
  t.equal(noPlaceholder.children[0].text, 'SMS')
  t.end()
})

