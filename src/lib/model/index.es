/**
 * Services related to models
 */
import Schema from './schema'
import Fields from './fields'
import Api from '../api'
import Parser from './parser'

/**
 * Default language for lists of entities
 * @todo Get it from a config file
 * @type {String}
 */
const DEFAULT_LANGUAGE = 'es_ES'

class Model {

  /**
   * @constructor
   * @param  {string} resource Name of API resource
   */
  constructor (resource) {
    this.model = resource
  }

  /**
   * Retrieves schema from API
   * @return {Schema}
   */
  getSchema () {
    return Schema.get(this.model)
  }

  /**
   * Builds fields config according to schema
   * @param  {Schema} schema
   * @return {Promise}
   */
  getFields (schema) {
    return Fields.getFromSchema(this.model, schema.attrs())
  }

  /**
   * Returns a list of options from an API resource
   * @return {Promise}
   */
  getOptions () {
    return Promise.all([this.getSchema(), this.find()])
      .then((responses) => {
        var [schema, results] = responses
        var parser = new Parser(schema)
        var keys = schema.translationKeys()

        for (let item of results) {
          let parsed = parser.fromModel(item)
          for (let key of keys) {
            parsed[key] = parsed[key][DEFAULT_LANGUAGE]
          }
        }
        return results
      })
  }

  /**
   * Retrieves an item from API
   * @param  {string} id
   * @return {Promise}
   */
  findOne (id) {
    return Api.get(this.model, id)
  }

  /**
   * Retrieves items from API resource
   * @return {Promise}
   */
  find () {
    return Api.get(this.model)
  }

  /**
   * Updates/Creates model in API
   * @param  {Object} params Properties to update
   * @return {Promise}
   */
  update (params) {
    return Api.post(this.model, { body: params })
  }

  /**
   * Deletes item in API
   * @param  {string} id
   * @return {Promise}
   */
  delete (id) {
    return Api.delete(this.model, id)
  }
}

export default Model
