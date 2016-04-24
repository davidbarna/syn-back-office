/**
 * Model Form Controller
 * Builds a form to edit/create a model
 */

import Model from '../../lib/model'
import DataParser from '../../lib/model/parser'

class ModelFormCtrl {

  constructor (scope) {
    this.scope = scope
    this.modelName = null
    this.form = null
  }

  setModel (modelName, id) {
    this.modelName = modelName
    this.model = {}
    this.editionMode = !!id
    this.actions = new Model(modelName)
    this.actions.getSchema()
      .then((schema) => {
        this.schema = schema
        this.parser = new DataParser(schema)
        return this.actions.getFields(schema)
      })
      .then((fields) => {
        this.fields = fields
        if (id) {
          return this.actions.findOne(id)
            .then((obj) => {
              this.model = obj
            })
        }
      })
      .then(() => {
        this.update()
      })
  }

  update () {
    this.params = this.parser.valuesFromModel(this.model)
    this.scope.formly = {
      model: this.params,
      fields: this.fields,
      onSubmit: (form) => {
        this.form = form
        this.submit()
      }
    }
    this.scope.$digest()
  }

  isValid () {
    return this.form.$valid
  }

  isPristine () {
    return this.form.$pristine
  }

  submit () {
    var alert = window.alert

    if (!this.isValid()) {
      alert('Form is invalid. Please review.')
      return
    }
    if (this.isPristine()) {
      alert('Form was not edited. No need to submit.')
      return
    }
    this.actions.update(this.parser.fromForm(this.params))
      .then((response) => {
        alert('Success: ' + response.id)
      })
      .catch((e) => {
        alert('Error: ' + e.message)
      })
  }
}

export default ModelFormCtrl
