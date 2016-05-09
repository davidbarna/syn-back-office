/**
 * Main angular module factory
 */
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngSanitize from 'angular-sanitize'
import synUI from 'syn-ui'
import ngTable from './ngTable/ng-table'
// import synGrids from 'syn-grids'
import synFormly from './formly'
import routes from './routes'
import backOffice from '../../components/back-office/ng-directive'
import modelForm from '../../components/model-form/ng-directive'
// import modelGrid from '../../components/model-grid/ng-directive'
import modelGrid from '../../components/model-grid-ng-table/ng-directive'
import Navigation from '../nav'
import fileUpload from '../../components/file-upload/ng-directive'

ngTable

export default {
  /**
   * Returns main back office angular module
   * @return {Object} Angular module instance
   */
  getModule () {
    return angular.module('syn.backOffice', [
      uiRouter,
      ngSanitize,
      'ngTable',
      synUI.angular.getModule().name,
      // synGrids.angular.getModule().name,
      synFormly.getModule().name
    ])

      // Directives config
      .directive('synBackOffice', backOffice)
      .directive('synModelForm', modelForm)
      .directive('synModelGrid', modelGrid)
      .directive('synFileUpload', fileUpload)

      // Routing config with ui-router
      .config([
        '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
          for (let key of Object.keys(routes)) {
            $stateProvider.state(key, routes[key])
          }
          $urlRouterProvider.otherwise('/')
        }
      ])

      /**
       * Configure navigation service to make it work
       * with angular ui router
       */
      .run(['$state', '$rootScope', function ($state, $rootScope) {
        let nav = Navigation.getInstance()

        // Listen to nav changes to send state to ui-router
        nav.on(nav.CHANGE, (stateName, params) => {
          $state.go(stateName, params)
        })

        // Sets current state info to in could be retrieved outside of angular
        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams) => {
          nav.setCurrentState(toState.name)
            .setCurrentParams(toParams)
        })
      }])
  }
}

window.angular = angular
