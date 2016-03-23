
const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')

module.exports = clazz({
  constructor (value) {
    return {value}
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
    return this.value.get(y).get(x)
  },
  put({coordinates:[x, y], value}) {
    const newMatrix = this.value.set(y, this.value.get(y).set(x, value))
    return modify(this, {value: newMatrix})
  },
  reduce (f, id) {
    const value = this.value.reduce((obj, row, y) => {
        row.forEach((element, x) => {
          obj = f(obj, element, [x, y])
        })
        return obj
    }, id) 
    return modify(this, value)
  },
  map (f) {
    return this.reduce((matrix, value, coordinates) => matrix.put({coordinates, value: f(value, coordinates)}), this)
  },
  bounds() {
    return [this.value.get(0).size, this.value.size]
  }
})

