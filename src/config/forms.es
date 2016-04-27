/**
 * Config for forms
 */
export default {
  /**
   * Defaults of field config objects
   * @type {Object}
   */
  defaults: {
    /**
     * Defaults by field name
     * @type {Object}
     */
    fields: {
      createdAt: {
        discard: true
      },
      updatedAt: {
        discard: true
      },
      uri: {
        label: 'Url amigable'
      },
      name: {
        label: 'Nombre',
        required: true
      },
      language: {
        discard: true
      }
    },
    /**
     * Defaults by model
     * @type {Object}
     */
    models: {}
  }
}
