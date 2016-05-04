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
      },
      name: {
        required: true,
        label: 'Nombre'
      }
    },
    /**
     * Defaults by model
     * @type {Object}
     */
    models: {
      language: {
        id: {
          discard: false,
          required: true,
          maxlength: 5
        }
      }
    }
  }
}
