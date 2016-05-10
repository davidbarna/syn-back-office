/**
 * Index of available fields
 */
import FieldString from './field/string'
import FieldText from './field/text'
import FieldSelect from './field/select'
import FieldBoolean from './field/boolean'
import FieldMultiLang from './field/multi-lang'
import FieldManyToOne from './field/many-to-one'
import FieldGallery from './field/gallery'
import FieldGallerySingle from './field/gallery-single'
import FieldManyToMany from './field/many-to-many'
import FieldManyToManyValues from './field/many-to-many-values'
import FieldLanguageSwitch from './field/language-switch'
import FieldFileUpload from './field/file-upload'

export var String = FieldString
export var Text = FieldText
export var Select = FieldSelect
export var Boolean = FieldBoolean
export var MultiLang = FieldMultiLang
export var ManyToOne = FieldManyToOne
export var Gallery = FieldGallery
export var GallerySingle = FieldGallerySingle
export var ManyToMany = FieldManyToMany
export var ManyToManyValues = FieldManyToManyValues
export var LanguageSwitch = FieldLanguageSwitch
export var FileUpload = FieldFileUpload

/**
 * According to model attribute, it returns
 * the class of corresponding field
 * @param  {Object} attr Model attribute
 * @return {FieldAbstract} Field class
 */
export var getFromAttribute = function (attr) {
  attr.meta = attr.meta || {}
  attr.meta.field = attr.meta.field || {}
  if (attr.multiLanguage) {
    return MultiLang
  } else if (attr.meta.field.fieldType === 'select') {
    return Select
  } else if (attr.collection === 'mediafile') {
    return Gallery
  } else if (attr.model === 'mediafile') {
    return GallerySingle
  } else if (attr.meta.relationFields) {
    return ManyToManyValues
  } else if (attr.meta.isFile === true) {
    return FileUpload
  } else if (attr.type === 'boolean') {
    return FieldBoolean
  } else if (attr.type === 'text') {
    return Text
  } else if (attr.model) {
    return ManyToOne
  } else if (attr.collection) {
    return ManyToMany
  } else {
    return String
  }
}
