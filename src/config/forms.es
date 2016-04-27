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
