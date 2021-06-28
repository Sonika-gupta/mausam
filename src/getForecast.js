export default async function getForecast (city) {
  const url = new URL(
    'https://community-open-weather-map.p.rapidapi.com/weather'
  )
  url.search = new URLSearchParams()

  console.log('city', city)
  if (city.name) {
    url.searchParams.append('q', city.name)
  } else if (city.lat && city.lon) {
    url.searchParams.append('lat', city.lat)
    url.searchParams.append('lon', city.lon)
  } else throw Error('Enter City!')

  console.log(url.toString(), process.env.REACT_APP_RAPIDAPI_KEY)

  const requestOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      useQueryString: true
    }
  }
  return await fetch(url.toString(), requestOptions)
    .then(res => res.json())
    .then(res => {
      console.log('body', res)
      return res
    })
}

// "https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html"
