const {Record, Range, List} = require('immutable')
const clazz = require('persistent-class')
const _ = require('lodash')

const genders = ['m', 'f']

const intellect = {
  
}

module.exports = clazz({
  constructor (genes) {
    return {
      gender: _.random(1),
      energy: 100,
      health: 100,
      age: 100,
      genes
    }
  },
  step (view) {
    return {x:1, y:1}
  },
  toString() {
    return this.genes.symbol
  }
})


