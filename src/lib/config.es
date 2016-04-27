import { Config } from 'syn-core'
import _ from 'lodash'
import config from '../config'

/*
 * Unique instance
 * @type {BackOfficeConfig}
*/
let instance = null

/*
 * # BackOfficeConfig
 * Singleton pattern for a global dashboard config object
*/
class BackOfficeConfig extends Config {

  /*
   * @constructor
   * @param  {string} env = 'development' Current environment
   * @return {this} Returns singleton instance
  */
  constructor (env = window.env || 'development') {
    if (instance) { return instance }
    super(_.cloneDeep(config), env)
    instance = this
  }

  /*
   * Resets instance
   * @return {this}
  */
  destroy () {
    this.clear()
    instance = null
    return this
  }
}

/*
 * Returns a unique instance of BackOfficeConfig
 * @return {BackOfficeConfig}
*/
BackOfficeConfig.getInstance = () => instance || new BackOfficeConfig()

export default BackOfficeConfig
