const { Router } = require('express');
const Dog = require('../models/Dog')
const Temperaments = require('../models/Temperaments')
const { someDogs, dogsById, createDog, findDogTemperament} = require('../controllers/functions.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// const allApiDogs = apiDogs()


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get('/dogs', async (req, res) => {
//   const { name } = req.query;
//   try {
//     let dog = await dogsByName(name)
//     res.json(dog)
//   } catch (error) {
//     res.status(404).send(error)
//   }
// })

router.get('/dogs', async (req, res) => {
  const { name } = req.query
  
  try {
    const dogs = await someDogs(name)
    res.status(200).send(dogs)
  } catch (error) {
    res.status(404).send(error.message)
  }

})

router.get('/dogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dog = await dogsById(id)
    console.log('perrito', dog)
    res.send(dog)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.post('/dogs', async (req, res) => {
  const { id, name, average_height, average_weight, average_lifeSpan, temperaments, img } = req.body;
  try {
    let newDog = await createDog(id, name, average_height, average_weight, average_lifeSpan, temperaments, img )
    res.status(201).send(newDog)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/temperaments', async (req, res) => {
  let temps = await findDogTemperament()
  res.status(200).send(temps)
})

module.exports = router;


