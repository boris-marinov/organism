const View = require('../src/view')
const Matrix = require('../src/matrix')
const data = [[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10,11,12]]
const matrix = Matrix().fromJS(data)

exports.constructor = (test) => {
  const view = View(matrix, [1, 1], 1).toJS()
  test.deepEqual(view, [[1, 2, 3], [5,6,7], [9, 10, 11]])
  
  const newView = View(matrix, [2, 1], 1).toJS()
  test.equal(matrix.get([2,1]), 7)
  test.deepEqual(newView, [[ 2, 3, 4], [6,7,8], [10,11,12]])

  const edgeView = View(matrix, [0, 0], 1).toJS()
  test.deepEqual(edgeView, [ [1, 2], [5,6] ])

  const rightEdgeView = View(matrix, [3, 0], 1).toJS()
  test.deepEqual(rightEdgeView, [ [3, 4], [7,8] ])

  test.deepEqual(View(matrix, [0, 0], 3).toJS(), data)

  test.done()
}

exports.range = (test) =>  {
  test.deepEqual( View(matrix, [0,0], 10).toJS(), data)
  test.deepEqual( View(matrix, [2,2], 10).toJS(), data)
  test.done()
}

exports.checkOffset = (test) => {
  const checkOffset = (coordinates) => {
    test.equal(View(matrix, coordinates, 1).get([0,0]), matrix.get(coordinates))
  }
  checkOffset([1,1])
  checkOffset([2,0])
  checkOffset([3,0])
  checkOffset([3,1])
  checkOffset([4,0])
  checkOffset([0,2])
  checkOffset([4,1])
  test.done()
}

const six = View(matrix, [1,1], 10)
exports.get = (test) => {
  test.equal(six.get([0, -1]), 2)
  test.equal(six.get([1, 0]), 7)
  test.equal(six.get([2, 0]), 8)
  test.equal(six.get([3, 0]), undefined)
  test.done()
}

exports.reduce = (test) => {
  const two = six.reduce((obj, cell, coordinates) => {
    if(cell ===2) {
      debugger
      return coordinates
    } else {
      return obj
    }
  }, undefined)
  test.deepEqual(two, [0,-1])
  test.done()

}
