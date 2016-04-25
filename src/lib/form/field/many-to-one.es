import FieldAbstract from './abstract'
import Model from '../../model'

class ManyToOneField extends FieldAbstract {
  constructor (attr, conf) {
    super(attr, conf)
    this.model = conf.model
    this.actions = new Model(this.model)
  }
  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'select'
        obj.templateOptions.valueProp = this.conf.valueProp || 'id'
        obj.templateOptions.labelProp = this.conf.labelProp || 'id'
        obj.templateOptions.options = []
        return this.actions.findPopulate()
          .then((results) => {
            obj.templateOptions.options = results
            return obj
          })
          .catch((e) => {
            console.log(e)
            return obj
          })
      })
  }

  static parseData (data) {
    return { id: data }
  }

  static getData (data) {
    return data && data.id || null
  }
}

export default ManyToOneField
