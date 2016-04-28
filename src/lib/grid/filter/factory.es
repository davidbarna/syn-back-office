/**
 * Creates custom filters for grid cells
 */
import ManyToOne from './many-to-one'
import ManyToMany from './many-to-many'
import Text from './text'

class GridFiltersFactory {

  /**
   * Creates a filter according to field config
   * @param  {Object} conf
   * @return {Function}
   */
  static create (conf) {
    if (conf.filter) {
      return conf.filter
    }
    if (conf.collection) {
      return ManyToMany.create(conf)
    }
    if (conf.model) {
      return ManyToOne.create(conf)
    }
    if (conf.type === 'text') {
      return Text.create(conf)
    }
  }
}

export default GridFiltersFactory
