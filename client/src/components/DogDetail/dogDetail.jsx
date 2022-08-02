import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router";
import { action_dogDetail } from '../../redux/actions/'
import styles from './dogDetail.module.css'

export default function DogDetails(props) {
  const dispatch = useDispatch();
  // console.log(props.match.match.params.id)

  const id = props.match.match.params.id;
  // console.log('id de params: ',id)
  const dog = useSelector((state) => state.detail)
  // console.log('perro', dog)


  useEffect(() => {
    dispatch(action_dogDetail(id));
  }, [dispatch])


  return (
    <div className={styles.det_backgr}>
      <Link to='/home'>
      <button className={styles.homeButton}>Home</button>
      </Link>
      
      <div className={styles.container}>
        <img src={dog.img} className={styles.image} />
        <h3>{dog.name}</h3>
        <h5>{dog.temperaments}</h5>
        <h5>{dog.average_height} cm</h5>
        <h5>{dog.average_weight} Kg</h5>
        <h5>{dog.average_lifeSpan} years</h5>
      </div>
    </div>
  )
}

