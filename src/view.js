const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const Matrix = require('persistent-matrix')

const symbols = ['a','b','c']

const Action = clazz({
  cell: {},
  coordinates:[0,0],
  action: 'noop',
  attack() { return this.assign({action: 'attack'}) },
  avoid() { return this.assign({action: 'avoid'}) },
  follow() { return this.assign({action: 'follow'}) },
  mate() { return this.assign({action: 'mate'}) },
  communicate(symbol) { return this.assign({action: 'communicate', symbol}) }
})

const createAction = (cellImage) => (coordinates, cell) => Action({coordinates, cell:cellImage(cell)})

const View = clazz({
  value:[],
  reduce: lens('value', 'reduce')
})

module.exports = (cellImage) => (matrix, [x,y], range, message) => {
  const Action = createAction(cellImage)
  const value = matrix.neighbours([x,y], range)
    .reduce((list, cell, coordinates) => {
      return list.concat(Action(coordinates, cell))
    }, [])
  return View({value})
}
