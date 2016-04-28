class FitlerManyToOne {

  /**
   * View filter factory for object values
   * @param  {Object} conf Cell config
   * @return {Function}
   */
  static create (conf) {
    var labelProp = conf.labelProp || 'id'
    return (key, value, item) => {
      return value[labelProp]
    }
  }
}

export default FitlerManyToOne
