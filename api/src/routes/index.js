const { Router } = require('express');
const Dog = require('../models/Dog')
const Temperaments = require('../models/Temperaments')
const axios = require('axios')
const { apiDogs, dogsById } = require('../controllers/functions.js')
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
  const dogs = await apiDogs(name)
  res.send(dogs)
})

router.get('/dogs/:id', async (req, res) => {
  const { id } = req.params;
  const dog = await dogsById(parseInt(id))
  console.log('perrito', dog)
  res.send(dog)
})



module.exports = router;


