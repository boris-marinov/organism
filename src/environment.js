const {Record, Range, List} = require('immutable')
const clazz = require('persistent-class')

const environmentParams = {
  width:100,
  height:100
}

module.exports = clazz({
  constructor (userParams) {
    const params = Object.assign({}, environmentParams, userParams)
    const value = Range(0, params.width).map((row) => Range(0, params.height).map(() => null))
    return {value, params}
  },
  map (f) {
    return {value: this.value.map((row) => row.map(f))}
  },
  print () {
    
  }
})

