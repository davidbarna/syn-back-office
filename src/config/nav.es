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
        space: {
          label: 'Espacios de hotel',
          state: states.list.name,
          params: { model: 'space' },
          nav: {
            spaceCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'space', id: null }
            }
          }
        }
      }
    },
    options: {
      label: 'Opciones',
      nav: {
        files: {
          label: 'Archivos multimedia',
          state: states.list.name,
          params: { model: 'mediafile' },
          nav: {
            fileCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'mediafile', id: null }
            }
          }
        },
        textfiles: {
          label: 'Archivos de texto',
          state: states.list.name,
          params: { model: 'textfile' },
          nav: {
            textFileCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'textfile', id: null }
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
        },
        brand: {
          label: 'Marcas',
          state: states.list.name,
          params: { model: 'brand' },
          nav: {
            brandCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'brand', id: null }
            }
          }
        }
      }
    },
    web: {
      label: 'Web',
      nav: {
        section: {
          label: 'Páginas',
          state: states.list.name,
          params: { model: 'section' },
          nav: {
            sectionCreation: {
              label: '+',
              state: states.form.name,
              params: { model: 'section', id: null }
            }
          }
        },
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
        }
      }
    }
  }
}
