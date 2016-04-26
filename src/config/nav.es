import states from './states'

export default {
  nav: {
    gestion: {
      label: 'Gestión',
      nav: {
        hotel: {
          label: 'Hoteles',
          state: states.list.name,
          params: { model: 'hotel' },
          nav: {
            hotelCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'hotel', id: null }
            }
          }
        },
        lounge: {
          label: 'Salones',
          state: states.list.name,
          params: { model: 'lounge' },
          nav: {
            loungeCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'lounge', id: null }
            }
          }
        },
        city: {
          label: 'Ciudades',
          state: states.list.name,
          params: { model: 'city' },
          nav: {
            cityCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'city', id: null }
            }
          }
        },
        country: {
          label: 'Paises',
          state: states.list.name,
          params: { model: 'country' },
          nav: {
            countryCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'country', id: null }
            }
          }
        },
        extra: {
          label: 'Extras',
          state: states.list.name,
          params: { model: 'extra' },
          nav: {
            extraCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'extra', id: null }
            }
          }
        },
        montage: {
          label: 'Montages',
          state: states.list.name,
          params: { model: 'montage' },
          nav: {
            montageCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'montage', id: null }
            }
          }
        },
        service: {
          label: 'Servicios',
          state: states.list.name,
          params: { model: 'service' },
          nav: {
            serviceCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'service', id: null }
            }
          }
        }
      }
    },
    settings: {
      label: 'Settings',
      nav: {
        language: {
          label: 'Idiomas',
          state: states.list.name,
          params: { model: 'language' },
          nav: {
            languageCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'language', id: null }
            }
          }
        },
        files: {
          label: 'Archivos',
          state: states.list.name,
          params: { model: 'mediafile' },
          nav: {
            fileCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'mediafile', id: null }
            }
          }
        }
      }
    }
  }
}
