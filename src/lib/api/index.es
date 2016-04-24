/**
 * Api
 * Service to obtain en send data to API
 *
 * @todo Set a cache manager
 */
import Config from '../../lib/config'

var conf = Config.getInstance().api

class Api {

  /**
   * Returns schema from the API
   * @param  {string} resource Name of the resource
   * @return {Promise}
   */
  static schema (resource) {
    return getData(getUrl(conf.resource.schema, resource))
  }

  /**
   * Returns single item from API
   * @param  {string} resource Name of the resource
   * @param  {string|number} id Id of item
   * @param  {Object} params = {} Standard fetch params
   * @return {Promise}
   */
  static get (resource, id, params = {}) {
    params.method = 'GET'
    return getData(getUrl(conf.resource.rest, resource, id), params)
  }

  /**
   * Posts item data to API
   * @param  {string} resource Name of the resource
   * @param  {Object} params = {} Standar fetch params
   * @return {Promise}
   */
  static post (resource, params = {}) {
    params.method = 'POST'
    return getData(getUrl(conf.resource.form, resource), params)
  }

  /**
   * Deleted item from API
   * @param  {string} resource Name of the resource
   * @param  {string|number} id Id of item
   * @return {Promise}
   */
  static delete (resource, id) {
    let params = { method: 'DELETE' }
    return getData(getUrl(conf.resource.rest, resource, id), params)
  }
}

/**
 * Returns a a processed url according to params
 * @param  {string} baseUrl
 * @param  {string} resource
 * @param  {string|number} id
 * @return {string} Valid Url
 */
var getUrl = (baseUrl, resource = '' , id = '') => {
  if (baseUrl.indexOf('://') === -1) {
    baseUrl = conf.url + baseUrl
  }
  baseUrl = baseUrl.replace(':modelId', id)
  baseUrl = baseUrl.replace(':model', resource)
  return baseUrl
}

/**
 * Fetches data from API.
 * Returns Error in case of not successfull status code
 * @param  {string} url
 * @param  {Object} params = {} Standard fetch params
 * @return {Promise}
 */
var getData = (url, params = {}) => {
  return window.fetch(url, processRequestParams(params))
    .then(function (response) {
      if (!response.ok) {
        throw Error(`[${response.status}] ${response.statusText}`)
      }
      return response.text()
    })
    .then(function (response) {
      return JSON.parse(response)
    })
}

/**
 * Preprocesses params to fit to fetch standard
 * @param  {Object} params = {} Standard fetch params
 * @return {Object}
 */
var processRequestParams = function (params) {
  if (typeof params.body === 'object') {
    params.body = JSON.stringify(params.body)
  }
  return params
}

export default Api
