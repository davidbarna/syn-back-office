import FieldAbstract from './abstract'
import Languages from '../../languages'
import {ALL as ALL_LANGUAGES} from './language-switch'
import wrapper from '../../angular/formly/wrapper/multi-language-panel'

var languages = null

var currentLanguage = null

class MultiLangField extends FieldAbstract {

  getConfig () {
    /**
     * Stores scopes of children fields
     * @type {Object}
     */
    this.scopes = {}

    return Languages.get()
      .then((langs) => {
        languages = langs
        return super.getConfig()
      })
      .then((result) => {
        let obj = {
          wrapper: wrapper.name,
          className: 'field-multi-language',
          key: result.key,
          templateOptions: { label: result.templateOptions.label },
          fieldGroup: [],
          hideExpression: ($viewValue, $modelValue, scope) => {
            // Run expressions must be run manually because
            // in case of nested forms, expression properties are
            // not executed on parent form changes
            for (let key of Object.keys(this.scopes)) {
              for (let field of this.scopes[key].fields) {
                field.runExpressions()
              }
            }
            currentLanguage = scope.model.system && scope.model.system.language
          }
        }

        // A sub field is created for each language
        for (let idx in languages) {
          let subObj = this.getSubFieldConfig(result, languages[idx].id)
          obj.fieldGroup.push(subObj)
        }
        return obj
      })
  }

  /**
   * Returns config a sub field corresponding to given language
   * @param  {Object} parent Parent field config
   * @param  {string} languageId
   * @return {Object} Field config
   */
  getSubFieldConfig (parent, languageId) {
    return {
      key: languageId,
      type: parent.type,
      templateOptions: {
        type: 'text',
        placeholder: languageId
      },
      expressionProperties: {
        'templateOptions.disabled': ($viewValue, $modelValue, scope) => {
          this.scopes[languageId] = scope
          if (currentLanguage === ALL_LANGUAGES) {
            return false
          }
          return !(languageId === currentLanguage)
        }
      }
    }
  }
}

export default MultiLangField
