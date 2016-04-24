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
      uri: {
        label: 'Url amigable'
      },
      name: {
        label: 'Nombre',
        required: true
      },
      country: {
        required: true,
        labelProp: 'details.name'
      },
      city: {
        required: true,
        labelProp: 'details.name'
      },
      cities: {
        labelProp: 'details.name'
      }
    },
    /**
     * Defaults by model
     * @type {Object}
     */
    models: {
      language: {
        id: {
          discard: false
        }
      },
      country: {
        name: {
          label: 'Nombre del pais'
        }
      },
      service: {
        hotel: {
          discard: true
        }
      }
    }
  }
}
