import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, filterByCreation, getAllTemperaments, filterByTemps } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../DogCard/Card.jsx'
import Paginado from '../Paginado/paginado.jsx';
import styles from './home.css'


export default function Home() {
  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.dogs) //trae el array de 'dogs' del reducer
  const allTemperaments = useSelector((state) => state.temperaments)
  const [page, setPage] = useState(1); // setea la pagina en la que estoy
  const [dogsPerPage, setDogsPerPage] = useState(8) //perros en cada pagina
  const lastDogIndex = page * dogsPerPage
  const firstDogIndex = lastDogIndex - dogsPerPage
  const dogsInThisPage = allDogs.slice(firstDogIndex, lastDogIndex)

 
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
  }
  function handleTemperamentFilter(event) {
    dispatch(filterByTemps(event.target.value))
  }

  // const nextHandler = () => {

  // }

  // const prevHandler = () => {

  // }

  return (
    <div className='backgr'>
      <Link to='/'>
        <button>volver a LandingPage</button>
      </Link>
      <div>
        {/* ORDEN ALFEBETICO Y POR PESO */}
        <select >
          <option value='ascendente'>A-Z</option>
          <option value='descendente'>Z-A</option>
        </select>
        <select >
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
      />
      {
        dogsInThisPage && dogsInThisPage.map((dog) => {
          return <Card name={dog.name} temperaments={dog.temperaments} img={dog.img} key={dog.id} className='cards'></Card>
        })
      }
      {/* <button onClick={e => nextHandler(e)}>prev</button>
      <button>next</button> */}
    </div>
  )
}