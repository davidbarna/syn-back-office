import forms from './forms'
import grids from './grids'

export default {
  production: {
    app: {
      name: 'BackOffice',
      version: '0.0.0',
      languages: {
        model: 'language',
        default: 'es-mx'
      }
    },
    api: {
      url: 'http://localhost:1337/api/v1',
      resource: {
        schema: '/:model/schema',
        form: '/:model/form/process',
        rest: '/:model/:modelId'
      }
    },
    forms: forms,
    grids: grids
  },
  development: {
    _extends: 'production',
    app: {
      name: 'BackOffice Dev'
    }
  }
}
