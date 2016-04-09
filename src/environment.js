const {range} = require('lodash')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const Matrix = require('persistent-matrix')
const _ = require('lodash')
//TODO - real implementation
const cellToView = (a=>a)
const View = require('./view')(cellToView)

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
const cellRange = 10

const sumCoordinates = ([x,y], [x1,y1]) => [(x + x1), (y + y1)]

const isZero = ([x,y]) => (x === 0 && y === 0)

const max = (val, max) => val > max ? max: val

const maxCoordinates =  ([x,y], maximumValue) => [max(x, maximumValue), max(y, maximumValue)]

//Makes a value closer to zero - increments it if it is negative and decrements it otherwise
const dec = (val) => val>0 ? (val-1) : (val < 0 ? val+1: val )

//Generates possible positions that are on the path of a certain destination
const basePaths = ([x,y]) => 
    x===0 && y === 0 ? [] : [[x,y], [dec(x), y], [x, dec(y)] , ...basePaths([dec(x), dec(y)]) ]
    .filter(_.negate(isZero))

const incrementIfZero = (val) => val === 0 ? 1: val
//const paths = _.memoize(([x,y]) => [...basePaths([x,y]), [incrementIfZero(x), incrementIfZero(y)]])
//TODO fix this stuff in some other way
const paths = basePaths

const actionHandlers = {
  attack: (environment, cell) => {},
  move:(coordinates, cell, action, environment) => {},
  mate: () => {
      
  }
}

Environment = clazz({
  matrix: Matrix([[]]),
  params: {},
  cellSpeed, 
  cellRange, 
  step () {
    return this.reduce((environment, cell, coordinates) => {
      if (cell !== undefined) {
        const action = this.cellAction(coordinates, cell)
        const aim = action.coordinates || [0,0]
        const path = isZero(aim) ? aim : paths(maxCoordinates(aim, cellSpeed)).find((path) => {
          const newCoordinates = sumCoordinates(coordinates, path)
          const oldOccupier = this.get(newCoordinates)
          const newOccupier = environment.get(newCoordinates)
          return newOccupier === undefined && (oldOccupier === undefined || !isZero(this.cellAction(newCoordinates, oldOccupier).coordinates))
        }) || [0,0]
        return environment.put(sumCoordinates(coordinates, path), cell)
      } else {
        return environment
      }
    }, this.map(() => undefined))
  },

  cellAction(coordinates, cell) {
    const view = View(this.matrix, coordinates, cellRange)
    return cell.step(view)
  },
  toString () {
    return this.matrix.value.map((row) => {
      return '|' + row.map((cell) => cell !== undefined ? cell.toString():' ').join(' ') + '|'
    }).join('\n') + '\n' + this.matrix.value[0].map(() => '-').join('-')

  },
  toJS: alias('matrix', 'toJS'),
  reduce: alias('matrix', 'reduce'),
  map: lens('matrix', 'map'),
  get: alias('matrix', 'get'),
  put: lens('matrix', 'put'),
  set: lens('matrix', 'set')
})

module.exports = (userParams, cells) => {
  const params = Object.assign({}, environmentParams, userParams)
  const matrix = Matrix([[]]).empty([params.width, params.height])
    .map(() => returnWithPossibility(params.density, randomElement(cells)))
  return Environment({params, matrix})
}

module.exports.fromJS = (matrix) => Environment({matrix:Matrix(matrix)})
