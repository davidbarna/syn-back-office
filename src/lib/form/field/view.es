import FieldAbstract from './abstract'

class ViewField extends FieldAbstract {

  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'view'
        obj.className = 'field-view'
        return obj
      })
  }

}

export default ViewField
