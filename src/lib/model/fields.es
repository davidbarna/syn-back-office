/**
 * Model fields
 *
 * Builds field config for model forms.
 */
import _ from 'lodash'
import * as Fields from '../form/fields'
import Defaults from './defaults'
import Config from '../../lib/config'

/**
 * Key of form field properties in Model attributes meta
 * @type {String}
 */
const META_KEY = 'field'

var config = Config.getInstance()

/**
 * Form fields defaults
 * @return {Object}
 */
var formDefaults = null

class ModelFields {

  /**
   * Returns a full fields config for a model schema
   * @param  {string} model  Name of the model
   * @param  {Schema} schema Instance of Schema
   * @return {Promise} List of fields
   */
  static getFromSchema (model, schema) {
    if (!formDefaults) {
      formDefaults = _.cloneDeep(config.forms.defaults)
    }
    let fields = getFields(model, schema)
    return fields
  }
}

/**
 * Returns field to switch language
 * @param  {Defaults} defaults Config provider
 * @return {Object} Field instance
 */
var getLanguageField = function (defaults) {
  let attr = {
    model: config.app.languages.model,
    key: 'system.language'
  }
  let conf = defaults.get(attr.key, attr, META_KEY)
  let field = new Fields.LanguageSwitch(attr, conf)

  return field
}

var hasMultilanguageField = function (model, schema) {
  for (let key of Object.keys(schema)) {
    schema[key].meta = schema[key].meta || {}
    if (schema[key].meta.isTranslation) {
      return true
    }
  }
  return false
}

/**
 * Returns a full fields config for a model schema
 * @param  {string} model  Name of the model
 * @param  {Schema} schema Instance of Schema
 * @return {Promise} List of fields
 */
var getFields = function (model, schema) {
  let defaults = new Defaults(model, formDefaults)
  let configs = defaults.getAll(schema, META_KEY)
  let promises = []

  // Default language switch field is added into any form
  if (hasMultilanguageField(model, schema)) {
    promises.push(getLanguageField(defaults).getConfig())
    promises.push({ template: `` })
  }

  for (let conf of configs) {
    let attr = schema[conf.key]
    let Field = Fields.getFromAttribute(attr)
    let field = new Field(attr, conf)
    promises.push(field.getConfig())
  }

  return Promise.all(promises)
}

export default ModelFields
