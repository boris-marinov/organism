const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')


const createImage = (coordinates) => (cell) => (cell)

module.exports = clazz({
  constructor(matrix, [x,y], range) {
    const value = matrix.neighbours([x,y], range)
      .reduce((list, val, coordinates) => {
          return list.concat(val.map(createImage(coordinates)))
      }, [])
    return {value}
  },
  setValue: setter('value'),
  choose (f) {
    return this.value.reduce(f,{action:'noop'})
  },
  toJS: alias('value', 'toJS')
})
