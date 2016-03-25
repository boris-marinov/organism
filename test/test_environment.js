const environment = require('../src/environment')

exports.size = (test) => {
  const env = environment({width:2, height:2},['a'])
  test.equal(env.toJS().length, 2)
  test.equal(env.toJS()[0].length, 2)
  test.done()
}
exports.density = (test) => {
  const fullEnv = environment({density:100, width:2, height:2},[1])
  test.deepEqual(fullEnv.toJS(), [[1,1], [1,1]])

  const emptyEnv = environment({density:0, width:2, height:2},[1])
  test.deepEqual(emptyEnv.toJS(), [[undefined,undefined], [undefined,undefined]])
  test.done()
}

exports.step = (test) => {
  const c = {
    step:() => [1,1]
  }
  const u = undefined
  const env = [[u, u, u],
               [u, c, u],
               [u, u, u]]
  test.equal(environment().fromJS(env).step().get([1,1]), u)
  test.equal(environment().fromJS(env).step().get([2,2]), c)
  test.done()
}




