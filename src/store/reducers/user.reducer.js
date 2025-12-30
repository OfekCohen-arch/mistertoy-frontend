import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
  loggedInUser: userService.getLoggedInUser(),
  users: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loggedInUser: action.user,
      }
    case SET_USERS:
      return{
        ...state,
        users: [...action.users]
      }
    default:
      return state
  }
}
