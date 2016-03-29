const {List, fromJS, toJS} = require('immutable')
const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const Matrix = require('./matrix')
const _ = require('lodash')
const View = require('./view')

//Returns a random element from a list
const randomElement = (list) => list[(_.random(list.length - 1))]

const returnWithPossibility = (percentage, val) => 
   _.random(100) < percentage? val : []

const environmentParams = {
  width:100,
  height:100,
  density: 1
}
const sumCoordinates = ([x,y], [x1,y1]) => [(x + x1), (y + y1)]

module.exports = clazz({
  constructor (userParams, cells) {
    if (userParams === undefined) {return {}}
    const params = Object.assign({}, environmentParams, userParams)
    const value = List().setSize(params.height)
      .map((row) => List().setSize(params.width))
    const matrix = Matrix(value)
      .map(() => returnWithPossibility(params.density, [randomElement(cells)]))
    return {params, matrix}
  },
  matrix: Matrix().fromJS([[]]),
  step () {
    return this.reduce((newEnvironment, cells, coordinates) => {
      const view = this.view(coordinates, 1)
      return cells.reduce((newEnvironment, cell) => newEnvironment.placeCell(coordinates, cell.step(view), cell), newEnvironment)
    }, this.map(()=> []))
  },
  placeCell (coordinates, moveCoordinates, cell) {
    newCoordinates = sumCoordinates(coordinates, moveCoordinates) 
    const newCell = cell
    const matrix = this.matrix.put({coordinates:newCoordinates, value:this.matrix.get(newCoordinates).concat(cell)})
    return modify(this, {matrix})
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
  map: lens('matrix', 'map'),
  get: alias('matrix', 'get')
})
