/**
 * Index of available fields
 */
import FieldText from './field/text'
import FieldMultiLang from './field/multi-lang'
import FieldManyToOne from './field/many-to-one'
import FieldManyToMany from './field/many-to-many'

export var Text = FieldText
export var MultiLang = FieldMultiLang
export var ManyToOne = FieldManyToOne
export var ManyToMany = FieldManyToMany

/**
 * According to model attribute, it returns
 * the class of corresponding field
 * @param  {Object} attr Model attribute
 * @return {FieldAbstract} Field class
 */
export var getFromAttribute = function (attr) {
  if (attr.multiLanguage) {
    return MultiLang
  } else if (attr.model) {
    return ManyToOne
  } else if (attr.collection) {
    return ManyToMany
  } else {
    return Text
  }
}
