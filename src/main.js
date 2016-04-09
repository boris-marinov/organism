const {List, Record} = require('immutable')
const Environment = require('./environment')
const Cell = require('./cell')


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

var env = Environment({width:100, height:100, density:1}, cells)
setInterval(() => {env = env.step(); console.log(env.toString())}, 1000)
