
/**
 * Model cells
 *
 * Builds grid cells config for model grids.
 */
import Defaults from '../model/defaults'
import Config from '../../lib/config'
import FilterFactory from './filter/factory'
import _ from 'lodash'

var gridsDefaults = null

/**
 * Key of form field properties in Model attributes meta
 * @type {String}
 */
const META_KEY = 'field'

class ModelHeader {

  /**
   * Returns a full cells config for a model schema
   * @param  {string} model  Name of the model
   * @param  {Schema} schema Instance of Schema
   * @return {Promise} List of fields
   */
  static getFromSchema (model, schema) {
    if (!gridsDefaults) {
      gridsDefaults = _.merge(
        _.cloneDeep(Config.getInstance().forms.defaults),
        _.cloneDeep(Config.getInstance().grids.cells.defaults)
      )
    }

    let cells = getCells(model, schema)
    return cells
  }
}

/**
 * Returns a full cells config for a model schema
 * @param  {string} model  Name of the model
 * @param  {Schema} schema Instance of Schema
 * @return {Promise} List of fields
 */
var getCells = function (model, schema) {
  let defaults = new Defaults(model, gridsDefaults)
  let cells = {}
  let configs = defaults.getAll(schema, META_KEY)
  for (let conf of configs) {
    conf.filter = FilterFactory.create(conf)
    cells[conf.key] = conf
  }
  return cells
}

export default ModelHeader
