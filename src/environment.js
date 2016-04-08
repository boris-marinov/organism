const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const Matrix = require('persistent-matrix')
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

const cellSpeed = 1
const cellRange = 1

const sumCoordinates = ([x,y], [x1,y1]) => [(x + x1), (y + y1)]

const max = (val, max) => val > max ? max: val

const maxCoordinates =  ([x,y], maximumValue) => [max(x, maximumValue), max(y, maximumValue)]
const paths = ([x,y]) =>[[x,y], [x-1, y], [x, y-1]]

const actionHandlers = {
  attack: (environment, cell) => {},
  move:(coordinates, cell, action, environment) => {},
  mate: () => {
      
  }
}

Environment = clazz({
  matrix: Matrix([[]]),
  params: {},
  step () {
    return this.reduce((environment, cell, coordinates) => {
      if (cell !== undefined) {
        const view = View(this.matrix, coordinates, cellRange)
        const action = cell.step(view)
        const path = paths(maxCoordinates(action.coordinates, cellSpeed)).find((path) => 
          environment.get(sumCoordinates(coordinates, path)) === undefined)
        return environment.put(sumCoordinates(coordinates, path), cell)
      } else {
        return environment
      }
    }, this.map(() => undefined))
  },
  toString () {
    return this.matrix.value.map((row) => {
      return row.map((cell) => cell !== undefined ? cell.toString():' ').join(' ')
    }).toJS().join('\n')
  },
  toJS: alias('matrix', 'toJS'),
  reduce: lens('matrix', 'reduce'),
  map: lens('matrix', 'map'),
  get: alias('matrix', 'get'),
  put: alias('matrix', 'put')
})

module.exports = (userParams, cells) => {
  const params = Object.assign({}, environmentParams, userParams)
  const matrix = Matrix([[]]).empty([params.width, params.height])
    .map(() => returnWithPossibility(params.density, randomElement(cells)))
  return Environment({params, matrix})
}

module.exports.fromJS = (matrix) => Environment({matrix:Matrix(matrix)})
