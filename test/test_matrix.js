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


