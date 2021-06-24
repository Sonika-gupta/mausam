import { useState, useEffect } from 'react'
import { WeatherForecastAPI as data } from '../sample-data.json'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import getForecast from '../getForecast'
const getForecast = loc => {
  console.log('fetching forecasts')
  return data
}

const useStyles = makeStyles({
  root: {
    maxWidth: '500px',
    display: 'flex',
    margin: 'auto'
  },
  city: {
    width: '80%',
    textAlign: 'left'
  },
  temp: {
    margin: 'auto'
  }
})

function getTime ({ timezone }) {
  const date = new Date(Date.now() + timezone * 1000)
  return date.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit'
  })
}
export default function Forecast ({ cities, unit }) {
  console.log('cities:', cities)
  const [forecasts, setForecasts] = useState([])

  useEffect(() => {
    const forecasts = []
    cities.forEach(async city => {
      forecasts.push(getForecast(city))
    })
    setForecasts(forecasts)
  }, [cities, unit])

  console.log('forecasts:', forecasts)

  const classes = useStyles()
  return (
    <ul>
      {new Date().toUTCString()}
      {forecasts.map(forecast => (
        <Card key={forecast.id} className={classes.root}>
          <CardContent>
            <img
              style={{ marginTop: '25%' }}
              src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
            ></img>
          </CardContent>
          <CardContent className={classes.city}>
            <Typography variant='overline'>{getTime(forecast)}</Typography>
            <Typography variant='h5'>{forecast.name}</Typography>
          </CardContent>
          <CardContent className={classes.temp}>
            <Typography variant='h4'>{forecast.main.temp}</Typography>
          </CardContent>
        </Card>
      ))}
    </ul>
  )
}
