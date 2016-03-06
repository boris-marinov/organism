const {List, Record} = require('immutable')
const environment = require('./environment')
const _ = require('lodash')

//Returns a random element from a list
const randomElement = (list) => list.get(_.random(list.size - 1))

const organismGenes = {
  speed:60,
  life: 1,
  symbol: '*'
}

const plantGenes = {
  speed:0,
  life: 1,
  symbol: 'O'
}



const env = environment({width:10, height:10}).map(generateCell(List([plant, organism])))

debugger

//(environment) => environment
const step = (environment) = {

}

//(environment organism) => organismInput
const createInput = (environment, organism) => {
  
}
