import GridCtrl from './ctrl'
import core from 'syn-core'

let formDirective = {
  scope: {
    model: '@',
    id: '@'
  },
  template: require('./tpl'),
  controller: [ '$scope', '$element', (scope, element) => {
    let ctrl = new GridCtrl(scope)
    core.angularify(scope, ctrl)
    ctrl
      .setModel(scope.model)
  }]
}
export default () => formDirective
