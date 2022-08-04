import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingPage.module.css';



export default function LandingPage() {
  return (
    <div className={styles.container}>
        <Link to='/home'>
          <button className={styles.btn}>Dive into the world of Dogs</button>
        </Link>
    </div>
  )
}