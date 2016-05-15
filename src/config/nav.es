import states from './states'
import models from './models'

var getModelNav = function (modelName) {
  return {
    label: models[modelName],
    state: states.list.name,
    params: { model: modelName },
    nav: {
      [modelName + 'Creation']: {
        label: '+',
        state: states.form.name,
        params: { model: modelName, id: null }
      }
    }
  }
}

export default {
  nav: {
    gestion: {
      label: 'Gestión',
      nav: {
        hotel: getModelNav('hotel'),
        lounge: getModelNav('lounge'),
        space: getModelNav('space')
      }
    },
    options: {
      label: 'Opciones',
      nav: {
        files: getModelNav('mediafile'),
        textfiles: getModelNav('textfile'),
        extra: getModelNav('extra'),
        montage: getModelNav('montage'),
        service: getModelNav('service'),
        brand: getModelNav('brand')
      }
    },
    web: {
      label: 'Web',
      nav: {
        section: getModelNav('section'),
        home: {
          label: 'Home',
          state: states.form.name,
          params: { model: 'page', id: 1 }
        }
      }
    },
    settings: {
      label: 'Settings',
      nav: {
        language: getModelNav('language'),
        country: getModelNav('country'),
        city: getModelNav('city')
      }
    }
  }
}
