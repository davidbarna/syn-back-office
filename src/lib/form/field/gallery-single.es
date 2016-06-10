import FieldGallery from './gallery'

class GallerySingleField extends FieldGallery {

  constructor (attr, conf) {
    super(attr, conf)
    this.multipleSelection = false
  }

  static parseData (data) {
    if (!!data && data[0]) {
      return { id: data[0] }
    }
    return data
  }

  static getData (data = {}) {
    if (data) {
      data = [data]
    }
    return data
  }
}

export default GallerySingleField
