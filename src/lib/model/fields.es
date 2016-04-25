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

/**
 * Form fields defaults
 * @return {Object}
 */
var formDefaults = _.cloneDeep(Config.getInstance().forms.defaults)

class ModelFields {

  /**
   * Returns a full fields config for a model schema
   * @param  {string} model  Name of the model
   * @param  {Schema} schema Instance of Schema
   * @return {Promise} List of fields
   */
  static getFromSchema (model, schema) {
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
  let defaults = new Defaults(model, formDefaults)
  let configs = defaults.getAll(schema, META_KEY)
  let promises = []

  for (let conf of configs) {
    let attr = schema[conf.key]
    let Field = Fields.getFromAttribute(attr)
    let field = new Field(attr, conf)
    promises.push(field.getConfig())
  }

  return Promise.all(promises)
}

export default ModelFields
