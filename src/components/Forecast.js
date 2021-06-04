import { useState, useEffect } from 'react'
import data from '../sample-data.json'
import Condition from './Condition'
const Forecast = () => {
  const [city, setCity] = useState('')
  const [unit, setUnit] = useState('metric')
  const [weather, setWeather] = useState('')
  useEffect(() => {
    setWeather(data[city])
  }, [city])
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type='text'
          value={city}
          onChange={e => {
            console.log(city)
            setCity(e.target.value)
          }}
        />
        <div
          onChange={e => {
            console.log(e.target.value)
            setUnit(e.target.value)
          }}
        >
          <label>
            <input type='radio' name='unit' value='imperial' />
            &deg;F
          </label>
          <label>
            <input type='radio' name='unit' value='metric' />
            &deg;C
          </label>
        </div>
      </form>

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <Condition weather={weather} />
        </div>
      )}
    </div>
  )
}

export default Forecast
