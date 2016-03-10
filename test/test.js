const environment = require('../src/environment')

exports.initialization = (test) => {
  const env = environment({width:2, height:2})
  test.equal(env.value.size, 2)
  test.equal(env.value.get(0).size, 2)
  test.done()
}
exports.map = (test) => {
  const env = environment({width:2, height:2}).map(() => true)
  test.equal(env.value.size, 2)
  test.equal(env.value.get(0).size, 2)
  test.equal(env.value.get(0).get(0), true)
  //test.equal(env.value.get(1).get(1), true)
  test.done()
}
const data = [[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10,11,12]]

exports.fromTo = (test) => {
  testEnv = environment().fromMatrix(data)
  test.deepEqual(testEnv.toMatrix(data), data)
  
  test.deepEqual(testEnv.slice({x: [0, 0], y: [3, 0]}).toMatrix(), [[1, 2, 3, 4]])
  test.deepEqual(testEnv.slice({x: [0, 0], y: [1, 1]}).toMatrix(), [[1, 2], [5, 6]])
  test.done()
}
