import React from "react";
import styles from './paginado.module.css'

export default function Paginado({ dogsPerPage, allDogs, paginado, page}) {
  const pageNumber = []
  for (let x = 1; x <= Math.ceil(allDogs / dogsPerPage); x++) {
    pageNumber.push(x)
  }
  function thisPage(number){
    if(page === number){
      return styles.active
    }
    return ''
  }
  return (
    <nav>
      <ul className={styles.paginado}>
        {pageNumber && pageNumber.map(number =>
        (
          <li key={number}>
            <a className={thisPage(number)} onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}