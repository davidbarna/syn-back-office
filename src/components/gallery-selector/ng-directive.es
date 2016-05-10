import GridCtrl from './ctrl'
import core from 'syn-core'

let formDirective = {
  scope: false,
  template: require('./tpl'),
  controller: [ '$scope', '$element', 'NgTableParams', (scope, element, NgTableParams) => {
    let ctrl = new GridCtrl(scope, NgTableParams)
    core.angularify(scope, ctrl)
    ctrl
      .setModel('mediafile')
  }]
}
export default () => formDirective
