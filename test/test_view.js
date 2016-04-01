const View = require('../src/view')
const Matrix = require('persistent-matrix')
const data = [[[1], [2], [3], [4]],
              [[5], [6], [7], [8]],
              [[9], [10],[11],[12]]]
const matrix = Matrix(data)

const coordinates = [1, 1]
const view = View(matrix, coordinates, 1)

exports.constructor = (test) => {
  //const biggestNum = view.choose((currentEl, newEl) => if(currentEl > newEl) {return currentEl
  //test.equal(biggestNum, [1,1])

  test.done()
}



