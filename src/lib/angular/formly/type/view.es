/**

 */
export default {
  name: 'view',
  template: `
  <pre>
    {{model[options.key]}}
  </pre>`,
  wrapper: ['bootstrapLabel']
}
