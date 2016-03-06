const {List, Record} = require('immutable')
const Environment = require('./environment')
const Cell = require('./cell')
const _ = require('lodash')

//Returns a random element from a list
const randomElement = (list) => list[(_.random(list.length - 1))]

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

const cells = [organismGenes, plantGenes].map(Cell)


const env = Environment({width:10, height:10}).map(()=>randomElement(cells)).toString()
console.log(env)

//(environment) => environment
const step = (environment) = {

}

//(environment organism) => organismInput
const createInput = (environment, organism) => {
  
}
