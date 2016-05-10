import FieldGallery from './gallery'

class GallerySingleField extends FieldGallery {

  constructor (attr, conf) {
    super(attr, conf)
    this.multipleSelection = false
  }

  static parseData (data) {
    if (data[0]) {
      return { id: data[0] }
    }
  }

  static getData (data = []) {
    if (data.id) {
      data = [data.id]
    }
    return data
  }
}

export default GallerySingleField
