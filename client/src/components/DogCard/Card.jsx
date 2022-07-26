import React from "react";
import styles from "./Card.css"
import { Link } from "react-router-dom";

export default function Card({ name, temperaments, img }) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{temperaments}</h5>
      <img src={img} className='image'/>
    </div>
  )
}