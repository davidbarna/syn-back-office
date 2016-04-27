import FieldAbstract from './abstract'
import Languages from '../../languages'
import wrapper from '../../angular/formly/wrapper/multi-language-panel'

var languages = null

class MultiLangField extends FieldAbstract {

  getConfig () {
    return Languages.get()
      .then((langs) => {
        languages = langs
        return super.getConfig()
      })
      .then((result) => {
        let obj = {
          wrapper: wrapper.name,
          key: result.key,
          templateOptions: { label: result.templateOptions.label },
          fieldGroup: []
        }

        for (let idx in languages) {
          let subObj = {
            key: languages[idx].id,
            type: result.type,
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
