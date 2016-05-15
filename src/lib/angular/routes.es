import states from '../../config/states'
import models from '../../config/models'

let routes = {}

routes[states.home.name] = {
  url: states.home.url,
  template: '<syn-back-office></syn-back-office>'
}

routes[states.model.name] = {
  abstract: true,
  parent: states.home.name,
  url: states.model.url,
  controller: [ '$stateParams', '$scope',
    function ($stateParams, $scope) {
      $scope.modelLabel = models[$stateParams.model]
      $scope.model = $stateParams.model
      $scope.modelId = $stateParams.id
    }
  ],
  template: '<h1 class="bk-header">{{modelLabel}}</h1><ui-view />'
}

routes[states.form.name] = {
  parent: states.model.name,
  url: states.form.url,
  template: '<syn-model-form model="{{model}}" id="{{modelId}}" />'
}

routes[states.copy.name] = {
  parent: states.model.name,
  url: states.copy.url,
  template: '<syn-model-form model="{{model}}" id="{{modelId}}" copy="" />'
}

routes[states.list.name] = {
  parent: states.model.name,
  url: states.list.url,
  template: '<syn-model-grid model="{{model}}" />'
}

export default routes
