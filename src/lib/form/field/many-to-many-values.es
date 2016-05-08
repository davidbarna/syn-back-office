import FieldManyToOne from './many-to-one'
import wrapper from '../../angular/formly/wrapper/many-to-many-values'

var relationField = null

class ManyToManyValuesField extends FieldManyToOne {
  constructor (attr, conf) {
    super(attr, conf)

    relationField = attr.meta.relationFields[0]
    this.model = conf.collection
  }
  getConfig () {
    return super.getConfig()
      .then((_obj_) => {
        let obj = {
          wrapper: wrapper.name,
          className: 'field-many-to-many-values',
          key: _obj_.key,
          templateOptions: {
            label: _obj_.templateOptions.label,
            required: _obj_.templateOptions.required
          },
          fieldGroup: []
        }

        for (let idx in _obj_.templateOptions.options) {
          obj.fieldGroup.push(
            this.getSubFieldConfig(_obj_, _obj_.templateOptions.options[idx])
          )
        }

        return obj
      })
  }

  getSubFieldConfig (parent, item) {
    return {
      key: item.id,
      type: 'input',
      templateOptions: {
        label: item['details.name']
      }
    }
  }

  static parseData (data = {}) {
    let result = []
    for (let id of Object.keys(data)) {
      if (data[id]) {
        let obj = {id: id}
        obj[relationField] = data[id]
        result.push(obj)
      }
    }
    return result
  }

  static getData (data = []) {
    let result = {}
    for (let obj of data) {
      result[obj.id] = obj[relationField]
    }
    return result
  }
}

export default ManyToManyValuesField
