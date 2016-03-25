const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')

const inBounds = ([boundX, boundY], [x, y]) => {
  return [limit(0, x, boundX), limit(0, y, boundY)]
}

const limit = (min, val, max) => val < min ? min : (val > max ? max : val)
   

module.exports = clazz({
  constructor( matrix, [x,y], range) {
    const bounds = matrix.bounds()
    const [boundX, boundY] = bounds
    const offsetX = (x < range ? range - (range - x): range)
    const offsetY = (y < range ? range - (range - y): range)
    const value = matrix.slice({x: inBounds(bounds, [x - range, y - range]), y: inBounds(bounds, [x + range, y + range])})
    return {value, offsetX, offsetY}
  },
  get([x,y]) {
    return this.value.get([(x + this.offsetX), (y + this.offsetY)])
  },
  map (f) {
    const value = this.value.map((val, [x, y]) => f(val, [(x - this.offsetX), (y - this.offsetY)]))
    return modify(this, {value})
  },
  addOffset ([x, y]){
  },
  follow (objectCoordinates) {
    
  },
  escapeFrom (objectCoordinates) {

  },
  reduce: alias('value', 'reduce'),
  toJS: alias('value', 'toJS')
})

