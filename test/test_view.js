const View = require('../src/view')
const Matrix = require('../src/matrix')
const data = [[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10,11,12]]
const matrix = Matrix().fromJS(data)

exports.neighbours = (test) => {
  const neighbours = View(matrix, [1, 1], 1).toJS()
  test.deepEqual(neighbours, [[1, 2, 3], [5,6,7], [9, 10, 11]])
  
  const newNeighbours = View(matrix, [2, 1], 1).toJS()
  test.equal(matrix.get([2,1]), 7)
  test.deepEqual(newNeighbours, [[ 2, 3, 4], [6,7,8], [10,11,12]])

  const edgeNeighbours = View(matrix, [0, 0], 1).toJS()
  test.deepEqual(edgeNeighbours, [ [1, 2], [5,6] ])
  test.done()
}
