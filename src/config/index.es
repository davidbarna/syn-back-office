import forms from './forms'

export default {
  production: {
    app: {
      name: 'BackOffice',
      version: '0.0.0'
    },
    api: {
      url: 'http://localhost:1337',
      resource: {
        schema: '/schema/:model',
        form: '/form/process/:model',
        rest: '/api/v1/:model/:modelId'
      }
    },
    forms: forms
  },
  development: {
    _extends: 'production',
    app: {
      name: 'BackOffice Dev'
    }
  }
}
