/**
 * List of allowed types for angular formly fields:
 * `key`, `fieldGroup`, `className`, `options`,
 * `templateOptions`, `wrapper`, `watcher`, `hide`,
 * `hideExpression`, `data`, `model`, `form`, `elementAttributes`
 */

class FieldAbstract {
  constructor (attr, conf) {
    if (typeof conf === 'string') conf = { key: conf }
    this.conf = conf
    attr.meta = attr.meta || {}

    this.key = this.conf.key
    this.label = this.conf.label
    this.default = this.conf.default || attr.default
    this.type = 'input'
    this.required = this.conf.required || false
  }

  getConfig () {
    return new Promise((resolve) => {
      resolve({
        key: this.key,
        type: this.type,
        validation: {
          show: true
        },
        expressionProperties: {
          'validation.show': 'form.$dirty'
        },
        templateOptions: {
          required: this.required,
          label: this.label
        },
        hideExpression: ($viewValue, $modelValue, scope) => {
          if (!this.conf.showOn) {
            return false
          }
          return !(scope.model[this.conf.showOn.key] === this.conf.showOn.value)
        }
      })
    })
  }

  static parseData (data) {
    return data
  }
  static getData (data) {
    return data
  }
}

export default FieldAbstract
