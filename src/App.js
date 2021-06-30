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
import getForecast from './api/weather'

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
  const [openWeather, setOpenWeather] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [showAdd, setShowAdd] = useState(true)
  const [selectedForecast, setSelectedForecast] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const updateUnit = unit => {
    localStorage.setItem('unit', unit)
    setUnit(unit)
  }

  const updateCities = city => {
    console.log('updating city')
    localStorage.setItem('cities', JSON.stringify([...cities, city]))
    setCities([...cities, city])
  }

  if (!cities.length) {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) =>
        updateCities(await getCity({ latitude, longitude })),
      () => setOpenSearch(true)
    )
  }

  function addCity () {
    if (
      selectedCity &&
      cities.indexOf(city => city.id === selectedCity.id) < 0
    ) {
      updateCities(selectedCity)
    }
    setSelectedCity('')
    setOpenWeather(false)
  }

  async function viewDetailedWeather ({ forecast, city }) {
    forecast ? setShowAdd(false) : (forecast = await getForecast(city))
    setOpenWeather(true)
    setSelectedForecast(forecast)
  }

  async function handleCitySelection (newCity) {
    setSelectedCity(newCity)
    setOpenSearch(false)
    viewDetailedWeather({ city: newCity })
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
              onSelectForecast={forecast => viewDetailedWeather({ forecast })}
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
            onClick={() => setOpenSearch(true)}
          >
            <SearchIcon />
          </IconButton>
          <Search
            open={openSearch}
            onClose={() => setOpenSearch(false)}
            onSelect={handleCitySelection}
          />
        </Container>
        <DetailedWeather
          open={openWeather}
          forecast={selectedForecast}
          onClose={() => setOpenWeather(false)}
          onAdd={addCity}
          showAdd={showAdd}
        />
      </ThemeProvider>
    </div>
  )
}

export default App
