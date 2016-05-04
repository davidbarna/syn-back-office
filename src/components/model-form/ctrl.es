/**
 * Model Form Controller
 * Builds a form to edit/create a model
 */

import Model from '../../lib/model'
import Navigation from '../../lib/nav'

var alert = window.alert

var nav = Navigation.getInstance()

class ModelFormCtrl {

  constructor (scope) {
    this.scope = scope
    this.modelName = null
    this.form = null
    this.formOptions = null
  }

  setModel (modelName, id) {
    this.modelName = modelName
    this.model = {}
    this.editionMode = !!id
    this.actions = new Model(modelName)
    this.actions.getParser()
      .then((parser) => {
        this.parser = parser
        return this.actions.getFields()
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
      .catch((e) => {
        window.alert('Error: ' + e.message)
      })
  }

  update () {
    this.params = this.parser.valuesFromModel(this.model)
    this.scope.editMode = this.editionMode
    this.scope.formly = {
      model: this.params,
      fields: this.fields,
      onSubmit: (form, options) => {
        this.form = form
        this.formOptions = options
        this.submit()
      },
      onDelete: (form, options) => {
        this.form = form
        this.formOptions = options
        this.delete()
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

  reset () {
    this.formOptions.resetModel()
  }

  delete () {
    if (window.confirm('Are you sure?')) {
      this.actions.delete(this.model.id)
        .then(() => {
          nav.go('list', {model: this.modelName})
        })
        .catch((e) => {
          alert('Error: ' + e.message)
        })
    }
  }

  submit () {
    if (!this.isValid()) {
      alert('Form is invalid. Please review.')
      return
    }
    if (this.isPristine()) {
      alert('Form was not edited. No need to submit.')
      return
    }

    let promise = null
    if (this.editionMode) {
      promise = this.actions.update(this.parser.fromForm(this.params))
    } else {
      promise = this.actions.create(this.parser.fromForm(this.params))
    }

    promise
      .then((response) => {
        alert('Success: ' + response.id)
        if (!this.editionMode) {
          this.formOptions.resetModel()
        }
      })
      .catch((e) => {
        alert('Error: ' + e.message)
      })
  }
}

export default ModelFormCtrl
