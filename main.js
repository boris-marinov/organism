const organism = {
  props: {
    speed:60,
    life: 1,
    gender:'m'
    symbol: '*'
  },
  state: {
    activity: 100,
    energy: 100,
    health: 90,
    age: 10
  },
  move (input) {
    return moveTo(input[0])
    return runFrom(input[0])
  }
}

const plant = {
  props: {
    speed:0
    life: 1,
    gender:'m'
    symbol: 'O'
  },
  state: {
    energy: 100,
    health: 90,
    age: 10
  }
}

const environmentParams = {
  density:30,
  width:100,
  height:100
}

const generateEnvironment = (lifeForms, params) => {
  
}

generateEnvironment([organism, plant], environmentParams)




//(environment) => environment
const step = (environment) = {

}

//(environment organism) => organismInput
const createInput = (environment, organism) => {
  
}
