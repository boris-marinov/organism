const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')

const inBounds = ([boundX, boundY], [x, y]) => {
  return [limit(0, x, boundX), limit(0, y, boundY)]
}

const limit = (min, val, max) => val < min ? min : (val > max ? max : val)
   

module.exports = clazz({
  constructor( matrix, [x,y], range) {
    const bounds = matrix.bounds()
    const [boundX, boundY] = bounds
    const offsetX = (x === 0 ? x : range)
    const offsetY = (y === 0 ? y : range)
    const value = matrix.slice({x: inBounds(bounds, [x - range, y - range]), y: inBounds(bounds, [x + range, y + range])})
    return {value, offsetX, offsetY}
  },
  get([x,y]) {
    debugger
    return this.value.get([(x + this.offsetX), (y + this.offsetY)])
  },
  follow (objectCoordinates) {
    
  },
  escapeFrom (objectCoordinates) {

  },
  reduce: alias('value', 'reduce'),
  toJS: alias('value', 'toJS')
})

