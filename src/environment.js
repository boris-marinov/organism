const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const Matrix = require('./matrix')
const _ = require('lodash')
const View = require('./view')

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
    if (userParams === undefined) {return {}}
    const params = Object.assign({}, environmentParams, userParams)
    const value = List().setSize(params.height)
      .map((row) => List().setSize(params.width))
    const matrix = Matrix(value)
      .map(() => returnWithPossibility(params.density, randomElement(cells)))
    return {params, matrix}
  },
  matrix: Matrix().fromJS([[]]),
  step () {
    return this
    return this.reduce((newEnvironment, value, coordinates) => {
      const moveCoordinates = value.react(this.view(coordinates, 1))
      return newEnvironment.placeCell(coordinates, moveCoordinates, cell)
    })
  },
  placeCell (coordinates, moveCoordinates, cell) {
         
  },
  view (coordinates, range) {
    return View(this.matrix, coordinates, range)
  },
  toString () {
    return this.matrix.value.map((row) => {
      return row.map((cell) => cell !== undefined ? cell.toString():' ').join(' ')
    }).toJS().join('\n')
  },
  fromJS:lens('matrix', 'fromJS'),
  toJS: alias('matrix', 'toJS'),
  reduce: lens('matrix', 'reduce'),
  get: alias('matrix', 'get')
})
