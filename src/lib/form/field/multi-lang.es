import FieldAbstract from './abstract'
import wrapper from '../../angular/formly/wrapper/multi-language-panel'

var languages = [
  { id: 'en_US' },
  { id: 'es_ES' },
  { id: 'fr_FR' }
]

class MultiLangField extends FieldAbstract {

  getConfig () {
    return super.getConfig()
      .then((_obj) => {
        let obj = {
          wrapper: wrapper.name,
          key: _obj.key,
          templateOptions: { label: _obj.templateOptions.label },
          fieldGroup: []
        }

        for (let idx in languages) {
          let subObj = {
            key: languages[idx].id,
            type: _obj.type,
            templateOptions: {
              type: 'text',
              placeholder: languages[idx].id
            }
          }
          obj.fieldGroup.push(subObj)
        }
        return obj
      })
  }
}

export default MultiLangField
