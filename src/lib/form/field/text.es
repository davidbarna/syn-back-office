import FieldAbstract from './abstract'

class TextField extends FieldAbstract {

  constructor (attr, conf) {
    super(attr, conf)
    this.maxLength = conf.maxlength
  }

  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.templateOptions.maxlength = this.maxLength
        return obj
      })
  }
}

export default TextField
