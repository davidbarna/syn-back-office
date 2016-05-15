/**
 * Model Form Controller
 * Builds a form to edit/create a model
 */

import swal from 'sweetalert'
import Model from '../../lib/model'
import Navigation from '../../lib/nav'

var nav = Navigation.getInstance()

class ModelFormCtrl {

  constructor (scope) {
    this.scope = scope
    this.modelName = null
    this.form = null
    this.formOptions = null
  }

  setCopyMode (value) {
    this.copyMode = value
    return this
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
        swal('Error', e.message, 'error')
      })
  }

  update () {
    if (this.copyMode) {
      this.editionMode = false
      delete this.model.id
    }
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
          swal('Error', e.message, 'error')
        })
    }
  }

  submit () {
    if (!this.isValid()) {
      swal('Formulario inválido', 'Revise los campos, por favor.', 'warning')
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
        swal({
          title: '¡Guardado!',
          type: 'success',
          timer: 1000
        })

        if (!this.editionMode) {
          this.formOptions.resetModel()
        }
      })
      .catch((e) => {
        swal('Error', e.message, 'error')
      })
  }
}

export default ModelFormCtrl
