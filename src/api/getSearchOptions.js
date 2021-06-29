export default function getSearchOptions (query) {
  const url = new URL('https://spott.p.rapidapi.com/places/autocomplete')
  url.search = new URLSearchParams({
    type: 'CITY',
    q: query,
    limit: '10'
  })
  return fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.SPOTTAPI_KEY,
      'x-rapidapi-host': 'spott.p.rapidapi.com'
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log('body', res)
      return res
    })
}
