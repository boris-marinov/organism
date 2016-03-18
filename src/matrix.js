
const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')

module.exports = clazz({
  constructor (value) {
    return {value}
  },
  neighbours({ coordinates: [x, y], range}) {
    return this.slice({x: [0, 0], y: [x+1, y+1]})
  },
  fromJS(list) {
    return modify(this, {value:fromJS(list)})
  },
  toJS() {
    return this.value.toJS()
  },
  slice ({x:[widthFrom, heightFrom], y: [widthTo, heightTo]}){
    const newValue = this.value.slice(heightFrom, heightTo + 1)
      .map((row) => row.slice(widthFrom, widthTo + 1))
    return modify(this, {value:newValue})
  },
  get([x,y]) {
    return this.value.get(x).get(y)
  },
  put({coordinates:[x, y], value}) {
    const newMatrix = value = this.value.set(x, this.value.get(x).set(y, value))
    return modify(this, {value: newMatrix})
  },
  reduce (f, id) {
    const value = this.value.reduce((obj, row, x) => {
        row.forEach((element, y) => {
          obj = f(obj, element, [x, y])
        })
        return obj
    }, id) 
    return modify(this, value)
  },
  map (f) {
    return this.reduce((matrix, value, coordinates) => matrix.put({coordinates, value: f(value, coordinates)}), this)
  }
})

