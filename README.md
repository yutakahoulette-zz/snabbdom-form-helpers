## Snabbdom form helpers

[![CircleCI](https://circleci.com/gh/yutakahoulette/snabbdom-form-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/yutakahoulette/snabbdom-form-helpers/tree/master)

#### [Demo](http://yutakahoulette.com/snabbdom-form-helpers)

`npm install snabbdom-form-helpers`

Provides helpers for the following form elements:
- checkbox (handles setting unique `id` for input and `for` attr for label)
- credit card input (uses [creditcards package](https://www.npmjs.com/package/creditcards) to format number and set card type to `data-credit-card` attribute)
- phone number input (formats `123456780` to `123 456 7890`)
- radios (handles setting unique `id` for input and `for` attr for label) 
- select

### checkBox

- handles setting unique `id` for input and `for` attr for label

takes an object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
value | String | value of input when checkbox is checked | true
label | String | label text | true
name | String | value of name property of the input | false
checked | Boolean | whether the checkbox is checked | false
classes | String | string of class names (`'.mt-2.color-red'`) | false
cb | Function | callback function that gets called on `change` event | false

``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Checkbox')
, fh.checkBox({
    name: 'anonymous',
    value: 't',
    label: 'Donate anonymously?'
  })
])
```

### cardInput

- uses [creditcards package](https://www.npmjs.com/package/creditcards) to format number and set card type to `data-credit-card` attribute

takes an object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the input | false
value | String | value of input | false
placeholder | String | placeholder text | false
classes | String | string of class names (`'.mt-2.color-red'`) | false
cb | Function | callback function that gets called on `input` event | false

``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Credit card'),
  fh.cardInput({
    name: 'card',     
    value: '4242424242424242',
    placeholder: 'Credit card number'
  })
])
```

### phoneInput

- simply formats a 10 digit number into three parts (formats `123456780` to `123 456 7890`)
- does not do any validation
- meant only for US phone numbers

takes an object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the input | false
placeholder | String | placeholder text | false
value | String | value of input | false
classes | String | string of class names (`'.mt-2.color-red'`) | false
cb | Function | callback function that gets called on `input` event | false

``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Phone number'),
  fh.phoneInput({
    name: 'phone',
    value: '1234567890',
    placeholder: 'Phone number'
  })
])
```

### radios

- handles setting unique `id` for input and `for` attr for label

takes an object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the input | true
options | Array of objects | [{label: 'cash', value: 'money'}] the value key is optional | true
selected | String | will check an input if the selected string matches the input's value| false
classes | String | string of class names (`'.mt-2.color-red'`) | false
cb | Function | callback function that gets called on `change` event | false

``` javascript
var fh = require('snabbdom-form-helpers')

h('div', [
  h('label', 'Radios'),
  fh.radios({cb, selected: 'check', name: 'payment-method', options: [
    {label: 'check'},
    {label: 'credit card', value: 'card'},
    {label: 'cash', value: 'money'}
]})
```

### select

takes an object with the following properties:

key | type | explanation | required |
--- | --- | --- | ---
name | String | value of name property of the select | false
options | Array of strings or objects | a select option will be created for each of these option strings  or objects | true
selected | String | will select an option if the selected string matches the option's value| false
placeholder | String | placeholder option | false
classes | String | string of class names (`'.mt-2.color-red'`) | false
disabled | Function | function that disables an option if the return value is truthy | false
cb | Function | callback function that gets called on `change` event | false

``` javascript
var fh = require('snabbdom-form-helpers')

var disabled = function(option) {return option ==='mail'}

h('div', [
  h('label', 'Select'),
  fh.select({
    cb, 
    disabled, 
    selected: 'phone', 
    placeholder: 'Contact preference', 
    name: 'contact-preference', 
    options: [
      'SMS', {value: 'phone', label: 'Phone number'}, 'email', 'mail'
    ]})
])
```
