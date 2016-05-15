import forms from './forms'
import grids from './grids'
import models from './models'

export default {
  production: {
    app: {
      name: 'BackOffice',
      logo: 'imgs/logo-example.svg',
      version: '0.0.0',
      languages: {
        model: 'language',
        default: 'es-es'
      }
    },
    api: {
      url: 'http://localhost:1337',
      images: '/uploads',
      resource: {
        schema: '/api/v1/:model/schema',
        form: '/api/v1/:model/form/process',
        rest: '/api/v1/:model/:modelId',
        upload: '/back/upload',
        login: '/openback/login'
      }
    },
    forms: forms,
    grids: grids,
    models: models
  },
  development: {
    _extends: 'production',
    app: {
      name: 'BackOffice Dev'
    }
  }
}
