/**

 */
export default {
  name: 'tinymce',
  template: `
  <textarea
    ui-tinymce="options.data.tinymceOption"
    ng-model="model[options.key]"
    class="form-control"
  />`,
  wrapper: ['bootstrapLabel']
}
