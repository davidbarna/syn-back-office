import BackOfficeCtrl from './ctrl'
import core from 'syn-core'
import states from '../../config/states'

let backOfficeDirective = {
  scope: true,
  template: require('./tpl'),
  controller: [
    '$element', '$scope', '$state',
    (element, scope, state) => {
      let goFunc = (item) => {
        console.log(states.form.name, { model: item.model })
        state.go(states.form.name, { model: item.model, id: null })
      }
      let ctrl = new BackOfficeCtrl(element)
      core.angularify(scope, ctrl)
      ctrl.init(goFunc)
    }
  ]
}

export default () => backOfficeDirective
