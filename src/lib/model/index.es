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

var nav = Navigation.getInstance()

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
   * Creates new model in API
   * @param  {Object} params Properties to update
   * @return {Promise}
   */
  create (params) {
    return Api.post(this.model, { body: params })
  }

  /**
   * Updates model in API
   * @param  {Object} params Properties to update
   * @return {Promise}
   */
  update (params) {
    return Api.put(this.model, { body: params })
  }

  /**
   * Deletes item in API
   * @param  {string} id
   * @return {Promise}
   */
  delete (id) {
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
