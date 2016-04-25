/**
 * Model Grid Controller
 * Builds a grids with model's items.
 */

import Model from '../../lib/model'

class ModelGridCtrl {

  /**
   * Sets name of grid's model and loads the grid with data
   * @param {string} modelName
   */
  setModel (modelName) {
    this.config = {}
    this.model = modelName
    this.actions = new Model(modelName)
    this.actions.findPopulate()
      .then((items) => {
        this.config.data = items
        return this.actions.getHeader()
      })
      .then((header) => {
        this.config.head = header
        this.render({ config: this.config })
      })
  }

  destroy () {}

}

export default ModelGridCtrl
