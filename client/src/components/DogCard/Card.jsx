import React from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";

export default function Card({ name, temperaments, average_weight, img, id }) {
  // function handleDetail(){

  // }
  
  
  return (
    
    <div className={styles.card}>
      <Link to={'/dogs/' + id} >
      <img src={img} className={styles.image} />
      </Link>
      <div className={styles.cardText}>
      <h3>{name}</h3>
      <h5>{temperaments}</h5>
      <h5>{average_weight} Kg</h5>
      </div>
    </div>
    
  )
}