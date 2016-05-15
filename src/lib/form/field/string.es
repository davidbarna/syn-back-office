import FieldAbstract from './abstract'

class StringField extends FieldAbstract {

  constructor (attr, conf) {
    super(attr, conf)
    this.maxLength = conf.maxlength
  }

  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.templateOptions.maxlength = this.maxLength
        if (this.conf.filters) {
          obj.watcher = {
            listener: (field, newValue, oldValue, scope, stopWatching) => {
              for (let filter of this.conf.filters) {
                newValue = filter(field.key, newValue, scope.model)
              }
              scope.model[field.key] = newValue
            }
          }
        }
        return obj
      })
  }
}

export default StringField
