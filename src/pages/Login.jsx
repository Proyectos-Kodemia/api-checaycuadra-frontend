import React, { useState, useEffect } from 'react'
import {Avatar, Grid, Paper} from '@mui/material'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'

// import { useNavigate } from 'react-router-dom'
import '../scss/login.css'
import { green } from '@mui/material/colors'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [credencialsValid, setCredencialsValid] = useState(false)
  // const [user, setUser] = useState(null)
  // const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      // navigate.push('/add')
    }
  }, [])
  const validarCorreo = (email) => {
    const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const isValid = expReg.test(email)
    isValid ? setEmailValid(false) : setEmailValid(true)
    return isValid
  }

  const dataLogin = async () => {
    try {
      const item = { email, password }
      const emailIsValid = validarCorreo(email)
      if (emailIsValid) {
        const result = await fetch('http://localhost:8000/auth/account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })
        const res = await result.json()
        if (res.status) {
          setCredencialsValid(false)
          localStorage.setItem('user-info', JSON.stringify(res.token))
        } else {
          setCredencialsValid(true)
        }
      }
    } catch (err) {
      console.log('error en login ', err)
    }

    // navigate.push('/add')
  }
  const paperStyle={padding:20, height: '70vh', width:280, margin:'20px auto'}

  return (
    <>
    <Grid align='center'>
      <Paper elevarion={10} style={paperStyle}>
        <Avatar sx={{ bgcolor: green[900] }}><LockOpenOutlinedIcon color='second'/></Avatar>
        <h2>Sing in</h2>
      </Paper>
    </Grid>
    <div className='containerPrincipal'>
      <div className='containerSecundario'>
        <div className='form-group'>
          <label>Usuario: </label>
          <br />
          <input
            type='text'
            placeholder='email'
            className='form-control'
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password: </label>
          <br />
          <input
            type='password'
            placeholder='password'
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={dataLogin} >
            Login
          </button>
          {credencialsValid && <p>El usuario o contraseña son incorrectos</p>}
          {emailValid && <p>Los datos son incorrectos</p>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
