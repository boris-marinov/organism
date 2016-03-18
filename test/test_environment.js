const environment = require('../src/environment')

exports.size = (test) => {
  const env = environment({width:2, height:2},['a'])
  test.equal(env.toMatrix().length, 2)
  test.equal(env.toMatrix()[0].length, 2)
  test.done()
}
exports.density = (test) => {
  const fullEnv = environment({density:100, width:2, height:2},[1])
  test.deepEqual(fullEnv.toMatrix(), [[1,1], [1,1]])

  const emptyEnv = environment({density:0, width:2, height:2},[1])
  test.deepEqual(emptyEnv.toMatrix(), [[undefined,undefined], [undefined,undefined]])
  test.done()
}
