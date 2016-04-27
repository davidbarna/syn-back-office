/**
 * Model header
 *
 * Builds grid head config for model grids.
 */
import Defaults from './defaults'
import Config from '../../lib/config'
import _ from 'lodash'

var gridsDefaults = null

/**
 * Key of form field properties in Model attributes meta
 * @type {String}
 */
const META_KEY = 'field'

class ModelHeader {

  /**
   * Returns a full head config for a model schema
   * @param  {string} model  Name of the model
   * @param  {Schema} schema Instance of Schema
   * @return {Promise} List of fields
   */
  static getFromSchema (model, schema) {
    if (!gridsDefaults) {
      gridsDefaults = _.merge(
        _.cloneDeep(Config.getInstance().forms.defaults),
        _.cloneDeep(Config.getInstance().grids.defaults)
      )
    }

    let header = getHeader(model, schema)
    return header
  }
}

/**
 * Returns a full head config for a model schema
 * @param  {string} model  Name of the model
 * @param  {Schema} schema Instance of Schema
 * @return {Promise} List of fields
 */
var getHeader = function (model, schema) {
  let defaults = new Defaults(model, gridsDefaults)
  let header = {}
  let configs = defaults.getAll(schema, META_KEY)
  for (let conf of configs) {
    header[conf.key] = conf
  }
  return header
}

export default ModelHeader
