## Snabbdom form helpers

Provides helpers for the following form elements:
- checkbox (handles setting unique ID)
- credit card input (uses [creditcards package](https://www.npmjs.com/package/creditcards) to format number and set card type to `data-credit-card` attribute)
- phone number input (formats `123456780` to `123 456 7890`)
- radios (handles setting unique ID) 
- select


### checkbox



takes on object with the following properties:

- name:    String  - value of name property of the input 
- value:   String  - value of input when checkbox is checked
- label:   String  - label text 
- checked: Boolean - whether the checkbox is checked

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

