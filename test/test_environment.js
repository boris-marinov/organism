if (global.v8debug)
  global.v8debug.Debug.setBreakOnException()
const environment = require('../src/environment')

const empty = environment({density:0, width:3, height:3},[])

exports.size = (test) => {
  test.equal(empty.toJS().length, 3, 'The environment is initialized with correct height')
  test.equal(empty.toJS()[0].length, 3, 'The environment is initialized with correct width')
  test.done()
}
exports.density = (test) => {
  const u = undefined
  const o = 1

  test.deepEqual(empty.toJS(), [[u,u,u], [u,u,u], [u,u,u]],  'The environment is initialized with correct density') 

  const fullEnv = environment({density:100, width:2, height:2},[1])
  test.deepEqual(fullEnv.toJS(), [[o,o], [o,o]], 'The environment is initialized with correct density')

  test.done()
}

const moveMe = (coordinates) => ({
  type:'mover',
  step:() => ({ action: 'follow', coordinates}),
  toString () {return 'm'}
})
const obstacle = {
  type:'obstacle',
  step:() => ({ coordinates: [0,0], action: 'noop'}),
  toString () {return 'o'}
}

exports.move = (test) => {

  const env2 = empty.set([1,1], moveMe([1,0])).step()
  test.notEqual(env2.get([2,1]), undefined, 'The environment works with trivial moving instructions')

  const env3 = empty.set([1,1], moveMe([10, 0])).step()
  test.notEqual(env2.get([2,1]), undefined, 'The environment imposes a limit on the movement of each cell')
  test.done()
}
exports.obstacles = (test) => {
  const env = empty
    .set([1,1], moveMe([10, 0]))
    .set([2,1], obstacle)

    const env2 = env.step().step()
  test.notEqual(env2.get([3,2]), undefined, 'Cells overcome obstacles')
  test.done()
}
