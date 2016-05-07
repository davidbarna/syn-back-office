import FormCtrl from './ctrl'

let formDirective = {
  scope: {
    model: '@',
    id: '@'
  },
  template: require('./tpl'),
  controller: [ '$scope', '$element', (scope, element) => {
    let ctrl = new FormCtrl(scope)
    ctrl
      .setCopyMode(element[0].hasAttribute('copy'))
      .setModel(scope.model, scope.id)
  }]
}
export default () => formDirective
