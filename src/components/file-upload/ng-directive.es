import DropZoneCtrl from './ctrl'
import core from 'syn-core'

let backOfficeDirective = {
  scope: {
    instanceId: '@',
    acceptedFiles: '@',
    maxFiles: '@'
  },
  template: require('./tpl'),
  controller: [
    '$element', '$scope',
    (element, scope) => {
      let opts = {
        acceptedFiles: scope.acceptedFiles,
        maxFiles: scope.maxFiles
      }
      let ctrl = new DropZoneCtrl(element, scope.instanceId, opts)
      core.angularify(scope, ctrl)
      ctrl.init()
    }
  ]
}

export default () => backOfficeDirective
