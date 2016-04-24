import FieldManyToOne from './many-to-one'

class ManyToManyField extends FieldManyToOne {
  constructor (attr, conf) {
    super(attr, conf)
    this.model = conf.collection
  }
  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'multiCheckbox'
        return obj
      })
  }

  static parseData (data) {
    let result = []
    for (let id of data) {
      result.push({ id: id })
    }
    return result
  }

  static getData (data = []) {
    let ids = []
    for (let obj of data) {
      ids.push(obj.id)
    }
    return ids
  }
}

export default ManyToManyField
