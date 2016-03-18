const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const Matrix = require('./matrix')
const _ = require('lodash')

//Returns a random element from a list
const randomElement = (list) => list[(_.random(list.length - 1))]

const returnWithPossibility = (percentage, val) => 
   _.random(100) < percentage? val : undefined

const environmentParams = {
  width:100,
  height:100,
  density: 1
}

module.exports = clazz({
  constructor (userParams, cells) {
    const params = Object.assign({}, environmentParams, userParams)
    const value = List().setSize(params.height)
      .map((row) => List().setSize(params.width))
    const matrix = Matrix(value)
      .map(() => returnWithPossibility(params.density, randomElement(cells)))
    return {params, matrix}
  },
  step () {
    return this
    return this.matrix.map((value, x, y) => {
      const action = value.react(this.neighbours({coordinates:[x,y], range:1})) 
      return {action}
    })
  },
  toString () {
    return this.matrix.value.map((row) => {
      return row.map((cell) => cell !== undefined ? cell.toString():' ').join(' ')
    }).toJS().join('\n')
  },
  fromMatrix:lens('matrix', 'fromJS'),
  toMatrix: alias('matrix', 'toJS'),
  map: lens('matrix', 'map')
})
