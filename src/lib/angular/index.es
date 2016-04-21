import modelForm from '../../components/model-form/ng-directive'
window.angular = require('angular')
var ngFormly = require('angular-formly')
var ngFormlyBootstrap = require('angular-formly-templates-bootstrap')

export default {
  getModule () {
    return window.angular.module('syn.forms', [ ngFormly, ngFormlyBootstrap ])
      .directive('synModelForm', modelForm)
  }
}
