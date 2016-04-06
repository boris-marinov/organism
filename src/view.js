const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const Matrix = require('persistent-matrix')

const createImage = (coordinates, cell) => (cell)


const View = clazz({
  value:Matrix([[]]),
  choose (f) {
    return this.value.reduce(f,{action:'noop'})
  },
  
  toJS: alias('value', 'toJS')
})

module.exports = (matrix, [x,y], range) => {
  const value = matrix.neighbours([x,y], range)
    .reduce((list, cell, coordinates) => {
        return list.concat(createImage(coordinates, cell))
    }, [])
  return View({value})
}
