var test = require("tape")
var fh = require('../index')

test('phoneInput', function(t)  {
  t.plan(5)
  var phone = fh.phoneInput({name: 'phone', classes: '.red.h1', value: '1234567890', placeholder: 'Phone number'})
  var data = phone.data
  var props = data.props
  t.ok(data.class.red)
  t.ok(data.class.h1)
  t.equal(props.name, 'phone')
  t.equal(props.value, '123 456 7890')
  t.equal(props.placeholder, 'Phone number')
})

test('cardInput', function(t)  {
  t.plan(6)
  var card = fh.cardInput({name: 'card', classes: '.red.h1', value: '4242424242424242', placeholder: 'Credit card number'})
  var data = card.data
  console.log(data)
  t.ok(data.class.red)
  t.ok(data.class.h1)
  t.equal(props.name, 'card')
  t.equal(props.value, '4242 4242 4242 4242')
  t.equal(props.placeholder, 'Credit card number')
  t.equal(data.attrs['data-card-type'], 'Visa')
})

