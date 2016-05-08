import FieldAbstract from './abstract'

class TextField extends FieldAbstract {

  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'select'
        obj.templateOptions.valueProp = this.conf.valueProp || 'id'
        obj.templateOptions.labelProp = this.conf.labelProp || 'id'
        obj.templateOptions.options = this.conf.options
        return obj
      })
  }
}

export default TextField
