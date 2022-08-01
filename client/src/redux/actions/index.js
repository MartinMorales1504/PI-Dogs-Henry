import axios from 'axios';

// Action types
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME'
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION';
export const FILTER_ALL_TEMPS = 'FILTER_ALL_TEMPS'
export const FILTER_BY_TEMPS = 'FILTER_BY_TEMPS';
export const AZ_ORDER = 'AZ_ORDER';
export const WEIGHT_ORDER = 'WEIGHT_ORDER';
export const CREATE_DOG = 'CREATE_DOG'

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

// export const getDogsByName = (payload) => {
//   return {
//     type: GET_DOGS_BY_NAME,
//     payload
//   }
// }

export const getDogsByName = (name) => {
  return async function (dispatch) {
    try {
      var dogsName = await axios.get('http://localhost:3001/dogs?name=' + name);
    return dispatch({
      type: GET_DOGS_BY_NAME,
      payload: dogsName.data
    })
    } catch (error) {
      console.log(error)
    }
    
  }
}

export const azOrder = (payload) => {
  return {
    type: AZ_ORDER,
    payload
  }
}

export const weightOrder = (payload) => {
  return {
    type: WEIGHT_ORDER,
    payload
  }
}

export const action_dogDetail = (id) => {
  return async function (dispatch) {
    var dog = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DOG_DETAIL,
      payload: dog.data
    })
  }
}

export const createDog = (payload) => {
  return async function (dispatch) {
    var newDog = await axios.post(`http://localhost:3001/dogs`, payload);
    return newDog
  }
}