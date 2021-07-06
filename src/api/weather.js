import { getBackground, getTemp } from '../utils'

async function getDetailedForecast (city) {
  const {
    coordinates: { latitude, longitude }
  } = city
  console.log('Getting detailed forecast for ', latitude, longitude)
  const [lat, lon, part, key] = [
    latitude,
    longitude,
    'minutely,alerts',
    process.env.REACT_APP_WEATHERAPI_KEY
  ]
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}`
  const res = await fetch(url)
  return setDetails(await res.json(), city)
}

function setDetails (forecast, city) {
  Object.assign(forecast.current, getTemp(forecast.current.temp))
  forecast.background = getBackground(forecast.current.weather[0])
  forecast.city = city
  return forecast
}
export { getDetailedForecast }
