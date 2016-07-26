import forms from './forms'
import grids from './grids'
import models from './models'
import nav from './nav'
import states from './states'

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
      url: 'http://my-api.com',
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
    models: models,
    nav: nav,
    states: states
  },
  preproduction: {
    _extends: 'production',
    api: {
      url: 'http://pre.my-api.com'
    },
    app: {
      name: 'BackOffice PreProd'
    }
  },
  development: {
    _extends: 'production',
    api: {
      url: 'http://localhost:3000'
    },
    app: {
      name: 'BackOffice Dev'
    }
  }
}
