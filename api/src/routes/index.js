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
  const dogs = await someDogs(name)
  res.send(dogs)
})

router.get('/dogs/:id', async (req, res) => {
  const { id } = req.params;
  const dog = await dogsById(id)
  console.log('perrito', dog)
  res.send(dog)
})

router.post('/dogs', async (req, res) => {
  const { id, name, average_height, average_weight, average_lifeSpan, temperaments} = req.body;
  let newDog = await createDog(id, name, average_height, average_weight, average_lifeSpan, temperaments )
  res.status(201).send(newDog)
})

router.get('/temperaments', async (req, res) => {
  let temps = await findDogTemperament()
  res.send(temps)
})

module.exports = router;


