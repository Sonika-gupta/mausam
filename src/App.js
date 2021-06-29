import { useState } from 'react'
import {
  createMuiTheme,
  ThemeProvider,
  Container,
  Switch,
  IconButton
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Forecast from './components/Forecast'
import Search from './components/Search'
import DetailedWeather from './components/DetailedWeather'
import './App.css'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#084887'
    },
    secondary: {
      main: '#def0ff'
    }
  }
})

function App () {
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric')
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem('cities') || [])
  )
  const [search, setSearch] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedForecast, setSelectedForecast] = useState('')

  if (!cities.length)
    navigator.geolocation.getCurrentPosition(updateCities, () =>
      setSearch(true)
    )

  function updateCities ({ coords: { latitude, longitude } }) {
    setCities([...cities, { lat: latitude, lon: longitude }])
  }

  function handleUnitChange (e, isMetric) {
    const updatedUnit = isMetric ? 'metric' : 'imperial'
    localStorage.setItem('unit', updatedUnit)
    setUnit(updatedUnit)
  }

  function handleCitySelection (city) {
    setCities([...cities, city])
  }

  function viewDetailedWeather (forecast) {
    setOpen(true)
    setSelectedForecast(forecast)
  }

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container maxWidth='md'>
          {cities.map(city => (
            <Forecast
              city={city}
              unit={unit}
              onSelect={viewDetailedWeather}
            ></Forecast>
          ))}
        </Container>
        <Container maxWidth='md'>
          <div style={{ float: 'left', color: 'white' }}>
            &deg;F
            <Switch
              checked={unit === 'metric'}
              onChange={handleUnitChange}
              name='unit'
              color='primary'
            />
            &deg;C
          </div>
          <IconButton
            color='primary'
            aria-label='Search City'
            style={{ float: 'right' }}
            onClick={() => setSearch(true)}
          >
            <SearchIcon />
          </IconButton>
          <Search
            open={search}
            onClose={() => setSearch(false)}
            onSelect={handleCitySelection}
          />
        </Container>
        <DetailedWeather
          open={open}
          forecast={selectedForecast}
          onClose={() => setOpen(false)}
        />
      </ThemeProvider>
      <footer>{new Date().toUTCString()}</footer>
    </div>
  )
}

export default App
