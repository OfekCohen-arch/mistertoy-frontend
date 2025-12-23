import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from '../cmps/LoginForm.jsx'
import { useNavigate } from 'react-router-dom'

export function LoginSignup(){

    const navigate = useNavigate()
    const [isSignup, setIsSignUp] = useState(false)

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials)
  }

  function _login(credentials) {
    try {
      login(credentials)
      showSuccessMsg('Logged in successfully')
      navigate('/')
      
    } catch (error) {
      showErrorMsg('Oops try again')
    }
  }

  function _signup(credentials) {
    try {
      signup(credentials)
      showSuccessMsg('Logged in successfully')
      navigate('/')
    } catch (error) {
      showErrorMsg('Oops try again')
    }
  }

  return (
    <section className="login">
      <LoginForm onLogin={onLogin} isSignup={isSignup} />
      <div className="btns">
        <a href="#" onClick={() => setIsSignUp(prev => !prev)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </section>
  )
}