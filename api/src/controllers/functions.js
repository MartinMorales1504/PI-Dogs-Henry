const axios = require('axios')
const Dog = require('../models/Dog')
const Temperaments = require('../models/Temperaments')



const apiDogs = async (name) => {
  const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
  const apiInfo = apiUrl.data.map(dog => {
    let avgHeight = null
    let avgWeight = null
    let avgLifeSpan = null
    let varH = dog.height.metric.split('-')
    let varW = dog.weight.metric.split('-')
    let varLS = dog.life_span.split('-')
    if (varH.length > 1) {
      avgHeight = (parseInt(varH[0]) + parseInt(varH[1])) / 2
    } else {
      avgHeight = parseInt(varH[0])
    }
    if (varW.length > 1) {
      avgWeight = (parseInt(varW[0]) + parseInt(varW[1])) / 2
    } else {
      avgWeight = parseInt(varW[0])
    } 
    if (varLS.length > 1) {
      avgLifeSpan = (parseInt(varLS[0]) + parseInt(varLS[1])) / 2
    } else {
      avgLifeSpan = parseInt(varLS[0])
    }

    return {
      id: dog.id,
      name: dog.name,
      average_height: Math.round(avgHeight),
      average_weight: Math.round(avgWeight),
      average_lifeSpan: Math.round(avgLifeSpan),
      temperaments: dog.temperament
    }
  })

  if (name) {
    let dogs = apiInfo.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
    if (!dogs.length) {
      return `No existe ningun perro que se llame ${name}`
    }
    return dogs
  }
  return apiInfo
}


const dogsById = async (id) => {
  const dogs = await apiDogs();
  let dog = dogs.find(d => d.id === id)
  if (!dog) {
    return `No existe ningun perro con id numero ${id}`
  } else {
    return dog
  }
}

// const dogsByName = async (name) => {
//   let dogs = await apiDogs()
//   let dog = dogs.find(d => d.name === name)
//   if(!dog){
//     throw new Error(`No existe ningun perro que se llame ${name}`)
//   }else{
//     return dog
//   }
// }

module.exports = { apiDogs, dogsById }