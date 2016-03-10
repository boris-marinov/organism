const {List, Record} = require('immutable')
const Environment = require('./environment')
const Cell = require('./cell')
const _ = require('lodash')

//Returns a random element from a list
const randomElement = (list) => list[(_.random(list.length - 1))]

const returnWithPossibility = (percentage, val) => 
   _.random(100) < percentage? val : undefined

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

const debug = (val)=> {debugger; console.log(val);return val}

const environment = (width, height, density) =>
  Environment({width, height})
   .map(() => returnWithPossibility(density, randomElement(cells)))


var env = environment(40, 40, 3)
setInterval(() => {env = env.step(); console.log(env.toString())}, 1000)


