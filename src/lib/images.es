import Config from './config'
var rootUrl = null

export default {
  getThumbnailPath (row) {
    if (!rootUrl) {
      let backend = Config.getInstance().backend
      rootUrl = '//' + backend.host + ':' + backend.port + '/uploads/'
    }
    return String(rootUrl + row.path).replace(/()(\.[^\.]+)/, '$1_xSmall$2')
  }
}
