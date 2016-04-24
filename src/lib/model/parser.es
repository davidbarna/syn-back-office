/**
 * DataParser
 *
 * Parses data according to given schema.
 * It converts data from api to form forma and vice versa.
 */
import * as Fields from '../form/fields'
import Schema from './schema'
import _ from 'lodash'

/**
 * Separator used form remote schema attrs
 * @type {String}
 */
const KEY_SEPARATOR = '.'

class DataParser {

  /**
   * @constructor
   * @param  {Schema} schema
   */
  constructor (schema) {
    this.schema = schema
  }

  /**
   * Converts data from form model to API format
   * @param  {Object} data Form model data
   * @return {Object} API ready data
   */
  fromForm (data) {
    data = _.cloneDeep(data)
    var attrs = this.schema.attrs()
    var keys = getFieldsKeys(attrs, data)
    for (let key of keys) {
      if (data[key] === undefined) { continue }
      if (key.indexOf(KEY_SEPARATOR) !== -1) {
        updateModelProperty(data, key, attrs[key].sourceRef)
        continue
      }
      if (Schema.isTranslation(attrs[key])) { continue }

      let Field = Fields.getFromAttribute(attrs[key])
      data[key] = Field.parseData(data[key])
    }

    return data
  }

  /**
   * Converts API format to form model format
   * @param  {Object} model Data to be converted
   * @return {Object} Form ready data
   */
  fromModel (model) {
    var attrs = this.schema.attrs()
    var keys = this.schema.keys()
    for (let key of keys) {
      var { sourceProperty, sourceRef } = attrs[key]
      if (!model[sourceProperty]) { continue }
      if (sourceProperty) {
        model[key] = updateFormProperty(key, model[sourceProperty], sourceRef)
      }
    }
    return model
  }

  /**
   * Converts API format to form model format as `fromModel`
   * Moreover, it replaces values to "view format"
   * @param  {Object} model Data to be converted
   * @return {Object} Form ready data
   */
  valuesFromModel (model) {
    model = this.fromModel(model)
    var attrs = this.schema.attrs()
    var keys = this.schema.keys()
    for (let key of keys) {
      if (Schema.isTranslation(attrs[key])) { continue }
      let Field = Fields.getFromAttribute(attrs[key])
      model[key] = Field.getData(model[key])
    }
    return model
  }
}

/**
 * It updates data with values to construct
 * objects from remote entity added to current form.
 * Used mainly for translation (details tables)
 * @param  {Object} data
 * @param  {string} key    Key of the attribute
 * @param  {string} refKey Key of the attribute in remote schema
 * @return {Object}
 */
var updateModelProperty = function (data, key, refKey) {
  let keys = key.split(KEY_SEPARATOR)
  let nodeKey = keys[0]
  let propKey = keys[1]
  let rows = data[nodeKey] || []

  for (let ref of Object.keys(data[key])) {
    let found = _.find(rows, { [refKey]: ref })
    if (!found) {
      found = { [refKey]: ref }
      rows.push(found)
    }
    found[propKey] = data[key][ref]
  }
  data[nodeKey] = rows
  delete data[key]
}

/**
 * Returns common keys between schema and given data
 * @param  {Schema} schema
 * @param  {Object} data
 * @return {Object}
 */
var getFieldsKeys = function (schema, data) {
  let keys = []
  for (let key of Object.keys(schema)) {
    if (data[key] !== undefined) { keys.push(key) }
  }
  return keys
}

/**
 * Updates a remote schema data with form model
 * data indexed by refKey
 * @param  {string} key
 * @param  {Object} source
 * @param  {string} refKey
 * @return {Object}
 */
var updateFormProperty = function (key, source, refKey) {
  var result = {}
  key = key.split(KEY_SEPARATOR).pop()
  for (let obj of source) {
    result[obj[refKey]] = obj[key]
  }
  return result
}

export default DataParser
