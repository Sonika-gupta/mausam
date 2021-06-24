import { useState, useEffect } from 'react'
import { Container, Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getTime, getBackground } from '../utils'

import getForecast from '../getForecast'
/* import { WeatherForecastAPI as data } from '../sample-data.json'
const getForecast = loc => {
  console.log('fetching forecasts')
  return data[loc.name.toLowerCase()] || data['london']
}
 */
const useStyles = makeStyles({
  card: {
    display: 'flex',
    margin: '5px auto',
    color: 'white',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  city: {
    width: '70%',
    textAlign: 'left'
  },
  temp: {
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
        const x = await getForecast(city)
        console.log('----', x)
        weather.push(x)
      }
      setForecasts(weather)
      console.log(forecasts)
    })()
  }, [cities, unit])

  const classes = useStyles()
  return (
    <Container maxWidth='md'>
      {forecasts.map(forecast => (
        <Card
          key={forecast.id}
          className={classes.card}
          color='primary'
          style={{ backgroundImage: getBackground(forecast.weather[0]) }}
        >
          <CardContent>
            <img
              style={{ marginTop: '25%' }}
              src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
            ></img>
          </CardContent>
          <CardContent className={classes.city}>
            <Typography variant='overline'>{getTime(forecast)}</Typography>
            <Typography variant='h6'>{forecast.name}</Typography>
          </CardContent>
          <CardContent className={classes.temp}>
            <Typography variant='h3'>
              {forecast.main[unit]}
              &deg;
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  )
}
