import FieldAbstract from './abstract'

class BooleanField extends FieldAbstract {

  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'radio'
        obj.templateOptions.required = true
        obj.templateOptions.options = [
          {
            'name': 'Sí',
            'value': true
          },
          {
            'name': 'No',
            'value': false
          }
        ]
        return obj
      })
  }

}

export default BooleanField
