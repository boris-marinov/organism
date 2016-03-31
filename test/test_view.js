const View = require('../src/view')
const Matrix = require('../src/matrix')
const data = [[[1], [2], [3], [4]],
              [[5], [6], [7], [8]],
              [[9], [10],[11],[12]]]
const matrix = Matrix().fromJS(data)

const coordinates = [1, 1]
const view = View(matrix, coordinates, 1).value

exports.constructor = (test) => {
  test.equal(view.length, 8)
  const matches = view
    .map((val)=> val.cell)
    .filter((val) => val === matrix.get(coordinates)[0] )
  test.equal(matches.length, 0, 'The self element is not returned')
  test.done()
}



