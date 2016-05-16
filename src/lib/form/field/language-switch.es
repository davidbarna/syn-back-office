/**
 * Fields that presents a selector with all available languages
 */
import FieldManyToOne from './many-to-one'
import Languages from '../../languages'

export const ALL = 'LanguageSwitchField.ALL'
var defaultValue = null

class LanguageSwitchField extends FieldManyToOne {

  constructor (attr, conf) {
    super(attr, conf)
    defaultValue = defaultValue || Languages.getDefaultId()
    this.model = conf.collection
  }

  /**
   * Returns field config
   * Default language is set
   * @return {Object}
   */
  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'select'
        obj.defaultValue = defaultValue
        obj.className = 'field-language-switch'
        obj.templateOptions.labelProp = 'label'
        obj.templateOptions.label = 'Idioma de edición'
        obj.expressionProperties = {
          'templateOptions.label': ($viewValue, $modelValue, scope) => {
            defaultValue = $modelValue
            return obj.templateOptions.label
          }
        }

        for (let opt of obj.templateOptions.options) {
          opt.label = opt.name
        }
        obj.templateOptions.options.unshift({ id: ALL, label: '*' })

        return obj
      })
  }

  /**
   * Avoids choosen language to be sent to API
   * @param  {string} value
   * @return {undefined}
   */
  static parseData (value) {
    return undefined
  }
}

export default LanguageSwitchField
