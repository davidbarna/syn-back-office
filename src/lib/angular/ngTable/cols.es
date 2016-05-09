function htmlValue (row, col) {
  var value = row[col.field]
  if (col.meta.filter) {
    return col.meta.filter(col.field, value, row)
  }
  return value
}

export default {
  getColsConfig: function (config) {
    var cols = []
    var keys = Object.keys(config.head)
    for (let key of keys) {
      let head = config.head[key]
      let cell = config.cells[key]


      let col = {
        field: head.key,
        title: head.label,
        show: !head.discard,
        sortable: head.key,
        getValue: htmlValue,
        meta: {
          filter: cell.filter
        }
      }

      if (head.search) {
        let searchKey = head.key
        let searchType = head.searchType || 'text'

        if( head.labelProp ) {
          searchKey += '.' + head.labelProp
        }


        col.filter = { [searchKey]: searchType }
      }

      cols.push(col)
    }

    cols.push({
      title: 'Acciones',
      field: 'actions',
      show: true
    })
    return cols
  }
}
