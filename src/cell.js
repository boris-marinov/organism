const {Record, Range, List} = require('immutable')
const clazz = require('persistent-class')
const _ = require('lodash')

const genders = ['m', 'f']

const intellect = {
  
}

module.exports = clazz({
  constructor (genes) {
    const gender = _.random(1),
    const energy = 100
    const health = 100
    const age = 100
    return {genes, gender, energy, health, age}
  },
  step (view) {
     
  }
})


