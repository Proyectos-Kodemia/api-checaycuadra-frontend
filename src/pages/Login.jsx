import React, { useState, useEffect } from 'react'
import {Avatar, Button, Grid, Link, Paper, TextField, Typography} from '@mui/material'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

// import { useNavigate } from 'react-router-dom'
import '../scss/login.css'


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
  const avatarStyle={backgroundColor:'#075c2c'}
  const heartStyle={color:'red'}
  const inputStyle={padding:'8px 0'}
  const buttonStyle={backgroundColor:'#075c2c', padding:'5px 0', margin:'5px 0' }
  return (
    
    <Grid>
      <Paper elevation={24} variant="outlined" style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOpenOutlinedIcon color='second'/></Avatar>
          <h2>Checa y Cuadra</h2>
        </Grid>
        <TextField label='Email' placeholder='Ingrese Email' color='success' required fullWidth style={inputStyle} onChange={(e) => setEmail(e.target.value)}></TextField>
        
        <TextField label='Password' placeholder='Ingrese Password' color='success' type='password' required fullWidth style={inputStyle} onChange={(e) => setPassword(e.target.value)}></TextField>
        
        <FormControlLabel style={inputStyle} control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite style={heartStyle}/>} />} label="Recordar Usuario" />
        
        <Button type='submit' style={buttonStyle} variant='contained' fullWidth onClick={dataLogin}>Ingresar</Button>
        <Typography>
          <Link href="#" underline="hover" >
            ¿Olvidaste la contraseña?
          </Link>
        </Typography>
        <Typography> ¿No tienes cuenta? 
          <Link href="#" underline="hover">
            Registrate
          </Link>
        </Typography>
        {credencialsValid && <p>El usuario o contraseña son incorrectos</p>}
        {emailValid && <p>Los datos son incorrectos</p>}
      </Paper>
    </Grid>
    
  )
}

export default Login
