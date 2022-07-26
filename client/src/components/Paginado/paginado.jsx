import React from "react";
import styles from './paginado.css'

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = []
  for (let x = 1; x <= Math.ceil(allDogs / dogsPerPage); x++) {
    pageNumber.push(x)
  }
  return (
    <nav>
      <ul>
        {pageNumber && pageNumber.map(number =>
        (
          <li key={number}>
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}