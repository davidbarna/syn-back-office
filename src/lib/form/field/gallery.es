import FieldManyToMany from './many-to-many'
import images from '../../../lib/images'

var modalTemplate = `<div class="modal-header">
  <h3 class="modal-title">Selector de imágenes</h3>
</div>
<div class="modal-body">
  <syn-gallery-selector></syn-gallery-selector>
</div>
<div class="modal-footer">
  <button type="button" ng-click="ok()" class="btn btn-primary">OK</button>
</div>`

var modal = null

class GalleryField extends FieldManyToMany {
  constructor (attr, conf) {
    super(attr, conf)
    this.model = conf.collection
    this.scope = null
    this.multipleSelection = true
  }
  getConfig () {
    return super.getConfig()
      .then((obj) => {
        delete obj.type

        obj.hideExpression = (arg1, arg2, scope) => {
          this.scope = scope
          return false
        }
        obj.templateOptions.getImagePath = images.getThumbnailPath
        obj.controller = [ '$uibModal', '$scope', (uiModal, scope) => {
          scope.addImages = (ids = []) => {
            modal = uiModal.open({
              controller: [ '$scope', (scope) => {
                scope.multipleSelect = this.multipleSelection
                scope.selected = ids
                scope.ok = () => {
                  this.scope.model[this.conf.key] = scope.ctrl.selected
                  modal.dismiss()
                }
              }],
              template: modalTemplate,
              size: 'lg'
            })
          }
        }]
        obj.template = `<label class="control-label">
          {{to.label}}
          {{to.required ? '*' : ''}}
        <ul class="syn-gallery-selector_selected">
          <li ng-repeat="file in to.options" ng-if="model.${this.conf.key}.indexOf(file.id) !== -1" >
            <img src="{{to.getImagePath(file)}}" />
          </li>
        </ul>
        <button class="btn btn-primary btn-xs" type="button" ng-click="addImages(model.${this.conf.key})">Escoger imágenes</button>
        </label>`
        return obj
      })
  }

}

export default GalleryField
