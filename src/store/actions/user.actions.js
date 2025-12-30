import { userService } from '../../services/user.service.js'
import { SET_USER, SET_USERS } from '../reducers/user.reducer.js'
import { store } from '../store.js'

export async function loadUsers() {
 try {
  const users = await userService.query()
  store.dispatch({type:SET_USERS,users})
  return users
 } catch (error) {
  console.log('User action-> cannot load users ',error);
  throw error
 } 
}
 
export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
  } catch (error) {
    console.log('user actions -> Cannot login', error)
    throw error
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, user })
  } catch (error) {
    console.log('user actions -> Cannot signup', error)
    throw error
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, user: null })
  } catch (error) {
    console.log('user actions -> Cannot logout', error)
    throw error
  }
}