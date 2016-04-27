/**
 * Angular formly implementation
 * Here the original formly module is extended with new
 * field types, wrappers, validations, etc.
 */
import angular from 'angular'
import ngFormly from 'angular-formly'
import ngFormlyBootstrap from 'angular-formly-templates-bootstrap'
import wrappers from './wrappers'

export default {
  /**
   * Returns extended formly angular module
   * @return {Object} Angular module instance
   */
  getModule () {
    return angular.module('syn.backOffice.formly', [ ngFormly, ngFormlyBootstrap ])
      .config(['formlyConfigProvider', function (formlyConfigProvider) {
        for (let wrapper of wrappers) {
          formlyConfigProvider.setWrapper(wrapper)
        }
      }])
  }
}
