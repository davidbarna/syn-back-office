/**
 * Back office languages
 *
 * A simple getter to retrieve languages from API
 */
import Config from './config'
import Model from './model'

/**
 * Language params from config
 * @return {Object} With 2 properties:
 *                  default: default language to use in dropdowns
 *                  model: name of languages model in API
 */
var conf = Config.getInstance().app.languages

class Languages {

  /**
   * Returns the id of default language to use
   * @return {string} 'es-mx' | 'en-us' | etc
   */
  static getDefaultId () {
    return conf.default
  }

  /**
   * Retrieves list of languages from API
   * @return {Promise}
   */
  static get () {
    let actions = new Model(conf.model)
    return actions.find()
  }
}

export default Languages
