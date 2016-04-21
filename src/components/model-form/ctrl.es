class FormCtrl {
  constructor (scope) {
    this.scope = scope
  }
  init () {
    this.model = {
      'name': {
        'first': 'Gandalf',
        'last': 'The Gray'
      },
      'email': 'gandalf@example.com',
      'username': 'yoiamgandalf'
    }
    this.fields = [
      {
        'key': 'first',
        'type': 'input',
        'model': {
          'first': 'Gandalf',
          'last': 'The Gray'
        },
        'templateOptions': {
          'label': 'First Name'
        }
      },
      {
        'key': 'last',
        'type': 'input',
        'model': {
          'first': 'Gandalf',
          'last': 'The Gray'
        },
        'templateOptions': {
          'label': 'Last Name'
        }
      },
      {
        'key': 'email',
        'type': 'input',
        'templateOptions': {
          'label': 'Email Address',
          'type': 'email'
        }
      }
    ]

    this.scope.vm = {
      onSubmit: () => {
        console.log('SUBMIT', this.scope.vm.form)
      },
      model: this.model,
      fields: this.fields
    }
  }
}

export default FormCtrl
