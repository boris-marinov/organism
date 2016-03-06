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
