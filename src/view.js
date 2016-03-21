const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')

module.exports = clazz({
  constructor( matrix, [x,y], range) {
    const value = matrix.slice({x: [x-1, y-1], y: [x+1, y+1]})
    return {value}
  },
  follow (objectCoordinates) {
    
  },

  escapeFrom (objectCoordinates) {

  },
  reduce: alias('value', 'reduce'),
  toJS: alias('value', 'toJS')
})

