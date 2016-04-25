/**
 * Main angular module factory
 */
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import synUI from 'syn-ui'
import synGrids from 'syn-grids'
import synFormly from './formly'
import routes from './routes'
import backOffice from '../../components/back-office/ng-directive'
import modelForm from '../../components/model-form/ng-directive'
import modelGrid from '../../components/model-grid/ng-directive'

export default {
  /**
   * Returns main back office angular module
   * @return {Object} Angular module instance
   */
  getModule () {
    return angular.module('syn.backOffice', [
      uiRouter,
      synUI.angular.getModule().name,
      synGrids.angular.getModule().name,
      synFormly.getModule().name
    ])

      // Directives config
      .directive('synBackOffice', backOffice)
      .directive('synModelForm', modelForm)
      .directive('synModelGrid', modelGrid)

      // Routing config with ui-router
      .config([
        '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
          for (let key of Object.keys(routes)) {
            $stateProvider.state(key, routes[key])
          }
          $urlRouterProvider.otherwise('/')
        }
      ])
  }
}

window.angular = angular
