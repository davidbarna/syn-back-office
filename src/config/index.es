export default {
  production: {
    app: {
      name: 'BackOffice',
      version: '0.0.0'
    },
    api: {
      url: 'http://path/to/api',
      resource: {
        schema: 'schema/{{ model }}'
      }
    }
  },
  development: {
    _extends: 'production',
    app: {
      name: 'BackOffice Dev'
    }
  }
}
