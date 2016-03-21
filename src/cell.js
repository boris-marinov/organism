const {Record, Range, List} = require('immutable')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
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
    return view.goTo(view[0])
  },
  toString() {
    return this.genes.symbol
  }
})

