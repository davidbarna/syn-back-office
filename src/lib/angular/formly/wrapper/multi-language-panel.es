/**
 * Wrapper for multi language input.
 * It wraps an input per each language.
 */
export default {
  name: 'multi-language-panel',
  template: `
    <label class="control-label" ng-if="to.label">
      {{ to.label }}
    </label>
    <formly-transclude></formly-transclude>`
}
