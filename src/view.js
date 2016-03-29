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
  setValue: setter('value'),
  get(coordinates) {
    return this.value.get(this.addOffset(coordinates))
  },
  put({coordinates, value}) {
    const newValue = this.value.put({coordinates: this.addOffset(coordinates), value})
    return this.setValue(newValue)
  },
  reduce (f, id) {
    return this.value.reduce((id, val, [x, y]) => {
      if (x === this.offsetX && y === this.offsetY) {
        return id
      } else {
        return f(id, val, this.removeOffset([x,y]))
      }
    }, id)
  }, 
  map (f) {
    return this.reduce((view, value, coordinates) => {
        return view.put({coordinates, value: f(value, coordinates)})
    }, this)
  },
  addOffset ([x, y]){
    return [(x + this.offsetX), (y + this.offsetY)]
  },
  removeOffset ([x, y]){
    return [(x - this.offsetX), (y - this.offsetY)]
  },
  follow (objectCoordinates) {
    return objectCoordinates  
  },
  escapeFrom (objectCoordinates) {

  },
  toJS: alias('value', 'toJS')
})

