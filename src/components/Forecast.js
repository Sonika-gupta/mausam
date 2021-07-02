import { useState, useEffect } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core'
import { WeatherIcon, Temperature, Time } from './SubComponents'
import { makeStyles } from '@material-ui/core/styles'
import { getDetailedForecast } from '../api/weather'

const useStyles = makeStyles({
  card: {
    margin: '5px auto'
  },
  city: {
    width: '70%',
    textAlign: 'left'
  },
  temperature: {
    margin: '5px'
  }
})

export default function Forecast ({ city, unit, onSelectForecast }) {
  console.log('Loaded city and unit')
  const [forecast, setForecast] = useState('')

  useEffect(() => {
    ;(async () => {
      setForecast(await getDetailedForecast(city))
    })()
  }, [city])

  const classes = useStyles()
  return (
    <>
      {forecast && (
        <Card
          className={classes.card}
          color='primary'
          style={{ backgroundImage: forecast.background }}
        >
          <CardActionArea
            style={{ display: 'flex' }}
            onClick={() => onSelectForecast(forecast)}
          >
            <CardContent>
              <WeatherIcon weather={forecast.current.weather[0]} />
            </CardContent>
            <CardContent className={classes.city}>
              <Time timezone={forecast.timezone} variant='caption' />
              <Typography variant='h5'>{forecast.city.name}</Typography>
            </CardContent>
            <CardContent className={classes.temperature}>
              <Temperature temperature={forecast.current[unit]} />
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  )
}
