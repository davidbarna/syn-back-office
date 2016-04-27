/**
 * Fields that presents a selector with all available languages
 */
import FieldManyToOne from './many-to-one'
import Languages from '../../languages'

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
        obj.defaultValue = Languages.getDefaultId()
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
