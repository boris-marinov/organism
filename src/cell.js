const {Record, Range, List} = require('immutable')
const {clazz, getter, setter, alias, lens, modify} = require('persistent-clazz')
const _ = require('lodash')

const genders = ['m', 'f']

const intellect = {
  
}

const Cell = clazz({
  gender:'m',
  genes:{},
  params:{
    energy: 100,
    health: 100,
    age: 100,
  },
  step (view) {
    return view.reduce((defaultAction, obj) => { 
      if (obj.cell.genes.symbol === this.genes.symbol) {
      return obj.follow()
      } else {
        return defaultAction
      }
    }, { coordinates:[0,0]})
  },
  toString() {
    return this.genes.symbol
  }
})

module.exports = (genes) => Cell({
  gender: genders[_.random(1)],
  genes,
})
