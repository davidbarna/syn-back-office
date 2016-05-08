/**
 * Wrapper for multi language input.
 * It wraps an input per each language.
 */
export default {
  name: 'many-to-many-values-wrapper',
  template: `
    <label class="control-label" ng-if="to.label">
      {{ to.label }}
    </label>
    <formly-transclude></formly-transclude>`
}
