/**
 * ModelDefaults
 *
 * In charge of building default attributes from model's schema.
 * Several source are used in addition to attributes.
 */
import _ from 'lodash'

class ModelDefaults {

  /**
   * @constructor
   * @param  {string} model Name of the model
   * @param  {Object} base  Base defaults object to extend from
   */
  constructor (model, base) {
    this.model = model
    this.base = base
    this.base.models = this.base.models || {}
    this.base.fields = this.base.fields || {}
    this.base.models[model] = this.base.models[model] || {}
  }

  /**
   * Loads defaults from config
   * @param  {string} model
   * @param  {string} key   Key of the schema attribute
   * @param  {Object} attr
   * @return {Object}
   */
  getConfigDefaults (key, attr) {
    let conf = {}

    if (this.base.models[this.model][key]) {
      conf = _.merge(this.base.models[this.model][key], conf)
    }
    if (this.base.models[this.model][attr.sourceKey]) {
      conf = _.merge(this.base.models[this.model][attr.sourceKey], conf)
    }
    if (this.base.fields[attr.sourceKey]) {
      conf = _.merge(this.base.fields[attr.sourceKey], conf)
    }
    if (this.base.fields[key]) {
      conf = _.merge(this.base.fields[key], conf)
    }
    if (attr.primaryKey && _.isUndefined(conf.discard)) {
      conf.discard = true
    }

    return conf
  }

  /**
   * Builds a field config merged with loaded defaults
   * @param  {string} model
   * @param  {string} key   Key of the schema attribute
   * @param  {Object} attr
   * @return {Object}
   */
  get (key, attr, metaKey) {
    let conf = (attr.meta && attr.meta[metaKey]) || {}
    conf = _.merge(this.getConfigDefaults(key, attr), conf)
    conf.label = conf.label || key
    conf.priority = conf.priority || 0
    conf.key = key
    conf.type = attr.type
    conf.model = attr.model || attr.collection
    conf.collection = attr.collection

    return conf
  }

  /**
   * Returns config objects ordered by priority
   * @param  {Object} attrs   Schema attributes
   * @param  {string} metaKey Meta key in attributes
   * @return {array}
   */
  getAll (attrs, metaKey) {
    let result = []
    let keys = Object.keys(attrs)

    for (let key of keys) {
      let attr = attrs[key]
      let conf = this.get(key, attr, metaKey)
      if (conf.discard) { continue }
      result.push(conf)
    }
    result = _.orderBy(result, ['priority'], 'desc')
    return result
  }
}

export default ModelDefaults
