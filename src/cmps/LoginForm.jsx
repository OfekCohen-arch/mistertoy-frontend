import { useState } from 'react'
import { userService } from '../services/user.service.js'

export function LoginForm({ onLogin, isSignup }) {
  const [credentials, setCredentials] = useState(
    userService.getEmptyCredentials()
  )

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials(prevState => {
      return { ...prevState, [field]: value }
    })
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
  }

  const { fullname, username, password } = credentials

  return (
    <form className="formik" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="Username"
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={handleChange}
        required
      />
      {isSignup && (
        <input
          type="text"
          name="fullname"
          value={fullname}
          placeholder="Full name"
          onChange={handleChange}
          required
        />
      )}
      <button className="btn">{isSignup ? 'Signup' : 'Login'}</button>
    </form>
  )
}
