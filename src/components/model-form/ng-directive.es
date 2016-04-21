import FormCtrl from './ctrl'

let formDirective = {
  scope: true,
  template: require('./tpl'),
  controller: [ '$scope', (scope) => {
    let ctrl = new FormCtrl(scope)
    ctrl.init()
  }]
}
export default () => formDirective
