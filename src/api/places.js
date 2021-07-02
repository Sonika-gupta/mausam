import { del as data } from '../sample-data.json'
async function getSearchOptions (query) {
  /*  const url = new URL('https://spott.p.rapidapi.com/places/autocomplete')
  url.search = new URLSearchParams({
    type: 'CITY',
    q: query,
    limit: '10'
  })

  return await requestApi(url)
 */
  return data
}

async function getCity ({ latitude, longitude }) {
  console.log('GETTING CITY', latitude, longitude)
  const url = new URL('https://spott.p.rapidapi.com/places')
  url.search = new URLSearchParams({
    type: 'CITY',
    latitude,
    longitude,
    limit: '1'
  })
  return (await requestApi(url))[0]
}

async function requestApi (url) {
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_CITIESAPI_KEY,
      'x-rapidapi-host': 'spott.p.rapidapi.com'
    }
  })
  const body = await res.json()
  return body
}

export { getSearchOptions, getCity }
