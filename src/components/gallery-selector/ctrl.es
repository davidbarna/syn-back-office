/**
 * Model Grid Controller
 * Builds a grids with model's items.
 */

import _ from 'lodash'
import Model from '../../lib/model'
import images from '../../lib/images'

var NgTableParams = null

var cols = [
  {
    'field': 'path',
    'title': 'Archivo',
    'show': true,
    'sortable': 'createdAt',
    filter: {
      path: 'text'
    },
    getValue: function (row, col) {
      let imgUrl = images.getThumbnailPath(row)
      let url = row.url || row.path
      let html = `
        <img src="${imgUrl}"  style="max-width: 80px; max-height: 50px;" /><br />
        ${row['details.title']}<br />
        ${url || row['details.url']}`

      return html
    }
  }
]

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
    this.selected = this.scope.selected || []
    this.multipleSelect = this.scope.multipleSelect || false
    this.actions.getGrid()
      .then((config) => {
        this.configTable(config)
      })
  }

  configTable (config) {
    this.options = config.data
    this.tableParams = new NgTableParams({}, {
      dataset: this.options
    })
    this.tableCols = cols
    this.scope.ctrl = this
  }

  toggleSelection (row) {
    if (!this.isSelected(row)) {
      console.log(this.multipleSelect)
      if (!this.multipleSelect) {
        this.selected = []
      }
      this.selected.push(row.id)
    } else {
      _.remove(this.selected, (id) => {
        return id === row.id
      })
    }
  }

  isSelected (row) {
    return this.selected.indexOf(row.id) !== -1
  }

  getImageUrl (id) {
    var item = _.find(this.options, { id: id })
    return images.getThumbnailPath(item)
  }

  destroy () {}

}

export default ModelGridCtrl
