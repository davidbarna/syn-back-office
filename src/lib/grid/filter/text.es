var maxLength = 30

class FilterText {

  /**
   * View filter factory for text values
   * @param  {Object} conf Cell config
   * @return {Function}
   */
  static create (conf) {
    return (key, value, item) => {
      if (typeof value !== 'string') {
        return value
      }
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + '...'
      }
      return value
    }
  }
}

export default FilterText
