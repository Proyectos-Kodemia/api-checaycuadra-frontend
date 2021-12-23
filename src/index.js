import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'


const theme = createTheme({
  palette: {
    primary: {
      main:'#113311',
    },
    secondary:{
      main:'#00244c',
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
