// import { OneCallAPI as res } from '../sample-data.json'
import { getBackground, getTemp } from '../utils'

async function getForecast (city) {
  const url = new URL(
    'https://community-open-weather-map.p.rapidapi.com/weather'
  )

  if (city.name) {
    url.search = new URLSearchParams({ q: city.name })
  } else if (city.lat && city.lon) {
    url.search = new URLSearchParams({ lat: city.lat, lon: city.lon })
  } else throw Error('Invalid City Object')

  const requestOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      useQueryString: true
    }
  }
  const res = await fetch(url, requestOptions)
  return await res.json()
}

async function getDetailedForecast (city) {
  console.log('in getdetailedforecast')
  const {
    coordinates: { latitude, longitude }
  } = city
  console.log(latitude, longitude)
  const [lat, lon, part, key] = [
    latitude,
    longitude,
    'minutely,alerts',
    process.env.REACT_APP_WEATHERAPI_KEY
  ]
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}`
  const res = await fetch(url)
  return setDetails(await res.json(), city)
  /* const x = setDetails(res[city.name.toLowerCase()], city)
  console.log(x)
  return x */
}

function setDetails (forecast, city) {
  Object.assign(forecast.current, getTemp(forecast.current.temp))
  forecast.background = getBackground(forecast.current.weather[0])
  forecast.city = city
  return forecast
}
export { getForecast, getDetailedForecast }
