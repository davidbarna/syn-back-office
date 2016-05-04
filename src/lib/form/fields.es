/**
 * Index of available fields
 */
import FieldString from './field/string'
import FieldText from './field/text'
import FieldBoolean from './field/boolean'
import FieldMultiLang from './field/multi-lang'
import FieldManyToOne from './field/many-to-one'
import FieldManyToMany from './field/many-to-many'
import FieldLanguageSwitch from './field/language-switch'

export var String = FieldText
export var Text = FieldText
export var Boolean = FieldBoolean
export var MultiLang = FieldMultiLang
export var ManyToOne = FieldManyToOne
export var ManyToMany = FieldManyToMany
export var LanguageSwitch = FieldLanguageSwitch

/**
 * According to model attribute, it returns
 * the class of corresponding field
 * @param  {Object} attr Model attribute
 * @return {FieldAbstract} Field class
 */
export var getFromAttribute = function (attr) {
  if (attr.multiLanguage) {
    return MultiLang
  } else if (attr.type === 'boolean') {
    return FieldBoolean
  } else if (attr.type === 'text') {
    return FieldText
  } else if (attr.model) {
    return ManyToOne
  } else if (attr.collection) {
    return ManyToMany
  } else {
    return String
  }
}
