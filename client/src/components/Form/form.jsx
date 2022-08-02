import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './form.module.css'
import TempCard from "../TempCard/tempCard.jsx";
import { createDog, getAllTemperaments } from '../../redux/actions'



function validate(input) {
  let errors = {}
  if (input.name.length < 2) {
    errors.name = 'Name must have more than 1 character';
  } else if (input.average_height < 1 || input.average_height > 150) {
    errors.average_height = 'height must be greater than 1 and less than 150'
  } else if (input.average_weight < 1 || input.average_weight > 100) {
    errors.average_weight = 'weight must be greater than 1 and less than 100'
  }
  else if (input.average_lifeSpan < 1 || input.average_lifeSpan > 20) {
    errors.average_lifeSpan = 'lifespan must be greater than 1 and less than 20'
  } else if ( input.temperaments.length > 7 ){
    errors.average_lifeSpan = 'dog must have between 0 and 7 temperaments'
  }


  return errors
}



export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperaments = useSelector((state) => state.temperaments)
  const [errors, setErrors] = useState({})

  // console.log(allTemperaments[0].name)
  const [input, setInput] = useState({
    name: '',
    average_height: '',
    average_weight: '',
    average_lifeSpan: '',
    img: '',
    temperaments: [],
  })

  useEffect(() => {
    dispatch(getAllTemperaments())
  }, [dispatch])

  function handleChange(event) {
    console.log(input)
    setInput({
      ...input,
      [event.target.name]: event.target.value // target.name nos ayuda a indicar a que parte del estado modifica cada input
    })
    setErrors(validate({
      ...input,
      [event.target.name]: event.target.value
    }))
  }

  function handleSelect(event) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, event.target.value] // target.name nos ayuda a indicar a que parte del estado modifica cada input
    })
    console.log(input)
  }

  function handleDelete(event) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(temp => temp !== event)
    })
  }

  function handleSubmit(event) {
    if (Object.keys(errors).length === 0) {
      console.log('adentro')
      event.preventDefault();
      dispatch(createDog(input))
      alert("Thanks for caring of your dog!");
      setInput({
        name: '',
        average_height: '',
        average_weight: '',
        average_lifeSpan: '',
        img: '',
        temperaments: [],
      })
      return setTimeout(() => {
        history.push('/home')
      }, 1000)
    }
    alert(errors[Object.keys(errors)[0]])
  }


  return (
    <div className={styles.backImg}>
      <Link to='/home'>
        <button className={styles.buttonHome}>Home</button>
      </Link>
      <h2 className={styles.title} >Create your own dog</h2>
      <div className={styles.formContainer}>
        <form>
          <div>
            <label>Name:
              <input placeholder="dog's name" onChange={handleChange} type="text" value={input.name} name='name'  />
              {/* {errors.name && (<p className="error">{errors.name}</p>)} */}
            </label>
          </div>
          <div>
            <label>Height:
              <input placeholder="dog's Height" onChange={(event) => handleChange(event)} type="number" value={input.average_height} name='average_height'  />
              {/* {errors.average_height && (<p className="error">{errors.average_height}</p>)} */}
            </label>
          </div>
          <div>
            <label>Weight:
              <input placeholder="dog's Weight" onChange={(event) => handleChange(event)} type="number" value={input.average_weight} name='average_weight'  />
              {/* {errors.average_weight && (<p className="error">{errors.average_weight}</p>)} */}
            </label>
          </div>
          <div>
            <label>Lifespan:
              <input placeholder="dog's LifeSpan" onChange={(event) => handleChange(event)} type="number" value={input.average_lifeSpan} name='average_lifeSpan'  />
              {/* {errors.average_lifeSpan && (<p className="error">{errors.average_lifeSpan}</p>)} */}
            </label>
          </div>
          <div>
            <label>Image:
              <input placeholder="Image link" onChange={(event) => handleChange(event)} type="url" value={input.img} name='img' />
            </label>
          </div>
          <label>Temperaments:
          </label>
          <select onChange={(event) => handleSelect(event)}>
            {allTemperaments.map((temp) => (
              <option value={temp.name} key={temp.id}>{temp.name}</option>
            ))}
          </select>
          <ul className={styles.sinPunto}>
            {input.temperaments.map(temp => <li key={temp}>{temp} <button className={styles.deleteButton} onClick={() => handleDelete(temp)}>X</button></li>,)}
          </ul>
        </form>
      </div>
      <button className={styles.buttonSubmit} onClick={(event) => handleSubmit(event)} type="submit">Register!</button>
    </div>
  )
}


// name: '',
// average_height: null,
// average_weight: null,
// average_lifeSpan: null,
// img: '',
// temperaments: [],



