const ViewBuilder = require('../src/view')
const Matrix = require('persistent-matrix')

const View = ViewBuilder(a => ({value:a}))

const data = [[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10,11,12]]
const matrix = Matrix(data)

const coordinates = [1, 1]

const mateWithBiggest = (view) => view.reduce((action, cell) => 
    action.cell.value > cell.value ? action : cell.mate()).value

exports.viewOne = (test) => {
  const view = View(matrix, coordinates, 1)
  test.deepEqual(mateWithBiggest(view), {coordinates:[1,1], cell: {value: 11}, action: 'mate'})

  test.done()
}

exports.viewTwo = (test) => {
  const view = View(matrix, coordinates, 2)
  test.deepEqual(mateWithBiggest(view), {coordinates:[2, 1], cell: {value: 12}, action: 'mate'})
  test.done()
}
