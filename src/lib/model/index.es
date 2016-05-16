/**
 * Services related to models
 */

import swal from 'sweetalert'
import Schema from './schema'
import Fields from './fields'
import Header from '../grid/head'
import Cells from '../grid/cells'
import Api from '../api'
import Parser from './parser'
import Languages from '../languages'
import Navigation from '../../lib/nav'
import nodeCache from 'node-cache'

var nav = Navigation.getInstance()
var modelCache = {}

class Model {

  /**
   * @constructor
   * @param  {string} resource Name of API resource
   */
  constructor (resource) {
    this.model = resource
    if (!modelCache[this.model]) {
      modelCache[this.model] = new nodeCache({ stdTTL: 60 * 60 * 4 })
    }
    this.cache = modelCache[this.model]
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
  getFields () {
    return this.getSchema()
      .then((schema) => {
        return Fields.getFromSchema(this.model, schema.attrs())
      })
  }

  /**
   * Returns a config object for syn-grid
   * according to Model's schema
   * @return {Object} Grids config
   */
  getGrid () {
    return Promise.all([this.findPopulate(), this.getSchema()])
      .then((results) => {
        let [data, schema] = results
        return {
          head: Header.getFromSchema(this.model, schema.attrs()),
          cells: Cells.getFromSchema(this.model, schema.attrs()),
          data: data
        }
      })
  }

  /**
   * Returns a data parser for the model
   * @return {Promise}
   */
  getParser () {
    return this.getSchema()
      .then((schema) => {
        this.parser = new Parser(schema)
        return this.parser
      })
  }

  /**
   * Returns a list of options from an API resource
   * @return {Promise}
   */
  findPopulate () {
    let cache = this.cache.get('findPopulate')
    if (cache) {
      return new Promise(function (resolve) { resolve(cache) })
    }
    return Promise.all([this.getSchema(), this.find()])
      .then((responses) => {
        var [schema, results] = responses
        var parser = this.parser || new Parser(schema)
        var keys = schema.translationKeys()

        for (let item of results) {
          let parsed = parser.fromModel(item)
          for (let key of keys) {
            parsed[key] = parsed[key][Languages.getDefaultId()]
          }
        }
        this.cache.set('findPopulate', results)
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
    let cache = this.cache.get('find')
    if (cache) {
      return new Promise(function (resolve) { resolve(cache) })
    }
    return Api.get(this.model)
      .then((items) => {
        this.cache.set('find', items)
        return items
      })
  }

  /**
   * Creates new model in API
   * @param  {Object} params Properties to update
   * @return {Promise}
   */
  create (params) {
    this.cache.flushAll()
    return Api.post(this.model, { body: params })
  }

  /**
   * Updates model in API
   * @param  {Object} params Properties to update
   * @return {Promise}
   */
  update (params) {
    this.cache.flushAll()
    return Api.put(this.model, { body: params })
  }

  /**
   * Deletes item in API
   * @param  {string} id
   * @return {Promise}
   */
  delete (id) {
    this.cache.flushAll()
    return Api.delete(this.model, id)
  }

  promptDelete (item) {
    return new Promise((resolve, reject) => {
      swal({
        title: '¿Está seguro?',
        text: 'Este documento y sus datos relacionados serán borrados y no podrán ser recuperados.',
        type: 'error',
        showConfirmButton: true,
        showCancelButton: true,
        closeOnConfirm: false,
        closeOnCancel: true
      },
        (isConfirmed) => {
          if (isConfirmed) {
            this.delete(item.id)
              .then(() => {
                swal('Borrado', 'El documento ha sido borrado', 'success')
                nav.go('list', {model: this.model})
                resolve(true)
              })
              .catch((e) => {
                swal('Error', e.message, 'error')
              })
          } else {
            resolve(false)
          }
        }
      )
    })
  }
}

export default Model
