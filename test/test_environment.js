if (global.v8debug)
  global.v8debug.Debug.setBreakOnException()
const environment = require('../src/environment')

exports.size = (test) => {
  const env = environment({width:2, height:2},['a'])
  test.equal(env.toJS().length, 2)
  test.equal(env.toJS()[0].length, 2)
  test.done()
}
exports.density = (test) => {
  const u = []
  const o = [1]

  const fullEnv = environment({density:100, width:2, height:2},[1])
  test.deepEqual(fullEnv.toJS(), [[o,o], [o,o]])

  const emptyEnv = environment({density:0, width:2, height:2},[1])
  test.deepEqual(emptyEnv.toJS(), [[u,u], [u,u]])
  test.done()
}

exports.step = (test) => {
  const c = [{
    step:() => [1,1]
  }]
  const u = []
  const env = [[u, u, u],
               [u, c, u],
               [u, u, u]]
  const modifiedEnv = environment().fromJS(env).step()
  test.deepEqual(modifiedEnv.get([1,1]), u)
  test.deepEqual(modifiedEnv.get([2,2]), c)
  test.done()
}
