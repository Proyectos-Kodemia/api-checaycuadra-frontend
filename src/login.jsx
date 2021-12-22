import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push('/add')
    }
  }, [])

  const login = async () => {
    const item = { email, password }
    let result = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    result = await result.json()
    localStorage.setItem('user-info', JSON.stringify(result))
    history.push('/add')
  }
  return (
    <>
      <h1>Login Page</h1>
      <div />
      <input type='text' placeholder='email' className='form-control' onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type='password' placeholder='password' className='form-control' onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={login} className='btn btn-primary'>login</button>
    </>
  )
}

export default Login
