/**

 */
export default {
  name: 'tinymce',
  template: `
  <div class="field-tinymce" ng-show="!to.disabled">
    <textarea
      ui-tinymce="options.data.tinymceOption"
      ng-model="model[options.key]"
      class="form-control"
    />
  </div>`,
  wrapper: ['bootstrapLabel']
}
