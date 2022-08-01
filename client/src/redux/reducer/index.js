import { GET_ALL_DOGS, FILTER_BY_CREATION, FILTER_ALL_TEMPS, FILTER_BY_TEMPS, GET_DOGS_BY_NAME, AZ_ORDER, WEIGHT_ORDER, GET_DOG_DETAIL, CREATE_DOG } from '../actions'


const initialState = {
  dbApiDogs: [],
  dogs: [],
  tempFilter: 'ALL',
  createFilter: 'ALL',
  temperaments: [],
  detail: []
}

function rootReducer(state = initialState, action) {
  const proFilter = (createFilter, tempFilter) => {
    let filter = state.dbApiDogs
    if (createFilter === 'Api') {
      filter = filter.filter(dog => !dog.createdInDataBase)
    }
    if (createFilter === 'Creados') {
      filter = filter.filter(dog => dog.createdInDataBase)
    }
    // -----------
    if (tempFilter !== 'ALL') {
      filter = filter.filter(dog => {
        if (!dog.temperaments) {
          return false
        }
        return dog.temperaments.includes(tempFilter)
      })
    }
    return filter
  }

  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        detail: [],
        dogs: action.payload,
        dbApiDogs: action.payload
      }
    case FILTER_BY_CREATION:
      return {
        ...state,
        createFilter: action.payload,
        dogs: proFilter(action.payload, state.tempFilter)
      }
    // let filteredCreation = state.dbApiDogs
    // if (action.payload === 'Api') {
    //   filteredCreation = filteredCreation.filter(dog => !dog.createdInDataBase)
    // }
    // if (action.payload === 'Creados') {
    //   filteredCreation = filteredCreation.filter(dog => dog.createdInDataBase)
    // }
    // return {
    //   ...state,
    //   dogs: filteredCreation
    // }
    case FILTER_ALL_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      }
    case FILTER_BY_TEMPS:
      return {
        ...state,
        tempFilter: action.payload,
        dogs: proFilter(state.createFilter, action.payload)
      }
    // let filteredbyTemp = state.dbApiDogs
    // if (action.payload !== 'ALL') {
    //   filteredbyTemp = filteredbyTemp.filter(dog => {
    //     if (dog.temperaments === undefined) {
    //       return false
    //     }
    //     return dog.temperaments.includes(action.payload)
    //   })
    // }
    // return {
    //   ...state,
    //   dogs: filteredbyTemp
    // }

    // case GET_DOGS_BY_NAME:
    //   let nameFilter = state.dbApiDogs.filter(dog => {
    //     return dog.name.toLowerCase().includes(action.payload.toLowerCase())
    //   })
    //   return {
    //     ...state,
    //     dogs: nameFilter
    //   }
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload
      }
    case AZ_ORDER:
      const azOrder = action.payload === 'ascendente' ?
        state.dogs.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1
          }
          return 0
        }) :
        state.dogs.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1
          }
          return 0
        })
      return {
        ...state,
        dogs: azOrder
      }
    case WEIGHT_ORDER:
      const weightOrder = action.payload === 'pesados' ?
        state.dogs.sort(function (a, b) {
          if (a.average_weight > b.average_weight) {
            return -1
          }
          if (b.average_weight > a.average_weight) {
            return 1
          }
          return 0
        }) :
        state.dogs.sort(function (a, b) {
          if (a.average_weight > b.average_weight) {
            return 1
          }
          if (b.average_weight > a.average_weight) {
            return -1
          }
          return 0
        })
      return {
        ...state,
        dogs: weightOrder
      }
    case GET_DOG_DETAIL:
      // console.log(action.payload)
      return {
        ...state,
        detail: action.payload
      }
    case CREATE_DOG:
      return {
        ...state
      }
    default: return { ...state }
  }
}

export default rootReducer