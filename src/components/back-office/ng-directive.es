import BackOfficeCtrl from './ctrl'
import core from 'syn-core'

let backOfficeDirective = {
  scope: true,
  template: require('./tpl'),
  controller: [
    '$element', '$scope', '$state',
    (element, scope, state) => {
      let goFunc = (item) => {
        if (item.state) {
          state.go(item.state, item.params)
        }
      }
      let ctrl = new BackOfficeCtrl(element)
      core.angularify(scope, ctrl)
      ctrl.init(goFunc)
    }
  ]
}

export default () => backOfficeDirective
