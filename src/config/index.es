import forms from './forms'
import grids from './grids'

export default {
  production: {
    app: {
      name: 'BackOffice',
      version: '0.0.0',
      languages: {
        model: 'language',
        default: 'es-es'
      }
    },
    api: {
      url: 'http://localhost:1337',
      resource: {
        schema: '/api/v1/:model/schema',
        form: '/api/v1/:model/form/process',
        rest: '/api/v1/:model/:modelId',
        upload: '/back/upload'
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
