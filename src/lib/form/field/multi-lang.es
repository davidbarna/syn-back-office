import FieldAbstract from './abstract'
import * as Fields from '../fields'
import Languages from '../../languages'
import { ALL as ALL_LANGUAGES } from './language-switch'
import wrapper from '../../angular/formly/wrapper/multi-language-panel'

var languages = null

var currentLanguage = null

class MultiLangField extends FieldAbstract {

  constructor (attr, conf) {
    super(attr, conf)
    attr.multiLanguage = false
    let SubField = Fields.getFromAttribute(attr)
    this.subField = new SubField(attr, conf)
  }

  getConfig () {
    /**
     * Stores scopes of children fields
     * @type {Object}
     */
    this.scopes = {}

    return Languages.get()
      .then((langs) => {
        languages = langs
        return this.subField.getConfig()
      })
      .then((subFieldConfig) => {
        this.subFieldConfig = subFieldConfig
        return super.getConfig()
      })
      .then((result) => {
        var originHideExpression = result.hideExpression
        let obj = {
          wrapper: wrapper.name,
          className: 'field-multi-language',
          key: result.key,
          templateOptions: {
            label: result.templateOptions.label,
            required: result.templateOptions.required
          },
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

            return originHideExpression($viewValue, $modelValue, scope)
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
      type: this.subFieldConfig.type,
      data: this.subFieldConfig.data,
      templateOptions: {
        placeholder: languageId
      },
      validation: parent.validation,
      watcher: this.subFieldConfig.watcher,
      expressionProperties: {
        'validation.show': parent.expressionProperties['validation.show'],
        'templateOptions.disabled': ($viewValue, $modelValue, scope) => {
          this.scopes[languageId] = scope
          return !isActiveLanguage(languageId)
        },
        'templateOptions.required': ($viewValue, $modelValue, scope) => {
          return isActiveLanguage(languageId) && parent.templateOptions.required
        }
      }
    }
  }
}

/**
 * Tells is given language is active for edition
 * @param  {string}  languageId
 * @return {Boolean}
 */
var isActiveLanguage = function (languageId) {
  if (currentLanguage === ALL_LANGUAGES) {
    return true
  }
  return (languageId === currentLanguage)
}

export default MultiLangField
