
const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')

const limit = (min, val, max) => val < min ? min : (val > max ? max : val)

module.exports = clazz({
  constructor (value) {
    return {value}
  },
  fromJS (array) {
    const value = List(array).map((array) => List(array))
    return modify(this, {value})
  },
  toJS() {
    return this.value.toJS()
  },
  slice ({x:[widthFrom, heightFrom], y: [widthTo, heightTo]}){
    const newValue = this.value.slice(heightFrom, heightTo + 1)
      .map((row) => row.slice(widthFrom, widthTo + 1))
    return modify(this, {value:newValue})
  },
  neighbours ([x,y], range) {
    const bounds = this.bounds()
    const [boundX, boundY] = bounds
    const offsetX = (x < range ? range - (range - x): range)
    const offsetY = (y < range ? range - (range - y): range)

    const inBounds = ([boundX, boundY], [x, y]) => {
      return [limit(0, x, boundX), limit(0, y, boundY)]
    }
    return this.slice({x: inBounds(bounds, [x - range, y - range]), y: inBounds(bounds, [x + range, y + range])})
      .setOffset([offsetX, offsetY])
  },
  offset: [0, 0],
  setOffset: setter('offset'),
  get(coordinates) {
    const [x, y] = this.addOffset(coordinates)
    return this.value.get(y).get(x)
  },
  put({coordinates:[x, y], value}) {
    const newMatrix = this.value.set(y, this.value.get(y).set(x, value))
    return modify(this, {value: newMatrix})
  },
  reduce (f, id) {
    const value = this.value.reduce((obj, row, y) => {
        row.forEach((element, x) => {
          obj = f(obj, element, this.removeOffset([x, y]))
        })
        return obj
    }, id) 
    return value
  },
  map (f) {
    return this.reduce((matrix, value, coordinates) => matrix.put({coordinates, value: f(value, coordinates)}), this)
  },
  bounds() {
    return [this.value.get(0).size, this.value.size]
  },
  removeOffset ([x, y]) {
    const [offsetX, offsetY] = this.offset
    return [(x - offsetX), (y - offsetY)]
  },
  addOffset ([x, y]) {
    const [offsetX, offsetY] = this.offset
    return [(x + offsetX), (y + offsetY)]
  }
})

