const {Record, Range, List} = require('immutable')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const _ = require('lodash')

const genders = ['m', 'f']

const intellect = {
  
}

module.exports = clazz({
  gender:'m',
  genes:{},
  params:{
    energy: 100,
    health: 100,
    age: 100,
  },
  step (view) {
    debugger
  },
  toString() {
    return this.genes.symbol
  }
})

module.exports = (genes) => Cell({
  gender: _.random(1),
  genes,
})
