/**
 * Model Schema
 * Service to obtain and manage schemas form API
 */
import Api from '../api'

/**
 * Meta name to recognize "translated" tables
 * @type {String}
 */
const IS_TRANS = 'isTranslation'

/**
 * Property of language in translation tables
 * @todo Should be retireve from schema
 * @type {String}
 */
const TRANS_PROP = 'language'

class ModelSchema {

  constructor () {
    this.attrs({})
  }

  /**
   * Returns/defines attribute
   * @param  {string} key
   * @param  {Object} attr
   * @return {Object|this}
   */
  attr (key, attr) {
    if (attr) {
      this._attributes[key] = attr
      return this
    }
    return this._attributes[key]
  }

  /**
   * Returns/defines attributes
   * @param  {Object} attrs
   * @return {array|this}
   */
  attrs (attrs) {
    if (attrs) {
      this._attributes = attrs
      return this
    }
    return this._attributes
  }

  /**
   * Returns attributes keys
   * @return {array}
   */
  keys () {
    return Object.keys(this._attributes)
  }

  /**
   * Returns translation keys.
   * They are keys retrieved from remove translation table
   * @return {array}
   */
  translationKeys () {
    let keys = []
    this.keys().forEach((key) => {
      if (this.attr(key).multiLanguage) {
        keys.push(key)
      }
    })
    return keys
  }

  /**
   * Retrieves the schema from api
   * Schema is automatically extended with translation table
   * @param  {string} model
   * @return {Promise}
   */
  static get (model) {
    var attr = null
    return getSchema(model)
      .then((schema) => {
        attr = getTranslationAttr(schema)
        if (attr) return mergeSchema(schema, model, attr.key, attr.collection)
        else return schema
      })
  }

  /**
   * Says if given attr is a trnslation table reference
   * @param  {Object}  attr
   * @return {Boolean}
   */
  static isTranslation (attr) {
    let meta = attr.meta || {}
    return meta.isTranslation
  }
}

/**
 * Returns translation table reference attribute
 * @param  {ModelSchema} schema
 * @return {Object} Schema attribute
 */
var getTranslationAttr = (schema) => {
  var attrs = schema.attrs()
  var keys = schema.keys()
  var attr = null
  for (let key of keys) {
    attr = attrs[key]
    if (attr.meta && attr.meta[IS_TRANS]) {
      return { key: key, collection: attr.collection }
    }
  }
  return null
}

/**
 * Merges a schema with another one
 * @param  {ModelSchema} schema
 * @param  {string} originModel Name of extended model
 * @param  {string} modelKey    Key in extended model
 * @param  {string} model       Model to extend from
 * @return {Object}
 */
var mergeSchema = (schema, originModel, modelKey, model) => {
  let originAttr = schema.attr(modelKey)
  let multiLanguage = !!originAttr.meta[IS_TRANS]

  // As schema is extend, origin field nos needed in forms
  originAttr.meta = originAttr.meta || {}
  originAttr.meta.field = originAttr.meta.field || {}
  originAttr.meta.field.discard = true

  return getSchema(model)
    .then((newSchema) => {
      let keys = newSchema.keys()
      for (let key of keys) {
        let newAttr = newSchema.attr(key)

        // Details' relation attr is discarded
        if (newAttr.model === originModel) {
          continue
        }

        newAttr.sourceProperty = modelKey
        newAttr.sourceRef = 'id'
        newAttr.sourceKey = key
        if (multiLanguage) {
          newAttr.multiLanguage = multiLanguage
          newAttr.sourceRef = TRANS_PROP
        }
        schema.attr(modelKey + '.' + key, newAttr)
      }
      return schema
    })
}

/**
 * Retrieves schema info from API
 * @param  {string} model
 * @return {Promise}
 */
var getSchema = (model) => {
  return Api.schema(model)
    .then((attributes) => {
      var schema = new ModelSchema()
      for (let key of Object.keys(attributes)) {
        attributes[key].key = key
        schema.attr(key, attributes[key])
      }
      return schema
    })
}

export default ModelSchema
