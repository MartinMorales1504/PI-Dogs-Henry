import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getDogsByName, filterByCreation, getAllTemperaments, filterByTemps, azOrder, weightOrder } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../DogCard/Card.jsx'
import Paginado from '../Paginado/paginado.jsx';
import Nav from '../Nav/nav.jsx';
import styles from './home.module.css'
import Loading from '../Images/loading';


export default function Home() {
  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.dogs) //trae el array de 'dogs' del reducer
  const allTemperaments = useSelector((state) => state.temperaments)
  const [page, setPage] = useState(1); // setea la pagina en la que estoy
  const [dogsPerPage, setDogsPerPage] = useState(8) //perros en cada pagina
  const lastDogIndex = page * dogsPerPage
  const firstDogIndex = lastDogIndex - dogsPerPage
  const dogsInThisPage = allDogs.slice(firstDogIndex, lastDogIndex)
  const [order, setOrder] = useState('')

  const paginado = (pageNumber) => {
    setPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments())
  }, [dispatch])


  // function handleClick(event) {
  //   event.preventDefault();
  //   dispatch(getAllDogs())
  // }

  function handleCreationFilter(event) {
    dispatch(filterByCreation(event.target.value))
    setPage(1)
  }
  function handleTemperamentFilter(event) {
    dispatch(filterByTemps(event.target.value))
    setPage(1)
  }
  // function handleNameInput(event) {
  //   dispatch(getDogsByName(event.target.value))
  // }
  function handleAzOrder(event) {
    event.preventDefault()
    dispatch(azOrder(event.target.value))
    setPage(1)
    setOrder(`Ordenado ${event.target.value}`)
  }
  function handleWeightOrder(event) {
    event.preventDefault()
    dispatch(weightOrder(event.target.value))
    setPage(1)
    setOrder(`Ordenado ${event.target.value}`)
  }
  // const nextHandler = () => {

  // }

  // const prevHandler = () => {

  // }

  return (
    <div className={styles.backgr}>
      <Nav />
      <Link to='/'>
        <button>volver a LandingPage</button>
      </Link>
      {/* <input id='nameSearch' onChange={event => handleNameInput(event)} placeholder="Insert dog name"/> */}
      <div>
        {/* ORDEN ALFEBETICO Y POR PESO */}
        <select onChange={event => handleAzOrder(event)}>
          <option value='ascendente'>A-Z</option>
          <option value='descendente'>Z-A</option>
        </select>
        <select onChange={event => handleWeightOrder(event)}>
          <option value='pesados'>Mas pesados</option>
          <option value='livianos'>Mas livianos</option>
        </select>
      </div>
      <div>
        {/* FILTROS */}
        <select onChange={event => handleCreationFilter(event)}>
          <option value='ALL'>Todos</option>
          <option value='Api'>Existentes</option>
          <option value='Creados'>Creados</option>
        </select>
        {/* TEMPERAMENTOS, VER COMO TRAER TODOS */}
        <select onChange={event => handleTemperamentFilter(event)}>
          <option value='ALL'>Temperamentos</option>
          {allTemperaments.map((temp) => (
            <option value={temp.name} key={temp.id}>{temp.name}</option>
          ))}
        </select>
      </div>
            <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
        page={page}
      />
      <div className={styles.cards}>
        {
          dogsInThisPage.length ?
            dogsInThisPage && dogsInThisPage.map((dog) => {
              return <Card name={dog.name} temperaments={dog.temperaments} average_weight={dog.average_weight} img={dog.img} id={dog.id} key={dog.id} ></Card>
            }) :
            <div>
              <h3>Cargando Perros</h3>
              <Loading />
            </div>
        }
      </div>
      
    </div>
  )
}