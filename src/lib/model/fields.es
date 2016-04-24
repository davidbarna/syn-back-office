/**
 * Model fields
 *
 * Builds field config for model forms.
 */
import * as Fields from '../form/fields'
import _ from 'lodash'
import Config from '../../lib/config'

/**
 * Form fields defaults
 * @return {Object}
 */
var defaults = Config.getInstance().forms.defaults
defaults.models = defaults.models || {}
defaults.fields = defaults.fields || {}

class ModelFields {

  /**
   * Returns a full fields config for a model schema
   * @param  {string} model  Name of the model
   * @param  {Schema} schema Instance of Schema
   * @return {Promise} List of fields
   */
  static getFromSchema (model, schema) {
    defaults.models[model] = defaults.models[model] || {}
    let fields = getFields(model, schema)
    return fields
  }
}

/**
 * Returns a full fields config for a model schema
 * @param  {string} model  Name of the model
 * @param  {Schema} schema Instance of Schema
 * @return {Promise} List of fields
 */
var getFields = function (model, schema) {
  let promises = []
  let keys = Object.keys(schema)

  for (let key of keys) {
    let attr = schema[key]
    let conf = getConfig(model, key, attr)

    if (conf.discard) { continue }
    let Field = Fields.getFromAttribute(attr)
    let field = new Field(attr, conf)
    promises.push(field.getConfig())
  }

  return Promise.all(promises)
}

/**
 * Builds a field config merged with loaded defaults
 * @param  {string} model
 * @param  {string} key   Key of the schemaattribute
 * @param  {Object} attr
 * @return {Object}
 */
var getConfig = function (model, key, attr) {
  let conf = (attr.meta && attr.meta.field) || {}
  let defaults = getConfigDefaults(model, key, attr)
  conf = _.merge(defaults, conf)

  conf.label = conf.label || key.toUpperCase()
  conf.key = key
  conf.model = attr.model || attr.collection

  return conf
}

/**
 * Loads defaults from config
 * @param  {string} model
 * @param  {string} key   Key of the schemaattribute
 * @param  {Object} attr
 * @return {Object}
 */
var getConfigDefaults = function (model, key, attr) {
  let conf = {}

  if (defaults.models[model][key]) {
    conf = _.merge(defaults.models[model][key], conf)
  }
  if (defaults.models[model][attr.sourceKey]) {
    conf = _.merge(defaults.models[model][attr.sourceKey], conf)
  }
  if (defaults.fields[attr.sourceKey]) {
    conf = _.merge(defaults.fields[attr.sourceKey], conf)
  }
  if (defaults.fields[key]) {
    conf = _.merge(defaults.fields[key], conf)
  }
  if (attr.primaryKey && _.isUndefined(conf.discard)) {
    conf.discard = true
  }

  return conf
}

export default ModelFields
