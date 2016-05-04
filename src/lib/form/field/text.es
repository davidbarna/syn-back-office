import FieldAbstract from './abstract'

class TextField extends FieldAbstract {

  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'textarea'
        // tinymce option posponed because there is no way to hide
        // tinymce when field is disabled
        // obj.type = 'tinymce'
        // obj.data = { // using data property
        //   tinymceOption: { // this will goes to ui-tinymce directive
        //     // standart tinymce option
        //     inline: false,
        //     menubar: false,
        //     statusbar: false,
        //     skin: 'lightgray',
        //     theme: 'modern',
        //     toolbar1: 'undo redo | bold italic | bullist numlist',
        //     toolbar2: 'print'
        //   }
        // }

        return obj
      })
  }
}

export default TextField
