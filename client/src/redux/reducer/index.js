import { GET_ALL_DOGS, FILTER_BY_CREATION, FILTER_ALL_TEMPS, FILTER_BY_TEMPS } from '../actions'


const initialState = {
  dbApiDogs: [],
  dogs: [],
  temperaments: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        dbApiDogs: action.payload
      }
    case FILTER_BY_CREATION:
      let filteredCreation = state.dbApiDogs
      if (action.payload === 'Api') {
        filteredCreation = filteredCreation.filter(dog => dog.createdInDataBase === false)
      }
      if (action.payload === 'Creados') {
        filteredCreation = filteredCreation.filter(dog => dog.createdInDataBase === true)
      }
      return {
        ...state,
        dogs: filteredCreation
      }
    case FILTER_ALL_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      }
    case FILTER_BY_TEMPS:
      // console.log('state.dogs', state.dogs)
      // console.log('action.payload', action.payload)
      let filteredbyTemp = state.dbApiDogs
      if (action.payload !== 'ALL') {
        filteredbyTemp = filteredbyTemp.filter(dog => {
          if (dog.temperaments === undefined) {
            return false
          }
          return dog.temperaments.includes(action.payload)
        })
      }
      return {
        ...state,
        dogs: filteredbyTemp
      }
    default: return { ...state }
  }
}

export default rootReducer