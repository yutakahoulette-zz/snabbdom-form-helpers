## Snabbdom form helpers

Provides helpers for the following form elements:
- checkbox (handles setting unique ID for input and label)
- credit card input (uses [creditcards package](https://www.npmjs.com/package/creditcards) to format number and set card type to `data-credit-card` attribute)
- phone number input (formats `123456780` to `123 456 7890`)
- radios (handles setting unique ID) 
- select


### checkBox

- handles setting unique ID for input and label

takes on object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the input | true
value | String | value of input when checkbox is checked | true
label | String | label text | true
checked | Boolean | whether the checkbox is checked | false
classes | String | string of class names (`'.mt-2.color-red'`) | false

``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Checkbox')
, fh.checkBox({
    name: 'anonymous'
  , value: 't'
  , label: 'Donate anonymously?'
  })
])
```

### cardInput

- uses [creditcards package](https://www.npmjs.com/package/creditcards) to format number and set card type to `data-credit-card` attribute

takes on object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the input | true
value | String | value of input | false
placeholder | String | placeholder text | true
classes | String | string of class names (`'.mt-2.color-red'`) | false

``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Credit card')
  , fh.cardInput({
      name: 'card'
    , value: '4242424242424242'
    , placeholder: 'Credit card number'
    })
])
```


### phoneInput

- simply formats a 9 digit number into three parts (formats `123456780` to `123 456 7890`)
- does not do any validation
- meant only for US phone numbers

takes on object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the input | true
value | String | value of input | false
placeholder | String | placeholder text | true
classes | String | string of class names (`'.mt-2.color-red'`) | false

``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Phone number')
  , fh.phoneInput({
      name: 'phone'
    , value: '1234567890'
    , placeholder: 'Credit card number'
    })
])
```

### radios

- handles setting unique ID for input and label

takes on object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the input | true
classes | String | string of class names (`'.mt-2.color-red'`) | false
labels | Array of strings | an input and label will be created for each of these label strings  | true
checked | String | will check an input if the checked string matches the input's value| false


``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Radios')
, fh.radios({name: 'payment-method', labels: ['check', 'credit card', 'cash']})
])




