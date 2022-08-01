import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getDogsByName } from '../../redux/actions';
import styles from './nav.module.css'

export default function Nav({ dogName }) {
  const dispatch = useDispatch()
  const [searchBar, setSearchBar] = useState('') //lo que va en el input

  function handleEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      dispatch(getDogsByName(searchBar))
    }
  }

  function handleNameInput(event) {
    event.preventDefault()
    setSearchBar(event.target.value)
  }

  function submitButton(event) {
    event.preventDefault()
    dispatch(getDogsByName(searchBar))
  }
  return (
    <nav className={styles.navBar}>
      
      <div className={styles.container}>
        <input className={styles.input} type='text' id='nameSearch' onChange={event => handleNameInput(event)} onKeyUp={event => handleEnter(event)} placeholder="Insert dog name" />
        {/* <Link to='/home'> */}
        <button className={styles.searchButton} onClick={event => submitButton(event)}>Search</button>
        {/* </Link> */}
        <Link to='/dogs'>
          <button className={styles.createButton}>Create your own dog</button>
        </Link>
      </div>
      
    </nav>
  )
}