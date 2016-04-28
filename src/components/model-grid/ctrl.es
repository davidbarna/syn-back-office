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

    this.actions.getGrid()
      .then((config) => {
        this.config = config
        this.render({ config: this.config })
      })
  }

  destroy () {}

}

export default ModelGridCtrl
