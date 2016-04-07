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
const sumCoordinates = ([x,y], [x1,y1]) => [(x + x1), (y + y1)]

const actionHandlers = {
  attack: (environment, cell) => {},
  follow:(coordinates, cell, action, environment) => {
    return environment.placeCell(coordinates, action.coordinates, cell)
  },
  avoid: (coordinates, cell, action, environment) => {},
  mate: () => {}
}

Environment = clazz({
  matrix: Matrix([[]]),
  params: {},
  step () {
    return this.reduce((environment, cell, coordinates) => {
  if (cell !== undefined) {
    const view = this.view(coordinates, 1)
    const action = cell.step(view)
    return actionHandlers[action.action](coordinates, cell, action, environment)
  } else {
    return environment
  }
}, this.map(() => undefined))
  },
  placeCell (coordinates, moveCoordinates, cell) {
    newCoordinates = sumCoordinates(coordinates, moveCoordinates) 
    const matrix = this.matrix.put(newCoordinates, cell)
    return this.assign({matrix})
  },
  view (coordinates, range) {
    return View(this.matrix, coordinates, range)
  },
  toString () {
    return this.matrix.value.map((row) => {
      return row.map((cell) => cell !== undefined ? cell.toString():' ').join(' ')
    }).toJS().join('\n')
  },
  toJS: alias('matrix', 'toJS'),
  reduce: lens('matrix', 'reduce'),
  map: lens('matrix', 'map'),
  get: alias('matrix', 'get')
})

module.exports = (userParams, cells) => {
  const params = Object.assign({}, environmentParams, userParams)
  const matrix = Matrix([[]]).empty([params.width, params.height])
    .map(() => returnWithPossibility(params.density, randomElement(cells)))
  return Environment({params, matrix})
}

module.exports.fromJS = (matrix) => Environment({matrix:Matrix(matrix)})
