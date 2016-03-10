const {Record, Range, List} = require('immutable')
const clazz = require('persistent-class').create
const _ = require('lodash')

const genders = ['m', 'f']

const intellect = {
  
}

module.exports = clazz({
  constructor (genes) {
    return this.set({
      gender: _.random(1),
      genes,
      params:{
        energy: 100,
        health: 100,
        age: 100,
      }
    })
  },
  step (view) {
    return [ ]
  },
  toString() {
    return this.genes.symbol
  }
})

