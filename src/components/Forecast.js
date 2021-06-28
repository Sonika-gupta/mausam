import { useState, useEffect } from 'react'
import { Container, Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Description, CityDetail, Temperature } from './WeatherDetails'
import { getTime, getBackground, calculateDetails } from '../utils'

// import getForecast from '../getForecast'
import { WeatherForecastAPI as data } from '../sample-data.json'
const getForecast = loc => {
  console.log('fetching forecasts')
  return data[loc.name.toLowerCase()] || data['london']
}

const useStyles = makeStyles({
  card: {
    display: 'flex',
    margin: '5px auto',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  city: {
    width: '70%',
    textAlign: 'left'
  },
  temperature: {
    margin: '5px'
  }
})

export default function Forecast ({ cities, unit }) {
  console.log('cities:', cities, 'unit', unit)
  const [forecasts, setForecasts] = useState([])

  useEffect(() => {
    const weather = []
    ;(async function () {
      for (let city of cities) {
        const x = calculateDetails(await getForecast(city))
        console.log('----', x)
        weather.push(x)
      }
      setForecasts(weather)
    })()
  }, [cities, unit])

  console.log(forecasts)
  const classes = useStyles()
  return (
    <Container maxWidth='md'>
      {forecasts.map(forecast => (
        <Card
          key={forecast.id}
          className={classes.card}
          color='primary'
          style={{ backgroundImage: forecast.background }}
        >
          <CardContent>
            <Description weather={forecast.weather[0]} />
          </CardContent>
          <CardContent className={classes.city}>
            <CityDetail forecast={forecast} />
          </CardContent>
          <CardContent className={classes.temperature}>
            <Temperature forecast={forecast.main} unit={unit} />
          </CardContent>
        </Card>
      ))}
    </Container>
  )
}
