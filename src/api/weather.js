export default async function getForecast (city) {
  const url = new URL(
    'https://community-open-weather-map.p.rapidapi.com/weather'
  )
  console.log(city)

  if (city.name) {
    url.search = new URLSearchParams({ q: city.name })
  } else if (city.lat && city.lon) {
    url.search = new URLSearchParams({ lat: city.lat, lon: city.lon })
  } else throw Error('Invalid City Object')

  const requestOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      // 'x-rapidapi-key': process.env.WEATHERAPI_KEY,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      useQueryString: true
    }
  }
  const res = await fetch(url, requestOptions)
  return await res.json()
}
