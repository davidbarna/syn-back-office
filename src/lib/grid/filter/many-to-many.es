class FitlerManyToMany {

  /**
   * View filter factory for form arrays of objects
   * @param  {Object} conf Cell config
   * @return {Function}
   */
  static create (conf) {
    var labelProp = conf.labelProp || 'id'
    return (key, value, item) => {
      let result = []
      let cnt = 0
      for (let obj of value) {
        if (cnt > 1) {
          result.push('... (' + value.length + ')')
          break
        }
        result.push(obj[labelProp])
        cnt++
      }
      return result.join(', ')
    }
  }
}

export default FitlerManyToMany
