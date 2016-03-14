const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')
const clazz = require('persistent-class').create
const matrix = require('./matrix')
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

const lens = (key, fn) =>
  function(...args) {
    const modification = {}
    modification[key] = this[key][fn](...args)
    return this.set(modification)
  }

const alias = (key, fn) =>
  function(...args) {
    return this[key][fn](...args)
  }

module.exports = clazz({
  constructor (userParams) {
    const params = Object.assign({}, environmentParams, userParams)
    const value = List().setSize(params.height)
      .map((row) => List().setSize(params.width))
    const matrix = Matrix(value)
      .map(() => returnWithPossibility(density, randomElement(cells)))
    return this.set({params, matrix})
  },
  step () {
    return this
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
