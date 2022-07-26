import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingPage.css';

export default function LandingPage() {
  return (
    <div className="container">
      <Link to='/home'>
        <button>Ingresar</button>
      </Link>
    </div>
  )
}