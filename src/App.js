import { useState } from 'react'
import './App.css'
// import cityList from './city.list.json'
import Forecast from './components/Forecast'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

function App () {
  const [unit, setUnit] = useState('metric')
  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem('cities') || [])
  )
  // console.log(cityList.find(obj => obj.id === 833))

  function updateCities ({ coords: { latitude, longitude } }) {
    /* const location = cityList.find(
      obj => obj.coord.lat === latitude && obj.coord.lon === longitude
    ) */
    setCities([...cities, { lat: latitude, lon: longitude }])
  }
  function openSearch (error) {
    console.log('fetch location failed', error)
    console.log('need to open search dialog')
  }

  if (!cities.length)
    navigator.geolocation.getCurrentPosition(updateCities, openSearch)

  return (
    <div className='App'>
      <Forecast cities={cities} unit={unit}></Forecast>
      <ToggleButtonGroup
        value={unit}
        size='small'
        exclusive
        onChange={(e, u) => setUnit(u)}
        aria-label='unit'
      >
        <ToggleButton value='metric' aria-label='Celcius'>
          C
        </ToggleButton>
        <ToggleButton value='imperial' aria-label='Fahrenheit'>
          F
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default App
