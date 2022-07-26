import axios from 'axios';

// Action types
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const GET_DOG_ID = 'GET_DOG_ID';
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION';
export const FILTER_ALL_TEMPS = 'FILTER_ALL_TEMPS'
export const FILTER_BY_TEMPS = 'FILTER_BY_TEMPS';

export const getAllDogs = () => {
  return async function (dispatch) {
    var allDogs = await axios.get('http://localhost:3001/dogs');
    return dispatch({
      type: GET_ALL_DOGS,
      payload: allDogs.data
    })
  }
}

export const getAllTemperaments = () => {
  return async function (dispatch) {
    var allTemps = await axios.get('http://localhost:3001/temperaments');
    return dispatch({
      type: FILTER_ALL_TEMPS,
      payload: allTemps.data
    })
  }
}

export const filterByCreation = (payload) => {
  return {
      type: FILTER_BY_CREATION,
      payload
    }
  }

  export const filterByTemps = (payload) => {
    return {
        type: FILTER_BY_TEMPS,
        payload
      }
    }


export const dogById = () => {
  return async function (dispatch) {
    var dog = await axios.get('http://localhost:3001/dogs/:id');
    return dispatch({
      type: GET_DOG_ID,
      payload: dog.data
    })
  }
}

// export const getDogByName = (name) => {
//   return async function (dispatch) {
//     var dog = await axios.get(`http://localhost:3000/dogs?name=${name}`);
//     return dispatch({
//       type: GET_DOG_DETAIL,
//       payload: dog.data
//     })
//   }
// }