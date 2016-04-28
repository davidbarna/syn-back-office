/**
 * Fields that presents a selector with all available languages
 */
import FieldManyToOne from './many-to-one'
import Languages from '../../languages'

export const ALL = 'LanguageSwitchField.ALL'
var defaultValue = Languages.getDefaultId()

class LanguageSwitchField extends FieldManyToOne {

  constructor (attr, conf) {
    super(attr, conf)
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
        obj.templateOptions.labelProp = 'label'
        obj.expressionProperties = {
          'templateOptions.label': ($viewValue, $modelValue, scope) => {
            defaultValue = $modelValue
            return obj.templateOptions.label
          }
        }
        for (let opt of obj.templateOptions.options) {
          opt.label = opt.id
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
