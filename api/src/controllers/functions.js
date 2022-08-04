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
    let varWImperial = dog.weight.imperial.split('–')
    let varLS = dog.life_span.split('-')
    if (varH.length > 1) {
      avgHeight = (parseInt(varH[0]) + parseInt(varH[1])) / 2
    } else {
      avgHeight = parseInt(varH[0])
    }
    if (varW[0] !== 'NaN') {
      if (varW.length > 1) {
        if (varW[0] === 'NaN ') {
          avgWeight = parseInt(varW[1])
        } else {
          avgWeight = (parseInt(varW[0]) + parseInt(varW[1])) / 2
        }
      } else {
        avgWeight = parseInt(varW[0])
      }
    }

    else if (varWImperial[0] !== 'NaN') {
      if (varWImperial.length > 1) {
        avgWeight = (parseInt(varWImperial[0]) + parseInt(varWImperial[1])) / 2 * 0.453592
      } else {
        avgWeight = parseInt(varWImperial[0]) * 0.453592
      }
    } else {
      avgWeight = NaN
    }

    if (dog.id === 232) {
      console.log('metric: ', varW)
      console.log('typeof varW[0]', typeof varW[0]);
      console.log('average buscado: ', dog.avgWeight)
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
    }
  })

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
      throw new Error(`No existe ningun perro que se llame ${name}`)
    }
    return dogs
  }
  return allD
}

const dogsById = async (id) => {
  const dogs = await allDogs();
  let dog = dogs.find(d => d.id === id)
  if (!dog) {
    throw new Error (`No existe ningun perro con id ${id}`)
  } else {
    return dog
  }
}

const createDog = async (id, name, average_height, average_weight, average_lifeSpan, temperaments, img) => {
  await findDogTemperament()
  if (!name) {
    throw new Error('falta agregar nombre, es un dato obligatorio!')
  }
  if (!average_height) {
    throw new Error('falta agregar altura, es un dato obligatorio!')
  }
  if (!average_weight) {
    throw new Error('falta agregar peso, es un dato obligatorio!')
  }
  if (img === ''){
    img = undefined
  }
  const obj = {
    id,
    name,
    average_height,
    average_weight,
    average_lifeSpan,
    img
  }

  let newDog = await Dog.create(obj);
  // let toAddTemps = temperaments.split(', ')
  toAddTemps = temperaments
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


  let setTemp = new Set(splittedTemp.flat()) // el set saca los repetidos y el flat los saca del array interno
  for (element of setTemp) {
    if (element) await Temperaments.findOrCreate({
      where: { name: element }
    })
  }

  let dbTemperament = await Temperaments.findAll();
  dbTemperament = dbTemperament.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }
    if (b.name > a.name) {
      return -1
    }
    return 0
  })
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