/**
 * Model Grid Controller
 * Builds a grids with model's items.
 */

import _ from 'lodash'
import Model from '../../lib/model'
import Navigation from '../../lib/nav'
import ngTableCols from '../../lib/angular/ngTable/cols'

var nav = Navigation.getInstance()
var NgTableParams = null

class ModelGridCtrl {

  constructor (scope, _NgTableParams_) {
    this.scope = scope
    NgTableParams = _NgTableParams_
  }

  /**
   * Sets name of grid's model and loads the grid with data
   * @param {string} modelName
   */
  setModel (modelName) {
    this.modelName = modelName
    this.actions = new Model(modelName)
    this.actions.getGrid()
      .then((config) => {
        this.configTable(config)
      })
  }

  configTable (config) {
    this.tableParams = new NgTableParams({}, {
      dataset: config.data
    })
    this.tableCols = ngTableCols.getColsConfig(config)
    this.scope.ctrl = this
  }

  createRow (event, model) {
    nav.go('form', {model: this.modelName, id: null})
  }

  editRow (event, model) {
    nav.go('form', {model: this.modelName, id: model.id})
  }

  copyRow (event, model) {
    event.stopPropagation()
    nav.go('copy', {model: this.modelName, id: model.id})
  }

  deleteRow (event, model) {
    event.stopPropagation()
    this.actions.promptDelete(model)
      .then((wasDelete) => {
        if (wasDelete) {
          _.remove(this.tableParams.settings().dataset, function (item) {
            return model.id === item.id
          })
          this.tableParams.reload()
        }
      })
  }

  destroy () {}

}

export default ModelGridCtrl
