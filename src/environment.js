const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')

const clazz = require('persistent-class').create
const environmentParams = {
  width:100,
  height:100
}

module.exports = clazz({
  constructor (userParams) {
    const params = Object.assign({}, environmentParams, userParams)
    const value = List().setSize(params.height).map((row) => List().setSize(params.width).map(() => null))
    return this.set({value, params})
  },
  getNeighbours({ coordinates: [x, y], range}){
    return this.slice({x: [x-1, y-1], y: [x+1, y+1]})
  },
  fromMatrix(list) {
    return this.set({value:fromJS(list)})
  },
  toMatrix() {
    return this.value.toJS()
  },
  slice ({x:[widthFrom, heightFrom], y: [widthTo, heightTo]}){
    const newValue = this.value.slice(heightFrom, heightTo + 1).map((row) => row.slice(widthFrom, widthTo + 1))
    return this.set({value:newValue})
  },
  map (f) {
    return this.set({value: this.value.map((row) => row.map(f))})
  },
  step () {
    return this
  },
  toString () {
    return this.value.map((row) => {
      return row.map((cell) => cell !== undefined ? cell.toString():' ').join(' ')
    }).toJS().join('\n')
  },
})

