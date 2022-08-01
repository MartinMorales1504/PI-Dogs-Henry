import React from 'react';
import styles from './tempCard.module.css'

export default function TempCard({temperament}) {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getAllTemperaments())
  // }, [])
  // const allTemperaments = useSelector((state) => state.temperaments)

  return (
    <div >
      <button className={styles.stempCard} type='toggle'>{temperament}</button>
    </div>
  )

}