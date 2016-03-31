const matrix = require('../src/matrix')

const data = [[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10,11,12]]

const testEnv = matrix().fromJS(data)

exports.toJS = (test) => {
  test.deepEqual(testEnv.toJS(data), data)
  test.done()
}
exports.put = (test) => {
  const env = testEnv
    .put({coordinates:[0,1], value: 'foo'})
    .put({coordinates:[1,1], value: 'bar'})

  test.equal(env.get([0,1]), 'foo')
  test.equal(env.get([1,1]), 'bar')
  test.done()
}
exports.map = (test) => {
  test.deepEqual(testEnv.map(a=>1).toJS(), [[1,1,1,1],[1,1,1,1],[1,1,1,1]])
  test.deepEqual(testEnv.map(a=>a).toJS(), data)
  test.done()
}

exports.reduce = (test) => {
  const coordinates = testEnv.reduce((env, value, coordinates)=> env.put({coordinates, value:coordinates}), testEnv)
  test.deepEqual(coordinates.get([0,1]), [0,1])
  test.done()
}

exports.slice = (test) => {
  test.equal(testEnv.get([3,0]), 4)
  test.deepEqual(testEnv.slice({x: [0, 0], y: [3, 0]}).toJS(), [[1, 2, 3, 4]])
  test.deepEqual(testEnv.slice({x: [0, 0], y: [1, 1]}).toJS(), [[1, 2], [5, 6]])
  test.done()
}

const View = (matrixx, coordinates, range) => matrixx.neighbours(coordinates, range)


exports.constructor = (test) => {
  const view = View(testEnv, [1, 1], 1).toJS()
  test.deepEqual(view, [[1, 2, 3], [5,6,7], [9, 10, 11]])
  
  const newView = View(testEnv, [2, 1], 1).toJS()
  test.equal(testEnv.get([2,1]), 7)
  test.deepEqual(newView, [[ 2, 3, 4], [6,7,8], [10,11,12]])

  const edgeView = View(testEnv, [0, 0], 1).toJS()
  test.deepEqual(edgeView, [ [1, 2], [5,6] ])

  const rightEdgeView = View(testEnv, [3, 0], 1).toJS()
  test.deepEqual(rightEdgeView, [ [3, 4], [7,8] ])

  test.deepEqual(View(testEnv, [0, 0], 3).toJS(), data)

  test.done()
}

exports.range = (test) =>  {
  test.deepEqual( View(testEnv, [0,0], 10).toJS(), data)
  test.deepEqual( View(testEnv, [2,2], 10).toJS(), data)
  test.done()
}

exports.checkOffset = (test) => {
  const checkOffset = (coordinates) => {
    test.equal(View(testEnv, coordinates, 1).get([0,0]), testEnv.get(coordinates))
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

const six = View(testEnv, [1,1], 10)
exports.get = (test) => {
  test.equal(six.get([0, -1]), 2)
  test.equal(six.get([1, 0]), 7)
  test.equal(six.get([2, 0]), 8)
  test.equal(six.get([3, 0]), undefined)
  test.done()
}
