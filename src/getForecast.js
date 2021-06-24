export default async function getForecast (city, unit = 'metric') {
  const url = new URL(
    'https://community-open-weather-map.p.rapidapi.com/weather'
  )
  url.search = new URLSearchParams({ units: unit })

  console.log('city', city)
  if (city.name) {
    url.searchParams.append('q', city.name)
  } else if (city.lat && city.lon) {
    url.searchParams.append('lat', city.lat)
    url.searchParams.append('lon', city.lon)
  } else throw Error('Enter City!')

  console.log(url.toString())

  const requestOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8de98afbfbmsh993ccd1707fecbdp1d1b87jsnafbde503a3f3',
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
