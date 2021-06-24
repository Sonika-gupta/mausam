import { useState } from 'react'
import './App.css'
import { createMuiTheme, ThemeProvider, Switch } from '@material-ui/core'
import Forecast from './components/Forecast'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#084887'
    },
    secondary: {
      main: '#def0ff'
    }
  }
})

function App () {
  console.log(localStorage.getItem('unit'))
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric')
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem('cities') || [])
  )

  function updateCities ({ coords: { latitude, longitude } }) {
    setCities([...cities, { lat: latitude, lon: longitude }])
  }

  function openSearch (error) {
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
        &deg;F
        <Switch
          checked={unit === 'metric'}
          onChange={handleUnitChange}
          name='unit'
          color='primary'
        />
        &deg;C
      </ThemeProvider>
    </div>
  )
}

export default App
