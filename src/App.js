import { useState } from 'react'

import {
  Container,
  createMuiTheme,
  IconButton,
  Switch,
  ThemeProvider
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import DetailedWeather from './components/DetailedWeather'
import Forecast from './components/Forecast'
import Search from './components/Search'

import { getCity } from './api/places'

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
  },
  spacing: 2
})

function App () {
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric')
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem('cities')) || []
  )
  const [search, setSearch] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedForecast, setSelectedForecast] = useState('')

  const updateUnit = unit => {
    localStorage.setItem('unit', unit)
    setUnit(unit)
  }

  const updateCities = city => {
    localStorage.setItem('cities', JSON.stringify([...cities, city]))
    setCities([...cities, city])
  }

  const addCurrentLocation = async ({ coords: { latitude, longitude } }) =>
    updateCities(await getCity({ latitude, longitude }))

  if (!cities.length) {
    navigator.geolocation.getCurrentPosition(addCurrentLocation, () =>
      setSearch(true)
    )
  }

  function handleCitySelection (newCity) {
    if (cities.indexOf(city => city.id === newCity.id) < 0)
      updateCities(newCity)
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
              key={city.id}
              city={city}
              unit={unit}
              onSelectForecast={viewDetailedWeather}
            ></Forecast>
          ))}
        </Container>
        <Container maxWidth='md'>
          <div style={{ float: 'left', color: 'white' }}>
            &deg;F
            <Switch
              checked={unit === 'metric'}
              onChange={(e, isMetric) =>
                updateUnit(isMetric ? 'metric' : 'imperial')
              }
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
