import BackOfficeCtrl from './ctrl'

let backOfficeDirective = {
  scope: true,
  template: require('./tpl'),
  controller: [ '$element', (element) => {
    let ctrl = new BackOfficeCtrl(element)
    ctrl.init()
  }]
}

export default () => backOfficeDirective
