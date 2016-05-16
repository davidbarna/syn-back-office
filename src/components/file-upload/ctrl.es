import Config from '../../lib/config'
import Dropzone from 'dropzone'
import synAuth from 'syn-auth'

var config = null

var instances = {}

var gSession = synAuth.session.global

const DRAG_CLASS = 'syn-file-upload--dragging'

Dropzone.options.myAwesomeDropzone = false
Dropzone.autoDiscover = false

var previewTpl = require('./preview-tpl')

if (typeof previewTpl === 'function') {
  previewTpl = previewTpl()
}

class FileUploadCtrl {

  constructor (element, instanceId, opts) {
    config = config || Config.getInstance()
    instances[instanceId] = this

    this.maxFiles = Number(opts.maxFiles)
    this.element = element
    this.dropzone = null
    this.dropzoneConfig = {
      url: config.api.url + config.api.resource.upload,
      headers: {
        'access_token': gSession.get().token()
      },
      maxFilesize: 4,
      thumbnailWidth: 80,
      thumbnailHeight: 80,
      parallelUploads: 1,
      previewTemplate: previewTpl,
      previewsContainer: '.previews',
      clickable: '.fileinput-button',
      acceptedFiles: opts.acceptedFiles
    }
  }

  init () {
    this.dropzone = new Dropzone(this.element[0], this.dropzoneConfig)

    this.dropzone.on('addedfile', (file) => {
      let length = this.dropzone.files.length
      if (length > this.maxFiles) {
        let selectedFiles = this.dropzone.files.slice(length - this.maxFiles)
        this.dropzone.removeAllFiles()
        selectedFiles.forEach((file, idx) => {
          this.dropzone.addFile(file)
        })
      }
    })

    this.dropzone.on('dragover', (file) => {
      this.element.addClass(DRAG_CLASS)
    })
    this.dropzone.on('dragleave', (file) => {
      this.element.removeClass(DRAG_CLASS)
    })
    this.dropzone.on('drop', (file) => {
      this.element.removeClass(DRAG_CLASS)
    })
    this.dropzone.on('success', (file, response) => {
      file._tempFileName = response
    })
  }

  getServerFiles () {
    let files = []
    for (let file of this.dropzone.files) {
      files.push(file._tempFileName)
    }
    return files
  }

  reset () {
    this.dropzone.removeAllFiles()
  }

  destroy () {
    delete instances[this.instanceId]
  }

  static getInstance (instanceId) {
    return instances[this.instanceId] || null
  }
}

export default FileUploadCtrl
