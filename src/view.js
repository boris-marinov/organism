const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')


const createImage = (coordinates) => (cell) => ({coordinates, cell})

module.exports = clazz({
  constructor(matrix, [x,y], range) {
    const value = matrix.neighbours([x,y], range)
      .reduce((list, val, coordinates) => {
        const [x, y] = coordinates
        if (x === 0 && y === 0) {
          return list
        } else {
          return list.concat(val.map(createImage(coordinates)))
        }
      }, [])
    return {value}
  },
  setValue: setter('value'),
  reduce: alias('value', 'reduce'),
  follow (objectCoordinates) {
    return objectCoordinates  
  },

  escapeFrom (objectCoordinates) {

  },
  toJS: alias('value', 'toJS')
})
