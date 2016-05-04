class FilterBoolean {

  /**
   * View filter factory for boolean values
   * @param  {Object} conf Cell config
   * @return {Function}
   */
  static create (conf) {
    return (key, value, item) => {
      if (value) {
        return 'Sí'
      } else {
        return 'No'
      }
    }
  }
}

export default FilterBoolean
