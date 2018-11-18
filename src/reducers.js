import { ADD_TODO, REMOVE_TODO } from './actions'

const initialState = {
  toDoList: []
}

// reducers
export const reducer = (state = initialState, action) => {

  switch(action.type) {
    case ADD_TODO:
      return  {
          ...state,
          toDoList: [
             ...state.toDoList,
             action.payload
          ]
      }
    case REMOVE_TODO:
      return {
          ...state,
          toDoList: [
             ...state.toDoList.filter((val, index) => index !== action.payload)
          ]
      }
    default:
      return state;
  }
}
