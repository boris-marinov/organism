const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')

const inBounds = (matrix, [x, y]) => {
  const [boundX, boundY] = matrix.bounds()
  return  [limit(0, x, boundX), limit(0, y, boundY)]
}

const limit = (min, val, max) => val < min ? min : (val > max ? max : val)
   

module.exports = clazz({
  constructor( matrix, [x,y], range) {
    const value = matrix.slice({x: inBounds(matrix, [x-range, y-range]), y: inBounds(matrix, [x+range, y+range])})
    return {value}
  },
  follow (objectCoordinates) {
    
  },

  escapeFrom (objectCoordinates) {

  },
  reduce: alias('value', 'reduce'),
  toJS: alias('value', 'toJS')
})

