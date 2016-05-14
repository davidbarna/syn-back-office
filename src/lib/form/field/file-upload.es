import FieldAbstract from './abstract'
import FileUploadComponent from '../../../components/file-upload/ctrl'
import images from '../../../lib/images'

var cnt = 0
var instanceId = null

class FileUpload extends FieldAbstract {
  getConfig () {
    return super.getConfig()
      .then((obj) => {
        delete obj.type
        instanceId = 'backoffice-form-upload-' + obj.key + '-' + cnt++

        let acceptedFiles = this.conf.acceptedFiles || ''
        let maxFiles = this.conf.maxFiles || 1
        obj.className = 'field-file-upload'
        obj.templateOptions.getImagePath = images.getThumbnailPath
        obj.template = `<label class="control-label">
          {{to.label}} (${acceptedFiles})
          {{to.required ? '*' : ''}}

          <syn-file-upload
            class="syn-file-upload"
            instance-id="${this.instanceId}"
            accepted-files="${acceptedFiles}"
            max-files="${maxFiles}"
          />
          <ul class="syn-gallery-selector_selected" ng-if="model">
            <li>
              <img ng-src="{{ to.getImagePath(model) }}" />
            </li>
          </ul>
        </label>`

        return obj
      })
  }

  static parseData (data) {
    let component = FileUploadComponent.getInstance(instanceId)

    if (!component) {
      return null
    }

    let files = component.getServerFiles()[0] || undefined
    component.reset()
    return files
  }

  static getData (data) {
    return data || null
  }
}

export default FileUpload
