const axios = require('axios')
const { Dog, Temperaments } = require('../db')
const { DB_API_KEY } = process.env;

const apiDogs = async () => {
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
      id: dog.id.toString(),
      name: dog.name,
      average_height: Math.round(avgHeight),
      average_weight: Math.round(avgWeight),
      average_lifeSpan: Math.round(avgLifeSpan),
      temperaments: dog.temperament,
      img: dog.image.url,
      createdInDataBase: false
    }
  })
  return apiInfo
}

const dbDogs = async () => {
  let dbInfo = await Dog.findAll({
    include: {
      model: Temperaments,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }
  })
  let dbdogs = dbInfo.map(dog => {
    let temps = dog.temperaments.map(t => t.name).join(', ')
    return {
    id: dog.id,
    name: dog.name,
    average_height: dog.average_height,
    average_weight: dog.average_weight,
    average_lifeSpan: dog.average_lifeSpan,
    temperaments: temps,
    img: dog.img,
    createdInDataBase: dog.createdInDataBase
  }})

  return dbdogs
}

const allDogs = async () => {
  return (await apiDogs()).concat(await dbDogs())
}

const someDogs = async (name) => {
  let allD = await allDogs()
  if (name) {
    let dogs = allD.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
    if (!dogs.length) {
      return `No existe ningun perro que se llame ${name}`
    }
    return dogs
  }
  return allD
}

const dogsById = async (id) => {
  const dogs = await allDogs();
  let dog = dogs.find(d => d.id === id)
  if (!dog) {
    return `No existe ningun perro con id numero ${id}`
  } else {
    return dog
  }
}

const createDog = async (id, name, average_height, average_weight, average_lifeSpan, temperaments) => {
  await findDogTemperament()
  if (!name) {
    return 'falta agregar nombre, es un dato obligatorio!'
  }
  if (!average_height) {
    return 'falta agregar altura, es un dato obligatorio!'
  }
  if (!average_weight) {
    return 'falta agregar peso, es un dato obligatorio!'
  }
  const obj = {
    id,
    name,
    average_height,
    average_weight,
    average_lifeSpan
  }
  
  let newDog = await Dog.create(obj);
  let toAddTemps = temperaments.split(', ')
  toAddTemps.forEach(async (temp) => {
    let dogTemp = await Temperaments.findAll({
      where: { name: temp }
    })
    newDog.addTemperament(dogTemp)
  })
  return newDog
}

const findDogTemperament = async () => {
  const apiTemperament = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`);
  let temperament = apiTemperament.data.map(d => d.temperament ? d.temperament : '');
  let splittedTemp = temperament.map(d => d.split(', '))


  let setTemp = new Set(splittedTemp.flat()) // el set saca los repetidos y el flat los saca del array
  for (element of setTemp) {
    if (element) await Temperaments.findOrCreate({
      where: { name: element }
    })
  }

  let dbTemperament = await Temperaments.findAll();
  return dbTemperament
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



module.exports = { someDogs, dogsById, createDog, findDogTemperament }