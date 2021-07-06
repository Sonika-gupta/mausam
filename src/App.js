import { useState } from 'react'

import {
  Container,
  createMuiTheme,
  IconButton,
  ThemeProvider
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import DetailedWeather from './components/DetailedWeather'
import Forecast from './components/Forecast'
import Search from './components/Search'
import UnitInput from './components/UnitInput '

import { getCity } from './api/places'
import { getDetailedForecast } from './api/weather'

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
  const [showAdd, setShowAdd] = useState(false)
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
    if (!forecast) {
      forecast = await getDetailedForecast(city)
      setShowAdd(true)
    }
    setSelectedForecast(forecast)
    setOpenWeather(true)
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
          <UnitInput unit={unit} updateUnit={updateUnit} />
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
          unit={unit}
          updateUnit={updateUnit}
        />
      </ThemeProvider>
    </div>
  )
}

export default App
