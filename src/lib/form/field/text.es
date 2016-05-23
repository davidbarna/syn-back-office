import FieldAbstract from './abstract'

class TextField extends FieldAbstract {

  getConfig () {
    return super.getConfig()
      .then((obj) => {
        obj.type = 'textarea'
        // tinymce option posponed because there is no way to hide
        // tinymce when field is disabled
        obj.type = 'tinymce'
        obj.data = { // using data property
          tinymceOption: { // this will goes to ui-tinymce directive
            // standart tinymce option
            inline: false,
            menubar: false,
            statusbar: false,
            cleanup: false,
            verify_html: false,
            skin: 'lightgray',
            theme: 'modern',
            plugins: 'code',
            toolbar1: 'undo redo | bold italic | bullist numlist | code',
            toolbar2: 'print'
          }
        }
        console.log(obj)

        return obj
      })
  }
}

export default TextField
