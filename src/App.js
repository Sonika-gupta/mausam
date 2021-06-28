import { useState } from 'react'
import {
  createMuiTheme,
  ThemeProvider,
  Container,
  Switch,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Forecast from './components/Forecast'
import Search from './components/Search'
import './App.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#084887'
    },
    secondary: {
      main: '#def0ff'
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
})

function App () {
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric')
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem('cities') || [])
  )
  const [search, setSearch] = useState(false)

  function updateCities ({ coords: { latitude, longitude } }) {
    setCities([...cities, { lat: latitude, lon: longitude }])
  }

  function openSearch (error) {
    setSearch(true)
    console.log('fetch location failed', error)
    console.log('need to open search dialog')
  }

  if (!cities.length)
    navigator.geolocation.getCurrentPosition(updateCities, openSearch)

  function handleUnitChange (e, isMetric) {
    const updatedUnit = isMetric ? 'metric' : 'imperial'
    localStorage.setItem('unit', updatedUnit)
    setUnit(updatedUnit)
  }

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Forecast cities={cities} unit={unit}></Forecast>
        <Container maxWidth='md'>
          <Typography style={{ float: 'left' }}>
            &deg;F
            <Switch
              checked={unit === 'metric'}
              onChange={handleUnitChange}
              name='unit'
              color='primary'
            />
            &deg;C
          </Typography>
          <IconButton
            color='primary'
            aria-label='Search City'
            style={{ float: 'right' }}
            onClick={() => setSearch(true)}
          >
            <SearchIcon />
          </IconButton>
          <Dialog maxWidth='sm' open={search} fullWidth={true}>
            <DialogContent>
              <DialogContentText>Enter City Name</DialogContentText>
              <Search></Search>
            </DialogContent>
          </Dialog>
        </Container>
      </ThemeProvider>
      <footer>{new Date().toUTCString()}</footer>
    </div>
  )
}

export default App
